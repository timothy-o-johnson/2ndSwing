// customscript_wms_childitemcreation
// https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=37

/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define([ 'N/record', 'N/search', "N/runtime" ],
/**
 * @param {record}
 *            record
 * @param {search}
 *            search
 */
function(record, search, runtime) {

	/**
	 * Marks the beginning of the Map/Reduce process and generates input data.
	 * 
	 * @typedef {Object} ObjectRef
	 * @property {number} id - Internal ID of the record instance
	 * @property {string} type - Record type id
	 * 
	 * @return {Array|Object|Search|RecordRef} inputSummary
	 * @since 2015.1
	 */
	
	/*
	 * we search for all lines with the child generator flag and provide poid
	 * (inherent), line key, item, and qty from po line as inputs for map
	 */
	function getInputData() {
		
		
		var length = runtime.getCurrentScript().getParameter({
			name : 'custscript_wms_search_length'
		});
		
		if(length == "" || length == " " || length == null || length == 'undefined'){
			length = 1000;
		}
		
		var parentItemSearch = search.create({
			type : search.Type.PURCHASE_ORDER,
			filters : [ search.createFilter({
				name : 'mainline',
				operator : search.Operator.IS,
				values : [ 'F' ]
			}), search.createFilter({
				name : 'custcol_wms_childitemgenerator',
				operator : search.Operator.IS,
				values : [ "T" ]
			}),search.createFilter({
				name : 'type',
				join :'item',
				operator : search.Operator.ANYOF,
				values : [ "InvtPart" ]
			}) ],
			columns : [ search.createColumn({
				name : 'lineuniquekey'
			}), search.createColumn({
				name : 'item'
			}), search.createColumn({
				name : 'quantity'
			}),search.createColumn({
				name : 'baseprice',
				join: 'item'
			}),search.createColumn({
				name : 'custcol_g2_condition_ref'
			})]
		});
		log.debug('search length', length);
		
		var searchObj = parentItemSearch.run().getRange({start : 0, end : length});
	
		if(length > 0){
			return searchObj;
		}
		else{
			throw "INVALID SEARCH LENGTH"
		}
	}

	/**
	 * Executes when the map entry point is triggered and applies to each
	 * key/value pair.
	 * 
	 * @param {MapSummary}
	 *            context - Data collection containing the key/value pairs to
	 *            process through the map stage
	 * @since 2015.1
	 */
	
	/*
	 * Map generates new item 'shells' sets correct parent, acct info, bins flag
	 * 'shell' checkbox and orig po ref
	 * 
	 * for each line, check the po class (i know, i know) we only want to create
	 * individual lines if: 1)the po class *is not* opportunity (we only know it
	 * will be set for opportunities.) 2) the 'item type' for the parent is
	 * 'golf clubs' all other item types and classes will be received at line
	 * qty (or divided in the WMS app...
	 * 
	 */
	function map(context) {
		context.errors.iterator().each(
				function(key, error, executionNo) {
					log.error({
						title : 'Map error for key: ' + key
								+ ', execution no  ' + executionNo,
						details : error
					});
					return true;
				});

		var poLine = JSON.parse(context.value);
		log.debug('poLineObj', JSON.stringify(poLine));
		var poId = poLine.id;

		var poType = search.lookupFields({
			type: search.Type.PURCHASE_ORDER,
			id: poId,
			columns: ['class']
		});
		
		log.debug('starting PO', context.value);

		var parentItem = poLine.values.item[0].value;
		var line = poLine.values.lineuniquekey;
		var qty = poLine.values.quantity;
		var basePrice = poLine.values["item.baseprice"];
		//NG-1111 adding expected condition on child items generated
		var expectedCondition = poLine.values.custcol_g2_condition_ref[0].value;
		log.debug('expected condition', expectedCondition);
		
		var lines = [];
		
		
		log.debug('parentItem', parentItem);
		log.debug('basePrice', basePrice);
		//VF script parameter for Item Type Golf Clubs
		var golfClubs = runtime.getCurrentScript().getParameter({
			name : 'custscript_wms_golf_club_item_type'
		});
		
		//NG 1384 - if item is one of these types, break out into individual children with quantity 1
		var categoryForIndvidualChild = ['Junior Golf Shoe','Mens Golf Shoe','Mens Golf Sandal','Womens Golf Shoe'];

		do {
			try {
			// expenseaccount *is* cogsaccount
			
			var itemFields = search.lookupFields({
				type : search.Type.INVENTORY_ITEM,
				id : parentItem,
				columns : [ 'expenseaccount', 'assetaccount', 'custitem_g2_itemtype_ref','custitem_g2_model_ref','custitem_g2_brand_ref','custitem_g2_category_ref','custitem_g2_name' ]
			});
			
			log.debug('category',itemFields.custitem_g2_category_ref[0].text);
			
			// TODO: hard coded item type ref and class(transaction header 'item
			// type')
			// we bypass excess execution by dropping the qty down.
			// reduce won't check item type, just the number of
			// child items created per original line
			if((poType!=null && poType.class!=null && poType.class.hasOwnProperty('value') && poType.class[0]!=null && poType.class[0].value == 3) || 
			( itemFields!=null && itemFields.custitem_g2_itemtype_ref!=null && itemFields.custitem_g2_itemtype_ref[0]!=null && 
					(itemFields.custitem_g2_itemtype_ref[0].value != golfClubs && categoryForIndvidualChild.indexOf(itemFields.custitem_g2_category_ref[0].text) == -1))){
				qty = 0;
			}

			log.debug('demark', "postsearch " + JSON.stringify(itemFields))
			var newItem = record.create({
				type : search.Type.INVENTORY_ITEM
			});

			newItem.setValue({
				fieldId : 'itemid',
				value : 'tmp-'+poId+"-" + Date.now()
			});
			newItem.setValue({
				fieldId : 'cogsaccount',
				value : itemFields.expenseaccount[0].value
			});

			newItem.setValue({
				fieldId : 'assetaccount',
				value : itemFields.assetaccount[0].value
			});

			newItem.setValue({
				fieldId : 'istaxable',
				value : true
			});
			
			newItem.setValue({
				"fieldId":"custitem_g2_name",
				value:itemFields.custitem_g2_name
			});
			
			newItem.setValue({
				fieldId: 'usebins',
				value: true
			});

			newItem.setValue({
				fieldId : 'parent',
				value : parentItem
			});

			newItem.setValue({
				fieldId : 'custitem_wms_receivingshell',
				value : true
			});

			newItem.setValue({
				fieldId : 'custitem_wms_originalpo',
				value : poId
			});
			//TODO - hardcoded default of 'Used'
			newItem.setValue({
				fieldId: 'class',
				value: poType.class.hasOwnProperty('value')?poType.class[0].value:2
			});
			
			try
			{
				newItem.setValue({
					fieldId : 'custitem_g2_itemtype_ref',
					value : itemFields.custitem_g2_itemtype_ref[0].value
				});
			}catch(eX)
			{
				log.error({"title":"FIELDSET ERROR custitem_g2_itemtype_ref","details":JSON.stringify(eX)});
			}
			try
			{
			newItem.setValue({
				fieldId : 'custitem_g2_model_ref',
				value : itemFields.custitem_g2_model_ref[0].value
			});
			}catch(eX)
			{
				log.error({"title":"FIELDSET ERROR custitem_g2_model_ref","details":JSON.stringify(eX)});
			}
			try
			{
			newItem.setValue({
				fieldId : 'custitem_g2_brand_ref',
				value : itemFields.custitem_g2_brand_ref[0].value
			});
			}catch(eX)
			{
				log.error({"title":"FIELDSET ERROR custitem_g2_brand_ref","details":JSON.stringify(eX)});
			}
			try
			{
			newItem.setValue({
				fieldId : 'custitem_g2_category_ref',
				value : itemFields.custitem_g2_category_ref[0].value
			});
			}catch(eX)
			{
				log.error({"title":"FIELDSET ERROR custitem_g2_category_ref","details":JSON.stringify(eX)});
			}
			//NG-1111 adding expected condition to child items
			try
			{
			newItem.setValue({
				fieldId : 'custitem_g2_condition_ref',
				value : expectedCondition
			});
			}catch(eX)
			{
				log.error({"title":"FIELDSET ERROR custitem_g2_condition_ref","details":JSON.stringify(eX)});
			}
			//add base price setting now
			var basePriceLine = newItem.findSublistLineWithValue({
			    sublistId: 'price',
			    fieldId: 'pricelevelname',
			    value: 'Base Price'
			});
			if(basePriceLine != -1 && basePrice !="" && basePrice != undefined){
				log.debug('setting base price for item: ' + context.value,basePrice);
				newItem.setSublistValue({
				    sublistId: 'price',
				    fieldId: 'price_1_',
				    line : basePriceLine,
				    value : basePrice
				});				
			}
				var newItemId = newItem.save();
				log.debug({
					title : 'item created!',
					details : newItemId + " <<<"
				})
				
				//NG-1111 moving code to update the item name in Map
				var date = new Date();
				var monthNum = date.getMonth() +1;
				var monthObj = { 10 : "T", 11 : "N" , 12 : "D"};
				if(monthNum > 9){
					monthNum = monthObj[monthNum];
				}
				
				var newSku = "D"
				+ newItemId
				+ monthNum
				+ "-"
				+ (new Date().getFullYear().toString()
						.substr(-2));

				record.submitFields({
				    type: search.Type.INVENTORY_ITEM,
				    id: newItemId,
				    values: {
				    	'custitem_g2_sku': newSku,
				    	'itemid' : newSku
				    },
				    options: {
				        enableSourcing: false,
				        ignoreMandatoryFields : true
				    }
				});
			
				lines.push(newItemId);
			} catch (e) {
				log.debug({
					title : 'error!',
					details : JSON.stringify(e)
				})
			}
			qty--;
		} while (qty > 0);

		context.write({
			key : poId,
			value : {
				"lineId" : line,
				"lines" : lines
			}
		});
	}

	/**
	 * Executes when the reduce entry point is triggered and applies to each
	 * group.
	 * 
	 * @param {ReduceSummary}
	 *            context - Data collection containing the groups to process
	 *            through the reduce stage
	 * @since 2015.1
	 */
	/*
	 * Reduce handles PO modifications specifically
	 * 
	 */
	function reduce(context) {
		try {
			context.errors.iterator().each(
					function(key, error, executionNo) {
						log.error({
							title : 'Reduce error for key: ' + key
									+ ', execution no  ' + executionNo,
							details : error
						});
						return true;
					});
			// values stringified in an array
			var lines = context.values.map(function(i) {
				return JSON.parse(i)
			})
			log.debug("po " + context.key, "items " + lines.length);

			var newItems = []
			
			// lines are grouped by PO in shuffle
			var po = record.load({
				type : record.Type.PURCHASE_ORDER,
				id : context.key,
				isDynamic : true
			});
			
			var poType = po.getValue({
				fieldId: 'class'
			});
			
			for (var i = 0; i < lines.length; i++) {
				var lineId = lines[i].lineId;
				var qtyLines = lines[i].lines;
				
				var lineNum = po.findSublistLineWithValue({
					sublistId : 'item',
					fieldId : 'lineuniquekey',
					value : lineId
				})
				
				var rate = po.getSublistValue({
					sublistId: 'item',
					fieldId: 'rate',
					line: lineNum
				});
				
				// pre establish the qty per line
				// total orig qty / number of child items
				// will only ever be 1 or original qty
				// unless something changes in map
				log.debug({"title":"QTY Calc","details":po.getSublistValue({
					sublistId: 'item',
					fieldId: 'quantity',
					line: lineNum
				})/qtyLines.length});
				
				var qty = po.getSublistValue({
					sublistId: 'item',
					fieldId: 'quantity',
					line: lineNum
				})/qtyLines.length;
								
				
				/*var poFields = po.getSublistFields({
					sublistId: 'item'
				}).filter(function(m){ return m.match(/custcol_/)})*/
				
				var poFields = po.getSublistFields({
					sublistId: 'item'
				});
			
				
				do {
					var newItem = qtyLines.shift();
					log.debug('newItem', "|" +newItem+"|");

					po.selectNewLine({
						sublistId : 'item'
					});

					po.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'item',
						value : newItem
					});
					
					po.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'rate',
						value: rate
					});
					
					po.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'quantity',
						value: qty 
					});
					log.debug('after Rate and qty set', rate + " " + qty + " " + poFields.length + " " + 'item');
					/*for (var k=0; k<poFields.length;k++){
						if(poFields[k] == 'custcol_expectedqty'){
							continue;
						}
						po.setCurrentSublistValue({
							sublistId: 'item',
							fieldId: poFields[k],
							value: po.getSublistValue({
								sublistId: 'item',
								fieldId: poFields[k],
								line: lineNum
							})
						})
					}*/
					var custcol_wipfli_g2in=null;
					for (var i_col=0;i_col<poFields.length;i_col++)
					{
						if(poFields[i_col].indexOf("custcol_")==0 && poFields[i_col]!="custcol_expectedqty")
						{
							log.debug({"title":"Setting "+ poFields[i_col] +" line " + String(lineNum),"details":po.getSublistValue({
									sublistId: 'item',
									fieldId: poFields[i_col],
									line: lineNum
								})});
							if(poFields[i_col]=="custcol_wipfli_g2in")
								custcol_wipfli_g2in=po.getSublistValue({sublistId: 'item',fieldId: poFields[i_col],line: lineNum});
							try
							{
								po.setCurrentSublistValue({
									sublistId: 'item',
									fieldId: poFields[i_col],
									value: po.getSublistValue({
										sublistId: 'item',
										fieldId: poFields[i_col],
										line: lineNum
									})
								});
							}catch(eX){
								log.error({"title":"Column Set Error","details":JSON.stringify(eX)});
							}
						}
					}
					//Update Expected Quantity as well to whatever the quantity is being set to above
					po.setCurrentSublistValue({
						sublistId: 'item',
						fieldId: 'custcol_expectedqty',
						value: qty 
					});
					
					po.setCurrentSublistValue({
						sublistId : 'item',
						fieldId : 'custcol_wms_childitemgenerator',
						value : false
					});
					
					/*if(custcol_wipfli_g2in!=null)
					{
						po.setCurrentSublistValue({"sublistId":"item","fieldId":"custcol_wipfli_g2in","value":custcol_wipfli_g2in});//setting post, just to force it in
						log.debug({"title":"POST-SETTING custcol_wipfli_g2in","details":"Value: "+custcol_wipfli_g2in});
					}*/

					newItems.push(newItem);

					po.commitLine({
						sublistId : 'item'
					});

				} while (qtyLines.length > 0)



				po.selectLine({
					sublistId : 'item',
					line : lineNum
				});

				po.setCurrentSublistValue({
					sublistId : 'item',
					fieldId : 'quantity',
					value : 0
				});
				po.setCurrentSublistValue({
					sublistId : 'item',
					fieldId : 'custcol_wms_childitemgenerator',
					value : false
				});
				//custcol_wms_hideinwms
				//VF adding check to true for parent items that have child items generated for them so they do not 
				//show up on the receiving field to be received 
				po.setCurrentSublistValue({
					sublistId : 'item',
					fieldId : 'custcol_wms_hideinwms',
					value : true
				});
				

				po.commitLine({
					sublistId : 'item'
				});
			}

			po.save();

			log.debug({
				title : "PO " + po.getValue("tranid"),
				details : "Pre mod lines: " + JSON.stringify(context.values)
			});
		} catch (e) {
			log.debug("REDUCE ERROR", JSON.stringify(e))
		}
		// pass through everything for SKU generation
		context.write({
			key : context.key,
			value : newItems
		})

	}

	/*
	 * Summarize updates item name and sku (internal id derived) for all newly
	 * created items that made it through reduce this protects (somewhat)
	 * against errors therein, since sku is required for almost all WMS
	 * activities
	 */
	
	function summarize(summary) {
		log.audit({
			title : "date",
			details : summary.dateCreated
		});
		log.audit({
			title : "time",
			details : summary.seconds
		});
		log.audit({
			title : "usage",
			details : summary.usage
		});
		log.audit({
			title : "yields",
			details : summary.yields
		});
		log.audit({
			title : "inputSummary",
			details : JSON.stringify(summary.inputSummary)
		});
		log.audit({
			title : "mapSummary",
			details : JSON.stringify(summary.mapSummary)
		});
		log.audit({
			title : "reduceSummary",
			details : JSON.stringify(summary.reduceSummary)
		});

		if (summary.inputSummary.error) {
			log.debug("input errors", JSON
					.stringify(summary.inputSummary.error))
		}
		if (summary.mapSummary.error) {
			log.debug("map errors", JSON.stringify(summary.mapSummary.error))
		}
		if (summary.reduceSummary.error) {
			log.debug("reduce errors", JSON
					.stringify(summary.reduceSummary.error))
		}

		summary.output.iterator().each(
				function(key, value) {
					log.debug(key, value)
					var updateItems = JSON.parse(value);
					for (var i = 0; i < updateItems.length; i++) {
						var sku = search.lookupFields({
							type : search.Type.INVENTORY_ITEM,
							id : updateItems[i],
							columns : 'custitem_g2_sku'
						});

						//NG-1111 Moved Item Name creation to Map Function
						if (sku.custitem_g2_sku.length == 0) {
							log.debug('summary check for sku', sku.custitem_g2_sku);
							try {
								var date = new Date();
								var monthNum = date.getMonth() +1;
								
								var newSku = "D"
										+ updateItems[i]
										+ monthNum
										+ "-"
										+ (new Date().getFullYear().toString()
												.substr(-2));

								var item = record.load({
									type : record.Type.INVENTORY_ITEM,
									id : updateItems[i]
								});

								item.setValue({
									fieldId : 'custitem_g2_sku',
									value : newSku
								});

								item.setValue({
									fieldId : 'itemid',
									value : newSku
								})

								item.save();
							} catch (e) {
								log.debug("save error", JSON.stringify(e))
							}
						} else {
							log.audit(
									"Existing SKU for Item " + updateItems[i],
									sku.custitem_g2_sku)
						}
					}
					return true;
				});
	}

	return {
		getInputData : getInputData,
		map : map,
		reduce : reduce,
		summarize : summarize
	};

});
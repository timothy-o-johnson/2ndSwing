// EditLine before changes
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/file', 'N/cache', 'N/runtime', '../shared/ItemHelper', 'N/ui/serverWidget', 'N/runtime', '/SuiteScripts/PublishToBus/LIB_Graph_Quote.js', 'N/task','N/https'],

	function (record, search, file, cacheMod, runtime, itemHelper, sw, rt, api, task, https) {

		/**
		 * Definition of the Suitelet script trigger point.
		 * 
		 * @param {Object}
		 *            context
		 * @param {ServerRequest}
		 *            context.request - Encapsulation of the incoming request
		 * @param {ServerResponse}
		 *            context.response - Encapsulation of the Suitelet response
		 * @Since 2015.2
		 */
		function onRequest(context) {
			try {
				if (context.request.method === 'GET') {
					// load the form
					
					log.debug({
						title: typeof cacheMod,
						details: cacheMod
					})
					// get and load cacheKey
					// fill attributes
					// pull BPA
					// build fields

					// actions? (buttons will be on top, easiest, lets start
					// there)
					//VF Deploy Test Going To Work This Time - New eclipse version
					//TEST AGAIN
					var request = context.request;
					var params = context.request.parameters;

					var form = sw.createForm({
						title: '     ',
					});

					form.clientScriptModulePath = '/SuiteScripts/WMS/Receiving/EditLine-Client.js';

					// itemHelper.breadCrumber(runtime.getCurrentScript(),params);

					var item;
					var cacheKey = params['cacheKey'];
					var parsedKey = cacheKey.split(":") || [];

					if (cacheKey.length > 0) {
						log.debug({
							title: "redux: " + typeof cacheMod,
							details: cacheMod
						})
						var editCache = cacheMod.getCache({
							name: parsedKey[0],
							scope: cacheMod.Scope.PUBLIC
						});

						item = JSON.parse(editCache.get({
							key: cacheKey,
							ttl: 300,
							loader: parsedKey.length == 5 ? itemHelper.cacheTransactionItemLoader : itemHelper.cacheItemLoader
						}) || '{"cacheMiss":true}');
					}

					var cancel = form.addButton({
						id: 'custpage_button',
						label: "Exit",
						functionName: 'cancelModal'
					});

					//var cancelLine= form.addButton({
					//	id : 'custpage_button_cancel_line',
					//	label : "Cancel Line",
					//	functionName : 'cancelLine'
					//});

					/**
					 * Moved code to on save of the item receipt. No longer a client trigger
					var bidPriceAtt = form.addButton({
						id : 'custpage_bpa',
						label : "Update Bid Price",
						functionName : 'getBidPriceAtt'
					});
					**/
					var save = form.addSubmitButton({
						label: "Save"
					});

					var editButton = form.addButton({
						id: 'custpage_attribution',
						label: 'Attribute Sku',
						functionName: 'attribution'
					});

					var editField = form.addField({
						id: 'custpage_attributionurl',
						label: 'editfield',
						type: sw.FieldType.TEXT
					});

					editField.updateDisplayType({
						displayType: sw.FieldDisplayType.HIDDEN
					});

					//VF adding for opportunity PO's, if you replace an item, you need to pass the replaced sku to the attribution page
					var attributionUrl = itemHelper.findAction('customdeploy_wms_itemattributeeditor')[0] + "&cacheKey=" + params['cacheKey'];

					if (params['custpage_repitem']) {
						attributionUrl += "&custpage_repitem=" + params['custpage_repitem'];
					}
					editField.defaultValue = attributionUrl;

					log.debug('item.itemClass', item.itemClass);

					// TODO: hardcoded used item class
					if (item.itemClass == 2) {
						var junkButton = form.addButton({
							id: 'custpage_junker',
							label: "Assign Junk Sku",
							functionName: 'junker'
						});

						var junkField = form.addField({
							id: 'custpage_junkurl',
							label: '&nbsp;',
							type: sw.FieldType.TEXT
						});

						junkField.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						});

						junkField.defaultValue = itemHelper.findAction('customdeploy_wms_junkskuer')[0] + "&cacheKey=" + params['cacheKey'] + "&custpage_repitem="
							+ params['custpage_repitem']

						var scanButton = form.addButton({
							id: 'custpage_scanner',
							label: 'Scan UPC',
							functionName: 'scanner'
						});

						var scanField = form.addField({
							id: 'custpage_scanurl',
							label: '&nbsp;',
							type: sw.FieldType.TEXT
						});

						scanField.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						});

						scanField.defaultValue = itemHelper.findAction('customdeploy_wms_upcmatcher')[0] + "&cacheKey=" + params['cacheKey'];

						var findButton = form.addButton({
							id: 'custpage_finder',
							label: 'Assign Existing SKU',
							functionName: 'finder'
						});

						var finderField = form.addField({
							id: 'custpage_finderurl',
							label: 'finderurl',
							type: sw.FieldType.TEXT
						});

						finderField.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						});
						//TODO: preselected Category - VF 1/31/2019
						//TODO: add custpage_parent lookup below

						var lookupItem = search.lookupFields({
							type: item.itemType,
							id: item.itemId,
							columns: ['custitem_wms_parentitemcategory', 'parent']
						});
						var category = 0;
						var parent = 0;
						if (lookupItem.custitem_wms_parentitemcategory.length > 0) {
							if (lookupItem.custitem_wms_parentitemcategory[0].value) {
								category = lookupItem.custitem_wms_parentitemcategory[0].value;
							}
						}
						if (lookupItem.parent.length > 0) {
							if (lookupItem.parent[0].value) {
								parent = lookupItem.parent[0].value;
							}
						}

						log.debug('vince test category', category);
						log.debug('vince test parent', parent);

						finderField.defaultValue = itemHelper.findAction('customdeploy_wms_itemselector')[0] + "&custpage_function=assign&cacheKey=" + params['cacheKey']
							+ "&custpage_itemtype=" + item.itemClass + "&custpage_tranid=" + item.docId + "&custpage_trantype=" + item.docType + "&custpage_modal=true";
						if (category != 0 && parent != 0) {
							log.debug('in default value set', category);
							finderField.defaultValue = itemHelper.findAction('customdeploy_wms_itemselector')[0] + "&custpage_function=assign&cacheKey=" + params['cacheKey']
								+ "&custpage_itemtype=" + item.itemClass + "&custpage_tranid=" + item.docId + "&custpage_trantype=" + item.docType + "&custpage_modal=true"
								+ '&custpage_category=' + category + '&custpage_parent=' + parent;
						}

					}
					if (item.hasOwnProperty('cacheMiss')) {
						form.title = " Error: missing itemid or cache and key values."

					} else {

						if (params['custpage_repitem']) {
							// if we have a URL param for replacement item,
							// save it and trigger warning for user
							var repItem = form.addField({
								id: 'custpage_repitem',
								label: '&nbsp;',
								type: sw.FieldType.TEXT
							});

							repItem.updateDisplayType({
								displayType: sw.FieldDisplayType.HIDDEN
							});

							repItem.defaultValue = params['custpage_repitem']

							var repItemName = form.addField({
								id: 'custpage_repitemname',
								label: '&nbsp;',
								type: sw.FieldType.TEXT
							});

							repItemName.updateDisplayType({
								displayType: sw.FieldDisplayType.HIDDEN
							})

							// TODO: i think we can assume these will always
							// be inventory items?
							repItemName.defaultValue = search.lookupFields({
								type: search.Type.INVENTORY_ITEM,
								id: params['custpage_repitem'],
								columns: ['itemid']
							}).itemid
						}

						//set attributed field to display dropdown if an item has already been attributed
						if (params['custpage_attributed']) {
							var alreadyAttributed = form.addField({
								id: 'custpage_attributed',
								label: 'been attributed?',
								type: sw.FieldType.TEXT
							});

							alreadyAttributed.updateDisplayType({
								displayType: sw.FieldDisplayType.HIDDEN
							});

							alreadyAttributed.defaultValue = params['custpage_attributed']

						}

						var filledItem = itemHelper.fillattrRefValues(item, null, true);
						var attributeList = filledItem.fieldData

						var tranRec = filledItem.tranRec;

						// TJ, To Do: change field group
						var fgAttribute = form.addFieldGroup({
							id: 'custpage_fg_attribute',
							label: "Attributes"
						});

						fgAttribute.isSingleColumn = true;

						var parentImage = form.addFieldGroup({
							id: 'custpage_parent_image',
							label: "Parent Image"
						});
						parentImage.isSingleColumn = true;

						var imageField = form.addField({
							id: 'custpage_test_image',
							label: 'Maybe an image here?',
							type: sw.FieldType.INLINEHTML,
							container: 'custpage_parent_image'
						});

						log.debug('item image url', item.parentimg);
						imageField.defaultValue = "<img src=" + item.parentimg + ">";

						var psku = form.addField({
							id: 'custpage_psku',
							label: 'Parent Sku',
							type: sw.FieldType.TEXT,
							container: 'custpage_fg_attribute'
						});

						psku.updateDisplayType({
							displayType: sw.FieldDisplayType.DISABLED
						});

						psku.defaultValue = filledItem.parentSku;

						var cancelLine = form.addField({
							id: 'custpage_cancel_line',
							label: 'Cancel Purchase Order Line',
							type: sw.FieldType.CHECKBOX,
							container: 'custpage_fg_attribute'
						});

						cancelLine.updateDisplayType({
							displayType: sw.FieldDisplayType.ENTRY
						});


						var notes = form.addField({
							id: 'custpage_notes',
							label: 'Receiving Notes',
							type: sw.FieldType.TEXTAREA,
							container: 'custpage_fg_attribute'
						});

						notes.updateDisplaySize({
							height: 5,
							width: 80
						});
						// NG - 787
						notes.defaultValue = filledItem.receivingNotes;

						var qtyReceived = form.addField({
							id: 'custpage_quantity_received',
							label: 'Quantity Received',
							type: sw.FieldType.INTEGER,
							container: 'custpage_fg_attribute'
						});
						qtyReceived.defaultValue = parseInt(filledItem.expectedQuantity)

						// NG-1469: split into multiple SKUs
						var multipleSkus = form.addField({
							id: 'custpage_multipleskus',
							label: 'Multiple SKUs ?',
							type: sw.FieldType.CHECKBOX,
							container: 'custpage_fg_attribute'
						})

						//NG-461
						var qtyExpected = form.addField({
							id: 'custpage_quantity_expected',
							label: "Quantity Expected",
							type: sw.FieldType.INTEGER,
							container: 'custpage_fg_attribute'
						})
						qtyExpected.defaultValue = parseInt(filledItem.expectedQuantity)
						qtyExpected.updateDisplayType({
							displayType: sw.FieldDisplayType.DISABLED
						});

						var bpaFieldNames = form.addField({
							id: 'custpage_fielddata_object',
							label: 'Hidden Field Array',
							type: sw.FieldType.TEXT,
							container: 'custpage_fg_attribute'
						});
						bpaFieldNames.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						});

						var bpaHasChanged = form.addField({
							id: 'custpage_fielddata_has_changed',
							label: 'Hidden BPA Have Changed',
							type: sw.FieldType.CHECKBOX,
							container: 'custpage_fg_attribute'
						});
						bpaHasChanged.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						});

						var bpaFieldArray = [];

						// class 2 = '400 Used'
						if (item.itemClass == 2) {

							var categoryFields = search.lookupFields({
								type: 'customrecord_g2_category',
								id: item.categoryId,
								columns: ['custrecord_g2_category_condition_refs']
							});
							log.debug('categoryFields', categoryFields);

							var catConditions = categoryFields.custrecord_g2_category_condition_refs;
							log.debug('conditions from category', catConditions);

							var conditionIds = [];
							for (var p = 0; p < catConditions.length; p++) {
								conditionIds.push(catConditions[p].value);
							}
							log.debug('condition Id array', conditionIds);

							// iterate each of the fields for this line
							// for bpa only really
							for (var f = 0; f < attributeList.length; f++) {
								var field = attributeList[f];
								// if it's a bpa field
								var formField;

								if (field.hasOwnProperty('custrecord_fmd_bidpriceattribute') && field.custrecord_fmd_bidpriceattribute.id) {

									log.debug('vf column', field.custrecord_fmd_columnscriptid.id);
									log.debug('vf field form', 'custpage_eia_fielddata_' + field.id);
									bpaFieldArray.push(field.custrecord_fmd_columnscriptid.id + ":" + 'custpage_eia_fielddata_' + field.id + ":" + field.value);
									
									//if it's a condition, create a customized field and (dropdown?) selections for this field
									if (field['custrecord_fmd_listrecscriptid'].id == 'customrecord_g2_condition') {
										formField = form.addField({
											id: 'custpage_eia_fielddata_' + field.id,
											label: field['custrecord_fmd_field'].text,
											type: field['custrecord_fmd_fieldtype'].id,
											container: 'custpage_fg_attribute'
										})
										formField.addSelectOption({
											value: '',
											text: '&nbsp;'
										});

										//Add array of conditions on the Category record as another filter
										search.create({
											type: field['custrecord_fmd_listrecscriptid'].id,
											filters: [search.createFilter({
												name: 'custrecord_g2_condition_validforgsv',
												operator: search.Operator.IS,
												values: ['T']
											}), search.createFilter({
												name: 'internalid',
												operator: search.Operator.ANYOF,
												values: conditionIds
											})],
											columns: [search.createColumn({
												name: 'name'
											})]
										}).run().each(function (res) {
											formField.addSelectOption({
												value: res.id,
												text: res.getValue({
													name: 'name'
												})
											});

											return true;
										});

									} else {
									// create a basic field in the attribute field group
										formField = form.addField({
											id: 'custpage_eia_fielddata_' + field.id,
											label: field['custrecord_fmd_field'].text,
											type: field['custrecord_fmd_fieldtype'].id,
											source: field['custrecord_fmd_listrecscriptid'].id,
											container: 'custpage_fg_attribute'
										});

									}
									if (field['custrecord_fmd_fieldtype'].id == 'checkbox') {
										formField.defaultValue = field.value == true ? 'T' : 'F';
									} else {
										formField.defaultValue = field.value || null;
									}
								}
							}
							log.debug('vf bpaFieldArray', JSON.stringify(bpaFieldArray));

							if (bpaFieldArray.length > 0) {
								bpaFieldNames.defaultValue = JSON.stringify(bpaFieldArray);
							} else {
								log.debug('vf bpaFieldArray emptry');
								bpaFieldNames.defaultValue = "[]";
							}

							var bidPrice = form.addField({
								id: 'custpage_bidprice',
								label: 'Bid Price',
								type: sw.FieldType.CURRENCY,
								container: 'custpage_fg_attribute'
							})

							bidPrice.updateDisplayType({
								displayType: sw.FieldDisplayType.INLINE
							});

							bidPrice.defaultValue = filledItem.unitprice;
						}

						var cacheKeyField = form.addField({
							id: 'custpage_cachekey',
							label: "hidden",
							type: sw.FieldType.TEXT,
						})
						cacheKeyField.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						})

						cacheKeyField.defaultValue = cacheKey;

						var poId = cacheKey.split(":")[1];
						log.debug('poid', poId);

						var gsvValue = search.lookupFields({
							type: 'purchaseorder',
							id: poId,
							columns: ['custbody_gsvsite_ref']
						});
						log.debug('gsv Lookup', gsvValue);

						var gsvGUID = '';

						if (gsvValue.custbody_gsvsite_ref.length > 0) {
							var gsvSiteId = gsvValue.custbody_gsvsite_ref[0].value;
							log.debug('gsvSiteId', gsvSiteId);
							gsvGUID = search.lookupFields({
								type: 'customrecord_gsv_site',
								id: gsvSiteId,
								columns: ['custrecord_gsv_site_guid']
							});
							gsvGUID = gsvGUID.custrecord_gsv_site_guid;
							log.debug('GSV GUID', gsvGUID);
						}

						var gsvSiteGUID = form.addField({
							id: 'custpage_gsv_guid',
							label: "hidden guid",
							type: sw.FieldType.TEXT,
						});
						gsvSiteGUID.updateDisplayType({
							displayType: sw.FieldDisplayType.HIDDEN
						});
						gsvSiteGUID.defaultValue = gsvGUID;

						context.response.writePage(form);

					}
				} else { // POST
					
					// check for URL param to 'replace' item
					// this will be an update to the PO (to replace the
					// original item)
					// carry over BPA attributes to the IR -ONLY-
					// create item receipt

					var params = context.request.parameters; // all fields from form 
					
					var multipleSkus = params['custpage_multipleskus'] === 'T' 					
					var repItemId = params['custpage_repitem'] || ''; // item to update
					var quantityReceived = params['custpage_quantity_received']
					var notes = params['custpage_notes'];
					var lineIsCancelled = (params['custpage_cancel_line'] === false || params['custpage_cancel_line'] === 'F') ? false : true
					var cacheKey = params['custpage_cachekey']; // TJ, NG-1469: cacheKey = custpage_cachekey=purchaseorder:3370582:inventoryitem:41285:9931546

					var parsedKey = cacheKey.split(/:/); // example --> [purchaseorder, 3370582, inventoryitem, 41285, 9931546]
					var tranType = parsedKey[0] // transaction type
					var tranId = parsedKey[1] // transaction id

					var origCache = getOrigCache(tranType, cacheKey)
					var fields = origCache.fieldData;
					
					var newItemCache
										
					// TJ: how to cancel the line
					if (lineIsCancelled) {

						log.debug('add cancel code here');

						// TJ: load PO, find the item on the sublist, 
						var poRec = record.load({
							type: tranType,
							id: tranId
						});
						log.debug('cancel lineuniquekey', parsedKey[4]);

						if (notes) {
							var notesToUpdate = notes;
						}
						var findLine = poRec.findSublistLineWithValue({
							sublistId: 'item',
							fieldId: 'lineuniquekey',
							value: parsedKey[4]
						});

						// if the line exists
						if (findLine != -1) {
							// update receiving notes
							poRec.setSublistValue({
								sublistId: 'item',
								fieldId: 'custcol_wms_recvnotes',
								line: findLine,
								value: notesToUpdate
							});
							// set item to close
							poRec.setSublistValue({
								sublistId: 'item',
								fieldId: 'isclosed',
								line: findLine,
								value: true
							});

							//NG-899 - cancelling a line should only close the rest if partially received
							// TJ: what does partially received mean?
							if(poRec.getSublistValue({
								sublistId: 'item',
								fieldId: 'quantityreceived',
								line: findLine,
							}) == 0){
								poRec.setSublistValue({
									sublistId: 'item',
									fieldId: 'custcol_wms_hideinwms',
									line: findLine,
									value: true
								});
							}
						}
						var poId = poRec.save();
						log.debug('closed Purchase Order Line ' + findLine, poId);

						context.response.write("<script>window.opener.location.reload(true);window.close();</script>");
					} else {// TJ: if not canceling line... 
						// ...and there is a replacement item, store this repItemId onto the record (purchase order)
						if(repItemId){
							// NG-1469: handle multiple skus
							if(multipleSkus && quantityReceived > 1){
								var repItemIds = [] // a collection of replacement item ids for processing multiple skus option
								offLoadToMRScript(params, repItemIds, parsedKey, fields, context, quantityReceived,repItemId)	
							} else { // if just a single-sku item
								newItemCache = saveReplacementItemToPurchaseOrder(parsedKey, quantityReceived, repItemId)
								createItemReceipt(newItemCache, quantityReceived, params, repItemId, fields)
								context.response.write("<script>window.opener.location.reload(true);window.close();</script>");
							}
						}
					}	
				}
			} catch (e) {
				log.error("error", JSON.stringify(e))
				context.response.write('OOPS: ' + JSON.stringify(e));
			}
		}

		function createSku (newItemId){
			// based off of ItemHelper.createItem()

			log.debug('createSku() incoming newItemId', newItemId)
			

			var newSku
			
			var date = new Date();
			var monthNum = date.getMonth() +1;
			var monthObj = { 10 : "T", 11 : "N" , 12 : "D"};
			
			if(monthNum > 9){
				monthNum = monthObj[monthNum];
			}

			
			newSku = "D" + newItemId + monthNum+"-" + (new Date().getFullYear().toString().substr(-2));
			log.debug('createSku(), newSku', newSku)
			
		// return { sku : newSku, id: newItemId}
		return newSku
		}

		function setSkuAndItemId (newItemId, newItemSku){
			log.debug('setSkuAndItemId(), newItemId', newItemId)
			

			try {	
				// load & save item record to store SKU & itemid
				var item = record.load({
					type : record.Type.INVENTORY_ITEM,
					id : newItemId
				});

				item.setValue({
					fieldId : 'custitem_g2_sku',
					value : newItemSku
				});

				item.setValue({
					fieldId : 'itemid',
					value : newItemSku
				})

				newItemId = item.save();
				log.debug('setSkuAndItemId(), newItemId', newItemId)

				return newItemId 
			} catch (e) {
				log.error('error setting SKU and Item Id', JSON.stringify(e))
			}
		}

		function createExtraReplacementItems (repItemId, quantityReceived, repItemIds){
			// log.debug('createExtraReplacementItems()')
			// log.debug('repItemId', repItemId)
			// log.debug('quantityReceived', quantityReceived)
			// log.debug('typof repItemIds', typeof repItemIds)

			var numberOfCopies = quantityReceived - 1
			var newItemRecordId
			var newItemRecord
			var newItemSku
			var tempItemId

			// use quantity to determine number of new items to be replaced
			// create new item record
			// update new item record with data from original replacement item
			// store itemid

			log.debug('numberOfCopies', numberOfCopies)
			
			for (var i = 0; i < numberOfCopies; i++){
				log.debug('createExtraReplacementItems(), incoming repItemId:', repItemId)
			
				// get record data from original replacement item
				newItemRecord = record.copy({
					type: record.Type.INVENTORY_ITEM,
					id: repItemId
				});

				tempItemId = repItemId + 'sku' + i // gets updated in setSkuAndItemId()
				log.debug('newItemRecordId appended with sku + #', tempItemId)

				// save copy with with newRecordId to transfer data
				newItemRecord.setValue({
						fieldId: 'itemid',
						value: tempItemId
					});

				newItemRecordId = newItemRecord.save()
				log.debug('newItemRecordId before save', newItemRecordId)				

				newItemSku = createSku(newItemRecordId)
				newItemRecordId = setSkuAndItemId(newItemRecordId, newItemSku)

				repItemIds.push(newItemRecordId)
				log.debug('createExtraReplacementItems, newItemRecordId:', newItemRecordId)
				
			}	
			
			return repItemIds
		}

		function saveReplacementItemToPurchaseOrder (parsedKey, quantityReceived, itemId){

			var tranType = parsedKey[0] // transaction type
			var tranId = parsedKey[1] // transaction id
			var addedFromType = parsedKey[2] // originating item type
			var addedFrom =  parsedKey[3] // associate to item
			var addedFromLineKey = parsedKey[4] // unique key for tran line to update qty of

			//var itemId = params['custpage_repitem'] || ''; // item to update
			//var quantityReceived = 0 //params['custpage_quantity_received']

			var newItemCache = itemHelper.addItemToTransaction({
				tranType: tranType, // transaction type
				tranId: tranId, // transaction id
				itemId: itemId, // item to add
				quantity: quantityReceived, // quantity to set
				addedFromType: addedFromType, // originating item type
				addedFrom: addedFrom, // associate to item
				addedFromLineKey: addedFromLineKey, // unique key for tran line to update qty of
			}, true);

			log.debug('saveReplacementItemToPurchaseOrder, newItemCache', JSON.parse(newItemCache))
			

			return newItemCache
		}

		function getOrigCache (tranType, cacheKey){
			var origCache, docCache
			 
			docCache = cacheMod.getCache({
						name: tranType,
						scope: cacheMod.Scope.PUBLIC
					});

			origCache = JSON.parse(docCache.get({
						key: cacheKey,
						loader: itemHelper.cacheTransactionItemLoader,
						ttl: 3600
					}) || "{}");

			return origCache
		}

		function getBPAs (params){
			// pull out our bpa fields from the parameters, keeping the keys available
			// there are some silly other parameter fields we need to avoid, hence the regex

			var bpas = Object.keys(params).filter(function (i) {
						return i.match(/^custpage_eia_fielddata_\d+$/)
					});
			
			return bpas
		}

		function createItemReceipt (newItemCache, quantityReceived, params, repItem, fields){
			var notes = params['custpage_notes']
			var unitPrice = params['custpage_bidprice'] || 0;
			var bpas = getBPAs(params)
			var bpaHasChanged = params['custpage_fielddata_has_changed'];
			var quantityExpected = params['custpage_quantity_expected']
			
			newItemCache = JSON.parse(newItemCache);
			
			log.debug({
				title: 'repItem: ' + repItem,
				details: (typeof newItemCache) + Object.keys(newItemCache)
			});

			var newItemKey = newItemCache.cacheKey;
			var cacheKey = newItemKey;
			var parsedKey = cacheKey.split(/:/);

			var tranType = parsedKey[0] // transaction type
			var tranId = parsedKey[1] // transaction id
			//var addedFromType= parsedKey[2] // originating item type
			var addedFrom =  parsedKey[3] // associate to item
			var addedFromLineKey = parsedKey[4] // unique key for tran line to update qty of

			var orderRec;
			var irRec;
			// TJ: if cacheKey exists, create item reciept
			// TJ: Item Reciepts update the quantity recieved  
			// TJ: do we ever want this to run if the cache above is not stored? 
			// TJ: right now it will run with the old cache, that is, without item ever being added to the transaction
			if (cacheKey) {
				var lineToUpdate;
				var priceOverride = false;
				// VF bid price attributes and values all found above
				// TJ: bid price attributes and values are sourced from 
				// TJ: purchase order record transformation
				var quoteResult = '';

				// transform PO into Item Reciept
				var myReceipt = record.transform({
					fromType: tranType,
					fromId: tranId,
					toType: record.Type.ITEM_RECEIPT,
				});

				// receipt order line -> po order line -> unique key
				// TJ, get total sublist items on Item Receipt
				var lines = myReceipt.getLineCount({
					sublistId: 'item'
				})
		
				orderRec = record.load({
					type: tranType,
					id: tranId 
				});

				for (var e = 0; e < lines; e++) {
					// TJ: commented out
					// log.debug({
					// 	title: 'looking for:' + addedFromLineKey,
					// 	details: 'found: ' + orderLineKey
					// });

					// this is PROBABLY overkill, but...
					// explicitly isolate the lineunique key tied to this Item Receipt line
					// if that matches cacheKey's, RECEIVE!

					// get the line unique key for the Item Receipt
					var myReceiptOrderLine = myReceipt.getSublistValue({
								sublistId: 'item',
								line: e,
								fieldId: 'orderline'
							})

					var line = orderRec.findSublistLineWithValue({
							sublistId: 'item',
							fieldId: 'line',
							value: myReceiptOrderLine
						})

					var orderLineKey = orderRec.getSublistValue({
						sublistId: 'item',
						line: line,
						fieldId: 'lineuniquekey'
					});

					// get this line's priceOverride status
					priceOverride = orderRec.getSublistValue({
						sublistId: 'item',
						line: line,
						fieldId: 'custcol_wms_price_override'
					});
					// TJ: commented out
					// log.debug('priceOverride', priceOverride);

					// Our LINE!!!
					// TJ: if the orderLineKey matches the cache Unique Line Key,
					// Tj: we have found our line!! 
					// TJ: update the sublist on the Item Reciept 
					if (orderLineKey == addedFromLineKey) {

						myReceipt.setSublistValue({
							sublistId: 'item',
							fieldId: 'location',
							value: 4,
							line: e
						});

						myReceipt.setSublistValue({
							sublistId: 'item',
							fieldId: 'quantity', // is this sublist column label "Received" 
							value: quantityReceived,
							line: e
						});

						myReceipt.setSublistValue({
							sublistId: 'item',
							fieldId: 'custcol_expectedqty', // is this sublist column label "Quantity" ? No! That's in saveReplacementItemToPurchaseOrder()
							value: quantityExpected, // TJ NG-1469: "This needs to be 0, not the number submitted by the user when clicking the mulitple SKU?"
							line: e
						});

						myReceipt.setSublistValue({
							sublistId: 'item',
							fieldId: 'custcol_wms_recvnotes',
							value: notes,
							line: e
						});

						//make BPA object for API.QUOTE Call
						var bpaObject = {};

						// bid price loop!
						for (var b = 0; b < bpas.length; b++) {
							// extract field id(last element of name)
							var bpaIdx = bpas[b].split(/\_/).pop();

							// returns index of (first) object containing attribute == value
							var field = itemHelper.objIndexbyAttr(fields, "id", bpaIdx)

							if (field >= 0) {
								log.debug({
									title: "attribute: " + bpas[b],
									details: "field: " + fields[field].custrecord_fmd_columnscriptid.id + " ---- Value: " + params[bpas[b]]
								})

								myReceipt.setSublistValue({
									sublistId: 'item',
									fieldId: fields[field].custrecord_fmd_columnscriptid.id, // scriptid of the column fields
									value: params[bpas[b]],
									line: e
								})

								fields[field].value = params[bpas[b]]
								bpaObject[fields[field].custrecord_fmd_columnscriptid.id] = params[bpas[b]];
							}
						}

						log.debug('before bidPrice priceOverride', priceOverride);

						if (bpaHasChanged == 'T' && priceOverride != true) {
							var sku = params['custpage_psku'];
							var gsvGuid = params['custpage_gsv_guid'];
							var orderPaymentMethod = orderRec.getValue({ fieldId: 'custbody_paycode_ref' });
							
							log.debug('gsvGuid', gsvGuid);
							log.debug('sku', sku);
							log.debug('BPA Object', JSON.stringify(bpaObject));

							try {
								quoteResult = api.quote(gsvGuid, sku, bpaObject, orderPaymentMethod);
								log.debug('Quote Result', quoteResult);

								unitPrice = parseFloat(quoteResult);

							} catch (e) {
								log.debug('Quote Result', quoteResult);
								log.error('error', e);
								throw 'Error calculating updated Bid Price. Item Receipt Failed.'
							}

						} else {
							quoteResult = unitPrice;
						}



						// create subrecord for bin
						var binDetail = myReceipt.getSublistSubrecord({
							sublistId: 'item',
							fieldId: 'inventorydetail',
							line: e
						});

						log.debug({
							title: 'default bin?',
							details: binDetail.getSublistValue({
								sublistId: 'inventoryassignment',
								fieldId: 'binnumber',
								line: 0
							})
						});

						// TODO: which bin(s)?!?!?

						var defaultBin = runtime.getCurrentScript().getParameter({
							name: 'custscript_wms_defaultreceivingbin'
						});
						// hard coded to brad's generic receiving bin.
						var bin = 9802;
						if (defaultBin) {
							bin = defaultBin
						}
						log.debug('default bin', bin);

						binDetail.setSublistValue({
							sublistId: 'inventoryassignment',
							fieldId: 'binnumber',
							value: bin,
							line: 0
						});

						binDetail.setSublistValue({
							sublistId: 'inventoryassignment',
							fieldId: 'quantity',
							value: quantityReceived,
							line: 0
						});

						// TODO placeholder until Bid price lookup is ready.
						//If unit price is still 0, then assume opportunity receiving, and set rate to the rate of the PO line
						//NG-1082
						if(unitPrice == 0){
							var myReceiptValue = myReceipt.getSublistValue({
										sublistId: 'item',
										line: e,
										fieldId: 'orderline'
									})

							var orderRecLine = orderRec.findSublistLineWithValue({
									sublistId: 'item',
									fieldId: 'line',
									value: myReceiptValue
								})

							log.debug('opportunity receiving', unitPrice);
							
							unitPrice = orderRec.getSublistValue({
								sublistId: 'item',
								fieldId: 'rate',
								line: orderRecLine
							});
							
						}

						myReceipt.setSublistValue({
							sublistId: 'item',
							fieldId: 'rate',
							value: unitPrice,
							line: e
						});

						//set location on po line
						orderRec.setSublistValue({
							sublistId: 'item',
							fieldId: 'location',
							line: orderRecLine,
							value: 4
						});

						lineToUpdate = orderRecLine;

						log.debug('Order Line to Update', lineToUpdate);
						log.debug('quoteResult before checking if empty', quoteResult)

						if (quoteResult != '') {
							log.debug('quoteResult before setting on PO', parseFloat(quoteResult))
							orderRec.setSublistValue({
								sublistId: 'item',
								fieldId: 'custcol_wms_actual_rate',
								line: lineToUpdate,
								value: parseFloat(quoteResult)
							});
						}

					} else { // not our line, set itemreceive to false
						myReceipt.setSublistValue({
							sublistId: 'item',
							fieldId: 'itemreceive',
							value: false,
							line: e
						});

					}
				}// end myReceipt lines

				try { // try to save itemReceipt
					irRec = myReceipt.save();

					log.debug('before PO save, check line to update', lineToUpdate);
					
					// trying to resolve the "record has changed" error
					// TJ: could this be removed from the loop
					if (irRec) { // if there is an item receipt,update the purchase order

						orderRec = record.load({
							type: tranType,
							id: tranId
						});

						//set location on po line
						orderRec.setSublistValue({
							sublistId: 'item',
							fieldId: 'location',
							line: lineToUpdate,
							value: 4
						});

						log.debug('quoteResult after IR checking if empty', quoteResult)
						
						if (quoteResult != '') {
							log.debug('quoteResult after IR setting on PO', parseFloat(quoteResult))
							orderRec.setSublistValue({
								sublistId: 'item',
								fieldId: 'custcol_wms_actual_rate',
								line: lineToUpdate,
								value: parseFloat(quoteResult)
							});
						}

						if (notes) {
							//notes
							orderRec.setSublistValue({
								sublistId: 'item',
								fieldId: 'custcol_wms_recvnotes',
								line: lineToUpdate,
								value: notes
							});
						}

						//set PO actual fields here
						for (var c = 0; c < bpas.length; c++) {
							// extract field id(last element of name)
							var bpaIdx = bpas[c].split(/\_/).pop();
							// returns index of (first) object containing attribute == value
							var field = itemHelper.objIndexbyAttr(fields, "id", bpaIdx);

							if (field >= 0) {
								log.debug({
									title: "po atty: " + bpas[c],
									details: "po field: " + fields[field].custrecord_fmd_po_col_scriptid.id + " ---- Value: " + params[bpas[c]]
								});

								log.debug('po line to update', lineToUpdate);
								if (fields[field].custrecord_fmd_po_col_scriptid.id != "" && fields[field].custrecord_fmd_po_col_scriptid.id != undefined) {
									orderRec.setSublistValue({
										sublistId: 'item',
										fieldId: fields[field].custrecord_fmd_po_col_scriptid.id, // scriptid of the column fields
										line: lineToUpdate,
										value: params[bpas[c]]

									});
									fields[field].value = params[bpas[c]]
								}
							}
						}


						orderRec = orderRec.save();

						var parsedKey = cacheKey.split(/:/);
						var itemInternal = addedFrom;

						log.debug('item internal id', itemInternal);
						log.debug('bid price to update item', unitPrice);

						//now update the item record
						var itemRec = record.load({
							type: 'inventoryitem',
							id: itemInternal
						});
						
						//NG-1121 - set Receiving Shell == False
						itemRec.setValue({
							fieldId : 'custitem_wms_receivingshell',
							value : false
						});

						var bidPriceLine = itemRec.findSublistLineWithValue({
							sublistId: 'price',
							fieldId: 'pricelevelname',
							value: 'Bid Price'
						});
						if (bidPriceLine != -1) {
							bidPrice = itemRec.setSublistValue({
								sublistId: 'price',
								fieldId: 'price_1_',
								line: bidPriceLine,
								value: unitPrice
							});

						}
						var itemId = itemRec.save();
						log.debug('update item', itemId);


					}
				} catch (e) {
					// return something usable?
					log.error({
						title: "save error in createItemReceipt()",
						details: JSON.stringify(e)
					})

				}
			}// end if(cacheKey)
		}

		function helloWorld (){
			log.debug('hello world')
			
		}

		function offLoadToMRScript (params, repItemIds, parsedKey, fields, context, quantityReceived,repItemId ){
			// var mrTask = task.create({ taskType: task.TaskType.MAP_REDUCE })
			
			// mrTask.scriptId = 'customscript_mr_create_multiple_skus'
			
			// mrTask.deploymentId = 1
			
			// mrTask.params = {
			// 	'custscript_wms_form_params': params, 
			// 	'custscript_wms_replacement_item_ids': repItemIds,
			// 	'custscript_wms_edit_line_parsed_key': parsedKey,	
			// 	'custscript_wms_edit_line_fields': fields,
			// };
			
			// var mrTaskId = mrTask.submit()

			var data = {
				fields: fields,
				params: params,
				parsedKey: parsedKey,
				quantityReceived: quantityReceived,
				repItemId: repItemId,
				repItemIds: repItemIds,
			};

			log.debug('AA, TJ, JSON.stringif(redirectParams', JSON.stringify(data))

			var fileId = saveDataToFile (data)
			var redirectParams = { 
				'custscript_wms_edit_line_file_id': fileId
				}

			log.debug('AA, TJ, fileId', fileId)
			
			context.response.sendRedirect ({
				"type": https.RedirectType.SUITELET,
				"identifier": "customscript_mr_kickstartandmonitor",
				"id": "customdeploy_mr_kickstartandmonitor",
				"parameters": {
					"op": "launch",
					"l_scriptID": "customscript_mr_create_multiple_skus",
					"l_deployID": '',
					"l_params": JSON.stringify(redirectParams),
					"l_delay": "10"
				}
			});			
	
			return fileId
		}

		function saveDataToFile (data) {
		var folderId = 28697 // Sandbox: SuiteScripts/WMS/shared/EditLineData

		var dateTime = new Date().toString().split(' ') // ['Wed', 'Dec', '11', '2019', '20:52:27', 'GMT-0500', '(Eastern', 'Standard', 'Time)']
		var dateTime = dateTime[2] + dateTime[1] + dateTime[3] + '-' + dateTime[4] // "11Dec2019-21:22:43"
		var fileName = 'EditLineData-' + dateTime + '.txt'

		data = JSON.stringify(data)

		var fileObj = file.create({
			name: fileName,
			fileType: file.Type.PLAINTEXT,
			contents: data
		})
		
		fileObj.folder = folderId

		var fileId = fileObj.save()

		return fileId

		}




		return {
			createExtraReplacementItems: createExtraReplacementItems,
			createItemReceipt: createItemReceipt,
			helloWorld: helloWorld,
			onRequest: onRequest,
			saveReplacementItemToPurchaseOrder: saveReplacementItemToPurchaseOrder			
		};

	});


    // Editline- MR

/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/cache','/SuiteScripts/WMS/shared/SavedSearchLibrary' ], function (record, cache, sslib) {
  function getInputData () {
    return sslib.customsearch_mr_load_and_save_record()
  }

  function reduce (context) {
    try {
      var contextValues = context.values
      var itemInternalId = JSON.parse(contextValues[0]).id
      loadAndSaveItemRecord(itemInternalId)
    } catch (e) {
      log.debug('error', e)
    }
  }

  return {
    getInputData: getInputData,
    reduce: reduce
  }

  function loadAndSaveItemRecord (itemInternalId) {
    var itemRecord = loadItemRecord(itemInternalId)
    var result = itemRecord.save()
    var success = parseInt(result) === parseInt(itemInternalId)

    if (success) {
      log.debug(
        'Item # ' + itemInternalId + ' loaded and saved')
        return result
    } else {
      log.error(
        'Problem saving record',
        'itemInternalId = ' + itemInternalId + '\nresult = ' + result
      )
      log.error('typeof itemInternalId, result',typeof itemInternalId, typeof result)
    }
  }


  function loadItemRecord (recordInternalId) {
    var itemRecord = record.load({
      type: record.Type.INVENTORY_ITEM,
      id: recordInternalId
    })

    return itemRecord
  }
})


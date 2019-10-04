// NG-1523- Select Receiving Script Deployment
// https://4537321-sb1.app.netsuite.com/app/common/scripting/scriptrecord.nl?id=149

// Script 'Select Receiving' : https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=48

// Page "Receving for Used Order#etc" : https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3313298

/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/redirect', 'N/runtime', 'N/ui/serverWidget', 'N/url', 'N/search', 'N/record',
    '../shared/ItemHelper', 'N/cache', 'N/https'],
    /**
     * @param {redirect}
     *            redirect
     * @param {runtime}
     *            runtime
     * @param {ui}
     *            ui
     * 
     * @param {serverWidget}
     *            serverWidget
     * @param {url}
     *            url
     */
    function (redirect, runtime, sw, url, search, record, itemHelper, cache, https) {``
        var allFields;

        function ItemLines() {
            this.name = null;
            this.description = null;
            this.parent = null;
            this.category = null;
            this.itemType = null;
            this.class = null;
            this.condition = null;
            this.lineid = null;
            this.lineuniquekey = null;
            this.linesequencenumber = null;
            this.quantity = null;
            this.wmsexception = null;
            this.itemrate = null;
            this.quantityfulfilled = null;
            this.expectedquantity = null;
            this.amount = null;
            this.item_id = null;
            this.hideinwms = null;
            this.receivingnotes = null;

        }

        function Items() {
            this.itemid = null;
            this.itemname = null;
            this.category = null;
            this.categorytext = null;
            this.class = null;
            this.salesdescription = null;
            this.condition = null;
            this.conditiontext = null;
            this.sku = null;
            this.itemtype = null;
            this.parent = null;
            this.parentcategory = null;
            this.parentcategorytext = null;
            this.parentclass = null;
            this.parentsalesdescription = null;
            this.parentcondition = null;
            this.parentconditiontext = null;
            this.parentsku = null;
            this.parentitemtype = null;
            this.parentitemid = null;

        }


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
            // find a way to redirect back to main find suitelet
            // if no order parameter present. it's not directly
            // possible through header/referrers
            var startTime = new Date();
            var request = context.request;
            var params = context.request.parameters;

            var nextStep = itemHelper.findAction(runtime.getCurrentScript().getParameter({
                name: "custscript_wms_select_nextstep"
            }));

            var labelPrinter = itemHelper.findAction(runtime.getCurrentScript().getParameter({
                name: 'custscript_wms_labelprinter'
            }));

            var attributeSkuDirect = itemHelper.findAction(runtime.getCurrentScript().getParameter({
                name: 'custscript_wms_attribute_direct'
            }));

            try {
                if (context.request.method === 'POST') {
                    // POST will contain 1 of 3 types of sublists with
                    // results
                    // All putaway is defaulted by bin
                    // if (params['custpage_items']
                    // && JSON.parse(params['custpage_items']).length > 0) {
                    // redirect.toSuitelet({
                    // scriptId : nextStep[1],
                    // deploymentId : nextStep[2],
                    // parameters : {
                    // items : params['custpage_items']
                    // }
                    // });
                    // }
                    context.response.write(JSON.stringify(context.request));
                } else {
                    if (params['custpage_rf_orderid'] && params['custpage_rf_orderid'].length > 0) {

                        var lineAction = itemHelper.findAction(runtime.getCurrentScript().getParameter({
                            name: "custscript_wms_select_lineaction"
                        }));

                        var upcMatcher = itemHelper.findAction(runtime.getCurrentScript().getParameter({
                            name: 'custscript_wms_upcmatch'
                        }));

                        // sets current script location(and params) for
                        // redirection back.... maybe
                        itemHelper.breadCrumber(runtime.getCurrentScript(), params);

                        var receivingType = search.lookupFields({
                            type: search.Type.TRANSACTION,
                            id: params['custpage_rf_orderid'],
                            columns: 'recordtype'
                        });

                        // by record type is sufficient i think
                        var docCache = cache.getCache({
                            name: receivingType.recordtype,
                            scope: cache.Scope.PUBLIC,
                            ttl: 3600
                        });

                        var receiveOrder_id = params['custpage_rf_orderid'];

                        var POrec = record.load({
                            type: receivingType.recordtype,
                            id: params['custpage_rf_orderid'],
                            isDynamic: true
                        });

                        var receiveOrder_search = search.load({
                            id: 'customsearch1871'
                        });

                        receiveOrder_search.filters.push(
                            search.createFilter({
                                name: 'internalid',
                                operator: search.Operator.ANYOF,
                                values: params['custpage_rf_orderid']
                            })
                        );

                        var itemLinesHash = {};
                        var ctr = 0;
                        var receivingClass, receivingClassText, WMSNotes, tranid;

                        var itemsToSearch = [];
                        receiveOrder_search.run().each(function (result) {
                            //log.debug("RESULT: ", JSON.stringify(result));

                            receivingClass = result.getValue({ name: 'class' })
                            receivingClassText = result.getText({ name: 'class' });
                            WMSNotes = result.getValue({ name: 'custbody_wipfli_wms_notes' });
                            tranid = result.getValue({ name: 'tranid' });

                            var objTemp = new ItemLines();
                            objTemp.name = result.getText({ name: 'item' });
                            objTemp.parent = result.getValue({ name: 'parent', join: 'item' });
                            objTemp.category = result.getValue({ name: 'custitem_g2_category_ref', join: 'item' });
                            objTemp.itemType = result.getValue({ name: 'custitem_g2_itemtype_ref', join: 'item' });
                            objTemp.class = result.getValue({ name: 'class', join: 'item' });
                            objTemp.condition = result.getValue({ name: 'custitem_g2_condition_ref', join: 'item' });
                            objTemp.lineid = result.getValue({ name: 'line' });
                            objTemp.lineuniquekey = result.getValue({ name: 'lineuniquekey' });
                            objTemp.linesequencenumber = result.getValue({ name: 'linesequencenumber' });
                            objTemp.quantity = result.getValue({ name: 'quantity' });
                            objTemp.wmsexception = result.getValue({ name: 'custcol_wms_exception' });
                            objTemp.itemrate = result.getValue({ name: 'rate' });
                            objTemp.quantityfulfilled = result.getValue({ name: 'quantityshiprecv' });
                            objTemp.expectedquantity = result.getValue({ name: 'custcol_expectedqty' });
                            objTemp.hideinwms = result.getValue({ name: 'custcol_wms_hideinwms' });
                            objTemp.amount = result.getValue({ name: 'amount' });
                            objTemp.item_id = result.getValue({ name: 'item' });
                            objTemp.receivingnotes = result.getValue({ name: 'custcol_wms_recvnotes' });
                            log.debug("objTemp", JSON.stringify(objTemp));
                            itemLinesHash[objTemp.lineid] = objTemp;

                            //itemsToSearch.push(objTemp.parent);
                            itemsToSearch.push(objTemp.item_id);

                            ctr++;
                            return true;
                        });


                        var itemSearch = search.load({
                            id: 'customsearch1899'
                        });

                        itemSearch.filters.push(
                            search.createFilter({
                                name: 'internalid',
                                operator: search.Operator.ANYOF,
                                values: itemsToSearch
                            })
                        );

                        var itemHash = [];
                        itemSearch.run().each(function (result) {
                            //log.debug("RESULT ITEM: ", JSON.stringify(result));

                            var itemObjTemp = new Items();
                            var id = result.id;
                            itemObjTemp.itemid = result.getValue({ name: 'itemid' });
                            itemObjTemp.itemname = result.getValue({ name: 'displayname' });
                            itemObjTemp.category = result.getValue({ name: 'custitem_g2_category_ref' });
                            itemObjTemp.categorytext = result.getText({ name: 'custitem_g2_category_ref' });
                            itemObjTemp.class = result.getValue({ name: 'class' });
                            itemObjTemp.salesdescription = result.getValue({ name: 'custitem_sales_description' });
                            itemObjTemp.condition = result.getValue({ name: 'custitem_g2_condition_ref' });
                            itemObjTemp.conditiontext = result.getText({ name: 'custitem_g2_condition_ref' });
                            //the correct SKU field is itemid, not the custitem_g2_sku
                            //itemid in search returns parent:child, so need to do a split
                            var tempSku = result.getValue({ name: 'itemid' });
                            var splitSku = tempSku.split(':');
                            if (splitSku.length == 1) {
                                itemObjTemp.sku = splitSku[0];
                            } else {
                                itemObjTemp.sku = splitSku[1]
                            }

                            itemObjTemp.itemtype = result.getValue({ name: 'custitem_g2_itemtype_ref' });
                            itemObjTemp.parent = result.getValue({ name: 'parent' });
                            itemObjTemp.parentcategory = result.getValue({ name: "custitem_g2_category_ref", join: "parent" });
                            itemObjTemp.parentcategorytext = result.getText({ name: "custitem_g2_category_ref", join: "parent" });
                            itemObjTemp.parentsalesdescription = result.getValue({ name: "custitem_sales_description", join: "parent" });
                            itemObjTemp.parentcondition = result.getValue({ name: "custitem_g2_condition_ref", join: "parent" });
                            itemObjTemp.parentconditiontext = result.getText({ name: "custitem_g2_condition_ref", join: "parent" });
                            itemObjTemp.parentsku = result.getValue({ name: "custitem_g2_sku", join: "parent" });
                            itemObjTemp.parentitemtype = result.getValue({ name: "custitem_g2_itemtype_ref", join: "parent" });
                            itemObjTemp.parentitemid = result.getValue({ name: "itemid", join: "parent" });

                            //log.debug("ID", id);
                            itemHash[id] = itemObjTemp;
                            return true;
                        });


                        if (receivingClassText != "") {
                            var textArray = receivingClassText.split(":");

                            if (textArray[0].indexOf('Used') != -1) {
                                receivingClass = 2;
                            }
                        }

                        var totalLines = ctr;

                        var receivingForm = sw.createForm({
                            title: "Receiving For " + receivingClassText.substr(receivingClassText.lastIndexOf(" ") + 1, receivingClassText.length) + " Order#"
                                + tranid
                        });

                        var body = receivingForm.addField({
                            id: 'custpage_templateholder',
                            type: sw.FieldType.INLINEHTML,
                            label: '&nbsp;'
                        });

                        // get cache object for everything on our order
                        // dump lines marked for skipping and lines fully
                        // received
                        var attrArrayer = [];
                        var nullCount = 0;
                        for (var i = totalLines; i > 0; i--) {
                            //log.debug("itemLinesHash.hideinwms " + i, itemLinesHash[i].hideinwms);

                            //skip skippers
                            if (itemLinesHash[i].hideinwms == true) {
                                attrArrayer.push(null);
                                nullCount++;
                                continue;
                            }


                            var itemKey = [receivingType.recordtype, params['custpage_rf_orderid'], record.Type.INVENTORY_ITEM, itemLinesHash[i].item_id, itemLinesHash[i].lineuniquekey].join(":");

                            //log.debug("ItemKey", itemKey);
                            var scriptObj = runtime.getCurrentScript();


                            var item = {}; //cacheObj
                            var itemId = itemLinesHash[i].item_id;

                            //getAllFields():
                            allFields = {
                                origItemId: itemLinesHash[i].item_id,
                                itemId: itemLinesHash[i].item_id, // TODO: duplicate, in cache object
                                // already
                                itemType: itemLinesHash[i].itemtype, // TODO: duplicate, in cache object
                                // already
                                fieldData: []
                            };

                            var parent = itemLinesHash[i].parent;
                            //log.debug("PARENT", parent);
                            //log.debug('itemId', itemId);
                            if (parent) {
                                allFields.parentItemId = parent;
                                allFields.categoryId = itemHash[itemId].parentcategory;
                                allFields.categoryName = itemHash[itemId].parentcategorytext;
                                allFields.otherItemType = itemHash[itemId].parentitemtype;
                                allFields.parentName = itemHash[itemId].parentitemid;
                                allFields.parentSku = itemHash[itemId].parentitemid;
                            }
                            else {
                                allFields.categoryId = itemHash[itemId].category;
                                allFields.categoryName = itemHash[itemId].categorytext;
                                allFields.otherItemType = itemHash[itemId].itemtype;
                                allFields.parentName = itemHash[itemId].itemid;
                                allFields.parentSku = itemHash[itemId].itemid;
                            }

                            allFields.name = itemHash[itemId].itemid;
                            allFields.class = itemHash[itemId].class;
                            allFields.sku = itemHash[itemId].sku;
                            allFields.salesDesc = itemHash[itemId].salesdescription;
                            allFields.conditionText = itemHash[itemId].conditiontext;

                            if (parent) {
                                allFields.img = "https://imgs.2ndswing.com/images/clean-product/small/" + encodeURIComponent(allFields.sku) + ".jpg%2c/images/clean-product/small/"
                                    + encodeURIComponent(itemHash[itemId].parentsku) + ".jpg"

                                allFields.parentimg = "https://imgs.2ndswing.com/images/clean-product/small/" + encodeURIComponent(itemHash[itemId].parentsku) + ".jpg";

                            } else {
                                allFields.img = "https://imgs.2ndswing.com/images/clean-product/small/" + encodeURIComponent(allFields.sku) + ".jpg";

                                allFields.parentimg = "https://imgs.2ndswing.com/images/clean-product/small/" + encodeURIComponent(allFields.sku) + ".jpg";

                            }


                            allFields = attrRefFunction(allFields);
                            item = allFields;
                            item.docType = receivingType.recordType,
                                item.docId = params['custpage_rf_orderid'];
                            item.itemType = record.Type.INVENTORY_ITEM;
                            item.itemId = itemLinesHash[i].item_id;
                            item.uniqueLine = itemLinesHash[i].lineuniquekey;
                            item.cache = receivingType.recordtype;
                            item.cacheKey = itemKey;
                            log.debug("itemKey", itemKey);
                            log.debug("ITEM CACHE and CACHEKEY", item.cache + " | " + item.cacheKey);


                            if (scriptObj.getRemainingUsage() < 50) {
                                log.debug('before reloading Suitelet', scriptObj.getRemainingUsage());
                                var script = scriptObj.id;
                                var deployment = scriptObj.deploymentId;
                                var orderId = params['custpage_rf_orderid'];
                                //&custpage_rf_orderid
                                var accountId = runtime.accountId;

                                //"re-load" suitelet
                                redirect.toSuitelet({
                                    scriptId: script,
                                    deploymentId: deployment,
                                    parameters: { 'custpage_rf_orderid': orderId }
                                });

                            }

                            log.debug("Remaining governance units line 155: ", scriptObj.getRemainingUsage());

                            //var filledItem = itemHelper.fillattrRefValues(item, receiveOrder, true);
                            var filledItem;

                            var fromPO = true;

                            //fillAttrRefValues:
                            var getValuesFromPO = false;
                            if (fromPO == true) {
                                getValuesFromPO = true;
                            }

                            var cols = [];
                            for (var f = 0; f < item.fieldData.length; f++) {
                                cols.push(item.fieldData[f].custrecord_fmd_fieldscriptid.id);
                            }

                            var itemFields = search.lookupFields({
                                type: item.itemType,
                                id: item.itemId,
                                columns: cols
                            });


                            if (item.hasOwnProperty('docId')) {
                                item.quantity = itemLinesHash[i].quantity;
                                item.quantityReceived = itemLinesHash[i].quantityfulfilled;
                                item.unitPrice = itemLinesHash[i].rate;
                                item.exception = itemLinesHash[i].wmsexception;
                                item.expectedQuantity = itemLinesHash[i].expectedquantity;
                                item.receivingNotes = itemLinesHash[i].receivingnotes;

                                for (var f = 0; f < cols.length; f++) {
                                    if (itemFields[cols[f]].length > 0 && getValuesFromPO == false) {
                                        item.fieldData[f].value = itemFields[cols[f]][0].value;
                                        item.fieldData[f].valueText = itemFields[cols[f]][0].text;
                                        item.fieldData[f].itemFieldsValue = itemFields[cols[f]][0].value;
                                        item.fieldData[f].itemFieldsText = itemFields[cols[f]][0].text;
                                    }
                                    else if (itemFields[cols[f]].length == 0 && getValuesFromPO == false) {
                                        item.fieldData[f].value = itemFields[cols[f]];
                                        item.fieldData[f].valueText = itemFields[cols[f]];
                                        item.fieldData[f].itemFieldsValue = itemFields[cols[f]];
                                        item.fieldData[f].itemFieldsText = itemFields[cols[f]];
                                    }

                                    else {
                                        var lineItemNum = i - 1;
                                        item.fieldData[f].value = POrec.getSublistValue({
                                            sublistId: 'item',
                                            line: lineItemNum,
                                            fieldId: item.fieldData[f].custrecord_fmd_columnscriptid.id
                                        })
                                        item.fieldData[f].valueText = POrec.getSublistText({
                                            sublistId: 'item',
                                            line: lineItemNum,
                                            fieldId: item.fieldData[f].custrecord_fmd_columnscriptid.id
                                        });

                                        //add actual Value/ text for selectReceivingLineDisplay
                                        item.fieldData[f].actualValue = POrec.getSublistValue({
                                            sublistId: 'item',
                                            line: lineItemNum,
                                            fieldId: item.fieldData[f].custrecord_fmd_po_col_scriptid.id
                                        })
                                        item.fieldData[f].actualText = POrec.getSublistText({
                                            sublistId: 'item',
                                            line: lineItemNum,
                                            fieldId: item.fieldData[f].custrecord_fmd_po_col_scriptid.id
                                        });

                                        if (itemFields[cols[f]].length > 0) {
                                            item.fieldData[f].itemValue = itemFields[cols[f]][0].value;
                                            item.fieldData[f].itemText = itemFields[cols[f]][0].text;
                                        }

                                        else if (itemFields[cols[f]].length == 0) {
                                            item.fieldData[f].itemValue = itemFields[cols[f]];
                                            item.fieldData[f].itemText = itemFields[cols[f]];
                                        }
                                        else {
                                            item.fieldData[f].itemValue = "";
                                            item.fieldData[f].itemText = "";
                                        }


                                    }


                                }
                                log.debug("right", JSON.stringify(item));
                            }

                            else {
                                log.debug("wrong", item.docId + "---->" + item.hasOwnProperty('docId'));

                                for (var f = 0; f < cols.length; f++) {

                                    if (itemFields[cols[f]].length > 0) {
                                        item.fieldData[f].value = itemFields[cols[f]][0].value;
                                    }
                                    else {
                                        item.fieldData[f].value = itemFields[cols[f]];
                                    }
                                    /*
                                    log.debug(cacheObj.fieldData[f], item.getValue({
                                        fieldId : cacheObj.fieldData[f].custrecord_fmd_fieldscriptid.id
                                    }))
                                    cacheObj.fieldData[f].value = item.getValue({
                                        fieldId : cacheObj.fieldData[f].custrecord_fmd_fieldscriptid.id
                                    })*/
                                }


                            }
                            log.debug("Remaining governance units line 158: ", scriptObj.getRemainingUsage());
                            filledItem = item;
                            //log.debug("item cache", item.cache);
                            attrArrayer.push(filledItem);
                        }
                        //log.debug("attrArrayer", JSON.stringify(attrArrayer));

                        var templateData = {
                            bpaHeaders: [],
                            data: [],
                            addItem: '',
                            print: labelPrinter[0],
                            attribute: attributeSkuDirect[0],
                            wmsNotes: WMSNotes
                        };

                        var allLinesLength = attrArrayer.length;
                        for (var l = attrArrayer.length; l >= 0; l--) {
                            // we skip 'hides', which probably won't even be used.


                            if (!attrArrayer[l])
                                continue;

                            log.debug("attrArrayer.cache " + l, attrArrayer[l].cache);
                            log.debug("attrArrayer.cachekey " + l, attrArrayer[l].cacheKey);
                            log.debug("attrArrayer " + l, JSON.stringify(attrArrayer[l]));

                            var lineEditor = lineAction[0] + "&cache=" + attrArrayer[l].cache + "&cacheKey=" + attrArrayer[l].cacheKey + "&template="
                                + runtime.getCurrentScript().deploymentId;

                            log.debug('isClosed Line ' + l, POrec.getSublistValue({
                                sublistId: 'item',
                                fieldId: 'isclosed',
                                line: l
                            }));
                            log.debug('attrArrayer[l].sku', attrArrayer[l].sku);

                            var templateLine = {
                                sku: attrArrayer[l].sku,
                                parentSku: attrArrayer[l].parentSku,
                                parentId: attrArrayer[l].parentItemId,
                                image: attrArrayer[l].parentimg,
                                itemId: attrArrayer[l].itemId,
                                name: attrArrayer[l].name,
                                salesDesc: attrArrayer[l].salesDesc,
                                isClosed: POrec.getSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'isclosed',
                                    line: allLinesLength - l - 1
                                }),
                                qtyExp: POrec.getSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_expectedqty',
                                    line: allLinesLength - l - 1
                                }) || POrec.getSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'quantity',
                                    line: allLinesLength - l - 1
                                }),
                                qtyRecv: attrArrayer[l].quantityReceived || 0,
                                qty: POrec.getSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'quantity',
                                    line: allLinesLength - l - 1
                                }),
                                cacheKey: attrArrayer[l].cacheKey,
                                editLine: lineEditor,
                                lineItemAdder: itemHelper.addNewItemTemplate(runtime.getCurrentScript().deploymentId, {
                                    custpage_source: 'opportunity', // really just for opp items, but available for others if needed
                                    custpage_trantype: receivingType.recordtype, // transaction type
                                    custpage_tranid: params['custpage_rf_orderid'],
                                    custpage_itemtype: receivingClass,
                                    custpage_category: attrArrayer[l].categoryId,
                                    custpage_parent: attrArrayer[l].itemId, // TODO: find a better solution
                                    custpage_cachekey: attrArrayer[l].cacheKey
                                }),
                                bpaFields: []
                            }

                            var line = attrArrayer[l].fieldData


                            // itterate each of the fields for this line
                            // for bpa only really
                            for (var f = 0; f < line.length; f++) {
                                var field = line[f];


                                //log.debug({title : field.id,details : JSON.stringify(field)});
                                //VF added Actual Value and Actual Text 4/18
                                // if it's a bpa field
                                if (field.hasOwnProperty('custrecord_fmd_bidpriceattribute') && field.custrecord_fmd_bidpriceattribute.id) {
                                    //log.debug('check field object in bpa loop', field);
                                    // if it's a bpa field, we check our
                                    // header list
                                    templateLine.bpaFields.push({
                                        name: field.custrecord_fmd_column.text,
                                        scriptid: field.custrecord_fmd_listrecscriptid.id,
                                        value: field.valueText,
                                        itemValue: field.itemValue,
                                        itemText: field.itemText,
                                        actualValue: field.actualValue,
                                        actualText: field.actualText
                                    });
                                    // check our bpaHeaders array and add as
                                    // needed
                                    if (templateData.bpaHeaders.map(function (i) {
                                        return i.scriptid
                                    }).indexOf(field.custrecord_fmd_listrecscriptid.id) == -1) {
                                        // is new
                                        templateData.bpaHeaders.push({
                                            name: field.custrecord_fmd_column.text,
                                            scriptid: field.custrecord_fmd_listrecscriptid.id
                                        });
                                    }
                                }
                            }
                            // we have line data!
                            templateData.data.push(templateLine);
                        }

                        // we have a unique BPA header list, and all our
                        // data built.
                        // time to find the template(via class),
                        // load/render/return


                        var templateBody = '';
                        if (receivingClass == 1) {
                            // new
                            var templateSource = itemHelper.generateSelect('newreceiving');
                            templateBody = itemHelper.buildSelect(templateSource, templateData);

                            receivingForm.addSubmitButton({
                                id: 'custpage_next',
                                label: runtime.getCurrentScript().getParameter({
                                    name: "custscript_wms_sl_nextactionlabel"
                                }) || "Receive"
                            })

                        }
                        if (receivingClass == 2) {
                            // used
                            var templateSource = itemHelper.generateSelect('usedreceiving');

                            // we get to throw in some params to dictate behavior here
                            var addItemData = {
                                custpage_function: 'create',
                                custpage_tranid: params['custpage_rf_orderid'],
                                custpage_trantype: receivingType.recordtype,
                                custpage_itemtype: receivingClass, // used,
                                cacheKey: "purchaseorder:" + params['custpage_rf_orderid'] + ":inventoryitem"
                            }

                            templateData.addItem = itemHelper.addNewItemTemplate(runtime.getCurrentScript().deploymentId, addItemData)
                            templateBody = itemHelper.buildSelect(templateSource, templateData);

                        }
                        if (receivingClass == 3) {
                            // opportunity
                            var templateSource = itemHelper.generateSelect('oppreceiving');

                            // not explicitly necessary, but available for use if needed
                            var addItemData = {
                                custpage_source: 'opportunity',
                                custpage_tranid: params['custpage_rf_orderid'],
                                custpage_trantype: receivingType.recordtype,
                                custpage_itemtype: receivingClass, // opportunity,
                            }
                            templateData.addItem = itemHelper.addNewItemTemplate(runtime.getCurrentScript().deploymentId, addItemData)
                            templateBody = itemHelper.buildSelect(templateSource, templateData);
                        }

                        var itemSwapper = receivingForm.addField({
                            id: 'custpage_itemswapper',
                            label: '&nbsp;',
                            type: sw.FieldType.INLINEHTML,
                            container: 'custpage_holder'
                        });

                        itemSwapper.defaultValue = "<script>" + itemSwap.toString() + ";" + setLineItemOptions.toString() + ";" + exceptionProcessor.toString() + ";"
                            + markForReceive.toString() + ";" + editLine.toString() + ";" + "</script>";

                        receivingForm.clientScriptModulePath = '/SuiteScripts/WMS/shared/Select-Client.js'

                        var hiddenEditNotesUrl = itemHelper.findAction('customdeploy_wms_sl_edit_wms_notes')[0];

                        var finderField = receivingForm.addField({
                            id: 'custpage_finderurl',
                            label: 'finderurl',
                            type: sw.FieldType.TEXT
                        });

                        finderField.updateDisplayType({
                            displayType: sw.FieldDisplayType.HIDDEN
                        });

                        finderField.defaultValue = hiddenEditNotesUrl + "&custpage_rf_orderid=" + params['custpage_rf_orderid'];

                        receivingForm.addButton({
                            id: 'custpage_button',
                            label: "Back",
                            functionName: 'breadCrumbOut'
                        });
                        receivingForm.addButton({
                            id: 'custpage_edit_notes',
                            label: "View/Edit WMS Notes",
                            functionName: 'editWMSNotes'
                        });


                        // finally, set our template
                        body.defaultValue = templateBody;

                        context.response.writePage(receivingForm);

                    }
                }
                var endTime = new Date();
                log.debug("total runtime", "ACS - " + (endTime - startTime) / 1000 + " seconds");
            } catch (e) {
                context.response.write(JSON.stringify(e));
            }
        }

        function editLine(element) {
            if (element.checked) {
                window.open(element.dataset.editor, 'mywin', 'left=200,top=200,width=750,height=550,toolbar=0,resizable=0');
            }
        }

        // embeded functions
        function itemSwap(oldId, templateStr) {
            var template = decodeURIComponent(templateStr)
            if (oldId) {
                var oldField = document.getElementById(oldId);
                if (oldField.dataset.receivable == 'true') {
                    receiveItems.indexOf(oldField.id) >= 0 ? receiveItems.splice(receiveItems.indexOf(oldField.id), 1) : receiveItems.push(oldField.id);
                    if (getElementsByClassName('checkmark')[0].style.display != 'none') {
                        jQuery(oldField.getElementsByClassName('checkmark')[0]).hide().siblings('.image').show()
                    } else {
                        // jQuery(oldField.getElementsByClassName('checkmark')[0])
                        // .show().siblings('.image').hide()
                    }
                }
                console.log(receiveItems);

                jQuery(document.getElementById(oldId)).parent().replaceWith(template);
            } else {
                console.log("swapping: " + template.length)
                // copy the last item, replace content with out template,
                // add it to the end
                var newItem = jQuery("div [data-cache=purchaseorder]").last().closest('tr').clone();
                jQuery("div [data-cache=purchaseorder]", newItem).parent().replaceWith(template);
                jQuery("div [data-cache=purchaseorder]").last().closest('tr').after(newItem)

            }
        }

        //
        // called by item selector suitelet (ss1.0)
        // must be inline, rCongig gets us back to
        // the client context. hoops in hoops.
        //
        function setLineItemOptions(objData, modal) {
            console.log('this happened: ' + objData)
            modal.close();
            // objData is ['string'...] of item internal ids
            // if we have some item(s)
            if (objData && objData.length > 0) {

                // get params for order id from window
                var params = window.location.search.slice(1).split('&').reduce(function _reduce(a, b) {
                    b = b.split('=');
                    a[b[0]] = decodeURIComponent(b[1]);
                    return a;
                }, {});

                // our data necessary to rebuild
                var adderBody = {
                    items: objData,
                    orderId: params['custpage_rf_orderid'] || null,
                    url: jQuery(document.getElementById("newitemadder")).data('adder'),
                    deployment: jQuery(document.getElementById("newitemadder")).data('template')
                }

                var rConfig = JSON.parse('{}');
                rConfig['context'] = '/SuiteScripts/WMS/shared/Select-Client';
                var doer = require.config(rConfig);
                doer(['/SuiteScripts/WMS/shared/Select-Client'], function (mod) {
                    try {
                        mod.adderWrapper(adderBody);
                    } catch (e) {
                        console.log(e)
                    }
                });

            } else {
                // no data, close up shop just in case.
                modal.close();
            }
        }


        function attrRefFunction(allFields) {

            // find, search, store attrs
            // var itemCategory = itemRec.getValue({
            // fieldId : 'custitem_g2_category_ref'
            // })
            //refresh category cache every 15 minutes for on the fly changes to the category record
            //this shouldnt happen but this will help config issues for them
            var categoryCache = cache.getCache({
                name: 'CategoryCache',
                scope: cache.Scope.PUBLIC,
                ttl: 900
            });

            var currCache = categoryCache.get({
                key: allFields.categoryId
            });

            if (!currCache) {

                var attrs = search.lookupFields({
                    type: 'customrecord_g2_category',
                    id: allFields.categoryId,
                    columns: ['custrecord_g2_category_usedprodatt_refs', 'custrecord_wms_field_display_order', 'custrecord_bidpriceattribute_refs', 'custrecord_sellpriceattribute_refs']
                });

                //log.debug("VF", "VF Test");
                log.debug("catAttrs " + allFields.categoryId, JSON.stringify(attrs));
                //	log.debug('checking display order field array', attrs["custrecord_wms_field_display_order"]);

                //VF checking if there is a Display Order Array for this Category
                //MOVING SORT TO ATTRIBUTION SO IT IS MORE REAL-TIME
                //	if(attrs["custrecord_wms_field_display_order"] != "" && attrs["custrecord_wms_field_display_order"] != " " && attrs["custrecord_wms_field_display_order"] != undefined ){
                //		log.debug('do something display order field array', attrs["custrecord_wms_field_display_order"]);
                //
                //	}

                // ref structure is object of value(id) and textual name
                var catAttrs = attrs["custrecord_g2_category_usedprodatt_refs"].map(function (i) {
                    return i.value
                });

                //NG-1184 using the Bid Price and Sell Price attribute fields to determine which fields apply to each
                //instead of the field metadata records
                var bidPriceAtt = [];
                if (attrs["custrecord_bidpriceattribute_refs"].length > 0) {
                    bidPriceAtt = attrs["custrecord_bidpriceattribute_refs"].map(function (i) {
                        return i.value;
                    });
                }
                var sellPriceAtt = [];
                if (attrs["custrecord_sellpriceattribute_refs"].length > 0) {
                    sellPriceAtt = attrs["custrecord_sellpriceattribute_refs"].map(function (i) {
                        return i.value;
                    });
                }

                log.debug('bidPrice array for category : ' + allFields.categoryId, JSON.stringify(bidPriceAtt));
                log.debug('sellPrice array for category : ' + allFields.categoryId, JSON.stringify(sellPriceAtt));


                //the bidPriceAtt and sellPriceAtt arrays are arrays of bidPriceAttribute records ids. Need to do a lookup
                //on this record to get the "Field Backing Record" internal id (custrecord_bpa_script_id), store values in Object
                var bidPriceAttObj = {};
                var combinedBPAIds = bidPriceAtt.concat(sellPriceAtt);


                for (var b = 0; b < combinedBPAIds.length; b++) {
                    if (bidPriceAttObj[combinedBPAIds[b]] == undefined) {
                        var bpaId = search.lookupFields({
                            type: 'customrecord_bidpriceattribute',
                            id: combinedBPAIds[b],
                            columns: ['custrecord_bpa_script_id']
                        });
                        //this object maps the bidPriceAttribute record ID to the field backing record id
                        //SB Example: the BPA for Condition is internal id 2, the internal id of the Condition record type is 3449
                        //the Field Metadata record associates the Condition field with the custom record Condition - we will check the bidPriceAttObj against
                        //each field metadata record (fieldData array). bidPriceAttrObj[2] = 3449
                        if (bpaId.custrecord_bpa_script_id.length > 0) {
                            bidPriceAttObj[combinedBPAIds[b]] = bpaId.custrecord_bpa_script_id[0].value.toString();
                        }
                    }
                }



                // manually inject non-custom fields here (FMD need to be
                // generated)

                catAttrs.push(-1075); // TODO: hard coded - UPC (should be
                // consistent across environments)

                // orig count for... reasons?
                allFields.categoryAttributes = catAttrs.length

                //VF trying to determine "Sort" of fields displayed on item attribution screen
                //I believe it is dictated by this section of code, adding the fieldData to the cache object
                //log.debug('VF cat attr', JSON.stringify(catAttrs));

                if (catAttrs.length) {
                    var fields = search.create({
                        type: 'customrecord_fieldmetadata',
                        filters: [search.createFilter({
                            name: 'custrecord_fmd_field',
                            operator: search.Operator.ANYOF,
                            values: catAttrs
                        }), search.createFilter({
                            name: 'isinactive',
                            operator: search.Operator.IS,
                            values: false
                        })],
                        columns: [search.createColumn({
                            name: 'custrecord_fmd_field' // item
                            // field
                            // name, for
                            // the form(s)?
                        }), search.createColumn({
                            name: 'custrecord_fmd_fieldscriptid' // item
                            // field
                            // for edits or
                            // fall back
                        }), search.createColumn({
                            name: 'custrecord_fmd_listrecscriptid' // custom
                            // record
                            // id, for the
                            // list
                            // selections
                        }), search.createColumn({
                            name: 'custrecord_fmd_column' // transaction
                            // column
                            // field name (maybe
                            // for
                            // the forms?)
                        }), search.createColumn({
                            name: 'custrecord_fmd_columnscriptid' // custom
                            // column
                            // field id for
                            // getting/setting
                        }), search.createColumn({
                            name: 'custrecord_fmd_fieldtype'
                        }), search.createColumn({
                            name: 'custrecord_fmd_readonly'
                        }), search.createColumn({
                            name: 'custrecord_fmd_bidpriceattribute'
                        }), search.createColumn({
                            name: 'custrecord_fmd_sellpriceattribute'
                        }),
                        search.createColumn({
                            name: 'custrecord_fmd_po_column_id'
                        }),
                        search.createColumn({
                            name: 'custrecord_fmd_po_col_scriptid'
                        }),
                        search.createColumn({
                            name: 'custrecord_fmd_price_field'
                        }),
                        //custrecord_fmd_listrec
                        search.createColumn({
                            name: 'custrecord_fmd_listrec'
                        })]
                    }).run().each(function (res) {
                        // keep the fmd rec id
                        var field = {
                            id: res.id
                        }
                        // these are sparse objects, but its
                        // easy to add new ones so, meh
                        // the lowercase conversion is
                        // necessary for scriptids. might be
                        // a TODO in here to consolidate the
                        // field objects.
                        for (var col = 0; col < res.columns.length; col++) {
                            field[res.columns[col].name] = {
                                id: typeof (res.getValue(res.columns[col])) == "string" ? res.getValue(res.columns[col]).toLowerCase() : res.getValue(res.columns[col]),
                                text: res.getText(res.columns[col])
                            }
                        }
                        allFields.fieldData.push(field);
                        return true;
                    });
                }

                //TODO: run through fieldData array and update the bidPrice and sellPrice attributes with what is set on the Category
                //Compare the Field Backing Record with the fieldData element "custrecord_fmd_listrec" - if they match, set the isBidPrice and/or is
                //sell price attribute to True
                log.debug('VF bidPriceAttObj', JSON.stringify(bidPriceAttObj));
                for (var v = 0; v < allFields.fieldData.length; v++) {
                    var customRecordBackingId = allFields.fieldData[v].custrecord_fmd_listrec.id;
                    var isBid = false;
                    var isSell = false;
                    //check if bidPrice
                    for (bid in bidPriceAtt) {
                        //check if this custom record is a bid price attribute for this category
                        if (customRecordBackingId == bidPriceAttObj[bidPriceAtt[bid]]) {
                            isBid = true;
                        }
                    }
                    //check if sellPrice
                    for (sell in sellPriceAtt) {
                        //check if this custom record is a bid price attribute for this category
                        if (customRecordBackingId == bidPriceAttObj[sellPriceAtt[sell]]) {
                            isSell = true;

                        }
                    }

                    //override the bid/sell price flag 
                    allFields.fieldData[v].custrecord_fmd_bidpriceattribute.id = isBid;
                    allFields.fieldData[v].custrecord_fmd_sellpriceattribute.id = isSell;


                }
                log.debug('VF all fieldMetadata fields for category ' + allFields.categoryId, JSON.stringify(allFields.fieldData));

                categoryCache.put({
                    key: allFields.categoryId,
                    value: allFields
                });

            } else {
                allFields.fieldData = JSON.parse(currCache).fieldData;
            }
            return allFields;
        }

        // client function handles image switch and 'save' for
        // 'receiveItems' array
        function markForReceive() {
            if (this.dataset.receivable == 'true') {
                receiveItems.indexOf(this.id) >= 0 ? receiveItems.splice(receiveItems.indexOf(this.id), 1) : receiveItems.push(this.id);
                if (this.getElementsByClassName('checkmark')[0].style.display != 'none') {
                    jQuery(this.getElementsByClassName('checkmark')[0]).hide().siblings('.image').show()
                } else {
                    jQuery(this.getElementsByClassName('checkmark')[0]).show().siblings('.image').hide()
                }
            }
        }

        // client function handles image switch, receiveItems add
        // and 'disables' line
        function exceptionProcessor(cacheKey, exception, modal) {
            var update = [cacheKey]

            // if (entireOrder) {
            // var cacheType = jQuery(document.getElementById(cacheKey))
            // .data('cache');
            // // collect them all
            // jQuery("div[data-cache='" + cacheType + "']").each(
            // function(i) {
            // update.push(jQuery(this).id)
            // });
            // }
            // make the on-screen updates
            for (var i = 0; i < update.length; i++) {
                // set receivable
                var element = jQuery(document.getElementById(update[i])).attr("data-receivable", !(element > 0));
                if (exception) {
                    // receivable back to true, reset image
                    jQuery(".xmark", element[0]).show().siblings('.image').hide();
                    // reset onclick
                    jQuery(element[0]).off('click', markForReceive);
                } else {
                    // receivable back to false, set xmark
                    jQuery(".xmark", element[0]).hide().siblings('.image').show();
                    // 'remove' onclick
                    jQuery(element[0]).on('click', markForReceive);
                }
            }

            if (modal)
                modal.close();
        }

        return {
            onRequest: onRequest
        };

    });
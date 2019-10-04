// https://2ndswing.atlassian.net/browse/NG-1523
// EditLine.js in NS: https://4537321-sb1.app.netsuite.com/app/common/media/mediaitem.nl?id=12206&e=T
// Page "Receving for Used Order#etc" : https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3313298
/**
 * 
 * went to Script Deployments searched for Edit Line (the name of the script)
 * looked at the URL, ran a search for script with the internalid which let to deployments
 * 
 * 
 */

/**
* @NApiVersion 2.x
* @NScriptType Suitelet
* @NModuleScope SameAccount
*/
define(['N/record', 'N/search', 'N/file', 'N/cache', 'N/runtime', '../shared/ItemHelper', 'N/ui/serverWidget', 'N/runtime', '/SuiteScripts/PublishToBus/LIB_Graph_Quote.js'],

    function (record, search, file, cacheMod, runtime, itemHelper, sw, rt, api) {

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
                        //TODO: preselcted Category - VF 1/31/2019
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
                                id: 'custpage_repitemame',
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

                        var fg = form.addFieldGroup({
                            id: 'custpage_fieldgroup',
                            label: "Attributes"
                        });

                        fg.isSingleColumn = true;

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
                        log.debug('item image urm', item.parentimg);
                        imageField.defaultValue = "<img src=" + item.parentimg + ">";

                        var psku = form.addField({
                            id: 'custpage_psku',
                            label: 'Parent Sku',
                            type: sw.FieldType.TEXT,
                            container: 'custpage_fieldgroup'
                        });

                        psku.updateDisplayType({
                            displayType: sw.FieldDisplayType.DISABLED
                        });

                        psku.defaultValue = filledItem.parentSku;

                        var cancelLine = form.addField({
                            id: 'custpage_cancel_line',
                            label: 'Cancel Purchase Order Line',
                            type: sw.FieldType.CHECKBOX,
                            container: 'custpage_fieldgroup'
                        });

                        cancelLine.updateDisplayType({
                            displayType: sw.FieldDisplayType.ENTRY
                        });


                        var notes = form.addField({
                            id: 'custpage_notes',
                            label: 'Receiving Notes',
                            type: sw.FieldType.TEXTAREA,
                            container: 'custpage_fieldgroup'
                        });

                        notes.updateDisplaySize({
                            height: 5,
                            width: 80
                        });
                        // NG - 787
                        notes.defaultValue = filledItem.receivingNotes;

                        var qty = form.addField({
                            id: 'custpage_quantity',
                            label: 'Quantity Received',
                            type: sw.FieldType.FLOAT,
                            container: 'custpage_fieldgroup'
                        });

                        qty.defaultValue = filledItem.expectedQuantity

                        //NG-461
                        var qtyExpected = form.addField({
                            id: 'custpage_expquanty',
                            label: "Quantity Expected",
                            type: sw.FieldType.FLOAT,
                            container: 'custpage_fieldgroup'
                        })

                        qtyExpected.defaultValue = filledItem.expectedQuantity

                        qtyExpected.updateDisplayType({
                            displayType: sw.FieldDisplayType.DISABLED
                        });
                        var bpaFieldNames = form.addField({
                            id: 'custpage_fielddata_object',
                            label: 'Hidden Field Array',
                            type: sw.FieldType.TEXT,
                            container: 'custpage_fieldgroup'
                        });
                        bpaFieldNames.updateDisplayType({
                            displayType: sw.FieldDisplayType.HIDDEN
                        });

                        var bpaHasChanged = form.addField({
                            id: 'custpage_fielddata_has_changed',
                            label: 'Hidden BPA Have Changed',
                            type: sw.FieldType.CHECKBOX,
                            container: 'custpage_fieldgroup'
                        });
                        bpaHasChanged.updateDisplayType({
                            displayType: sw.FieldDisplayType.HIDDEN
                        });

                        var bpaFieldArray = [];

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

                            // itterate each of the fields for this line
                            // for bpa only really
                            for (var f = 0; f < attributeList.length; f++) {
                                var field = attributeList[f];
                                // if it's a bpa field
                                var formField;

                                if (field.hasOwnProperty('custrecord_fmd_bidpriceattribute') && field.custrecord_fmd_bidpriceattribute.id) {

                                    log.debug('vf column', field.custrecord_fmd_columnscriptid.id);
                                    log.debug('vf field form', 'custpage_eia_fielddata_' + field.id);
                                    bpaFieldArray.push(field.custrecord_fmd_columnscriptid.id + ":" + 'custpage_eia_fielddata_' + field.id + ":" + field.value);
                                    //if it's a condition, do something different
                                    if (field['custrecord_fmd_listrecscriptid'].id == 'customrecord_g2_condition') {
                                        formField = form.addField({
                                            id: 'custpage_eia_fielddata_' + field.id,
                                            label: field['custrecord_fmd_field'].text,
                                            type: field['custrecord_fmd_fieldtype'].id,
                                            container: 'custpage_fieldgroup'
                                        })
                                        formField.addSelectOption({
                                            value: '',
                                            text: '&nbsp;'
                                        });
                                        //Added array of conditions on the Category record as another filter
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

                                        formField = form.addField({
                                            id: 'custpage_eia_fielddata_' + field.id,
                                            label: field['custrecord_fmd_field'].text,
                                            type: field['custrecord_fmd_fieldtype'].id,
                                            source: field['custrecord_fmd_listrecscriptid'].id,
                                            container: 'custpage_fieldgroup'
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
                                container: 'custpage_fieldgroup'
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
                } else {
                    // POST
                    // check for URL param to 'replace' item
                    // this will be an update to the PO (to replace the
                    // original item)
                    // carry over BPA attributes to the IR -ONLY-
                    // create item receipt
                    //

                    var params = context.request.parameters;
                    log.debug('post params', params);
                    var repItem = params['custpage_repitem'] || ''; // for the replacing of items
                    var cacheKey = params['custpage_cachekey'];


                    var bpaHasChanged = params['custpage_fielddata_has_changed'];
                    log.debug('bpaHasChanged', bpaHasChanged);


                    var unitPrice = params['custpage_bidprice'] || 0;

                    var quantity = params['custpage_quantity'];
                    var notes = params['custpage_notes'];

                    var parsedKey = cacheKey.split(/:/);
                    var cache = parsedKey[0];

                    var docCache = cacheMod.getCache({
                        name: cache,
                        scope: cacheMod.Scope.PUBLIC
                    });

                    var origCache = JSON.parse(docCache.get({
                        key: cacheKey,
                        loader: itemHelper.cacheTransactionItemLoader,
                        ttl: 3600
                    }) || "{}");

                    var newCache;

                    // pull out our bpa fields from the parameters, keeping the keys available
                    // there are some silly other parameter fields we need to avoid, hence the regex
                    var bpas = Object.keys(params).filter(function (i) {
                        return i.match(/^custpage_eia_fielddata_\d+$/)
                    });
                    var fields = origCache.fieldData;

                    // for (var b = 0; b < bpas.length; b++) {
                    // // extract field id(last element of name)
                    // var bpaIdx = bpas[b].split(/\_/).pop();
                    // // returns index of (first) object containing attribute == value
                    // var field = itemHelper.objIndexbyAttr(fields, "id", bpaIdx)
                    // if (field >= 0) {
                    // fields[field].value = params[bpas[b]]
                    // }
                    // }

                    var orderRec;
                    var irRec;

                    if (params['custpage_cancel_line'] == true || params['custpage_cancel_line'] == 'T') {

                        log.debug('add cancel code here');

                        //load PO
                        // transform PO
                        var poRec = record.load({
                            type: cache,
                            id: parsedKey[1]
                        });
                        log.debug('cancel lineuniquekey', parsedKey[4]);

                        if (params['custpage_notes']) {
                            var notesToUpdate = params['custpage_notes'];
                        }
                        var findLine = poRec.findSublistLineWithValue({
                            sublistId: 'item',
                            fieldId: 'lineuniquekey',
                            value: parsedKey[4]
                        });

                        if (findLine != -1) {
                            poRec.setSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_wms_recvnotes',
                                line: findLine,
                                value: notesToUpdate
                            });
                            poRec.setSublistValue({
                                sublistId: 'item',
                                fieldId: 'isclosed',
                                line: findLine,
                                value: true
                            });
                            //NG-899 - cancelling a line should only close the rest if partially received
                            if (poRec.getSublistValue({
                                sublistId: 'item',
                                fieldId: 'quantityreceived',
                                line: findLine,
                            }) == 0) {
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
                    }



                    log.debug('repitem', repItem);

                    //if Cancel, do not run IR code
                    if (repItem && (params['custpage_cancel_line'] == false || params['custpage_cancel_line'] == 'F')) {
                        // we add the repItem to the PO @ qty set by user
                        // attached ref to original item for convenience
                        // create cache for new line
                        log.debug('before adding JUNK SKU', parsedKey[4]);
                        var newItemCache = itemHelper.addItemToTransaction({
                            tranType: cache, // doctype
                            tranId: parsedKey[1], // docid
                            itemId: repItem, // item to add
                            quantity: quantity, // quantity to set
                            addedFromType: parsedKey[2], // originating item type
                            addedFrom: parsedKey[3], // associate to item
                            addedFromLineKey: parsedKey[4], // unique key for tran line to update qty of
                        }, true);

                        newItemCache = JSON.parse(newItemCache);

                        var newItemKey = newItemCache.cacheKey;

                        log.debug({
                            title: 'repItem: ' + repItem,
                            details: (typeof newItemCache) + Object.keys(newItemCache)
                        });

                        cacheKey = newItemKey;
                        parsedKey = cacheKey.split(/:/);

                    }

                    //if Cancel, do not run IR code
                    if (cacheKey && (params['custpage_cancel_line'] == false || params['custpage_cancel_line'] == 'F')) {

                        // transform PO
                        var myReceipt = record.transform({
                            fromType: cache,
                            fromId: parsedKey[1],
                            toType: record.Type.ITEM_RECEIPT,
                        });

                        // receipt order line -> po order line -> unique key
                        var lines = myReceipt.getLineCount({
                            sublistId: 'item'
                        })

                        orderRec = record.load({
                            type: cache,
                            id: parsedKey[1]
                        });

                        var orderRecChanged;
                        var lineToUpdate;
                        var priceOverride = false;
                        //VF bid price attributes and values all found above
                        var quoteResult = '';
                        for (var e = 0; e < lines; e++) {
                            // this is PROBABLY overkill, but explicitly isolate the lineunique key tied to this IR line
                            // if that matches cacheKey's, RECEIVE!
                            var orderLineKey = orderRec.getSublistValue({
                                sublistId: 'item',
                                line: orderRec.findSublistLineWithValue({
                                    sublistId: 'item',
                                    fieldId: 'line',
                                    value: myReceipt.getSublistValue({
                                        sublistId: 'item',
                                        line: e,
                                        fieldId: 'orderline'
                                    })
                                }),
                                fieldId: 'lineuniquekey'
                            });
                            log.debug({
                                title: 'looking for:' + parsedKey[4],
                                details: 'found: ' + orderLineKey
                            });

                            //check if price override field is set to True
                            priceOverride = orderRec.getSublistValue({
                                sublistId: 'item',
                                line: orderRec.findSublistLineWithValue({
                                    sublistId: 'item',
                                    fieldId: 'line',
                                    value: myReceipt.getSublistValue({
                                        sublistId: 'item',
                                        line: e,
                                        fieldId: 'orderline'
                                    })
                                }),
                                fieldId: 'custcol_wms_price_override'
                            });
                            log.debug('priceOverride', priceOverride);
                            // Our LINE!!!
                            if (orderLineKey == parsedKey[4]) {

                                myReceipt.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'location',
                                    value: 4,
                                    line: e
                                });

                                myReceipt.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'quantity',
                                    value: quantity,
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
                                            title: "atty: " + bpas[b],
                                            details: "f: " + fields[field].custrecord_fmd_columnscriptid.id + " ---- V: " + params[bpas[b]]
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
                                        log.debug('error', e);
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
                                var bin = 5;
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
                                    value: quantity,
                                    line: 0
                                });

                                // TODO placeholder until Bid price lookup is ready.
                                //If unit price is still 0, then assume opportunity receiving, and set rate to the rate of the PO line
                                //NG-1082
                                if (unitPrice == 0) {
                                    log.debug('opportunity receving', unitPrice);
                                    unitPrice = orderRec.getSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'rate',
                                        line: orderRec.findSublistLineWithValue({
                                            sublistId: 'item',
                                            fieldId: 'line',
                                            value: myReceipt.getSublistValue({
                                                sublistId: 'item',
                                                line: e,
                                                fieldId: 'orderline'
                                            })
                                        })
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
                                    line: orderRec.findSublistLineWithValue({
                                        sublistId: 'item',
                                        fieldId: 'line',
                                        value: myReceipt.getSublistValue({
                                            sublistId: 'item',
                                            line: e,
                                            fieldId: 'orderline'
                                        })
                                    }),
                                    value: 4
                                });

                                lineToUpdate = orderRec.findSublistLineWithValue({
                                    sublistId: 'item',
                                    fieldId: 'line',
                                    value: myReceipt.getSublistValue({
                                        sublistId: 'item',
                                        line: e,
                                        fieldId: 'orderline'
                                    })
                                });
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

                            } else {
                                // not our line
                                myReceipt.setSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'itemreceive',
                                    value: false,
                                    line: e
                                });

                            }
                        }// end myReceipt lines
                        try {
                            irRec = myReceipt.save();

                            log.debug('before PO save, check line to update', lineToUpdate);
                            //trying to resolve the "record has changed" error
                            if (irRec) {
                                orderRec = record.load({
                                    type: cache,
                                    id: parsedKey[1]
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
                                            details: "po f: " + fields[field].custrecord_fmd_po_col_scriptid.id + " ---- V: " + params[bpas[c]]
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
                                var itemInternal = parsedKey[3];

                                log.debug('item internal id', itemInternal);
                                log.debug('bid price to update item', unitPrice);

                                //now update the item record
                                var itemRec = record.load({
                                    type: 'inventoryitem',
                                    id: itemInternal
                                });

                                //NG-1121 - set Receiving Shell == False
                                itemRec.setValue({
                                    fieldId: 'custitem_wms_receivingshell',
                                    value: false
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
                            log.debug({
                                title: "save error",
                                details: JSON.stringify(e)
                            })

                        }
                    }// end if(cacheKey)

                    // return.... something
                    // need to disable checkbox on cacheKey line
                    // need to *not* disable checkbox on 'replaced line'
                    // close window
                    if (params['custpage_cancel_line'] == false || params['custpage_cancel_line'] == 'F') {

                        context.response.write("<script>window.opener.location.reload(true);window.close();</script>");
                        // context.response.write("We did it! Here's a rec: " + irRec)
                    }
                }
            } catch (e) {
                log.debug("error", JSON.stringify(e))
                context.response.write('OOPS: ' + JSON.stringify(e));
            }
        }

        return {
            onRequest: onRequest
        };

    });

// Script Name: Select Receiving Line

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
    function (redirect, runtime, sw, url, search, record, itemHelper, cache, https) {
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
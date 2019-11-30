/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([
  'N/record',
  'N/search',
  'N/file',
  'N/cache',
  'N/runtime',
  '../shared/ItemHelper',
  'N/ui/serverWidget',
  'N/runtime',
  '/SuiteScripts/PublishToBus/LIB_Graph_Quote.js'
], function (record, search, file, cacheMod, runtime, itemHelper, sw, rt, api) {
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
  function onRequest (context) {
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
        // VF Deploy Test Going To Work This Time - New eclipse version
        // TEST AGAIN
        var request = context.request
        var params = context.request.parameters

        var form = sw.createForm({
          title: '     '
        })

        form.clientScriptModulePath = '/SuiteScripts/WMS/Receiving/EditLine-Client.js'

        // itemHelper.breadCrumber(runtime.getCurrentScript(),params);

        var item
        var cacheKey = params['cacheKey']
        var parsedKey = cacheKey.split(':') || []

        if (cacheKey.length > 0) {
          log.debug({
            title: 'redux: ' + typeof cacheMod,
            details: cacheMod
          })
          var editCache = cacheMod.getCache({
            name: parsedKey[0],
            scope: cacheMod.Scope.PUBLIC
          })

          item = JSON.parse(
            editCache.get({
              key: cacheKey,
              ttl: 300,
              loader:
                parsedKey.length == 5
                  ? itemHelper.cacheTransactionItemLoader
                  : itemHelper.cacheItemLoader
            }) || '{"cacheMiss":true}'
          )
        }

        var cancel = form.addButton({
          id: 'custpage_button',
          label: 'Exit',
          functionName: 'cancelModal'
        })

        // var cancelLine= form.addButton({
        //	id : 'custpage_button_cancel_line',
        //	label : "Cancel Line",
        //	functionName : 'cancelLine'
        // });

        /**
					 * Moved code to on save of the item receipt. No longer a client trigger
					var bidPriceAtt = form.addButton({
						id : 'custpage_bpa',
						label : "Update Bid Price",
						functionName : 'getBidPriceAtt'
					});
					**/
        var save = form.addSubmitButton({
          label: 'Save'
        })

        var editButton = form.addButton({
          id: 'custpage_attribution',
          label: 'Attribute Sku',
          functionName: 'attribution'
        })

        var editField = form.addField({
          id: 'custpage_attributionurl',
          label: 'editfield',
          type: sw.FieldType.TEXT
        })

        editField.updateDisplayType({
          displayType: sw.FieldDisplayType.HIDDEN
        })

        // VF adding for opportunity PO's, if you replace an item, you need to pass the replaced sku to the attribution page
        var attributionUrl =
          itemHelper.findAction('customdeploy_wms_itemattributeeditor')[0] +
          '&cacheKey=' +
          params['cacheKey']

        if (params['custpage_repitem']) {
          attributionUrl += '&custpage_repitem=' + params['custpage_repitem']
        }
        editField.defaultValue = attributionUrl

        log.debug('item.itemClass', item.itemClass)

        // TODO: hardcoded used item class
        if (item.itemClass == 2) {
          var junkButton = form.addButton({
            id: 'custpage_junker',
            label: 'Assign Junk Sku',
            functionName: 'junker'
          })

          var junkField = form.addField({
            id: 'custpage_junkurl',
            label: '&nbsp;',
            type: sw.FieldType.TEXT
          })

          junkField.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })

          junkField.defaultValue =
            itemHelper.findAction('customdeploy_wms_junkskuer')[0] +
            '&cacheKey=' +
            params['cacheKey'] +
            '&custpage_repitem=' +
            params['custpage_repitem']

          var scanButton = form.addButton({
            id: 'custpage_scanner',
            label: 'Scan UPC',
            functionName: 'scanner'
          })

          var scanField = form.addField({
            id: 'custpage_scanurl',
            label: '&nbsp;',
            type: sw.FieldType.TEXT
          })

          scanField.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })

          scanField.defaultValue =
            itemHelper.findAction('customdeploy_wms_upcmatcher')[0] +
            '&cacheKey=' +
            params['cacheKey']

          var findButton = form.addButton({
            id: 'custpage_finder',
            label: 'Assign Existing SKU',
            functionName: 'finder'
          })

          var finderField = form.addField({
            id: 'custpage_finderurl',
            label: 'finderurl',
            type: sw.FieldType.TEXT
          })

          finderField.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })
          // TODO: preselected Category - VF 1/31/2019
          // TODO: add custpage_parent lookup below

          var lookupItem = search.lookupFields({
            type: item.itemType,
            id: item.itemId,
            columns: ['custitem_wms_parentitemcategory', 'parent']
          })
          var category = 0
          var parent = 0
          if (lookupItem.custitem_wms_parentitemcategory.length > 0) {
            if (lookupItem.custitem_wms_parentitemcategory[0].value) {
              category = lookupItem.custitem_wms_parentitemcategory[0].value
            }
          }
          if (lookupItem.parent.length > 0) {
            if (lookupItem.parent[0].value) {
              parent = lookupItem.parent[0].value
            }
          }

          log.debug('vince test category', category)
          log.debug('vince test parent', parent)

          finderField.defaultValue =
            itemHelper.findAction('customdeploy_wms_itemselector')[0] +
            '&custpage_function=assign&cacheKey=' +
            params['cacheKey'] +
            '&custpage_itemtype=' +
            item.itemClass +
            '&custpage_tranid=' +
            item.docId +
            '&custpage_trantype=' +
            item.docType +
            '&custpage_modal=true'
          if (category != 0 && parent != 0) {
            log.debug('in default value set', category)
            finderField.defaultValue =
              itemHelper.findAction('customdeploy_wms_itemselector')[0] +
              '&custpage_function=assign&cacheKey=' +
              params['cacheKey'] +
              '&custpage_itemtype=' +
              item.itemClass +
              '&custpage_tranid=' +
              item.docId +
              '&custpage_trantype=' +
              item.docType +
              '&custpage_modal=true' +
              '&custpage_category=' +
              category +
              '&custpage_parent=' +
              parent
          }
        }
        if (item.hasOwnProperty('cacheMiss')) {
          form.title = ' Error: missing itemid or cache and key values.'
        } else {
          if (params['custpage_repitem']) {
            // if we have a URL param for replacement item,
            // save it and trigger warning for user
            var repItem = form.addField({
              id: 'custpage_repitem',
              label: '&nbsp;',
              type: sw.FieldType.TEXT
            })

            repItem.updateDisplayType({
              displayType: sw.FieldDisplayType.HIDDEN
            })

            repItem.defaultValue = params['custpage_repitem']

            var repItemName = form.addField({
              id: 'custpage_repitemname',
              label: '&nbsp;',
              type: sw.FieldType.TEXT
            })

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

          // set attributed field to display dropdown if an item has already been attributed
          if (params['custpage_attributed']) {
            var alreadyAttributed = form.addField({
              id: 'custpage_attributed',
              label: 'been attributed?',
              type: sw.FieldType.TEXT
            })

            alreadyAttributed.updateDisplayType({
              displayType: sw.FieldDisplayType.HIDDEN
            })

            alreadyAttributed.defaultValue = params['custpage_attributed']
          }

          var filledItem = itemHelper.fillattrRefValues(item, null, true)
          var attributeList = filledItem.fieldData

          var tranRec = filledItem.tranRec

          // TJ, To Do: change field group
          var fgAttribute = form.addFieldGroup({
            id: 'custpage_fg_attribute',
            label: 'Attributes'
          })

          fgAttribute.isSingleColumn = true

          var parentImage = form.addFieldGroup({
            id: 'custpage_parent_image',
            label: 'Parent Image'
          })
          parentImage.isSingleColumn = true

          var imageField = form.addField({
            id: 'custpage_test_image',
            label: 'Maybe an image here?',
            type: sw.FieldType.INLINEHTML,
            container: 'custpage_parent_image'
          })

          log.debug('item image urm', item.parentimg)
          imageField.defaultValue = '<img src=' + item.parentimg + '>'

          var psku = form.addField({
            id: 'custpage_psku',
            label: 'Parent Sku',
            type: sw.FieldType.TEXT,
            container: 'custpage_fg_attribute'
          })

          psku.updateDisplayType({
            displayType: sw.FieldDisplayType.DISABLED
          })

          psku.defaultValue = filledItem.parentSku

          var cancelLine = form.addField({
            id: 'custpage_cancel_line',
            label: 'Cancel Purchase Order Line',
            type: sw.FieldType.CHECKBOX,
            container: 'custpage_fg_attribute'
          })

          cancelLine.updateDisplayType({
            displayType: sw.FieldDisplayType.ENTRY
          })

          var notes = form.addField({
            id: 'custpage_notes',
            label: 'Receiving Notes',
            type: sw.FieldType.TEXTAREA,
            container: 'custpage_fg_attribute'
          })

          notes.updateDisplaySize({
            height: 5,
            width: 80
          })
          // NG - 787
          notes.defaultValue = filledItem.receivingNotes

          var qty = form.addField({
            id: 'custpage_quantity',
            label: 'Quantity Received',
            type: sw.FieldType.INTEGER,
            container: 'custpage_fg_attribute'
          })
          qty.defaultValue = parseInt(filledItem.expectedQuantity)

          // NG-1469: split into multiple SKUs
          var multipleSkus = form.addField({
            id: 'custpage_multipleskus',
            label: 'Multiple SKUs ?',
            type: sw.FieldType.CHECKBOX,
            container: 'custpage_fg_attribute'
          })

          // NG-461
          var qtyExpected = form.addField({
            id: 'custpage_expquanty',
            label: 'Quantity Expected',
            type: sw.FieldType.INTEGER,
            container: 'custpage_fg_attribute'
          })
          qtyExpected.defaultValue = parseInt(filledItem.expectedQuantity)
          qtyExpected.updateDisplayType({
            displayType: sw.FieldDisplayType.DISABLED
          })

          var bpaFieldNames = form.addField({
            id: 'custpage_fielddata_object',
            label: 'Hidden Field Array',
            type: sw.FieldType.TEXT,
            container: 'custpage_fg_attribute'
          })
          bpaFieldNames.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })

          var bpaHasChanged = form.addField({
            id: 'custpage_fielddata_has_changed',
            label: 'Hidden BPA Have Changed',
            type: sw.FieldType.CHECKBOX,
            container: 'custpage_fg_attribute'
          })
          bpaHasChanged.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })

          var bpaFieldArray = []

          // class 2 = '400 Used'
          if (item.itemClass == 2) {
            var categoryFields = search.lookupFields({
              type: 'customrecord_g2_category',
              id: item.categoryId,
              columns: ['custrecord_g2_category_condition_refs']
            })
            log.debug('categoryFields', categoryFields)

            var catConditions = categoryFields.custrecord_g2_category_condition_refs
            log.debug('conditions from category', catConditions)

            var conditionIds = []
            for (var p = 0; p < catConditions.length; p++) {
              conditionIds.push(catConditions[p].value)
            }
            log.debug('condition Id array', conditionIds)

            // iterate each of the fields for this line
            // for bpa only really
            for (var f = 0; f < attributeList.length; f++) {
              var field = attributeList[f]
              // if it's a bpa field
              var formField

              if (
                field.hasOwnProperty('custrecord_fmd_bidpriceattribute') &&
                field.custrecord_fmd_bidpriceattribute.id
              ) {
                log.debug('vf column', field.custrecord_fmd_columnscriptid.id)
                log.debug('vf field form', 'custpage_eia_fielddata_' + field.id)
                bpaFieldArray.push(
                  field.custrecord_fmd_columnscriptid.id +
                    ':' +
                    'custpage_eia_fielddata_' +
                    field.id +
                    ':' +
                    field.value
                )

                // if it's a condition, create a customized field and (dropdown?) selections for this field
                if (
                  field['custrecord_fmd_listrecscriptid'].id ==
                  'customrecord_g2_condition'
                ) {
                  formField = form.addField({
                    id: 'custpage_eia_fielddata_' + field.id,
                    label: field['custrecord_fmd_field'].text,
                    type: field['custrecord_fmd_fieldtype'].id,
                    container: 'custpage_fg_attribute'
                  })
                  formField.addSelectOption({
                    value: '',
                    text: '&nbsp;'
                  })

                  // Add array of conditions on the Category record as another filter
                  search
                    .create({
                      type: field['custrecord_fmd_listrecscriptid'].id,
                      filters: [
                        search.createFilter({
                          name: 'custrecord_g2_condition_validforgsv',
                          operator: search.Operator.IS,
                          values: ['T']
                        }),
                        search.createFilter({
                          name: 'internalid',
                          operator: search.Operator.ANYOF,
                          values: conditionIds
                        })
                      ],
                      columns: [
                        search.createColumn({
                          name: 'name'
                        })
                      ]
                    })
                    .run()
                    .each(function (res) {
                      formField.addSelectOption({
                        value: res.id,
                        text: res.getValue({
                          name: 'name'
                        })
                      })

                      return true
                    })
                } else {
                  // create a basic field in the attribute field group
                  formField = form.addField({
                    id: 'custpage_eia_fielddata_' + field.id,
                    label: field['custrecord_fmd_field'].text,
                    type: field['custrecord_fmd_fieldtype'].id,
                    source: field['custrecord_fmd_listrecscriptid'].id,
                    container: 'custpage_fg_attribute'
                  })
                }
                if (field['custrecord_fmd_fieldtype'].id == 'checkbox') {
                  formField.defaultValue = field.value == true ? 'T' : 'F'
                } else {
                  formField.defaultValue = field.value || null
                }
              }
            }
            log.debug('vf bpaFieldArray', JSON.stringify(bpaFieldArray))

            if (bpaFieldArray.length > 0) {
              bpaFieldNames.defaultValue = JSON.stringify(bpaFieldArray)
            } else {
              log.debug('vf bpaFieldArray emptry')
              bpaFieldNames.defaultValue = '[]'
            }

            var bidPrice = form.addField({
              id: 'custpage_bidprice',
              label: 'Bid Price',
              type: sw.FieldType.CURRENCY,
              container: 'custpage_fg_attribute'
            })

            bidPrice.updateDisplayType({
              displayType: sw.FieldDisplayType.INLINE
            })

            bidPrice.defaultValue = filledItem.unitprice
          }

          var cacheKeyField = form.addField({
            id: 'custpage_cachekey',
            label: 'hidden',
            type: sw.FieldType.TEXT
          })
          cacheKeyField.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })

          cacheKeyField.defaultValue = cacheKey

          var poId = cacheKey.split(':')[1]
          log.debug('poid', poId)

          var gsvValue = search.lookupFields({
            type: 'purchaseorder',
            id: poId,
            columns: ['custbody_gsvsite_ref']
          })
          log.debug('gsv Lookup', gsvValue)

          var gsvGUID = ''

          if (gsvValue.custbody_gsvsite_ref.length > 0) {
            var gsvSiteId = gsvValue.custbody_gsvsite_ref[0].value
            log.debug('gsvSiteId', gsvSiteId)
            gsvGUID = search.lookupFields({
              type: 'customrecord_gsv_site',
              id: gsvSiteId,
              columns: ['custrecord_gsv_site_guid']
            })
            gsvGUID = gsvGUID.custrecord_gsv_site_guid
            log.debug('GSV GUID', gsvGUID)
          }

          var gsvSiteGUID = form.addField({
            id: 'custpage_gsv_guid',
            label: 'hidden guid',
            type: sw.FieldType.TEXT
          })
          gsvSiteGUID.updateDisplayType({
            displayType: sw.FieldDisplayType.HIDDEN
          })
          gsvSiteGUID.defaultValue = gsvGUID

          context.response.writePage(form)
        }
      } else {
        // POST

        // check for URL param to 'replace' item
        // this will be an update to the PO (to replace the
        // original item)
        // carry over BPA attributes to the IR -ONLY-
        // create item receipt
        //

        var params = context.request.parameters
        log.debug('post params', params) // turns out the entire form is accessible

        var multipleSkus = params.custpage_multipleskus === 'T'
        log.debug('multipleSkus', multipleSkus)

        var repItem = params['custpage_repitem'] || '' // for the replacing of items
        var repItems = [] // a collection of replacement item ids for processign multiple skus option
        var cacheKey = params['custpage_cachekey']
        // TJ: custpage_cachekey=purchaseorder:3370582:inventoryitem:41285:9931546

        var bpaHasChanged = params['custpage_fielddata_has_changed']
        log.debug('bpaHasChanged', bpaHasChanged)

        var unitPrice = params['custpage_bidprice'] || 0
        var quantity = params['custpage_quantity']
        var notes = params['custpage_notes']

        var lineIsCancelled =
          !(params['custpage_cancel_line'] === false ||
          params['custpage_cancel_line'] === 'F')

        var parsedKey = cacheKey.split(/:/) // [purchaseorder, 3370582, inventoryitem, 41285, 9931546]
        var cache = parsedKey[0] // 'purchaseorder'
        var tranType = parsedKey[0] // transaction type
        var tranId = parsedKey[1] // transaction id
        var addedFromType = parsedKey[2] // originating item type
        var addedFrom = parsedKey[3] // associate to item
        var addedFromLineKey = parsedKey[4] // unique key for tran line to update qty of

        var docCache = cacheMod.getCache({
          name: cache,
          scope: cacheMod.Scope.PUBLIC
        })

        var origCache = JSON.parse(
          docCache.get({
            key: cacheKey,
            loader: itemHelper.cacheTransactionItemLoader,
            ttl: 3600
          }) || '{}'
        )

        var newItemCache

        // pull out our bpa fields from the parameters, keeping the keys available
        // there are some silly other parameter fields we need to avoid, hence the regex
        var bpas = Object.keys(params).filter(function (i) {
          return i.match(/^custpage_eia_fielddata_\d+$/)
        })
        var fields = origCache.fieldData
        var orderRec
        var irRec

        // TJ: how to cancel the line
        if (lineIsCancelled) {
          log.debug('add cancel code here')

          // TJ: load PO, find the item on the sublist,
          var poRec = record.load({
            type: tranType,
            id: tranId
          })
          log.debug('cancel lineuniquekey', parsedKey[4])

          if (params['custpage_notes']) {
            var notesToUpdate = params['custpage_notes']
          }
          var findLine = poRec.findSublistLineWithValue({
            sublistId: 'item',
            fieldId: 'lineuniquekey',
            value: parsedKey[4]
          })

          // if the line exists
          if (findLine != -1) {
            // update receiving notes
            poRec.setSublistValue({
              sublistId: 'item',
              fieldId: 'custcol_wms_recvnotes',
              line: findLine,
              value: notesToUpdate
            })
            // set item to close
            poRec.setSublistValue({
              sublistId: 'item',
              fieldId: 'isclosed',
              line: findLine,
              value: true
            })

            // NG-899 - cancelling a line should only close the rest if partially received
            // TJ: what does partially received mean?
            if (
              poRec.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantityreceived',
                line: findLine
              }) == 0
            ) {
              poRec.setSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_wms_hideinwms',
                line: findLine,
                value: true
              })
            }
          }
          var poId = poRec.save()
          log.debug('closed Purchase Order Line ' + findLine, poId)

          context.response.write(
            '<script>window.opener.location.reload(true);window.close();</script>'
          )
        } else {
          // TJ: if not canceling and there is a replacement item, store this repItem onto the record (purchase order)
          log.debug('repitem', repItem)

          if (repItem) {
            // NG-1469 code here
            // check if we are to split into multiple skus
            if (multipleSkus && quantity > 1) {
              var quantityPerSku = 1 // one item per sku

              repItems.push(repItem) // push the first saved item
              repItems = createExtraReplacementItems(repItem, quantity, repItems)
              repItems.forEach(function (repItem) {
                newItemCache = saveReplacementItemToPurchaseOrder(
                  tranType,
                  tranId,
                  repItem,
                  quantityPerSku,
                  addedFromType,
                  addedFrom,
                  addedFromLineKey
                )
              })
            } else {
              // if just a single-sku item
              newItemCache = saveReplacementItemToPurchaseOrder(
                tranType,
                tranId,
                itemId,
                quantity,
                addedFromType,
                addedFrom,
                addedFromLineKey
              )
            }

            newItemCache = JSON.parse(newItemCache)

            var newItemKey = newItemCache.cacheKey

            log.debug({
              title: 'repItem: ' + repItem,
              details: typeof newItemCache + Object.keys(newItemCache)
            })

            cacheKey = newItemKey
            parsedKey = cacheKey.split(/:/)
          }

          // if Cancel, do not run IR code
          // TJ: if cacheKey exists, create item reciept
          // TJ: do we ever want this to run if the cache above is not stored? right now it will run with the old cache, that is, without item ever being added to the transaction
          if (cacheKey && !lineIsCancelled) {
            // transform PO into Item Reciept
            var myReceipt = record.transform({
              fromType: cache, // transaction type
              fromId: parsedKey[1], // transaction id
              toType: record.Type.ITEM_RECEIPT
            })

            // receipt order line -> po order line -> unique key
            var lines = myReceipt.getLineCount({
              sublistId: 'item'
            })

            // TJ, what is parsedKey[1]?
            orderRec = record.load({
              type: cache,
              id: parsedKey[1]
            })

            var lineToUpdate
            var priceOverride = false

            // VF bid price attributes and values all found above
            // TJ: bid price attributes and values, all sourced from purchase order transformation
            var quoteResult = ''

            for (var e = 0; e < lines; e++) {
              log.debug({
                title: 'looking for:' + parsedKey[4],
                details: 'found: ' + orderLineKey
              })
              // this is PROBABLY overkill, but explicitly isolate the lineunique key tied to this IR line
              // if that matches cacheKey's, RECEIVE!

              var value = myReceipt.getSublistValue({
                sublistId: 'item',
                line: e,
                fieldId: 'orderline'
              })

              var line = orderRec.findSublistLineWithValue({
                sublistId: 'item',
                fieldId: 'line',
                value: value
              })

              var orderLineKey = orderRec.getSublistValue({
                sublistId: 'item',
                line: line,
                fieldId: 'lineuniquekey'
              })

              // update priceOverride
              priceOverride = orderRec.getSublistValue({
                sublistId: 'item',
                line: line,
                fieldId: 'custcol_wms_price_override'
              })
              log.debug('priceOverride', priceOverride)

              // Our LINE!!!
              if (orderLineKey == parsedKey[4]) {
                myReceipt.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'location',
                  value: 4,
                  line: e
                })

                myReceipt.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'quantity',
                  value: quantity,
                  line: e
                })

                myReceipt.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'custcol_wms_recvnotes',
                  value: notes,
                  line: e
                })

                // make BPA object for API.QUOTE Call
                var bpaObject = {}

                // bid price loop!
                for (var b = 0; b < bpas.length; b++) {
                  // extract field id(last element of name)
                  var bpaIdx = bpas[b].split(/\_/).pop()
                  // returns index of (first) object containing attribute == value
                  var field = itemHelper.objIndexbyAttr(fields, 'id', bpaIdx)
                  if (field >= 0) {
                    log.debug({
                      title: 'atty: ' + bpas[b],
                      details:
                        'f: ' +
                        fields[field].custrecord_fmd_columnscriptid.id +
                        ' ---- V: ' +
                        params[bpas[b]]
                    })
                    myReceipt.setSublistValue({
                      sublistId: 'item',
                      fieldId: fields[field].custrecord_fmd_columnscriptid.id, // scriptid of the column fields
                      value: params[bpas[b]],
                      line: e
                    })
                    fields[field].value = params[bpas[b]]
                    bpaObject[fields[field].custrecord_fmd_columnscriptid.id] =
                      params[bpas[b]]
                  }
                }

                log.debug('before bidPrice priceOverride', priceOverride)

                if (bpaHasChanged == 'T' && priceOverride != true) {
                  var sku = params['custpage_psku']
                  var gsvGuid = params['custpage_gsv_guid']
                  var orderPaymentMethod = orderRec.getValue({
                    fieldId: 'custbody_paycode_ref'
                  })
                  log.debug('gsvGuid', gsvGuid)
                  log.debug('sku', sku)
                  log.debug('BPA Object', JSON.stringify(bpaObject))

                  try {
                    quoteResult = api.quote(gsvGuid, sku, bpaObject, orderPaymentMethod)
                    log.debug('Quote Result', quoteResult)

                    unitPrice = parseFloat(quoteResult)
                  } catch (e) {
                    log.debug('Quote Result', quoteResult)
                    log.debug('error', e)
                    throw 'Error calculating updated Bid Price. Item Receipt Failed.'
                  }
                } else {
                  quoteResult = unitPrice
                }

                // create subrecord for bin
                var binDetail = myReceipt.getSublistSubrecord({
                  sublistId: 'item',
                  fieldId: 'inventorydetail',
                  line: e
                })

                log.debug({
                  title: 'default bin?',
                  details: binDetail.getSublistValue({
                    sublistId: 'inventoryassignment',
                    fieldId: 'binnumber',
                    line: 0
                  })
                })

                // TODO: which bin(s)?!?!?

                var defaultBin = runtime.getCurrentScript().getParameter({
                  name: 'custscript_wms_defaultreceivingbin'
                })
                // hard coded to brad's generic receiving bin.
                var bin = 5
                if (defaultBin) {
                  bin = defaultBin
                }
                log.debug('default bin', bin)

                binDetail.setSublistValue({
                  sublistId: 'inventoryassignment',
                  fieldId: 'binnumber',
                  value: bin,
                  line: 0
                })

                binDetail.setSublistValue({
                  sublistId: 'inventoryassignment',
                  fieldId: 'quantity',
                  value: quantity,
                  line: 0
                })

                // TODO placeholder until Bid price lookup is ready.
                // If unit price is still 0, then assume opportunity receiving, and set rate to the rate of the PO line
                // NG-1082
                if (unitPrice == 0) {
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

                  log.debug('opportunity receving', unitPrice)

                  unitPrice = orderRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: orderRecLine
                  })
                }
                myReceipt.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'rate',
                  value: unitPrice,
                  line: e
                })

                // set location on po line
                orderRec.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'location',
                  line: orderRecLine,
                  value: 4
                })

                lineToUpdate = orderRecLine

                log.debug('Order Line to Update', lineToUpdate)
                log.debug('quoteResult before checking if empty', quoteResult)

                if (quoteResult != '') {
                  log.debug('quoteResult before setting on PO', parseFloat(quoteResult))
                  orderRec.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_wms_actual_rate',
                    line: lineToUpdate,
                    value: parseFloat(quoteResult)
                  })
                }
              } else {
                // not our line
                myReceipt.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'itemreceive',
                  value: false,
                  line: e
                })
              }
            } // end myReceipt lines

            try {
              irRec = myReceipt.save()

              log.debug('before PO save, check line to update', lineToUpdate)
              // trying to resolve the "record has changed" error
              if (irRec) {
                orderRec = record.load({
                  type: cache,
                  id: parsedKey[1]
                })
                // set location on po line
                orderRec.setSublistValue({
                  sublistId: 'item',
                  fieldId: 'location',
                  line: lineToUpdate,
                  value: 4
                })

                log.debug('quoteResult after IR checking if empty', quoteResult)
                if (quoteResult != '') {
                  log.debug('quoteResult after IR setting on PO', parseFloat(quoteResult))
                  orderRec.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_wms_actual_rate',
                    line: lineToUpdate,
                    value: parseFloat(quoteResult)
                  })
                }

                if (notes) {
                  // notes
                  orderRec.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_wms_recvnotes',
                    line: lineToUpdate,
                    value: notes
                  })
                }

                // set PO actual fields here
                for (var c = 0; c < bpas.length; c++) {
                  // extract field id(last element of name)
                  var bpaIdx = bpas[c].split(/\_/).pop()
                  // returns index of (first) object containing attribute == value
                  var field = itemHelper.objIndexbyAttr(fields, 'id', bpaIdx)

                  if (field >= 0) {
                    log.debug({
                      title: 'po atty: ' + bpas[c],
                      details:
                        'po f: ' +
                        fields[field].custrecord_fmd_po_col_scriptid.id +
                        ' ---- V: ' +
                        params[bpas[c]]
                    })

                    log.debug('po line to update', lineToUpdate)
                    if (
                      fields[field].custrecord_fmd_po_col_scriptid.id != '' &&
                      fields[field].custrecord_fmd_po_col_scriptid.id != undefined
                    ) {
                      orderRec.setSublistValue({
                        sublistId: 'item',
                        fieldId: fields[field].custrecord_fmd_po_col_scriptid.id, // scriptid of the column fields
                        line: lineToUpdate,
                        value: params[bpas[c]]
                      })
                      fields[field].value = params[bpas[c]]
                    }
                  }
                }

                orderRec = orderRec.save()

                var parsedKey = cacheKey.split(/:/)
                var itemInternal = parsedKey[3]

                log.debug('item internal id', itemInternal)
                log.debug('bid price to update item', unitPrice)

                // now update the item record
                var itemRec = record.load({
                  type: 'inventoryitem',
                  id: itemInternal
                })

                // NG-1121 - set Receiving Shell == False
                itemRec.setValue({
                  fieldId: 'custitem_wms_receivingshell',
                  value: false
                })

                var bidPriceLine = itemRec.findSublistLineWithValue({
                  sublistId: 'price',
                  fieldId: 'pricelevelname',
                  value: 'Bid Price'
                })
                if (bidPriceLine != -1) {
                  bidPrice = itemRec.setSublistValue({
                    sublistId: 'price',
                    fieldId: 'price_1_',
                    line: bidPriceLine,
                    value: unitPrice
                  })
                }
                var itemId = itemRec.save()
                log.debug('update item', itemId)
              }
            } catch (e) {
              // return something usable?
              log.debug({
                title: 'save error',
                details: JSON.stringify(e)
              })
            }
          } // end if(cacheKey)

          // return.... something
          // need to disable checkbox on cacheKey line
          // need to *not* disable checkbox on 'replaced line'
          // close window
          if (!lineIsCancelled) {
            context.response.write(
              '<script>window.opener.location.reload(true);window.close();</script>'
            )
            // context.response.write("We did it! Here's a rec: " + irRec)
          }
        }
      }
    } catch (e) {
      log.debug('error', JSON.stringify(e))
      context.response.write('OOPS: ' + JSON.stringify(e))
    }
  }

  function createSku (newItemRecord) {
    // based off of ItemHelper.createItem()

    var newSku
    var newItemId = newItemRecord.save()

    var date = new Date()
    var monthNum = date.getMonth() + 1
    var monthObj = { 10: 'T', 11: 'N', 12: 'D' }

    if (monthNum > 9) {
      monthNum = monthObj[monthNum]
    }

    newSku =
      'D' +
      newItemId +
      monthNum +
      '-' +
      new Date()
        .getFullYear()
        .toString()
        .substr(-2)

    return { sku: newSku, id: newItemId }
  }

  function setSkuAndItemId (newItemId, newItemSku) {
    try {
      // load & saveto store SKU & itemid
      var item = record.load({
        type: record.Type.INVENTORY_ITEM,
        id: newItemId
      })

      item.setValue({
        fieldId: 'custitem_g2_sku',
        value: newItemSku
      })

      item.setValue({
        fieldId: 'itemid',
        value: newItemSku
      })

      newItemId = item.save()

      return newItemId
    } catch (e) {
      log.debug('error setting SKU and Item Id', JSON.stringify(e))
    }
  }

  function createExtraReplacementItems (repItemId, quantity, repItems) {
    var numberOfCopies = quantity - 1

    for (var i = 0; i < numberOfCopies; i++) {
      newItemRecord = record.copy({
        type: record.Type.INVENTORY_ITEM,
        id: repItemId,
        isDynamic: true,
        defaultValues: {
          itemid: null,
          custitem_g2_sku: null
        }
      })

      var newItemSkuObj = createSku(newItemRecord)
      var newItemRecordId = setSkuAndItemId(newItemSkuObj.id, newItemSkuObj.sku)

      repItems.push(newItemRecordId)
    }

    return repItems
  }

  function saveReplacementItemToPurchaseOrder (
    tranType,
    tranId,
    itemId,
    quantity,
    addedFromType,
    addedFrom,
    addedFromLineKey
  ) {
    var newItemCache = itemHelper.addItemToTransaction(
      {
        tranType: tranType, // transaction type
        tranId: tranId, // transaction id
        itemId: itemId, // item to add
        quantity: quantity, // quantity to set
        addedFromType: addedFromType, // originating item type
        addedFrom: addedFrom, // associate to item
        addedFromLineKey: addedFromLineKey // unique key for tran line to update qty of
      },
      true
    )

    return newItemCache
  }

  return {
    onRequest: onRequest
  }
})

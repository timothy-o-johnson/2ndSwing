require(['N/search', 'N/record', '/SuiteScripts/WMS/shared/SavedSearchLibrary'], function (search, record, ssLib) {
  // load item record, note must be set to true in order to get select options
  var replacementItemRecord = record.load({
    type: record.Type.INVENTORY_ITEM,
    id: 41285,
    isDynamic: true
  })

  // get category data from item record
  var categoryTypeValue = replacementItemRecord.getValue({
    fieldId: 'custitem_g2_category_ref'
  })

  var categoryTypeText = replacementItemRecord.getText({
    fieldId: 'custitem_g2_category_ref'
  })

  // load category record from category data
  var categoryRecord = record.load({
    type: 'customrecord_g2_category',
    id: categoryTypeValue
  })

  // get attribute field data from category record
  var newProductAttributesValue = categoryRecord.getValue({
    fieldId: 'custrecord_g2_category_newprodatt_refs'
  })

  var newProductAttributesText = categoryRecord.getText({
    fieldId: 'custrecord_g2_category_newprodatt_refs'
  })

  // get all fields from replacement item (maybe loop through later)
  var replacementItemRecordFields = replacementItemRecord.getFields()

  var clubColorField = replacementItemRecord.getField({
    fieldId: 'custitem_g2_club_color_ref'
  })

  log.debug('much stuff:newProductAttributes', newProductAttributesText)

  var clubColorFieldSelections = clubColorField.getSelectOptions({
    filter: 's',
    operator: 'contains'
  })

  // get custitem_g2_club_color_ref

  log.debug('much stuff:newProductAttributes', newProductAttributesText)

  var relevantAttributeFields = getCategoryAttributes(22) // 6 = Fairway Wood

  log.debug('relevantAttributeFields', relevantAttributeFields)

  var originalItemAttr = getOriginalItemAttr(relevantAttributeFields,29702)

  log.debug('originalItemAttr', originalItemAttr)
  
  
  // helper function to get attributes and values from original item
  function getOriginalItemAttr (origItemSearchColumns, origItemId) {
    var origSkuSearch = search.create({
      type: 'item',
      filters: [
        ['internalidnumber', 'equalto', origItemId]
        // "AND",
        // ["transaction.mainline", "is", "T"]
      ],
      columns: origItemSearchColumns
    })
    var itemCount = origSkuSearch.runPaged().count
    var attrResultArray = ssLib.getFormattedSearchResults(origSkuSearch)
    log.debug('attr Result Array: ', attrResultArray)
    var origSkuFields = {}
    if (itemCount > 0) {
      itemObj = origSkuSearch.run().getRange({ start: 0, end: 1 })
      log.debug('itemObj results from search : ', itemObj)
      var attrObj = attrResultArray[0]
      log.debug(' attrObj: ', attrObj)
      for (var key in attrObj) {
        if (Array.isArray(attrObj[key])) {
          attrValue = attrObj[key][0].value
        } else {
          attrValue = attrObj[key]
        }
        origSkuFields[key] = attrValue.value
      }
      log.debug('Original Item Object: ', origSkuFields)
      return origSkuFields
    } else {
      log.debug('no results returned for original item search: ', origSkuFields)
      return origSkuFields
    }
  } // end getRelevantAttr/Values from origSku (based on Category)

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // helper function to get relevantAttribute fields based on category
  // returns the field, the field metadata record internalid, and the internalid of the field on the item
  // 
  function getCategoryAttributes (category) {
    var origItemSearchColumns = []
    var attrFields = []
    var excludeFields = [
      'custitem_g2_pricepremiumpct',
      'custitem_g2_pricepremiumamt',
      'custitem_g2_pricediscountpct',
      'custitem_g2_pricediscountamt',
      'custitem_wms_parentitemmodel',
      'custitem_wms_parentitemcategory',
      'custitem_wms_parentitembrand',
      'custitem_g2_onlinetitle',
      'custitem_g2_isecommerceitem',
      'custitem_g2_freenotes',
      'custitem_g2_ebaytitle',
      'custitem_g2_condition_ref'
    ]

    var defaultNewProductAttributes = 'custrecord_g2_category_newprodatt_refs'
    var usedProductAttributes = 'custrecord_g2_category_usedprodatt_refs'

    log.debug('getting relevant: #' + category + ' attributes ', category)

    // get category field values
    var attributes = search.lookupFields({
      type: 'customrecord_g2_category',
      id: category,
      columns: [defaultNewProductAttributes]
    })

    log.debug('catAttrs for category: ' + category, JSON.stringify(attributes))

    var catAttrs = attributes[defaultNewProductAttributes].map(function (
      productAttribute
    ) {
      return productAttribute.value
    })

    catAttrs.push(-1075) // hard coded - UPC (should be consistent across environments)

    // use the field metadata record to find the right category field and x
    if (catAttrs.length) {
      var fields = search
        .create({
          type: 'customrecord_fieldmetadata',
          filters: [
            search.createFilter({
              name: 'custrecord_fmd_field',
              operator: search.Operator.ANYOF,
              values: catAttrs
            }),
            search.createFilter({
              name: 'isinactive',
              operator: search.Operator.IS,
              values: false
            })
          ],
          columns: [
            search.createColumn({
              name: 'custrecord_fmd_field'
            }),
            search.createColumn({
              name: 'custrecord_fmd_fieldscriptid'
            })
          ]
        })
        .run()
        .each(function (res) {
          // keep the fmd rec id
          var field = {
            id: res.id
          }
          for (var col = 0; col < res.columns.length; col++) {
            field[res.columns[col].name] = {
              id:
                typeof res.getValue(res.columns[col]) == 'string'
                  ? res.getValue(res.columns[col]).toLowerCase()
                  : res.getValue(res.columns[col]),
              text: res.getText(res.columns[col])
            }
          }
          if (
            excludeFields.indexOf(field.custrecord_fmd_fieldscriptid.id) === -1
          ) {
            attrFields.push(field)
          }
          return true
        })
    }

    log.debug('attrFields length: ', attrFields.length)
    log.debug('attrField :', attrFields)

    for (var i = 0; i < attrFields.length; i++) {
      var attribute = attrFields[i]
      var attrId = attribute.custrecord_fmd_fieldscriptid.id
      var attrSearchCol = search.createColumn({ name: attrId, label: attrId })
      origItemSearchColumns.push(attrSearchCol)
    }

    return origItemSearchColumns
  } // end getRelevant attribute function
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
})

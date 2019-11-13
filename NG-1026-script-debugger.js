require(['N/record', 'N/search', '/SuiteScripts/WMS/shared/SavedSearchLibrary'], function (
  record
) {
  var currentRecord = loadItemRecord('46952')
  var priceFieldValues = getPriceFieldValues(currentRecord)

  log.debug('itemRecord', JSON.stringify(currentRecord))
  log.debug('priceFieldValues', JSON.stringify(getPriceFieldValues(currentRecord)))

  setPriceFields(currentRecord, priceFieldValues)

  function loadItemRecord (recordInternalId) {
    var itemRecord = record.load({
      type: record.Type.INVENTORY_ITEM,
      id: recordInternalId
    })

    return itemRecord
  }

  function getPriceFieldValues (currentRecord) {
    var priceSublistFields = ['MSRP', 'Base Price', 'Bid Price']
    var priceFieldValues = {}

    priceSublistFields.forEach(function (field) {
      var lineNum = currentRecord.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: field
      })

      var value = currentRecord.getSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: lineNum
      })

      priceFieldValues[field] = value
    })
    return priceFieldValues
  }

  function setPriceFields (currentRecord, priceFieldValues) {
    var priceFields = Object.keys(priceFieldValues)
    var fieldMap = {
      MSRP: 'custitem_msrp_copy',
      'Base Price': 'custitem_base_price_copy',
      'Bid Price': 'custitem_bid_price_copy'
    }

    try {
      priceFields.forEach(function (field) {
        savedRecord = currentRecord.setValue({
          fieldId: fieldMap[field],
          value: priceFieldValues[field]
        })

        log.debug('field ' + field + 'saved on record' + JSON.stringify(savedRecord))
      })
    } catch (e) {
      log.debug('error in setting price fields', e)
    }
      
      currentRecord.save()
  }
})

// require(['N/record', 'N/search', '/SuiteScripts/WMS/shared/SavedSearchLibrary'], function (
//   record,
//   search,
//   ssLib
// ) {
//   var rec
//   var searchResults = ssLib.fullSearch('item', 'customsearch2008', null, null)

//   log.debug('searchResults', JSON.stringify(searchResults))

//   searchResults.forEach(function (result) {
//     rec = record.load({
//       type: record.Type.INVENTORY_ITEM,
//       id: result.id
//     })

//     rec.save()
//   })
// })

require(['N/record', 'N/search', '/SuiteScripts/WMS/shared/SavedSearchLibrary'], function (
  record
) {
  var currentRecord = loadItemRecord('46952')
  var priceFieldValues = getPriceFieldValues(currentRecord)

  log.debug('itemRecord', JSON.stringify(currentRecord))
  log.debug('priceFieldValues', JSON.stringify(getPriceFieldValues(currentRecord)))

  setPriceFields(currentRecord, priceFieldValues)
  setDisplayInParentItemLookupField(currentRecord)

  currentRecord.save()

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

        log.debug('field ' + field + 'saved on record')
      })
    } catch (e) {
      log.debug('error in setting price fields', e)
    }
  }

  function setDisplayInParentItemLookupField (currentRecord) {
    var basePrice = currentRecord.getValue({ fieldId: 'custitem_base_price_copy' })
    var bidPrice = currentRecord.getValue({ fieldId: 'custitem_bid_price_copy' })
    // if NO (or empty) Bid Price and Base Price, exclude this item.
    var excludedBasedOnEmptyOrNull = isEmptyOrNull(basePrice) || isEmptyOrNull(bidPrice)

    // if Bid Price = .$01 and Base Price = $999.99, exclude this item.
    if (!excludedBasedOnEmptyOrNull) {
      var excludedBasedOnPrice =
        parseFloat(bidPrice) === 0.01 && parseFloat(basePrice) === 999.99

      if (!excludedBasedOnPrice) {
        try {
          currentRecord.setValue({
            fieldId: 'custitem_parent_item_lookup_display',
            value: true
          })
        } catch (e) {
          log.error('error setting Display in Parent Lookup Item field', e)
        }
      }
    }
  }

  function isEmptyOrNull (number) {
    if (number === null || isNaN(number) || number === '' || number === undefined) {
      return true
    } else return false
  }
})

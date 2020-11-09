/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/cache'], function (record, cache) {
  function getInputData () {
    return {
      type: 'search',
      id: 'customsearch2040'
    }
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
    var success = result === itemInternalId

    if (success) {
      log.debug(
        'Item # ' + itemInternalId + 'loaded and saved')
        return result
    } else {
      log.error(
        'Problem saving record',
        'itemInternalId = ' + itemInternalId + '\nresult = ' + result
      )
    }
  }


  function loadItemRecord (recordInternalId) {
    // apparently caching item records disables it being recognized as a NS record, so much for saving memory!
    var itemRecord = record.load({
      type: record.Type.INVENTORY_ITEM,
      id: recordInternalId
    })

    return itemRecord
  }
})

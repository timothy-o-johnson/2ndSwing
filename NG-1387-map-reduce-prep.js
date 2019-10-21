var dog = {
  recordType: 'inventoryitem',
  id: '2148814',
  values: {
    itemid: '0211 STS : D21488147-19',
    parent: [{ value: '1825995', text: '0211 STS' }],
    'parent.internalid': [{ value: '1825995', text: '1825995' }]
  }
}

childrenWithoutMsrpsSearchResults[0].getValue({ name: 'parent' })

cachedParentMSRPs.get('1825995')

cachedParentMSRPs.get({ key: '1825995' })

childItemsForTesting = [2451085, 2462179, 2677023, 1221690]

require(['N/record', 'N/search', 'N/runtime', 'N/cache'], /**
 * @param {record}
 *            record
 * @param {search}
 *            search
 */ function (record, search, runtime, cache) {
  // create cache
    var cachedParentMSRPs = cache.getCache({ name: 'Parent MSRPs' })
    var parentMSRP = null
    var successfulSave = false
    var childrenWithoutMsrpsSearchResults = getChildrenWithoutMsrps()
    var parentInternalId = childrenWithoutMsrpsSearchResults[0].getValue({
      name: 'parent'
    })
    var childId = childrenWithoutMsrpsSearchResults[0].id

    // load the child record
    var childRecord = record.load({
      type: record.Type.INVENTORY_ITEM,
      id: childId
    })

    // get the parent's MSRP
    // first check to see if parent is in cache
    if (cachedParentMSRPs.get({ key: parentInternalId })) {
    // if parent exists in cache, set parentMSRP
      parentMSRP = cachedParentMSRPs.get({ key: parentInternalId })
    } else {
    // search for the parent MSRP
      parentMSRP = getParentMSRP(parentInternalId)
      // store it in the cache
      cachedParentMSRPs.put({
        key: parentInternalId,
        value: parentMSRP
      })
    }

    // populate child item with MSRP
    successfulSave = setMsrpOnChildRecord(childRecord, parentMSRP)

    return successfulSave

    function getChildrenWithoutMsrps () {
      var childrenWithoutMsrpsSearch = search.load({
        id: 'customsearch_children_missing_msrps'
      })

      return childrenWithoutMsrpsSearch.run().getRange({ start: 0, end: 100 })
    }

    function setMsrpOnChildRecord (childRecord, parentMSRP) {
      var msrpLine = childRecord.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'MSRP'
      })

      childRecord.setSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: msrpLine,
        value: parentMSRP
      })

      return childRecord.save()
    }

    // var parentInternalId = '984711'

    function getParentMSRP (parentInternalId) {
      var parentItem = record.load({
        type: record.Type.INVENTORY_ITEM,
        id: parentInternalId,
        isDynamic: false
      })

      var lineNum = parentItem.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'MSRP'
      })

      var parentMSRP = parentItem.getSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: lineNum
      })

      return parentMSRP
    }
  })

/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/runtime'], /**
 * @param {record}
 *            record
 * @param {search}
 *            search
 */ function (record, search, runtime) {
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

    function getInputData () {
      return {
        type: 'search',
        id: 'customsearch_children_missing_msrps'
      }
    }

    function map (context) {
      log.debug('context', JSON.stringify(context))
      var contextValues = JSON.parse(context.values[0]).values
      log.debug('context values', contextValues)

      context.errors.iterator().each(function (key, error, executionNo) {
        log.error({
          title: 'Map error for key: ' + key + ', execution no  ' + executionNo,
          details: error
        })
        return true
      })
    }

    function reduce (context) {
      log.debug('context', JSON.stringify(context))
      var contextValues = JSON.parse(context.values[0]).values
      log.debug('context values', contextValues)
    }

    return {
      getInputData: getInputData,
      map: map,
      reduce: reduce
    }
  })

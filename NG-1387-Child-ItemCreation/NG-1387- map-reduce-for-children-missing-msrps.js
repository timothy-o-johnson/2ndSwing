/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/cache'], function (record, cache) {
  function getInputData () {
    return {
      type: 'search',
      id: 'customsearch_children_missing_msrps'
    }
  }

  function reduce (context) {
    var contextValues = context.values
    var childid = JSON.parse(contextValues[0]).id
    var contextValuesValues = JSON.parse(context.values[0]).values

    populateMissingMSRP(childid, contextValuesValues)
  }

  return {
    getInputData: getInputData,
    reduce: reduce
  }

  function populateMissingMSRP (childId, contextValues) {
    try {
      var successfulSave = false
      var parentInternalId = contextValues.parent.value
      var parentMSRP = getParentMSRP(parentInternalId)
      var childRecord = loadChildRecord(childId)

      log.debug('parentMSRP', parentMSRP)

      // populate child item with MSRP
      successfulSave = setMsrpOnChildRecord(childRecord, parentMSRP)
      log.debug('successfulSave', successfulSave)

      return successfulSave
    } catch (e) {
      log.debug('error', e)
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

    function getParentMSRP (parentInternalId) {
      // create cache
      var cachedParentMSRPs = cache.getCache({ name: 'Parent MSRPs' })
      var parentMSRP

      // first check to see if parent is in cache
      if (cachedParentMSRPs.get({ key: parentInternalId })) {
        log.debug('cache!', 'parentId (' + parentInternalId + ') found in cache!')

        parentMSRP = cachedParentMSRPs.get({ key: parentInternalId })
      } else {
        parentMSRP = getParentMSRPFromNetSuite(parentInternalId)
        //  and store it in the cache
        cachedParentMSRPs.put({
          key: parentInternalId,
          value: parentMSRP
        })
      }

      return parentMSRP
    }

    function getParentMSRPFromNetSuite (parentInternalId) {
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
  }

  function loadChildRecord (childId) {
    return record.load({
      type: record.Type.INVENTORY_ITEM,
      id: childId
    })
  }
})

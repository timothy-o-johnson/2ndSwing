// NG-1661 debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  beforeSubmit()

  function beforeSubmit () {
    var serviceItemRecord = record.load({
      type: 'serviceitem',
      id: 2842938,
      isDynamic: true
    })

    var newRecord = serviceItemRecord

    var isParentItem = getParentItemStatus(newRecord)

    if (!isParentItem) {
      var serviceParentInternalId = getServiceParent(newRecord)
      var recordType = 'serviceitem'
      var setKitNeedsRefreshConfirmation = setKitNeedsRefresh(
        serviceParentInternalId,
        recordType,
        true
      )
      var savedSuccessfully =
        serviceParentInternalId === setKitNeedsRefreshConfirmation

      log.audit('was kit_needs_refresh successful? :', savedSuccessfully)
      return true
    }
    log.audit('was kit_needs_refresh successful? :', false)

    return true
  }

  function getParentItemStatus (newRecord) {
    var isParentItem = !newRecord.getValue({
      fieldId: 'parent'
    })
    return isParentItem
  }

  function getServiceParent (newRecord) {
    var serviceParentInternalId
    var parentInternalId = newRecord.getValue({
      fieldId: 'parent'
    })
    var parentIdSearchResult, searchFilters
    var columns = ['parent']

    // keep searching for service items until we reach the parent
    while (parentInternalId) {
      serviceParentInternalId = parentInternalId

      searchFilters = ['internalid', 'is', parentInternalId]

      parentIdSearchResult = ssLib.fullSearch(
        'serviceitem',
        null,
        searchFilters,
        columns
      )[0]

      log.debug('parentInternalId', parentInternalId)

      parentInternalId = parentIdSearchResult.parent
        ? parentIdSearchResult.parent.value
        : ''
    }

    return serviceParentInternalId
  }

  function setKitNeedsRefresh (recInternalId, recordType, value) {
    try {
      var id = record.submitFields({
        type: recordType,
        id: recInternalId,
        values: {
          custitem_kit_needs_refresh: value
        },
        options: {
          enableSourcing: false,
          ignoreMandatoryFields: true
        }
      })

      return id
    } catch (e) {
      log.error('error trying to setKitNeedsRefresh field', JSON.stringify(e))
    }
  }
})

// NG-1669 debugger

require([
  'N/search',
  'N/record',
  'N/cache',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, cache, ssLib) {
  var type = 'serviceitem'
  var searchId = null
  var filters = [
    ['custitem_kit_needs_refresh', 'is', 'T'],
    'AND',
    ['parent', 'isempty', '']
  ]
  var columns = []

  var serviceItemsThatNeedKitRefresh = ssLib.fullSearch(
    type,
    searchId,
    filters,
    columns
  )

  log.debug('serviceItemsThatNeedKitRefresh', serviceItemsThatNeedKitRefresh)
})

function loadRecordWithCache (recordType, recordId) {
  var rec = ''
  var recordCache = cache.getCache({
    name: 'Record_Cache',
    scope: cache.Scope.PUBLIC
  })

  // search cache
  rec = recordCache.get({
    key: recordId,
    loader: recordLoader
  })

  rec = JSON.parse(rec)

  return rec

  function recordLoader (context) {
    var rec = record.load({
      type: recordType,
      id: context.key
    })

    rec = JSON.stringify(rec)

    return rec
  }
}

// getIdsOfRelatedInventoryItemRecords()

// function getIdsOfRelatedInventoryItemRecords (serviceParentId) {
//   serviceParentId = 25 // Name: G7 CLASS BLD NEW PUT
//   var relatedInventoryItemRecordIds = []

//   // get fields from service parent
//   var serviceParentClass = getField(
//     serviceParentId,
//     'serviceitem',
//     'class',
//     'value'
//   )
//   // 1 = 401 New, 2 = 400 Used, 3 = 403 Opportunity

//   // use serviceParentClass to determine which field search
//   var customizationService =
//     serviceParentClass === 2
//       ? ['custitem_used_service_ref', 'is', serviceParentId]
//       : ['custitem_new_service_ref', 'is', serviceParentId]

//   // var parentIsEmpty = ['parent', 'is', 'empty']
//   var searchFilters = [customizationService /*parentIsEmpty,*/]
//   var searchColumns = ['internalid']

//   var searchResults = ssLib.fullSearch(
//     'inventoryitem',
//     null,
//     searchFilters,
//     searchColumns
//   )

//   searchResults.forEach(function (result) {
//     relatedInventoryItemRecordIds.push(result.id)
//   })

//   return relatedInventoryItemRecordIds
// }

// function getField (recordId, recordType, fieldId, dataType) {
//   var fieldData

//   var rec = record.load({
//     type: recordType,
//     id: recordId
//   })

//   try {
//     if (dataType === 'value') {
//       result = rec.getValue({
//         fieldId: fieldId
//       })
//     } else {
//       result = rec.getText({
//         fieldId: fieldId
//       })
//     }
//   } catch (e) {
//     log.debug('error in getField()', JSON.stringify(e))
//   }

//   return fieldData
// }

// var itemIds = [37348, 461243, 306224, 1186127, 81666, 81667]

// var itemsWithInventory = filterItemsWithZeroInventory(itemIds)

// function filterItemsWithZeroInventory (itemIds) {
//   itemIds = Array.isArray(itemIds) ? itemIds : [itemIds]
//   itemIds

//   var itemsWithInventory = []
//   var searchType = search.Type.INVENTORY_BALANCE
//   var columns = ['item', 'available', 'onhand']
//   var filters, availableQuantity

//   itemIds.forEach(function (id) {
//     filters = ['item', 'anyof', id]
//     availableQuantity = ssLib.fullSearch(searchType, null, filters, columns)
//     availableQuantity = availableQuantity[0]['available'].value

//     if (availableQuantity > 0) itemsWithInventory.push(id)
//   })

//   return itemsWithInventory
// }

//   var quantityOnHand = search.load({
//     type: search.Type.INVENTORY_BALANCE,
//     id: 'customsearch2065'
//   })

//   var searchType = search.Type.INVENTORY_BALANCE // InventoryBalance
//   var id = 'customsearch2065'

//   var internalid = 37348
//   var filters = ['item', 'anyof', internalid]
//   var columns = ['item', 'available', 'onhand']

//   //var ssLibQuantityOnHand = ssLib.fullSearch(searchType, id)

//   var ssLibQuantityOnHand2 = ssLib.fullSearch(
//     searchType,
//     null,
//     filters,
//     columns
//   )

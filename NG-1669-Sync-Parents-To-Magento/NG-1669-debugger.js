// NG-1669 debugger

require([
  'N/search',
  'N/record',
  'N/cache',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, cache, ssLib) {
  var itemIds = [
    '6',
    '22',
    '29325',
    '29326',
    '29327',
    '29328',
    '29329',
    '29330',
    '29331',
    '29332',
    '29333',
    '29334',
    '29335',
    '29336',
    '29337',
    '29338',
    '29339',
    '29340',
    '29341',
    '29342',
    '29343',
    '29344',
    '29345',
    '29346',
    '29347',
    '29348',
    '29349',
    '29350',
    '29351',
    '29352',
    '29353',
    '29354',
    '29355',
    '29356',
    '29357',
    '29358',
    '29359',
    '29360',
    '29361',
    '29362',
    '29363',
    '29364',
    '29365',
    '29366',
    '29367',
    '29368',
    '29369',
    '29370',
    '29371',
    '29372',
    '29373',
    '29374',
    '29375',
    '29376',
    '29377',
    '29378',
    '29379',
    '29380',
    '29381',
    '29382',
    '29383',
    '29384',
    '29385',
    '29386',
    '29387',
    '29388',
    '29389',
    '29390',
    '29391',
    '29392',
    '29393',
    '29394',
    '29395',
    '29396',
    '29397',
    '29398',
    '29399',
    '29400',
    '29401',
    '29402',
    '29403',
    '29404',
    '29405',
    '29406',
    '29407',
    '29408',
    '29409',
    '29410',
    '29411',
    '29412',
    '29413',
    '29414',
    '29415',
    '29416',
    '29417',
    '29418',
    '29419',
    '29420',
    '29421',
    '29422',
    '29423',
    '29424',
    '29425',
    '29426',
    '29427',
    '29428',
    '29429',
    '29430',
    '29431',
    '29432',
    '29433',
    '29434',
    '29435',
    '29436',
    '29437',
    '29438',
    '29439',
    '29440',
    '29441',
    '29442',
    '29443',
    '29444',
    '29445',
    '29446',
    '29447',
    '29448',
    '29449',
    '29450',
    '29451',
    '29452',
    '29453',
    '29454',
    '29455',
    '29456',
    '29457',
    '29458',
    '29459',
    '29460',
    '29461',
    '29462',
    '29463',
    '29464',
    '29465',
    '29466',
    '29467',
    '29468',
    '29469',
    '29470',
    '29471',
    '29472',
    '29473',
    '29474',
    '29475',
    '29476',
    '29477',
    '29478',
    '29479',
    '29480',
    '29481',
    '29482',
    '29483',
    '29484',
    '29485',
    '29486',
    '29487',
    '29488',
    '29489',
    '29490',
    '29491',
    '29492',
    '29493',
    '29494',
    '29495',
    '29496',
    '29497',
    '29498',
    '29499',
    '29500',
    '29501',
    '29502',
    '29503',
    '29504',
    '29505',
    '29506',
    '29507',
    '29508',
    '29509',
    '29510',
    '29511',
    '29512',
    '29513',
    '29514',
    '29515',
    '29516',
    '29517',
    '29518',
    '29519',
    '29520',
    '29521',
    '29522',
    '29523',
    '29524',
    '29525',
    '29526',
    '29527',
    '29528',
    '29529',
    '29530',
    '29531',
    '29532',
    '29533',
    '29534',
    '29535',
    '29536',
    '29537',
    '29538',
    '29539',
    '29540',
    '29541',
    '29542',
    '29543',
    '29544',
    '29545',
    '29546',
    '29547',
    '29548',
    '29549',
    '29550',
    '29551',
    '29552',
    '29553',
    '29554',
    '29555',
    '29556',
    '29557',
    '29558',
    '29559',
    '29560',
    '29561',
    '29562',
    '29563',
    '29564',
    '29565',
    '29566',
    '29567',
    '29568',
    '29569',
    '29570',
    '29571',
    '29572',
    '29573',
    '29574',
    '29575',
    '29576',
    '29577',
    '29578',
    '29579',
    '29580',
    '29581',
    '29582',
    '29583',
    '29584',
    '29585',
    '29586',
    '29587',
    '29588',
    '29589',
    '29590',
    '29591',
    '29592',
    '29593',
    '29594',
    '29595',
    '29596',
    '29597',
    '29598',
    '29599',
    '29600',
    '29601',
    '29602',
    '29603',
    '29604',
    '29605',
    '29606',
    '29607',
    '29608',
    '29609',
    '29610',
    '29611',
    '29612',
    '29613',
    '29614',
    '29615',
    '29616',
    '29617',
    '29618',
    '29619',
    '29620',
    '29621',
    '29622',
    '29623',
    '29624',
    '29625',
    '29626',
    '29627',
    '29628',
    '29629',
    '29630',
    '29631',
    '29632',
    '29633',
    '29634',
    '29635',
    '29636',
    '29637',
    '29638',
    '29639',
    '29640',
    '29641',
    '29642',
    '29643',
    '29644',
    '29645',
    '29646',
    '29647',
    '29648',
    '29649',
    '29650',
    '29651',
    '29652',
    '29653',
    '29654',
    '29655',
    '29656',
    '29657',
    '29658',
    '29659',
    '29660',
    '29661',
    '29662',
    '29663',
    '29664',
    '29665',
    '29666',
    '29667',
    '29668',
    '29669',
    '29670',
    '29671',
    '29672',
    '29673',
    '29674',
    '29675',
    '29676',
    '29677',
    '29678',
    '29679',
    '29680',
    '29681',
    '29682',
    '29683',
    '29684',
    '29685',
    '29686',
    '29687',
    '29688',
    '29689',
    '29690',
    '29691',
    '29692',
    '29693',
    '29694',
    '29695',
    '29696',
    '29697',
    '29698',
    '29699',
    '29700',
    '29701',
    '29702',
    '29703',
    '29704',
    '29705',
    '29706',
    '29707',
    '29708',
    '29709',
    '29710',
    '29711',
    '29712',
    '29713',
    '29714',
    '29715',
    '29716',
    '29717',
    '29718',
    '29719',
    '29720',
    '29721',
    '29722',
    '29723',
    '29724',
    '29725',
    '29726',
    '29727',
    '29728',
    '29729',
    '29730',
    '29731',
    '29732',
    '29733',
    '29734',
    '29735',
    '29736',
    '29737',
    '29738',
    '29739',
    '29740',
    '29741',
    '29742',
    '29743',
    '29744',
    '29745',
    '29746',
    '29747',
    '29748',
    '29749',
    '29750',
    '29751',
    '29752',
    '29753',
    '29754',
    '29755',
    '29756',
    '29757',
    '29758',
    '29759',
    '29760',
    '29761',
    '29762',
    '29763',
    '29764',
    '29765',
    '29766',
    '29767',
    '29768',
    '29769',
    '29770',
    '29771',
    '29772',
    '29773',
    '29774',
    '29775',
    '29776',
    '29777',
    '29778',
    '29779',
    '29780',
    '29781',
    '29782',
    '29783',
    '29784',
    '29785',
    '29786',
    '29787',
    '29788',
    '29789',
    '29790',
    '29791',
    '29792',
    '29793',
    '29794',
    '29795',
    '29796',
    '29797',
    '29798',
    '29799',
    '29800',
    '29801',
    '29802',
    '29803',
    '29804',
    '29805',
    '29806',
    '29807',
    '29808',
    '29809',
    '29810',
    '29811',
    '29812',
    '29813',
    '29814',
    '29815',
    '29816',
    '29817',
    '29818',
    '29819',
    '29820',
    '29821',
    '29822',
    '2982'
  ]

  filterItemsWithZeroInventory(itemIds)

  function filterItemsWithZeroInventory (itemIds) {
    var functionName = 'filterItemsWithZeroInventory'
    printVar(functionName, 'intitial length', itemIds.length)

    itemIds = Array.isArray(itemIds) ? itemIds : [itemIds]
    itemIds

    var maxSize = 4000
    var arrSize = itemIds.length
    var beg = 0
    var end = maxSize
    var itemsWithInventory = []

    if (itemIds.length > maxSize) {
      // if too large break into chunks
      printVar(functionName, 'entering chunk loop', beg + ', ' + end)
      var tempArr
      tempArr = itemIds.slice(beg, end)

      while (tempArr.length > 0) {
        itemsWithInventory = getItemsWithInventory(tempArr, itemsWithInventory)
        beg = end
        end = end + maxSize <= arrSize ? end + maxSize : arrSize
        tempArr = itemIds.slice(beg, end)
        printVar(functionName, 'beg, end', beg + ', ' + end)
      }
    } else {
      // small enought to process the whole thing
      itemsWithInventory = getItemsWithInventory(tempArr, itemsWithInventory)
    }

    printVar(functionName, 'itemsWithInventory', itemsWithInventory)
    printVar(
      functionName,
      'itemsWithInventory.length',
      itemsWithInventory.length
    )

    return itemsWithInventory
  }

  function printVar (functionName, variableName, variable) {
    log.debug(functionName + ': ' + variableName, variable)
  }

  function getItemsWithInventory (itemIds, itemsWithInventory) {
    if (Array.isArray(itemsWithInventory) && Array.isArray(itemIds)) {
      var availableQuantitySearchResult, availableQuantity, id

      var searchType = search.Type.INVENTORY_BALANCE
      var columns = ['item', 'available', 'onhand']
      var filters = ['item', 'anyof', itemIds]

      availableQuantitySearchResult = ssLib.fullSearch(
        searchType,
        null,
        filters,
        columns
      )

      availableQuantitySearchResult.forEach(function (result) {
        availableQuantity = result['available']['value']
        availableQuantity = parseInt(availableQuantity, 10)
        id = result['item']['value']

        if (availableQuantity > 0) {
          itemsWithInventory.push(id)
        }
      })
    }

    return itemsWithInventory
  }
})

//       var type = 'serviceitem'
//   var searchId = null
//   var filters = [
//     ['custitem_kit_needs_refresh', 'is', 'T'],
//     'AND',
//     ['parent', 'isempty', '']
//   ]
//   var columns = []

//   var serviceItemsThatNeedKitRefresh = ssLib.fullSearch(
//     type,
//     searchId,
//     filters,
//     columns
//   )

//   log.debug('serviceItemsThatNeedKitRefresh', serviceItemsThatNeedKitRefresh)
// })

function filterItemsWithZeroInventory (itemIds) {
  var functionName = 'filterItemsWithZeroInventory'
  printVar(functionName, 'intitial length', itemIds.length)

  itemIds = Array.isArray(itemIds) ? itemIds : [itemIds]
  itemIds

  var itemsWithInventory = []
  var availableQuantitySearchResult, availableQuantity

  // get the quantity for all items
  var searchType = search.Type.INVENTORY_BALANCE
  var columns = ['item', 'available', 'onhand']
  var filters = ['item', 'anyof', itemIds]
  availableQuantitySearchResult = ssLib.fullSearch(
    searchType,
    null,
    filters,
    columns
  )

  availableQuantitySearchResult.forEach(function (result) {
    availableQuantity = result['available']['value']
    availableQuantity = parseInt(availableQuantity, 10)
    id = result['item']['value']


    if (availableQuantity > 0) {
      itemsWithInventory.push(result.id)
    }
  })

  printVar(functionName, 'itemsWithInventory', itemsWithInventory)
  printVar(functionName, 'itemsWithInventory.length', itemsWithInventory.length)

  return itemsWithInventory
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

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  //   '/SuiteScripts/WMS/shared/ItemHelper',
  //   'N/file',
  '/SuiteScripts/LIB_Globals.js'
  //   'N/ui/serverWidget'
], function (
  search,
  record,
  ssLib,
  searchHelpers,
  //   itemHelper,
  //   file,
  globals
  //   sw
) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var purchaseorderSearchObj = search.create({
    type: 'purchaseorder',
    filters: [
      ['status', 'anyof', 'PurchOrd:D', 'PurchOrd:E', 'PurchOrd:B'],
      'AND',
      ['type', 'anyof', 'PurchOrd'],
      'AND',
      ['mainline', 'is', 'T'],
      //       'AND',
      //       ['class', 'anyof', '2'],
      //       'AND',
      //       ['custbody_gsvsite_ref', 'anyof', '@ALL@'],
      //       'AND',
      //       ['custbody_wipfli_vend_cat', 'anyof', '@ALL@'],
      'AND',
      ['vendor.internalidnumber', 'equalto', '2048848']
    ],
    columns: [
      search.createColumn({
        name: 'trandate',
        sort: search.Sort.ASC,
        label: 'Order Submission Date'
      }),
      search.createColumn({ name: 'tranid', label: 'PO' }),
      search.createColumn({ name: 'mainname', label: 'Name' }),
      search.createColumn({ name: 'custbody_gsvsite_ref', label: 'GSV Site' }),
      search.createColumn({
        name: 'custbody_requested_amount',
        label: 'PO Amount Exp'
      }),
      search.createColumn({
        name: 'custbody_bf_totalquantity2',
        label: 'Total Exp Items'
      }),
      search.createColumn({
        name: 'formulanumeric',
        formula: '{custbody_bf_totalquantity2}-{custbody_wms_total_received_2}',
        label: 'QTY Not Received '
      }),
      search.createColumn({
        name: 'custbody_wipfli_wms_notes',
        label: 'WMS Notes'
      }),
      search.createColumn({ name: 'lastmodifieddate', label: 'Last Modified' }),
      search.createColumn({
        name: 'custentity_vendor_open_orders',
        join: 'vendor',
        sort: search.Sort.ASC,
        label: 'Open Orders'
      })
    ]
  })
  var searchResultCount = purchaseorderSearchObj.runPaged().count
  console.log('purchaseorderSearchObj result count', searchResultCount)
  purchaseorderSearchObj.run().each(function (result) {
    // .run().each has a limit of 4,000 results
    return true
  })

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

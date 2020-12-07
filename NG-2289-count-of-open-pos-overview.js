ng2289 = {
  plan: ` 1. create field on Vendor record
            2. verify field can be accessed on "lookup" search
            3. program the vendor field to be updated on PO status change`,
  openOrderSearch: `
  var purchaseorderSearchObj = search.create({
  type: 'purchaseorder',
  filters: [
    ['status', 'anyof', 'PurchOrd:E', 'PurchOrd:D'],
    'AND',
    ['type', 'anyof', 'PurchOrd'],
    'AND',
    ['mainline', 'is', 'T'],
    'AND',
    ['class', 'anyof', '2'],
    'AND',
    ['custbody_gsvsite_ref', 'anyof', '@ALL@'],
    'AND',
    ['custbody_wipfli_vend_cat', 'anyof', '@ALL@']
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
log.debug('purchaseorderSearchObj result count', searchResultCount)
purchaseorderSearchObj.run().each(function (result) {
  // .run().each has a limit of 4,000 results
  return true
})
`
}

var vendorbillSearchObj = search.create({
  type: 'vendorbill',
  filters: [
    ['type', 'anyof', 'VendBill'],
    'AND',
    ['appliedtotransaction.type', 'anyof', 'PurchOrd'],
    'AND',
    ['appliedtotransaction.internalidnumber', 'equalto', '10995287']
  ],
  columns: [
    search.createColumn({
      name: 'internalid',
      sort: search.Sort.ASC
    })
  ]
})
var searchResultCount = vendorbillSearchObj.runPaged().count
log.debug('vendorbillSearchObj result count', searchResultCount)
vendorbillSearchObj.run().each(function (result) {
  // .run().each has a limit of 4,000 results
  return true
})

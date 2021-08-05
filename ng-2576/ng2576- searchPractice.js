require([
  'N/error',
  'N/record',
  'N/runtime',
  'N/search',
  'SuiteScripts/LIB_SearchHelpers'
], /**
 * @param {error} error
 * @param {record} record
 * @param {runtime} runtime
 * @param {search} search
 */ function (error, record, runtime, search, searchHelper) {
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

  var giftcertificateSearchObj = search.create({
    type: 'giftcertificate',
    filters: [
      ['amtavailbilled', 'greaterthan', '0.00'],
      'AND',
      ['amtavail', 'greaterthan', '0.00'],
      'AND',
      ['internalidnumber', 'lessthan', '12000']
    ],
    columns: [
      search.createColumn({
        name: 'giftcertcode',
        label: 'Gift Certificate Code'
      }),
      search.createColumn({ name: 'originalamount', label: 'Amount' }),
      search.createColumn({
        name: 'amountremaining',
        label: 'Amount Available'
      }),
      search.createColumn({
        name: 'sender',
        sort: search.Sort.ASC,
        label: 'From (Name)'
      }),
      search.createColumn({ name: 'createddate', label: 'Date Created' })
    ]
  })

  var giftCertsObj = searchHelper.getFormattedSearchResults(
    giftcertificateSearchObj
  )


})


// gift codes obj
var searchObj = {
    customerName: '',
    transactionType: '',
    
}
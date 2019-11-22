/**
 * SavedSearchLibrary.js
 *
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/search', 'N/format'], function (record, search, format) {
  /**
   *  More robust version of default 2.0 search, returns data in a user-friendly way
   * @param {*} type A search type enumeration in NS (i.e search.Type.CUSTOMER)
   * @param {*} searchId (optional)
   * @param {*} filters
   * @param {*} columns
   */
  function fullSearch (type, searchId, filters, columns) {
    var searchObj = getSearchObj(type, searchId, filters, columns)
    var formattedSerachResults = getFormattedSearchResults(searchObj)

    return formattedSerachResults

    function getSearchObj (type, searchId, filters, columns) {
      var searchObj = null
      // if no saved search create a new search
      if (searchId == null) {
        searchObj = search.create({
          type: type,
          columns: columns,
          filters: filters
        })
      } else {
        // load a pre existing search
        searchObj = search.load({
          type: type,
          id: searchId
        })
        columns = searchObj.columns
      }

      log.debug('searchObj:', searchObj)
      return searchObj
    }

    function getFormattedSearchResults (searchObj) {
      var totalResults = []

      // use paged search to handle more than 4000 results
      var pagedData = searchObj.runPaged()

      pagedData.pageRanges.forEach(function (pageRange) {
        // for each page of results
        var page = pagedData.fetch({
          index: pageRange.index
        })
        page.data.forEach(function (result) {
          var resultData = {
            id: result.id
          }
          columns.forEach(function (column) {
            // build getValue/getText object
            var getObj = {
              name: column.name
            }

            // if join exists, add to object
            if (column.join) {
              getObj.join = column.join
            }
            if (column.summary) {
              getObj.summary = column.summary
            }

            // Get data for both value and text
            var resultValue = result.getValue(getObj)
            var resultText = result.getText(getObj)

            // standardize boolean values;
            // oddly, NS will sometimes use string T and F for booleans
            // ("Thank you, NS..." * womp, womp *)

            if (resultValue === 'T') {
              resultValue = true
            } else if (resultValue === 'F') {
              resultValue = false
            }

            if (typeof resultValue === 'string' && resultValue.indexOf('more..') > -1) {
              resultValue = search.lookupFields({
                type: type,
                id: result.id,
                columns: [column.name]
              })[column.name]
            }
            resultData[column.name] = {
              value: resultValue,
              text: resultText
            }
          })
          totalResults.push(resultData)
        })
      })
      return totalResults
    }
  }

  // ACS | Transaction | SelectReceivingLine
  // customsearch1871
  var customsearch1871 = {
    type: 'purchaseorder',
    filters: [
      ['type', 'anyof', 'PurchOrd'],
      'AND',
      ['mainline', 'is', 'F'],
      'AND',
      ['item', 'noneof', '@NONE@']
    ],
    columns: [
      search.createColumn({ name: 'mainline', label: '*' }),
      search.createColumn({ name: 'tranid', label: 'Document Number' }),
      search.createColumn({ name: 'class', label: 'Class' }),
      search.createColumn({ name: 'item', label: 'Item' }),
      search.createColumn({ name: 'quantity', label: 'Quantity' }),
      search.createColumn({ name: 'amount', label: 'Amount' }),
      search.createColumn({
        name: 'lineuniquekey',
        sort: search.Sort.ASC,
        label: 'Line Unique Key'
      }),
      search.createColumn({ name: 'line', label: 'Line ID' }),
      search.createColumn({ name: 'linesequencenumber', label: 'Line Sequence Number' }),
      search.createColumn({ name: 'custcol_wms_exception', label: 'WMS Exception' }),
      search.createColumn({ name: 'custbody_wipfli_wms_notes', label: 'WMS Notes' }),
      search.createColumn({ name: 'rate', label: 'Item Rate' }),
      search.createColumn({
        name: 'quantityshiprecv',
        label: 'Quantity Fulfilled/Received'
      }),
      search.createColumn({ name: 'custcol_expectedqty', label: 'Expected Quantity' }),
      search.createColumn({ name: 'custcol_wms_hideinwms', label: 'Hide in WMS' }),
      search.createColumn({
        name: 'parent',
        join: 'item',
        label: 'Parent'
      }),
      search.createColumn({
        name: 'custitem_g2_category_ref',
        join: 'item',
        label: 'Category'
      }),
      search.createColumn({
        name: 'custitem_g2_itemtype_ref',
        join: 'item',
        label: 'Item Type'
      }),
      search.createColumn({
        name: 'itemid',
        join: 'item',
        label: 'Name'
      }),
      search.createColumn({
        name: 'class',
        join: 'item',
        label: 'Class'
      }),
      search.createColumn({
        name: 'custitem_g2_condition_ref',
        join: 'item',
        label: 'Condition'
      }),
      search.createColumn({ name: 'custcol_wms_recvnotes', label: 'Receiving Notes' })
    ]
  }

  return {
    fullSearch: fullSearch,
    customsearch1871: customsearch1871
  }
})

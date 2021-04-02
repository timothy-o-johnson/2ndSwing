require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js',
  'N/ui/serverWidget'
], function (
  search,
  record,
  ssLib,
  searchHelpers,
  itemHelper,
  file,
  globals,
  sw
) {
  var customerId = '2066705'
  const giftCardBalanceObj = getGiftCardBalance(customerId)

  log.debug(giftCardBalanceObj)

  function getGiftCardBalance (customerId) {
    var startTime = new Date()
    var transactionsWithGCs = getTransactionsWithGCs(customerId)
    var giftCertIds = getGiftCertIds(transactionsWithGCs)
    var giftCertificates = getGiftCertificates(giftCertIds)

    var giftCardBalanceObj = getGiftCardBalanceObj(giftCertificates)
    var finishTime = new Date()
    log.debug('total time:', (finishTime - startTime) / 1000)
    log.debug(giftCardBalanceObj)
    return giftCardBalanceObj

    function getGiftCardBalanceObj (giftCertificateSearchResults) {
      var totalRemaining = 0,
        totalInitial = 0

      giftCertificateSearchResults.forEach(function (giftCert) {
        totalInitial += parseFloat(giftCert.originalamount.value)
        totalRemaining += parseFloat(giftCert.amountremaining.value)
      })

      JSON.stringify(giftCertificateSearchResults)

      var giftCardBalanceObj = {
        totalInitial,
        totalRemaining
      }

      // log.debug(giftCardBalanceObj)

      return giftCardBalanceObj
    }

    function getGiftCertIds (transactionsWithGCs) {
      var giftCertIds = []
      var giftCertId
      var giftCertIdsObj = {}
      var giftCertIdsFiltered = []

      transactionsWithGCs.forEach(function (transaction) {
        var id = transaction.id
        var type =
          transaction.type.text === 'Sales Order' ? 'salesorder' : 'invoice'

        var transRec = record.load({
          type: type,
          id: id
        })

        var lineCount = transRec.getLineCount({
          sublistId: 'item'
        })

        for (var line = 0; line < lineCount; line++) {
          giftCertId = transRec.getSublistValue({
            sublistId: 'item',
            fieldId: 'giftcertkey',
            line: line
          })

          // sublistItemIsGiftCert = giftCertIds[itemId] ? true : false
          giftCertId && giftCertIds.push(giftCertId)

          if (giftCertId && !giftCertIdsObj[giftCertId]) {
            giftCertIdsObj[giftCertId] = true
            giftCertIdsFiltered.push(giftCertId)
          }
        }
      })

      log.debug(JSON.stringify(giftCertIds))
      log.debug('giftCertIds length initial:', giftCertIds.length)
      log.debug('giftCertIdsFiltered length:', giftCertIdsFiltered.length)

      return giftCertIdsFiltered
    }

    function getGiftCertificates (giftCertIds) {
      var giftcertificateSearchObj = getGiftCertificateSearchObj(giftCertIds)

      var giftCertificates = ssLib.getFormattedSearchResults(
        giftcertificateSearchObj
      )

      return giftCertificates

      function getGiftCertificateSearchObj (giftCertIds) {
        var filter = ['internalid', 'anyof', ...giftCertIds]

        var giftcertificateSearchObj = search.create({
          type: 'giftcertificate',
          filters: [filter],
          columns: [
            search.createColumn({ name: 'originalamount', label: 'Amount' }),
            search.createColumn({
              name: 'giftcertcode',
              label: 'Gift Certificate Code'
            }),
            search.createColumn({
              name: 'amountremaining',
              label: 'Amount Available'
            })
          ]
        })

        return giftcertificateSearchObj
      }
    }

    function getTransactionsWithGCs (customerId) {
      var transactionSearchObj = getTransactionsSearchObj(customerId)
      var transactionsWithGCs = ssLib.getFormattedSearchResults(
        transactionSearchObj
      )

      log.debug(
        'initial transactionsWithGCs length:',
        transactionsWithGCs.length
      )
      var transactionObj = {}
      var transactionsWithGCsFiltered = []

      transactionsWithGCs.forEach(function (transaction) {
        id = transaction.id
        if (!transactionObj[id]) {
          transactionObj[id] = true
          transactionsWithGCsFiltered.push(transaction)
        } else {
          log.debug('duplicate transaction:', id)
        }
      })
      log.debug(
        'FINAL transactionsWithGCsFiltered length:',
        transactionsWithGCsFiltered.length
      )

      return transactionsWithGCs

      function getTransactionsSearchObj (customerId) {
        var transactionSearchObj = search.create({
          type: 'transaction',
          filters: [
            ['name', 'anyof', customerId],
            'AND',
            [
              ['item.internalidnumber', 'equalto', '1217846'],
              'OR',
              ['item.internalidnumber', 'equalto', '1217847']
            ],
            'AND',
            'NOT',
            ['type', 'anyof', 'Journal']
          ],
          columns: [search.createColumn({ name: 'type', label: 'Type' })]
        })

        return transactionSearchObj
      }
    }
  }
})

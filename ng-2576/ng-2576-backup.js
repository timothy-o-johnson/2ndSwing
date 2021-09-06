require([
  'N/cache',
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js',
  'N/ui/serverWidget'
], function (
  cache,
  search,
  record,
  ssLib,
  searchHelper,
  itemHelper,
  file,
  globals,
  sw
) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW
  //


  var customerStoreCreditObj = {
    customerId: 162485,
    certificate: {
      amountremaining: 10,
      type: 'type',
      id: 'id1234',
      originalamount: 100,
      giftcertcode: '9wapkmlTs'
    }
  }

  var options

  log.debug('reduce(): customerStoreCreditObj', customerStoreCreditObj)

  var newCustomerStoreCreditId = upsertCustomerStoreCreditRec(
    customerStoreCreditObj,
    options
  )

  function upsertCustomerStoreCreditRec (customerStoreCreditObj, options) {
    var id,
      objRecord,
      cert = customerStoreCreditObj.certificate,
      customerId = customerStoreCreditObj.customerId,
      value

    var custStoreCredId = getCustStoreCredId(cert, options)
    var values = {
      custrecord_amount_remaining: cert.amountremaining,
      custrecord_cert_type: cert.type,
      custrecord_customer_id: customerId,
      custrecord_gift_cert_id: cert.id,
      custrecord_original_amount: cert.originalamount,
      custrecord_store_credit_cert_code: cert.giftcertcode,
      // custrecord_history: 'some history',
      custrecord_transaction_date: new Date(),
      custrecord_gift_cert_rec_link:
        'https://debugger.na0.netsuite.com/app/accounting/transactions/giftcertificaterecord.nl?id=' +
        customerStoreCreditObj.id
    }

    if (custStoreCredId) {
      //load customerCredit record and update
      id = record.submitFields({
        type: 'customrecord_customer_store_credit',
        id: custStoreCredId,
        values: values,
        options: {
          enableSourcing: false,
          ignoreMandatoryFields: true
        }
      })
    } else {
      // create customerCredit record and update
      objRecord = record.create({
        type: 'customrecord_customer_store_credit'
      })

      var valuesFieldNames = Object.keys(values)

      valuesFieldNames.forEach(function (field) {
        value = values[field]

        log.debug('field', field)

        try {
          objRecord.setValue({
            fieldId: field,
            value: value,
            ignoreFieldChange: true
          })
        } catch (error) {
          log.debug('error', error)
        }
      })

      log.debug('objRecord.save()', objRecord.save())
    }

    log.debug('id', id)
    log.debug('objRecord', objRecord)

    return {
      id: id,
      objRecord: objRecord,
      custStoreCredId: custStoreCredId,
      record: record
    }

    function getCustStoreCredId (giftCertObj, options) {
      var custStoreCredId

      if (options && options.isTesting) {
        custStoreCredId = options.custStoreCredId
        return custStoreCredId
      }

      var custStoreCreditSearchObj = search.create({
        type: 'customrecord_customer_store_credit',
        filters: [
          [
            'custrecord_store_credit_cert_code',
            'startswith',
            giftCertObj.giftcertcode
          ]
        ],
        columns: ['custrecord_gift_cert_id']
      })

      var searchResults = searchHelper.getFormattedSearchResults(
        custStoreCreditSearchObj
      )

      custStoreCredId = searchResults[0] ? searchResults[0].id : null
      return custStoreCredId
    }
  }
})

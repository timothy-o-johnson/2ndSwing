const certificateRecObj = {
  id: '59749',
  type: 'giftcertificate',
  isDynamic: false,
  fields: {
    createddate: '1/27/2021 1:16 pm',
    lastmodifieddate: '1/27/2021 1:16 pm',
    entryformquerystring: 'e=T&id=59749',
    amountremaining: '16.20',
    _csrf:
      'Lt6Rnj4CogcLR02gR-QnS7Ewy53pMmTZpyGZxcICIksVPy8YfmmNvWfAHi5nI9i6q7wDl9ubT-wnWCP_Ol5objER3rf5-PnRUHd87ZR6ON74pueKHbtdBlIv51BoBhItnwSUhiWJ1if6o_Eht-XPPzzh_bVFxdJ60_U75yJM5I0=',
    _eml_nkey_: '4537321_SB1~1322963~1033~N',
    type: 'giftcertificaterecord',
    giftcertcode: 'MUAZZJ50B',
    nsapiCT: '1631113632084',
    internalid: '59475',
    originalamount: '16.20',
    sys_id: '4806194669813525',
    custitemnumber_magento_gcno: 'TJXFW9SQPSEAZNML',
    sender: 'NS-2063188',
    name: 'Bruce Wayne',
    currency: '1',
    id: '59749',
    email: 'tyler@2ndswing.com'
  }
}

customerId = undefined

createCustomerStoreCreditObj(customerId, certificateRecObj)

function createCustomerStoreCreditObj (customerId, certificateRecObj) {
  let customerStoreCreditObj = {
    customerId: customerId,
    certificate: {
      amountremaining: { value: null, text: null },
      item: { value: null, text: null },
      id: { value: null, text: null },
      originalamount: { value: null, text: null },
      giftcertcode: { value: null, text: null }
    }
  }

  customerStoreCreditObj = populateCertificateValues(
    customerStoreCreditObj,
    certificateRecObj
  )

  customerStoreCreditObj /*?*/

  return customerStoreCreditObj

  function populateCertificateValues (
    customerStoreCreditObj,
    certificateRecObj
  ) {
    customStoreCreditObjFieldKeys = Object.keys(
      customerStoreCreditObj.certificate
    )

    customStoreCreditObjFieldKeys.forEach(key => {
      customerStoreCreditObj.certificate[key].value =
        certificateRecObj.fields[key]
    })

    return customerStoreCreditObj
  }
}

const results = [
  {
    id: '10667318',
    entity: { value: '2063188', text: 'NS-989630 Bruce Wayne' }
  }
]

error = {
  type: 'error.SuiteScriptError',
  name: 'INVALID_FLD_VALUE',
  message:
    'You have entered an Invalid Field Value {text=null, value=59757} for the following field: custrecord_gift_cert_id',
  stack: [
    'Error
    at suitescript/resources/javascript/record/recordImpl.js:156:24
    at Object.submitFields (suitescript/resources/javascript/record/recordImpl.js:154:36)
    at Object.upsertCustomerStoreCreditRec (/SuiteScripts/CustomerStoreCredit-MapReduce.js:222:31)
    at Object.afterSubmit (/SuiteScripts/GiftCertificate-UserEvent.js:32:78)'
  ],
  cause: {
    type: 'internal error',
    code: 'INVALID_FLD_VALUE',
    details:
      'You have entered an Invalid Field Value {text=null, value=59757} for the following field: custrecord_gift_cert_id',
    userEvent: null,
    stackTrace: [
      'Error
    at suitescript/resources/javascript/record/recordImpl.js:156:24
    at Object.submitFields (suitescript/resources/javascript/record/recordImpl.js:154:36)
    at Object.upsertCustomerStoreCreditRec (/SuiteScripts/CustomerStoreCredit-MapReduce.js:222:31)
    at Object.afterSubmit (/SuiteScripts/GiftCertificate-UserEvent.js:32:78)'
    ],
    notifyOff: false
  },
  id: '',
  notifyOff: false,
  userFacing: true
}

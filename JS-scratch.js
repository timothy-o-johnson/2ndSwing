const giftCertObj = {
  id: '60367',
  type: 'giftcertificate',
  isDynamic: false,
  fields: {
    createddate: '8/9/2021 8:15 am',
    lastmodifieddate: '8/9/2021 8:15 am',
    // entryformquerystring: 'e=T&id=60367',
    amountremaining: '99.99',
    // _eml_nkey_: '4537321_SB1~-4~3~N',
    // message: 'mag-M000001191',
    type: 'giftcertificaterecord',
    giftcertcode: 'fyFutLdGY',
    // nsapiCT: '1630100460164',
    internalid: '60091',
    originalamount: '99.99',
    // sys_id: '254941342061845',
    custitemnumber_magento_gcno: 'AXSJV6GPIWVYDQCF',
    sender: '2nd Swing',
    name: 'Darren Reimer',
    currency: '1',
    id: '60367',
    email: 'giftcardarchive@2ndswing.info'
  }
}

var giftcertificateSearchObj = search.create({
  type: 'giftcertificate',
  filters: [['gccode', 'startswith', '3gtjv4wuq']],
  columns: [
    search.createColumn({
      name: 'sender',
      sort: search.Sort.ASC
    }),
    'name',
    'email',
    'message',
    'expirationdate',
    'originalamount',
    'incomeacct',
    'liabilityacct',
    'giftcertcode',
    'item',
    'amountremaining',
    'amtavailbilled',
    'purchasedate',
    'gcactive'
  ]
})
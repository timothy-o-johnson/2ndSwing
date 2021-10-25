rec = {
  id: '60442',
  type: 'giftcertificate',
  isDynamic: false,
  fields: {
    _eml_nkey_: '4537321_SB1~-4~31~N',
    amountremaining: '27.00',
    createddate: '10/15/2021 11:51 am',
    currency: '1',
    custitemnumber_magento_gcno: 'EVHBUTK6FD3OBKUA',
    email: 'giftcardarchive@2ndswing.info',
    entryformquerystring: 'e=T&id=60442',
    giftcertcode: 'nEwn4pcfB',
    id: '60442',
    internalid: '60166',
    lastmodifieddate: '10/15/2021 11:51 am',
    message: 'mag-M000001491',
    name: 'Tim Johnson',
    nsapiCT: '1634323866171',
    originalamount: '27.00',
    sender: '2nd Swing',
    sys_id: '2014674356949704',
    type: 'giftcertificaterecord'
  }
}

giftCardDetail = {
  active: true,
  balance: '14.00',
  billed: '14.00',
  code: '6ERO6Fxft',
  cpCode: '',
  cpCustomerId: null,
  createdDate: '10/15/2021 10:54 am',
  expires: '',
  from: '2nd Swing',
  internalId: '60437',
  lastUpdated: null,
  magentoCode: 'KGKTHXULTUVDKERK',
  message: 'mag-M000001486',
  to: 'Tim Johnson',
  toEmail: 'giftcardarchive@2ndswing.info',
  type: 'Store Credit Tax-Adj Gift Certificate'
}

function createGCRecord (result) {
  var isGiftCardRec = rec.type === record.Type.GIFT_CERTIFICATE
  if (result.length == 0 && isGiftCardRec) {
    const giftCardDetailObj = {
      active: true, // just created
      balance: rec.amountremaining,
      billed: rec.originalamount,
      code: rec.giftcertcode,
      cpCode: '', // not provided
      cpCustomerId: null,
      createdDate: rec.createddate,
      expires: '', //not provided
      from: rec.sender,
      internalId: rec.internalid,
      lastUpdated: rec.lastmodifieddate,
      magentoCode: rec.custitemnumber_magento_gcno,
      message: rec.message,
      to: rec.name,
      toEmail: rec.email
      // type: 'Store Credit Tax-Adj Gift Certificate'
    }

    return [giftCardDetailObj]
  } else {
    result
  }
}

args = {
  '0': 'netsuite',
  '1': 'giftcertificate.edit.60447',
  '2': {
    record: {
      id: '60447',
      type: 'giftcertificate',
      isDynamic: false,
      fields: {
        createddate: '10/15/2021 12:54 pm',
        lastmodifieddate: '10/15/2021 12:54 pm',
        entryformquerystring: 'e=T&id=60447',
        amountremaining: '10.35',
        _eml_nkey_: '4537321_SB1~-4~31~N',
        message: 'mag-M000001496',
        type: 'giftcertificaterecord',
        giftcertcode: 'kxzPVvPqp',
        nsapiCT: '1634327654212',
        internalid: '60171',
        originalamount: '10.35',
        sys_id: '2018462397218154',
        custitemnumber_magento_gcno: 'QKKB1XTIXSFKSJJJ',
        sender: '2nd Swing',
        name: 'Tim Johnson',
        currency: '1',
        id: '60447',
        email: 'giftcardarchive@2ndswing.info'
      }
    },
    associatedRecords: {
      parentItem: null,
      distinctLocations: [],
      relatedOrder: null,
      addresses: [],
      giftCardDetails: [
        {
          active: true,
          cpCode: '',
          cpCustomerId: null,
          expires: '',
          type: 'Store Credit Tax-Adj Gift Certificate'
        }
      ],
      giftCardInvoiceCustomerDetails: {
        recordType: 'invoice',
        id: '11028827',
        values: {
          custbody_ava_customerentityid: 'NS-990163',
          'customerMain.externalid': [
            {
              value:
                'SecondSwing:Customer:f5a58856-edca-4285-9dfd-25a606e6c5ac',
              text: 'SecondSwing:Customer:f5a58856-edca-4285-9dfd-25a606e6c5ac'
            }
          ],
          'customerMain.internalid': [{ value: '2106272', text: '2106272' }]
        }
      }
    },
    __headers: {
      RecordId: '60447',
      RecordType: 'giftcertificate',
      EventType: 'edit',
      UserDepartment: '0',
      UserEmail: 'onlineformuser@4537321-sb1.com',
      UserId: '-4',
      UserLocation: '0',
      UserName: '-System-',
      UserRole: '31',
      UserRoleCenter: 'CUSTOMER',
      UserRoleId: 'online_form_user',
      UserSubsidiary: '1',
      ScriptDeploymentId: 'customdeploy_tobus_gift_certificate',
      ScriptId: 'customscript_publishtobus',
      'origin-time': 1634327654
    }
  },
  '3': true,
  '4': 5
}
tempRec = {
  id: '60447',
  type: 'giftcertificate',
  isDynamic: false,
  fields: {
    createddate: '10/15/2021 12:54 pm',
    lastmodifieddate: '10/15/2021 12:54 pm',
    entryformquerystring: 'e=T&id=60447',
    amountremaining: '10.35',
    _eml_nkey_: '4537321_SB1~-4~31~N',
    message: 'mag-M000001496',
    type: 'giftcertificaterecord',
    giftcertcode: 'kxzPVvPqp',
    nsapiCT: '1634327654212',
    internalid: '60171',
    originalamount: '10.35',
    sys_id: '2018462397218154',
    custitemnumber_magento_gcno: 'QKKB1XTIXSFKSJJJ',
    sender: '2nd Swing',
    name: 'Tim Johnson',
    currency: '1',
    id: '60447',
    email: 'giftcardarchive@2ndswing.info'
  }
}

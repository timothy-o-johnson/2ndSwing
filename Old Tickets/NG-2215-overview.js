var ng2215 = {
  repItem: ['G30 NEW FWG : D-T209438686'],
  itemsCreated: ['D - T209431364', 'D - T209431365', 'D - T209431366'],
  skusToCreate: [
    { sku: 'sku1', skuQuantity: 1, isApparel: false },
    { sku: 'sku2', skuQuantity: 1, isApparel: false },
    { sku: 'sku3', skuQuantity: 1, isApparel: false }
  ]
}

var error = {
  type: 'error.SuiteScriptError',
  name: 'USER_ERROR',
  message: 'Quantity can not have more than 5 decimal places.',
  stack: [
    'anonymous(N/serverRecordService)',
    'addItemToTransaction(/SuiteScripts/WMS/shared/ItemHelper.js:1327)',
    'saveReplItemToPO(/SuiteScripts/WMS/Receiving/EditLine.js:854)',
    'addOrUpdateReplOnPO(/SuiteScripts/WMS/Receiving/EditLine.js:391)',
    'onRequest(/SuiteScripts/WMS/Receiving/EditLine.js:329)'
  ],
  cause: {
    type: 'internal error',
    code: 'USER_ERROR',
    details: 'Quantity can not have more than 5 decimal places.',
    userEvent: null,
    stackTrace: [
      'anonymous(N/serverRecordService)',
      'addItemToTransaction(/SuiteScripts/WMS/shared/ItemHelper.js:1327)',
      'saveReplItemToPO(/SuiteScripts/WMS/Receiving/EditLine.js:854)',
      'addOrUpdateReplOnPO(/SuiteScripts/WMS/Receiving/EditLine.js:391)',
      'onRequest(/SuiteScripts/WMS/Receiving/EditLine.js:329)'
    ],
    notifyOff: false
  },
  id: '',
  notifyOff: false,
  userFacing: false
}

var mrParams = {
  custpage_fielddata_has_changed: 'F',
  nlloc: '4',
  nlsub: '1',
  custpage_receiving_notes_has_launched: 'F',
  custpage_receiving_notes_object:
    '{"itemId":"37383","lineuniquekey":"31033354","receivingNotes":"","recordType":"purchaseorder","tranId":"10484353"}',
  _button: '',
  nsapiFC: '',
  custpage_attr_field_custitem_g2_club_length_ref: '',
  custpage_fields_that_have_changed:
    '{"custpage_quantity_received":{"label":"Quantity Received","value":3}}',
  wfVF: '',
  nlapiVF: '',
  nlapiRC: '',
  externalid: '',
  _eml_nkey_: '0',
  nlapiVI: '',
  custpage_receiving_notes: '',
  custpage_repitem_sku: '',
  type: 'suitescriptform',
  nlapiVD: '',
  deploy: '1',
  nsapiRC: '',
  customwhence: '',
  nsapiVF: '',
  nsapiVD: '',
  nlapiVL: '',
  nsbrowserenv: 'istop=T',
  custpage_attr_field_custitem_g2_freenotes: '',
  custpage_attr_fields:
    '["custpage_attr_field_custitem_g2_club_length_ref","custpage_attr_field_custitem_g2_club_loft_ref","custpage_attr_field_custitem_g2_club_shaftmatl_ref","custpage_attr_field_custitem_g2_freenotes","custpage_attr_field_custitem_g2_rareunique","custpage_attr_field_custitem_g2_shaft_otherinfo","custpage_attr_field_custitem_g2_subcategory_ref","custpage_attr_field_custitem_g2_tourissue","custpage_attr_field_custitem_g2_dexterity_ref","custpage_attr_field_custitem_g2_shaft_type_ref","custpage_attr_field_custitem_g2_shaft_flex_ref"]',
  id: '',
  nsapiVL: '',
  nlapiFC: '',
  nsapiVI: '',
  custpage_repitemname: 'G30 NEW FWG : D-T209439897',
  wfPS: '',
  custpage_isapparelitem: 'F',
  entryformquerystring:
    'script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10484353:inventoryitem:37383:31033354&custpage_repitem=9439897&custpage_multipleskus=T&custpage_is_junk_sku=F',
  custpage_quantity_expected: '10',
  custpage_fielddata_object: '',
  script: '39',
  custpage_psku: 'G30 NEW FWG',
  custpage_psku_send: 'G30 NEW FWG',
  custpage_location: '4',
  submitted: 'T',
  custpage_attr_field_custitem_g2_subcategory_ref: '',
  _multibtnstate_: '',
  custpage_field_changed: 'F',
  custpage_attr_field_custitem_g2_club_loft_ref: '',
  custpage_attr_field_custitem_g2_dexterity_ref: '',
  custpage_repitem: '9439897',
  selectedtab: '',
  wfPI: '',
  nlapiSR: '',
  custpage_cachekey: 'purchaseorder:10484353:inventoryitem:37383:31033354',
  custpage_attr_field_attribute_obj:
    '{"custitem_g2_club_length_ref":{"label":"Club Length","value":""},"custitem_g2_club_loft_ref":{"label":"Club Loft","value":""},"custitem_g2_club_shaftmatl_ref":{"label":"Club ShaftMatl","value":""},"custitem_g2_freenotes":{"label":"FreeNotes","value":""},"custitem_g2_rareunique":{"label":"Rare Unique","value":false},"custitem_g2_shaft_otherinfo":{"label":"ShaftOtherInfo","value":""},"custitem_g2_subcategory_ref":{"label":"Sub Category","value":""},"custitem_g2_tourissue":{"label":"Tour Issue","value":false},"custitem_g2_dexterity_ref":{"label":"Dexterity","value":""},"custitem_g2_shaft_type_ref":{"label":"Shaft Type","value":""},"custitem_g2_shaft_flex_ref":{"label":"Shaft Flex","value":""}}',
  submitter: 'Save',
  wfinstances: '',
  custpage_attr_field_custitem_g2_rareunique: 'F',
  custpage_cancel_line: 'F',
  custpage_cancel_line_send: 'F',
  nsapiLI: '',
  custpage_attributionurl:
    '/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10484353:inventoryitem:37383:31033354&custpage_repitem=9439897',
  nsapiPS: '',
  custpage_multipleskus: 'T',
  nsapiCT: '1603762419977',
  nlapiPI: '',
  custpage_attr_field_custitem_g2_shaft_otherinfo: '',
  nluser: '1322963',
  custpage_notes: '',
  nldept: '0',
  nsapiPI: '',
  clickedback: '',
  wfSR: '',
  nsapiLC: '',
  nlapiPS: '',
  nlapiLI: '',
  nsapiPD: '',
  nsapiSR: '',
  whence:
    '/app/site/hosting/scriptlet.nl?script=44&deploy=1&compid=4537321_SB1&custpage_source=opportunity&custpage_trantype=purchaseorder&custpage_tranid=10484353&custpage_itemtype=3&custpage_category=6&custpage_parent=37383&custpage_cachekey=purchaseorder:10484353:inventoryitem:37383:31033354',
  custpage_gsv_guid: '9d459feb-98e3-43b5-bdd1-0a6eb41db08b',
  nlrole: '3',
  custpage_quantity_expected_send: '10',
  _csrf:
    'U-3ZQUWrbfhcKwwpaBysFbuTbHu4KD13HGDIzWvEfkgA-vN4Q8JQnHVrTe6S9RfmmX5eriwhzwvBIg1D0L5AiOZQNhaMxmuSrh3FE44yI3ipXMmngrLU42Gu0xw6GVyI0SLP6vqZYQrMNUeoSxuS0pbn9On8dAvWTm9mJTAOgD0=',
  custpage_quantity_received: '3',
  custpage_attr_field_custitem_g2_club_shaftmatl_ref: '',
  formdisplayview: 'DETAIL_VIEW',
  custpage_attr_field_custitem_g2_shaft_type_ref: '',
  custpage_attr_field_custitem_g2_shaft_flex_ref: '',
  custpage_attr_field_custitem_g2_tourissue: 'F',
  custpage_quantity_received_formattedValue: '3',
  wfFC: '',
  custpage_attr_field_orig_attribute_obj:
    '{"custitem_g2_club_length_ref":{"label":"Club Length","value":""},"custitem_g2_club_loft_ref":{"label":"Club Loft","value":""},"custitem_g2_club_shaftmatl_ref":{"label":"Club ShaftMatl","value":""},"custitem_g2_freenotes":{"label":"FreeNotes","value":""},"custitem_g2_rareunique":{"label":"Rare Unique","value":false},"custitem_g2_shaft_otherinfo":{"label":"ShaftOtherInfo","value":""},"custitem_g2_subcategory_ref":{"label":"Sub Category","value":""},"custitem_g2_tourissue":{"label":"Tour Issue","value":false},"custitem_g2_dexterity_ref":{"label":"Dexterity","value":""},"custitem_g2_shaft_type_ref":{"label":"Shaft Type","value":""},"custitem_g2_shaft_flex_ref":{"label":"Shaft Flex","value":""}}'
}

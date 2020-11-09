var params = {
  custpage_total_quantity_check_formattedValue: '4',
  sku2: '1',
  sku1: '1',
  custpage_fielddata_has_changed: 'T',
  nlloc: '4',
  nlsub: '1',
  _button: '',
  custpage_attr_field_custitem_g2_top_style_ref: '',
  nsapiFC: '',
  sku0: '2',
  wfVF: '',
  nlapiVF: '',
  nlapiRC: '',
  custpage_attr_field_custitem_g2_top_size_ref: '',
  externalid: '',
  _eml_nkey_: '0',
  nlapiVI: '',
  type: 'suitescriptform',
  nlapiVD: '',
  deploy: '1',
  nsapiRC: '',
  customwhence: '',
  nsapiVF: '',
  custpage_total_quantity_check: '20',
  nsapiVD: '',
  nlapiVL: '',
  nsbrowserenv: 'istop=T',
  custpage_attr_field_custitem_g2_freenotes: '',
  custpage_attr_fields: [
    'custpage_attr_field_custitem_g2_freenotes',
    'custpage_attr_field_custitem_g2_styleno',
    'custpage_attr_field_custitem_g2_top_color_ref',
    'custpage_attr_field_custitem_g2_top_gender_ref',
    'custpage_attr_field_custitem_g2_top_pattern_ref',
    'custpage_attr_field_custitem_g2_top_size_ref',
    'custpage_attr_field_custitem_g2_top_style_ref'
  ],
  id: '',
  nsapiVL: '',
  nlapiFC: '',
  nsapiVI: '',
  custpage_repitemname: 'PUMA W SLS : D-4203017610',
  custpage_attr_field_custitem_g2_top_gender_ref: '',
  wfPS: '',
  custpage_isapparelitem: 'T',
  entryformquerystring:
    'script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:3521497:inventoryitem:3017610:10415382&custpage_repitem=3017610&custpage_multipleskus=T&custpage_isapparelitem=T',
  custpage_quantity_expected: '20',
  custpage_fielddata_object: [
    'custcol_g2_condition_ref:custpage_eia_fielddata_430:'
  ],
  script: '39',
  custpage_psku: 'PUMA W SLS',
  custpage_psku_send: 'PUMA W SLS',
  custpage_location: '4',
  submitted: 'T',
  _multibtnstate_: '',
  custpage_repitem: '3017610',
  selectedtab: '',
  wfPI: '',
  nlapiSR: '',
  custpage_bidprice: '5.39',
  custpage_cachekey: 'purchaseorder:3521497:inventoryitem:3017610:10415382',
  custpage_attr_field_attribute_obj: {
    custitem_g2_freenotes: { label: 'FreeNotes', value: '' },
    custitem_g2_styleno: { label: 'Style Number', value: '' },
    custitem_g2_top_color_ref: { label: 'Top Color', value: '' },
    custitem_g2_top_gender_ref: { label: 'Top Gender', value: '' },
    custitem_g2_top_pattern_ref: { label: 'Top Pattern', value: '' },
    custitem_g2_top_size_ref: { label: 'Top Size', value: '' },
    custitem_g2_top_style_ref: { label: 'Top Style', value: '' }
  },
  submitter: 'Save',
  wfinstances: '',
  custpage_cancel_line: 'F',
  custpage_cancel_line_send: 'F',
  nsapiLI: '',
  custpage_attributionurl:
    '/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:3521497:inventoryitem:3017610:10415382&custpage_repitem=3017610',
  custpage_number_of_skus: '3',
  nsapiPS: '',
  custpage_multipleskus: 'T',
  nsapiCT: '1588601025451',
  nlapiPI: '',
  nluser: '1269484',
  custpage_notes: 'Receiving: 4; SKU: 3; [2, 1, 1]',
  nldept: '0',
  custpage_number_of_skus_formattedValue: '3',
  nsapiPI: '',
  clickedback: '',
  wfSR: '',
  nsapiLC: '',
  nlapiPS: '',
  nlapiLI: '',
  nsapiPD: '',
  custpage_attr_field_custitem_g2_styleno: '',
  nsapiSR: '',
  custpage_attr_field_custitem_g2_top_pattern_ref: '',
  whence: '',
  custpage_gsv_guid: '',
  nlrole: '3',
  custpage_quantity_expected_send: '20',
  _csrf:
    'MdtCh_OhidrZfmIBWZmwxXiiLR4qGJj1fVF9EUAMXC5CKY75iE3LrxNk02cdJjsSbosfzYm8Wi-ipqxkPANVv-BgWkzWj7CjMKXwXp6pgks0q3E8HojaoonDnzWpDHPAAAd-8drOt3MB6wO46Fs8FTIytkeaOO5XU6EWC2II39Y=',
  custpage_quantity_received: '4',
  formdisplayview: 'DETAIL_VIEW',
  inpt_custpage_eia_fielddata_430: ' ',
  custpage_eia_fielddata_430: '',
  custpage_quantity_received_formattedValue: '4',
  wfFC: '',
  custpage_attr_field_orig_attribute_obj: {
    custitem_g2_freenotes: { label: 'FreeNotes', value: '' },
    custitem_g2_styleno: { label: 'Style Number', value: '' },
    custitem_g2_top_color_ref: { label: 'Top Color', value: '' },
    custitem_g2_top_gender_ref: { label: 'Top Gender', value: '' },
    custitem_g2_top_pattern_ref: { label: 'Top Pattern', value: '' },
    custitem_g2_top_size_ref: { label: 'Top Size', value: '' },
    custitem_g2_top_style_ref: { label: 'Top Style', value: '' }
  },
  custpage_attr_field_custitem_g2_top_color_ref: ''
}

console.log(getArrayOfSkuQuantities(params))

function getArrayOfSkuQuantities (params) {
  var skuQuantities = []
  var totalSkus = params['custpage_number_of_skus']

  var regex = RegExp(`^sku[0-${totalSkus}]`)
  totalSkus = totalSkus - 1

  Object.keys(params).forEach(param => {
    if (regex.test(param)) {
      skuQuantities.push(params[param])
    }
  })
  return skuQuantities
}

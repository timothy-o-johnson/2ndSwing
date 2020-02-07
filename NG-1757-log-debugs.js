// following are fields and their field meta data
var onlineTitleField = {
  id: '461',
  custrecord_fmd_field: { id: '131', text: 'Online Title' },
  custrecord_fmd_fieldscriptid: { id: 'custitem_g2_onlinetitle', text: null },
  custrecord_fmd_listrecscriptid: { id: '', text: null },
  custrecord_fmd_column: { id: '', text: '' },
  custrecord_fmd_columnscriptid: { id: '', text: null },
  custrecord_fmd_fieldtype: { id: 'text', text: null },
  custrecord_fmd_readonly: { id: false, text: null },
  custrecord_fmd_bidpriceattribute: { id: false, text: null },
  custrecord_fmd_sellpriceattribute: { id: false, text: null },
  custrecord_fmd_po_column_id: { id: '', text: '' },
  custrecord_fmd_po_col_scriptid: { id: '', text: null },
  custrecord_fmd_price_field: { id: false, text: null },
  custrecord_fmd_listrec: { id: '', text: '' },
  value:
    'Titleist Scotty Cameron Oil Can Coronado 2 Putter Putter Steel Right Handed 35.0in'
}

var freeNotesField = {
  id: '436',
  custrecord_fmd_field: { id: '117', text: 'FreeNotes' },
  custrecord_fmd_fieldscriptid: { id: 'custitem_g2_freenotes', text: null },
  custrecord_fmd_listrecscriptid: { id: '', text: null },
  custrecord_fmd_column: { id: '', text: '' },
  custrecord_fmd_columnscriptid: { id: '', text: null },
  custrecord_fmd_fieldtype: { id: 'text', text: null },
  custrecord_fmd_readonly: { id: false, text: null },
  custrecord_fmd_bidpriceattribute: { id: false, text: null },
  custrecord_fmd_sellpriceattribute: { id: false, text: null },
  custrecord_fmd_po_column_id: { id: '', text: '' },
  custrecord_fmd_po_col_scriptid: { id: '', text: null },
  custrecord_fmd_price_field: { id: false, text: null },
  custrecord_fmd_listrec: { id: '', text: '' },
  value:
    'Club has recently been refinished.\r\nFace: Light wear.\r\nSole: Light scratches.\r\nTop Line: Light wear.\r\nStock Grip: Average condition, normal wear.'
}

var ebayTitleField = {
  id: '433',
  custrecord_fmd_field: { id: '115', text: 'Ebay Title' },
  custrecord_fmd_fieldscriptid: { id: 'custitem_g2_ebaytitle', text: null },
  custrecord_fmd_listrecscriptid: { id: '', text: null },
  custrecord_fmd_column: { id: '', text: '' },
  custrecord_fmd_columnscriptid: { id: '', text: null },
  custrecord_fmd_fieldtype: { id: 'text', text: null },
  custrecord_fmd_readonly: { id: false, text: null },
  custrecord_fmd_bidpriceattribute: { id: false, text: null },
  custrecord_fmd_sellpriceattribute: { id: false, text: null },
  custrecord_fmd_po_column_id: { id: '', text: '' },
  custrecord_fmd_po_col_scriptid: { id: '', text: null },
  custrecord_fmd_price_field: { id: false, text: null },
  custrecord_fmd_listrec: { id: '', text: '' },
  value:
    'Titleist Scotty Cameron Oil Can Coronado 2 Putter Putter Steel Right Handed 35'
}

// fromClientScript
var allFieldsAndValues = {
  custpage_eia_fielddata_430: '7',
  custpage_eia_fielddata_433:
    'Brand New 10.0 Womens Nike Golf Polo Large L Magenta 831267 MSRP $70',
  custpage_eia_fielddata_436:
    'New with tags.\n87% polyester, 13% spandex.\nMachine wash cold; tumble dry low.',
  custpage_eia_fielddata_448: false,
  custpage_eia_fielddata_450: false,
  custpage_eia_fielddata_461:
    'Brand New 10.0 Womens Nike Golf Polo Large L Magenta 831267 MSRP $70',
  custpage_eia_fielddata_463: '86',
  custpage_eia_fielddata_464: '85',
  custpage_eia_fielddata_465: '11224',
  custpage_eia_fielddata_467: '',
  custpage_eia_fielddata_468: '',
  custpage_eia_fielddata_469: '',
  custpage_eia_fielddata_470: '',
  custpage_eia_fielddata_490: '831267',
  custpage_eia_fielddata_495: '304',
  custpage_eia_fielddata_496: '2',
  custpage_eia_fielddata_498: '',
  custpage_eia_fielddata_499: '1',
  custpage_eia_fielddata_500: '115',
  custpage_eia_fielddata_805: '091205069268',
  custpage_msrp: 69.99
}

// from UE script ?
var categoryID = {
  custrecord_wms_onlinetitletemplate:
    '{"title":[{"source":"custitem_g2_condition_ref","prefix":"","suffix":" "},{"source":"custitem_g2_top_gender_ref","prefix":"","suffix":" "},{"source":"custitem_wms_parentitembrand","prefix":"","suffix":" "},{"source":"custitem_g2_top_style_ref","prefix":"","suffix":" "},{"source":"custitem_g2_top_size_ref","prefix":"","suffix":" "},{"source":"custitem_g2_top_color_ref","prefix":"","suffix":" "},{"source":"custitem_msrp_copy","prefix":"MSRP $","suffix":" "},{"source":"custitem_g2_styleno","prefix":"","suffix":" "}]}',
  custrecord_wms_ebaytitletemplate: {
    title: [
      { source: 'custitem_g2_condition_ref', prefix: '', suffix: ' ' },
      { source: 'custitem_g2_top_gender_ref', prefix: '', suffix: ' ' },
      { source: 'custitem_wms_parentitembrand', prefix: '', suffix: ' ' },
      { source: 'custitem_g2_top_style_ref', prefix: '', suffix: ' ' },
      { source: 'custitem_g2_top_size_ref', prefix: '', suffix: ' ' },
      { source: 'custitem_g2_top_color_ref', prefix: '', suffix: ' ' },
      { source: 'custitem_msrp_copy', prefix: 'MSRP $', suffix: ' ' },
      { source: 'custitem_g2_styleno', prefix: '', suffix: ' ' }
    ]
  }
}

var filledItem

filledItem.FieldData = [
  {
    id: '430',
    custrecord_fmd_field: { id: '213', text: 'Condition' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_condition_ref',
      text: null
    },
    custrecord_fmd_listrecscriptid: {
      id: 'customrecord_g2_condition',
      text: null
    },
    custrecord_fmd_column: { id: '431', text: 'Condition' },
    custrecord_fmd_columnscriptid: {
      id: 'custcol_g2_condition_ref',
      text: null
    },
    custrecord_fmd_fieldtype: { id: 'select', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: true, text: null },
    custrecord_fmd_sellpriceattribute: { id: true, text: null },
    custrecord_fmd_po_column_id: { id: '1652', text: 'Actual Condition' },
    custrecord_fmd_po_col_scriptid: {
      id: 'custcol_wipfli_condition_actual',
      text: null
    },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '40', text: 'Condition' },
    value: '7'
  },
  {
    id: '433',
    custrecord_fmd_field: { id: '115', text: 'Ebay Title' },
    custrecord_fmd_fieldscriptid: { id: 'custitem_g2_ebaytitle', text: null },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'text', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' },
    value:
      'Brand New 10.0 Womens Nike Golf Polo Large L Magenta 831267 MSRP $70'
  },
  {
    id: '436',
    custrecord_fmd_field: { id: '117', text: 'FreeNotes' },
    custrecord_fmd_fieldscriptid: { id: 'custitem_g2_freenotes', text: null },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'text', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' },
    value:
      'New with tags.\r\n87% polyester, 13% spandex.\r\nMachine wash cold; tumble dry low.'
  },
  {
    id: '448',
    custrecord_fmd_field: { id: '122', text: 'Is Ecommerce Item' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_isecommerceitem',
      text: null
    },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'checkbox', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' },
    value: false
  },
  {
    id: '450',
    custrecord_fmd_field: { id: '123', text: 'List On 2S Only' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_liston2sonly',
      text: null
    },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'checkbox', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' },
    value: false
  },
  { id: '' }
]

var searchResults = [
  {
    id: '3',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '56',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '12',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '57',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '41',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '13',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '52',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '54',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '15',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '40',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '16',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '14',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '82',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '83',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '50',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '24',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '25',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '27',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '51',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '26',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '87',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '28',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '84',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '85',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  },
  {
    id: '86',
    custrecord_category_shorten_ebay_title: { value: true, text: null }
  }
]

var titleTemplate = {
  title: [
    {
      source: 'custitem_g2_condition_ref',
      prefix: '',
      suffix: ' ',
      rule: { if: ['new', 'mint'] }
    },
    { source: 'custitem_wms_parentitembrand', prefix: '', suffix: ' ' },
    { source: 'custitem_wms_parentitemmodel', prefix: '', suffix: ' ' },
    { source: 'custitem_wms_parentitemcategory', prefix: '', suffix: ' ' },
    { source: 'custitem_g2_subcategory_ref', prefix: '', suffix: ' ' },
    { source: 'custitem_g2_club_loft_ref', prefix: '', suffix: ' ' }
  ]
}

var fieldData = [
  {
    id: '430',
    custrecord_fmd_field: { id: '213', text: 'Condition' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_condition_ref',
      text: null
    },
    custrecord_fmd_listrecscriptid: {
      id: 'customrecord_g2_condition',
      text: null
    },
    custrecord_fmd_column: { id: '431', text: 'Condition' },
    custrecord_fmd_columnscriptid: {
      id: 'custcol_g2_condition_ref',
      text: null
    },
    custrecord_fmd_fieldtype: { id: 'select', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: true, text: null },
    custrecord_fmd_sellpriceattribute: { id: true, text: null },
    custrecord_fmd_po_column_id: { id: '1652', text: 'Actual Condition' },
    custrecord_fmd_po_col_scriptid: {
      id: 'custcol_wipfli_condition_actual',
      text: null
    },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '40', text: 'Condition' }
  },
  {
    id: '433',
    custrecord_fmd_field: { id: '115', text: 'Ebay Title' },
    custrecord_fmd_fieldscriptid: { id: 'custitem_g2_ebaytitle', text: null },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'text', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' }
  },
  {
    id: '436',
    custrecord_fmd_field: { id: '117', text: 'FreeNotes' },
    custrecord_fmd_fieldscriptid: { id: 'custitem_g2_freenotes', text: null },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'text', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' }
  },
  {
    id: '447',
    custrecord_fmd_field: { id: '235', text: 'Headcover Gender' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_headcover_gender_ref',
      text: null
    },
    custrecord_fmd_listrecscriptid: {
      id: 'customrecord_g2_headcover_gender',
      text: null
    },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'select', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '49', text: 'Headcover Gender' }
  },
  {
    id: '448',
    custrecord_fmd_field: { id: '122', text: 'Is Ecommerce Item' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_isecommerceitem',
      text: null
    },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'checkbox', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' }
  },
  {
    id: '450',
    custrecord_fmd_field: { id: '123', text: 'List On 2S Only' },
    custrecord_fmd_fieldscriptid: {
      id: 'custitem_g2_liston2sonly',
      text: null
    },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'checkbox', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpriceattribute: { id: false, text: null },
    custrecord_fmd_sellpriceattribute: { id: false, text: null },
    custrecord_fmd_po_column_id: { id: '', text: '' },
    custrecord_fmd_po_col_scriptid: { id: '', text: null },
    custrecord_fmd_price_field: { id: false, text: null },
    custrecord_fmd_listrec: { id: '', text: '' }
  },
  {
    id: '461',
    custrecord_fmd_field: { id: '131', text: 'Online Title' },
    custrecord_fmd_fieldscriptid: { id: 'custitem_g2_onlinetitle', text: null },
    custrecord_fmd_listrecscriptid: { id: '', text: null },
    custrecord_fmd_column: { id: '', text: '' },
    custrecord_fmd_columnscriptid: { id: '', text: null },
    custrecord_fmd_fieldtype: { id: 'text', text: null },
    custrecord_fmd_readonly: { id: false, text: null },
    custrecord_fmd_bidpric: ''
  }
]

var error = {
  type: 'error.SuiteScriptError',
  name: 'USER_ERROR',
  message: 'Please enter a value for amount.',
  stack: [
    'anonymous(N/serverRecordService)',
    'addItemToTransaction(/SuiteScripts/WMS/shared/ItemHelper.js:1332)',
    'saveReplItemToPO(/SuiteScripts/WMS/Receiving/EditLine.js:851)',
    'map(/SuiteScripts/WMS/shared/ItemSelector-MR.js:57)'
  ],
  cause: {
    type: 'internal error',
    code: 'USER_ERROR',
    details: 'Please enter a value for amount.',
    userEvent: null,
    stackTrace: [
      'anonymous(N/serverRecordService)',
      'addItemToTransaction(/SuiteScripts/WMS/shared/ItemHelper.js:1332)',
      'saveReplItemToPO(/SuiteScripts/WMS/Receiving/EditLine.js:851)',
      'map(/SuiteScripts/WMS/shared/ItemSelector-MR.js:57)'
    ],
    notifyOff: false
  },
  id: '',
  notifyOff: false,
  userFacing: false
}

var file = {
  arrayOfSkuQuantities: null,
  fields: null,
  initialSku: null,
  isApparel: false,
  isMultiSkuCreated: true,
  mrScriptId: 'customscript_item_selector_mr',
  originalRepItemId: '31994',
  originalItemTemplateId: 9478279,
  params: {
    nlloc: '4',
    nlsub: '1',
    _button: '',
    nsapiFC: '',
    wfVF: '',
    nlapiVF: '',
    externalid: '',
    nlapiRC: '',
    _eml_nkey_: '0',
    nlapiVI: '',
    type: 'suitescriptform',
    nlapiVD: '',
    deploy: '1',
    nsapiRC: '',
    customwhence: '',
    nsapiVF: '',
    nsapiVD: '',
    nlapiVL: '',
    nsbrowserenv: 'istop=T',
    id: '',
    nsapiVL: '',
    nlapiFC: '',
    nsapiVI: '',
    custpage_brand: '',
    custpage_itemtype: '2',
    custpage_parentlistdata:
      'F\u000146921\u00010811 DVR\u0001PXG 0811 Driver\u0001PXG\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/0811 DVR.jpg">\u0002F\u00011156830\u00010811 X GEN2 DVR\u0001PXG 0811 X Gen2 Driver\u0001PXG\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/0811 X GEN2 DVR.jpg">\u0002F\u00017623392\u00010811 X PL PROTO DVR\u0001PXG 0811 X Plus Proto Driver\u0001PXG\u0001....small/ZL DVR.jpg">\u0002F\u000132729\u0001ZL ENCORE BL NEW DVR\u0001Cobra ZL Encore Black New Driver\u0001Cobra\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/ZL ENCORE BL NEW DVR.jpg">\u0002F\u000132725\u0001ZL ENCORE DVR\u0001Cobra ZL Encore Driver\u0001Cobra\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/ZL ENCORE DVR.jpg">\u0002F\u000132667\u0001ZL ENCORE RED DVR\u0001Cobra ZL Encore Red Driver\u0001Cobra\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/ZL ENCORE RED DVR.jpg">\u0002F\u000132665\u0001ZL ENCORE WHITE DVR\u0001Cobra ZL Encore White Driver\u0001Cobra\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/ZL ENCORE WHITE DVR.jpg">\u0002F\u000132722\u0001ZL WHITE DVR\u0001Cobra Limited Edition ZL White Driver\u0001Cobra\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/ZL WHITE DVR.jpg">\u0002F\u000148279\u0001ZX DVR\u0001Orlimar ZX Driver\u0001ORLIMAR\u0001<img src="https://imgs.2ndswing.com/images/clean-product/small/ZX DVR.jpg">',
    wfPS: '',
    custpage_parentlistsortname: 'custpage_parent_custitem_wms_imgurl',
    entryformquerystring: '',
    custpage_tranid: '10536304',
    custpage_parentlistflags: '4\u00014\u00010\u00010\u00010\u00010',
    custpage_child: '',
    custpage_parentlisttype: 'list',
    nextcustpage_parentlistidx: '1108',
    custpage_parentlistfields:
      'custpage_thisone\u0001custpage_parentid\u0001custpage_parent_itemid\u0001custpage_parent_custitem_g2_name\u0001custpage_parent_custitem_g2_brand_ref\u0001custpage_parent_custitem_wms_imgurl',
    script: '44',
    submitted: 'T',
    _multibtnstate_: '',
    selectedtab: '',
    wfPI: '',
    nlapiSR: '',
    custpage_add_multiple_items_object: '5',
    custpage_cachekey: 'purchaseorder:10536304:inventoryitem',
    submitter: 'Create Item',
    wfinstances: '',
    custpage_editline:
      '/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10536304:inventoryitem',
    nsapiLI: '',
    custpage_adder:
      '/app/site/hosting/scriptlet.nl?script=42&deploy=1&compid=4537321_SB1',
    custpage_parentlisttypes:
      'radio\u0001text\u0001text\u0001text\u0001text\u0001text',
    custpage_category: '5',
    custpage_parent: '31994',
    custpage_parentlistsortdir: 'UP',
    custpage_parentlistparents: '\u0001\u0001\u0001\u0001\u0001',
    nsapiPS: '',
    nsapiCT: '1605190533107',
    nlapiPI: '',
    custpage_parentlistsort2dir: '',
    custpage_parentlistsorttype: 'TEXT',
    nluser: '1322963',
    custpage_function: 'create',
    nldept: '0',
    nsapiPI: '',
    clickedback: '',
    custpage_parentlistlabel: 'Select Parent Item',
    wfSR: '',
    nsapiLC: '',
    custpage_parentlistlabels:
      ' \u0001\u0001Name\u0001Name\u0001Brand\u0001WMS Img URL',
    nlapiPS: '',
    custpage_parentlistfieldsets: '\u0001\u0001\u0001\u0001\u0001',
    nlapiLI: '',
    nsapiPD: '',
    nsapiSR: '',
    whence:
      '/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=10536304',
    nlrole: '3',
    custpage_trantype: 'purchaseorder',
    custpage_parentlistsort2name: '',
    custpage_parent_item: '',
    _csrf:
      'o30QcuGo0R_AEeYUJzekBHb8BGpatDFUGpn0484Iq8pXl8nbF20vLpRVgsQddC5rODJs0-TI-Jov7wzeRf-8qsu6zLCiBjYg32UtKpPNaNWpNrH2a2F2AriR7_PPEh_kZ7zohumT75B0EA02-Jf1LiLjehALHlyQVIwIPI3Y3ek=',
    custpage_parent_description: '',
    formdisplayview: 'DETAIL_VIEW',
    custpage_modal: '',
    custpage_parentlistvalid: 'T',
    custpage_parentlistorigtypes: '\u0001\u0001\u0001\u0001\u0001',
    wfFC: '',
    custpage_parentlistsortidx: '4'
  },
  parsedCacheKey: ['purchaseorder', '10536304', 'inventoryitem', '31994', null],
  quantityToAddToPO: 5
}

var newItemCache = {
  origItemId: '9478685',
  itemId: '9478685',
  itemType: 'inventoryitem',
  fieldData: [
    {
      id: '425',
      custrecord_fmd_field: { id: '261', text: 'Club Length' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_shaft_length',
        text: null
      },
      custrecord_fmd_column: { id: '428', text: 'Club Length' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '57', text: 'Club/Shaft Length' }
    },
    {
      id: '426',
      custrecord_fmd_field: { id: '477', text: 'Club Loft' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_club_loft',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '138', text: 'Club Loft' }
    },
    {
      id: '428',
      custrecord_fmd_field: { id: '210', text: 'Club ShaftMatl' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_club_shaftmatl',
        text: null
      },
      custrecord_fmd_column: { id: '689', text: 'Shaft Material (2)' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: {
        id: '1651',
        text: 'Actual Club Shaft Material'
      },
      custrecord_fmd_po_col_scriptid: {
        id: 'custcol_wipfli_club_shaftmatl_actual',
        text: null
      },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '37', text: 'Club ShaftMatl' }
    },
    {
      id: '430',
      custrecord_fmd_field: { id: '213', text: 'Condition' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_condition',
        text: null
      },
      custrecord_fmd_column: { id: '431', text: 'Condition' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
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
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
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
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '448',
      custrecord_fmd_field: { id: '122', text: 'Is Ecommerce Item' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
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
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
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
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '463',
      custrecord_fmd_field: { id: '611', text: 'Parent Item Brand' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_brand',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: true, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '25', text: 'Brand' }
    },
    {
      id: '464',
      custrecord_fmd_field: { id: '599', text: 'Parent Item Category' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_category',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: true, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '26', text: 'Category' }
    },
    {
      id: '465',
      custrecord_fmd_field: { id: '612', text: 'Parent Item Model' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_model',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: true, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '53', text: 'Model' }
    },
    {
      id: '467',
      custrecord_fmd_field: { id: '133', text: 'Price Discount Amt' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: true, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '468',
      custrecord_fmd_field: { id: '135', text: 'Price Discount Pct' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: true, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '469',
      custrecord_fmd_field: { id: '136', text: 'Price Premium Amt' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: true, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '470',
      custrecord_fmd_field: { id: '138', text: 'Price Premium Percent' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: true, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '473',
      custrecord_fmd_field: { id: '141', text: 'Rare Unique' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '474',
      custrecord_fmd_field: { id: '143', text: 'Serial Number' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '482',
      custrecord_fmd_field: { id: '146', text: 'ShaftOtherInfo' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '491',
      custrecord_fmd_field: { id: '275', text: 'Sub Category' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_subcategory',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '66', text: 'Subcategroy' }
    },
    {
      id: '501',
      custrecord_fmd_field: { id: '155', text: 'Tour Issue' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    },
    {
      id: '601',
      custrecord_fmd_field: { id: '223', text: 'Dexterity' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_dexterity',
        text: null
      },
      custrecord_fmd_column: { id: '687', text: 'Dexterity (2)' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '1653', text: 'Actual Dexterity' },
      custrecord_fmd_po_col_scriptid: {
        id: 'custcol_wipfli_dexterity_actual',
        text: null
      },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '41', text: 'Dexterity' }
    },
    {
      id: '706',
      custrecord_fmd_field: { id: '266', text: 'Shaft Type' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_shaft_type',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '59', text: 'Shaft Type/Model' }
    },
    {
      id: '803',
      custrecord_fmd_field: { id: '255', text: 'Shaft Flex' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_shaft_flex',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '55', text: 'Shaft Flex' }
    },
    {
      id: '805',
      custrecord_fmd_field: { id: '-1075', text: 'UPC Code' },
      custrecord_fmd_fieldscriptid: { id: '', text: null },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: '', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: false, text: null },
      custrecord_fmd_sellpriceattribute: { id: false, text: null },
      custrecord_fmd_po_column_id: { id: '', text: '' },
      custrecord_fmd_po_col_scriptid: { id: '', text: null },
      custrecord_fmd_price_field: { id: false, text: null },
      custrecord_fmd_listrec: { id: '', text: '' }
    }
  ],
  categoryId: '5',
  categoryName: 'Driver',
  otherItemType: '1',
  parentName: 'D-N209478685',
  parentSku: 'D-N209478685',
  ignoreReprint: false,
  name: 'D-N209478685',
  itemClass: '',
  sku: 'D-N209478685',
  salesDesc: '',
  conditionText: '',
  labelLastPrinted: '',
  imageUrl:
    'https://imgs.2ndswing.com/images/clean-product/small/D-N209478685.jpg',
  img: 'https://imgs.2ndswing.com/images/clean-product/small/D-N209478685.jpg',
  parentimg:
    'https://imgs.2ndswing.com/images/clean-product/small/D-N209478685.jpg',
  docType: 'purchaseorder',
  docId: '10536304',
  uniqueLine: '',
  cache: 'purchaseorder',
  cacheKey: 'purchaseorder:10536304:inventoryitem:9478685:'
}

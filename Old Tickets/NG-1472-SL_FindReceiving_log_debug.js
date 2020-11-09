// NG-1472 search columns from SL FindReceiving.js

var searchColumns = [
  {
    name: 'custcol_wms_picking_status',
    join: 'transaction',
    label: 'Picking Status',
    type: 'select',
    sortdir: 'NONE'
  },
  {
    name: 'formulatext',
    label: 'SKU',
    type: 'text',
    formula:
      'CASE WHEN {externalid} IS NULL THEN {custitem_g2_sku} ELSE {externalid} END',
    sortdir: 'NONE'
  },
  {
    name: 'custitem_g2_onlinetitle',
    label: 'Online Title',
    type: 'text',
    sortdir: 'NONE'
  },
  {
    name: 'location',
    join: 'transaction',
    label: 'Ship From Location',
    type: 'select',
    sortdir: 'NONE'
  },
  {
    name: 'custitem_wms_parentitemcategory',
    label: 'Category',
    type: 'select',
    sortdir: 'NONE'
  },
  {
    name: 'custcol_wms_transfer_to',
    join: 'transaction',
    label: 'Original Location',
    type: 'select',
    sortdir: 'NONE'
  },
  {
    name: 'quantity',
    join: 'transaction',
    label: 'Quantity To Pick',
    type: 'float',
    sortdir: 'NONE'
  },
  {
    name: 'custcol_clubcustomization',
    join: 'transaction',
    label: 'Customization',
    type: 'checkbox',
    sortdir: 'NONE'
  },
  {
    name: 'custbody_wms_multi_location',
    join: 'transaction',
    label: 'Multi-Location',
    type: 'checkbox',
    sortdir: 'NONE'
  },
  {
    name: 'custbody_wms_multi_items',
    join: 'transaction',
    label: 'Multi-Items',
    type: 'checkbox',
    sortdir: 'NONE'
  },
  {
    name: 'entity',
    join: 'transaction',
    label: 'Customer',
    type: 'select',
    sortdir: 'NONE'
  },
  {
    name: 'shipmethod',
    join: 'transaction',
    label: 'Ship Method',
    type: 'select',
    sortdir: 'ASC'
  },
  {
    name: 'datecreated',
    join: 'transaction',
    label: 'Date Created',
    type: 'datetime',
    sortdir: 'ASC'
  },
  {
    name: 'tranid',
    join: 'transaction',
    label: 'Order #',
    type: 'text',
    sortdir: 'NONE'
  },
  {
    name: 'amount',
    join: 'transaction',
    label: 'Amount',
    type: 'currency',
    sortdir: 'NONE'
  },
  {
    name: 'lineuniquekey',
    join: 'transaction',
    label: 'Line Unique Key',
    type: 'integer',
    sortdir: 'NONE'
  },
  {
    name: 'internalid',
    join: 'transaction',
    label: 'Internal ID',
    type: 'select',
    sortdir: 'NONE'
  },
  {
    name: 'locationquantityavailable',
    label: 'Location Available',
    type: 'float',
    sortdir: 'NONE'
  },
  {
    name: 'locationquantitycommitted',
    label: 'Location Committed',
    type: 'float',
    sortdir: 'NONE'
  }
]

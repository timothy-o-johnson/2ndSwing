var ng2281 = {
  acceptanceCriteria: `
    1) The SKU for the item being received is visible in the Edit Line suitelet.
        Please put in the white space above the “Save” button (this is where it is for apparel items)
    
    2) The fields in the Edit Line suitelet are re-ordered for a better flow.
        a) Non-apparel
            Parent SKU
            Quantity Expected
            Quantity Received
            Condition
            Shaft Material - if applicable
            Number of Clubs in Iron Set (Select Field) - if applicable
            Club Number (2) - if applicable
            Cancel Purchase Order Line
            Receiving Notes
            Bid Price
        
        b) Apparel
            Parent SKU
            Condition
            Quantity Expected
            Quantity Received
            Cancel Purchase Order Line
            Close Line?
            Receiving Notes
            Bid Price

        c) Apparel (Create Multiple)
            Parent SKU
            Condition
            Quantity Expected
            Quantity Received
            Number of SKUs
            SKU Configuration
            Total Quantity Check
            Cancel Purchase Order Line
            Close Line?
            Receiving Notes
            Bid Price
    3) Cursor starts in the first empty field/dropdown field.`
}

var params = {
  template: 'customdeploy_wms_selectreceivingline',
  cache: 'purchaseorder',
  cacheKey: 'purchaseorder:10563367:inventoryitem:9472560:31155672',
  compid: '4537321_SB1',
  script: '39',
  deploy: '1'
}

var itemObj = {
  origItemId: '9472560',
  itemId: '9472560',
  itemType: 'inventoryitem',
  fieldData: [
    {
      id: '425',
      custrecord_fmd_field: { id: '261', text: 'Club Length' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_club_length_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_shaft_length',
        text: null
      },
      custrecord_fmd_column: { id: '428', text: 'Club Length' },
      custrecord_fmd_columnscriptid: {
        id: 'custcol_g2_club_length',
        text: null
      },
      custrecord_fmd_fieldtype: { id: 'select', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_club_loft_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_club_loft',
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
      custrecord_fmd_listrec: { id: '138', text: 'Club Loft' }
    },
    {
      id: '428',
      custrecord_fmd_field: { id: '210', text: 'Club ShaftMatl' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_club_shaftmatl_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_club_shaftmatl',
        text: null
      },
      custrecord_fmd_column: { id: '689', text: 'Shaft Material (2)' },
      custrecord_fmd_columnscriptid: {
        id: 'custcol_po_shaft_material_ref',
        text: null
      },
      custrecord_fmd_fieldtype: { id: 'select', text: null },
      custrecord_fmd_readonly: { id: false, text: null },
      custrecord_fmd_bidpriceattribute: { id: true, text: null },
      custrecord_fmd_sellpriceattribute: { id: true, text: null },
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
      custrecord_fmd_fieldtype: { id: 'clobtext', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_onlinetitle',
        text: null
      },
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
      id: '463',
      custrecord_fmd_field: { id: '611', text: 'Parent Item Brand' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_wms_parentitembrand',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_brand',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'select', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_wms_parentitemcategory',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_category',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'select', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_wms_parentitemmodel',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_model',
        text: null
      },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'select', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_pricediscountamt',
        text: null
      },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'float', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_pricediscountpct',
        text: null
      },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'float', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_pricepremiumamt',
        text: null
      },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'float', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_pricepremiumpct',
        text: null
      },
      custrecord_fmd_listrecscriptid: { id: '', text: null },
      custrecord_fmd_column: { id: '', text: '' },
      custrecord_fmd_columnscriptid: { id: '', text: null },
      custrecord_fmd_fieldtype: { id: 'float', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_rareunique',
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
      id: '474',
      custrecord_fmd_field: { id: '143', text: 'Serial Number' },
      custrecord_fmd_fieldscriptid: { id: 'custitem_g2_serialno', text: null },
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
      id: '482',
      custrecord_fmd_field: { id: '146', text: 'ShaftOtherInfo' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_shaft_otherinfo',
        text: null
      },
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
      id: '491',
      custrecord_fmd_field: { id: '275', text: 'Sub Category' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_subcategory_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_subcategory',
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
      custrecord_fmd_listrec: { id: '66', text: 'Subcategroy' }
    },
    {
      id: '501',
      custrecord_fmd_field: { id: '155', text: 'Tour Issue' },
      custrecord_fmd_fieldscriptid: { id: 'custitem_g2_tourissue', text: null },
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
      id: '601',
      custrecord_fmd_field: { id: '223', text: 'Dexterity' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_dexterity_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_dexterity',
        text: null
      },
      custrecord_fmd_column: { id: '687', text: 'Dexterity (2)' },
      custrecord_fmd_columnscriptid: {
        id: 'custcol_g2_dexterity_ref',
        text: null
      },
      custrecord_fmd_fieldtype: { id: 'select', text: null },
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
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_shaft_type_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_shaft_type',
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
      custrecord_fmd_listrec: { id: '59', text: 'Shaft Type/Model' }
    },
    {
      id: '803',
      custrecord_fmd_field: { id: '255', text: 'Shaft Flex' },
      custrecord_fmd_fieldscriptid: {
        id: 'custitem_g2_shaft_flex_ref',
        text: null
      },
      custrecord_fmd_listrecscriptid: {
        id: 'customrecord_g2_shaft_flex',
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
      custrecord_fmd_listrec: { id: '55', text: 'Shaft Flex' }
    },
    {
      id: '805',
      custrecord_fmd_field: { id: '-1075', text: 'UPC Code' },
      custrecord_fmd_fieldscriptid: { id: 'upccode', text: null },
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
    }
  ],
  parentItemId: 31115,
  categoryId: '6',
  categoryName: 'Fairway Wood',
  otherItemType: '1',
  parentName: 'STEELHEAD XR NEW FWG',
  parentSku: 'STEELHEAD XR NEW FWG',
  ignoreReprint: false,
  name: 'D-N209472560',
  itemClass: '2',
  sku: 'D-N209472560',
  salesDesc: 'Callaway Steelhead XR    ',
  conditionText: 'Average',
  labelLastPrinted: '',
  img:
    'https://imgs.2ndswing.com/images/clean-product/small/D-N209472560.jpg%2c/images/clean-product/small/STEELHEAD%20XR%20NEW%20FWG.jpg',
  parentimg:
    'https://imgs.2ndswing.com/images/clean-product/small/STEELHEAD%20XR%20NEW%20FWG.jpg',
  docType: 'purchaseorder',
  docId: '10563367',
  uniqueLine: '31155672',
  cache: 'purchaseorder',
  cacheKey: 'purchaseorder:10563367:inventoryitem:9472560:31155672'
}

var error = {
  message: '"bpaHasChanged" is not defined.',
  fileName: '/SuiteScripts/WMS/Receiving/EditLine.js',
  lineNumber: 2830,
  name: 'ReferenceError',
  rhinoException: {},
  stack:
    '\tat /SuiteScripts/WMS/Receiving/EditLine.js:2830 (addBpaHasChangedHiddenField)\n\tat /SuiteScripts/WMS/Receiving/EditLine.js:2395 (addHiddenFields)\n\tat /SuiteScripts/WMS/Receiving/EditLine.js:2391 (addFields)\n\tat /SuiteScripts/WMS/Receiving/EditLine.js:153 (onRequest)\n\tat INVOCATION_WRAPPER$sys:31\n\tat INVOCATION_WRAPPER$sys:17\n\tat INVOCATION_WRAPPER$sys:38\n\tat INVOCATION_WRAPPER$sys:1\n'
}

var nonElement = <input onkeyup="" onchange="setWindowChanged(window, true);this.checkvalid=false;this.isvalid=validate_field(this,'integer',true,false,null,null,false, null ,8); if(this.isvalid) {document.forms['main_form'].elements['custpage_quantity_received'].value = NLStringToNormalizedNumberString(this.value);this.isvalid = nlapiValidateField(null,'custpage_quantity_received');}if (this.isvalid) {nlapiFieldChanged(null,'custpage_quantity_received');;}if (!this.isvalid) { selectAndFocusField(this);}return this.isvalid;" onkeypress="" datatype="integer" type="text" onfocus="this.checkvalid=true;" onblur="if (this.checkvalid == true) {this.isvalid=validate_field(this,'integer',false,false,null,null,false, null ,8); if(this.isvalid) {document.forms['main_form'].elements['custpage_quantity_received'].value = NLStringToNormalizedNumberString(this.value);this.isvalid = nlapiValidateField(null,'custpage_quantity_received');}} if (this.isvalid == false) { selectAndFocusField(this); if (arguments[0]){ arguments[0].stopPropagation();} return this.isvalid;} " size="15" aria-labelledby="custpage_quantity_received_fs_lbl" name="custpage_quantity_received_formattedValue" style="width: 280px; ime-mode:disabled" id="custpage_quantity_received_formattedValue" class="input uir-custom-field" value="1"></input>
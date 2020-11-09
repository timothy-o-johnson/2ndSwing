// NG-1469 - Item

var editLineItemParse = {
    origItemId: '41285',
    itemId: '41285',
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
            custrecord_fmd_column: { id: '', text: '' },
            custrecord_fmd_columnscriptid: { id: '', text: null },
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
            custrecord_fmd_po_col_scriptid: { id: '', text: '' }
        }
    ]
};

var OOPS = {
    fieldLabel: 'Club Color',
    originalValue: '',
    fieldType: 'select',
    selections: [
        { value: '1', text: 'Aqua' },
        { value: '2', text: 'Black' },
        { value: '413', text: 'Black Ceramic Bezel' },
        { value: '105', text: 'Black/Blue' },
        { value: '410', text: 'Black/Capri Blue' },
        { value: '408', text: 'Black/Hot Pink' },
        { value: '601', text: 'Black/Mint' },
        { value: '407', text: 'Black/Sea Green' },
        { value: '3', text: 'Blue' },
        { value: '414', text: 'Bolt Blue' },
        { value: '4', text: 'Charcoal' },
        { value: '406', text: 'Cherry Blossom' },
        { value: '404', text: 'Copper' },
        { value: '418', text: 'Frost Blue' },
        { value: '802', text: 'Gray/Gray' },
        { value: '801', text: 'Gray/Pink' },
        { value: '5', text: 'Green' },
        { value: '108', text: 'Lime' },
        { value: '417', text: 'Limelight' },
        { value: '415', text: 'Matte Black' },
        { value: '416', text: 'Midnight Teal' },
        { value: '401', text: 'Nardo Gray' },
        { value: '412', text: 'Navy/Khaki' },
        { value: '204', text: 'Nectarine' },
        { value: '6', text: 'Oil Can' },
        { value: '7', text: 'Orange' },
        { value: '102', text: 'Pearl White' },
        { value: '8', text: 'Pink' },
        { value: '701', text: 'Pink Bag Option' },
        { value: '104', text: 'Pink/Silver' },
        { value: '201', text: 'Platinum' },
        { value: '107', text: 'Plum' },
        { value: '202', text: 'Raspberry Pearl' },
        { value: '9', text: 'Red' },
        { value: '501', text: 'Satin Black/Avalanche' },
        { value: '10', text: 'Silver' },
        { value: '101', text: 'Silver/Blue' },
        { value: '411', text: 'Silver/Mint' },
        { value: '403', text: 'Silver/Purple' },
        { value: '409', text: 'Silver/Raspberry' },
        { value: '402', text: 'Silver/Teal' },
        { value: '301', text: 'Slate' },
        { value: '702', text: 'Standard Bag Option' },
        { value: '405', text: 'Stealth' },
        { value: '106', text: 'Teal' },
        { value: '11', text: 'Tour Chrome' },
        { value: '203', text: 'Ultramarine Blue' },
        { value: '103', text: 'Vibrant Orange' },
        { value: '12', text: 'White' }
    ]
};

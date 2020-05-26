//// orderRec, itemHelper.addItemToTransaction(): ng1960, map reduce
// 116

var orderRec = {
  id: '3539980',
  type: 'purchaseorder',
  isDynamic: false,
  fields: {
    orderstatus: 'F',
    trandate: '5/4/2020',
    billaddresslist: '2477380',
    _eml_nkey_: '0',
    billisresidential: 'F',
    type: 'purchord',
    custbody_bf_totalquantity2: '10',
    dbstrantype: 'PurchOrd',
    ordbilled: 'F',
    currencysymbol: 'USD',
    balance: '254700.98',
    recordcreatedby: '923763',
    origtotal: '-149.9',
    custbody_wms_po_total_received: '7',
    id: '3539980',
    needsbill: 'T',
    custbody_gsv_pocount: '0',
    entryformquerystring: 'e=T&id=3539980',
    billaddress: 'ABC V Vendor\\nUnited States',
    custbody_intercompany: 'F',
    shippingaddress2_set:
      "var subrecord = nlapiViewSubrecord('shippingaddress');\\nvar addresstext;\\nif (subrecord) {\\n   addresstext = subrecord.getFieldValue('addrtext');\\n} else {\\n}\\nnlapiSetFieldValue('shippingaddress_text', addresstext);\\n",
    version: '20',
    subsidiary: '1',
    suppressusereventsandemails: 'F',
    custbody_g2_ispayinadvance: 'F',
    rectype_261_737_maxnkey: '277972',
    nlapiCC: 'F',
    custbody_bf_prepaidpo: 'F',
    custbody_isgiftcertissued: 'F',
    status: 'Pending Bill',
    custbody_wms_prepayment_credit_applied: 'F',
    shipisresidential: 'F',
    createddate: '5/4/2020 10:06 am',
    custbody_gsv_spc_name: 'Check',
    custbody_bf_pototalquantity: '10',
    entityname: 'ABC Vendor (G03839)',
    nluser: '1269484',
    shipoverride: 'F',
    installmentcount: '0',
    custbody_wipfli_vendorbalance: '254700.98',
    custbody_wms_customer_not_found: 'F',
    currency: '1',
    custbody_wipfli_vend_cat: '12',
    custbody_isexcess: 'F',
    email: 'ross@2ndswing.com',
    linked: 'T',
    recordcreateddate: '05/04/2020 08:06:35',
    custbody_total_shipping_labels: '0',
    updatedropshiporderqty: 'T',
    prevdate: '5/4/2020',
    billingaddress_key: '2470638',
    custbody_wipfli_customer_email: 'ross@2ndswing.com',
    customform: '116',
    currencyprecision: '2',
    custbody_isclubtrader: 'F',
    origtotal2: '149.9',
    entity: '98726',
    nlloc: '4',
    nlsub: '1',
    inventorydetailuitype: 'MOH_LOOSE_VALIDATION',
    shipaddress: '6752 Shady Oak Road\\nEden Prairie MN 55344\\nUnited States',
    expense_total: '0.00',
    custbody_wms_total_received_2: '7',
    tobeprinted: 'F',
    companyid: '98726',
    custbody_g2_isfreeshipping: 'F',
    billingaddress_text: 'ABC V Vendor\\nUnited States',
    voided: 'F',
    transactionnumber: 'PURCHORD167143',
    unbilledorders: '102049669.08',
    tobeemailed: 'F',
    weekendpreference: 'ASIS',
    billingaddress_type: 'shipaddr',
    item_total: '149.90',
    custbody_wipfli_hot_order: 'F',
    haslines: 'T',
    balreadyrefunded: 'F',
    oldrevenuecommitment: 'F',
    cleared: 'F',
    ordrecvd: 'T',
    wfinstances: '',
    custbody_wipfli_shipping_address:
      '2412 East Hennepin Ave\\r\\nMinneapolis, MN 55413',
    rejected: 'F',
    exchangerate: '1',
    edition: 'US',
    isbasecurrency: 'T',
    custbody_emailorderreceivedsummary: 'T',
    custbody_wipfli_povariance: '-44.97',
    nsapiCT: '1589209903053',
    sys_id: '11500622224636313',
    shippingaddress_key: '3224052',
    tobefaxed: 'F',
    total: '149.90',
    ordpartrecvd: 'T',
    nldept: '0',
    initialtranid: 'Testing PO for Apparel #1',
    statusRef: 'pendingBilling',
    class: '2',
    custbody_gsv_spc_pricelevel: '23% Commission',
    billingaddress2_set:
      "var subrecord = nlapiViewSubrecord('billingaddress');\\nvar addresstext;\\nif (subrecord) {\\n   addresstext = subrecord.getFieldValue('addrtext');\\n} else {\\n}\\nnlapiSetFieldValue('billingaddress_text', addresstext);\\n",
    shipdate: '5/4/2020',
    shippingaddress_text:
      '6752 Shady Oak Road\\nEden Prairie MN 55344\\nUnited States',
    tranid: 'Testing PO for Apparel #1',
    custbody_wipfli_wms_notes: 'Testing.',
    custbody_wipfli_wpc: '292',
    templatestored: 'T',
    custbody_gsvsite_ref: '14',
    lastmodifieddate: '5/11/2020 10:11 am',
    entityfieldname: 'entity',
    nlrole: '3',
    baserecordtype: 'purchaseorder',
    ntype: '15',
    nexttranid: '713',
    supervisorapproval: 'T',
    custbody_paycode_ref: '1',
    custbody_wf_actual_amount: '104.93',
    shippingaddress_type: 'shipaddr',
    needsshiprecv: 'F',
    custbody_paycode_ref_name: 'Check',
    linkedclosedperioddiscounts: 'F',
    creditlimit_origtotal: '14.99',
    linkedrevrecje: 'F'
  },
  sublists: {
    recmachcustrecord_wms_to_ref: {
      currentline: {
        created: '',
        custrecord_wms_bundle_line_errors: '',
        custrecord_wms_from_location_bin: '',
        custrecord_wms_item_fulfill_ref: '',
        custrecord_wms_parent_transfer_bundle: '',
        custrecord_wms_pick_status: '',
        custrecord_wms_quantity_to_move: '',
        custrecord_wms_quarantine_inv_transf: '',
        custrecord_wms_stand_tran_line: 'F',
        custrecord_wms_to_location_line: '',
        custrecord_wms_to_luk: '',
        custrecord_wms_to_ref: '3539980',
        custrecord_wms_transfer_item_description: '',
        custrecord_wms_transfer_item_receipt: '',
        custrecord_wms_transfer_line_item: '',
        id: '',
        iddisp: '',
        owner: '',
        recordischanged: '',
        sys_id: '-11500622429873791',
        sys_parentid: '11500622224636313',
        version: '',
        '#': '1'
      }
    },
    item: {
      currentline: {
        amount: '',
        amounthasbeenset: 'F',
        billvariancestatus: '',
        billvariancestatusallbook: '',
        binitem: '',
        class: '',
        custcol_ava_incomeaccount: '',
        custcol_ava_item: '',
        custcol_ava_taxcodemapping: '',
        custcol_ava_upccode: '',
        custcol_customernotes: '',
        custcol_expectedqty: '',
        custcol_facilities: '',
        custcol_g2_club_number: '',
        custcol_g2_club_number_ref: '',
        custcol_g2_club_numirons_ref: '',
        custcol_g2_clubsinironset: '',
        custcol_g2_condition_ref: '',
        custcol_g2_dexterity: '',
        custcol_g2_dexterity_ref: '',
        custcol_g2_originalexpected: '',
        custcol_misc_item_description: '',
        custcol_po_shaft_material_ref: '',
        custcol_wipfli_club_number_actual: '',
        custcol_wipfli_club_numirons_actual: '',
        custcol_wipfli_club_shaftmatl_actual: '',
        custcol_wipfli_condition_actual: '',
        custcol_wipfli_g2in: '',
        custcol_wipfli_itemvariance: '',
        custcol_wms_actual_rate: '0',
        custcol_wms_addedoff: '',
        custcol_wms_childitemgenerator: 'F',
        custcol_wms_exception: '',
        custcol_wms_hideinwms: 'F',
        custcol_wms_origg2name: '',
        custcol_wms_parent_item_lookup: '',
        custcol_wms_parentitem: '',
        custcol_wms_print_label_line: '',
        custcol_wms_recvnotes: '',
        custcol_wms_replacedby: '',
        customer: '',
        ddistrib: '',
        discline: '',
        dropshiporderhasbeenshiprecv: '',
        dropshipwarningdisplayed: '',
        fulfillable: '',
        generateaccruals: '',
        groupclosed: 'F',
        groupsetup: '',
        id: '',
        includegroupwrapper: '',
        ingroup: '',
        initoqpbucket: '',
        initquantity: '',
        inventorydetailavail: '',
        isbillable: '',
        isclosed: '',
        isdropshiporderline: '',
        islinefulfilled: '',
        isnoninventory: '',
        isnumbered: '',
        isopen: '',
        isserial: '',
        isspecialorderline: '',
        item: '',
        itemhandlingcost: '',
        itempacked: '',
        itempicked: '',
        itemshippingcost: '',
        itemsubtype: '',
        itemtype: '',
        leadtime: '',
        line: '',
        linenumber: '',
        lineuniquekey: '',
        linked: '',
        linkedordbill: '',
        linkedshiprcpt: '',
        location: '',
        locationusesbins: '',
        marginal: '',
        matchbilltoreceipt: '',
        matrixtype: '',
        noprint: '',
        olditemid: '',
        options: '',
        oqpbucket: '',
        origlocation: '',
        origquantity: '',
        origrate: '',
        printitems: '',
        quantity: '',
        quantitybilled: '',
        quantityreceived: '',
        rate: '',
        rateschedule: '',
        sys_id: '-11500622433039453',
        sys_parentid: '11500622224636313',
        vendorname: '',
        weightinlb: '',
        '#': '4'
      },
      'line 1': {
        amount: '0.00',
        amounthasbeenset: 'F',
        billvariancestatus: 'NOVARIANCES',
        billvariancestatusallbook: 'F',
        binitem: 'F',
        class: '2',
        custcol_ava_incomeaccount: 'Sales',
        custcol_ava_item: 'PUMA W SSS',
        custcol_ava_taxcodemapping: null,
        custcol_ava_upccode: null,
        custcol_customernotes: null,
        custcol_expectedqty: '10',
        custcol_facilities: null,
        custcol_facilities_display: null,
        custcol_g2_club_number: null,
        custcol_g2_club_number_ref: null,
        custcol_g2_club_numirons_ref: null,
        custcol_g2_clubsinironset: null,
        custcol_g2_condition_ref: '5',
        custcol_g2_dexterity: null,
        custcol_g2_dexterity_ref: null,
        custcol_g2_originalexpected: null,
        custcol_misc_item_description: null,
        custcol_po_shaft_material_ref: null,
        custcol_wipfli_club_number_actual: null,
        custcol_wipfli_club_numirons_actual: null,
        custcol_wipfli_club_shaftmatl_actual: null,
        custcol_wipfli_condition_actual: null,
        custcol_wipfli_g2in: 'Puma All Womens Short Sleeve Golf Shirt',
        custcol_wipfli_itemvariance: '-149.9',
        custcol_wms_actual_rate: '0',
        custcol_wms_addedoff: null,
        custcol_wms_addedoff_display: null,
        custcol_wms_childitemgenerator: 'F',
        custcol_wms_exception: null,
        custcol_wms_hideinwms: 'T',
        custcol_wms_origg2name: null,
        custcol_wms_parent_item_lookup: '48635',
        custcol_wms_parent_item_lookup_display: 'PUMA W SSS',
        custcol_wms_parentitem: null,
        custcol_wms_print_label_line:
          '/app/site/hosting/scriptlet.nl?script=265&deploy=1&compid=4537321_SB1&items=["inventoryitem:48635"]',
        custcol_wms_recvnotes: 'Testing.',
        custcol_wms_replacedby: null,
        custcol_wms_replacedby_display: null,
        customer: null,
        ddistrib: '1/1/1970',
        discline: null,
        dropshiporderhasbeenshiprecv: 'F',
        dropshipwarningdisplayed: 'F',
        fulfillable: 'T',
        generateaccruals: 'T',
        groupclosed: 'F',
        groupsetup: null,
        id: '3539980_1',
        includegroupwrapper: 'F',
        ingroup: null,
        initoqpbucket: null,
        initquantity: '0',
        inventorydetailavail: 'F',
        isbillable: 'F',
        isclosed: 'F',
        isdropshiporderline: 'F',
        islinefulfilled: 'F',
        isnoninventory: 'F',
        isnumbered: 'F',
        isopen: 'F',
        isserial: 'F',
        isspecialorderline: 'F',
        item: '48635',
        item_display: 'PUMA W SSS',
        itemhandlingcost: null,
        itempacked: 'F',
        itempicked: 'F',
        itemshippingcost: null,
        itemsubtype: null,
        itemtype: 'InvtPart',
        leadtime: '14',
        line: '1',
        linenumber: null,
        lineuniquekey: '10465554',
        linked: 'F',
        linkedordbill: 'F',
        linkedshiprcpt: 'F',
        location: null,
        locationusesbins: null,
        marginal: 'F',
        matchbilltoreceipt: 'F',
        matrixtype: null,
        noprint: 'F',
        olditemid: '48635',
        options: null,
        oqpbucket: null,
        origlocation: null,
        origquantity: '0',
        origrate: '14.99',
        printitems: 'F',
        quantity: '0',
        quantitybilled: '0',
        quantityreceived: '0',
        rate: '14.99',
        rateschedule: null,
        sys_id: '11500622214825062',
        sys_parentid: '11500622224636313',
        vendorname: null,
        weightinlb: '0'
      },
      'line 2': {
        amount: '134.91',
        amounthasbeenset: 'F',
        billvariancestatus: 'JOURNALNOTPOSTED',
        billvariancestatusallbook: 'F',
        binitem: 'T',
        class: '2',
        custcol_ava_incomeaccount: 'Sales',
        custcol_ava_item: 'D-5203020954',
        custcol_ava_taxcodemapping: null,
        custcol_ava_upccode: null,
        custcol_customernotes: null,
        custcol_expectedqty: '10',
        custcol_facilities: null,
        custcol_facilities_display: null,
        custcol_g2_club_number: null,
        custcol_g2_club_number_ref: null,
        custcol_g2_club_numirons_ref: null,
        custcol_g2_clubsinironset: null,
        custcol_g2_condition_ref: '5',
        custcol_g2_dexterity: null,
        custcol_g2_dexterity_ref: null,
        custcol_g2_originalexpected: null,
        custcol_misc_item_description: null,
        custcol_po_shaft_material_ref: null,
        custcol_wipfli_club_number_actual: null,
        custcol_wipfli_club_numirons_actual: null,
        custcol_wipfli_club_shaftmatl_actual: null,
        custcol_wipfli_condition_actual: '5',
        custcol_wipfli_g2in: 'Puma All Womens Short Sleeve Golf Shirt',
        custcol_wipfli_itemvariance: '-59.96',
        custcol_wms_actual_rate: '14.99',
        custcol_wms_addedoff: null,
        custcol_wms_addedoff_display: null,
        custcol_wms_childitemgenerator: 'F',
        custcol_wms_exception: null,
        custcol_wms_hideinwms: 'T',
        custcol_wms_origg2name: null,
        custcol_wms_parent_item_lookup: '48635',
        custcol_wms_parent_item_lookup_display: 'PUMA W SSS',
        custcol_wms_parentitem: 'PUMA W SSS',
        custcol_wms_print_label_line:
          '/app/site/hosting/scriptlet.nl?script=265&deploy=1&compid=4537321_SB1&items=["inventoryitem:3020954"]',
        custcol_wms_recvnotes: 'Testing.  [2, 1]',
        custcol_wms_replacedby: null,
        custcol_wms_replacedby_display: null,
        customer: null,
        ddistrib: '1/1/1970',
        discline: null,
        dropshiporderhasbeenshiprecv: 'T',
        dropshipwarningdisplayed: 'F',
        fulfillable: 'T',
        generateaccruals: 'T',
        groupclosed: 'F',
        groupsetup: null,
        id: '3539980_2',
        includegroupwrapper: 'F',
        ingroup: null,
        initoqpbucket: null,
        initquantity: '9',
        inventorydetailavail: 'F',
        isbillable: 'F',
        isclosed: 'T',
        isdropshiporderline: 'F',
        islinefulfilled: 'F',
        isnoninventory: 'F',
        isnumbered: 'F',
        isopen: 'F',
        isserial: 'F',
        isspecialorderline: 'F',
        item: '3020954',
        item_display: 'PUMA W SSS : D-5203020954',
        itemhandlingcost: null,
        itempacked: 'F',
        itempicked: 'F',
        itemshippingcost: null,
        itemsubtype: null,
        itemtype: 'InvtPart',
        leadtime: '14',
        line: '2',
        linenumber: null,
        lineuniquekey: '10465657',
        linked: 'T',
        linkedordbill: 'F',
        linkedshiprcpt: 'T',
        location: '4',
        locationusesbins: 'T',
        marginal: 'F',
        matchbilltoreceipt: 'F',
        matrixtype: null,
        noprint: 'F',
        olditemid: '3020954',
        options: null,
        oqpbucket: null,
        origlocation: '4',
        origquantity: '9',
        origrate: '14.99',
        printitems: 'F',
        quantity: '7.0',
        quantitybilled: '0',
        quantityreceived: '6',
        rate: '14.99',
        rateschedule: null,
        sys_id: '11500622214826337',
        sys_parentid: '11500622224636313',
        vendorname: null,
        weightinlb: '0'
      },
      'line 3': {
        amount: '14.99',
        amounthasbeenset: 'F',
        billvariancestatus: null,
        billvariancestatusallbook: 'F',
        binitem: 'T',
        class: '2',
        custcol_ava_incomeaccount: 'Sales',
        custcol_ava_item: 'D-5203027464',
        custcol_ava_taxcodemapping: null,
        custcol_ava_upccode: null,
        custcol_customernotes: null,
        custcol_expectedqty: '0',
        custcol_facilities: null,
        custcol_facilities_display: null,
        custcol_g2_club_number: null,
        custcol_g2_club_number_ref: null,
        custcol_g2_club_numirons_ref: null,
        custcol_g2_clubsinironset: null,
        custcol_g2_condition_ref: null,
        custcol_g2_dexterity: null,
        custcol_g2_dexterity_ref: null,
        custcol_g2_originalexpected: '10',
        custcol_misc_item_description: null,
        custcol_po_shaft_material_ref: null,
        custcol_wipfli_club_number_actual: null,
        custcol_wipfli_club_numirons_actual: null,
        custcol_wipfli_club_shaftmatl_actual: null,
        custcol_wipfli_condition_actual: '5',
        custcol_wipfli_g2in: 'Puma All Womens Short Sleeve Golf Shirt',
        custcol_wipfli_itemvariance: '14.99',
        custcol_wms_actual_rate: '14.99',
        custcol_wms_addedoff: '3020954',
        custcol_wms_addedoff_display: 'PUMA W SSS : D-5203020954',
        custcol_wms_childitemgenerator: 'F',
        custcol_wms_exception: null,
        custcol_wms_hideinwms: 'F',
        custcol_wms_origg2name: 'Puma All Womens Short Sleeve Golf Shirt',
        custcol_wms_parent_item_lookup: null,
        custcol_wms_parent_item_lookup_display: null,
        custcol_wms_parentitem: 'PUMA W SSS',
        custcol_wms_print_label_line:
          '/app/site/hosting/scriptlet.nl?script=265&deploy=1&compid=4537321_SB1&items=["inventoryitem:3027464"]',
        custcol_wms_recvnotes: 'Testing.  [2, 1]',
        custcol_wms_replacedby: null,
        custcol_wms_replacedby_display: null,
        customer: null,
        ddistrib: '1/1/1970',
        discline: null,
        dropshiporderhasbeenshiprecv: 'T',
        dropshipwarningdisplayed: 'F',
        fulfillable: 'T',
        generateaccruals: 'T',
        groupclosed: 'F',
        groupsetup: null,
        id: '3539980_3',
        includegroupwrapper: 'F',
        ingroup: null,
        initoqpbucket: null,
        initquantity: '1',
        inventorydetailavail: 'F',
        isbillable: 'F',
        isclosed: 'F',
        isdropshiporderline: 'F',
        islinefulfilled: 'F',
        isnoninventory: 'F',
        isnumbered: 'F',
        isopen: 'T',
        isserial: 'F',
        isspecialorderline: 'F',
        item: '3027464',
        item_display: 'PUMA W SSS : D-5203027464',
        itemhandlingcost: null,
        itempacked: 'F',
        itempicked: 'F',
        itemshippingcost: null,
        itemsubtype: null,
        itemtype: 'InvtPart',
        leadtime: '14',
        line: '3',
        linenumber: null,
        lineuniquekey: '10494820',
        linked: 'T',
        linkedordbill: 'F',
        linkedshiprcpt: 'T',
        location: '4',
        locationusesbins: 'T',
        marginal: 'F',
        matchbilltoreceipt: 'F',
        matrixtype: null,
        noprint: 'F',
        olditemid: '3027464',
        options: null,
        oqpbucket: null,
        origlocation: '4',
        origquantity: '1',
        origrate: '14.99',
        printitems: 'F',
        quantity: '1',
        quantitybilled: '0',
        quantityreceived: '1',
        rate: '14.99',
        rateschedule: null,
        sys_id: '11500622214826509',
        sys_parentid: '11500622224636313',
        vendorname: null,
        weightinlb: '0'
      },
      'line 4': {
        amount: null,
        amounthasbeenset: null,
        billvariancestatus: null,
        billvariancestatusallbook: null,
        binitem: null,
        class: null,
        custcol_ava_incomeaccount: null,
        custcol_ava_item: null,
        custcol_ava_taxcodemapping: null,
        custcol_ava_upccode: null,
        custcol_customernotes: null,
        custcol_expectedqty: '0.0',
        custcol_facilities: null,
        custcol_facilities_display: null,
        custcol_g2_club_number: null,
        custcol_g2_club_number_ref: null,
        custcol_g2_club_numirons_ref: null,
        custcol_g2_clubsinironset: null,
        custcol_g2_condition_ref: null,
        custcol_g2_dexterity: null,
        custcol_g2_dexterity_ref: null,
        custcol_g2_originalexpected: '10.0',
        custcol_misc_item_description: null,
        custcol_po_shaft_material_ref: null,
        custcol_wipfli_club_number_actual: null,
        custcol_wipfli_club_numirons_actual: null,
        custcol_wipfli_club_shaftmatl_actual: null,
        custcol_wipfli_condition_actual: null,
        custcol_wipfli_g2in: null,
        custcol_wipfli_itemvariance: null,
        custcol_wms_actual_rate: null,
        custcol_wms_addedoff: '3020954',
        custcol_wms_addedoff_display: null,
        custcol_wms_childitemgenerator: null,
        custcol_wms_exception: null,
        custcol_wms_hideinwms: null,
        custcol_wms_origg2name: 'Puma All Womens Short Sleeve Golf Shirt',
        custcol_wms_parent_item_lookup: null,
        custcol_wms_parent_item_lookup_display: null,
        custcol_wms_parentitem: null,
        custcol_wms_print_label_line: null,
        custcol_wms_recvnotes: null,
        custcol_wms_replacedby: null,
        custcol_wms_replacedby_display: null,
        customer: null,
        ddistrib: null,
        discline: null,
        dropshiporderhasbeenshiprecv: null,
        dropshipwarningdisplayed: null,
        fulfillable: null,
        generateaccruals: null,
        groupclosed: null,
        groupsetup: null,
        id: null,
        includegroupwrapper: null,
        ingroup: null,
        initoqpbucket: null,
        initquantity: null,
        inventorydetailavail: null,
        isbillable: null,
        isclosed: null,
        isdropshiporderline: null,
        islinefulfilled: null,
        isnoninventory: null,
        isnumbered: null,
        isopen: null,
        isserial: null,
        isspecialorderline: null,
        item: '3027465',
        item_display: null,
        itemhandlingcost: null,
        itempacked: null,
        itempicked: null,
        itemshippingcost: null,
        itemsubtype: null,
        itemtype: null,
        leadtime: null,
        line: null,
        linenumber: null,
        lineuniquekey: null,
        linked: null,
        linkedordbill: null,
        linkedshiprcpt: null,
        location: null,
        locationusesbins: null,
        marginal: null,
        matchbilltoreceipt: null,
        matrixtype: null,
        noprint: null,
        olditemid: null,
        options: null,
        oqpbucket: null,
        origlocation: null,
        origquantity: null,
        origrate: null,
        printitems: null,
        quantity: '2.0',
        quantitybilled: null,
        quantityreceived: null,
        rate: '14.99000000',
        rateschedule: null,
        sys_id: '-11500622448190049',
        sys_parentid: '11500622224636313',
        vendorname: null,
        weightinlb: null
      }
    },
    approvals: {},
    links: {
      'line 1': {
        id: '3550404',
        linktype: 'Receipt/Fulfillment',
        linkurl: '/app/accounting/transactions/itemrcpt.nl?whence=',
        status: null,
        sys_id: '11500622224937257',
        sys_parentid: '11500622224636313',
        total: null,
        trandate: '5/11/2020',
        tranid: '204309',
        type: 'Inventory Receipt'
      },
      'line 2': {
        id: '3550406',
        linktype: 'Receipt/Fulfillment',
        linkurl: '/app/accounting/transactions/itemrcpt.nl?whence=',
        status: null,
        sys_id: '11500622224929466',
        sys_parentid: '11500622224636313',
        total: null,
        trandate: '5/11/2020',
        tranid: '204310',
        type: 'Inventory Receipt'
      },
      'line 3': {
        id: '3550407',
        linktype: 'Receipt/Fulfillment',
        linkurl: '/app/accounting/transactions/itemrcpt.nl?whence=',
        status: null,
        sys_id: '11500622224919696',
        sys_parentid: '11500622224636313',
        total: null,
        trandate: '5/11/2020',
        tranid: '204311',
        type: 'Inventory Receipt'
      }
    },
    expense: {
      currentline: {
        account: '',
        amount: '',
        billableenabled: '',
        category: '',
        categoryexpaccount: '',
        class: '',
        custcol_1_club: 'F',
        custcol_2_club: 'F',
        custcol_3_club: 'F',
        custcol_3h_club: 'F',
        custcol_4_club: 'F',
        custcol_4h_club: 'F',
        custcol_5_club: 'F',
        custcol_5h_club: 'F',
        custcol_6_club: 'F',
        custcol_6h_club: 'F',
        custcol_7_club: 'F',
        custcol_7h_club: 'F',
        custcol_8_club: 'F',
        custcol_9_club: 'F',
        custcol_ava_assetaccount: '',
        custcol_ava_expenseaccount: '',
        custcol_ava_udf1: '',
        custcol_ava_udf2: '',
        custcol_aw_club: 'F',
        custcol_customernotes: '',
        custcol_dw_club: 'F',
        custcol_employee_ref: '',
        custcol_expectedqty: '',
        custcol_facilities: '',
        custcol_g2_brand: '',
        custcol_g2_category: '',
        custcol_g2_club_length: '',
        custcol_g2_club_number: '',
        custcol_g2_club_number_ref: '',
        custcol_g2_club_numirons_ref: '',
        custcol_g2_clubsinironset: '',
        custcol_g2_condition_ref: '',
        custcol_g2_dexterity: '',
        custcol_g2_dexterity_ref: '',
        custcol_g2_itemtype: '',
        custcol_g2_originalexpected: '',
        custcol_g2_shaft_flex_ref: '',
        custcol_gw1_club: 'F',
        custcol_gw2_club: 'F',
        custcol_gw_club: 'F',
        custcol_lw_club: 'F',
        custcol_misc_item_description: '',
        custcol_numshippinglabels: '',
        custcol_po_bounce: '',
        custcol_po_club_grind: '',
        custcol_po_cushin: '',
        custcol_po_finish: '',
        custcol_po_length: '',
        custcol_po_lie: '',
        custcol_po_loft: '',
        custcol_po_model: '',
        custcol_po_ref: '',
        custcol_po_set_makeup: '',
        custcol_po_shaft_material: '',
        custcol_po_shaft_material_ref: '',
        custcol_po_shaftmodel: '',
        custcol_pw_club: 'F',
        custcol_sps_itemnote: '',
        custcol_sps_itemstatus: '',
        custcol_sps_itemstatus2: '',
        custcol_sps_scheduledate2: '',
        custcol_sps_scheduleqty: '',
        custcol_sps_scheduleqty2: '',
        custcol_sps_so_line: '',
        custcol_sps_unitprice: '',
        custcol_sw_club: 'F',
        custcol_uw_club: 'F',
        custcol_w1_club: 'F',
        custcol_w2_club: 'F',
        custcol_wipfli_club_number_actual: '',
        custcol_wipfli_club_numirons_actual: '',
        custcol_wipfli_club_shaftmatl_actual: '',
        custcol_wipfli_condition_actual: '',
        custcol_wipfli_dexterity_actual: '',
        custcol_wipfli_discount_amount: '',
        custcol_wipfli_g2in: '',
        custcol_wipfli_itemvariance:
          "ERROR: Field 'quantityreceived' Not Found",
        custcol_wipfli_parentitemjoin: '',
        custcol_wms_actual_rate: '0',
        custcol_wms_addedoff: '',
        custcol_wms_childitemgenerator: 'F',
        custcol_wms_exception: '',
        custcol_wms_hideinwms: 'F',
        custcol_wms_origg2name: '',
        custcol_wms_parent_item_lookup: '',
        custcol_wms_parentitem: '',
        custcol_wms_price_override: 'F',
        custcol_wms_print_label_line: '',
        custcol_wms_recvnotes: '',
        custcol_wms_replacedby: '',
        customer: '',
        department: '',
        expenseitem: '',
        isbillable: '',
        isclosed: '',
        line: '',
        linked: '',
        location: '',
        memo: '',
        numrules: '',
        sys_id: '-11500622436209214',
        sys_parentid: '11500622224636313',
        '#': '1'
      }
    }
  }
}

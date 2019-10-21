function createItem (itemData) {
  /*
   * { custpage_parent : ,//parent internalid custpage_tranid: ,//tranid for which this item is being created custpage_itemtype: ,//itemType (ie: class) for this
   * item? from parent? }
   */

  // itemData =  {"custpage_parent":"1031140","custpage_tranid":"3322229","custpage_itemtype":"2"}
  var itemid = itemData.custpage_tranid
  var parentInternalId = itemData.custpage_parent
  var originalpo = itemData.custpage_tranid

  var itemFields = search.lookupFields({
    type: search.Type.INVENTORY_ITEM,
    id: parentInternalId,
    columns: [
      'expenseaccount',
      'assetaccount',
      'custitem_g2_itemtype_ref',
      'custitem_g2_name',
      'custitem_g2_brand_ref',
      'custitem_g2_model_ref',
      'custitem_g2_category_ref',
      'baseprice'
    ]
  })

  var newItem = record.create({
    type: search.Type.INVENTORY_ITEM
  })

  newItem.setValue({
    fieldId: 'assetaccount',
    value: itemFields.assetaccount[0].value
  })

  // TODO - hardcoded default of 'Used'
  newItem.setValue({
    fieldId: 'class',
    value: itemData.custpage_itemtype ? itemData.custpage_itemtype : 2
  })

  newItem.setValue({
    fieldId: 'cogsaccount',
    value: itemFields.expenseaccount[0].value
  })

  // copy Brand,Category, Item Type, and Model from Parent
  newItem.setValue({
    fieldId: 'custitem_g2_brand_ref',
    value: itemFields.custitem_g2_brand_ref[0].value
  })

  newItem.setValue({
    fieldId: 'custitem_g2_category_ref',
    value: itemFields.custitem_g2_category_ref[0].value
  })

  newItem.setValue({
    fieldId: 'custitem_g2_itemtype_ref',
    value: itemFields.custitem_g2_itemtype_ref[0].value
  })

  newItem.setValue({
    fieldId: 'custitem_g2_model_ref',
    value: itemFields.custitem_g2_model_ref[0].value
  })

  try {
    newItem.setValue({
      fieldId: 'custitem_g2_name',
      value: itemFields.custitem_g2_name
    })
  } catch (eX) {
    log.error({
      title: 'Error setting field: custitem_g2_name',
      details: JSON.stringify(eX)
    })
  }

  newItem.setValue({
    fieldId: 'custitem_wms_originalpo',
    value: originalpo
  })

  newItem.setValue({
    fieldId: 'custitem_wms_receivingshell',
    value: true
  })

  newItem.setValue({
    fieldId: 'itemid',
    value: 'tmpitem-' + itemid + '-' + Date.now()
  })

  newItem.setValue({
    fieldId: 'parent',
    value: parentInternalId
  })

  newItem.setValue({
    fieldId: 'usebins',
    value: true
  })

  // NG-1146 - store base price of parent on child item when adding an item through WMS
  var basePriceLine = newItem.findSublistLineWithValue({
    sublistId: 'price',
    fieldId: 'pricelevelname',
    value: 'Base Price'
  })

  var msrpLine = newItem.findSublistLineWithValue({
    sublistId: 'price',
    fieldId: 'pricelevelname',
    value: 'MSRP'
  })

  if (basePriceLine != -1 && itemFields.baseprice) {
    newItem.setSublistValue({
      sublistId: 'price',
      fieldId: 'price_1_',
      line: basePriceLine,
      value: itemFields.baseprice
    })

    newItem.setSublistValue({
      sublistId: 'price',
      fieldId: 'price_1_',
      line: msrpLine,
      value: getParentMSRP(parentInternalId)
    })
  } else {
    newItem.setSublistValue({
      sublistId: 'price',
      fieldId: 'price_1_',
      line: basePriceLine,
      value: itemFields.baseprice
    })

    newItem.setSublistValue({
      sublistId: 'price',
      fieldId: 'price_1_',
      line: msrpLine,
      value: getParentMSRP(parentInternalId)
    })
  }

  var newItemId = newItem.save()

  itemData.newItemId = newItemId

  var date = new Date()
  var monthNum = date.getMonth() + 1
  var monthObj = { 10: 'T', 11: 'N', 12: 'D' }
  if (monthNum > 9) {
    monthNum = monthObj[monthNum]
  }

  var newSku =
    'D' +
    newItemId +
    monthNum +
    '-' +
    new Date()
      .getFullYear()
      .toString()
      .substr(-2)

  // 2nd load/save is just for SKU & itemid
  var item = record.load({
    type: record.Type.INVENTORY_ITEM,
    id: newItemId
  })

  item.setValue({
    fieldId: 'custitem_g2_sku',
    value: newSku
  })

  item.setValue({
    fieldId: 'itemid',
    value: newSku
  })

  item.save()

  return itemData
}

function createItem (itemData) {
  /*
   * { custpage_parent : ,//parent internalid custpage_tranid: ,//tranid for which this item is being created custpage_itemtype: ,//itemType (ie: class) for this
   * item? from parent? }
   */
  var itemFields = search.lookupFields({
    type: search.Type.INVENTORY_ITEM,
    id: itemData.custpage_parent,
    columns: [
      'assetaccount',
      'baseprice',
      'expenseaccount',
      'custitem_g2_brand_ref',
      'custitem_g2_category_ref',
      'custitem_g2_itemtype_ref',
      'custitem_g2_model_ref',
      'custitem_g2_name'
    ]
  })

  var newItem = record.create({
    type: search.Type.INVENTORY_ITEM
  })

  // common
  newItem.setValue({
    fieldId: 'assetaccount',
    value: itemFields.assetaccount[0].value
  })

  // common
  newItem.setValue({
    fieldId: 'cogsaccount',
    value: itemFields.expenseaccount[0].value
  })

  // common
  newItem.setValue({
    fieldId: 'itemid',
    value: 'tmpitem-' + itemData.custpage_tranid + '-' + Date.now()
  })

  //copy Item Type,Model, Brand, and Category from Parent

  // TODO - hardcoded default of 'Used'

  // new Item
  newItem.setValue({
    fieldId: 'class',
    value: itemData.custpage_itemtype ? itemData.custpage_itemtype : 2
  })

  // common
  newItem.setValue({
    fieldId: 'custitem_g2_brand_ref',
    value: itemFields.custitem_g2_brand_ref[0].value
  })

  // common
  newItem.setValue({
    fieldId: 'custitem_g2_category_ref',
    value: itemFields.custitem_g2_category_ref[0].value
  })

  // common
  newItem.setValue({
    fieldId: 'custitem_g2_itemtype_ref',
    value: itemFields.custitem_g2_itemtype_ref[0].value
  })

  // common
  newItem.setValue({
    fieldId: 'custitem_g2_model_ref',
    value: itemFields.custitem_g2_model_ref[0].value
  })

  // common
  newItem.setValue({
    fieldId: 'custitem_g2_name',
    value: itemFields.custitem_g2_name
  })

  // new
  newItem.setValue({
    fieldId: 'custitem_wms_originalpo',
    value: itemData.custpage_tranid
  })

  // common
  newItem.setValue({
    fieldId: 'custitem_wms_receivingshell',
    value: true
  })

  // new
  newItem.setValue({
    fieldId: 'parent',
    value: itemData.custpage_parent
  })

  // common
  newItem.setValue({
    fieldId: 'usebins',
    value: true
  })

  //NG-1146 - store base price of parent on child item when adding an item through WMS
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

  var parentInternalId = itemData.custpage_parent

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
      value: getParentMSRP(itemData.custpage_parent)
    })
  }

  var newItemId = newItem.save()

  itemData.newItemId = newItemId

  var newSku = generateNewSku(newItemId)

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

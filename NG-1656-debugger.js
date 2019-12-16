require(['N/search', 'N/record'], function (search, record) {
  var replacementItemRecord = record.load({
    type: record.Type.INVENTORY_ITEM,
    id: 41285,
    isDynamic: true
  })

  var categoryTypeValue = replacementItemRecord.getValue({
    fieldId: 'custitem_g2_category_ref'
  })

  var categoryTypeText = replacementItemRecord.getText({
    fieldId: 'custitem_g2_category_ref'
  })

  var categoryRecord = record.load({
    type: 'customrecord_g2_category',
    id: categoryTypeValue
  })

  var newProductAttributesValue = categoryRecord.getValue({
    fieldId: 'custrecord_g2_category_newprodatt_refs'
  })

  var newProductAttributesText = categoryRecord.getText({
    fieldId: 'custrecord_g2_category_newprodatt_refs'
  })

  var replacementItemRecordFields = replacementItemRecord.getFields()

  var clubColorField = replacementItemRecord.getField({
    fieldId: 'custitem_g2_club_color_ref'
  })

  log.debug('much stuff:newProductAttributes', newProductAttributesText)

  var clubColorFieldSelections = clubColorField.getSelectOptions({
    filter: 's',
    operator: 'contains'
  })

  // Îget custitem_g2_club_color_ref

  log.debug('much stuff:newProductAttributes', newProductAttributesText)
})

clubColorField.getSelectOptions({ filter: '' })

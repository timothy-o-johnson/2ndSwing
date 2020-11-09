var poLine = JSON.parse(context.value)
log.debug('poLineObj', JSON.stringify(poLine))
var poId = poLine.id
var originalpo = poId
var itemid = poLine.id

var poType = search.lookupFields({
  type: search.Type.PURCHASE_ORDER,
  id: poId,
  columns: ['class']
})

log.debug('starting PO', context.value)

var parentItem = poLine.values.item[0].value
// NG-1387 child items inherit MSRP from parent
var parentMSRP = getParentMSRP(parentItem)
var line = poLine.values.lineuniquekey
var qty = poLine.values.quantity
var basePrice = poLine.values['item.baseprice']
// NG-1111 adding expected condition on child items generated
var expectedCondition = poLine.values.custcol_g2_condition_ref[0].value
log.debug('expected condition', expectedCondition)

var lines = []

log.debug('parentItem', parentItem)
log.debug('parentMSRP', parentMSRP)
log.debug('basePrice', basePrice)
// VF script parameter for Item Type Golf Clubs
var golfClubs = runtime.getCurrentScript().getParameter({
  name: 'custscript_wms_golf_club_item_type'
})

// NG 1384 - if item is one of these types, break out into individual children with quantity 1
var categoryForIndvidualChild = [
  'Junior Golf Shoe',
  'Mens Golf Shoe',
  'Mens Golf Sandal',
  'Womens Golf Shoe'
]

var parentInternalId = poLine.values.item[0].value

// NG-1387- TJ for each PO line createItem

do {
  try {
    // expenseaccount *is* cogsaccount

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
        'custitem_g2_category_ref'
      ]
    })

    log.debug('category', itemFields.custitem_g2_category_ref[0].text)

    // TODO: hard coded item type ref and class(transaction header 'item
    // type')
    // we bypass excess execution by dropping the qty down.
    // reduce won't check item type, just the number of
    // child items created per original line
    if (
      (poType != null &&
        poType.class != null &&
        poType.class.hasOwnProperty('value') &&
        poType.class[0] != null &&
        poType.class[0].value == 3) ||
      (itemFields != null &&
        itemFields.custitem_g2_itemtype_ref != null &&
        itemFields.custitem_g2_itemtype_ref[0] != null &&
        (itemFields.custitem_g2_itemtype_ref[0].value != golfClubs &&
          categoryForIndvidualChild.indexOf(
            itemFields.custitem_g2_category_ref[0].text
          ) == -1))
    ) {
      qty = 0
    }

    log.debug('demark', 'postsearch ' + JSON.stringify(itemFields))

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
      value: poType.class.hasOwnProperty('value') ? poType.class[0].value : 2
    })

    newItem.setValue({
      fieldId: 'cogsaccount',
      value: itemFields.expenseaccount[0].value
    })

    try {
      newItem.setValue({
        fieldId: 'custitem_g2_brand_ref',
        value: itemFields.custitem_g2_brand_ref[0].value
      })
    } catch (eX) {
      log.error({
        title: 'Error setting field: custitem_g2_brand_ref',
        details: JSON.stringify(eX)
      })
    }

    try {
      newItem.setValue({
        fieldId: 'custitem_g2_category_ref',
        value: itemFields.custitem_g2_category_ref[0].value
      })
    } catch (eX) {
      log.error({
        title: 'Error setting field: custitem_g2_category_ref',
        details: JSON.stringify(eX)
      })
    }

    // NG-1111 adding expected condition to child items
    try {
      newItem.setValue({
        fieldId: 'custitem_g2_condition_ref',
        value: expectedCondition
      })
    } catch (eX) {
      log.error({
        title: 'Error setting field: custitem_g2_condition_ref',
        details: JSON.stringify(eX)
      })
    }

    try {
      newItem.setValue({
        fieldId: 'custitem_g2_itemtype_ref',
        value: itemFields.custitem_g2_itemtype_ref[0].value
      })
    } catch (eX) {
      log.error({
        title: 'Error setting field: custitem_g2_itemtype_ref',
        details: JSON.stringify(eX)
      })
    }

    try {
      newItem.setValue({
        fieldId: 'custitem_g2_model_ref',
        value: itemFields.custitem_g2_model_ref[0].value
      })
    } catch (eX) {
      log.error({
        title: 'Error setting field: custitem_g2_model_ref',
        details: JSON.stringify(eX)
      })
    }
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
      fieldId: 'istaxable',
      value: true
    })

    newItem.setValue({
      fieldId: 'itemid',
      value: 'tmpitem-' + itemid + '-' + Date.now()
    })

    newItem.setValue({
      fieldId: 'parent',
      value: parentItem
    })

    newItem.setValue({
      fieldId: 'usebins',
      value: true
    })

    // try {
    //   newItem.setValue({
    //     fieldId: 'custitem_g2_brand_ref',
    //     value: itemFields.custitem_g2_brand_ref[0].value
    //   })
    // } catch (eX) {
    //   log.error({
    //     title: 'Error setting field: custitem_g2_brand_ref',
    //     details: JSON.stringify(eX)
    //   })
    // }

    // try {
    //   newItem.setValue({
    //     fieldId: 'custitem_g2_category_ref',
    //     value: itemFields.custitem_g2_category_ref[0].value
    //   })
    // } catch (eX) {
    //   log.error({
    //     title: 'Error setting field: custitem_g2_category_ref',
    //     details: JSON.stringify(eX)
    //   })
    // }

    // // NG-1111 adding expected condition to child items
    // try {
    //   newItem.setValue({
    //     fieldId: 'custitem_g2_condition_ref',
    //     value: expectedCondition
    //   })
    // } catch (eX) {
    //   log.error({
    //     title: 'Error setting field: custitem_g2_condition_ref',
    //     details: JSON.stringify(eX)
    //   })
    // }

    // try {
    //   newItem.setValue({
    //     fieldId: 'custitem_g2_itemtype_ref',
    //     value: itemFields.custitem_g2_itemtype_ref[0].value
    //   })
    // } catch (eX) {
    //   log.error({
    //     title: 'Error setting field: custitem_g2_itemtype_ref',
    //     details: JSON.stringify(eX)
    //   })
    // }

    // try {
    //   newItem.setValue({
    //     fieldId: 'custitem_g2_model_ref',
    //     value: itemFields.custitem_g2_model_ref[0].value
    //   })
    // } catch (eX) {
    //   log.error({
    //     title: 'Error setting field: custitem_g2_model_ref',
    //     details: JSON.stringify(eX)
    //   })
    // }

    // add base and MSRP price now
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

    if (basePriceLine != -1 && basePrice != '' && basePrice != undefined) {
      log.debug('setting base price for item: ' + context.value, basePrice)
      newItem.setSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: basePriceLine,
        value: basePrice
      })

      log.debug('setting MSRP for item: ' + context.value, parentMSRP)
      newItem.setSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: msrpLine,
        value: parentMSRP
      })
    }

    var newItemId = newItem.save()

    log.debug({
      title: 'item created!',
      details: newItemId + ' <<<'
    })

    // NG-1111 moving code to update the item name in Map
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

    record.submitFields({
      type: search.Type.INVENTORY_ITEM,
      id: newItemId,
      values: {
        custitem_g2_sku: newSku,
        itemid: newSku
      },
      options: {
        enableSourcing: false,
        ignoreMandatoryFields: true
      }
    })

    lines.push(newItemId)
  } catch (e) {
    log.debug({
      title: 'error!',
      details: JSON.stringify(e)
    })
  }
  qty--
} while (qty > 0)

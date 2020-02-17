require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD BELOW
  // ADD BELOW
  // ADD BELOW

  var poLine = {
    recordType: 'purchaseorder',
    id: '2047088',
    values: {
      lineuniquekey: '6723264',
      item: [{ value: '984711', text: 'SPIDER X COPPER HCP' }],
      quantity: '1',
      'item.baseprice': '19.99',
      custcol_g2_condition_ref: [{ value: 0 }]
    }
  }

  var itemData = {
    custpage_parent: '30897',
    custpage_tranid: '3478837',
    custpage_itemtype: '2',
    isChildItem: true,
    poType: {
      class: [{ value: '10', text: '400 Used : 400-02 - Store Widget' }]
    },
    poId: 3417155,
    golfClubs: 2, // qty
    expectedCondition: '',
    parentItem: poLine.values.item[0].value,
    categoryForIndvidualChild: [3], // qty
    // basePrice: poLine.values['item.baseprice'], // poLine.values['item.baseprice']
    // parentMSRP: 50 //getParentMSRP(parentItem)
  }

  var poLine = {
    recordType: 'purchaseorder',
    id: '2047088',
    values: {
      lineuniquekey: '6723264',
      item: [{ value: '984711', text: 'SPIDER X COPPER HCP' }],
      quantity: '1',
      'item.baseprice': '19.99',
      custcol_g2_condition_ref: [{ value: 0 }]
    }
  }

  var golfClubs = itemData.golfClubs
  var poType = itemData.poType
  var poId = itemData.poId
  var parentItem = poLine.values.item[0].value
  var expectedCondition = poLine.values.custcol_g2_condition_ref[0].value
  var categoryForIndvidualChild = itemData.categoryForIndvidualChild
  var basePrice = poLine.values['item.baseprice']
  var parentMSRP = itemData.parentMSRP

  try {
    // expenseaccount *is* cogsaccount

    var itemFields = search.lookupFields({
      type: search.Type.INVENTORY_ITEM,
      id: parentItem,
      columns: [
        'assetaccount',
        'expenseaccount',
        'custitem_g2_brand_ref',
        'custitem_g2_category_ref',
        'custitem_g2_itemtype_ref',
        'custitem_g2_model_ref',
        'custitem_g2_name'
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
        itemFields.custitem_g2_itemtype_ref[0].value != golfClubs &&
        categoryForIndvidualChild.indexOf(
          itemFields.custitem_g2_category_ref[0].text
        ) == -1)
    ) {
      qty = 0
    }

    log.debug('demark', 'postsearch ' + JSON.stringify(itemFields))

    var itemData2 = {
        custpage_parent: parentItem,
        custpage_tranid: poId,
        isChildItem: true,
        poType: poType,
        poLine: poLine,
        poId: poId,
        expectedCondition: '',
        parentItem: poLine.values.item[0].value,
        basePrice: poLine.values['item.baseprice']
        // categoryForIndvidualChild: [3], // qty
        // golfClubs: 2, // qty
        //parentMSRP: 50 //getParentMSRP(parentItem)
    }

    var newItemId = itemHelper.createItem(itemData2).newItemId

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
      '-' +
      monthNum +
      date
        .getFullYear()
        .toString()
        .substr(-2) +
      newItemId

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

  /// ADD ABOVE
  /// ADD ABOVE
  /// ADD ABOVE
})

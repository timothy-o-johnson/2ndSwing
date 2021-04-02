// NG-xxxx debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js',
  'N/ui/serverWidget'
], function (
  search,
  record,
  ssLib,
  searchHelpers,
  itemHelper,
  file,
  globals,
  sw
) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW
  //
  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2507 debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js',
  'N/ui/serverWidget'
], function (
  search,
  record,
  ssLib,
  searchHelpers,
  itemHelper,
  file,
  globals,
  sw
) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW
  //

  var transactionSearchObj = search.create({
  type: 'transaction',
  filters: [
    ['name', 'anyof', '455322'],
    'AND',
    [
      ['item.internalidnumber', 'equalto', '1217846'],
      'OR',
      ['item.internalidnumber', 'equalto', '1217847']
    ],
    'AND',
    'NOT',
    ['type', 'anyof', 'Journal']
  ],
  columns: [
    search.createColumn({ name: 'type', label: 'Type' }),
  ]
  })
  
var searchResultCount = transactionSearchObj.runPaged().count
log.debug('transactionSearchObj result count', searchResultCount)
transactionSearchObj.run().each(function (result) {
  // .run().each has a limit of 4,000 results
  return true
})

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})


require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js',
  'N/ui/serverWidget'
], function (
  search,
  record,
  ssLib,
  searchHelpers,
  itemHelper,
  file,
  globals,
  sw
) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

    var openPurchaseOrdersSearchObj = ssLib.getOpenOrdersSearchObj()

    var openPOsCount = openPurchaseOrdersSearchObj.runPaged().count

    log.debug('openPOsCount', openPOsCount
)

    
  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2230 debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js',
  'N/ui/serverWidget'
], function (
  search,
  record,
  ssLib,
  searchHelpers,
  itemHelper,
  file,
  globals,
  sw
) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  // check if parent, otherwise jump up

  var itemId = 9261763
  var itemType = 'inventoryitem'

  var itemRec = record.load({
    type: itemType,
    id: itemId
  })

  var imageGallerySubTab = itemRec.addSubtab({
    id: 'custpage_image_gallery_subtab',
    label: 'Image Gallery'
  })

  log.debug(itemRec)

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2188 debugger
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js'
], function (search, record, ssLib, searchHelpers, itemHelper, file, globals) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2196 debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js'
], function (search, record, ssLib, searchHelpers, itemHelper, file, globals) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var scriptContext = {}

  var recObj = record.load({
    type: 'purchaseorder',
    id: 10460503
  })

  scriptContext.newRecord = recObj

  afterSubmit(scriptContext)

  function afterSubmit (scriptContext) {
    try {
      var recObj = scriptContext.newRecord
      var recType = recObj.type
      var recId = recObj.id

      var itemsObj = getActualTotalAndTotalDiscounts(recObj)

      var actualTotal = itemsObj.actualTotal
      var totalDiscount = itemsObj.totalDiscount
      var totalVariance = itemsObj.summaryItemVariance

      actualTotal = updateWithExpenses(actualTotal, recObj)

      actualTotal += totalDiscount

      log.debug('itemsObj', itemsObj)
      log.debug(
        'actual total after expenses & discounts',
        actualTotal.toFixed(2)
      )

      var idAfterSubmit = record.submitFields({
        type: recType,
        id: recId,
        values: {
          custbody_wipfli_povariance: totalVariance.toFixed(2),
          custbody_wf_actual_amount: actualTotal.toFixed(2)
        }
      })

      log.debug('id after submit', idAfterSubmit)
    } catch (e) {
      log.error('error during variance set', e)
    }

    return
    function getActualTotalAndTotalDiscounts (recObj) {
      var itemsObj = {
        actualTotal: 0,
        summaryItemVariance: 0,
        totalDiscount: 0
      }

      var actualSubtotal,
        expectedSubtotal,
        lineVariance = 0

      var itemLines = recObj.getLineCount({
        sublistId: 'item'
      })

      for (var line = 0; line < itemLines; line++) {
        var itemText = getSublistText('item', line)
        var itemType = getSublistValue('itemtype', line)
        var isDiscountItem = itemType === 'Discount'

        // log.debug('item text', itemText)

        var itemTextArray = itemText.split(':')
        var isParent = itemTextArray.length == 1
        // log.debug('isChild', isChild)

        if (isParent || !isDiscountItem) {
          continue
        }

        var expectedQuantity = getSublistValue('custcol_expectedqty', line)
        var rate = getSublistValue('rate', line)
        var actualRate = getSublistValue('custcol_wms_actual_rate', line)
        var receivedQuantity = getSublistValue('quantityreceived', line)

        itemsObj.totalDiscount += getDiscountAmount(isDiscountItem)

        actualSubtotal = actualRate * receivedQuantity
        itemsObj.actualTotal += actualSubtotal

        expectedSubtotal = expectedQuantity * rate
        lineVariance = actualSubtotal - expectedSubtotal

        log.debug('getActualTotalAndTotalDiscounts(): itemsObj', itemsObj)

        log.debug('line variance', lineVariance)

        itemsObj.summaryItemVariance += lineVariance
      }

      return itemsObj

      function getSublistValue (fieldId, line) {
        var sublistValue = recObj.getSublistValue({
          sublistId: 'item',
          fieldId: fieldId,
          line: line
        })

        return sublistValue
      }

      function getSublistText (fieldId, line) {
        var sublistText = recObj.getSublistText({
          sublistId: 'item',
          fieldId: fieldId,
          line: line
        })

        return sublistText
      }

      function getDiscountAmount (isDiscountItem) {
        var discount = 0

        if (isDiscountItem) {
          receivedQuantity = receivedQuantity > 0 ? receivedQuantity : 1

          discount = rate * receivedQuantity
        }

        return discount
      }
    }

    function updateWithExpenses (actualTotal, recObj) {
      var newTotal = actualTotal

      var expenseLines = recObj.getLineCount({
        sublistId: 'expense'
      })

      for (var i = 0; i < expenseLines; i++) {
        var currAmount = recObj.getSublistValue({
          sublistId: 'expense',
          fieldId: 'amount',
          line: i
        })

        newTotal += currAmount
      }

      return newTotal
    }
  }
  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2079 debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file',
  '/SuiteScripts/LIB_Globals.js'
], function (search, record, ssLib, searchHelpers, itemHelper, file, globals) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  // var mrScriptId = 'customscript_wms_mr_update_child_item_sp'
  // var options = {}

  // globals.startAndMonitorMRScript(context, mrScriptId, options)

  var itemId = 9261763
  var itemType = 'inventoryitem'
  var allFields = {}

  itemValues = search.lookupFields({
    id: itemId,
    type: search.Type.ITEM,
    columns: [
      'itemid',
      'class',
      'custitem_g2_category_ref',
      'custitem_g2_itemtype_ref',
      'custitem_sales_description',
      'custitem_g2_condition_ref',

      // parent item values
      'parent',
      'parent.itemid',
      'parent.custitem_g2_category_ref',
      'parent.custitem_g2_itemtype_ref',
      'parent.custitem_g2_sku'
    ]
  })

  log.debug('itemValues', itemValues)

  allFields.conditionTextSearch =
    itemValues['custitem_g2_condition_ref'][0].text

  // check if parent, otherwise jump up
  var itemRec = record.load({
    type: itemType,
    id: itemId
  })

  var parent = itemRec.getValue({
    fieldId: 'parent'
  })

  allFields.conditionText = itemRec.getText({
    fieldId: 'custitem_g2_condition_ref'
  })

  log.debug('allfields', allFields)

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1968 debugger
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file'
], function (search, record, ssLib, searchHelpers, itemHelper, file) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW
  //

  var categoryId = 9
  var fieldLookUp = search.lookupFields({
    type: 'customrecord_g2_category',
    id: categoryId,
    columns: ['custrecord_bidpriceattribute_refs']
  })

  log.debug(fieldLookUp)

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2009- remaining quantity to be received

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file'
], function (search, record, ssLib, searchHelpers, itemHelper, file) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var poRecId = 3593580 // 3593580 | D-5203037365 | 10610101
  var parentItemSku = 'D-5203037365'
  var uniqueLine = 10610101

  getQuantityReceivedObj(poRecId, parentItemSku, uniqueLine)

  function getQuantityReceivedObj (poRecId, parentItemSku, uniqueLine) {
    var quantityReceivedObj = {
      closed: 0,
      junk: 0,
      multiSku: 0,
      traditional: 0,
      upc: 0,
      totalExpected: 0,
      totalReceived: 0,
      totalRemaining: 0
    }

    var poRec = record.load({
      type: 'purchaseorder',
      id: poRecId
    })

    var isClosed,
      isJunk,
      isMultiSku,
      isParentCriteria1,
      isParentCriteria2,
      isTraditional,
      isUpc,
      isChildMatch,
      quantity,
      totalExpected,
      totalReceived

    var lineCount = poRec.getLineCount({
      sublistId: 'item'
    })

    for (var i = 0; i < lineCount; i++) {
      isChildMatch =
        getSublistValue(poRec, 'custcol_wms_addedoff_display', i).indexOf(
          parentItemSku
        ) !== -1

      isParentCriteria1 =
        getSublistValue(poRec, 'custcol_ava_item', i).indexOf(parentItemSku) !==
        -1
      isParentCriteria2 =
        getSublistValue(poRec, 'lineuniquekey', i).indexOf(uniqueLine) !== -1

      isParentMatch = isParentCriteria1 && isParentCriteria2

      if (isParentMatch) {
        quantityReceivedObj['totalExpected'] = getSublistValue(
          poRec,
          'custcol_expectedqty',
          i
        )
      }

      if (isChildMatch) {
        quantity = getSublistValue(poRec, 'quantityreceived', i)

        isClosed = getSublistValue(poRec, 'isclosed', i)
        isJunk = getSublistValue(poRec, 'custcol_junk_sku_created', i)
        isUpc = getSublistValue(poRec, 'custcol_upc_created', i)
        isMultiSku = getSublistValue(poRec, 'custcol_multi_sku_created', i)

        isTraditional = !isClosed && !isJunk && !isMultiSku && !isUpc

        quantityReceivedObj['closed'] += isClosed ? quantity : 0
        quantityReceivedObj['junk'] += isJunk ? quantity : 0
        quantityReceivedObj['multiSku'] += isMultiSku ? quantity : 0
        quantityReceivedObj['traditional'] += isTraditional ? quantity : 0
        quantityReceivedObj['upc'] += isUpc ? quantity : 0
      }
    }

    quantityReceivedObj['totalReceived'] =
      quantityReceivedObj['junk'] +
      quantityReceivedObj['multiSku'] +
      quantityReceivedObj['traditional'] +
      quantityReceivedObj['upc']

    totalReceived = quantityReceivedObj['totalReceived']
    totalExpected = quantityReceivedObj['totalExpected']

    quantityReceivedObj['totalRemaining'] = totalExpected - totalReceived

    // custcol_ava_item:"D-5203027765"
    // custcol_expectedqty:"10"
    // lineuniquekey:"10495254"

    log.debug('getQuantityReceived():quantityReceivedObj', quantityReceivedObj)

    return quantityReceivedObj

    function getSublistValue (poRec, fieldId, line) {
      var value = poRec.getSublistValue({
        sublistId: 'item',
        fieldId: fieldId,
        line: line
      })

      return value
    }
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-2008- display sku stats debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper',
  'N/file'
], function (search, record, ssLib, searchHelpers, itemHelper, file) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  function updateItemStatus (editLine, sku) {
    var folderId
    // var statusFileId = editLine.getScriptParameter( 'custscript_wms_status_update')
    var statusFileId = 157509

    log.debug('statusFileId (START): ', statusFileId)
    var statusText = ''
    var number

    var statusFile = file.load({
      id: statusFileId
    })

    var statusFileContents = statusFile.getContents()

    statusFileContents = JSON.parse(statusFileContents)

    log.debug('statusFileContents', statusFileContents)
    log.debug('typeof statusFileContents', typeof statusFileContents)

    statusFileContents = JSON.parse(statusFileContents)

    log.debug('statusFileContents', statusFileContents)
    log.debug('typeof statusFileContents', typeof statusFileContents)

    log.debug('statusFileContents.items', statusFileContents.items)
    log.debug(
      'typeof statusFileContents.items',
      typeof statusFileContents.items
    )

    statusFileContents.items.push(sku)

    statusFileContents.items.forEach(function (item, index) {
      number = index + 1
      statusText += number + ') ' + item + ' - COMPLETED \n'
    })

    statusFileContents.statusText = statusText
    folderId = statusFileContents.folderId

    log.debug('statusFileContents', statusFileContents)

    statusFileId = editLine.saveDataToFile(
      JSON.stringify(statusFileContents),
      folderId,
      'mr-script-data'
    )

    log.debug('statusFileId (AFTER): ', statusFileId)
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1965 debugger
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var orderRec = record.load({
    type: 'purchaseorder',
    id: 3550611
  })

  var params = {
    custpage_total_quantity_check_formattedValue: '5',
    custpage_fielddata_has_changed: 'F',
    nlloc: '4',
    nlsub: '1',
    _button: '',
    custpage_attr_field_custitem_g2_top_style_ref: '',
    nsapiFC: '',
    wfVF: '',
    nlapiVF: '',
    nlapiRC: '',
    custpage_attr_field_custitem_g2_top_size_ref: '',
    externalid: '',
    _eml_nkey_: '0',
    nlapiVI: '',
    type: 'suitescriptform',
    nlapiVD: '',
    deploy: '1',
    nsapiRC: '',
    customwhence: '',
    nsapiVF: '',
    custpage_total_quantity_check: '10',
    nsapiVD: '',
    nlapiVL: '',
    nsbrowserenv: 'istop=T',
    custpage_attr_field_custitem_g2_freenotes: '',
    custpage_attr_fields: [
      'custpage_attr_field_custitem_g2_freenotes',
      'custpage_attr_field_custitem_g2_styleno',
      'custpage_attr_field_custitem_g2_top_color_ref',
      'custpage_attr_field_custitem_g2_top_gender_ref',
      'custpage_attr_field_custitem_g2_top_pattern_ref',
      'custpage_attr_field_custitem_g2_top_size_ref',
      'custpage_attr_field_custitem_g2_top_style_ref'
    ],
    id: '',
    nsapiVL: '',
    nlapiFC: '',
    nsapiVI: '',
    custpage_close_line: 'T',
    custpage_repitemname: 'PUMA W SSS : D-5203027564',
    custpage_attr_field_custitem_g2_top_gender_ref: '',
    wfPS: '',
    custpage_isapparelitem: 'T',
    entryformquerystring:
      'script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:3550611:inventoryitem:3027564:10495253&custpage_repitem=3027564&custpage_multipleskus=T&custpage_isapparelitem=T',
    custpage_quantity_expected: '10',
    custpage_fielddata_object: [
      'custcol_g2_condition_ref:custpage_eia_fielddata_430:5'
    ],
    script: '39',
    custpage_psku: 'PUMA W SSS',
    custpage_psku_send: 'PUMA W SSS',
    custpage_location: '4',
    submitted: 'T',
    _multibtnstate_: '',
    custpage_repitem: '3027564',
    selectedtab: '',
    wfPI: '',
    nlapiSR: '',
    custpage_bidprice: '14.99',
    custpage_cachekey: 'purchaseorder:3550611:inventoryitem:3027564:10495253',
    custpage_attr_field_attribute_obj: {
      custitem_g2_freenotes: { label: 'FreeNotes', value: '' },
      custitem_g2_styleno: { label: 'Style Number', value: '' },
      custitem_g2_top_color_ref: { label: 'Top Color', value: '104' },
      custitem_g2_top_gender_ref: { label: 'Top Gender', value: '' },
      custitem_g2_top_pattern_ref: { label: 'Top Pattern', value: '' },
      custitem_g2_top_size_ref: { label: 'Top Size', value: '' },
      custitem_g2_top_style_ref: { label: 'Top Style', value: '' }
    },
    submitter: 'Save',
    wfinstances: '',
    custpage_cancel_line: 'F',
    custpage_cancel_line_send: 'F',
    nsapiLI: '',
    custpage_attributionurl:
      '/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:3550611:inventoryitem:3027564:10495253&custpage_repitem=3027564',
    custpage_number_of_skus: '2',
    nsapiPS: '',
    custpage_multipleskus: 'T',
    nsapiCT: '1589394652205',
    nlapiPI: '',
    nluser: '1269484',
    custpage_notes: 'D-5203027564; [4, 1] ; close',
    nldept: '0',
    custpage_number_of_skus_formattedValue: '2',
    nsapiPI: '',
    clickedback: '',
    wfSR: '',
    nsapiLC: '',
    nlapiPS: '',
    nlapiLI: '',
    custpage_close_line_send: '',
    nsapiPD: '',
    custpage_attr_field_custitem_g2_styleno: '',
    nsapiSR: '',
    custpage_attr_field_custitem_g2_top_pattern_ref: '',
    whence:
      '/app/site/hosting/scriptlet.nl?script=478&deploy=1&compid=4537321_SB1&custpage_parent=48635&custpage_tranid=3550611&custpage_itemtype=2&custpage_itemtype=2&custpage_cachekey=purchaseorder:3550611:inventoryitem:3027564:10495253&custpage_condition=5&custpage_rate=14.99&custpage_sku=%20D-5203027564&custpage_item_id=3027564',
    custpage_gsv_guid: 'c7e07275-40d7-4fef-a18e-80a10e946ed4',
    nlrole: '3',
    custpage_quantity_expected_send: '10',
    _csrf:
      'PBnjEixWHcvh2aAEqVeGr8_yr05kz54jfjXxXWHOJBx40nyyK38QnKjdWuTUKjWgPGcY87BFivz1jA3Fl4dw8ga5Tkk6_FFs0mfh3QrrpuiiEHBTXZOUqsw7G7B5jLrNHXHzllAhDtAVKNBTnh4iOnesjWxfWj3kwDzqRJPo9s0=',
    custpage_quantity_received: '5',
    formdisplayview: 'DETAIL_VIEW',
    inpt_custpage_eia_fielddata_430: 'New',
    custpage_eia_fielddata_430: '5',
    custpage_quantity_received_formattedValue: '5',
    wfFC: '',
    custpage_attr_field_orig_attribute_obj: {
      custitem_g2_freenotes: { label: 'FreeNotes', value: '' },
      custitem_g2_styleno: { label: 'Style Number', value: '' },
      custitem_g2_top_color_ref: { label: 'Top Color', value: '104' },
      custitem_g2_top_gender_ref: { label: 'Top Gender', value: '' },
      custitem_g2_top_pattern_ref: { label: 'Top Pattern', value: '' },
      custitem_g2_top_size_ref: { label: 'Top Size', value: '' },
      custitem_g2_top_style_ref: { label: 'Top Style', value: '' }
    },
    custpage_attr_field_custitem_g2_top_color_ref: '104',
    apparelsku1: '1',
    apparelsku0: '4'
  }

  var lineSku, prevHideInWmsValue, lineSkuStringified, lineSkuText, lineSkuValue

  var originalItemSKU = params['custpage_repitemname']
    .split(':')
    .pop()
    .trim()

  // Why does this return -1 ??
  var itemLine = orderRec.findSublistLineWithValue({
    sublistId: 'item',
    fieldId: 'custcol_ava_item',
    value: originalItemSKU
  })

  var hideinwmsValue = orderRec.getSublistValue({
    sublistId: 'item',
    line: itemLine,
    fieldId: 'custcol_wms_hideinwms'
  })

  orderRec.setSublistValue({
    sublistId: 'item',
    line: itemLine,
    fieldId: 'custcol_wms_hideinwms',
    value: false
  })

  var lines = orderRec.getLineCount({
    sublistId: 'item'
  })

  log.debug(
    'originalItemSKU | typeof originalItemSKU',
    originalItemSKU + '|' + typeof originalItemSKU
  )

  for (var i = 0; i < lines; i++) {
    lineSkuText = orderRec.getSublistText({
      sublistId: 'item',
      line: i,
      fieldId: 'custcol_ava_item'
    })

    lineSkuValue = orderRec.getSublistValue({
      sublistId: 'item',
      line: i,
      fieldId: 'custcol_ava_item'
    })

    lineSkuStringified = JSON.parse(JSON.stringify(lineSkuText))

    log.debug(
      'line #' + i + ': lineSkuText | typeof lineSkuText',
      lineSkuText + '|' + typeof lineSkuText
    )
    log.debug(
      'line #' + i + ': lineSkuValue | typeof lineSkuValue',
      lineSkuValue + '|' + typeof lineSkuValue
    )
    log.debug(
      'line #' + i + ': lineSkuStringified | typeof lineSkuStringified',
      lineSkuStringified + '|' + typeof lineSkuStringified
    )

    log.debug(
      'isEqual(originalItemSKU, lineSkuText)',
      isEqual(originalItemSKU, lineSkuText)
    )
    log.debug(
      'isEqual(originalItemSKU, lineSkuStringified)',
      isEqual(originalItemSKU, lineSkuStringified)
    )
    log.debug(
      'isEqual(originalItemSKU, lineSkuValue)',
      isEqual(originalItemSKU, lineSkuValue)
    )

    if (originalItemSKU === lineSkuText) {
      prevHideInWmsValue = orderRec.getSublistValue({
        sublistId: 'item',
        line: i,
        fieldId: 'custcol_wms_hideinwms'
      })

      log.debug('line #' + i + ': prevHideInWmsValue', prevHideInWmsValue)

      orderRec.setSublistValue({
        sublistId: 'item',
        line: itemLine,
        fieldId: 'custcol_wms_hideinwms',
        value: false
      })
    }
  }

  function isEqual (str1, str2) {
    return str1.toUpperCase() == str2.toUpperCase()
  }

  log.debug(hideinwmsValue)
  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1946 debugger

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var vendor
  var rec = record.load({
    type: 'purchaseorder',
    id: 3520408
  })

  var lines = rec.getLineCount({
    sublistId: 'item'
  })

  var itemId
  for (var i = 0; i < lines; i++) {
    itemId = rec.getSublistValue({
      sublistId: 'item',
      fieldId: 'item',
      line: i
    })

    lookupFields = search.lookupFields({
      type: 'inventoryitem',
      id: '37344',
      columns: ['vendor']
    })

    vendor = lookupFields.vendor[0].value

    log.debug('vendor', vendor)

    rec.setSublistValue({
      sublistId: 'item',
      fieldId: 'vendorname',
      value: vendor,
      line: i
    })

    // rec.setSublistValue({
    //   sublistId: 'item',
    //   fieldId: 'vendorname',
    //   value: vendor,
    //   line: i
    // })
  }

  var confirmation = rec.save({
    enableSourcing: true,
    ignoreMandatoryFields: true
  })

  log.debug(confirmation)
  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1919
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  getGCNumbers(36598, {})

  function getGCNumbers (customerId, gcDataFromInvoice) {
    log.audit(
      'getGCNumbers(): customerId, gcDataFromInvoice',
      customerId + '/ ' + gcDataFromInvoice
    )

    var gcNumbers = []
    var uniqueGiftCertNumbers = {}
    var TYPE = {
      Invoice: 'invoice',
      'Sales Order': 'salesorder'
    }

    var transactionSearchObj = search.create({
      type: 'transaction',
      filters: [
        ['item', 'anyof', '1217845', '1217846', '1217847'],
        'AND',
        ['name', 'anyof', customerId]
      ],
      columns: [
        search.createColumn({
          name: 'trandate',
          summary: 'GROUP'
        }),
        search.createColumn({
          name: 'type',
          summary: 'GROUP'
        }),
        search.createColumn({
          name: 'entity',
          summary: 'GROUP'
        }),
        search.createColumn({
          name: 'custcol_gc_no',
          summary: 'GROUP',
          sort: search.Sort.ASC
        }),
        search.createColumn({
          name: 'custbody_gc_no',
          summary: 'GROUP'
        }),
        search.createColumn({
          name: 'trandate',
          summary: 'GROUP'
        }),
        search.createColumn({
          name: 'internalid',
          summary: 'GROUP'
        })
      ]
    })

    var searchResults = searchHelpers.getFormattedSearchResults(
      transactionSearchObj
    )

    log.audit('searchResults', searchResults)

    // loop through all invoice results
    searchResults.forEach(function (invoice) {
      var giftCertNumber = invoice.custcol_gc_no.text
      if (giftCertNumber) {
        // if there is a gift cert number add to the giftCertificates array
        addUniqueGiftCertNumber(
          uniqueGiftCertNumbers,
          gcNumbers,
          giftCertNumber
        )
      } else {
        // if not, take the result's internal id and search for the gift certificates on that invoice
        var invoiceInternalId = invoice.internalid.value
        var type = TYPE[invoice.type.text]
        var gcNumbersFromInvoice = getGCDataFromInvoice(
          invoiceInternalId,
          type,
          gcDataFromInvoice
        ).numbers

        gcNumbersFromInvoice.forEach(function (giftCertNumber) {
          addUniqueGiftCertNumber(
            uniqueGiftCertNumbers,
            gcNumbers,
            giftCertNumber
          )
        })
      }
    })

    log.audit('searchResults', searchResults)
    log.audit('gcNumbers', gcNumbers)

    return gcNumbers

    function getGCDataFromInvoice (
      invoiceInternalId,
      invoiceType,
      gcDataFromInvoice
    ) {
      var gcNumbers = []
      var giftCertNumber, transactionDate, purchaser, type

      if (invoiceInternalId) {
        // load record
        var invoiceRec = record.load({
          type: invoiceType,
          id: invoiceInternalId
        })

        // get lastTransDate
        transactionDate = invoiceRec.getValue({
          fieldId: 'trandate'
        })

        var numLines = invoiceRec.getLineCount({
          sublistId: 'giftcertredemption'
        })

        for (var i = 0; i < numLines; i++) {
          // go to sublist, get giftCertNo
          giftCertNumber = invoiceRec.getSublistValue({
            sublistId: 'giftcertredemption',
            fieldId: 'authcode_display',
            line: i
          })

          // if giftCertNumber is not already in gcDataFromInvoice
          if (!gcDataFromInvoice[giftCertNumber]) {
            // go to item list
            // look for any items that have gift cards by checking the item name and the description
            var type = invoiceRec.getSublistValue({
              sublistId: 'item',
              fieldId: 'item',
              line: i
            })

            var giftCerticates = {
              1217845: '2nd Swing Gift Certificate',
              1217846: 'Store Credit Gift Certificate',
              1217847: 'Store Credit Tax-Adj Gift Certificate'
            }

            var isGiftCert = giftCerticates[type]

            if (isGiftCert) {
              // get the giftCertNumb
              var giftCertNumber = invoiceRec.getSublistValue({
                sublistId: 'item',
                fieldId: 'giftcertnumber',
                line: i
              })

              // get the purchaser name
              purchaser = invoiceRec.getText({
                fieldId: 'entity'
              })
            }

            // giftcertnumber
            // item: 1217847
            log.debug('type', type)

            gcNumbers.push(giftCertNumber)
            gcDataFromInvoice[giftCertNumber] = {
              giftCertNumber: giftCertNumber,
              lastTransDate: transactionDate,
              purchaser: purchaser,
              type: type
            }
          }

          // update latestTransactionDate
          var currentGCTransDate =
            gcDataFromInvoice[giftCertNumber].lastTransDate

          gcDataFromInvoice[giftCertNumber].lastTransDate =
            currentGCTransDate > transactionDate
              ? currentGCTransDate
              : transactionDate

          log.debug(
            'transactionDate / gcDataFromInvoice[giftCertNumber].lastTransDate',
            transactionDate +
              ' / ' +
              gcDataFromInvoice[giftCertNumber].lastTransDate
          )
          log.debug('gcDataFromInvoice', gcDataFromInvoice)
        }
      }

      return {
        numbers: gcNumbers,
        invoiceData: gcDataFromInvoice
      }
    }

    function addUniqueGiftCertNumber (
      uniqueGiftCertNumbers,
      gcNumbers,
      giftCertNumber
    ) {
      // add unique giftCertNo to list
      if (!uniqueGiftCertNumbers[giftCertNumber]) {
        gcNumbers.push(giftCertNumber)
        uniqueGiftCertNumbers[giftCertNumber] = giftCertNumber
      }
    }
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1919 : get gift certificate data
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  giftCertificateNumbers = ['Kn9ZKIKOu', 'CIYj1Z47F']

  getGiftCertificateDataFromSearch(giftCertificateNumbers)

  function getGiftCertificateDataFromSearch (giftCertificateNumbers) {
    var giftCertificateData
    var filters = []
    var value
    for (var i = 0; i < giftCertificateNumbers.length; i++) {
      value = giftCertificateNumbers[i]
      filters.push(['gccode', 'is', value])
      if (i < giftCertificateNumbers.length - 1) {
        filters.push('OR')
      }
    }
    log.debug('filters', filters)

    try {
      var giftcertificateSearchObj = search.create({
        type: 'giftcertificate',
        filters: filters,
        columns: [
          search.createColumn({
            name: 'purchasedate',
            sort: search.Sort.ASC
          }),
          'name',
          'email',
          'giftcertcode',
          'originalamount',
          'amountremaining',
          'expirationdate'
        ]
      })

      giftCertificateData = searchHelpers.getFormattedSearchResults(
        giftcertificateSearchObj
      )

      return giftCertificateData
    } catch (error) {
      log.error('error in getScriptName', error)
    }
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1919: get gift cards from invoices
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var giftCertificateNumbers = []
  var uniqueGiftCertNumbers = {}
  var customerId = 271875
  var TYPE = {
    Invoice: 'invoice',
    'Sales Order': 'salesorder'
  }

  var transactionSearchObj = search.create({
    type: 'transaction',
    filters: [
      ['item', 'anyof', '1217845', '1217846', '1217847'],
      'AND',
      ['name', 'anyof', customerId]
    ],
    columns: [
      search.createColumn({
        name: 'trandate',
        summary: 'GROUP'
      }),
      search.createColumn({
        name: 'type',
        summary: 'GROUP'
      }),
      search.createColumn({
        name: 'entity',
        summary: 'GROUP'
      }),
      search.createColumn({
        name: 'custcol_gc_no',
        summary: 'GROUP',
        sort: search.Sort.ASC
      }),
      search.createColumn({
        name: 'custbody_gc_no',
        summary: 'GROUP'
      }),
      search.createColumn({
        name: 'trandate',
        summary: 'GROUP'
      }),
      search.createColumn({
        name: 'internalid',
        summary: 'GROUP'
      })
    ]
  })

  var searchResults = searchHelpers.getFormattedSearchResults(
    transactionSearchObj
  )

  // loop through all invoice results
  searchResults.forEach(function (invoice) {
    var giftCertNumber = invoice.custcol_gc_no.text
    if (giftCertNumber) {
      // if there is a gift cert number add to the giftCertificates array

      addUniqueGiftCertNumber(
        uniqueGiftCertNumbers,
        giftCertificateNumbers,
        giftCertNumber
      )

      // giftCertificates.push(giftCertNumber)
    } else {
      // if not, take the result's internal id and search for the gift certificates on that invoice
      var invoiceInternalId = invoice.internalid.value
      var type = TYPE[invoice.type.text]
      var giftCertificateNumbersFromInvoice = getGiftCertNumberFromInvoice(
        invoiceInternalId,
        type
      )

      giftCertificateNumbersFromInvoice.forEach(function (giftCertNumber) {
        addUniqueGiftCertNumber(
          uniqueGiftCertNumbers,
          giftCertificateNumbers,
          giftCertNumber
        )
      })
    }
  })

  log.debug('searchResults', searchResults)
  log.debug('giftCertificateNumbers', giftCertificateNumbers)

  function getGiftCertNumberFromInvoice (invoiceInternalId, type) {
    var giftCertificateNumbers = []

    if (invoiceInternalId) {
      // load record
      var invoiceRec = record.load({
        type: type,
        id: invoiceInternalId
      })

      var numLines = invoiceRec.getLineCount({
        sublistId: 'giftcertredemption'
      })

      for (var i = 0; i < numLines; i++) {
        // go to sublist, get giftCertNo
        var giftCertNumber = invoiceRec.getSublistValue({
          sublistId: 'giftcertredemption',
          fieldId: 'authcode_display',
          line: i
        })

        giftCertificateNumbers.push(giftCertNumber)
      }
    }

    return giftCertificateNumbers
  }

  function addUniqueGiftCertNumber (
    uniqueGiftCertNumbers,
    giftCertificateNumbers,
    giftCertNumber
  ) {
    // add unique giftCertNo to list
    if (!uniqueGiftCertNumbers[giftCertNumber]) {
      giftCertificateNumbers.push(giftCertNumber)
      uniqueGiftCertNumbers[giftCertNumber] = giftCertNumber
    }
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1867
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var form = null
  log.debug(getItemInternalIdFromSku(form))

  function getItemInternalIdFromSku (form) {
    // var sku = getSku(form)

    var sku = 'FIT0000002'

    var itemSearchObj = search.create({
      type: 'inventoryitem',
      filters: [
        ['externalid', 'anyof', sku],
        'OR',
        ['custitem_g2_sku', 'startswith', sku],
        'OR',
        ['itemid', 'startswith', sku],
        'OR',
        ['externalidstring', 'startswith', sku]
      ],
      columns: [
        search.createColumn({ name: 'itemid', label: 'Name' }),
        search.createColumn({ name: 'internalid', label: 'Internal ID' }),
        search.createColumn({
          name: 'custitem_sales_description',
          label: 'Sales Description'
        })
      ]
    })

    var itemSearchResults = itemSearchObj.run()

    var firstResult = itemSearchResults.getRange({
      start: 0,
      end: 1
    })[0]

    var internalid = firstResult.getValue(itemSearchResults.columns[1])

    return internalid
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1842- getPreferredVendor()
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var childItem = 3009123

  var thisItem = record.load({
    type: record.Type.INVENTORY_ITEM,
    id: childItem
  })

  var brandId = thisItem.getValue({ fieldId: 'custitem_wms_parentitembrand' })

  log.debug(getPreferredVendorId(brandId))

  function getPreferredVendorId (brandId) {
    var preferredVendorId

    try {
      var preferredVendorIdObj = search.lookupFields({
        type: 'customrecord_g2_brand',
        id: brandId,
        columns: ['custrecord_preferred_vendor']
      })

      log.debug('preferredVendorId: raw', preferredVendorId)

      preferredVendorId =
        preferredVendorIdObj['custrecord_preferred_vendor'][0].value
    } catch (e) {
      // if there was no match based on the brand in the online title, then return id for Vendor: Ping

      preferredVendorId = 1290699

      log.error(
        'no vendor found on parent item, using default vendor:' +
          preferredVendorId,
        e
      )
    }
    return preferredVendorId
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1842
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  // ADD CODE BELOW
  // ADD CODE BELOW
  // ADD CODE BELOW

  var parentItems = [45515]
  var vendor = 152855

  setVendorOnParentItems(parentItems, vendor)

  function setVendorOnParentItems (parentItems, vendor) {
    var updatedRecords = []
    var parentItemRecord, confirmationId, newVendor, oldVendor //updatedRecord

    parentItems.forEach(function (parentId) {
      parentItemRecord = record.load({
        type: 'inventoryitem',
        id: parentId
      })

      oldVendor = parentItemRecord.getValue({
        fieldId: 'vendor'
      })

      oldVendorText = parentItemRecord.getText({
        fieldId: 'vendor'
      })

      log.debug(
        'item # / oldVendor / oldVendorText',
        parentId + '/ ' + oldVendor + '/ ' + oldVendorText
      )

      parentItemRecord.setValue({
        fieldId: 'vendor',
        value: vendor,
        ignoreFieldChange: true
      })

      parentItemRecord.setText({
        fieldId: 'vendor',
        value: vendor,
        ignoreFieldChange: true
      })

      confirmationId = parentItemRecord.save()
      // updatedRecord = record.submitFields({
      //   type: 'inventoryitem',
      //   id: parent,
      //   values: { vendor: vendor }
      // })
      parentItemRecord = record.load({
        type: 'inventoryitem',
        id: parentId
      })

      newVendor = parentItemRecord.getValue({
        fieldId: 'vendor'
      })

      log.debug('item # / newVendor', parentId + '/ ' + newVendor)

      updatedRecords.push(confirmationId)
    })

    return updatedRecords
  }

  // ADD CODE ABOVE
  // ADD CODE ABOVE
  // ADD CODE ABOVE
})

// NG-1568

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers',
  '/SuiteScripts/WMS/shared/ItemHelper'
], function (search, record, ssLib, searchHelpers, itemHelper) {
  var itemData = {
    custpage_parent: '30897',
    custpage_tranid: '3478837',
    custpage_itemtype: '2'
  }

  itemHelper.createItem(itemData)

  // enter functions here
  //
  //
})

// NG-1682
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers'
], function (search, record, ssLib, searchHelpers) {
  var fittingTypeId = 14

  var fittingTypeData = search.lookupFields({
    type: 'customrecord_fittingtype',
    id: fittingTypeId,
    columns: [
      'custrecord_fittingtype_service_item',
      'custrecord_fittingcost',
      'name'
    ]
  })

  var serviceItemInternalId =
    fittingTypeData['custrecord_fittingtype_service_item'][0].value

  var serviceItemData = search.lookupFields({
    type: search.Type.SERVICE_ITEM,
    id: serviceItemInternalId,
    columns: ['salesdescription', 'custitem_base_price_copy']
  })

  serviceItemObj = {
    fittingCost: fittingTypeData['custrecord_fittingcost'],
    fittingTypeName: fittingTypeData['name'],
    serviceItemId:
      fittingTypeData['custrecord_fittingtype_service_item'][0].text,
    serviceItemInternalId: serviceItemInternalId,
    serviceItemDescription: serviceItemData['salesdescription'],
    serviceItemPrice: serviceItemData['custitem_base_price_copy']
  }

  return serviceItemObj
})

// NG-1757
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers'
], function (search, record, ssLib, searchHelpers) {
  var validCategoryIds = []
  var type = 'customrecord_g2_category'
  var searchId = null
  var filters = ['custrecord_category_shorten_ebay_title', 'is', 'true']
  var columns = ['custrecord_category_shorten_ebay_title']

  var searchResults = searchHelpers.fullSearch(type, searchId, filters, columns)

  searchResults.forEach(function (result) {
    validCategoryIds.push(result.id)
  })

  validCategoryIds

  log.debug('validCategoryIds', validCategoryIds)
})

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  // enter functions here

  var type = 'salesorder'
  var searchId = null
  var filters = ['internalid', 'is', 3468625]
  var columns = ['custbody_customfitting_eventnotes']

  var results = ssLib.fullSearch(type, searchId, filters, columns)

  var eventRecord = record.load({
    type: 'calendarevent',
    id: 47768
  })

  formMap = {
    location: 'custevent_fittinginfolocation',
    firstName: 'custevent_fittinginfofirstname',
    lastName: 'custevent_fittinginfolastname',
    email: 'custevent_fittinginfoemail',
    phone: 'custevent_fittinginfophone'
  }

  var sharedData = {}
  var fieldId, value

  var formFields = Object.keys(formMap)

  formFields.forEach(function (field) {
    fieldId = formMap[field]

    value = eventRecord.getValue({
      fieldId: fieldId
    })

    sharedData[field] = value
  })

  log.debug('sharedData', sharedData)
})

// NG-1669 debugger

// test service item https://debugger.na0.netsuite.com/app/common/item/item.nl?id=2813982&e=T

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  function getCatAttributeFilters () {
    var catAttributeFilters = {
      'Ebay Title': 'custitem_g2_ebaytitle',
      'Online Title': 'custitem_g2_onlinetitle',
      'Is Ecommerce Item': 'custitem_g2_isecommerceitem',
      'List on 2S Only': 'custitem_g2_liston2sonly',
      'Parent Item Brand': 'custitem_wms_parentitembrand',
      'Parent Item Category': 'custitem_wms_parentitemcategory',
      'Parent Item Model': 'custitem_wms_parentitemmodel',
      'Price Discount Amt': 'custitem_g2_pricediscountamt',
      'Price Discount Pct': 'custitem_g2_pricediscountpct',
      'Price Premium Amt': 'custitem_g2_pricepremiumamt',
      'Price Premium Percent': 'custitem_g2_pricepremiumpct'
    }
    return Object.values(catAttributeFilters)
  }
  log.debug(getCatAttributeFilters())
})

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  var selections = []

  var type = 'customrecord_g2_subcategory'
  var searchId = null
  var columns = []

  var filters = ['custrecord_g2_subcategory_category_ref', 'is', 1]
  var subcategories = ssLib.fullSearch(type, searchId, filters, columns)
  subcategories.forEach(function (subcategory) {
    var text, value
    value = subcategory.fieldId
    text = subcategory.custrecord_g2_subcategory_value.value

    selections.push[{ text: text, value: value }]
  })

  log.debug('selections', selections)
  log.debug('subcategories', subcategories)
})

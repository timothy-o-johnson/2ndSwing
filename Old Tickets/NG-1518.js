// NG-1518
// https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=294&deploy=1&compid=4537321_SB1&action=main_form&category=1

// https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=9

// https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=294

/**
 * 1. create a saved search
 */

/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/search', 'N/runtime', 'N/url', 'N/redirect', 'N/record', 'N/format'], function (
  serverWidget,
  search,
  runtime,
  url,
  redirect,
  record,
  format
) {
  var request
  var response
  var scriptId
  var deploymentId

  var form
  var sublist

  customrecord_g2_gmdriver
  var parameters
  var action
  var category
  var pageIndex
  var item
  var gmDriver
  var onlyModified = 'false'
  var hotItems

  var categoryFilterField
  var itemFilterField
  var pageFilterField
  var gmDriverFilterField
  var onlyModifiedField
  var existingRowValueJSONField
  var priceChangeMapField
  var summarySalesActivityMapField

  var existingRowValueJSON = {}
  var priceChangeMap = {}
  var summarySalesActivityMap = {}
  var rowsWithPriceChange = []
  var updatedRows = []
  var rowsWithPriceChangeField
  var updatedRowsField
  var ENTRY_FIELDS = [
    'custrecord_wipfli_base_sell',
    'custcol_price_drop',
    'custrecord_wipfli_bid_price',
    'custrecord_wipfli_gmdvr',
    'custrecord_wipfli_hot_item'
  ]
  var HIDDEN_FIELDS = ['internalid']
  var DISABLE_FIELDS = ['custrecord_wipfli_gmpercent']
  var NS_TRUE_FALSE_NONSENSE = { true: 'T', false: 'F' }

  function onRequest (params) {
    try {
      var scriptObj = runtime.getCurrentScript()
      scriptId = scriptObj.id
      deploymentId = scriptObj.deploymentId
      request = params.request
      response = params.response
      parameters = request.parameters
      log.debug('params', parameters)
      action = parameters.action
      category = parameters.category
      pageIndex = parameters.page_index
      item = parameters.item
      onlyModified = parameters.onlyModified
      hotItems = parameters.hotItem
      gmDriver = parameters.gmDriver

      if (request.method === 'GET') {
        switch (action) {
          case 'main_form':
            generateMainForm()
            break
          default:
            generateCategorySelectForm()
            break
        }
        createBackendFields()
        response.writePage(form)
      }
      if (request.method === 'POST') {
        action = 'main_form'
        category = parameters.custbody_category_filter
        item = parameters.custbody_item_filter
        pageIndex = parameters.custbody_page_filter
        onlyModified = parameters.custbody_only_mod
        hotItems = parameters.hotItem
        gmDriver = parameters.gmDriver

        var redirectParams = { action: action }
        if (!isEmpty(category)) redirectParams.category = category
        if (!isEmpty(item)) redirectParams.item = item
        if (!isEmpty(onlyModified)) redirectParams.onlyModified = onlyModified
        if (!isEmpty(hotItems)) redirectParams.hotItem = hotItems
        if (!isEmpty(gmDriver)) redirectParams.gmDriver = gmDriver
        if (!isEmpty(pageIndex)) redirectParams.page_index = pageIndex
        createPriceChangeRecords()
        redirect.toSuitelet({ scriptId: scriptId, deploymentId: deploymentId, parameters: redirectParams })
      }
    } catch (error) {
      log.error({ title: 'Error in onRequest', details: error })
    }
  }

  function generateMainForm () {
    form = serverWidget.createForm({ title: 'Price Change' })
    form.addButton({
      id: 'custbutton_change_category',
      label: 'Change Category',
      functionName: 'redirectToCategorySelectForm();'
    })
    form.addButton({ id: 'custbutton_filter', label: 'Filter', functionName: 'filterItems();' })
    form.addButton({ id: 'custbutton_reset', label: 'Reset', functionName: 'redirectToMainForm();' })
    form.addSubmitButton({ label: 'Submit' })

    createFilterFields()
    var filters = createSearchFilters()
    var summarySalesActivityResult = []
    var summarySalesActivityPagedData = getSummarySalesActivity(filters)
    populatePageList(summarySalesActivityPagedData, pageIndex)
    if (summarySalesActivityPagedData.count > 0) { summarySalesActivityResult = summarySalesActivityPagedData.fetch({ index: 0 }).data }
    if (!isEmpty(pageIndex)) summarySalesActivityResult = summarySalesActivityPagedData.fetch({ index: pageIndex }).data
    var priceChangeResults = getPriceChanges(summarySalesActivityResult)
    priceChangeMap = generatePriceChangeMap(priceChangeResults)
    summarySalesActivityMap = generateSummarySalesActivityMap(summarySalesActivityResult)
    createPriceChangeSublist(summarySalesActivityResult, priceChangeMap)
  }

  function generateCategorySelectForm () {
    form = serverWidget.createForm({ title: 'Price Change' })
    var inlineHTMLField = form.addField({
      id: 'custbody_inline_html',
      label: 'HTML',
      type: serverWidget.FieldType.INLINEHTML
    })
    var categoryFilterField = form.addField({
      id: 'custbody_category_filter',
      label: 'Category',
      type: serverWidget.FieldType.SELECT
    })
    populateList(categoryFilterField, 'customrecord_g2_category')
    inlineHTMLField.updateBreakType({ breakType: serverWidget.FieldBreakType.STARTCOL })
    inlineHTMLField.defaultValue = '<p>Please select a category below</p>'
  }

  function createFilterFields () {
    form.addFieldGroup({ id: 'custfldgrp_filters', label: 'Filters' })

    categoryFilterField = form.addField({
      id: 'custbody_category_filter',
      label: 'Category',
      type: serverWidget.FieldType.SELECT,
      source: 'customrecord_g2_category',
      container: 'custfldgrp_filters'
    })

    createBooleanSelect('custrecord_wipfli_hot_item', 'Hot Item', 'custfldgrp_filters', form, hotItems)

    gmDriverFilterField = form.addField({
      id: 'custbody_gm_filter',
      label: 'GM Driver',
      type: serverWidget.FieldType.SELECT,
      source: 'customrecord_g2_gmdriver',
      container: 'custfldgrp_filters'
    })

    itemFilterField = form.addField({
      id: 'custbody_item_filter',
      label: 'Item Description',
      type: serverWidget.FieldType.TEXT,
      container: 'custfldgrp_filters'
    })
    onlyModifiedField = form.addField({
      id: 'custbody_only_mod',
      label: 'Modified Only',
      type: serverWidget.FieldType.CHECKBOX,
      container: 'custfldgrp_filters'
    })
    pageFilterField = form.addField({
      id: 'custbody_page_filter',
      label: 'Page',
      type: serverWidget.FieldType.SELECT,
      container: 'custfldgrp_filters'
    })
    itemFilterField.updateBreakType({ breakType: serverWidget.FieldBreakType.STARTCOL })
    pageFilterField.updateBreakType({ breakType: serverWidget.FieldBreakType.STARTCOL })
    categoryFilterField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE })
    categoryFilterField.defaultValue = category
    itemFilterField.defaultValue = item
    gmDriverFilterField.defaultValue = gmDriver
    onlyModifiedField.defaultValue = NS_TRUE_FALSE_NONSENSE[onlyModified]
  }

  function createSearchFilters () {
    var filters = []
    if (!isEmpty(category)) {
      filters.push(
        search.createFilter({
          name: 'custitem_g2_category_ref',
          join: 'custrecord_wipfli_item',
          operator: 'anyof',
          values: category
        })
      )
    }
    if (!isEmpty(item)) {
      filters.push(
        search.createFilter({
          name: 'custitem_g2_name',
          join: 'custrecord_wipfli_item',
          operator: 'contains',
          values: item
        })
      )
    }
    if (!isEmpty(hotItems)) {
      if (hotItems == 1) {
        filters.push(search.createFilter({ name: 'custrecord_wipfli_hot_item', operator: 'is', values: 'T' }))
      } else {
        filters.push(search.createFilter({ name: 'custrecord_wipfli_hot_item', operator: 'is', values: 'F' }))
      }
    }
    if (!isEmpty(gmDriver)) { filters.push(search.createFilter({ name: 'custrecord_wipfli_gmdvr', operator: 'anyof', values: gmDriver })) }
    return filters
  }

  function createPriceChangeSublist (summarySalesActivityResults, priceChangeMap) {
    var onlyModifiedLineCount = 0
    sublist = form.addSublist({
      id: 'custsublist_summary_sales_activity',
      label: 'Items',
      type: serverWidget.SublistType.LIST
    })
    for (var i = 0; i < summarySalesActivityResults.length; i++) {
      var summarySalesActivityResult = summarySalesActivityResults[i]
      var columns = summarySalesActivityResult.columns
      var parentItemId = summarySalesActivityResult.getValue({ name: 'custrecord_wipfli_item' })
      var valuePayload = {
        hotItem: summarySalesActivityResult.getValue({ name: 'custrecord_wipfli_hot_item' }),
        baseSell: summarySalesActivityResult.getValue({ name: 'custrecord_wipfli_base_sell' }),
        bidPrice: summarySalesActivityResult.getValue({ name: 'custrecord_wipfli_bid_price' }),
        gmDvr: summarySalesActivityResult.getValue({ name: 'custrecord_wipfli_gmdvr' })
        // gmPercent: summarySalesActivityResult.getValue({name: 'custrecord_wipfli_gmpercent'})
      }
      if (i === 0) {
        createSummarySalesActivitySublistFields(sublist, columns)
      }
      // VF only show lines that have been modified (have a price change record)
      if (onlyModified == 'true' || onlyModified == true || onlyModified == 'T') {
        if (priceChangeMap[parentItemId] == undefined) {
          continue
        } else {
          setSummarySalesActivityValues(sublist, columns, summarySalesActivityResult, onlyModifiedLineCount)
          onlyModifiedLineCount++
        }
      } else {
        setSummarySalesActivityValues(sublist, columns, summarySalesActivityResult, i)
      }

      if (
        priceChangeMap.hasOwnProperty(parentItemId) &&
        (onlyModified == 'false' || onlyModified == false || onlyModified == 'F')
      ) {
        valuePayload = overwritePriceChangeValues(priceChangeMap, parentItemId, sublist, valuePayload, i)
      }
      existingRowValueJSON[i] = valuePayload
    }
  }

  function createSummarySalesActivitySublistFields (sublist, columns) {
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i]
      var fieldId = column.name
      var fieldLabel = column.label
      var fieldType = JSON.parse(JSON.stringify(column)).type
      var field
      switch (fieldType) {
        case 'checkbox':
          field = sublist.addField({ id: fieldId, label: fieldLabel, type: serverWidget.FieldType.CHECKBOX })
          break
        case 'percent':
          field = sublist.addField({ id: fieldId, label: fieldLabel, type: serverWidget.FieldType.PERCENT })
          break
        case 'currency':
          field = sublist.addField({ id: fieldId, label: fieldLabel, type: serverWidget.FieldType.CURRENCY })
          if (fieldId === 'custrecord_wipfli_base_sell') {
            sublist.addField({
              id: 'custcol_price_drop',
              label: 'Price Drop',
              type: serverWidget.FieldType.SELECT,
              source: 'customrecord_wipfli_price_drop'
            })
          }
          break
        case 'clobtext':
          field = sublist.addField({ id: fieldId, label: fieldLabel, type: serverWidget.FieldType.TEXTAREA })
          break
        default:
          switch (fieldId) {
            case 'custrecord_wipfli_gmdvr':
              field = sublist.addField({
                id: fieldId,
                label: fieldLabel,
                type: serverWidget.FieldType.SELECT,
                source: 'customrecord_g2_gmdriver'
              })
              break
            case 'custrecord_wipfli_item':
              sublist.addField({ id: 'itemlink', label: 'View Item', type: serverWidget.FieldType.URL }).linkText =
                'View'
              field = sublist.addField({
                id: fieldId,
                label: fieldLabel,
                type: serverWidget.FieldType.SELECT,
                source: 'item'
              })
              break
            default:
              field = sublist.addField({ id: fieldId, label: fieldLabel, type: serverWidget.FieldType.TEXT })
              break
          }
          break
      }
      if (ENTRY_FIELDS.indexOf(fieldId) >= 0) {
        field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.ENTRY })
      } else if (DISABLE_FIELDS.indexOf(fieldId) >= 0) {
        field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.ENTRY })
        field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.DISABLED })
      } else if (HIDDEN_FIELDS.indexOf(fieldId) >= 0) {
        field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
      } else {
        field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE })
      }
    }
  }

  function setSummarySalesActivityValues (sublist, columns, summarySalesActivityResult, line) {
    for (var j = 0; j < columns.length; j++) {
      var column = columns[j]
      var fieldId = column.name
      var fieldType = JSON.parse(JSON.stringify(column)).type
      var value
      switch (fieldType) {
        case 'select':
          if (fieldId === 'custrecord_wipfli_item') {
            var itemId = summarySalesActivityResult.getValue({ name: 'custrecord_wipfli_item' })
            var itemUrl = url.resolveRecord({ recordType: 'inventoryitem', recordId: itemId })
            sublist.setSublistValue({ id: 'itemlink', line: line, value: itemUrl })
          }
          value = summarySalesActivityResult.getValue(column)
          break
        case 'checkbox':
          value = summarySalesActivityResult.getValue(column)
          value = value ? 'T' : 'F'
          break
        default:
          value = isEmpty(summarySalesActivityResult.getText(column))
            ? summarySalesActivityResult.getValue(column)
            : summarySalesActivityResult.getText(column)
          break
      }
      if (!isEmpty(value)) sublist.setSublistValue({ id: fieldId, line: line, value: value })
    }
  }

  function overwritePriceChangeValues (priceChangMap, parentItemId, sublist, valuePayload, line) {
    var priceChangeResult = priceChangMap[parentItemId]
    var newBaseSell = priceChangeResult.getValue({ name: 'custrecord_wipfli_base_sell_new' })
    var newBidPrice = priceChangeResult.getValue({ name: 'custrecord_wipfli_bid_price_new' })
    var newGMDvr = priceChangeResult.getValue({ name: 'custrecord_wipfli_gmdriver_new' })
    var newGMPercent = priceChangeResult.getValue({ name: 'custrecord_wipfli_gmpercent_new' })
    if (!isEmpty(newBaseSell)) {
      sublist.setSublistValue({ id: 'custrecord_wipfli_base_sell', line: line, value: newBaseSell })
      valuePayload.baseSell = newBaseSell
    }
    if (!isEmpty(newBidPrice)) {
      sublist.setSublistValue({ id: 'custrecord_wipfli_bid_price', line: line, value: newBidPrice })
      valuePayload.bidPrice = newBidPrice
    }
    if (!isEmpty(newGMDvr)) {
      sublist.setSublistValue({ id: 'custrecord_wipfli_gmdvr', line: line, value: newGMDvr })
      valuePayload.gmDvr = newGMDvr
    }
    if (!isEmpty(newGMPercent)) {
      sublist.setSublistValue({ id: 'custrecord_wipfli_gmpercent', line: line, value: newGMPercent })
      valuePayload.gmPercent = newGMPercent
    }
    rowsWithPriceChange.push(line)
    return valuePayload
  }

  function createBackendFields () {
    var scriptIdField = form.addField({
      id: 'custbody_script_id',
      label: 'Script ID',
      type: serverWidget.FieldType.TEXT
    })
    var deploymentIdField = form.addField({
      id: 'custbody_deployment_id',
      label: 'Deployment ID',
      type: serverWidget.FieldType.TEXT
    })
    rowsWithPriceChangeField = form.addField({
      id: 'custbody_rows_with_price_change',
      label: 'Rows With Price Change',
      type: serverWidget.FieldType.LONGTEXT
    })
    updatedRowsField = form.addField({
      id: 'custbody_updated_rows',
      label: 'Updated Rows',
      type: serverWidget.FieldType.LONGTEXT
    })
    existingRowValueJSONField = form.addField({
      id: 'custbody_existing_row_value_json',
      label: 'Existing Row Value JSON',
      type: serverWidget.FieldType.LONGTEXT
    })
    priceChangeMapField = form.addField({
      id: 'custbody_price_change_map',
      label: 'Price Change Map',
      type: serverWidget.FieldType.LONGTEXT
    })
    summarySalesActivityMapField = form.addField({
      id: 'custbody_summary_sales_activity_map',
      label: 'Summary Sales Activity Map',
      type: serverWidget.FieldType.LONGTEXT
    })
    scriptIdField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    deploymentIdField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    rowsWithPriceChangeField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    existingRowValueJSONField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    updatedRowsField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    priceChangeMapField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    summarySalesActivityMapField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    scriptIdField.defaultValue = scriptId
    deploymentIdField.defaultValue = deploymentId
    rowsWithPriceChangeField.defaultValue = JSON.stringify(rowsWithPriceChange)
    existingRowValueJSONField.defaultValue = JSON.stringify(existingRowValueJSON)
    updatedRowsField.defaultValue = JSON.stringify(updatedRows)
    priceChangeMapField.defaultValue = JSON.stringify(priceChangeMap)
    summarySalesActivityMapField.defaultValue = JSON.stringify(summarySalesActivityMap)
    form.clientScriptModulePath = './CS Price Change.js'
  }

  function getSummarySalesActivity (filters) {
    var scriptObj = runtime.getCurrentScript()
    var summarySalesActivitySearchId = scriptObj.getParameter({ name: 'custscript_wipfli_price_chance_sub_ss' })
    var summarySalesActivitySearchObj = search.load({ id: summarySalesActivitySearchId })
    var columns = summarySalesActivitySearchObj.columns
    return search
      .create({ type: 'customrecord_wipfli_summary_sales_actvty', filters: filters, columns: columns })
      .runPaged({ pageSize: 200 })
  }

  function getPriceChanges (summarySalesActivityResult) {
    var filters = []
    var columns = []
    var parentItemIds = []
    for (var i = 0; i < summarySalesActivityResult.length; i++) {
      var parentItemId = summarySalesActivityResult[i].getValue({ name: 'custrecord_wipfli_item' })
      parentItemIds.push(parentItemId)
    }
    if (parentItemIds.length > 0) {
      filters.push(
        search.createFilter({ name: 'custrecord_wipfli_parent_item', operator: 'anyof', values: parentItemIds })
      )
    }
    var scriptObj = runtime.getCurrentScript()
    var pendingReview = scriptObj.getParameter({ name: 'custscript_wipfli_pending_review' })
    filters.push(search.createFilter({ name: 'custrecord_wipfli_status', operator: 'anyof', values: pendingReview }))
    columns.push(search.createColumn({ name: 'custrecord_wipfli_parent_item' }))
    columns.push(search.createColumn({ name: 'custrecord_wipfli_base_sell_new' }))
    columns.push(search.createColumn({ name: 'custrecord_wipfli_bid_price_new' }))
    columns.push(search.createColumn({ name: 'custrecord_wipfli_gmdriver_new' }))
    columns.push(search.createColumn({ name: 'custrecord_wipfli_gmpercent_new' }))
    return search
      .create({ type: 'customrecord_wipfli_price_change', filters: filters, columns: columns })
      .run()
      .getRange({ start: 0, end: 1000 })
  }

  function generatePriceChangeMap (priceChangeResult) {
    var priceChangeMap = {}
    for (var i = 0; i < priceChangeResult.length; i++) {
      var parentItemId = priceChangeResult[i].getValue({ name: 'custrecord_wipfli_parent_item' })
      priceChangeMap[parentItemId] = priceChangeResult[i]
    }
    return priceChangeMap
  }

  function generateSummarySalesActivityMap (summarySalesActivityResult) {
    var summarySalesActivityMap = {}
    for (var i = 0; i < summarySalesActivityResult.length; i++) {
      var internalId = summarySalesActivityResult[i].id
      var parentItem = summarySalesActivityResult[i].getValue({ name: 'custrecord_wipfli_item' })
      summarySalesActivityMap[parentItem] = internalId
    }
    return summarySalesActivityMap
  }

  function createPriceChangeRecords () {
    var updatedRows = JSON.parse(parameters.custbody_updated_rows)
    var existingRowValueJSON = JSON.parse(parameters.custbody_existing_row_value_json)
    var existingPriceChangeRecords = JSON.parse(parameters.custbody_price_change_map)
    var summarySalesActivityMap = JSON.parse(parameters.custbody_summary_sales_activity_map)

    for (var i = 0; i < updatedRows.length; i++) {
      var row = updatedRows[i]
      var hotItem = request.getSublistValue({
        group: 'custsublist_summary_sales_activity',
        name: 'custrecord_wipfli_hot_item',
        line: row
      })
      var currentItem = request.getSublistValue({
        group: 'custsublist_summary_sales_activity',
        name: 'custrecord_wipfli_item',
        line: row
      })
      var gmPercent = request.getSublistValue({
        group: 'custsublist_summary_sales_activity',
        name: 'custrecord_wipfli_gmpercent',
        line: row
      })
      if (!isEmpty(gmPercent)) gmPercent = parseFloat(gmPercent)

      // Update Summary Sales Activity Record
      record.submitFields({
        type: 'customrecord_wipfli_summary_sales_actvty',
        id: summarySalesActivityMap[currentItem],
        values: { custrecord_wipfli_hot_item: hotItem }
      })

      if (existingPriceChangeRecords[currentItem]) {
        // If Price Change Exist, update "New" values only
        record.submitFields({
          type: existingPriceChangeRecords[currentItem].recordType,
          id: existingPriceChangeRecords[currentItem].id,
          values: {
            custrecord_wipfli_base_sell_new: request.getSublistValue({
              group: 'custsublist_summary_sales_activity',
              name: 'custrecord_wipfli_base_sell',
              line: row
            }),
            custrecord_wipfli_bid_price_new: request.getSublistValue({
              group: 'custsublist_summary_sales_activity',
              name: 'custrecord_wipfli_bid_price',
              line: row
            }),
            custrecord_wipfli_gmdriver_new: request.getSublistValue({
              group: 'custsublist_summary_sales_activity',
              name: 'custrecord_wipfli_gmdvr',
              line: row
            }),
            custrecord_wipfli_gmpercent_new: gmPercent || 0
          }
        })
      } else {
        // Else create new record
        var newPriceChangeRecord = record.create({ type: 'customrecord_wipfli_price_change' })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_base_sell_old',
          value: existingRowValueJSON[row].baseSell
        })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_bid_price_old',
          value: existingRowValueJSON[row].bidPrice
        })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_gmdriver_old',
          value: existingRowValueJSON[row].gmDvr
        })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_gmpercent_old',
          value: parseFloat(existingRowValueJSON[row].gmPercent)
        })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_base_sell_new',
          value: request.getSublistValue({
            group: 'custsublist_summary_sales_activity',
            name: 'custrecord_wipfli_base_sell',
            line: row
          })
        })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_bid_price_new',
          value: request.getSublistValue({
            group: 'custsublist_summary_sales_activity',
            name: 'custrecord_wipfli_bid_price',
            line: row
          })
        })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_gmdriver_new',
          value: request.getSublistValue({
            group: 'custsublist_summary_sales_activity',
            name: 'custrecord_wipfli_gmdvr',
            line: row
          })
        })
        newPriceChangeRecord.setValue({ fieldId: 'custrecord_wipfli_gmpercent_new', value: gmPercent || 0 })
        newPriceChangeRecord.setValue({
          fieldId: 'custrecord_wipfli_parent_item',
          value: request.getSublistValue({
            group: 'custsublist_summary_sales_activity',
            name: 'custrecord_wipfli_item',
            line: row
          })
        })
        newPriceChangeRecord.setValue({ fieldId: 'custrecord_wipfli_status', value: 1 }) // Pending Review
        newPriceChangeRecord.save()
      }
    }
  }

  function populateList (fieldObj, listId) {
    var columns = []
    columns.push(search.createColumn({ name: 'name' }))
    var sourceResult = search
      .create({ type: listId, columns: columns })
      .run()
      .getRange({ start: 0, end: 1000 })
    for (var i = 0; i < sourceResult.length; i++) {
      if (i === 0) {
        fieldObj.addSelectOption({ text: '', value: '' })
      }
      var name = sourceResult[i].getValue({ name: 'name' })
      var id = sourceResult[i].id
      fieldObj.addSelectOption({ text: name, value: id })
    }
  }

  function populatePageList (pagedData, pageIndex) {
    if (pagedData.pageRanges.length === 0) {
      pageFilterField.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN })
    }
    for (var i = 0; i < pagedData.pageRanges.length; i++) {
      var pageRange = pagedData.pageRanges[i]
      var label = pageRange.compoundLabel
      var index = pageRange.index
      pageFilterField.addSelectOption({ text: label, value: index, isSelected: i === parseInt(pageIndex) })
    }
  }

  function isEmpty (value) {
    return value === '' || value === null || value === undefined
  }

  function createBooleanSelect (fieldId, fieldLabel, fieldGroup, form, value) {
    var booleanField = form.addField({
      id: fieldId,
      type: serverWidget.FieldType.SELECT,
      label: fieldLabel,
      container: fieldGroup
      // source : "shipitem"
    })

    booleanField.addSelectOption({
      value: '',
      text: '',
      isSelected: true
    })
    booleanField.addSelectOption({
      value: 1,
      text: 'Yes'
    })
    booleanField.addSelectOption({
      value: 0,
      text: 'No'
    })
    booleanField.updateBreakType({ breakType: serverWidget.FieldBreakType.STARTROW })
    booleanField.defaultValue = hotItems
    // return booleanField;
  }

  return {
    onRequest: onRequest
  }
})

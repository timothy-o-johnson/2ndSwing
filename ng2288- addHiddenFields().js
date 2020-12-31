function addHiddenFields (
  item,
  filledItem,
  itemRec,
  itemClass,
  curItemRec,
  params,
  prepNotes,
  masterOppSku
) {
  // fieldData

  var fieldData = form.addField({
    id: 'custpage_fielddata',
    label: '&nbsp;',
    type: sw.FieldType.LONGTEXT
  })

  fieldData.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  fieldData.defaultValue = JSON.stringify(item.fieldData)

  //NG-1406

  // mint95Password for Ping
  var hdn_pwdForMint95_ping = form.addField({
    id: 'custpage_mint95pwd',
    label: 'Mint9.5Pwd',
    type: sw.FieldType.TEXT
  })
  hdn_pwdForMint95_ping.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  hdn_pwdForMint95_ping.defaultValue = file
    .load({ id: '/PingClubsMintApproval/_mint95pingapprovepwd.txt' })
    .getContents()

  // mint9.5 Approved
  var hdn_chkMint95_approved = form.addField({
    id: 'custpage_mint95check',
    label: 'Mint9.5Approved',
    type: sw.FieldType.CHECKBOX
  })
  hdn_chkMint95_approved.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  hdn_chkMint95_approved.defaultValue = curItemRec.getValue({
    fieldId: 'custitem_ok_mint95'
  })
    ? 'T'
    : 'F'

  // promptForMint9.5
  var hdn_chkPromptForMint95 = form.addField({
    id: 'custpage_promptformint95',
    label: 'PromptForMint9.5',
    type: sw.FieldType.CHECKBOX
  })

  hdn_chkPromptForMint95.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  if (
    curItemRec
      .getText({ fieldId: 'custitem_wms_parentitemtype' })
      .toLowerCase()
      .trim() == 'golf clubs' &&
    curItemRec
      .getText({ fieldId: 'custitem_wms_parentitembrand' })
      .toLowerCase()
      .trim() == 'ping'
  )
    hdn_chkPromptForMint95.defaultValue = 'T'
  else hdn_chkPromptForMint95.defaultValue = 'F'

  // freeNoteField
  if (prepNotes && !masterOppSku) {
    var hiddenFreeField = form.addField({
      id: 'custpage_freenote_launch',
      label: 'HiddenFreeNoteField',
      type: sw.FieldType.TEXT
    })

    hiddenFreeField.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })
    hiddenFreeField.defaultValue = 'false'
  }

  // NG-1981 add hidden fields to hold values for emptySPA and spaAPIcalled to be accessible from different functions in Client Script
  var emptySPAfield = form.addField({
    id: 'custpage_empty_spa',
    label: '&nbsp;',
    type: sw.FieldType.CHECKBOX
  })
  emptySPAfield.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  emptySPAfield.defaultValue = 'F'

  var fieldChangedField = form.addField({
    id: 'custpage_field_changed',
    label: '&nbsp;',
    type: sw.FieldType.CHECKBOX
  })
  fieldChangedField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  fieldChangedField.defaultValue = 'F'

  var binLookupField = form.addField({
    id: 'custpage_binlookup',
    label: '&nbsp;',
    type: sw.FieldType.TEXT,
    container: hiddenGroup.id
  })

  binLookupField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  binLookupField.defaultValue = itemHelper.findAction(
    'customdeploy_wms_binlookuphelper'
  )[0]

  // isMasterOpportunitySku
  if (masterOppSku) {
    var masterOppSkuField = form.addField({
      id: 'custpage_masteroppsku',
      label: 'Is Master Opp Sku',
      type: sw.FieldType.TEXT
    })
    masterOppSkuField.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })
    masterOppSkuField.defaultValue = 'true'
  }

  // isFromConversionPage
  if (params['conversion']) {
    var conversionField = form.addField({
      id: 'custpage_conversion',
      label: 'from conversion page',
      type: sw.FieldType.TEXT
    })
    conversionField.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })
    conversionField.defaultValue = 'true'
  }

  // titleFieldData
  //get a unique set of item script ids for use in the client script
  var uniqueTitles = getUniqueTitles(titles)

  function getUniqueTitles (titles) {
    var uniqueTitles = {}
    var titleFields = titles['custrecord_wms_ebaytitletemplate']
      ? JSON.parse(titles['custrecord_wms_ebaytitletemplate']).title
      : []

    log.debug('titleFields after ebay', titleFields)
    log.debug(
      "titles['custrecord_wms_onlinetitletemplate']",
      titles['custrecord_wms_onlinetitletemplate']
    )

    titleFields = titleFields.concat(
      titles['custrecord_wms_onlinetitletemplate']
        ? JSON.parse(titles['custrecord_wms_onlinetitletemplate']).title
        : []
    )

    for (var t = 0; t < titleFields.length; t++) {
      //find the field in question, save the client accessible reference
      var scriptId = item.fieldData.filter(function (f) {
        return f.custrecord_fmd_fieldscriptid.id == titleFields[t].source
      })
      // log.debug({ title: titleFields[t].source, details: scriptId });
      if (scriptId.length)
        uniqueTitles['custpage_eia_fielddata_' + scriptId[0].id] = true
    }
    return uniqueTitles
  }

  var titleFieldData = form.addField({
    id: 'custpage_titlefielddata',
    label: '&nbsp',
    type: sw.FieldType.LONGTEXT,
    container: hiddenGroup.id
  })

  titleFieldData.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  titleFieldData.defaultValue = Object.keys(uniqueTitles).join(',')

  // skuName
  var skuName = form.addField({
    id: 'custpage_skuname',
    label: 'sku name',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })
  skuName.defaultValue = filledItem.name
  skuName.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // parentSkuName
  var parentSkuName = form.addField({
    id: 'custpage_parent_skuname',
    label: 'parent sku name',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })

  parentSkuName.defaultValue = parentArrExists
    ? parentSearch.parent[0].text
    : ''

  parentSkuName.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // itemId
  if (item.itemId) {
    var itemIdField = form.addField({
      id: 'custpage_itemid',
      label: 'item id',
      type: sw.FieldType.TEXT,
      container: 'custpage_hiddenfields'
    })
    itemIdField.defaultValue = item.itemId
    itemIdField.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })
  }

  // isClubTrade
  // NG 1631 - check if the child has an External ID, if it does, assume it is a Club Trader child item
  var isClubTrade = form.addField({
    id: 'custpage_is_club_trade',
    label: 'Is Club Trade?',
    type: sw.FieldType.CHECKBOX
  })
  isClubTrade.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  if (parentSearch.externalid.length != 0) {
    isClubTrade.defaultValue = 'T'
  } else {
    isClubTrade.defaultValue = 'F'
  }

  // itemClass

  var classField = form.addField({
    id: 'custpage_po_class',
    label: 'po class',
    type: sw.FieldType.TEXT
  })
  classField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  classField.defaultValue = itemClass

  // salesDescription
  var salesDescField = form.addField({
    id: 'custpage_salesdescription',
    label: 'sales description',
    type: sw.FieldType.TEXT
  })
  salesDescField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  if (itemClass == 1) {
    salesDescField.defaultValue = parentSearch.purchasedescription
  }

  // parentBasePrice
  var parentBasePrice = form.addField({
    id: 'custpage_parent_base_price',
    label: 'parent base price',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })
  parentBasePrice.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  var basePriceLine = itemRec.findSublistLineWithValue({
    sublistId: 'price',
    fieldId: 'pricelevelname',
    value: 'Base Price'
  })

  if (basePriceLine != -1) {
    var basePrice = itemRec.getSublistValue({
      sublistId: 'price',
      fieldId: 'price_1_',
      line: basePriceLine
    })
    log.debug('parent base price', basePrice)
    parentBasePrice.defaultValue = basePrice
  } else {
    parentBasePrice.defaultValue = 0
  }

  // parentItemType
  var itemType = itemRec.getText({
    fieldId: 'custitem_g2_itemtype_ref'
  })

  var parentItemType = form.addField({
    id: 'custpage_parent_item_type',
    label: 'parent item type',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })
  parentItemType.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  parentItemType.defaultValue = itemType

  // brandAndCategory
  var brandAndCategory = form.addField({
    id: 'custpage_brand_category',
    label: 'brand and category',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })

  brandAndCategory.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // counterpointId
  var cpID = form.addField({
    id: 'custpage_user_cp_id',
    label: 'Counterpoint ID',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })
  var userId = runtime.getCurrentUser().id

  var employeeLookup = search.lookupFields({
    type: 'employee',
    id: userId,
    columns: ['custentity_counterpoint_id']
  })
  var counterPointId = employeeLookup.custentity_counterpoint_id

  log.debug('Counterpoint ID', counterPointId)

  cpID.defaultValue = counterPointId

  cpID.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // originalQuantity
  if (filledItem.quantity) {
    var origQty = form.addField({
      id: 'custpage_origquantity',
      label: '&nbsp;',
      type: sw.FieldType.INTEGER,
      container: 'custpage_hiddenfields'
    })

    origQty.defaultValue = filledItem.quantity

    origQty.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })
  }

  log.debug('filledItem.fieldData Object', JSON.stringify(filledItem.fieldData))

  // deploymentUrlField
  var deployment = runtime.getCurrentScript().getParameter({
    name: 'custscript_wms_sell_price_deploy'
  })

  var deploymentUrl = itemHelper.findAction(deployment)[0]

  var deploymentField = form.addField({
    id: 'custpage_hidden_deployment',
    label: 'Hidden Sell Price',
    type: sw.FieldType.TEXT
  })
  deploymentField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  deploymentField.defaultValue = deploymentUrl

  // hiddenSPAFields
  var hiddenSPA = form.addField({
    id: 'custpage_hidden_spa',
    label: 'Hidden SPA',
    type: sw.FieldType.TEXTAREA
  })
  hiddenSPA.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // hiddenAPICalled
  var sellPriceAPICalled = form.addField({
    id: 'custpage_hidden_api_called',
    label: 'Hidden API Called',
    type: sw.FieldType.CHECKBOX
  })
  sellPriceAPICalled.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // spaHaveChanged
  var spaHaveChanged = form.addField({
    id: 'custpage_hidden_spa_changed',
    label: 'Hidden SPA changed',
    type: sw.FieldType.CHECKBOX
  })
  spaHaveChanged.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // hiddenPriceAdj
  var hiddenPriceAdjustment = form.addField({
    id: 'custpage_hidden_price_adj',
    label: 'Hidden Price Adjustments',
    type: sw.FieldType.TEXT
  })
  hiddenPriceAdjustment.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // dynamicFields
  //trying to prevent loops and self-triggering updates.
  var dynamicFields = form.addField({
    id: 'custpage_dynamicfields',
    label: '&nbsp',
    type: sw.FieldType.LONGTEXT,
    container: hiddenGroup.id
  })

  dynamicFields.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  return {
    fieldData
  }
}

function addFieldGroups (form) {
  var attributeGroup = form.addFieldGroup({
    id: 'custpage_attributes',
    label: 'Attributes',
    tab: attributeTab.id
  })

  var hiddenGroup = form.addFieldGroup({
    id: 'custpage_hiddenfields',
    label: '&nbsp',
    tab: attributeTab.id
  })

  hiddenGroup.isBorderHidden = true

  // Add field group for item prices
  var priceGroup = form.addFieldGroup({
    id: 'custpage_price_group',
    label: 'Item Sell Prices',
    tab: attributeTab.id
  })

  var readOnlyGroup = form.addFieldGroup({
    id: 'custpage_readonly',
    label: 'Read Only Attributes',
    tab: attributeTab.id
  })

  var titleGroup = form.addFieldGroup({
    id: 'custpage_titles',
    label: 'Titles',
    tab: attributeTab.id
  })

  return {
    attributeGroup,
    hiddenGroup,
    form,
    priceGroup,
    readOnlyGroup,
    titleGroup
  }
}

function addTabs (form) {
  var attributeTab = form.addTab({
    id: 'custpage_attributetab',
    label: 'Attributes'
  })

  var binTab = form.addTab({
    id: 'custpage_bintab',
    label: 'Bins'
  })

  return {
    attributeTab,
    binTab,
    form
  }
}

function getTitles (item) {
  if (item.categoryId) {
    var titles = search.lookupFields({
      type: 'customrecord_g2_category',
      id: item.categoryId,
      columns: [
        'custrecord_wms_onlinetitletemplate',
        'custrecord_wms_ebaytitletemplate'
      ]
    })
  }

  log.debug({ title: 'categoryID: ' + item.categoryId, details: titles })
}

//NG-843 show bins even in attribution from receiving
function addBinSublist (binTab, cacheKey, form) {
  if (cacheKey.length == 2 || cacheKey.length == 5) {
    var binSearch = search.load({
      id: 'customsearch_wms_itembintransfer'
    })
    var itemId = 0

    if (cacheKey.length == 2) {
      itemId = cacheKey[1]
    } else {
      itemId = cacheKey[3]
    }

    binSearch.filters.push(
      search.createFilter({
        name: 'internalid',
        operator: search.Operator.ANYOF,
        values: [itemId]
      })
    )

    var binList = form.addSublist({
      id: 'sublistid',
      type: sw.SublistType.LIST,
      label: 'Item Bin Locations',
      container: binTab.id
    })

    // build list of active available bins at location
    var transferBin = binList.addField({
      id: 'custpage_eia_transferbin',
      label: 'Transfer Bin',
      type: sw.FieldType.TEXT
    })

    transferBin.updateDisplayType({
      displayType: sw.FieldDisplayType.ENTRY
    })

    var transferQuantity = binList.addField({
      id: 'custpage_eia_transferquantity',
      label: 'Transfer Qty',
      type: sw.FieldType.INTEGER
    })

    transferQuantity.updateDisplayType({
      displayType: sw.FieldDisplayType.ENTRY
    })

    transferQuantity.updateDisplaySize({
      width: 4,
      height: 1
    })

    var itemId = binList.addField({
      id: 'custpage_eia_item',
      label: '&nbsp;',
      type: sw.FieldType.TEXT
    })

    itemId.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })

    var lines = 0
    var columns = []

    binSearch.run().each(function (res, ind) {
      res.columns.forEach(function (innerRes, innerIndex) {
        // if we haven't added lines, we don't have fields
        if (lines == 0) {
          log.debug({
            title: 'Result: ' + ind,
            details:
              'n: ' +
              innerRes.name +
              ' j: ' +
              innerRes.join +
              ' l: ' +
              innerRes.label
          })

          columns.push(
            binList.addField({
              id: innerRes.join
                ? 'custpage_eia_' +
                  innerRes.join.toLowerCase() +
                  '_' +
                  innerRes.name
                : 'custpage_eia_' + innerRes.name,
              label: innerRes.label || 'tmp',
              type: itemHelper.digFieldType(innerRes.type)
            })
          )
          log.debug({
            title: 'column: ' + innerIndex,
            details: innerRes.join
              ? 'custpage_eia_' +
                innerRes.join.toLowerCase() +
                '_' +
                innerRes.name
              : 'custpage_eia_' + innerRes.name
          })
        }
        if (innerRes.name == 'internalid') {
          binList.setSublistValue({
            id: itemId.id,
            line: lines,
            value: res.id
          })
        } else {
          if (innerRes.name == 'quantityavailable') {
            // pre-fill bin qty
            binList.setSublistValue({
              id: transferQuantity.id,
              line: lines,
              value: res.getValue(innerRes)
            })
          }
          //Update display type of the "Is Ecommerce" checkbox if the item is in the generic
          //receiving bin
          if (innerRes.name == 'binnumber') {
            if (res.getText(innerRes).indexOf('GENERIC') != -1) {
              log.debug(
                'change display of Is Ecommerce Item ',
                res.getText(innerRes)
              )
              filledItem.isQuantityAvailableInGenericBin = true // NG-2082

              var ecomField = form.getField({
                id: 'custpage_eia_fielddata_448'
              })
              if (ecomField) {
                log.debug('ecom field', ecomField)
                ecomField.updateDisplayType({
                  displayType: sw.FieldDisplayType.DISABLED
                })
              }
            }
          }
          binList.setSublistValue({
            id: columns[innerIndex].id,
            line: lines,
            value: res.getText(innerRes) || res.getValue(innerRes) || '&nbsp;'
          })
        }
      })

      lines++
      return true
    })
  }

  return form
}

function addButtons (
  form,
  masterOppSku,
  prepNotes,
  printString,
  showLabelIsOkayButton
) {
  var cancelButton = form.addButton({
    id: 'custpage_button',
    label: 'Cancel',
    functionName: 'cancelModal'
  })

  var save = form.addSubmitButton({
    label: 'Save'
  })

  if (!masterOppSku) {
    var imager = form.addButton({
      id: 'custpage_imguploader',
      label: 'Upload Images',
      functionName: 'imageUploader'
    })
  }

  if (prepNotes && !masterOppSku) {
    form.addButton({
      id: 'custpage_editfreenotes',
      label: 'Update Free Notes',
      functionName: 'freenotesLauncher()'
    })
  }

  var printButton = form.addButton({
    id: 'custpage_printer',
    label: 'Print Label',
    functionName: "printLabel('" + printString + "');"
  })

  if (showLabelIsOkayButton) {
    form.addButton({
      id: 'custpage_ok_label',
      label: 'Label is OK',
      functionName: 'okLabel()'
    })
  }

  return form
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

function addHiddenFields (
  allFields,
  alwaysIgnoreReprint,
  basePrice,
  brandAndCat,
  curItemRec,
  dynamicFieldsValue,
  filledItem,
  item,
  itemRec,
  itemClass,
  masterOppSku,
  needsNewLabel,
  params,
  prepNotes,
  priceAdjustments,
  priceFieldIds,
  spaFieldArray
) {

  addImageUploaderCalledSuiteletUrlField()
  createFieldsToSetIsEcommerceItemField(filledItem, form)

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
  // default brand and category field data
  if (brandAndCat.length > 0) {
    brandAndCategory.defaultValue = JSON.stringify(brandAndCat)
  } else {
    brandAndCategory.defaultValue = '[]'
  }

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
  // update spaFieldArray in hidden field
  if (spaFieldArray.length > 0) {
    hiddenSPA.defaultValue = JSON.stringify(spaFieldArray)
  }

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

  // store fieldIds of Price Impacting fields
  if (priceAdjustments.length > 0) {
    hiddenPriceAdjustment.defaultValue = JSON.stringify(priceAdjustments)
  } else {
    hiddenPriceAdjustment.defaultValue = '[]'
  }

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
  log.debug('vf dynamic fields after loop ', dynamicFieldsValue)
  dynamicFields.defaultValue = dynamicFieldsValue.join(',')

  // cacheKeyField
  var cacheKeyField = form.addField({
    id: 'custpage_cachekey',
    label: 'hidden',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })
  cacheKeyField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  cacheKeyField.defaultValue = params['cacheKey']

  // record and then will get updated ONLY  with the current Sell Price calculation
  var hiddenOriginalPrice = form.addField({
    id: 'custpage_original_price',
    label: 'Original Price',
    type: sw.FieldType.CURRENCY,
    container: 'custpage_hiddenfields'
  })
  hiddenOriginalPrice.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  hiddenOriginalPrice.defaultValue = basePrice

  var hiddenPriceFields = form.addField({
    id: 'custpage_price_fields',
    label: 'Price Fields',
    type: sw.FieldType.TEXT,
    container: 'custpage_hiddenfields'
  })
  hiddenPriceFields.defaultValue = JSON.stringify(priceFieldIds)
  hiddenPriceFields.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // beforePriceChanges
  var beforePriceChanges = form.addField({
    id: 'custpage_before_price_changes',
    label: 'Before Price Changes',
    type: sw.FieldType.CURRENCY,
    container: 'custpage_hiddenfields'
  })

  beforePriceChanges.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  // ignoreReprint (NG-2065)
  var ignoreReprintField = form.addField({
    id: 'custpage_ignore_reprint',
    label: '&nbsp;',
    type: sw.FieldType.TEXT
  })
  ignoreReprintField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  ignoreReprintField.defaultValue = alwaysIgnoreReprint

  // needsLabel (NG-2065)
  var needsLabel = form.addField({
    id: 'custpage_needs_label',
    label: '&nbsp;',
    type: sw.FieldType.INTEGER
  })
  needsLabel.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  needsLabel.defaultValue = needsNewLabel

  // firstAttribution
  // set the initial value here
  var firstAttribution = form.addField({
    id: 'custpage_first_attribution',
    label: '&nbsp;',
    type: sw.FieldType.TEXT
  })
  firstAttribution.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  firstAttribution.defaultValue = 'false'

  //TODO all field Array stringify to hidden field
  var hiddenFieldsField = form.addField({
    id: 'custpage_all_fields',
    label: 'All Fields',
    type: sw.FieldType.LONGTEXT
  })
  hiddenFieldsField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })
  hiddenFieldsField.defaultValue = JSON.stringify(allFields)

  // storing suitelet script ids that are 'generated' by client scripts

  // itemAttributeEditorScriptId
  var itemAttributeEditorScriptIdField = form.addField({
    id: 'custpage_item_attr_editor_script_id',
    label: 'Look Up For Attribute Script ID',
    type: sw.FieldType.TEXT,
    container: fieldGroup
  })

  itemAttributeEditorScriptIdField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  itemAttributeEditorScriptIdField.defaultValue = getParam(
    'custscript_lookup_item_for_attribute_id'
  )

  // itemConversionScriptId
  var itemConversionScriptIdField = form.addField({
    id: 'custpage_item_conversions_script_id',
    label: 'Item Conversions Script ID',
    type: sw.FieldType.TEXT,
    container: fieldGroup
  })

  itemConversionScriptIdField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  itemConversionScriptIdField.defaultValue = getParam(
    'custscript_item_conversion_script_id'
  )

  // selectLineScriptId
  var selectLineScriptIdField = form.addField({
    id: 'custpage_select_line_script_id',
    label: 'Item Conversions Script ID',
    type: sw.FieldType.TEXT,
    container: fieldGroup
  })

  selectLineScriptIdField.updateDisplayType({
    displayType: sw.FieldDisplayType.HIDDEN
  })

  selectLineScriptIdField.defaultValue = getParam(
    'custscript_select_line_script_id'
  )

  return {
    fieldData,
    form
  }

  function addImageUploaderCalledSuiteletUrlField (itemHelper, form) {
    var deployment = itemHelper.findAction(
      'customdeploy_imageuploadercalled_setter'
    )[0]

    var suiteletUrl = form.addField({
      id: 'custpage_hid_image_uploader_called_suitelet_url',
      type: sw.FieldType.TEXT,
      label: 'Image Uploader Called Suitelet url'
    })

    suiteletUrl.updateDisplayType({
      displayType: sw.FieldDisplayType.HIDDEN
    })

    suiteletUrl.defaultValue = deployment
  }
}

function addImageTabAndGallery (imageServer, filledItem, form) {
  var imageArray = []
  var serverImageRes = imageServer.getGalleryOrNull(filledItem.sku)

  if (
    serverImageRes &&
    serverImageRes.imageNames &&
    serverImageRes.imageNames.length > 0
  ) {
    imageArray = serverImageRes.imageNames

    var imageSubtab = form.addTab({
      id: 'custpage_image_subtab',
      label: 'Image Gallery'
    })

    var testImageWindow = form.addField({
      id: 'custpage_img_window',
      label: '&nbsp;',
      type: sw.FieldType.INLINEHTML,
      container: 'custpage_image_subtab'
    })

    var windowHtmlContent = getFileContent(
      'ImageGallery/template/img_gallery_template.html'
    )

    windowHtmlContent +=
      '<style>' + getFileContent('ImageGallery/style/style.css') + '</style>'

    windowHtmlContent +=
      '<script>' + getFileContent('ImageGallery/js/imgGallery.js') + '</script>'

    log.debug('image array: ', imageArray)

    windowHtmlContent = windowHtmlContent.replace('{{IMAGE_ARRAY}}', imageArray)

    testImageWindow.defaultValue = windowHtmlContent
  }

  return form
}

// addItemSellPriceFields
function addItemSellPriceFields (form) {
  // Add logic to get the Price from the item
  // decided not to add price info in the Item Cache to allow for real
  // time price updating

  var itemRec = record.load({
    type: 'inventoryitem',
    id: item.itemId
  })
  var priceArray = getBaseBidMrpAndOutOfStatePrices()
  var overrideTitle = false

  overrideTitle = itemRec.getValue({
    fieldId: 'custitem_wms_override_titles'
  })
  log.debug('overrideTitle', overrideTitle)

  var priceFieldIds = []

  for (var t = 0; t < priceArray.length; t++) {
    var priceVal = priceArray[t].split(':')
    var label = priceVal[0]
    var value = priceVal[1]
    var fieldId = label.replace(/ /g, '').toLowerCase()
    var displayType = sw.FieldDisplayType.INLINE

    if (label.indexOf('MSRP') != -1 && !masterOppSku) {
      displayType = sw.FieldDisplayType.ENTRY
    }
    if (itemClass == 1 || masterOppSku) {
      displayType = sw.FieldDisplayType.INLINE
    }

    priceFieldIds.push('custpage_' + fieldId + ':' + value + ':' + label)

    var priceField = form.addField({
      id: 'custpage_' + fieldId,
      label: label,
      type: sw.FieldType.CURRENCY,
      container: 'custpage_price_group'
    })
    priceField.defaultValue = value

    priceField.updateDisplayType({
      displayType: displayType
    })

    //VF Start here to adjust the layout of the price fields if needed... anticipating some feedback here
    //if uncommented, this makes ALL fields on the page align in 2 columns, may need to find a way to
    //enforce 3 columns???
    if (t == 0) {
      //	priceField.updateBreakType({
      //	    breakType : sw.FieldBreakType.STARTCOL
      //	});
    }
  }

  return {
    form,
    basePrice
  }

  function getBaseBidMrpAndOutOfStatePrices (item, itemRec) {
    var priceArray = []

    var basePrice = 0
    var bidPrice = 0
    var msrpPrice = 0
    var outOfStatePrice = 0

    if (item.itemId) {
      var basePriceLine = itemRec.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'Base Price'
      })
      if (basePriceLine != -1) {
        basePrice = itemRec.getSublistValue({
          sublistId: 'price',
          fieldId: 'price_1_',
          line: basePriceLine
        })

        priceArray.push('Base Price:' + basePrice)
        // hiddenOriginalPrice.defaultValue = basePrice;
      }
      var bidPriceLine = itemRec.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'Bid Price'
      })
      if (bidPriceLine != -1) {
        bidPrice = itemRec.getSublistValue({
          sublistId: 'price',
          fieldId: 'price_1_',
          line: bidPriceLine
        })

        priceArray.push('Bid Price:' + bidPrice)
      }

      //NG-1167 bring in Out Of State Price
      var outOfStateFieldLine = itemRec.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'Out Of State Price'
      })

      if (outOfStateFieldLine != -1) {
        outOfStatePrice = itemRec.getSublistValue({
          sublistId: 'price',
          fieldId: 'price_1_',
          line: outOfStateFieldLine
        })

        priceArray.push('Out Of State Price:' + outOfStatePrice)
      }

      var MSRPPriceLine = itemRec.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'MSRP'
      })

      if (MSRPPriceLine != -1) {
        msrpPrice = itemRec.getSublistValue({
          sublistId: 'price',
          fieldId: 'price_1_',
          line: MSRPPriceLine
        })

        priceArray.push('MSRP:' + msrpPrice)
      }

      return priceArray
    }
  }
}

function addReadOnlyFields (form, quantity) {
  // quantityOnHand
  var quantityField = form.addField({
    id: 'custpage_quantityonhand',
    label: 'Quantity Available',
    type: sw.FieldType.INTEGER,
    container: 'custpage_readonly'
  })
  quantityField.updateDisplayType({
    displayType: sw.FieldDisplayType.ENTRY
  })

  if (masterOppSku) {
    quantityField.updateDisplayType({
      displayType: sw.FieldDisplayType.DISABLED
    })
  }
  quantityField.defaultValue = parseInt(quantity) || 0

  return form;
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

function addVisibleFields (fieldGroup, form, item) {
  // NG-1809: count ebay field characters
  var ebayCharCount4jQuery = form.addField({
    id: 'custpage_ebay_char_count_4_j_query',
    label: 'Ebay Character Count',
    type: sw.FieldType.INLINEHTML,
    container: fieldGroup
  })

  ebayCharCount4jQuery.defaultValue = /*html*/ `
      <span>
        <p
          style="color:#6F6F6F!important; font-size:9pt!important; font-family: Open Sans,Helvetica,sans-serif;"
        >
          EBAY CHARACTER COUNT
        </p>

        <input
          maxlength="300"
          nonkeypress=""
          type="text"
          onfocus="this.checkvalid=true;"
          size="15"
          style="background-color:#FFFFFF!important; color:#000000 !important; text-align:right!important"
          class="inputuir-custom-field"
          id="ebay_char_count"
          value="0"
          display="block"
          readonly
        />
      </span> 
    `

  // NG-1456 - Add stock parent item image to page.
  // TODO: position image field top right of page

  if (item.otherItemType != '2') {
    var imgUrl =
      'https://imgs.2ndswing.com/images/clean-product/small/' +
      encodeURIComponent(item.parentSku) +
      '.jpg'

    log.debug('stock image url: ', imgUrl)

    var parentImageField = form.addField({
      id: 'custpage_parent_image',
      label: '&nbsp;',
      type: sw.FieldType.INLINEHTML,
      container: fieldGroup
    })

    parentImageField.defaultValue =
      '<img style ="max-width: 200px;" src=' + imgUrl + '>'
  }

  return form
}

function determineIfIrrelevantItem (itemClass, quantity, itemType) {
  var irrelevantItem

  var isNotUsedOrOpportunity = itemClass != '3' && itemClass != '2'
  var isNotGolfClubs = itemType !== 'Golf Clubs'

  if (isNotUsedOrOpportunity || isNotGolfClubs || quantity <= 0) {
    irrelevantItem = true
  } else {
    irrelevantItem = false
  }

  return irrelevantItem
}

function getCatRefs (filledItem) {
  var catRefs = search.lookupFields({
    type: 'customrecord_g2_category',
    id: filledItem.categoryId,
    columns: [
      'custrecord_g2_category_condition_refs',
      'custrecord_wms_field_display_order',
      'custrecord_wms_lofts_by_category'
    ]
  })

  return catRefs
}

function getCurItemRec (item, record) {
  return record.load({
    type: item.itemType,
    id: item.itemId
  })
}

function getFieldData (catRefs, filledItem) {
  var tempArray = []
  var fieldSortOrder = ''
  var sortedFieldArray = ''
  var fieldsNotInSort = []

  if (catRefs) {
    fieldSortOrder = catRefs['custrecord_wms_field_display_order']
    log.debug('fieldSortOrder', fieldSortOrder)
  }

  // If the sort field is not empty and there is NOT an error in the sort
  if (fieldSortOrder != '' && fieldSortOrder.indexOf('ERROR') == -1) {
    sortedFieldArray = fieldSortOrder.split(',')

    log.debug('Field Data Length', filledItem.fieldData.length)
    //Need to sort fieldItem.fieldData in the order that is defined on the Category Record
    for (var g = 0; g < filledItem.fieldData.length; g++) {
      var currField = filledItem.fieldData[g]['custrecord_fmd_field'].text
      // log.debug('checking if currField is in sortedArray', currField);

      //if the fieldData element is in the sortedFieldArray, set that element in the tempArray at the index of the
      //sortedFieldArray
      var sortIndex = sortedFieldArray.indexOf(currField)
      if (sortIndex != -1) {
        tempArray[sortIndex] = filledItem.fieldData[g]
      } else {
        fieldsNotInSort.push(filledItem.fieldData[g])
      }
    }
  }

  if (fieldsNotInSort.length > 0 && tempArray.length > 0) {
    tempArray = tempArray.concat(fieldsNotInSort)
  }

  log.debug(
    'length before setting all fields length',
    JSON.stringify(filledItem.fieldData.length)
  )
  log.debug('length tempArray ', tempArray.length)

  if (tempArray.length > 0) {
    log.debug(
      'filledItem array before setting fields - sorted',
      JSON.stringify(filledItem.fieldData)
    )

    return tempArray
  }
}

function getItemFromCache (cache, cacheKey, itemHelper, params) {
  var item

  if (params['cacheKey']) {
    var editCache = cache.getCache({
      name: cacheKey[0],
      scope: cache.Scope.PUBLIC
    })

    log.debug('cachekey:' + cacheKey.length, cacheKey)

    item = JSON.parse(
      editCache.get({
        key: params['cacheKey'],
        ttl: 300,
        loader:
          cacheKey.length == 5
            ? itemHelper.cacheTransactionItemLoader
            : itemHelper.cacheItemLoader
      }) || '{"cacheMiss":true}'
    )
  }

  return item
}

function getPrintString (itemHelper, params, runtime) {
  var printString
  var printItemArray = []
  var printDeploy = runtime.getCurrentScript().getParameter({
    name: 'custscript_wms_print_label_dep'
  })
  var printUrl = itemHelper.findAction(printDeploy)[0]

  printItemArray.push(params['cacheKey'])
  printString = printUrl.toString() + '&items=' + JSON.stringify(printItemArray)

  log.debug('print url', printUrl)
  log.debug('printString', printString)

  return printString
}

/**
 * Get the current Quantity on Hand at 98
 * @param {*} item
 */
function getQuantityAvailable (item) {
  var quantity = 0
  var itemSearchObj = getItemSearchObj(item)

  var itemQuantitySearchCount = itemSearchObj.runPaged().count

  if (itemQuantitySearchCount > 0) {
    var itemObj = itemSearchObj.run().getRange({
      start: 0,
      end: 1
    })
    quantity = itemObj[0].getValue('quantityavailable')
    log.debug('quantity avail at all locations', quantity)
  }

  return quantity

  function getItemSearchObj (item) {
    var itemSearchObj = search.create({
      type: 'item',
      filters: [
        ['internalidnumber', 'equalto', item.itemId]
        //   "AND",
        //   ["inventorylocation","anyof","4"]
      ],
      columns: [
        search.createColumn({
          name: 'itemid',
          sort: search.Sort.ASC,
          label: 'Name'
        }),
        search.createColumn({ name: 'quantityavailable', label: 'On Hand' })
      ]
    })

    return itemSearchObj
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

function handleBinTransfer () {
  var binTransferer = record.create({
    type: record.Type.BIN_TRANSFER
  })

  binTransferer.setValue({
    fieldId: 'location',
    value: runtime.getCurrentUser().location
  })

  log.debug({
    title: 'transferLines',
    details: JSON.stringify(transferLines)
  })

  var transferLine = 0

  for (var t = 0; t < transferLines.length; t++) {
    if (transferLines[t]['custpage_eia_transferbin']) {
      log.debug(
        'VF trying to add line to BT?',
        'line: ' +
          t +
          ' bin:' +
          transferLines[t]['custpage_eia_binonhand_binnumber']
      )
      log.debug(
        'VF bin transfer line length',
        binTransferer.getLineCount({ sublistId: 'inventory' })
      )

      binTransferer.setSublistValue({
        sublistId: 'inventory',
        fieldId: 'item',
        line: transferLine,
        value: transferLines[t]['custpage_eia_item']
      })

      binTransferer.setSublistValue({
        sublistId: 'inventory',
        fieldId: 'quantity',
        line: transferLine,
        value: transferLines[t]['custpage_eia_transferquantity']
      })

      var binDetail = binTransferer.getSublistSubrecord({
        sublistId: 'inventory',
        fieldId: 'inventorydetail',
        line: transferLine
      })
      var binStart = {}

      var binStartLookup = search.create({
        type: search.Type.BIN,
        filters: [
          search.createFilter({
            name: 'binnumber',
            operator: search.Operator.IS,
            values: [transferLines[t]['custpage_eia_binonhand_binnumber']]
          })
        ],
        columns: [
          search.createColumn({
            name: 'binnumber'
          }),
          search.createColumn({
            name: 'custrecord_wms_verifiable'
          })
        ]
      })

      binStartLookup.run().each(function (res) {
        binStart.id = res.id
        binStart.verified = res.getValue({
          name: 'custrecord_wms_verifiable'
        })

        return false
      })

      binDetail.setSublistValue({
        sublistId: 'inventoryassignment',
        fieldId: 'binnumber',
        value: binStart.id,
        line: 0
      })

      var binRes = {}

      var binLookup = search.create({
        type: search.Type.BIN,
        filters: [
          search.createFilter({
            name: 'binnumber',
            operator: search.Operator.IS,
            values: [transferLines[t]['custpage_eia_transferbin']]
          })
        ],
        columns: [
          search.createColumn({
            name: 'binnumber'
          }),
          search.createColumn({
            name: 'custrecord_wms_verifiable'
          })
        ]
      })

      binLookup.run().each(function (res) {
        binRes.id = res.id
        binRes.verified = res.getValue({
          name: 'custrecord_wms_verifiable'
        })

        return false
      })

      binDetail.setSublistValue({
        sublistId: 'inventoryassignment',
        fieldId: 'tobinnumber',
        line: 0,
        value: binRes.id
      })

      binDetail.setSublistValue({
        sublistId: 'inventoryassignment',
        fieldId: 'quantity',
        value: transferLines[t]['custpage_eia_transferquantity'],
        line: 0
      })
      transferLine++
    }
  }

  //
  if (binTransferer.getLineCount({ sublistId: 'inventory' }) > 0) {
    bt = binTransferer.save()
  } else {
    bt = 'No Bin Transfer Needed'
  }
  // message.defaultValue = "Bin Transfer created successfully: " + bt
}

function isOkayToAddLabelIsOkayButton (item, notifyOfLabel, lastPriceChange) {
  var needsNewLabel = 0 // 0 = false
  var showLabelIsOkayButton = false

  if (!item.ignoreReprint && notifyOfLabel) {
    // compare lastPriceChange with labelLastPrinted
    needsNewLabel = getNeedsNewLabel(lastPriceChange, item.labelLastPrinted)

    if (needsNewLabel == 2) {
      showLabelIsOkayButton = true
    }
  }

  // returns 3 possible values
  // If NOT needs new label = 0 or false;
  // If NEEDS new label = 1 or true;
  // If MAYBE needs new label = 2 or maybe;

  log.debug('Needs New Label value: ', needsNewLabel)

  return {
    needsNewLabel,
    showLabelIsOkayButton
  }
}

/**
 * For opportuntiy PO's if an item was replaced, need to edit the attributes of the replacement item, not the parent item
 * @param {*} record
 * @param {*} params
 * @param {*} filledItem
 */
function loadItemRecord (record, params, filledItem) {
  var itemRec

  if (params['custpage_repitem']) {
    itemRec = record.load({
      type: 'inventoryitem',
      id: params['custpage_repitem']
    })
  } else {
    itemRec = record.load({
      type: 'inventoryitem',
      id: filledItem.parentItemId
    })
  }

  return itemRec
}

function updateDefaultBPAFields (form, params) {
  // TJ, 1/4/21: it says checking, but is this actually setting?
  // check for defaultBPA parameter here
  if (params['custpage_default_bpa']) {
    log.debug('Default BPAs carried through?', params['custpage_default_bpa'])

    var defaultArray = JSON.parse(params['custpage_default_bpa'])

    for (fieldId in defaultArray) {
      var field = form.getField({
        id: fieldId
      })
      log.debug('trying to set ' + defaultArray[fieldId], field)
      field.defaultValue = defaultArray[fieldId]
    }
  }

  return form
}

/**
 * NG-937 for on the fly parent changes, ensure that the parent SKU is the current parent on the child item record

 * @param {*} item 
 */
function verifyParentSku (item) {
  var parentSearch = search.lookupFields({
    type: item.itemType,
    id: item.itemId,
    columns: [
      'parent',
      'class',
      'purchasedescription',
      'custitem_g2_default_shaft_model_refs',
      'externalid'
    ]
  })

  log.debug('parentSearch', parentSearch)
  var parentArrExists = parentSearch.parent[0]

  // exit if we are editing a parent
  if (!parentArrExists) {
    var messageText = 'Oof :  Attempting to modify parent item!'

    var form = sw.createForm({
      title: messageText,
      hideNavBar: true
    })

    context.response.writePage(form)

    throw messageText
  }

  return {
    parentSearch,
    parentArrExists
  }
}

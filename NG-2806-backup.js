// file name: ReturnAuthorization-UserEvent.js

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([
  'N/log',
  'N/search',
  'N/ui/serverWidget',
  'SuiteScripts/LIB_SearchHelpers'
], function (log, search, sw, searchHelpers) {
  function beforeLoad (context) {
    try {
      const form = context.form
      const newRecord = context.newRecord
      const recordObj = JSON.parse(JSON.stringify(newRecord))

      const {
        returnAuthCount,
        returnAuthSearch,
        returnAuthorizationSearchObj
      } = runReturnAuthorizationSearch(recordObj)

      // log.debug('beforeLoad(): newRecord', recordObj)

      let raRestockingFeeObj = loadRestockingFeeObject(newRecord)

      log.debug('beforeLoad(): raRestockingFeeObj', { raRestockingFeeObj })

      let returnObj

      form.clientScriptModulePath =
        '/SuiteScripts/WMS/shared/ReturnAuthorization-Client.js'

      var returnAuthCountDataField = form.addField({
        id: 'custpage_count_of_return_auths',
        type: sw.FieldType.INTEGER,
        label: 'Count Of Return Authorizations'
      })

      var customerRestockingFeeStatusField = form.addField({
        id: 'custpage_ra_restocking_fee_obj',
        type: sw.FieldType.LONGTEXT,
        label: 'Customer Restocking Fee Status'
      })

      var chargeRestockingFeeFieldTest = form.addField({
        id: 'custpage_ra_restock_fee_status',
        type: sw.FieldType.INLINEHTML,
        label: 'Charge Restocking Fee?'
      })

      const { customerRestockingFeeObj } = getCustomerRestockingFeeObj(context)
      let { custRestockFieldValue } = getCustRestockFeeFieldStatusVal(
        customerRestockingFeeObj
      )

      log.debug('custRestockFieldValue', { custRestockFieldValue })

      customerRestockingFeeStatusField.defaultValue = custRestockFieldValue

      returnAuthCountDataField.defaultValue = returnAuthCount

      customerRestockingFeeObj.items = []

      chargeRestockingFeeFieldTest.defaultValue = createRestockFeeTable(
        raRestockingFeeObj
      ).inlineHTML

      returnObj = {
        form,
        returnAuthCount,
        returnAuthCountDataField,
        returnAuthSearch,
        returnAuthorizationSearchObj
      }

      // log.debug('beforeLoad(): returnObj', JSON.stringify(returnObj))

      return returnObj
    } catch (error) {
      log.debug(error, error)
      log.debug('error.stack', error.stack)
    }

    function loadRestockingFeeObject (newRecord = {}) {
      let raRestockingFeeObj

      try {
        raRestockingFeeObj = newRecord.getValue(
          'custbody_ra_restocking_fee_obj'
        )

        raRestockingFeeObj = JSON.parse(raRestockingFeeObj)
      } catch (e) {
        loopThroughLineItems(newRecord)
        raRestockingFeeObj = getReturnAuthRestockingFeeObj()
      }

      return raRestockingFeeObj
    }
  }

  function addCategoriesToItems (items, categoriesObj) {
    let itemsWithCategories = [...items]

    items.forEach((item, index) => {
      let itemWCategory = itemsWithCategories[index]
      let category = categoriesObj[item.itemId]

      if (category) {
        itemWCategory.categoryId = category.value
        itemWCategory.categoryName = category.text
      } else {
        log.error(
          `addCategoriesToItems(): category missing for item:`,
          itemWCategory
        )
      }
    })

    return itemsWithCategories
  }

  function beforeSubmit (context) {
    const returnAuthRec = context.newRecord

    const { items, restockingFeeObj } = getReturnAuthRestockingFeeObj(
      returnAuthRec,
      context
    )
    const { customerRestockingFeeObj } = getCustomerRestockingFeeObj(context)

    saveCustomerRestockingFeeObj(customerRestockingFeeObj)
    setRestockingFeeSublistFields(items, returnAuthRec)
    saveReturnAuthRestockingFeeObj(restockingFeeObj)

    const updateCategoriesFieldObj = updateReturnAuthCategories(
      returnAuthRec,
      context
    )

    const returnObj = { restockingFeeObj, updateCategoriesFieldObj }

    log.debug('beforeSubmit(: returnObj)', { returnObj })

    return returnObj

    function saveCustomerRestockingFeeObj (customerRestockingFeeObj) {
      returnAuthRec.setValue({
        fieldId: 'custbody_ra_cust_restocking_fee_obj',
        value: JSON.stringify(customerRestockingFeeObj)
      })
    }

    function saveReturnAuthRestockingFeeObj (restockingFeeObj) {
      returnAuthRec.setValue({
        fieldId: 'custbody_ra_restocking_fee_obj',
        value: JSON.stringify(restockingFeeObj)
      })
    }
  }

  function createRAStockingFeeObject (items, raInternalId = '') {
    let raStockingFeeObj = {
      date: new Date(),
      raInternalId: raInternalId,
      raNeedsRestockFee: false,
      categories: {
        Driver: {
          categoryInternalId: '5',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        },
        'Fairway Wood': {
          categoryInternalId: '6',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        },
        Hybrid: {
          categoryInternalId: '9',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        },
        'Iron Set': {
          categoryInternalId: '10',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        },
        Putter: {
          categoryInternalId: '17',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        },
        'Single Iron': {
          categoryInternalId: '19',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        },
        Wedge: {
          categoryInternalId: '22',
          raCount: 0,
          restockingFeeCount: 0,
          exemptionCount: 0
        }
      },
      items: []
    }

    items.forEach(item => {
      let categories = raStockingFeeObj.categories
      let category = categories[item.categoryName]

      // category example for reference
      // Driver: {
      //     categoryInternalId: '5',
      //     raCount: 0,
      //     restockingFeeCount: 0,
      //     exemptionCount: 0
      //   }

      if (category) {
        category.raCount++
        item.stockingFee && category.restockingFeeCount++
        item.stockingFeeExemption && category.exemptionCount++
      } else {
        log.error(
          'createRAStockingFeeObject(): missing category for following item',
          { item }
        )
      }
    })

    raStockingFeeObj.items = [...items]
    raStockingFeeObj.raNeedsRestockFee = getItemsNeedRestockingFee(items)

    return raStockingFeeObj
  }

  function createRestockFeeTable (restockingFeeObj = {}) {
    let inlineHTML = ''

    if (restockingFeeObj === null) {
      log.debug('createRestockFeeTable():', 'missing: restockingFeeObj')

      return { inlineHTML }
    }

    const needsRestockingFee = restockingFeeObj.raNeedsRestockFee
    const itemsThatNeedRestockFee = getItemsThatNeedRestockingFee(
      restockingFeeObj
    )

    var needsRestockingFeeText = needsRestockingFee
      ? 'RA Needs Restocking Fee'
      : 'RA Does Not Need Restocking Fee'

    const containerColor = needsRestockingFee ? '#fac5c5' : 'inherit'
    const containerBorderWidth = needsRestockingFee ? '1.5' : '1.5'
    const containerBorderColor = needsRestockingFee ? '#704949' : '#dddddd'
    const containerProperties = {
      containerBorderColor,
      containerBorderWidth,
      containerColor
    }

    var restockFeeTableContainerStyle = `background-color: ${containerColor}; border: ${containerBorderWidth}px solid ${containerBorderColor}; border-radius: 10px; color: #484747; margin-top: 1%; padding: 1% 3.5%; max-width: 430px;`

    var restockFeeTableStyle =
      'border-collapse: collapse;' + 'font-size: 9pt;' + 'width: 100%'

    var tdColDescription = ''
    var boldStyle = 'font-weight: bold;'
    var restockFeeStyle = 'margin: 10%;' + 'padding: 0% 0% 0% 0%;'
    var tableRowStyle = 'text-indent: 2%;' //+ 'font-style: italic;'

    var fieldTitleStyle =
      'color: #6f6f6f !important; font-size: 9px; font-weight: normal !important; margin-top: 1%; text-transform: uppercase;'

    let addedTableRows = false

    let tableBodyHtml = /*html*/ `
        <tr>
          <td class="td-col-description receive-via bold" colspan="2" style=" ${tdColDescription}${restockFeeStyle}${boldStyle}"> ${needsRestockingFeeText}</td>
        </tr>`

    ;({ tableBodyHtml, addedTableRows } = addTableRows(
      addedTableRows,
      itemsThatNeedRestockFee,
      tableBodyHtml
    ))

    inlineHTML = /*html*/ `
          <div id="fieldTitle" style=" ${fieldTitleStyle}">Charge Restocking Fee?</div>
            <div id="restock-fee-table-container" style=" ${restockFeeTableContainerStyle}">
              <table id="restock-fee-table" style=" ${restockFeeTableStyle}">
                <tbody id="tb">
                  ${tableBodyHtml}
                </tbody>
              </table>
            </div>
        `

    log.debug('inlineHTML', { inlineHTML })

    const returnObj = {
      addedTableRows,
      containerProperties,
      inlineHTML,
      itemsThatNeedRestockFee,
      needsRestockingFeeText
    }

    // log.debug('createRestockFeeTable(): returnObj', { returnObj })

    return returnObj

    function addTableRows (
      addedTableRows,
      itemsThatNeedRestockFee,
      tableBodyHtml
    ) {
      addedTableRows = true

      itemsThatNeedRestockFee.forEach(item => {
        tableBodyHtml += /*html*/ `<tr>
                  <td class="td-col-description receive-via-children" style=" ${tdColDescription}${tableRowStyle}">${item}</td>
                </tr>`
      })

      return { addedTableRows, tableBodyHtml }
    }

    function getItemsThatNeedRestockingFee (restockingFeeObj) {
      let itemsThatNeedRestockFee = []

      restockingFeeObj.items.map(item => {
        let line

        if (item.showInRestockFeeTable) {
          line = `Line ${item.line}: ${item.itemDisplayName}`

          itemsThatNeedRestockFee.push(line)
        }
      })

      return itemsThatNeedRestockFee
    }
  }

  function getCustRestockFeeExemptObj (returnAuthRec, options = {}) {
    let customerRestockingFeeExemptionsObj = {},
      customerId,
      customerRecFieldData,
      cRDObj

    try {
      customerId = returnAuthRec.getValue('entity')
      customerRecFieldData = search.lookupFields({
        type: search.Type.CUSTOMER,
        id: customerId,
        columns: [
          'altname',
          'custentity_restock_fee_exempt_all_cats',
          'custentity_restock_fee_exempt_driver',
          'custentity_restock_fee_exempt_fairway',
          'custentity_restock_fee_exempt_hybrid',
          'custentity_restock_fee_exempt_iron_set',
          'custentity_restock_fee_exempt_putter',
          'custentity_restock_fee_exempt_single_iro',
          'custentity_restock_fee_exempt_wedge'
        ],
        searchResults: options.searchResults
      })

      // shortening customerRecFieldData for code readability
      cRDObj = customerRecFieldData

      customerRestockingFeeExemptionsObj = {
        name: cRDObj['altname'],
        date: Date(),
        allCats: cRDObj['custentity_restock_fee_exempt_all_cats'],
        Driver: cRDObj['custentity_restock_fee_exempt_driver'],
        'Fairway Wood': cRDObj['custentity_restock_fee_exempt_fairway'],
        Hybrid: cRDObj['custentity_restock_fee_exempt_hybrid'],
        'Iron Set': cRDObj['custentity_restock_fee_exempt_iron_set'],
        Putter: cRDObj['custentity_restock_fee_exempt_putter'],
        'Single Iron': cRDObj['custentity_restock_fee_exempt_single_iro'],
        Wedge: cRDObj['custentity_restock_fee_exempt_wedge']
      }
    } catch (e) {
      log.debug('error in getCustomerRestockingFeeExemptionsObj() ', { e })
    }

    return {
      customerId,
      customerRecFieldData,
      customerRestockingFeeExemptionsObj,
      custRestockFeeExemptObj: customerRestockingFeeExemptionsObj,
      search
    }
  }

  function getCustomerRestockingFeeObj (context) {
    let customerRestockingFeeObj = getCustomerRestockingFeeObjTemplate()
    let options = { ...context }

    try {
      const recordObj = JSON.parse(JSON.stringify(context.newRecord))
      //  customerRestockingFeeObj = getCustomerRestockingFeeObjTemplate()

      options.columns = ['custbody_ra_restocking_fee_obj']

      const { search, searchResults } = runReturnAuthorizationSearch(
        recordObj,
        options
      )
      searchResults.forEach(result => {
        // log.debug('getCustomerRestockingFeeObj(): search result', { result })

        customerRestockingFeeObj.raInternalIds.push(result.id)
        customerRestockingFeeObj.date = new Date()

        const raRestockFieldString = getRARestockFieldString(result)

        const raRestockFieldValue = raRestockFieldString
          ? JSON.parse(raRestockFieldString)
          : {}

        const categoriesObj = raRestockFieldValue.categories
        const categories = Object.keys(categoriesObj)

        categories.forEach(category => {
          const custCat = customerRestockingFeeObj.categories[category]
          const resultCat = categoriesObj[category]

          custCat.raCount += resultCat.raCount
          custCat.restockingFeeCount += resultCat.restockingFeeCount
          custCat.exemptionCount += resultCat.exemptionCount
        })
      })

      const returnObj = { customerRestockingFeeObj, searchResults }

      log.debug('getCustomerRestockingFeeObj(): returnObj', { returnObj })

      return returnObj
    } catch (error) {
      log.debug(error, error)
      log.debug('error.stack', error.stack)
    }

    function getCustomerRestockingFeeObjTemplate () {
      const customerRestockingFeeObj = {
        raInternalIds: [],
        date: null,
        categories: {
          Driver: {
            categoryInternalId: '5',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          'Fairway Wood': {
            categoryInternalId: '6',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          Hybrid: {
            categoryInternalId: '9',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          'Iron Set': {
            categoryInternalId: '10',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          Putter: {
            categoryInternalId: '17',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          'Single Iron': {
            categoryInternalId: '19',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          Wedge: {
            categoryInternalId: '22',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          }
        }
      }

      return customerRestockingFeeObj
    }

    function getRARestockFieldString (result) {
      let raRestockFieldString = ''

      if (result.custbody_ra_restocking_fee_obj) {
        raRestockFieldString = result.custbody_ra_restocking_fee_obj.value
      } else if (result.values) {
        raRestockFieldString = result.values.custbody_ra_restocking_fee_obj
      }

      if (!raRestockFieldString) {
        raRestockFieldString = JSON.stringify(
          getCustomerRestockingFeeObjTemplate()
        )
      }

      return raRestockFieldString
    }
  }

  function getCustRestockFeeFieldStatusVal (customerRestockingFeeObj = {}) {
    let custRestockFieldValue = ``

    const categoriesObj = customerRestockingFeeObj.categories
    const categoryNames = Object.keys(categoriesObj)

    categoryNames.forEach(catName => {
      const raCount = categoriesObj[catName].raCount
      const exemptionCount = categoriesObj[catName].exemptionCount

      if (raCount) {
        const restockingFeeStatus = `[ RA Count: ${raCount}, Exemptions: ${exemptionCount} ]`
        custRestockFieldValue += `&emsp;${catName}: ${restockingFeeStatus}<br>\n`
      }
    })

    return { custRestockFieldValue }
  }

  function getItemCategories (itemIds, context = {}) {
    let itemCategories = []
    let itemCategoriesObj = {}

    if (context.itemCategories || context.itemCategoriesObj) {
      return {
        itemCategories: context.itemCategories,
        itemCategoriesObj: context.itemCategoriesObj
      }
    }

    // log.debug({ itemIds })

    itemIds.forEach(id => {
      let itemCategoryField

      try {
        let itemCategoryObj = search.lookupFields({
          type: 'inventoryitem',
          id: id,
          columns: ['custitem_wms_parentitemcategory'],
          searchResults: context.lookUpFieldResults || {
            custitem_wms_parentitemcategory: [{}]
          }
        })

        // log.debug('getItemCategories()', { itemCategoryObj })

        if (itemCategoryObj.custitem_wms_parentitemcategory) {
          itemCategoryField = itemCategoryObj.custitem_wms_parentitemcategory[0]

          itemCategories.push(itemCategoryField.value)
          itemCategoriesObj[id] = itemCategoryField
        }
      } catch (error) {
        log.error(error)
        log.error('error.stack', error.stack)
      }
    })

    const returnObj = { itemCategories, itemCategoriesObj }

    // log.debug('getItemCategories(): returnObj', { returnObj })

    return returnObj
  }

  function getItemsNeedRestockingFee (items = []) {
    var itemNeedsRestockingFee = false
    var itemsNeedRestockingFee = false
    var itemQualifiesForRestockingFee = false
    var itemIsExemptFromRestockingFee = false
    var item

    for (let i = 0; i < items.length; i++) {
      item = items[i]
      itemQualifiesForRestockingFee = item.stockingFee
      itemIsExemptFromRestockingFee = item.stockingFeeExemption

      if (itemIsExemptFromRestockingFee) {
        itemNeedsRestockingFee = false
      } else if (itemQualifiesForRestockingFee) {
        itemNeedsRestockingFee = true
      }

      if (itemNeedsRestockingFee) {
        itemsNeedRestockingFee = true

        if (item.stockingFee === true) {
          item.showInRestockFeeTable = true
        }
      }
    }

    return itemsNeedRestockingFee
  }

  function getReturnAuthRestockingFeeObj (returnAuthRec, context) {
    let restockingFeeObj = {}
    const custStockFeeObj = getCustStockFeeObj()

    // log.debug({ custStockFeeObj })

    const { items, itemIds } = loopThroughLineItems(returnAuthRec)
    const { itemCategoriesObj } = getItemCategories(itemIds, context)
    const itemsWithCats = addCategoriesToItems(items, itemCategoriesObj)
    const { custRestockFeeExemptObj } = getCustRestockFeeExemptObj(
      returnAuthRec,
      context
    )
    const { itemsWithCatsAndStockFee } = updateRestockFeeFieldForEachLineItem(
      custStockFeeObj,
      itemsWithCats,
      custRestockFeeExemptObj
    )

    restockingFeeObj = createRAStockingFeeObject(
      itemsWithCatsAndStockFee,
      context.newRecord.id
    )

    // log.debug('getReturnAuthRestockingFeeObj(): items', { items })
    // log.debug('getReturnAuthRestockingFeeObj(): itemCategoriesObj', {
    //   itemCategoriesObj
    // })
    // log.debug('getReturnAuthRestockingFeeObj(): itemsWithCats', {
    //   itemsWithCats
    // })
    // log.debug(
    //   'getReturnAuthRestockingFeeObj(): customerRestockingFeeExemptionsObj',
    //   { customerRestockingFeeExemptionsObj }
    // )
    // log.debug('getReturnAuthRestockingFeeObj(): restockingFeeObj', {
    //   restockingFeeObj
    // })

    // log.debug('aaa', restockingFeeObj)

    return {
      customerRestockingFeeExemptionsObj: custRestockFeeExemptObj,
      items: itemsWithCatsAndStockFee,
      restockingFeeObj
    }

    function getCustStockFeeObj () {
      let stockFeeObj = {}

      const custRestockFeeObjString = returnAuthRec.getValue({
        fieldId: 'custbody_ra_cust_restocking_fee_obj'
      })

      if (custRestockFeeObjString) {
        stockFeeObj = JSON.parse(custRestockFeeObjString)
      } else {
        stockFeeObj = getCustStockFeeObjTemplate()
      }

      return stockFeeObj
    }

    function getCustStockFeeObjTemplate () {
      const customerRestockingFeeTemplateObj = {
        raInternalIds: [],
        date: null,
        categories: {
          Driver: {
            categoryInternalId: '5',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          'Fairway Wood': {
            categoryInternalId: '6',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          Hybrid: {
            categoryInternalId: '9',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          'Iron Set': {
            categoryInternalId: '10',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          Putter: {
            categoryInternalId: '17',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          'Single Iron': {
            categoryInternalId: '19',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          },
          Wedge: {
            categoryInternalId: '22',
            raCount: 0,
            restockingFeeCount: 0,
            exemptionCount: 0
          }
        }
      }

      return customerRestockingFeeTemplateObj
    }
  }

  function getValue (fieldId, currentRecord) {
    var value = currentRecord.getValue({
      fieldId: fieldId
    })
    return value
  }

  function loopThroughLineItems (returnAuthRec) {
    let items = []
    let itemIds = []

    const itemListCount = returnAuthRec.getLineCount({
      sublistId: 'item'
    })

    let line

    for (line = 0; line < itemListCount; line++) {
      // console.log({ location: 'loop', line })
      const itemObj = createItemObj()
      let itemId = getSublistValue('item')
      let itemDisplayName = getSublistValue('item_display')

      itemObj.line = line + 1
      itemObj.isFirstReturnInCategory = null
      itemObj.itemDisplayName = itemDisplayName
      itemObj.itemId = itemId
      itemObj.stockingFee = null
      itemObj.stockingFeeExemption = null

      items.push(itemObj)
      itemIds.push(itemId)
    }

    return { itemIds, items, sublistItems: items }

    function getSublistValue (fieldId) {
      const value = returnAuthRec.getSublistValue({
        sublistId: 'item',
        fieldId: fieldId,
        line: line
      })

      return value
    }

    function createItemObj () {
      const itemObj = {
        line: null,
        itemDisplayName: '',
        itemId: '',
        showInRestockFeeTable: false,
        stockingFee: false,
        stockingFeeExemption: false
      }

      return itemObj
    }
  }

  function runReturnAuthorizationSearch (recordObj, context = {}) {
    let returnAuthCount
    // log.debug('recordObj', { recordObj })

    const customerId = recordObj.fields.entity
    let searchResults = []
    const currentRecId = recordObj.id

    const filters = [
      ['type', 'anyof', 'RtnAuth'],
      'AND',
      ['customermain.internalidnumber', 'equalto', customerId],
      'AND',
      ['status', 'anyof', 'RtnAuth:G'],
      'AND',
      ['location', 'anyof', '1', '2', '3', '16', '116', '11'],
      'AND',
      ['trandate', 'within', 'thisyeartodate'],
      'AND',
      ['mainline', 'is', 'T']
    ]

    // currentRecId may not exist because we are in a 'create' context, if so, skip
    if (currentRecId) {
      filters.push('AND')
      filters.push(['internalid', 'noneof', currentRecId])
    }

    let columns = [
      'custbody_ra_categories',
      'custbody_charge_restocking_fee',
      'custbody_restocking_fee_exemption'
    ]

    columns = context.columns || columns

    // log.debug('runReturnAuthorizationSearch(): {columns, context}', {
    //   columns,
    //   context
    // })

    const returnAuthSearch = {
      type: 'returnauthorization',
      filters,
      columns: columns
    }

    let returnAuthorizationSearchObj = search.create(returnAuthSearch)

    if (context.isTesting) {
      returnAuthorizationSearchObj.searchResults = context.searchResults
    }

    try {
      returnAuthCount = returnAuthorizationSearchObj.runPaged().count
      searchResults = searchHelpers.getFormattedSearchResults(
        returnAuthorizationSearchObj
      )
    } catch (error) {
      log.debug(error)
      log.debug(error, error)
      log.debug('stack', error.stack)
    }

    return {
      filters,
      returnAuthCount,
      returnAuthSearch,
      returnAuthorizationSearchObj,
      search,
      searchHelpers,
      searchResults
    }
  }

  function setRestockingFeeSublistFields (items = [], returnAuthRec = {}) {
    // log.debug({ items })
    items.forEach(item => {
      const line = item.line - 1
      const restockingFee = item.stockingFee || false
      const restockingFeeExemption = item.stockingFeeExemption || false

      returnAuthRec.setSublistValue({
        sublistId: 'item',
        fieldId: 'custcol_charge_restocking_fee',
        line: line,
        value: restockingFee
      })

      returnAuthRec.setSublistValue({
        sublistId: 'item',
        fieldId: 'custcol_restocking_fee_exemption',
        line: line,
        value: restockingFeeExemption
      })
    })

    return { items, returnAuthRec }
  }

  function updateReturnAuthCategories (returnAuthRec, context = {}) {
    const { itemIds } = loopThroughLineItems(returnAuthRec)
    const { itemCategories } = getItemCategories(itemIds, context)
    let categoriesField = ''

    try {
      returnAuthRec.setValue({
        fieldId: 'custbody_ra_categories',
        value: itemCategories,
        ignoreFieldChange: true
      })

      categoriesField = returnAuthRec.getValue({
        fieldId: 'custbody_ra_categories'
      })
    } catch (error) {
      log.debug('error.stack', error.stack)
    }

    const returnObj = { categoriesField, itemCategories, itemIds }

    return returnObj
  }

  function updateRestockFeeFieldForEachLineItem (
    customerRestockingFeeObj = {},
    items = [],
    customerRestockingFeeExemptionsObj = {}
  ) {
    let updatedRestockingFeeObj = { ...customerRestockingFeeObj }
    let itemsWithCatsAndStockFee = [...items]
    const cRFEObj = customerRestockingFeeExemptionsObj

    items.forEach(item => {
      const category = item.categoryName
      const customerCategoryObj = category
        ? customerRestockingFeeObj.categories[category]
        : false

      // log.debug(category, { customerCategoryObj })

      if (customerCategoryObj) {
        const isFirstReturnInCategory = customerCategoryObj.raCount === 0
        const isCatExemptForCustomer = cRFEObj['allCats'] || cRFEObj[category]

        customerCategoryObj.raCount++
        item.isFirstReturnInCategory = isFirstReturnInCategory

        if (isFirstReturnInCategory) {
          item.stockingFee = false
        } else {
          customerCategoryObj.restockingFeeCount++
          item.stockingFee = true
        }

        if (isCatExemptForCustomer) {
          item.stockingFeeExemption = true
        }
      }
    })

    return {
      customerRestockingFeeObj,
      items,
      itemsWithCatsAndStockFee,
      updatedRestockingFeeObj
    }
  }

  return {
    addCategoriesToItems,
    beforeLoad,
    beforeSubmit,
    createRAStockingFeeObject,
    createRestockFeeTable,
    getCustomerRestockingFeeObj,
    getCustRestockFeeFieldStatusVal,
    getItemCategories,
    getItemsNeedRestockingFee,
    getCustomerRestockingFeeExemptionsObj: getCustRestockFeeExemptObj,
    getReturnAuthRestockingFeeObj,
    loopThroughLineItems,
    runReturnAuthorizationSearch,
    setRestockingFeeSublistFields,
    updateReturnAuthCategories,
    updateRestockFeeFieldForEachLineItem
  }
})

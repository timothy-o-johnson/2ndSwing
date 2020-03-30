// NG-xxxx debugger

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
  //
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

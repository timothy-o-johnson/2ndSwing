// NG-1387
// script: https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=37

// 10/16/19
// created NG - 1387 - itemHelper.createItem & NG - 1387ChildItemCreation.itemCreation to organize and then consolidate the two files in SDF
// compare the above two files

// 10/15/19
// launches the following when you click the '+' button
// https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=44&deploy=1&compid=4537321_SB1&custpage_function=create&custpage_tranid=3322229&custpage_trantype=purchaseorder&custpage_itemtype=2&cacheKey=purchaseorder:3322229:inventoryitem
//
// the actual script being deployed: https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=44&id=44&whence=
// debug
// one-off deployment: https://4537321-sb1.app.netsuite.com/app/common/scripting/scriptrecord.nl?id=133
var results = [
  {
    recordType: 'purchaseorder',
    id: '2047088',
    values: {
      lineuniquekey: '6723264',
      item: [{ value: '984711', text: 'SPIDER X COPPER HCP' }],
      quantity: '1',
      'item.baseprice': '19.99',
      custcol_g2_condition_ref: []
    }
  },
  {
    recordType: 'purchaseorder',
    id: '3321313',
    values: {
      lineuniquekey: '9834366',
      item: [{ value: '52796', text: 'G400 NEW STS' }],
      quantity: '1',
      'item.baseprice': '499.99',
      custcol_g2_condition_ref: []
    }
  },
  {
    recordType: 'purchaseorder',
    id: '3321316',
    values: {
      lineuniquekey: '9834374',
      item: [{ value: '1020585', text: 'M6 NEW DVR' }],
      quantity: '1',
      'item.baseprice': '369.99',
      custcol_g2_condition_ref: [{ value: '15', text: 'Average' }]
    }
  },
  {
    recordType: 'purchaseorder',
    id: '3321317',
    values: {
      lineuniquekey: '9834376',
      item: [{ value: '1020585', text: 'M6 NEW DVR' }],
      quantity: '1',
      'item.baseprice': '369.99',
      custcol_g2_condition_ref: [{ value: '15', text: 'Average' }]
    }
  },
  {
    recordType: 'purchaseorder',
    id: '3321317',
    values: {
      lineuniquekey: '9834377',
      item: [{ value: '37344', text: 'G30 NEW DVR' }],
      quantity: '1',
      'item.baseprice': '169.99',
      custcol_g2_condition_ref: [{ value: '15', text: 'Average' }]
    }
  },
  {
    recordType: 'purchaseorder',
    id: '3321319',
    values: {
      lineuniquekey: '9834386',
      item: [{ value: '1020585', text: 'M6 NEW DVR' }],
      quantity: '1',
      'item.baseprice': '369.99',
      custcol_g2_condition_ref: [{ value: '15', text: 'Average' }]
    }
  }
]

// debug for PO
var poLineObj = {
  recordType: 'purchaseorder',
  id: '2047088',
  values: {
    lineuniquekey: '6723264',
    item: [{ value: '984711', text: 'SPIDER X COPPER HCP' }],
    quantity: '1',
    'item.baseprice': '19.99',
    custcol_g2_condition_ref: []
  }
}

var helpObj = {
  internalid: 1234,
  firstname: 'Joe',
  my_select: [{ value: 1, text: 'US Sub' }],
  my_multiselect: [{ value: 1, text: 'US Sub' }, { value: 2, text: 'EU Sub' }]
}

// i don't think we can access the sublist directly via a search.lookupFields
// going to pull the record and pull the sublist data down that way

require(['N/record', 'N/search', 'N/runtime', 'N/cache'], /**
 * @param {record}
 *            record
 * @param {search}
 *            search
 */ function (record, search, runtime, cache) {
  // create cache
    var cachedParentMSRPs = cache.getCache({ name: 'Parent MSRPs' })
    var parentMSRP = null
    var successfulSave = false
    var childrenWithoutMsrpsSearchResults = getChildrenWithoutMsrps()
   var parentInternalId = childrenWithoutMsrpsSearchResults[0].getValue({ name: 'parent' })
   var childId = childrenWithoutMsrpsSearchResults[0].id



    // load the child record
    var childRecord = record.load({
      type: record.Type.INVENTORY_ITEM,
      id: childId
    })

    // get the parent's MSRP
    // first check to see if parent is in cache
    if (cachedParentMSRPs.get({ key: parentInternalId })) {
    // if parent exists in cache, set parentMSRP
      parentMSRP = cachedParentMSRPs.get({ key: parentInternalId })
    } else {
    // search for the parent MSRP
      parentMSRP = getParentMSRP(parentInternalId)
      // store it in the cache
      cachedParentMSRPs.put({
        key: parentInternalId,
        value: parentMSRP
      })
    }

    // populate child item with MSRP
    successfulSave = setMsrpOnChildRecord(childRecord, parentMSRP)

   return successfulSave

    function getChildrenWithoutMsrps () {
      var childrenWithoutMsrpsSearch = search.load({
        id: 'customsearch_children_missing_msrps'
      })
      
      return childrenWithoutMsrpsSearch.run().getRange({ start: 0, end: 100 })
    }
   
    function setMsrpOnChildRecord (childRecord, parentMSRP) {
      var msrpLine = childRecord.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'MSRP'
      })

      childRecord.setSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: msrpLine,
        value: parentMSRP
      })

      return childRecord.save()
    }

    // var parentInternalId = '984711'

    function getParentMSRP (parentInternalId) {
      var parentItem = record.load({
        type: record.Type.INVENTORY_ITEM,
        id: parentInternalId,
        isDynamic: false
      })

      var lineNum = parentItem.findSublistLineWithValue({
        sublistId: 'price',
        fieldId: 'pricelevelname',
        value: 'MSRP'
      })

      var parentMSRP = parentItem.getSublistValue({
        sublistId: 'price',
        fieldId: 'price_1_',
        line: lineNum
      })

      return parentMSRP
    }
  })

parentItem.getSublistValue({
  sublistId: 'price',
  fieldId: 'pricelevelname',
  line: lineNum
})
// MSRP

parentItem.getSublistFields({ sublistId: 'price' })

// Testing the search for map reduce

require(['N/record', 'N/search', 'N/runtime'], /**
 * @param {record}
 *            record
 * @param {search}
 *            search
 */ function (record, search, runtime) {
    var length = runtime.getCurrentScript().getParameter({
      name: 'custscript_wms_search_length'
    })

    if (
      length == '' ||
    length == ' ' ||
    length == null ||
    length == 'undefined'
    ) {
      length = 1000
    }

    var parentItemSearch = search.create({
      type: search.Type.PURCHASE_ORDER,
      filters: [
        search.createFilter({
          name: 'mainline',
          operator: search.Operator.IS,
          values: ['F']
        }),
        search.createFilter({
          name: 'custcol_wms_childitemgenerator',
          operator: search.Operator.IS,
          values: ['T']
        }),
        search.createFilter({
          name: 'type',
          join: 'item',
          operator: search.Operator.ANYOF,
          values: ['InvtPart']
        })
      ],
      columns: [
        search.createColumn({
          name: 'lineuniquekey'
        }),
        search.createColumn({
          name: 'item'
        }),
        search.createColumn({
          name: 'quantity'
        }),
        search.createColumn({
          name: 'baseprice',
          join: 'item'
        }),
        search.createColumn({
          name: 'custcol_g2_condition_ref'
        })
      ]
    })
    log.debug('search length', length)

    var searchObj = parentItemSearch.run().getRange({ start: 0, end: length })

    if (length > 0) {
      return searchObj
    } else {
      throw 'INVALID SEARCH LENGTH'
    }
  })

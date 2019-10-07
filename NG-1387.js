// NG-1387
// script: https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=37

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

require(['N/record', 'N/search', 'N/runtime'], /**
 * @param {record}
 *            record
 * @param {search}
 *            search
 */ function (record, search, runtime) {
    var parentInternalId = '984711'

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

    var updatedItem = parentItem.setSublistValue({
      sublistId: 'price',
      line: lineNum,
      fieldId: 'price_1_',
      value: '10'
    })

    parentItem.save()

    log.debug('result', result)
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
    name : 'custscript_wms_search_length'
  });

  if(length == "" || length == " " || length == null || length == 'undefined'){
    length = 1000;
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
    

		if(length > 0){
			return searchObj;
		}
		else{
			throw "INVALID SEARCH LENGTH"
    }
  })

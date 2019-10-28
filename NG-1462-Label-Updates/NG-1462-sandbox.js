var items = ['purchaseorder:3322229:inventoryitem:2799392:9835937']

function convertItemsToObject (items) {
  var itemsObj = {}
  var field, value

  try {
    items = Array.isArray(items) ? items : JSON.parse(items) // creates an array with one string
    items = items[0].split(':') // creates an array

    // build itemObject
    for (var i = 0; i < items.length; i++) {
      field = items[i]
      value = items[i + 1]
      itemsObj[field] = value
      i++
    }
  } catch (e) {
    console.log('dammit!')
  }
  return itemsObj
}

console.log(convertItemsToObject(items))

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
}

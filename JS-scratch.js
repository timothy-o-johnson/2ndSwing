var context = { "type": "mapreduce.MapContext", "isRestarted": false, "executionNo": 1, "key": "22", "value": "{\"id\":\"2397736\",\"itemid\":{\"value\":\"ANSER NEW HYG : W0023462\",\"text\":null},\"internalid\":{\"value\":\"2397736\",\"text\":\"2397736\"},\"custitem_wms_parentitemcategory\":{\"value\":\"9\",\"text\":\"Hybrid\"},\"baseprice\":{\"value\":\"4000.00\",\"text\":null}}" }

var stage = 'map'

var childValues = JSON.parse(context.value)
console.log(stage + ' key ' + context.key, childValues)

var category = childValues.custitem_wms_parentitemcategory.value
console.log('child category', category)

var basePrice = childValues.baseprice.value

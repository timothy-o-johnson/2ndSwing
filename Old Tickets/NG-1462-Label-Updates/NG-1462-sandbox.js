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

require(['N/search'], function (search) {
  var internalid
  var itemSearchObj = search.create({
    type: 'item',
    filters: [['externalid', 'anyof', 'G0061837']],
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

  internalid = firstResult.getValue(itemSearchResults.columns[1])

  log.debug(JSON.stringify('firstResult', firstResult))
  log.debug(JSON.stringify('value', value))

  return true
})

var contextDebug = {
  request: {
    type: 'http.ServerRequest',
    method: 'GET',
    url: 'https://debugger.na0.netsuite.com/app/site/hosting/scriptlet.nl',
    parameters: {
      compid: '4537321_SB1',
      items: '["inventoryitem:156945"]',
      script: '265',
      deploy: '1'
    },
    headers: {
      referer:
        'https://debugger.na0.netsuite.com/app/common/item/item.nl?id=156945&whence=',
      'sec-fetch-site': 'same-origin',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',
      DNT: '1',
      'Accept-Encoding': 'gzip, deflate, br',
      'sec-fetch-user': '?1',
      'Sec-Fetch-Mode': 'navigate',
      'x-forwarded-host': 'debugger.na0.netsuite.com',
      'Upgrade-Insecure-Requests': '1',
      host: 'debugger.na0.netsuite.com',
      'upgrade-insecure-requests': '1',
      'Sec-Fetch-User': '?1',
      'ns-client-ip': '76.112.162.111',
      connection: 'keep-alive',
      'cache-control': 'no-cache',
      Cookie:
        'AMCV_A6F7776A5245B0EF0A490D44%40AdobeOrg=T; _gcl_au=1.1.9466519.1570135326; __utmz=19239463.1570135326.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); bn_u=6927988791787752467; loginredirect=true; logincountry=US; Zs1EHIXHehv2RdHv1HkdLQ=AAABbZbixjIhtiCjrSGkkYrZZQP18VZKUoFrKC-h4NIujy9gkFWBdA; atgRecVisitorId=13961QwWWl2iLro7q__Wv_SiN_ka6E7mtNzR1GSonfle-UwD108; __utma=19239463.1315776687.1570135326.1570826734.1571147017.6; s_vnum=1572580800490%26vn%3D5; s_nr=1571147019254-Repeat; lastUser=4537321_SB1_1269484_1033; NS_VER=2019.2.0; NS_ROUTING_VERSION=LAGGING; uir_list_filters_expanded=0; ScreenWidth=1920; ScreenHeight=1080; JSESSIONID=lOAuKo0cP29_3GnhfKq7BGBBBrwjwH_oX-e9Flo4zuBxXUU9ZSVGo9RF696g0gUbVTSFz4V-tC07JYKcQ2l3f6HFayM9Ovx3TRD1RTs0mq428vji8sjiXAkRs7c6UA51!1143547467; stickytags=dummy,EVENTS:q4wAZzF70,OTHERCARD:q4wAZzF70,EVENT_REMINDERS:q4wAZzIqL,RECENTRECORDS:q4wAZzIbX,STARTUP:q4wAZzF70,VERYSTATICPAGE:q4wAZzF70,QUICK_SEARCH:q4wAZzF70,ACCOUNTCENTER:q4wAZzF70,FOLLOWNETSUITE:q4wAZzF70,SHORTCUTS:q4wAZzF70,USERGROUP:q4wAZzF70,SYSTEMSTATUS:q4wAZzF70,SCRIPTPORTLET:q4wAZzIqL,NEWFEATURES:q4wAZzF70,SUITEANSWERS:q4wAZzF70,REMINDERS:q4wAZzF70,ROLEMENU:q4wAZzF70,RSSSOURCE:q4wAZzF70,SNAPSHOTS:q4wAZzF70,MAPPING:q4wAZzF70,HOME:q4wAZzF70,NAVMENUS:q4wAZzF70,KPIMETER:q4wAZzF70; jsid_own=4537321_SB1.-475108720',
      'sec-fetch-mode': 'navigate',
      'NS-Client-IP': '76.112.162.111',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      cookie:
        'AMCV_A6F7776A5245B0EF0A490D44%40AdobeOrg=T; _gcl_au=1.1.9466519.1570135326; __utmz=19239463.1570135326.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); bn_u=6927988791787752467; loginredirect=true; logincountry=US; Zs1EHIXHehv2RdHv1HkdLQ=AAABbZbixjIhtiCjrSGkkYrZZQP18VZKUoFrKC-h4NIujy9gkFWBdA; atgRecVisitorId=13961QwWWl2iLro7q__Wv_SiN_ka6E7mtNzR1GSonfle-UwD108; __utma=19239463.1315776687.1570135326.1570826734.1571147017.6; s_vnum=1572580800490%26vn%3D5; s_nr=1571147019254-Repeat; lastUser=4537321_SB1_1269484_1033; NS_VER=2019.2.0; NS_ROUTING_VERSION=LAGGING; uir_list_filters_expanded=0; ScreenWidth=1920; ScreenHeight=1080; JSESSIONID=lOAuKo0cP29_3GnhfKq7BGBBBrwjwH_oX-e9Flo4zuBxXUU9ZSVGo9RF696g0gUbVTSFz4V-tC07JYKcQ2l3f6HFayM9Ovx3TRD1RTs0mq428vji8sjiXAkRs7c6UA51!1143547467; stickytags=dummy,EVENTS:q4wAZzF70,OTHERCARD:q4wAZzF70,EVENT_REMINDERS:q4wAZzIqL,RECENTRECORDS:q4wAZzIbX,STARTUP:q4wAZzF70,VERYSTATICPAGE:q4wAZzF70,QUICK_SEARCH:q4wAZzF70,ACCOUNTCENTER:q4wAZzF70,FOLLOWNETSUITE:q4wAZzF70,SHORTCUTS:q4wAZzF70,USERGROUP:q4wAZzF70,SYSTEMSTATUS:q4wAZzF70,SCRIPTPORTLET:q4wAZzIqL,NEWFEATURES:q4wAZzF70,SUITEANSWERS:q4wAZzF70,REMINDERS:q4wAZzF70,ROLEMENU:q4wAZzF70,RSSSOURCE:q4wAZzF70,SNAPSHOTS:q4wAZzF70,MAPPING:q4wAZzF70,HOME:q4wAZzF70,NAVMENUS:q4wAZzF70,KPIMETER:q4wAZzF70; jsid_own=4537321_SB1.-475108720',
      'accept-language': 'en-US,en;q=0.9,fr;q=0.8',
      Referer:
        'https://debugger.na0.netsuite.com/app/common/item/item.nl?id=156945&whence=',
      'X-Forwarded-Host': 'debugger.na0.netsuite.com',
      Connection: 'keep-alive',
      'Sec-Fetch-Site': 'same-origin',
      Host: 'debugger.na0.netsuite.com',
      Pragma: 'no-cache',
      dnt: '1'
    }
  }
}

var validateFieldJSON = {
  currentRecord: { id: '', type: null, isDynamic: true },
  sublistId: null,
  fieldId: 'custpage_sku'
}

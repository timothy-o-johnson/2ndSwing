var ng2238 = {
  importantFields: { quantityReceivedObj: 'itemSelector2.0.Apparel' }
}

var urlItemSelectToEditLine = `https:;//4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10591650:inventoryitem:9529357:31196911&custpage_isapparelitem=T&custpage_is_junk_sku=F&custpage_is_opportunity=null&custpage_is_orig_apparel_item=T&custpage_upc_created=F&custpage_singleSku=T&custpage_repitem=9529357&custpage_repitem_sku=D-D209529357`

urlItemSelectToEditLine = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10591650:inventoryitem:9529357:31196911&custpage_isapparelitem=T&custpage_is_junk_sku=F&custpage_is_opportunity=null&custpage_is_orig_apparel_item=T&custpage_upc_created=F&custpage_singleSku=T&custpage_repitem=9529357&custpage_repitem_sku=D-D209529357&custpage_quantity_received_obj=%7B%22closed%22%3A0%2C%22junk%22%3A0%2C%22multiSku%22%3A0%2C%22traditional%22%3A0%2C%22upc%22%3A0%2C%22totalExpected%22%3A3%2C%22totalReceived%22%3A0%2C%22totalRemaining%22%3A3%7D`

var editLineParams = {
  custpage_isapparelitem: 'T',
  custpage_repitem_sku: 'D-D209529357',
  script: '39',
  custpage_is_opportunity: 'null',
  deploy: '1',
  custpage_is_junk_sku: 'F',
  cacheKey: 'purchaseorder:10591650:inventoryitem:9529357:31196911',
  custpage_upc_created: 'F',
  custpage_quantity_received_obj:
    '{"closed":0,"junk":0,"multiSku":0,"traditional":0,"upc":0,"totalExpected":3,"totalReceived":0,"totalRemaining":3}',
  compid: '4537321_SB1',
  custpage_singleSku: 'T',
  custpage_is_orig_apparel_item: 'T',
  custpage_repitem: '9529357'
}

var custpage_quantity_received_obj = JSON.parse(editLineParams.custpage_quantity_received_obj)

console.log('typeof custpage_quantity_received_obj:', typeof custpage_quantity_received_obj)

console.log('Object.keys(custpage_quantity_received_obj):',Object.keys(custpage_quantity_received_obj)
)



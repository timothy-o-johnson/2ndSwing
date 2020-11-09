var ng1618 = {
  genericItemReplacementUrl: `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=45&deploy=1&compid=4537321_SB1&cacheKey=undefined&custpage_repitem=undefined&custpage_is_item_on_po=F&isOpportunity=true&makeItemObjParam=%7B%22custpage_parent%22%3A%2237383%22%2C%22custpage_tranid%22%3A%2210484455%22%2C%22custpage_itemtype%22%3A%223%22%2C%22custpage_adder%22%3A%22%2Fapp%2Fsite%2Fhosting%2Fscriptlet.nl%3Fscript%3D42%26deploy%3D1%26compid%3D4537321_SB1%22%2C%22custpage_editline%22%3A%22%2Fapp%2Fsite%2Fhosting%2Fscriptlet.nl%3Fscript%3D39%26deploy%3D1%26compid%3D4537321_SB1%26cacheKey%3Dpurchaseorder%3A10484455%3Ainventoryitem%3A37383%3A31033458%22%2C%22custpage_singlesku%22%3A%22T%22%7D`
}

var error = {
  message: 'Cannot read property "value" from undefined',
  fileName: '/SuiteScripts/WMS/shared/ItemHelper.js',
  lineNumber: 1071,
  name: 'TypeError',
  stack: `\t
        at /SuiteScripts/WMS/shared/ItemHelper.js:1071 (setFieldsCommonToRegularAndChildItems)\n\t
        at /SuiteScripts/WMS/shared/ItemHelper.js:1007 (createItem)\n\t
        at / SuiteScripts / WMS / shared / ItemAdder.js:46(onRequest) \n\t
        at INVOCATION_WRAPPER$sys: 31\n\t
        at INVOCATION_WRAPPER$sys: 17\n\t
        at INVOCATION_WRAPPER$sys: 38\n\t
        at INVOCATION_WRAPPER$sys: 1\n',custitem_g2_brand_ref
    rhinoException: {}`
}

var itemFields = {
  assetaccount: [{ value: '144', text: 'Inventory' }],
  baseprice: '14.99',
  expenseaccount: [{ value: '124', text: 'Cost of Goods Sold' }],
  custitem_g2_brand_ref: [],
  custitem_g2_category_ref: [{ value: '1', text: 'Accessories' }],
  custitem_g2_itemtype_ref: [],
  custitem_g2_model_ref: [],
  custitem_g2_name: '3 for $35 Golf Hat'
}

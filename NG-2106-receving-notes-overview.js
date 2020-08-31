var ng2106 = {
  start: `NG-2111 , send back to page and $().click() save
          - encode fieldsThatHaveChangedObj
          - confirm that data transfers
          - since it won't change in pop-up, don't decode
          - but test to see that it does decode in the pop-up
          - finally when it gets back to editline-client, update the info on the page and $('#submitter').click()

     `
}

var receivingNotesObj = {
  itemId: 9261868,
  itemType: '2',
  category: '52',
  freeNotes: 'yoyoyoyo',
  sku: 'AHEAD MENS PANT : D-8209261868',
  urlParams: {
    script: '586',
    deploy: '1',
    compid: '4537321_SB1',
    itemid: '9261868',
    originalReferrer: 'undefined',
    recordType: 'purchaseorder',
    tranId: '10251249',
    lineuniquekey: '30973623'
  }
}

var data = {
  script: '586',
  deploy: '1',
  compid: '4537321_SB1',
  itemid: '9261868',
  originalReferrer: 'undefined',
  recordType: 'purchaseorder',
  tranId: '10251249',
  lineuniquekey: '30973623'
}

var prepNotes2Params = {
  tranId: '10251249',
  custpage_isapparelitem: 'T',
  recordType: 'purchaseorder',
  isReceivingNotesObj: 'true',
  custpage_repitem_sku: 'D-8209306314',
  script: '586',
  custpage_multipleskus: 'T',
  deploy: '1',
  itemid: '9306314',
  originalReferrer:
    'https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39',
  custpage_is_item_on_po: 'T',
  custpage_is_junk_sku: 'F',
  cacheKey: 'purchaseorder:10251249:inventoryitem:9306314:31005118',
  custpage_upc_created: 'T',
  compid: '4537321_SB1',
  fieldsThatHaveChangedObj:
    '{"custpage_quantity_received":{"label":"Quantity Received","value":4},"custpage_number_of_skus":{"label":"Number Of SKUs","value":3},"custpage_eia_fielddata_430":{"label":"Condition","value":"5"},"skuObj":{"apparelsku0":"2","apparelsku1":"1","apparelsku2":"1"}}',
  custpage_is_orig_apparel_item: 'F',
  lineuniquekey: '31005118',
  editLineUrlParams: '[object Object]',
  receivingNotes:
    'No more NOTES!Did not receive item.Item deemed counterfeit. No value.',
  custpage_repitem: '9306314'
}

var originalEditLineUrl = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?
script=39&
deploy=1&
compid=4537321_SB1&
cacheKey=purchaseorder:10251249:inventoryitem:9306314:31005118&
custpage_repitem=9306314&
custpage_multipleskus=T&
custpage_isapparelitem=T&
custpage_is_item_on_po=T&
custpage_is_junk_sku=F&
custpage_is_orig_apparel_item=F&
custpage_upc_created=T&
custpage_repitem_sku=D-8209306314`

var returnUrl = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?
script=39&
deploy=1&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A4%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%222%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&
tranId=10251249&
custpage_isapparelitem=T
&recordType=purchaseorder&isReceivingNotesObj=true&custpage_repitem_sku=D-8209306314&script=586&custpage_multipleskus=T&deploy=1&itemid=9306314&
originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&
custpage_is_item_on_po=T&
custpage_is_junk_sku=F&
cacheKey=purchaseorder:10251249:inventoryitem:9306314:31005118&
custpage_upc_created=T&
compid=4537321_SB1&
custpage_is_orig_apparel_item=F&
lineuniquekey=31005118
&editLineUrlParams=[object%20Object]&
receivingNotes=No%20more%20NOTES!Did%20not%20receive%20item.Item%20deemed%20counterfeit.%20%20No%20value.&custpage_repitem=9306314&redirectedFromSaveNoteAndContinue=true&custpage_notes=1.2.3.`

var ng2310 = {
  ticketNotes: `
    It appears that we have an edge-case bug to work through with regards to the "Receiving Notes Editor" and apparel receiving.
    Steps to recreate error...

    1.  Utilize "Create Multiple Items" functionality.
    2.  Configure the Number of SKUS to create multiple items.
    3.  Make a few common attribute selections.
    4.  In the FreeNotes field add some text.  This is what I added, 
        "New with tags.Course logo near bottom hem. 100% Polyester. Machine wash cold, tumble dry low. * ° + & ?"
    5.  Update the Receiving Notes.
    6.  In the Receiving Notes Editor add some text.  This is what I added, 
        "1 slightly blemished, added to another line. 1 blemished - hole. * ° + & ?"
    7.  Utilize the "Save Notes & Receive Item" functionality.
    8.  The error will appear when you return to the Edit Line suitelet.
    `,
  devNote: "turns out the issue isn't receiving notes, but free notes.",
  uriDecodingTestCode: `var fieldsThatHaveChangedParam = decodeURIComponent(itemObj.freeNotes)`,
  uriDecodingTestCode2: `var fieldsThatHaveChangedParam = decodeURIComponent(fieldsThatHaveChangedObj)`,
  itemObj: {
    itemId: 9455441,
    itemType: '2',
    category: '25',
    freeNotes: '',
    sku: 'ABACUS W PANT : D-N209455441',
    urlParams: {
      script: '586',
      deploy: '1',
      compid: '4537321_SB1',
      fieldsThatHaveChangedObj:
        '{"custpage_quantity_received"%3A{"label"%3A"Quantity Received"%2C"value"%3A4}%2C"custpage_number_of_skus"%3A{"label"%3A"Number Of SKUs"%2C"value"%3A3}%2C"custpage_attr_field_custitem_g2_freenotes"%3A{"label"%3A"FreeNotes"%2C"value"%3A"New with tags.Course logo near bottom hem. 100% Polyester. Machine   wash cold%2C tumble dry low."}%2C"custpage_eia_fielddata_430"%3A{"label"%3A"Condition"%2C"value"%3A"5"}%2C"skuObj"%3A{"apparelsku0"%3A"2"%2C"apparelsku1"%3A"1"%2C"apparelsku2"%3A"1"}}',
      itemid: '9455441',
      originalReferrer:
        'https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39',
      cacheKey: 'purchaseorder:10536304:inventoryitem:9455441:31142415',
      custpage_isapparelitem: 'T',
      custpage_is_junk_sku: 'F',
      custpage_is_opportunity: 'null',
      custpage_is_orig_apparel_item: 'T',
      custpage_upc_created: 'F',
      custpage_multipleskus: 'T',
      custpage_repitem: '9455441',
      custpage_repitem_sku: 'D-N209455441',
      recordType: 'purchaseorder',
      tranId: '10536304',
      lineuniquekey: '31142415',
      isReceivingNotesObj: 'true',
      receivingNotes: ''
    }
  }
}

var urlParams = {
  script: '586',
  deploy: '1',
  tranId: '10536304',
  custpage_isapparelitem: 'T',
  recordType: 'purchaseorder',
  isReceivingNotesObj: 'true',
  custpage_repitem_sku: 'D-N209461147',
  custpage_is_opportunity: 'null',
  custpage_multipleskus: 'T',
  itemid: '9461147',
  originalReferrer:
    'https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39',
  custpage_is_junk_sku: 'F',
  cacheKey: 'purchaseorder:10536304:inventoryitem:9461147:31148302',
  custpage_upc_created: 'F',
  compid: '4537321_SB1',
  fieldsThatHaveChangedObj:
    '{"custpage_quantity_received"%3A{"label"%3A"Quantity Received"%2C"value"%3A4}%2C"custpage_number_of_skus"%3A{"label"%3A"Number Of SKUs"%2C"value"%3A2}%2C"custpage_attr_field_custitem_g2_freenotes"%3A{"label"%3A"FreeNotes"%2C"value"%3A"New with tags.Course logo near bottom hem. 100% Polyester. Machine   wash cold%2C tumble dry low."}%2C"custpage_eia_fielddata_430"%3A{"label"%3A"Condition"%2C"value"%3A"5"}%2C"skuObj"%3A{"apparelsku0"%3A"3"%2C"apparelsku1"%3A"1"}}',
  custpage_is_orig_apparel_item: 'T',
  lineuniquekey: '31148302',
  receivingNotes: '',
  custpage_repitem: '9461147',
  redirectedFromSaveNoteAndContinue: 'true',
  custpage_notes:
    '1 slightly blemished, added to another line. 1 blemished - hole.* ° + %'
}

var params = urlParams 

// EditLine-Client BEFORE
var newString = { "custpage_attr_field_custitem_g2_freenotes": { "label": "FreeNotes", "value": "New with tagsDOZTCourse logo near bottom hemDOZT 100~~pct~~ PolyesterDOZT Machine wash cold, tumble dry lowDOZT" }, "custpage_quantity_received": { "label": "Quantity Received", "value": 3 }, "custpage_number_of_skus": { "label": "Number Of SKUs", "value": 2 }, "custpage_eia_fielddata_430": { "label": "Condition", "value": "5" }, "skuObj": { "apparelsku0": "2", "apparelsku1": "1" } }

var fieldsThatHaveChangedObj = '%7B%22custpage_attr_field_custitem_g2_freenotes%22%3A%7B%22label%22%3A%22FreeNotes%22%2C%22value%22%3A%22New%20with%20tagsDOZTCourse%20logo%20near%20bottom%20hemDOZT%20100~~pct~~%20PolyesterDOZT%20Machine%20wash%20cold%2C%20tumble%20dry%20lowDOZT%22%7D%2C%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A3%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A2%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%222%22%2C%22apparelsku1%22%3A%221%22%7D%7D'

var decodedFieldsThatHaveChangedObj = decodeURIComponent(fieldsThatHaveChangedObj) /*?*/
typeof decodedFieldsThatHaveChangedObj; /*?*/
decodedFieldsThatHaveChangedObj = JSON.parse(decodedFieldsThatHaveChangedObj)

var freeNotes = `New with tags. Course logo near bottom hem. 100% Polyester. Machine wash cold, tumble dry low. * ° + & ?`
var receivingNotes = `1 slightly blemished, added to another line. 1 blemished - hole. * ° + % 1`

var initialUrl = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10536304:inventoryitem:9489619:31168297&custpage_isapparelitem=T&custpage_is_junk_sku=F&custpage_is_opportunity=null&custpage_is_orig_apparel_item=T&custpage_upc_created=F&custpage_multipleskus=T&custpage_repitem=9489619&custpage_repitem_sku=D-N209489619`

var sentUrl = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=586&deploy=1&compid=4537321_SB1&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A5%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%223%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&itemid=9489619&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10536304:inventoryitem:9489619:31168297&custpage_isapparelitem=T&custpage_is_junk_sku=F&custpage_is_opportunity=null&custpage_is_orig_apparel_item=T&custpage_upc_created=F&custpage_multipleskus=T&custpage_repitem=9489619&custpage_repitem_sku=D-N209489619&recordType=purchaseorder&tranId=10536304&lineuniquekey=31168297&isReceivingNotesObj=true&receivingNotes=`

var returnedUrl = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&tranId=10536304&custpage_isapparelitem=T&recordType=purchaseorder&isReceivingNotesObj=true&custpage_repitem_sku=D-N209489619&script=586&custpage_is_opportunity=null&custpage_multipleskus=T&deploy=1&itemid=9489619&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&custpage_is_junk_sku=F&cacheKey=purchaseorder:10536304:inventoryitem:9489619:31168297&custpage_upc_created=F&compid=4537321_SB1&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A5%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%223%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&custpage_is_orig_apparel_item=T&lineuniquekey=31168297&receivingNotes=&custpage_repitem=9489619&redirectedFromSaveNoteAndContinue=true&custpage_notes=1%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%201`

var sentUrl2 = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&tranId=10536304&custpage_isapparelitem=T&recordType=purchaseorder&isReceivingNotesObj=true&custpage_repitem_sku=D-N209489619&script=586&custpage_is_opportunity=null&custpage_multipleskus=T&deploy=1&itemid=9489619&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&custpage_is_junk_sku=F&cacheKey=purchaseorder:10536304:inventoryitem:9489619:31168297&custpage_upc_created=F&compid=4537321_SB1&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A5%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%223%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&custpage_is_orig_apparel_item=T&lineuniquekey=31168297&receivingNotes=&custpage_repitem=9489619&redirectedFromSaveNoteAndContinue=true&custpage_notes=1%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%201`

var receivingNotes2 = `1 slightly blemished, added to another line. 1 blemished - hole. * ° + % 2`
var returnedUrl2 = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&tranId=10536304&custpage_isapparelitem=T&recordType=purchaseorder&isReceivingNotesObj=true&custpage_repitem_sku=D-N209489619&custpage_is_opportunity=null&custpage_multipleskus=T&script=586&deploy=1&redirectedFromSaveNoteAndContinue=true&itemid=9489619&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&custpage_is_junk_sku=F&cacheKey=purchaseorder:10536304:inventoryitem:9489619:31168297&custpage_upc_created=F&compid=4537321_SB1&custpage_notes=1%20slightly%20blemished,%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20+%20%%201&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A5%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22custpage_notes%22%3A%7B%22label%22%3A%22Receiving%20Notes%22%2C%22value%22%3A%221%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%201%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%223%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&custpage_is_orig_apparel_item=T&lineuniquekey=31168297&receivingNotes=&custpage_repitem=9489619&redirectedFromSaveNoteAndContinue=true&custpage_notes=1%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%202`

var receivingNotesEditorUrl3 = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=586&deploy=1&compid=4537321_SB1&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A5%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22custpage_notes%22%3A%7B%22label%22%3A%22Receiving%20Notes%22%2C%22value%22%3A%221%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%202%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%223%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&itemid=9489619&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&tranId=10536304&custpage_isapparelitem=T&recordType=purchaseorder&isReceivingNotesObj=true&custpage_repitem_sku=D-N209489619&custpage_is_opportunity=null&custpage_multipleskus=T&script=586&deploy=1&redirectedFromSaveNoteAndContinue=true&itemid=9489619&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&custpage_is_junk_sku=F&cacheKey=purchaseorder:10536304:inventoryitem:9489619:31168297&custpage_upc_created=F&compid=4537321_SB1&custpage_notes=1%20slightly%20blemished,%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20+%20%%201&fieldsThatHaveChangedObj=%7B%22custpage_quantity_received%22%3A%7B%22label%22%3A%22Quantity%20Received%22%2C%22value%22%3A5%7D%2C%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A3%7D%2C%22custpage_eia_fielddata_430%22%3A%7B%22label%22%3A%22Condition%22%2C%22value%22%3A%225%22%7D%2C%22custpage_notes%22%3A%7B%22label%22%3A%22Receiving%20Notes%22%2C%22value%22%3A%221%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%201%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%223%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%7D%7D&custpage_is_orig_apparel_item=T&lineuniquekey=31168297&receivingNotes=&custpage_repitem=9489619&redirectedFromSaveNoteAndContinue=true&custpage_notes=1%20slightly%20blemished%2C%20added%20to%20another%20line.%201%20blemished%20-%20hole.%20*%20%C2%B0%20%2B%20%25%202&recordType=purchaseorder&tranId=10536304&lineuniquekey=31168297&isReceivingNotesObj=true&receivingNotes=`


var chrisURL = `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&tranId=10560259&custpage_isapparelitem=T&recordType=purchaseorder&isReceivingNotesObj=true&custpage_repitem_sku=D-N209466155&script=586&custpage_is_opportunity=null&custpage_multipleskus=T&deploy=1&itemid=9466155&originalReferrer=https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&custpage_is_junk_sku=F&cacheKey=purchaseorder:10560259:inventoryitem:9466155:31152112&custpage_upc_created=F&compid=4537321_SB1&fieldsThatHaveChangedObj=%7B%22custpage_number_of_skus%22%3A%7B%22label%22%3A%22Number%20Of%20SKUs%22%2C%22value%22%3A5%7D%2C%22custpage_attr_field_custitem_g2_freenotes%22%3A%7B%22label%22%3A%22FreeNotes%22%2C%22value%22%3A%22testing%20this%20field%20to%20see%20if%20there%20are%20any%20issues%20here.%20%20%26%20also%20%22%7D%2C%22custpage_attr_field_custitem_g2_top_style_ref%22%3A%7B%22label%22%3A%22Top%20Style%22%2C%22value%22%3A%22111%22%7D%2C%22custpage_attr_field_custitem_g2_top_gender_ref%22%3A%7B%22label%22%3A%22Top%20Gender%22%2C%22value%22%3A%221%22%7D%2C%22skuObj%22%3A%7B%22apparelsku0%22%3A%221%22%2C%22apparelsku1%22%3A%221%22%2C%22apparelsku2%22%3A%221%22%2C%22apparelsku3%22%3A%221%22%2C%22apparelsku4%22%3A%221%22%7D%7D&custpage_is_orig_apparel_item=T&lineuniquekey=31152112&receivingNotes=&custpage_repitem=9466155&redirectedFromSaveNoteAndContinue=true&custpage_notes=*%20%C2%B0%20%2B%20%22%20.%20%25%20%26`
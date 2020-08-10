var ng2106 = {
  start: `start by getting the notes from the line item using the unique id and modifying this:
            var poRec = record.load({
                type: data.recordType,
                id: data.tranId
            })

            var findLine = poRec.findSublistLineWithValue({
                sublistId: 'item',
                fieldId: 'lineuniquekey',
                value: data.lineuniquekey
            })

            // if the line exists

            if (findLine != -1) {
            // use getSublistValue
            poRec.setSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_wms_recvnotes',
                line: findLine,
                value: data.freeNotes
            })
            }
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

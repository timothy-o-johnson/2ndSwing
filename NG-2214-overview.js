var ng2214 = {
  attributeUrl: `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=inventoryitem%3A9414329&masterOppSku=false&whence=`,
  newFileContent: {
    folderId: '44090',
    items: [
      {
        sku: 'D-T209419573',
        quantityReceived: 1,
        attributeButton:
          '<button type="button" onclick="openLink(\'/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10525829:inventoryitem:9416344:31107179&isOpportunity=true&cacheKey=undefined\')">Attribute</button>'
      },
      {
        sku: 'D-T209419574',
        quantityReceived: 1,
        attributeButton:
          '<button type="button" onclick="openLink(\'/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10525829:inventoryitem:9416344:31107179&isOpportunity=true&cacheKey=undefined\')">Attribute</button>'
      }
    ]
    },
    refactor: `
        1. globals get params - DONE
        2. itemHelper: addItemToTransaction(): arguments - DONE
        3. updateItemStatus(): attributeButton - DONE
  
  `,
    ToDo: `
       done - add updates to NS gui interfaces to SDF: editline, multipleskus

    `
}

// https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=43&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:10525829:inventoryitem:9416344:31107179&isOpportunity=true

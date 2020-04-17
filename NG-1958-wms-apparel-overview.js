var ng1958 = {
  ticket: 'https://2ndswing.atlassian.net/browse/NG-1958',
  scripts: {
    apparel: `https://debugger.na0.netsuite.com/app/common/scripting/scriptrecord.nl?id=756&whence=`,
    recievePOs: `https://debugger.na0.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&whence=`,
    selectReceivingLine: `https://debugger.na0.netsuite.com/app/common/scripting/scriptrecord.nl?id=149`,
    attributionEditLine: `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cache=purchaseorder&cacheKey=purchaseorder:3520410:inventoryitem:3015683:10403978&template=customdeploy_wms_selectreceivingline`
  },
  planOfAction: {
    wed15apr: {
      1: 'create separate SL and Client page',
      2: `get fields and layout correct
                o add parent, category, and parentItemType fields to page`,
      3: `link up all fields
            a.get sublists to work`,
      4: `get UPC to work properly`
    },
    thu16apr: {
      1: `tag apparel items on receiving page`,
      2: `link apparel items to apparel form`
    },
      fri17apr: {
          1: `load apparel page with parent item and parent item type filled`,
          2: `connect the buttons to work properly`
    }
  }
}

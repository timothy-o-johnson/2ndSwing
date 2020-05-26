var ng1958 = {
  ticket: 'https://2ndswing.atlassian.net/browse/NG-1958',
  scripts: {
    apparel: `https://debugger.na0.netsuite.com/app/common/scripting/scriptrecord.nl?id=756&whence=`,
    recievePOs: `https://debugger.na0.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&whence=`,
    selectReceivingLine: `https://debugger.na0.netsuite.com/app/common/scripting/scriptrecord.nl?id=149`,
    attributionEditLine: `https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cache=purchaseorder&cacheKey=purchaseorder:3520410:inventoryitem:3015683:10403978&template=customdeploy_wms_selectreceivingline`,
    purchaseOrder: 696 // a PO with a few items that TJ created
  },
  planOfAction: {
    wed15apr: {
      1: 'create separate SL and Client page',
      2: `get fields and layout correct
                o add parent, category, and parentItemType fields to page`,
      3: `link up all fields
            a. get sublists to work`,
      4: `get UPC to work properly`
    },
    thu16apr: {
      1: `tag apparel items on receiving page`,
      2: `link apparel items to apparel form`
    },
    fri17apr: {
      1: `load apparel page with parent item and parent item type filled`,
      2: `connect the buttons to work properly`
    },
    mon20apr: {
      1: `determine why the map reduce for apparel multi-sku isn't working
            -- looks like editline is not being told these are multi sku`,
      2: `refer to notes to complete task on the NG-1560 ticket`
    },
    tue21apr: {
      1: `refer to Chris' new notes to make improvements
                x change button labels
                x rearrange fields
                x disable certain fields
                x launch page with no results
                - update button behavior
                    o reuse sku`,
      2: `refer to notes to complet task on NG-1560 ticket
                x disable pop up`
    },
    fri24apr: {
      1: 'fix flow of buttons',
      2: 'add the field Chris mentioned yesterday'
    },
    wed29apr: {
      1: 'pass sublist selection as parameter to next receiving or junk page',
      2: 'add bid price to apparel select item page'
    },
    tues5may: {
      1: 'updates notes on original item for apparel',
      2: 'fix sku on apparel landing page',
      3: 'reduce # of skus based on sku quantity'
    },
    wed6may: {
      1: `updates notes on original item for apparel
            - compare the arguments for createItemReceipt: a working item with one that's not`
    },
    thu7may: {
      1: `update notes on original item for apparel/creatItemReceipt
            - reasearched how item receipts are created
            - breakthrough(?): created an item receipt from UI
                - need to figure out why the unique line number on newItemCache isn't on the PO
                - probably because it's not a "new" item ???`
    },
    fri8may: {
      1: `createItemReciept
            - investigate how record transformations work
            - connect with chris to discuss process
            - refactor addItemToPurchaseOrder by breaking into component parts`
    },
    mon11may: {
      1: `refactor the itemHelper.addItemToTransaction() to create the newCache functionality that appears necessary for the createItemReceipt()
            - refactor the function
            - compare the results with the original function by saving updated record to file
            - modify it for apparel
            - celebrate with dancing
            `
    },
    wed20may: {
      1: `fix UPC functionality
            - overview: add item to PO if not already present
            - understand how 'make new item' works in ItemSelection.js
            - follow the UPC item through adding to the PO and see why it isn't being added (or found) `,
      2: `fix junk sku functionality`
    }
  },

  punchList: {
    1: `ensure notes from editLine are't passed to children`,
    2: `ensure condition on editline is set before saving`,
    3: `prevent warnings on button click`,
  },

  conversationWithChris: {
    unknownDate: `
  In PROD I was able to process Multi-SKU's for an apparel item.  I had to have the Class of the PO be 403 Opportunity...
  
  With this apparel rebuild we are really focusing on trades from 2ndswing.com and golfstixvalueguide.com.  These PO's will be classed as 400 Used.  The SKU's that generate through the Child Item Generation script/functionality will have a Class of 400 Used.  The SKU's that you and I are trying to create via the Multi-SKU functionality into apparel receiving will also be 400 Used.`,
    fri8may: `behavior when selecting sublist item
      - don't close or cancel the line
      - existing item (scan UPC or junk sku), recieve onto the line or create multiple
      - make it so that user can dictate when to close out that line
      - close remaining lines (canceling != closing)
      - make note to check in itemReceipt if quantity received is being updated there
    `
  },
  questions: `
        x 1. What is the Recieve Item suppose to do? Just create and Item reciept? Where else-- if anywhere-- is this being done? 
        x 2. is it true that parents will never show up for used apparel (because this breaks functionality)
        3. Review closeline functionality for UPC and Junk SKU
  `
}

//PUMA W SLS : D-4203017601

// Item to be Replaced by: PUMA W SLS : D-4203017603.

// item-selector-apparel-client: href: AA, TJ, makeItem(): href /app/site/hosting/scriptlet.nl?script=39&deploy=1&compid=4537321_SB1&cacheKey=purchaseorder:3520410:inventoryitem:3017601:10408814&custpage_repitem=3017606&custpage_multipleskus=T

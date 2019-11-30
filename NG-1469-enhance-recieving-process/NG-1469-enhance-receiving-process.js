ticket: NG - 1469 - opportunity - po - enhancements


Receiving For Opportunity Order page:
/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321&custpage_rf_orderid=3834677
/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3370582


Recieving team clicks the + button to indicate items have been received. This launches the Items page.
On the Items page, the team can reuse a pre - existing SKU if the recieving item is a match.
    
Otherwise, they select 'Create Opportunity'. 
At present,'Create Opportunity' allows you to add as many items as you want to a certain sku, but does not allow you to add skus individually nor does not allow you to prepopulate attributes.

Request:
1. add a 'create multiple skus' checkbox
when selected, separate skus will be created for the number of items created

2. add attributes fields that can prepopulate the item record of the skus being created

---
Page: "Items" (form) 
script: ItemSelector2.0
id: customscript_wms_itemselector
url: https://4537321.app.netsuite.com/app/common/scripting/script.nl?id=44

Edit Line
id: customscript_wms_editline
url: https://4537321.app.netsuite.com/app/common/scripting/script.nl?id=39

---

How to look up orders
https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=

https://debugger.na0.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=

---

Select Receiving script
https://debugger.na0.netsuite.com/app/common/scripting/script.nl?id=48

https://debugger.na0.netsuite.com/app/common/scripting/script.nl?id=44


--- 

A good way to test suitelets must be via the execution log.
ticket: NG - 1469 - opportunity - po - enhancements
Related tickets: 1388

Receiving For Opportunity Order page: ''
production: /app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321&custpage_rf_orderid=3834677
sandbox: /app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3370582


Recieving team clicks the + button to indicate items have been received. This launches the Items page.
On the Items page, the team can reuse a pre - existing SKU if the recieving item is a match.
    
Otherwise, they select 'Create Opportunity'. 
At present,'Create Opportunity' allows you to add as many items as you want to a certain sku, but does not allow you to add skus individually nor does not allow you to prepopulate attributes.

Request:
1. add a 'create multiple skus' checkbox
when selected, separate skus will be created for the number of items created

2. add attributes fields that can prepopulate the item record of the skus being created

______
Information Flow
1. List of receiving POs(Transactions -> Custom -> Receive POs)
2. select PO
3. Page: Receiving For Opportunity Order# <selected PO>  (SelectReceivingLine.js: https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=48; html page: usedreceiving.txt)
4. user selects '+' -> Items Page; params are sent to  Items Page (see below)
5. Item Page buttons: Create Single Opportunity, Create Multi-Sku Opportunity (both from Edit Line script below)


---
Page: "Items" (form) 
script: ItemSelector2.0
id: customscript_wms_itemselector
url: https://4537321.app.netsuite.com/app/common/scripting/script.nl?id=44


Page: " " (Changed to "Multi-SKU Opp" when appropriate)
script: Edit Line
id: customscript_wms_editline
url: https://4537321.app.netsuite.com/app/common/scripting/script.nl?id=39
url generic: app/common/scripting/script.nl?id=39

---

How to look up orders
https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=

https://debugger.na0.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=

---

Select Receiving script
https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=48


--- 

A good way to test suitelets must be via the execution log.

--- 

12/3/19
Attribute Sku Button
https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=43

make sure the count is 1 for Recieved 

-- 
item Reciept example:
https://4537321-sb1.app.netsuite.com/app/accounting/transactions/itemrcpt.nl?id=3392247&whence=

    quantity on hand
    quantity available (quantity)

-- 
Lyle's kickstarter script

https://4537321-sb1.app.netsuite.com/app/common/scripting/scriptrecord.nl?id=640&whence=

--

MR Create Multiple Skus

 https://4537321-sb1.app.netsuite.com/app/common/scripting/script.nl?id=411&id=411&whence=

 ---

Attribute Fields Mismatch
Item: Puma W Pant  (id: 38914)
Field: PARENT ITEM MODEL (custitem_wms_parentitemtype)
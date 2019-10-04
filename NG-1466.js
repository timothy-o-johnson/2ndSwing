// NG-1466 -- Add Shipping Labels to Column
// https://2ndswing.atlassian.net/browse/NG-1466

// Message to 
// don't think you can add transaction line items from a search
// what happens if there's more than one
// best bet would be to create a transaction body field called Total Shipping labels that adds the lines on save and then returns that value in the search results

// script: customscript_wms_findreceivings

https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=

https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=9

https://4537321-sb1.app.netsuite.com/app/common/scripting/scriptrecord.nl?id=156


// Deployment
// Recieving Search: Default Recieving Search
https://4537321-sb1.app.netsuite.com/app/common/search/search.nl?id=145&e=T&cu=T&whence=

// Script Deployment:
https://4537321-sb1.app.netsuite.com/app/common/scripting/scriptrecord.nl?id=160&e=T

https://4537321-sb1.app.netsuite.com/app/common/scripting/scriptrecordlist.nl?type=&status=&recordtype=&apiversion=&scripttype=40&sortcol=script&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=50&_csrf=V8zWIFWbPQEXhh5Ikd8oLx2GsrIVSsyHg-hGCRYiVZnx1ByIkrBjsBhj-DO-LWoBSJEpr1A1qPDs2uv_g1qODLVFxQ-nvJxCpOuRQbFQwk4IA34doC59fzmNRsEyhSZ6uP6n2eXHlvp1GC7Eou4i0gKGaDxYmHsbbQGKDe86akA%3D&showall=F
// https://2ndswing.atlassian.net/browse/NG-1232

// SKU link: https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=46&deploy=1&compid=4537321_SB1&script=46&deploy=1&compid=4537321&whence=

// Solution
/*

- add record.save() in the print function
testing: print an object of the values before and after the save

block #1:
my idea was to just save the record before every print
but the record is of type Dynamic and I don't see how it's saving. 

idea: load the item record, use record.submitFields()

idea : is it just looking at the wrong field? check the label

*/

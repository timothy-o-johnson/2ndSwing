/*

NG-1531



How the User will access the page:
Method 1
https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=
This page is where a user can get into a Purchase Order.  This is the page that basically houses all Purchase Orders to be received.  The "Receive" on the far left will open the actual Purchase Order for them to receive.

Method 2

*/

/*

Testing hrefs
1) initial
window.location.href: https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3353292

document.referrer : https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=40&deploy=13&compid=4537321_SB1&script=40&deploy=13&compid=4537321&whence=

2) after 1st change
window.location.href: https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3353292

document.referrer : https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3353292

3) after 2nd change
window.location.href: https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3353292

document.referrer : https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=48&deploy=2&compid=4537321_SB1&custpage_rf_orderid=3353292



*/

var errorMessage: {
  type: 'error.SuiteScriptError',
  name: 'SSS_INVALID_FORM_ELEMENT_NAME',
  message: 'You have entered an invalid form element name. It must be prefixed with "custpage", unique, lowercase, and cannot contain any non-alphanumeric characters (except for the underscore character) in order to be added to the form or sublist.',
  stack: [
    'addField(N/serverWidget)',
    'onRequest(/SuiteScripts/WMS/Receiving/SelectReceivingLine.js:703)',
  ],
  cause: {
    type: 'internal error',
    code: 'SSS_INVALID_FORM_ELEMENT_NAME',
    details: 'You have entered an invalid form element name. It must be prefixed with "custpage", unique, lowercase, and cannot contain any non-alphanumeric characters (except for the underscore character) in order to be added to the form or sublist.',
    userEvent: null,
    stackTrace: [
      'addField(N/serverWidget)',
      'onRequest(/SuiteScripts/WMS/Receiving/SelectReceivingLine.js:703)',
    ],
    notifyOff: false,
  },
  id: '',
  notifyOff: false,
  userFacing: false,
}

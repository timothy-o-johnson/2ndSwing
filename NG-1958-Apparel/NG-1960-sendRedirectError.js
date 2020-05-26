var OOPS = {
  type: 'error.SuiteScriptError',
  name: 'TypeError',
  message:
    'execute on foreign object failed due to: Multiple applicable overloads found for method name sendRedirect (candidates: [Method[public abstract void com.netledger.app.common.scripting.common.nlobjResponseInterface.sendRedirect(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.Object) throws java.lang.Exception], Method[public abstract void com.netledger.app.common.scripting.common.nlobjResponseInterface.sendRedirect(java.lang.String,java.lang.String,java.lang.String,boolean,java.lang.Object) throws java.lang.Exception]], arguments: [SUITELET (String), customscript_mr_kickstartandmonitor (String), customdeploy_mr_kickstartandmonitor (String), false (Boolean), DynamicObject<JSUserObject>@6f02637b (DynamicObjectBasic)])',
  stack: [
    'Error',
    '    at offLoadToMRScript (/SuiteScripts/WMS/Receiving/EditLine.js:1189:21)',
    '    at Object.onRequest (/SuiteScripts/WMS/Receiving/EditLine.js:275:10)'
  ],
  cause: {
    message:
      'execute on foreign object failed due to: Multiple applicable overloads found for method name sendRedirect (candidates: [Method[public abstract void com.netledger.app.common.scripting.common.nlobjResponseInterface.sendRedirect(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.Object) throws java.lang.Exception], Method[public abstract void com.netledger.app.common.scripting.common.nlobjResponseInterface.sendRedirect(java.lang.String,java.lang.String,java.lang.String,boolean,java.lang.Object) throws java.lang.Exception]], arguments: [SUITELET (String), customscript_mr_kickstartandmonitor (String), customdeploy_mr_kickstartandmonitor (String), false (Boolean), DynamicObject<JSUserObject>@6f02637b (DynamicObjectBasic)])',
    stack:
      'TypeError: execute on foreign object failed due to: Multiple applicable overloads found for method name sendRedirect (candidates: [Method[public abstract void com.netledger.app.common.scripting.common.nlobjResponseInterface.sendRedirect(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.Object) throws java.lang.Exception], Method[public abstract void com.netledger.app.common.scripting.common.nlobjResponseInterface.sendRedirect(java.lang.String,java.lang.String,java.lang.String,boolean,java.lang.Object) throws java.lang.Exception]], arguments: [SUITELET (String), customscript_mr_kickstartandmonitor (String), customdeploy_mr_kickstartandmonitor (String), false (Boolean), DynamicObject<JSUserObject>@6f02637b (DynamicObjectBasic)])\n    at offLoadToMRScript (/SuiteScripts/WMS/Receiving/EditLine.js:1189:21)\n    at Object.onRequest (/SuiteScripts/WMS/Receiving/EditLine.js:275:10)'
  },
  notifyOff: false,
  userFacing: true
}

var messsageCandidates = [
  {
    Method: {
      type: 'public abstract void',
      path: 'com.netledger.app.common.scripting.common.nlobjResponseInterface',
      function: 'sendRedirect()',
      arguments: [
        java.lang.String,
        java.lang.String,
        java.lang.String,
        java.lang.String,
        java.lang.Object
      ],
      throws: 'java.lang.Exception'
    }
  },

  {
    Method: {
      type: 'public abstract void',
      path: 'com.netledger.app.common.scripting.common.nlobjResponseInterface.',
      function: 'sendRedirect()',
      arguments: [
        java.lang.String,
        java.lang.String,
        java.lang.String,
        boolean,
        java.lang.Object
      ],
      throws: 'java.lang.Exception'
    }
  },

  {
    arguments: [
      'SUITELET (String)',
      'customscript_mr_kickstartandmonitor (String)',
      'customdeploy_mr_kickstartandmonitor (String)',
      'false (Boolean)',
      'DynamicObject<JSUserObject>@6f02637b (DynamicObjectBasic'
    ]
  }
]

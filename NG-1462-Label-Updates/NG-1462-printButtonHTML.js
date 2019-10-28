;<input
  type='button'
  style=''
  class='rndbuttoninpt bntBgT'
  value='Print Label'
  id='custpage_printer'
  name='custpage_printer'
  onclick="var  rConfig =  JSON.parse( '{}' ) ; rConfig['context'] = '/SuiteScripts/WMS/shared/Attribution-Client'; var entryPointRequire = require.config(rConfig); entryPointRequire(['/SuiteScripts/WMS/shared/Attribution-Client'], function(mod){ try{    if (!!window)    {        var origScriptIdForLogging = window.NLScriptIdForLogging;        var origDeploymentIdForLogging = window.NLDeploymentIdForLogging;        window.NLScriptIdForLogging = 'customscript_wms_itemattributeeditor';        window.NLDeploymentIdForLogging = 'customdeploy_wms_itemattributeeditor';    }mod.printLabel('/app/site/hosting/scriptlet.nl?script=265&amp;deploy=1&amp;compid=4537321_SB1&amp;items=[&quot;inventoryitem:2799392&quot;]');}finally{    if (!!window)    {        window.NLScriptIdForLogging = origScriptIdForLogging;        window.NLDeploymentIdForLogging = origDeploymentIdForLogging;    }} }); return false;"
  onmousedown="this.setAttribute('_mousedown','T'); setButtonDown(true, false, this);"
  onmouseup="this.setAttribute('_mousedown','F'); setButtonDown(false, false, this);"
  onmouseout="if(this.getAttribute('_mousedown')=='T') setButtonDown(false, false, this);"
  onmouseover="if(this.getAttribute('_mousedown')=='T') setButtonDown(true, false, this);"
  _mousedown='F'
/>

var rConfig = JSON.parse('{}')
rConfig['context'] = '/SuiteScripts/WMS/shared/Attribution-Client'
var entryPointRequire = require.config(rConfig)
entryPointRequire(['/SuiteScripts/WMS/shared/Attribution-Client'], function (
  mod
) {
  try {
    if (window) {
      var origScriptIdForLogging = window.NLScriptIdForLogging
      var origDeploymentIdForLogging = window.NLDeploymentIdForLogging
      window.NLScriptIdForLogging = 'customscript_wms_itemattributeeditor'
      window.NLDeploymentIdForLogging = 'customdeploy_wms_itemattributeeditor'
    }
    mod.printLabel(
      '/app/site/hosting/scriptlet.nl?script=265&amp;deploy=1&amp;compid=4537321_SB1&amp;items=[&quot;inventoryitem:2799392&quot;]'
    )
  } finally {
    if (window) {
      window.NLScriptIdForLogging = origScriptIdForLogging
      window.NLDeploymentIdForLogging = origDeploymentIdForLogging
    }
  }
})
return false

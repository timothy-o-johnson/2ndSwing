var scriptParam
var log = {}
log.debug = console.log

function findActionWrapper () {
  var lineEditor = {}

  return function (scriptParam) {
    if (lineEditor[scriptParam]) {
      log.debug(
        'AA, TJ, findactionWrapper(): bypassing call to itemHelper.findaction()'
      )
      return lineEditor[scriptParam]
    } else {
      log.debug(
        'AA, TJ, findactionWrapper(): making call to itemHelper.findaction()'
      )
      lineEditor[scriptParam] = true
      return lineEditor[scriptParam]
    }
  }
}

//log.debug('AA, TJ, findactionWrapper(): making call to itemHelper.findaction()')
//var lineEditor = itemHelper.findAction(scriptParam)[0]
var getLineEditor = findActionWrapper()

clog.debug('AA,TJ, findActionWrapper.toString()', findActionWrapper.toString())
log.debug('AA,TJ, findActionWrapper().toString()', findActionWrapper().toString()
)
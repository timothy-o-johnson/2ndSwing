// NG-1944

var ng1944 = {
  ticket: 'https://2ndswing.atlassian.net/browse/NG-1944',
  scriptName: 'Lookup Item for Attribution',
  scriptUrl:
    'https://4537321.app.netsuite.com/app/common/scripting/scriptrecord.nl?id=138',
  referenceItem: 'D-2206007670',
  scriptName: 'Item Attribute Editor',
  scriptUrl:
    'https://4537321.app.netsuite.com/app/common/scripting/script.nl?id=43',
  errors: {
    1: {
      type: 'error.SuiteScriptError',
      name: 'SSS_UNKNOWN_HOST',
      message:
        'The host you requested https://imgs.2ndswing.com/gallery/D-2206007670.json is unknown or cannot be found.',
      stack: [
        'anonymous(N/serverRecordService)',
        'onRequest(/SuiteScripts/WMS/shared/EditItemAttributes.js:1640)'
      ],
      cause: {
        type: 'internal error',
        code: 'SSS_UNKNOWN_HOST',
        details:
          'The host you requested https://imgs.2ndswing.com/gallery/D-2206007670.json is unknown or cannot be found.',
        userEvent: null,
        stackTrace: [
          'anonymous(N/serverRecordService)',
          'onRequest(/SuiteScripts/WMS/shared/EditItemAttributes.js:1640)'
        ],
        notifyOff: false
      },
      id: '',
      notifyOff: false,
      userFacing: false
    },
    2: {
      type: 'error.SuiteScriptError',
      name: 'UNEXPECTED_ERROR',
      message: null,
      stack: [
        'createError(N/error)',
        'getAllFields(/SuiteScripts/WMS/shared/ItemHelper.js:153)',
        'cacheItemLoader(/SuiteScripts/WMS/shared/ItemHelper.js:86)',
        '_get(N/cache)',
        'onRequest(/SuiteScripts/WMS/shared/EditItemAttributes.js:92)'
      ],
      cause: {
        type: 'internal error',
        code: 'UNEXPECTED_ERROR',
        details: null,
        userEvent: null,
        stackTrace: [
          'createError(N/error)',
          'getAllFields(/SuiteScripts/WMS/shared/ItemHelper.js:153)',
          'cacheItemLoader(/SuiteScripts/WMS/shared/ItemHelper.js:86)',
          '_get(N/cache)',
          'onRequest(/SuiteScripts/WMS/shared/EditItemAttributes.js:92)'
        ],
        notifyOff: false
      },
      id: '7fe7c15b-e0d9-467b-bda4-9dcc47862f2e-2d323032302e30332e3235',
      notifyOff: false,
      userFacing: false
    }
  }
}

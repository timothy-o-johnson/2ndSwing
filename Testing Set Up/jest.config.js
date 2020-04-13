const SuiteCloudJestConfiguration = require('@oracle/suitecloud-unit-testing/jest-configuration/SuiteCloudJestConfiguration')

module.exports = SuiteCloudJestConfiguration.build({
  projectFolder: 'CentralizeCredit', //or your SDF project folder
  projectType: SuiteCloudJestConfiguration.ProjectType.ACP,
  customStubs: [
    {
      module: '../shared/ItemHelper',
      path: '<rootDir>/customStubs/itemHelper.js'
    },
    {
      module:
        'SuiteScripts/CentralizeCredit/FileCabinet/SuiteScripts/RL_Get_Gift_Certificates',
      path: '<rootDir>/FileCabinet/SuiteScripts/RL_Get_Gift_Certificates.js'
    }, // SuiteScripts/LIB_SearchHelpers
    {
      module: 'SuiteScripts/LIB_SearchHelpers',
      path: '<rootDir>/customStubs/LIB_SearchHelpers.js'
    },
    {
      module: '/SuiteScripts/WMS/shared/ItemHelper',
      path: '<rootDir>/customStubs/itemHelper.js'
    },
    {
      module: '/SuiteScripts/WMS/shared/jquery-3.3.1.min.js',
      path: '<rootDir>/customStubs/jquery.js'
    },
    {
      module: '/SuiteScripts/WMS/shared/SavedSearchLibrary',
      path: '<rootDir>/customStubs/SavedSearchLibrary.js'
    },
    {
      module: 'N/cache',
      path: '<rootDir>/customStubs/cache.js'
    },
    {
      module: 'N/currentRecord',
      path: '<rootDir>/customStubs/currentRecord.js'
    },
    {
      module: 'N/file',
      path: '<rootDir>/customStubs/file.js'
    },
    {
      module: 'N/https',
      path: '<rootDir>/customStubs/https.js'
    },
    {
      module: 'N/log',
      path: '<rootDir>/customStubs/log.js'
    },
    {
      module: 'N/render',
      path: '<rootDir>/customStubs/render.js'
    },
    {
      module: 'N/redirect',
      path: '<rootDir>/customStubs/redirect.js'
    },
    {
      module: 'N/runtime',
      path: '<rootDir>/customStubs/runtime.js'
    },
    {
      module: 'N/search',
      path: '<rootDir>/customStubs/search.js'
    },
    {
      module: 'N/ui/dialog',
      path: '<rootDir>/customStubs/dialog.js'
    },
    {
      module: 'N/ui/message',
      path: '<rootDir>/customStubs/message.js'
    },
    {
      module: 'N/ui/serverWidget',
      path: '<rootDir>/customStubs/serverWidget.js'
    },
    {
      module: 'N/url',
      path: '<rootDir>/customStubs/url.js'
    }
  ]
})

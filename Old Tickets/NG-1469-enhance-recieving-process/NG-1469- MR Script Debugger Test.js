// NG-1469- MR test
// https://4537321-sb1.app.netsuite.com/app/help/helpcenter.nl?fid=section_4345798404.html

require(['N/record', 'N/search', '/SuiteScripts/WMS/shared/SavedSearchLibrary','N/task'], /**
 * @param {record} record
 */
  function (record, search, ssLib, task) {
    var mrTask = task.create({ taskType: task.TaskType.MAP_REDUCE })
    mrTask.scriptId = 'customscript_mr_create_multiple_skus'
    mrTask.deploymentId = 1
    var mrTaskId = mrTask.submit()

    log.debug('mrTask', mrTask)
    log.debug('mrTaskId', mrTaskId)
  })

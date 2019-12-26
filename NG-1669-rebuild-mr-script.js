/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define([
  'N/record',
  'N/search'/*,
  'SuiteScripts/WMS/shared/SavedSearchLibrary'*/
], /**
 * @param {record} record
 */

function (record, search/*, ssLib*/) {
  /**
   * Marks the beginning of the Map/Reduce process and generates input data.
   *
   * @typedef {Object} ObjectRef
   * @property {number} id - Internal ID of the record instance
   * @property {string} type - Record type id
   *
   * @return {Array|Object|Search|RecordRef} inputSummary
   * @since 2015.1
   */
  function getInputData () {
    var type = 'serviceitem'
    var searchId = null
    var filters = [
      ['custitem_kit_needs_refresh', 'is', 'T'],
      'AND',
      ['parent', 'isempty', '']
    ]
    var columns = []

    var serviceItemsThatNeedKitRefresh = ssLib.fullSearch(
      type,
      searchId,
      filters,
      columns
    )

    return serviceItemsThatNeedKitRefresh
  }

  /**
   * Executes when the map entry point is triggered and applies to each key/value pair.
   *
   * @param {MapSummary} context - Data collection containing the key/value pairs to process through the map stage
   * @since 2015.1
   */
  function map (context) {}

  /**
   * Executes when the reduce entry point is triggered and applies to each group.
   *
   * @param {ReduceSummary} context - Data collection containing the groups to process through the reduce stage
   * @since 2015.1
   */
  function reduce (context) {}

  /**
   * Executes when the summarize entry point is triggered and applies to the result set.
   *
   * @param {Summary} summary - Holds statistics regarding the execution of a map/reduce script
   * @since 2015.1
   */
  function summarize (summary) {}

  return {
    getInputData: getInputData,
    map: map,
    reduce: reduce,
    summarize: summarize
  }
})

require(['N/record', 'N/search', '/SuiteScripts/WMS/shared/SavedSearchLibrary'], /**
 * @param {record} record
 */ function (record, search, ssLib) {
    var currRec = record.load({
      type: record.Type.INVENTORY_ITEM,
      id: '29381'
    })

    var isParentRec = isParentRecord(currRec)

    log.debug('isParentRec', isParentRec)

    function isParentRecord (record) {
      var internalid = record.getValue({ fieldId: 'internalid' })
      var itemSearchObj = search.create({
        type: 'item',
        filters: [
          ['internalid', 'is', internalid],
          'AND',
          ['parent.internalidnumber', 'isempty', '']
        ],
        columns: []
      })

      var results = ssLib.getFormattedSearchResults(itemSearchObj)
      var isParent = results.length > 0

      log.debug('results', JSON.stringify(results))
      log.debug('isParent', isParent)
      return isParent
    }
  })

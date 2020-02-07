require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  // enter functions here

  var eventRecord = record.load({
    type: 'calendarevent',
    id: 47768
  })

  formMap = {
    email: 'custevent_fittinginfoemail',
    firstName: 'custevent_fittinginfofirstname',
    fittingType: 'custevent_fittinginfotype',
    id: 'id',
    lastName: 'custevent_fittinginfolastname',
    location: 'custevent_fittinginfolocation',
    phone: 'custevent_fittinginfophone'
  }

  var sharedData = {}
  var fieldId, value

  var formFields = Object.keys(formMap)

  formFields.forEach(function (field) {
    fieldId = formMap[field]

    value = eventRecord.getValue({
      fieldId: fieldId
    })

    sharedData[field] = value
  })

  log.debug('sharedData', sharedData)
})

var serviceItemData = {
  salesdescription: 'Tour Van Iron Set Fitting',
  internalid: [{ value: '81797', text: '81797' }],
  itemid: '1-184429',
  custitem_base_price_copy: '100.00'
}

var itemDataObj = {
  fittingCost: '100.00',
  fittingTypeName: 'Tour Van Iron Set Fitting - Free With Purchase Over $800',
  serviceItemId: '1-184429',
  serviceItemInternalId: '81797',
  serviceItemDescription: 'Tour Van Iron Set Fitting',
  serviceItemPrice: '100.00'
}

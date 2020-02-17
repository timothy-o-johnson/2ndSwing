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

  var fieldId = 'custevent_related_sales_orders'

  var oldValue = eventRecord.getValue({
    fieldId: fieldId
  })

  var oldText = eventRecord.getValue({
    fieldId: fieldId
  })

  var newValue = [3023561, 3027785]

  eventRecord.setValue({
    fieldId: fieldId,
    value: newValue
  })

  var successfulSave = eventRecord.save()

  eventRecord = record.load({
    type: 'calendarevent',
    id: 47768
  })

  var newValueActual = eventRecord.getValue({
    fieldId: fieldId
  })

  // "custevent_related_sales_orders": [
  // "3476700",
  // "3476711",
  // "3477120"
  // ],

  // formMap = {
  //   email: 'custevent_fittinginfoemail',
  //   firstName: 'custevent_fittinginfofirstname',
  //   fittingType: 'custevent_fittinginfotype',
  //   id: 'id',
  //   lastName: 'custevent_fittinginfolastname',
  //   location: 'custevent_fittinginfolocation',
  //   phone: 'custevent_fittinginfophone'
  // }

  // var sharedData = {}
  // var fieldId, value

  // var formFields = Object.keys(formMap)

  // formFields.forEach(function (field) {
  //   fieldId = formMap[field]

  //   value = eventRecord.getValue({
  //     fieldId: fieldId
  //   })

  //   sharedData[field] = value
  // })

  log.debug('newValueActual', newValueActual)
})


/***************************** */

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

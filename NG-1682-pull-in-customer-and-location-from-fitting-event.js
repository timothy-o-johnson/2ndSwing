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

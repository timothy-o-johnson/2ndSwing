// NG-1669 debugger

// test service item https://debugger.na0.netsuite.com/app/common/item/item.nl?id=2813982&e=T

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers'
], function (search, record, ssLib, searchHelpers) {
  // enter functions here
  //
  //
})

// NG-1682
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers'
], function (search, record, ssLib, searchHelpers) {
  
    var fittingTypeId = 14

var fittingTypeData = search.lookupFields({
			type: 'customrecord_fittingtype',
			id: fittingTypeId,
			columns: ['custrecord_fittingtype_service_item', 'custrecord_fittingcost', 'name']
		});

		var serviceItemInternalId =  fittingTypeData['custrecord_fittingtype_service_item'][0].value

		var serviceItemData = search.lookupFields({
			type: search.Type.SERVICE_ITEM,
			id: serviceItemInternalId,
			columns: ['salesdescription', 'custitem_base_price_copy']
		});

	
		serviceItemObj = {
			fittingCost: fittingTypeData['custrecord_fittingcost'],
			fittingTypeName: fittingTypeData['name'],
			serviceItemId: fittingTypeData['custrecord_fittingtype_service_item'][0].text,
			serviceItemInternalId: serviceItemInternalId,
			serviceItemDescription: serviceItemData['salesdescription'],
			serviceItemPrice: serviceItemData['custitem_base_price_copy'],
		}

		return serviceItemObj
})

// NG-1757
require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary',
  'SuiteScripts/LIB_SearchHelpers'
], function (search, record, ssLib, searchHelpers) {
  var validCategoryIds = []
  var type = 'customrecord_g2_category'
  var searchId = null
  var filters = ['custrecord_category_shorten_ebay_title', 'is', 'true']
  var columns = ['custrecord_category_shorten_ebay_title']

  var searchResults = searchHelpers.fullSearch(type, searchId, filters, columns)

  searchResults.forEach(function (result) {
    validCategoryIds.push(result.id)
  })

  validCategoryIds

  log.debug('validCategoryIds', validCategoryIds)
})

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  // enter functions here

  var type = 'salesorder'
  var searchId = null
  var filters = ['internalid', 'is', 3468625]
  var columns = ['custbody_customfitting_eventnotes']

  var results = ssLib.fullSearch(type, searchId, filters, columns)

  var eventRecord = record.load({
    type: 'calendarevent',
    id: 47768
  })

  formMap = {
    location: 'custevent_fittinginfolocation',
    firstName: 'custevent_fittinginfofirstname',
    lastName: 'custevent_fittinginfolastname',
    email: 'custevent_fittinginfoemail',
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

// NG-1669 debugger

// test service item https://debugger.na0.netsuite.com/app/common/item/item.nl?id=2813982&e=T

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  function getCatAttributeFilters () {
    var catAttributeFilters = {
      'Ebay Title': 'custitem_g2_ebaytitle',
      'Online Title': 'custitem_g2_onlinetitle',
      'Is Ecommerce Item': 'custitem_g2_isecommerceitem',
      'List on 2S Only': 'custitem_g2_liston2sonly',
      'Parent Item Brand': 'custitem_wms_parentitembrand',
      'Parent Item Category': 'custitem_wms_parentitemcategory',
      'Parent Item Model': 'custitem_wms_parentitemmodel',
      'Price Discount Amt': 'custitem_g2_pricediscountamt',
      'Price Discount Pct': 'custitem_g2_pricediscountpct',
      'Price Premium Amt': 'custitem_g2_pricepremiumamt',
      'Price Premium Percent': 'custitem_g2_pricepremiumpct'
    }
    return Object.values(catAttributeFilters)
  }
  log.debug(getCatAttributeFilters())
})

require([
  'N/search',
  'N/record',
  '/SuiteScripts/WMS/shared/SavedSearchLibrary'
], function (search, record, ssLib) {
  var selections = []

  var type = 'customrecord_g2_subcategory'
  var searchId = null
  var columns = []

  var filters = ['custrecord_g2_subcategory_category_ref', 'is', 1]
  var subcategories = ssLib.fullSearch(type, searchId, filters, columns)
  subcategories.forEach(function (subcategory) {
    var text, value
    value = subcategory.fieldId
    text = subcategory.custrecord_g2_subcategory_value.value

    selections.push[{ text: text, value: value }]
  })

  log.debug('selections', selections)
  log.debug('subcategories', subcategories)
})

// NG-

var nextStep = `replace the referrer html for the item conversion with a link to ${blankItemConversionPage} `

var ng1968 = {
    scripts: ['Edit Item Attributes', 'Attribution - Client'],
  scriptField1: {
    label: 'Item For Attribute Script Id',
    field: 'custscript_lookup_item_for_attribute_id',
    description:
      '[NG-1968] script id for lookup item attribute to make environment agnostic',
    type: 'Free-form Text'
  },
  scriptField2: {
    label: 'Item Conversion Script Id',
    field: 'custscript_item_conversion_script_id',
    description:
      '[NG-1968] script id for lookup Item Conversion Script to make environment agnostic',
    type: 'Free-form Text'
  }
}

var referringPages = {
  lookupItem: 49, // 499 -> 43 - works redirects back
  itemConversion: 407, // works redirects back
  selectLine: 48, // works- closes
  itemAttributeEditor: 43 // from apparel? opportunity
}

var blankItemConversionPage = 'https://4537321-sb1.app.netsuite.com/app/site/hosting/scriptlet.nl?script=407&deploy=1'
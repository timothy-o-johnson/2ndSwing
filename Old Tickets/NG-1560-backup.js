var category = 'dog'
var parent = ''
var parentItemType = 'chocolate'
var upc = '0'
var filters = getFilters(category, parent, parentItemType, upc)

console.log('filters', filters)

var childSublistFields = []
var childLines = 0

function getFilters (category, parent, parentItemType, upc) {
  var filters = []
  var filter
  var searchFilters = [category, parent, parentItemType, upc]

  for (var i = 0; i < searchFilters.length; i++) {
    if (searchFilters[i]) {
      if (filters.length > 0) {
        filters.push('AND')
      }

      switch (i) {
        case 0: // category
          filter = ['custitem_g2_category_ref', 'is', category]
          break
        case 1: // parent
          filter = ['parent', 'is', parent]
          break
        case 2: // parent item type
          filter = ['custitem_wms_parentitemtype', 'is', parentItemType]
          break
        case 3: // upc code
          filter = ['upccode', 'startswith', upc]
          break
        // filter = ['category', 'anyof', '-133']
      }

      filters.push(filter)
    }
  }
  return filters
}

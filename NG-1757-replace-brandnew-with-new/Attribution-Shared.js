define(['N/search'], /**
 * @param {search} search
 */ function (search) {
  function categoryIsValid (categoryId) {
    var validCategoryIds = getValidCategoryIds()

    var isCategoryValid = validCategoryIds.indexOf(categoryId) !== -1

    return isCategoryValid

    function getValidCategoryIds () {
      var validCategoryIds = []
      var validId

      var validCategories = {
        'Golf Balls': 3,
        'Junior Bottom': 56,
        'Junior Golf Shoe': 12,
        'Junior Top': 57,
        'Mens Bottoms': 41,
        'Mens Golf Outerwear': 13,
        'Mens Golf Pants': 52,
        'Mens Golf Sandal': 54,
        'Mens Golf Shirts': 15,
        'Mens Golf Shoe': 40,
        'Mens Golf Shorts': 16,
        'Mens Golf Sweater': 14,
        'Mens Long Sleeve Golf Shirts': 82,
        'Mens Short Sleeve Golf Shirts': 83,
        'Womens Bottom': 50,
        'Womens Golf Outerwear': 24,
        'Womens Golf Pants': 25,
        'Womens Golf Shirts': 27,
        'Womens Golf Shoe': 51,
        'Womens Golf Shorts': 26,
        'Womens Golf Skorts': 87,
        'Womens Golf Sweater': 28,
        'Womens Long Sleeve Golf Shirts': 84,
        'Womens Short Sleeve Golf Shirt': 85,
        'Womens Sleeveless Golf Shirts': 86
      }

      categoryKeys = Object.keys(validCategories)

      categoryKeys.forEach(function (key) {
        validId = validCategories[key].toString()
        validCategoryIds.push(validId)
      })

      log.debug('AA, TJ: valid validCategoryIds (hard-coded)', validCategoryIds)

      return validCategoryIds
    }
  }

  function categoryIsValidDynamic (categoryId) {
    var validCategoryIds = getValidCategoryIdsDynamically()

    var isCategoryValid = validCategoryIds.indexOf(categoryId) !== -1

    return isCategoryValid

    function getValidCategoryIdsDynamically () {
      var validCategoryIds = []

      var type = 'customrecord_g2_category'
      var searchId = null
      var filters = ['custrecord_category_shorten_ebay_title', 'is', 'true']
      var columns = ['custrecord_category_shorten_ebay_title']

      var searchResults = searchHelpers.fullSearch(
        type,
        searchId,
        filters,
        columns
      )

      searchResults.forEach(function (result) {
        validCategoryIds.push(result.id)
      })

      log.debug('AA, TJ: valid validCategoryIds (Dynamic)', validCategoryIds)
      return validCategoryIds
    }
  }

  return {
    categoryIsValid: categoryIsValid,
    categoryIsValidDynamic: categoryIsValidDynamic
  }
})

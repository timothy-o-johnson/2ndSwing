// NS Testing for chunking search size

var originalArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(filterItemsWithZeroInventory(originalArr))

function filterItemsWithZeroInventory (itemIds) {
  var functionName = 'filterItemsWithZeroInventory'
  // printVar(functionName, 'intitial length', itemIds.length);

  itemIds = Array.isArray(itemIds) ? itemIds : [itemIds]
  itemIds

  var maxSize = 3
  var arrSize = itemIds.length
  var beg = 0
  var end = maxSize
  var itemsWithInventory = []

  if (itemIds.length > maxSize) {
    // if too large break into chunks
    //   printVar(functionName, 'entering chunk loop', beg + ', ' + end);
    var tempArr
    tempArr = itemIds.slice(beg, end)

    while (tempArr.length > 0) {
      // itemsWithInventory = getItemsWithInventory(tempArr, itemsWithInventory);
      itemsWithInventory
      itemsWithInventory = getEvens(tempArr, itemsWithInventory)
      itemsWithInventory
      beg = end
      end = end + maxSize <= arrSize ? end + maxSize : arrSize
      tempArr = itemIds.slice(beg, end)
      //   printVar(functionName, 'beg, end', beg + ', ' + end);
    }
  }

  return itemsWithInventory
}

function getEvens (tempArr, evens) {
  tempArr
  evens
  tempArr.forEach(function (element) {
    element
    if (element % 2 === 0) {
      evens.push(element)
    }
  })
  evens
  return evens
}

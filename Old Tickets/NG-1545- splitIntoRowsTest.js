// NG-1545 - label

var desc = 'New Mens Nike Polo Large L Magenta MSRP $70 831267 / New W/ Logo'

console.log(splitIntoRows(desc))

function splitIntoRows (desc) {
  var newDescription = ''
  var MAXWIDTH = 30
  var descRow = ''
  var rowIsWithinMaxWidth
  var row = 0

  // split the string into an array
  var descArr = desc.split(' ')
  // loop through descArr and add elements to a tempDescription while total length is under 20 char
  descArr.forEach(function (word) {
    rowIsWithinMaxWidth = descRow.length + word.length < MAXWIDTH

    if (rowIsWithinMaxWidth) {
      descRow = descRow + ' ' + word
    } else {
      newDescription = addRowToNewDescription(descRow, row, newDescription)
      row++
      //start the next row
      descRow = word
    }
  })

  // handle the last row that didn't meet the criteria for saving 
  if (rowIsWithinMaxWidth) {
    row++
    newDescription = addRowToNewDescription(descRow, row, newDescription)
  }

  return newDescription

  function addRowToNewDescription (descRow, row, newDescription) {
    descRow = descRow.trim()
    var rowHeight = 100 + row * 30

    newDescription += '^CFA,30 ^FO50,' + rowHeight + '^FD' + descRow + '^FS'

    return newDescription
  }
}
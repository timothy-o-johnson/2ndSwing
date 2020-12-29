function updateOpenPOsFieldOnVendorRecord_CS (vendorId) {
  vendorId = `{%VENDOR_ID%}`
  var openPOsCount = getOpenPurchaseOrdersCount(vendorId)
  var updatedPOId = updateOpenPOsFieldOnVendorRec(vendorId, openPOsCount)

  console.log('updatedPOId', updatedPOId)
}

var vendorId = 112

var stringified = updateOpenPOsFieldOnVendorRecord_CS
  .toString()
  .replace('{%VENDOR_ID%}', vendorId)

console.log(stringified)

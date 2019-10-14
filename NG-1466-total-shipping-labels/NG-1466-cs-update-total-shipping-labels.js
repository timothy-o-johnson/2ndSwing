/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord'], /**
 * @param {currentRecord}
 *            currentRecord
 */ function (currentRecord) {

    function saveRecord (context) {
      var currentRecord = context.currentRecord
      var lineCount = currentRecord.getLineCount({
        sublistId: 'expense'
      })
      var totalShippingLabels = 0

      for (var i = 0; i < lineCount; i++) {
        var shippingLabelCount = currentRecord.getSublistValue({
          sublistId: 'expense',
          fieldId: 'custcol_numshippinglabels',
          line: i
        })

        totalShippingLabels += validate(shippingLabelCount)
      }

      currentRecord.setValue({
        fieldId: 'custbody_total_shipping_labels',
        value: totalShippingLabels
      })

      return true
    }

    function validate(number) {
      if (number === null || isNaN(number) || number === '') {
          number = 0
      } 
      
      number = parseInt(number)
      
    
      return number
    }
    return {
      saveRecord: saveRecord
    }
  })

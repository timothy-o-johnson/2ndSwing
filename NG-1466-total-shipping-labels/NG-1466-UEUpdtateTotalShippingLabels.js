/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/search'],
    /**
     * @param {record} record
     * @param {search} search
     */
    function (record, search) {

        function beforeSubmit(context) {
            debugger
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
            beforeSubmit: beforeSubmit
        };

    });

var ng2305 = {
  baseline: {
    settingMainline: [`setLocationOnSublistItems(): total time: `, 84.408],
    addingOneLine: {
      'setLocationOnSublistItems(): total time': 4.499,
      'getLocationForAllSublistItems(): totalTime': 3.629,
      totalTime: 8.1
    }
  },
  firstImprovement: {
    description: 'search sublist for item with location set to empty',
    settingMainline: [`setLocationOnSublistItems(): total time:`, 84.408],
    addingOneLine: {
      'setLocationOnSublistItems(): total time': 0.583,
      'getLocationForAllSublistItems(): totalTime': 3.782,
      totalTime: 4.4
    }
  },
   secondImprovement: {
    description: 'only getLocationForAllSublistItems() if in testing',
    settingMainline: [`setLocationOnSublistItems(): total time:`, 46.045],
    addingOneLine: {
      'setLocationOnSublistItems(): total time': 0.557,
      'getLocationForAllSublistItems(): totalTime': 0,
      totalTime: .6
    }
   },
   fixingBugs: {
     d24: {
       commitMessage: 7,
       notes: `new updates unfilled items flawlessly`
     },
      7618: {
       commitMessage: 8,
       notes: ``
     }


   }
}


// Preserving previous script

/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

// file: PurchaseOrder-Client.js

define([
  '/SuiteScripts/WMS/shared/jquery-3.3.1.min.js',
  'N/currentRecord',
  'N/ui/dialog'
], function (jquery, cr, dialog) {
  var receiveItems = []

  var preventInfiniteLoopObj = {
    addingNewLineCount: {},
    callingFieldId: null,
    callingLine: null,
    callingSublistId: null,
    isSettingAllLines: null,
    sublistObj: {}
  }

  function pageInit (context) {
    console.log('pageInit(): PurchaseOrder-Client.js')

    var currentRecord = context.currentRecord
    var status = currentRecord.getValue({
      fieldId: 'status'
    })

    var validStati = ['Pending Receipt', 'Pending Bill']

    if (!validStati.includes(status) && status !== undefined) {
      var payCodeField = currentRecord.getField({
        fieldId: 'custbody_paycode_ref'
      })

      payCodeField.isDisabled = true
    }

    return {
      status: status,
      getField: currentRecord.getField,
      payCodeField: payCodeField
    }
  }

  function fieldChanged (context) {
    if (isInfiniteLoop(context)) return true
    // console.log(context)
    var currentRecord = context.currentRecord
    var fieldId = context.fieldId
    var sublistId = context.sublistId
    var payCodeChanged = fieldId === 'custbody_paycode_ref'
    var mainLineLocation = getValue('location', currentRecord)
    var mainLineLocationChanged = fieldId === 'location' && sublistId === null
    var sublistItemLocationChanged =
      fieldId === 'location' && sublistId && context.line
    var currentRecord = context.currentRecord
    var status = currentRecord.getValue({
      fieldId: 'status'
    })

    var settingPaycodeFieldForFirstTime = status === undefined

    if (payCodeChanged && !settingPaycodeFieldForFirstTime) {
      var payCodeWarning =
        'Changing the Paycode may affect the pricing of items on the PO.  <br> <br> Please make any necessary modifications to the Rates for the Items on the PO.'
      // alert(payCodeWarning)

      var alertMessage = {
        title: 'NOTE:',
        message: '<h2>' + payCodeWarning + '</h2>'
      }

      dialog
        .alert(alertMessage)
        .then(success)
        .catch(failure)
    }

    if (mainLineLocationChanged) {
      var linesWithLocationsThatHaveBeenSet = setLocationOnSublistItems(
        currentRecord,
        mainLineLocation,
        context
      )
      if (status !== 'Pending Receipt' && status !== undefined) {
        var payCodeField = currentRecord.getField({
          fieldId: 'custbody_paycode_ref'
        })

        payCodeField.isDisabled = true
      }
    }

    // preventInfiniteLoopObj.sublistObj = {}
    !preventInfiniteLoopObj.isSettingAllLines && resetPreventInfiniteLoopObj()

    // return
    if (context.isTesting) {
      return {
        currentRecord: currentRecord,
        dialog: dialog,
        getField: currentRecord.getField,
        linesWithLocationsThatHaveBeenSet: linesWithLocationsThatHaveBeenSet,
        lineItems: currentRecord.sublists.item,
        mainLineLocation: mainLineLocation,
        payCodeChanged: payCodeChanged,
        payCodeField: payCodeField,
        status: status,
        window: window
      }
    } else {
      return true
    }

    function success (result) {
      if (result) {
        // NS.form.isChanged = false
        // window.close()
      }
    }

    function failure (reason) {
      console.log('Failure: ' + reason)
    }
  }

  function getValue (fieldId, currentRecord) {
    var value = currentRecord.getValue({
      fieldId: fieldId
    })
    return value
  }

  function isInfiniteLoop (context) {
    var obj = preventInfiniteLoopObj
    var isSublist = context.sublistId

    if (context.isTesting) {
      return context.infiniteLoopValue
    }

    if (isSublist) {
      // sublistChanged
      var currentLine = context.currentRecord.getCurrentSublistIndex({
        sublistId: 'item'
      })

      var key = 'line ' + currentLine

      // if (!obj.isSettingAllLines) {
      //   console.log(
      //     'isInfinitLoop(): isSettingAllLines is false; resetting sublistObj'
      //   )

      //   if (!obj.addingNewLineCount[key]) {
      //     obj.addingNewLineCount[key] = 0
      //   } else {
      //     obj.addingNewLineCount[key]++
      //     if (obj.addingNewLineCount[key] > 2) {
      //       return true
      //     }
      //   }

      //   obj.sublistObj = {}
      // }

      // has this line already been checked?
      if (obj.sublistObj[key]) {
        return true
      } else {
        obj.sublistObj[key] = 'line already checked!'
        return false
      }
    } else {
      // fieldChanged
      var sameField = context.fieldId === obj.callingFieldId
      var sameLine = context.line === obj.callingLine
      var sameSublist = context.sublistId === obj.callingSublistId
    }

    return sameField && sameLine && sameSublist
  }

  function resetPreventInfiniteLoopObj () {
    preventInfiniteLoopObj = {
      addingNewLineCount: {},
      callingFieldId: null,
      callingLine: null,
      callingSublistId: null,
      isSettingAllLines: null,
      sublistObj: {}
    }
    console.log('preventInfiniteLoopObj has been reset', {
      preventInfiniteLoopObj: preventInfiniteLoopObj
    })
  }

  function setLocationOnSublistItems (
    currentRecord,
    mainLineLocation,
    context
  ) {
    var startTime = new Date()
    var linesWithLocationsThatHaveBeenSet = []

    var lineCount = currentRecord.getLineCount({
      sublistId: 'item'
    })

    var line = getStartingLine(currentRecord, lineCount)

    var updateItemLocation

    for (line; line < lineCount; line++) {
      selectLine(line, context)

      updateItemLocation = getUpdateItemLocation(
        currentRecord,
        mainLineLocation
      )

      console.log('line:', line)

      if (updateItemLocation) {
        linesWithLocationsThatHaveBeenSet.push('line ' + (line + 1))

        setPreventInfiniteLoopObj(context, line)

        currentRecord.setCurrentSublistValue({
          sublistId: 'item',
          fieldId: 'location',
          value: mainLineLocation,
          forceSyncSourcing: true
        })
      }
    }

    // clean up
    // select first line item
    selectLine(0, context)
    // indicate we have finished setting all lines
    console.log(
      'setLocationOnSublistItems(): finished settingAllLines; setting isSettingAllLines to false'
    )
    preventInfiniteLoopObj.isSettingAllLines = false
    // reset peventInfiniteLoopOjb
    preventInfiniteLoopObj.sublistObj = {}

    console.log({
      linesWithLocationsThatHaveBeenSet: linesWithLocationsThatHaveBeenSet
    })
    var endTime = new Date()
    console.log(
      'setLocationOnSublistItems(): total time:',
      (endTime - startTime) / 1000
    )

    return linesWithLocationsThatHaveBeenSet

    /**
     * improve speed by skipping directly to the sublist with location set to null
     * @param {*} currentRecord
     * @param {*} lineCount
     * @returns
     */
    function getStartingLine (currentRecord, lineCount) {
      var isNewRecord = !currentRecord.id

      // if new PO record, look for first line with location set to empty
      // else if existing PO record, look for first time with 'isclosed' status set to false
      var fieldId = isNewRecord ? 'location' : 'isclosed'
      var value = isNewRecord ? '' : 'F'

      var line = currentRecord.findSublistLineWithValue({
        sublistId: 'item',
        fieldId: fieldId,
        value: value
      })

      line = line === -1 ? lineCount : line

      return line
    }

    function getUpdateItemLocation (currentRecord, mainLineLocation) {
      //  var isOpen, itemLocation, updateItemLocation
      var updateItemLocation = false

      var itemLocation = currentRecord.getCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'location'
      })

      var isOpen = !currentRecord.getCurrentSublistValue({
        sublistId: 'item',
        fieldId: 'isclosed'
      })

      var isNewRecord = !currentRecord.id

      var locationsDoNotMatch = mainLineLocation !== itemLocation

      if (isNewRecord && itemLocation === '') {
        updateItemLocation = true
      } else if (!isNewRecord && isOpen && locationsDoNotMatch) {
        updateItemLocation = true
      }

      return updateItemLocation
    }

    function selectLine (line, context) {
      currentRecord.selectLine({
        sublistId: 'item',
        line: line,
        context: context
      })

      console.log(
        'selected line: ',
        currentRecord.getCurrentSublistIndex({ sublistId: 'item' })
      )
    }

    function setPreventInfiniteLoopObj (context, line) {
      console.log(
        'setLocationOnSublistItems(): starting to setAllLines; setting isSettingAllLines to true'
      )
      preventInfiniteLoopObj.callingFieldId = context.fieldId
      preventInfiniteLoopObj.callingLine = context.line || line
      preventInfiniteLoopObj.callingSublistId = context.sublistId
      preventInfiniteLoopObj.isSettingAllLines = true
    }
  }

  function sublistChanged (context) {
    if (isInfiniteLoop(context)) return true

    var items = []
    var currentRecord = context.currentRecord
    var sublistId = context.sublistId

    if (sublistId === 'item') {
      var mainLineLocation = currentRecord.getValue({
        fieldId: 'location'
      })

      if (mainLineLocation) {
        // get currentLineLocation
        var oldSublistItemLocation = currentRecord.getCurrentSublistValue({
          sublistId: 'item',
          fieldId: 'location'
        })

        if (!oldSublistItemLocation) {
          // if location is nullish, set it to match mainline location
          currentRecord.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'location',
            value: mainLineLocation,
            forceSyncSourcing: true
          })

          currentRecord.commitLine({ sublistId: 'item' })
        }

        setLocationOnSublistItems(currentRecord, mainLineLocation, context)
      }
    }

    items = getLocationForAllSublistItems(currentRecord, context)

    !preventInfiniteLoopObj.isSettingAllLines && resetPreventInfiniteLoopObj()

    return { currentRecord: currentRecord, items: items }

    function getLocationForAllSublistItems (currentRecord, context) {
      var startTime = new Date()

      if (context.isTesting) {
        var items = []

        var lineCount = currentRecord.getLineCount({
          sublistId: 'item'
        })

        var currentLine, itemLocation, key, tempObj

        for (var line = 0; line < lineCount; line++) {
          key = 'line ' + (line + 1)
          tempObj = {}

          currentLine = currentRecord.selectLine({
            sublistId: 'item',
            line: line,
            context: context
          })

          itemLocation = currentRecord.getCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'location'
          })

          tempObj[key] = itemLocation

          items.push(tempObj)
        }
      }

      var endTime = new Date()

      console.log(
        'getLocationForAllSublistItems(): totalTime',
        (endTime - startTime) / 1000
      )

      return items
    }
  }

  return {
    pageInit: pageInit,

    fieldChanged: fieldChanged,
    setLocationOnSublistItems: setLocationOnSublistItems,
    sublistChanged: sublistChanged
  }
})


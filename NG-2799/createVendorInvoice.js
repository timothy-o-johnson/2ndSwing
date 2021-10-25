// store widget process backup

define([
  'N/error',
  'N/record',
  'N/search',
  '/SuiteScripts/SecondSwingItems/lib_magento_code.js'
], function (error, record, search, magentoCode) {
  //Copy of the original TransferOrder/LIB_createVendorInvoice.js specific for running the store widget PO process.
  //Important requirement is to guarantee that the store credit is always created for the store widget PO so that the
  //backsync process can send it immediately to CounterPoint for customer use.
  function createVendorInvoice (
    newRec,
    expAccount,
    donationAccount,
    thirdPartyGCAccount,
    giftCertStoreCreditAccount,
    location,
    giftCertItem,
    giftCertsItemId
  ) {
    var poId = newRec.id
    log.debug('Purchase Order ID', poId)

    var location98 = location

    var currVendor = newRec.getValue('entity')
    log.debug('currVendor', currVendor)

    //NG - 1209, if Vendor does not have email, do not try to send email because it will fail
    var vendorFields = search.lookupFields({
      type: 'vendor',
      id: currVendor,
      columns: ['email']
    })

    if (vendorFields.email == '') {
      log.debug('vendor does not have email', 'Vendor ID: ' + currVendor)
      record.submitFields({
        type: 'purchaseorder',
        id: poId,
        values: {
          custbody_emailorderreceivedsummary: false
        }
      })
    }

    var paycode = newRec.getText('custbody_paycode_ref')
    log.debug('paycode', paycode)

    var poNum = newRec.getValue('tranid')

    var storeCreditNum = newRec.getValue('custbody_po_store_credit_no')
    //poNum = poNum.replace("-","");
    log.debug('poNum', poNum)

    var customer = 0
    var location = 0
    var gcAmount = 0

    location = newRec.getValue('location')
    log.debug('location', location)

    //Removing of Gift Certificate code

    if (paycode == 'Store Credit' || paycode == 'Gift Certificate') {
      log.debug('GOT IN GC/Store Credit check', paycode)

      customer = newRec.getValue('custbody_wms_linked_customer')

      log.debug('customer on PO ', customer)

      if (customer == undefined || customer == '') {
        var customerSearchObj = search.create({
          type: 'customer',
          filters: [['custentity_entitylink', 'anyof', currVendor]],
          columns: [
            search.createColumn({
              name: 'entityid',
              sort: search.Sort.ASC,
              label: 'ID'
            }),
            search.createColumn({ name: 'altname', label: 'Name' })
          ]
        })
        var searchResultCount = customerSearchObj.runPaged().count
        log.debug('customerSearchObj result count', searchResultCount)

        var custSearchObj = customerSearchObj
          .run()
          .getRange({ start: 0, end: 1 })

        if (searchResultCount > 0) {
          log.debug('customerfound?', custSearchObj[0].id)
          customer = custSearchObj[0].id
          //	return "";
        } else {
          var submitField = record.submitFields({
            type: 'purchaseorder',
            id: poId,
            values: {
              custbody_wms_customer_not_found: true
            }
          })

          return ''
        }
      }
    }

    var recLineObj = {}
    /*
    	var vendorInvoice = newRec.getValue('custbody_wms_prepay_invoice');
    	
    	if(vendorInvoice){
    		var vendInvFields = search.lookupFields({
	    		type: 'vendorbill',
	    	    id: vendorInvoice,
	    	    columns: ['approvalstatus']
	    	});
    		log.debug("vendInvFields.approvalstatus ",vendInvFields.approvalstatus[0].value );
    		if(vendInvFields.approvalstatus[0].value  == '1'){
    			alert('Prepay Vendor Invoice is Pending Approval. Please approve before creating Vendor Bill');
    			log.debug('alert');
    			return;
    		}
    	}
      */
    var poLineCount = newRec.getLineCount({
      sublistId: 'item'
    })
    log.debug('poLineCount', poLineCount)
    var discountItems = []
    var closedItems = []
    for (var t = 0; t < poLineCount; t++) {
      var itemType = newRec.getSublistValue({
        sublistId: 'item',
        fieldId: 'itemtype',
        line: t
      })
      //use the actual rate, not the received rate for the Vendor Invoice
      var rate = newRec.getSublistValue({
        sublistId: 'item',
        fieldId: 'rate',
        line: t
      })
      if (itemType == 'Discount') {
        var item = newRec.getSublistValue({
          sublistId: 'item',
          fieldId: 'item',
          line: t
        })

        discountItems.push({
          item: item,
          rate: rate
        })
        //NG-2142 if discount item, do not add to recLineObj
        continue
      }

      var lineLocation = newRec.getSublistValue({
        sublistId: 'item',
        fieldId: 'location',
        line: t
      })
      if (
        (location == '' ||
          location == 0 ||
          location == null ||
          location == undefined) &&
        lineLocation
      ) {
        location = lineLocation
      }

      var line = newRec.getSublistValue({
        sublistId: 'item',
        fieldId: 'line',
        line: t
      })
      var quantityReceived = newRec.getSublistValue({
        sublistId: 'item',
        fieldId: 'quantityreceived',
        line: t
      })

      var isClosedLine = newRec.getSublistValue({
        sublistId: 'item',
        fieldId: 'isclosed',
        line: t
      })

      recLineObj[line] = {}
      recLineObj[line]['quantity'] = quantityReceived

      recLineObj[line]['rate'] = rate

      if (isClosedLine == true && quantityReceived > 0) {
        var item = newRec.getSublistValue({
          sublistId: 'item',
          fieldId: 'item',
          line: t
        })
        closedItems.push({
          item: item,
          rate: rate,
          quantity: quantityReceived
        })
      }
    }
    log.debug('obj', JSON.stringify(recLineObj))
    log.debug('discountItems', discountItems)
    log.debug('closedLines', closedItems)

    //TODO NG-2229 - check if any lines are "Closed". Will need to re-close them after
    var closedLineObj = findClosedLines(poId)
    log.debug('closedLineObj', closedLineObj)

    if (Object.keys(closedLineObj).length != 0) {
      updatePoLines(poId, closedLineObj, false)
    }

    var vendInv = record.transform({
      fromType: 'purchaseorder',
      fromId: poId,
      toType: 'vendorbill'
    })
    vendInv.setValue({
      fieldId: 'approvalstatus',
      value: 2
    })

    vendInv.setValue({
      fieldId: 'custbody_wms_po_number',
      value: poNum
    })
    var lineCount = vendInv.getLineCount({
      sublistId: 'item'
    })
    log.debug('Vendor Invoice line Count', lineCount)
    for (var k = 0; k < lineCount; k++) {
      var currLine = vendInv.getSublistValue({
        sublistId: 'item',
        fieldId: 'orderline',
        line: k
      })

      if (recLineObj[currLine] != undefined) {
        vendInv.setSublistValue({
          sublistId: 'item',
          fieldId: 'quantity',
          line: k,
          value: recLineObj[currLine].quantity
        })
      }
      //Vendor Invoice is created with the rate at which they received it
      //	vendInv.setSublistValue({
      //		sublistId : 'item',
      //		fieldId : 'rate',
      //		line : k,
      //		value : recLineObj[currLine].rate
      //	});
    }
    //should NOT have any Discounts, but if there is, remove them.
    //NG-2142 - check if discount #
    for (var t = lineCount - 1; t >= 0; t--) {
      var itemType = vendInv.getSublistValue({
        sublistId: 'item',
        fieldId: 'itemtype',
        line: t
      })
      log.debug('vendorInvoice Item Type', itemType)
      if (itemType == 'Discount') {
        vendInv.removeLine({
          sublistId: 'item',
          line: t
        })
      }
    }
    lineCount = vendInv.getLineCount({
      sublistId: 'item'
    })

    //NG-2081 adding discount items
    for (var v = 0; v < discountItems.length; v++) {
      vendInv.setSublistValue({
        sublistId: 'item',
        fieldId: 'item',
        line: lineCount + v,
        value: discountItems[v].item
      })
      vendInv.setSublistValue({
        sublistId: 'item',
        fieldId: 'rate',
        line: lineCount + v,
        value: discountItems[v].rate
      })
    }

    //NG-1845 account for lines received AND closed
    /**
    	 * Not needed with NG-2229
    	var lineCount = vendInv.getLineCount({
    		sublistId : 'item'
    	});
    	for(var t = 0; t < closedItems.length; t++){
    		vendInv.setSublistValue({
    			sublistId : 'item',
    			fieldId : 'item',
    			line : lineCount + t, 
    			value : closedItems[t].item
    		});
    		vendInv.setSublistValue({
    			sublistId : 'item',
    			fieldId : 'quantity',
    			line : lineCount + t, 
    			value : closedItems[t].quantity
    		});	
    		vendInv.setSublistValue({
    			sublistId : 'item',
    			fieldId : 'rate',
    			line : lineCount + t, 
    			value : closedItems[t].rate
    		});

    	}
    	*/

    var id = vendInv.save()
    log.debug('successfully saved vendor invoice', id)
    //NG-2229 Re-close all closed PO Lines
    if (Object.keys(closedLineObj).length != 0) {
      updatePoLines(poId, closedLineObj, true)
    }

    var updateId = record.submitFields({
      type: record.Type.VENDOR_BILL,
      id: id,
      values: {
        tranid: id
      }
    })

    //if vendor bill creation successful, check if there is a prepayment
    if (id) {
      var poFields = search.lookupFields({
        type: 'purchaseorder',
        id: poId,
        columns: ['custbody_wms_prepay_invoice']
      })
      var bill = poFields.custbody_wms_prepay_invoice[0].value

      log.debug('vendor bill id', bill)

      //If there is a prepayment, create a vendor credit for the prepayment amount,
      //apply that vendor credit to the vendor bill created above
      if (bill) {
        var billFields = search.lookupFields({
          type: 'vendorbill',
          id: bill,
          columns: ['status', 'total']
        })
        log.debug('Prepayment Invoice Status', billFields)
        var billStatus = billFields.status[0].value
        var billTotal = billFields.total
        log.debug('billTotal', billTotal)
        //if Vendor Payment generated already
        //Unapply the Vendor Credit from the Prepayment Invoice,
        //Apply the Vendor Credit to the new Invoice
        if (billStatus == 'paidInFull') {
          //Need to generate Vendor Credit for Prepay Invoice amount
          //Update Expense Line to Prepaid Inventory account

          //LIB: this is now a parameter
          /*var expAccount = runtime.getCurrentScript().getParameter({
	    				name : 'custscript_wms_prepay_exp_account'
	    			});*/

          var vendorCredit = record.transform({
            fromType: 'vendorbill',
            fromId: id,
            toType: 'vendorcredit'
          })

          var lineCount = vendorCredit.getLineCount({ sublistId: 'expense' })
          log.debug('vendor credit expense line count', lineCount)
          for (var j = 0; j < lineCount; j++) {
            var idDelete = vendorCredit.removeLine({
              sublistId: 'expense',
              line: j,
              ignoreRecalc: false
            })
            log.debug('deleted line j', idDelete)
          }
          log.debug('prepaid account param', expAccount)
          vendorCredit.insertLine({
            sublistId: 'expense',
            line: 0
          })
          vendorCredit.setSublistValue({
            sublistId: 'expense',
            fieldId: 'account',
            line: 0,
            value: expAccount
          })
          log.debug('typeof billtotal', typeof billTotal)
          vendorCredit.setSublistValue({
            sublistId: 'expense',
            fieldId: 'amount',
            line: 0,
            value: parseFloat(billTotal)
          })
          //NG-574 update, remove items
          var itemCount = vendorCredit.getLineCount({ sublistId: 'item' })
          for (var k = itemCount - 1; k >= 0; k--) {
            var idDelete = vendorCredit.removeLine({
              sublistId: 'item',
              line: k,
              ignoreRecalc: false
            })
            log.debug('deleted line k', idDelete)
          }
          //find new Invoice in Apply Sublist
          id = id.toString()

          //Now, we must go to the Apply sublist, find the "applied" line, set the amount on the applied line to the
          //Vendor Credit amount NOT the entire Invoice amount
          var applyCount = vendorCredit.getLineCount({ sublistId: 'apply' })
          for (var v = 0; v < applyCount; v++) {
            var applied = vendorCredit.getSublistValue({
              sublistId: 'apply',
              fieldId: 'apply',
              line: v
            })
            log.debug('deleted line k', idDelete)
            if (applied == true) {
              log.debug(
                'updating total on apply line vendor Credit',
                parseFloat(billTotal)
              )
              vendorCredit.setSublistValue({
                sublistId: 'apply',
                fieldId: 'amount',
                line: v,
                value: parseFloat(billTotal)
              })
            }
          }

          var vendId = vendorCredit.save()
          log.debug('vendCredit Id', vendId)
          if (vendId) {
            var updateId = record.submitFields({
              type: 'vendorbill',
              id: bill,
              values: {
                custbody_wms_prepayment_credit_applied: true
              }
            })

            return parseInt(id)
          }
        } else {
          var vendCredit = record.transform({
            fromType: 'vendorbill',
            fromId: bill,
            toType: 'vendorcredit',
            isDynamic: false
          })
          var lineCount = vendCredit.getLineCount({ sublistId: 'apply' })
          log.debug('vendor credit line count', lineCount)
          //Unapply all Invoice
          for (var i = 0; i < lineCount; i++) {
            vendCredit.setSublistValue({
              sublistId: 'apply',
              fieldId: 'apply',
              line: i,
              value: false
            })
          }

          var tempId = vendCredit.save()

          var vendCredit = record.load({
            type: 'vendorcredit',
            id: tempId
          })
          var amount = vendCredit.getValue({
            fieldId: 'usertotal'
          })
          log.debug('credit amount', amount)

          var lineCount = vendCredit.getLineCount({ sublistId: 'apply' })
          log.debug('vendor credit line count', lineCount)
          //Unapply all Invoice
          for (var i = 0; i < lineCount; i++) {
            var appliedLine = vendCredit.findSublistLineWithValue({
              sublistId: 'apply',
              fieldId: 'apply',
              value: true
            })
            log.debug('applied line', appliedLine)
            //uncheck default applied line
            if (appliedLine) {
              log.debug('found invoice', appliedLine)
              vendCredit.setSublistValue({
                sublistId: 'apply',
                fieldId: 'apply',
                line: appliedLine,
                value: false
              })
              var checkApply = vendCredit.getSublistValue({
                sublistId: 'apply',
                fieldId: 'apply',
                line: appliedLine
              })
              log.debug('check apply', checkApply)
              break
            }
          }

          for (var j = 0; j < lineCount; j++) {
            var doc = vendCredit.getSublistValue({
              sublistId: 'apply',
              fieldId: 'doc',
              line: j
            })
            log.debug('doc in apply sublist', doc)
            log.debug('typeof doc', typeof doc)
          }
          id = id.toString()
          var lineNum = vendCredit.findSublistLineWithValue({
            sublistId: 'apply',
            fieldId: 'doc',
            value: id
          })
          log.debug('lineNum', lineNum)
          if (lineNum != -1) {
            log.debug('found invoice', lineNum)
            vendCredit.setSublistValue({
              sublistId: 'apply',
              fieldId: 'apply',
              line: lineNum,
              value: true
            })
            vendCredit.setSublistValue({
              sublistId: 'apply',
              fieldId: 'amount',
              line: lineNum,
              value: amount
            })
          } else {
            log.error(
              'Could not find vendor invoice id: ' + id,
              'in vendor credit'
            )
          }
          var sanityCheck = vendCredit.getSublistValue({
            sublistId: 'apply',
            fieldId: 'apply',
            line: lineNum
          })
          log.debug('apply value before save for line: ' + lineNum, sanityCheck)
          //NG-574 update, remove items
          var itemCount = vendCredit.getLineCount({ sublistId: 'item' })
          for (var k = itemCount - 1; k >= 0; k--) {
            var idDelete = vendCredit.removeLine({
              sublistId: 'item',
              line: k,
              ignoreRecalc: false
            })
            log.debug('deleted line k', idDelete)
          }

          var vendId = vendCredit.save()
          log.debug('vendCredit Id', vendId)
          if (vendId) {
            var updateId = record.submitFields({
              type: 'vendorbill',
              id: bill,
              values: {
                custbody_wms_prepayment_credit_applied: true
              }
            })

            return parseInt(id)
          }
        }
      }
      //NG-675 If Paycode == 'Donation', Create Vendor Payment with with account "Account #2900 Donations Payable."
      else if (paycode == 'Donation') {
        log.debug('got in donation section', paycode)

        var vendorPayment = record.transform({
          fromType: 'vendorbill',
          fromId: id,
          toType: 'vendorpayment'
        })
        //custscript_wms_donation_account - Donation Account Script Parameter
        //LIB: this is now a parameter
        /*var donationAccount = runtime.getCurrentScript().getParameter({
    				name : 'custscript_wms_donation_account'
    			});*/
        log.debug('donation account script param', donationAccount)
        vendorPayment.setValue({
          fieldId: 'account',
          value: donationAccount
        })

        var paymentId = vendorPayment.save()
        log.debug('donation vendor payment id', paymentId)
        if (paymentId) {
          return parseInt(id)
        }
      }
      //NG-676 If Paycode == '3rd Party Gift Certificate', Create Vendor Payment with with account "#2910 Vendor Gift Cards Payable"
      else if (paycode == '3rd Party Gift Certificate') {
        log.debug('got in 3rd party section', paycode)

        var vendorPayment = record.transform({
          fromType: 'vendorbill',
          fromId: id,
          toType: 'vendorpayment'
        })
        //custscript_wms_donation_account - Donation Account Script Parameter
        //LIB: this is now a parameter
        /*var thirdPartyGCAccount = runtime.getCurrentScript().getParameter({
    				name : 'custscript_wms_third_party_gc_account'
    			});*/
        log.debug('3rd party account script param', thirdPartyGCAccount)
        vendorPayment.setValue({
          fieldId: 'account',
          value: thirdPartyGCAccount
        })

        var paymentId = vendorPayment.save()
        log.debug('3rd party vendor payment id', paymentId)
        if (paymentId) {
          return parseInt(id)
        }
      }
      //NG-677 If Paycode == '3rd Party Gift Certificate', Create Vendor Payment with with account "#2910 Vendor Gift Cards Payable"
      //TODO after demo
      else if (paycode == 'Store Credit' || paycode == 'Gift Certificate') {
        log.debug('got in Gift Certificate and Store Credit section', paycode)

        var vendorBillFields = search.lookupFields({
          id: id,
          type: 'vendorbill',
          columns: ['total']
        })
        gcAmount = vendorBillFields.total
        log.debug('GC Amount', gcAmount)

        var vendorPayment = record.transform({
          fromType: 'vendorbill',
          fromId: id,
          toType: 'vendorpayment'
        })
        //custscript_wms_store_cred_gc_account - Store Credit/Gift Certificate account
        //LIB: this is now a parameter
        /*var giftCertStoreCreditAccount = runtime.getCurrentScript().getParameter({
    				name : 'custscript_wms_store_cred_gc_account'
    			});*/
        log.debug(
          'giftCertStoreCreditAccount account script param',
          giftCertStoreCreditAccount
        )
        vendorPayment.setValue({
          fieldId: 'account',
          value: giftCertStoreCreditAccount
        })

        var paymentId = vendorPayment.save()
        log.debug('giftCertStoreCredit vendor payment id', paymentId)

        //Now, need to create the Gift Certificate for the Customer tied to the vendor
        //Create an invoice with the customer email/name, using the tranid on the purchase order for the
        //gift certificate number
        if (paymentId) {
          //now generate invoice for the customer
          var invoice = record.create({
            type: 'invoice',
            isDynamic: true
          })

          invoice.setValue({
            fieldId: 'entity',
            value: customer
          })
          invoice.setValue({
            fieldId: 'externalid',
            value: poNum
          })
          //poNum
          //to link the PO for which it came
          invoice.setValue({
            fieldId: 'custbody_cp_ponum',
            value: poNum
          })
          var customerFields = search.lookupFields({
            type: 'customer',
            id: customer,
            columns: ['altname', 'email']
          })
          log.debug('customer fields', customerFields)

          var customerName = customerFields.altname
          var customerEmail = 'giftcardarchive@2ndswing.info'
          log.debug(
            'customer email and ',
            customerName + ' and   ' + customerEmail
          )
          log.debug('poNum', poNum)

          //LIB: this is now a parameter
          /*location = runtime.getCurrentScript().getParameter({
	    				name : 'custscript_wms_customer_invoice_loc'
	    			});*/

          log.debug('location during customer invoice creation', location98)
          invoice.setValue({
            fieldId: 'location',
            value: location98
          })

          //LIB: this is now a parameter
          /*var giftCertItem = runtime.getCurrentScript().getParameter({
	    				name : 'custscript_wms_gift_certificate'
	    			});*/
          log.debug('gift card amount', gcAmount)

          var invoice = invoice.selectNewLine({
            sublistId: 'item'
          })

          if (paycode == 'Gift Certificate') {
            giftCertItem = giftCertsItemId
          }

          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            value: giftCertItem
          })
          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'giftcertfrom',
            value: '2nd Swing'
          })
          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'giftcertmessage',
            value: poNum
          })
          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'giftcertrecipientemail',
            value: 'giftcardarchive@2ndswing.info'
          })
          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'giftcertrecipientname',
            value: customerName
          })

          var randomCode = generatecode()
          log.debug('random GC code', randomCode)

          //Only use Random Code if it's a store credit
          //TODO: what is the field called for the Store Credit identifier - Need to store on the Invoice????

          //Use the actual PO gift certificate code as the GC code if Paycode == "Gift Certificate"
          //TODO: Gift Certificate - what is the field called???? Ask Bob or Paul

          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'giftcertnumber',
            value: randomCode
          })
          invoice.setCurrentSublistValue({
            sublistId: 'item',
            fieldId: 'amount',
            value: gcAmount
          })
          invoice.commitLine({
            sublistId: 'item'
          })

          //set custbody_gc_no for Binny's GC lookup for Store Credit sales order
          invoice.setValue({
            fieldId: 'custbody_gc_no',
            value: randomCode
          })
          var invId = invoice.save()
          log.debug('custome invoice success', invId)

          //NG-2449 find GC and update Magento Code
          updateMagentoCode(randomCode)

          //Now, fund the gift certificate be creating a customer payment against the invoice
          if (invId) {
            var custPayment = record.transform({
              fromType: 'invoice',
              fromId: invId,
              toType: 'customerpayment'
            })
            custPayment.setValue({
              fieldId: 'account',
              value: giftCertStoreCreditAccount
            })

            var custPaymentId = custPayment.save()
            log.debug('custPayment success', custPaymentId)

            return parseInt(id)
          }
        }
      } else {
        return parseInt(id)
      }
    }
  }
  //NG-2449 and NG2370
  function updateMagentoCode (gcCode) {
    //first, find GC Internal ID
    var giftCertKey = 0
    giftCertKey = findGCInternalId(gcCode)
    //if we dont find the GC matching the gcCode
    if (giftCertKey == 0) {
      return
    }
    var code = magentoCode.generateMagentoCode()
    log.debug('code', code)
    //double checking for unique magento code
    while (ensureUnique(code) == false) {
      code = magentoCode.generateMagentoCode()
    }
    log.debug('unique code', code)
    log.debug('trying to update GC', giftCertKey)

    var gcRec = record.load({
      type: record.Type.GIFT_CERTIFICATE,
      id: giftCertKey
    })
    var currMagentoGiftCode = gcRec.getValue({
      fieldId: 'custitemnumber_magento_gcno'
    })
    log.debug('currMagentoGiftCode', currMagentoGiftCode)
    if (isEmpty(currMagentoGiftCode)) {
      gcRec.setValue({
        fieldId: 'custitemnumber_magento_gcno',
        value: code
      })
      var id = gcRec.save()
    }
  }

  function findGCInternalId (gcCode) {
    var giftcertificateSearchObj = search.create({
      type: 'giftcertificate',
      filters: [
        ['gccode', 'is', gcCode],
        'AND',
        ['custitemnumber_magento_gcno', 'isempty', '']
      ],
      columns: [
        search.createColumn({ name: 'internalid', label: 'Internal ID' })
      ]
    })
    var searchResultCount = giftcertificateSearchObj.runPaged().count

    if (searchResultCount == 1) {
      var searchObj = giftcertificateSearchObj
        .run()
        .getRange({ start: 0, end: 1 })
      var gcRecId = searchObj[0].id
      return gcRecId
    } else {
      return 0
    }
  }

  function ensureUnique (code) {
    var giftcertificateSearchObj = search.create({
      type: 'giftcertificate',
      filters: [['custitemnumber_magento_gcno', 'is', code]],
      columns: [
        search.createColumn({
          name: 'sender',
          sort: search.Sort.ASC,
          label: 'From (Name)'
        }),
        search.createColumn({ name: 'name', label: 'To (Name)' }),
        search.createColumn({ name: 'email', label: 'To (Email)' }),
        search.createColumn({ name: 'message', label: 'Gift Message' }),
        search.createColumn({
          name: 'expirationdate',
          label: 'Expiration Date'
        }),
        search.createColumn({ name: 'originalamount', label: 'Amount' }),
        search.createColumn({ name: 'incomeacct', label: 'Income Account' }),
        search.createColumn({
          name: 'liabilityacct',
          label: 'Liability Account'
        }),
        search.createColumn({
          name: 'giftcertcode',
          label: 'Gift Certificate Code'
        }),
        search.createColumn({ name: 'item', label: 'Item' }),
        search.createColumn({
          name: 'amountremaining',
          label: 'Amount Available'
        }),
        search.createColumn({
          name: 'amtavailbilled',
          label: 'Amount Available (Billed)'
        }),
        search.createColumn({ name: 'purchasedate', label: 'Purchase Date' }),
        search.createColumn({ name: 'gcactive', label: 'Active' })
      ]
    })
    var searchResultCount = giftcertificateSearchObj.runPaged().count
    log.debug('giftcertificateSearchObj result count', searchResultCount)
    if (searchResultCount == 0) {
      return true
    } else {
      return false
    }
  }

  function isEmpty (value) {
    return value === '' || value === null || value === undefined
  }

  function generatecode () {
    var text = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
  function updatePoLines (poId, closedLineObj, closed) {
    var loadRec = record.load({
      type: 'purchaseorder',
      id: poId
    })

    for (lines in closedLineObj) {
      var lineToOpen = loadRec.findSublistLineWithValue({
        sublistId: 'item',
        fieldId: 'lineuniquekey',
        value: lines
      })

      if (lineToOpen != -1) {
        log.debug('found line to open', lineToOpen)
        loadRec.setSublistValue({
          sublistId: 'item',
          fieldId: 'isclosed',
          line: lineToOpen,
          value: closed
        })
      }
    }

    var id = loadRec.save()
    log.debug('PO ID after updating lines to ' + closed, id)
  }

  function findClosedLines (poId) {
    var returnObj = {}
    var purchaseorderSearchObj = search.create({
      type: 'purchaseorder',
      filters: [
        ['type', 'anyof', 'PurchOrd'],
        'AND',
        ['mainline', 'is', 'F'],
        'AND',
        ['closed', 'is', 'T'],
        'AND',
        ['quantityshiprecv', 'greaterthan', '0'],
        'AND',
        ['internalidnumber', 'equalto', poId]
      ],
      columns: [
        search.createColumn({ name: 'item', label: 'Item' }),
        search.createColumn({ name: 'lineuniquekey', label: 'Line Unique Key' })
      ]
    })
    var searchResultCount = purchaseorderSearchObj.runPaged().count
    log.debug('Closed PO Line result count', searchResultCount)
    purchaseorderSearchObj.run().each(function (result) {
      // .run().each has a limit of 4,000 results
      var lineUniqueKey = result.getValue('lineuniquekey')
      returnObj[lineUniqueKey] = true

      return true
    })
    return returnObj
  }
  return {
    createVendorInvoice: createVendorInvoice
  }
})

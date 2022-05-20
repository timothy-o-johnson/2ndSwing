/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define([
  'N/file',
  'N/render',
  'N/email',
  'N/runtime',
  'N/ui/serverWidget',
  'N/record',
  'N/search',
  'N/url',
  './Swing_Lib_ShipRush.js',
  'N/task',
  '../TransferOrder/moment.js',
  '../lodash.js',
  'N/log'
], function (
  file,
  render,
  email,
  runtime,
  ui,
  record,
  search,
  url,
  lib,
  task,
  moment,
  lodash,
  log
) {
  var CONSTANT = {
    BUNDLEID: '',

    SUITELET: {
      SCRIPT: 'customscript_swing_sl_shiprush',
      DEPLOYMENT: 'customdeploy_swing_sl_shiprush'
    },

    ORDER_DEFAULTS: {
      MULTIPLE: { length: 4, width: 4, height: 40, volume: 640, weight: 2 },
      DEFAULT: { length: 4, width: 4, height: 40, volume: 640, weight: 2 },
      Belts: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 9,
        group: 'apparel'
      },
      Clip: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 6,
        group: 'apparel'
      },
      'Driver Adapter': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 5,
        group: 'apparel'
      },
      Glove: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 7,
        group: 'apparel'
      },
      'Golf Balls': {
        length: null,
        width: null,
        height: null,
        weight: 2,
        ounces: null,
        group: null
      },
      'Golf Glove': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 7,
        group: 'apparel'
      },
      'Golf Umbrella': {
        length: 4,
        width: 4,
        height: 10,
        weight: 2,
        ounces: null,
        group: 'apparel'
      },
      Grips: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      GRIPS: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Junior Belt': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 9,
        group: 'apparel'
      },
      'Mens Golf Belt': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 9,
        group: 'apparel'
      },
      'Ping Golf Accessories': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: null
      },
      Pouch: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Push and Pull Cart': {
        length: 14,
        width: 14,
        height: 48,
        weight: 12,
        ounces: null,
        group: null
      },
      Tip: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 5,
        group: 'apparel'
      },
      Tool: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Weight Kit': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Winter Gloves': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Belt': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 9,
        group: 'apparel'
      },
      Wrench: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      Bag: {
        length: 14,
        width: 14,
        height: 48,
        weight: 9,
        ounces: null,
        group: 'Bag'
      },
      'Carry Bag': {
        length: null,
        width: null,
        height: null,
        weight: null,
        ounces: null,
        group: 'Bag'
      },
      'Cart Bag': {
        length: 14,
        width: 14,
        height: 48,
        weight: 14,
        ounces: null,
        group: 'Bag'
      },
      'Den Caddy': {
        length: null,
        width: null,
        height: null,
        weight: null,
        ounces: null,
        group: 'Bag'
      },
      'Shag Bag': {
        length: null,
        width: null,
        height: null,
        weight: null,
        ounces: null,
        group: 'Bag'
      },
      'Staff Bag': {
        length: 14,
        width: 14,
        height: 48,
        weight: 14,
        ounces: null,
        group: 'Bag'
      },
      'Stand Bag': {
        length: 14,
        width: 14,
        height: 48,
        weight: 9,
        ounces: null,
        group: 'Bag'
      },
      'Sunday Bag': {
        length: 14,
        width: 14,
        height: 48,
        weight: 9,
        ounces: null,
        group: 'Bag'
      },
      'Travel Bag': {
        length: 14,
        width: 14,
        height: 48,
        weight: 14,
        ounces: null,
        group: 'Bag'
      },
      'Junior Bottom': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 8,
        group: 'apparel'
      },
      'Mens Bottoms': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 8,
        group: 'apparel'
      },
      'Mens Golf Pants': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Mens Golf Shorts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Bottom': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Pants': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Shorts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Skorts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Box Set': {
        length: 14,
        width: 14,
        height: 48,
        weight: 14,
        ounces: null,
        group: null
      },
      'Box Sets': {
        length: 14,
        width: 14,
        height: 48,
        weight: 14,
        ounces: null,
        group: null
      },
      Chipper: {
        length: 4,
        width: 4,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Complete Golf Club Set': {
        length: 14,
        width: 14,
        height: 48,
        weight: 20,
        ounces: null,
        group: null
      },
      Driver: {
        length: 5,
        width: 5,
        height: 50,
        weight: 2,
        ounces: null,
        group: null
      },
      'Driving Iron': {
        length: 4,
        width: 4,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Fairway Wood': {
        length: 4,
        width: 4,
        height: 45,
        weight: 2,
        ounces: null,
        group: null
      },
      'Head Only': {
        length: 4,
        width: 4,
        height: 45,
        weight: 2,
        ounces: null,
        group: null
      },
      Hybrid: {
        length: 4,
        width: 3.75,
        height: 45,
        weight: 2,
        ounces: null,
        group: null
      },
      'Iron Set': {
        length: 5,
        width: 5,
        height: 45,
        weight: 2,
        ounces: null,
        group: null
      },
      Putter: {
        length: 4,
        width: 2.5,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Single Iron': {
        length: 4,
        width: 3.75,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      Wedge: {
        length: 4,
        width: 2.5,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Wedge Set': {
        length: 4,
        width: 2.5,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Golf GPS & Rangefinders': {
        length: 6,
        width: 6,
        height: 10,
        weight: 2,
        ounces: null,
        group: null
      },
      'GPS Watch': {
        length: null,
        width: null,
        height: null,
        weight: null,
        ounces: 10,
        group: null
      },
      Rangefinder: {
        length: 6,
        width: 6,
        height: 10,
        weight: 2,
        ounces: null,
        group: null
      },
      'Golf Hat': {
        length: 6,
        width: 6,
        height: 10,
        weight: 1,
        ounces: null,
        group: 'apparel'
      },
      'Golf Visor': {
        length: 6,
        width: 6,
        height: 10,
        weight: 1,
        ounces: null,
        group: 'apparel'
      },
      'Driver Headcover': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 7,
        group: 'apparel'
      },
      'Fairway Wood Headcover': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 7,
        group: 'apparel'
      },
      Headcover: {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 7,
        group: 'apparel'
      },
      'Hybrid Headcover': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 7,
        group: 'apparel'
      },
      'Iron Headcovers': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 7,
        group: 'apparel'
      },
      'Putter Headcover': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: 0,
        ounces: 7,
        group: 'apparel'
      },
      'Driver Shaft': {
        length: 5,
        width: 5,
        height: 50,
        weight: 2,
        ounces: null,
        group: null
      },
      'Fairway Wood Shaft': {
        length: 4,
        width: 4,
        height: 45,
        weight: 2,
        ounces: null,
        group: null
      },
      'Golf Shaft': {
        length: 4,
        width: 4,
        height: 45,
        weight: 2,
        ounces: null,
        group: null
      },
      'Hybrid Shaft': {
        length: 4,
        width: 3.75,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Iron Shaft': {
        length: 4,
        width: 3.75,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Wedge Shaft': {
        length: 4,
        width: 3.75,
        height: 40,
        weight: 2,
        ounces: null,
        group: null
      },
      'Junior Golf Shoe': {
        length: 6,
        width: 6,
        height: 10,
        weight: 2,
        ounces: null,
        group: 'shoe'
      },
      'Mens Golf Sandal': {
        length: 6,
        width: 6,
        height: 10,
        weight: 2,
        ounces: null,
        group: 'shoe'
      },
      'Mens Golf Shoe': {
        length: 14,
        width: 5,
        height: 8,
        weight: 2,
        ounces: null,
        group: 'shoe'
      },
      'Womens Golf Shoe': {
        length: 14,
        width: 5,
        height: 8,
        weight: 2,
        ounces: null,
        group: 'shoe'
      },
      'Junior Top': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 7,
        group: 'apparel'
      },
      'Mens Golf Outerwear': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 12,
        group: 'apparel'
      },
      'Mens Golf Shirts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Mens Golf Sweater': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Mens Long Sleeve Golf Shirts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Mens Short Sleeve Golf Shirts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Outerwear': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Shirts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Golf Sweater': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Long Sleeve Golf Shirts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Womens Sleeveless Golf Shirts': {
        length: 15.5,
        width: 12,
        height: 1,
        weight: null,
        ounces: 10,
        group: 'apparel'
      },
      'Launch Monitor': {
        length: 6,
        width: 6,
        height: 10,
        weight: 2,
        ounces: null,
        group: null
      }
    },

    BASE_URL: '',
    TOKEN: ''
  }

  function onRequest (context) {
    var request = context.request
    var bundleArr = runtime.getCurrentScript().bundleIds
    var reqParams = request.parameters
    if (bundleArr) CONSTANT.BUNDLEID = bundleArr[0]

    var tranId = reqParams.tranid
    var scriptObj = runtime.getCurrentScript()
    var isTest = runtime.envType == 'SANDBOX'

    if (isTest) {
      CONSTANT.BASE_URL = runtime
        .getCurrentScript()
        .getParameter('custscript_swing_shiprush_sb_url')
      CONSTANT.TOKEN = runtime
        .getCurrentScript()
        .getParameter('custscript_swing_shiprush_sb_token')
    } else {
      CONSTANT.BASE_URL = runtime
        .getCurrentScript()
        .getParameter('custscript_swing_shiprush_prod_url')
      CONSTANT.TOKEN = runtime
        .getCurrentScript()
        .getParameter('custscript_swing_shiprush_prod_token')
    }

    var location = getFromAddress()
    var edenPrairieFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_edenprairie'
    )
    var minneapolisFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_minneapolis'
    )
    var minnetonkaFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_minnetonka'
    )
    var scottsdaleFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_scottsdale'
    )
    var wilmingtonFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_wilmington'
    )
    var columbiaFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_columbia'
    )
    var scottsdale06Fedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_06scottsdale'
    )
    var emailLabelFedex = scriptObj.getParameter(
      'custscript_shiprush_fedex_emaillabel'
    )
    var uspsProd = scriptObj.getParameter('custscript_shiprush_usps_prod')
    var uspsTest = scriptObj.getParameter('custscript_shiprush_usps_sandbox')

    // NG-1471 map ShipRush accounts by environment and store location
    var shipAccountMap = {}
    shipAccountMap.fedexAccount = {
      '98 Eden Prairie': edenPrairieFedex,
      '01 Minneapolis': minneapolisFedex,
      '02 Minnetonka': minnetonkaFedex,
      '03 Scottsdale': scottsdaleFedex,
      '04 Wilmington': wilmingtonFedex,
      '05 Columbia': columbiaFedex,
      'Email Label Account': emailLabelFedex,
      '06 Scottsdale (S)': scottsdale06Fedex
    }
    var uspsAccount = isTest ? uspsTest : uspsProd
    if (request.method == 'GET') {
      var suiteleturl = url.resolveScript({
        scriptId: CONSTANT.SUITELET.SCRIPT,
        deploymentId: CONSTANT.SUITELET.DEPLOYMENT
      })

      var scriptDeploymentId = runtime.getCurrentScript().deploymentId
      log.debug('script deployment id: ', scriptDeploymentId)
      var emailShipLabel =
        scriptDeploymentId == 'customdeploy_swing_sl_shipemaillabel'
          ? true
          : false
      var html = getHtmlContent(emailShipLabel)
      var order = getFulfillmentData(reqParams.fulfillments)
      log.debug('order:', order)
      var orderIsEmpty = order.fulfillments.length == 0

      if (!order.to.shipaddress1 && order.entity) {
        order.to = getCustomerAddress(order.entity, order.to)
      }
      var stores = getStoreLocations()
      var manufacturers = getManufacturers()
      order.stores = stores
      order.manufacturers = manufacturers
      if (!location.country) {
        location.country = 'United States'
      }
      if (!order.to.shipcountry) {
        order.to.shipcountry = 'United States'
      }
      if (!location.phone) {
        location.phone = '612-216-4152'
      }
      if (!location.companyName) {
        location.companyName = '2nd Swing Golf'
      }

      if (emailShipLabel) {
        var emailShipLabelUpdateObj = updateVariablesForEmailShipLabel(
          reqParams,
          html,
          order
        )
        html = emailShipLabelUpdateObj.html
        order = emailShipLabelUpdateObj.order
      }

      var templateVarObj = {
        suiteleturl: suiteleturl,
        emailShipLabel: emailShipLabel,
        location: location,
        orderIsEmpty: orderIsEmpty,
        order: order
      }
      html = updateTemplateVariables(templateVarObj, html)

      var form = ui.createForm({ title: 'ShipRush Portal', hideNavBar: false })

      var field = form.addField({
        id: 'custpage_body',
        type: ui.FieldType.INLINEHTML,
        label: 'Body'
      })

      field.defaultValue = html
      context.response.writePage(form)
    }
    if (request.method == 'POST') {
      var data = request.body
      var data = JSON.parse(request.body)
      try {
        log.debug('POST DATA', data)
        var skeleton = {}
        switch (data.action) {
          case 'rateshopping':
            skeleton = lib.getRateShoppingXML()
            break
          case 'ship':
            skeleton = lib.getShipXML()
            break
          case 'shipconfirmation':
            var message = ''
            if (data.email && !data.emailLabel) {
              message += sendEmail(data)
            } else if (data.emailLabel) {
              message += sendLabelWithEmail(data)
              log.debug('sending an email with a label', tranId)
              updatePoWithTrackingNumber(data)
            } else {
              log.debug('no email')
            }
            if (
              data.fulfillments &&
              5 > data.fulfillments.length &&
              data.fulfillments.length > 0
            ) {
              log.debug('updating fulfillments', data.fulfillments.length)
              message += updateFulfillments(data)
              // if more than or =5 fulfillments, trigger Map/Reduce Script
            } else if (data.fulfillments && data.fulfillments.length >= 5) {
              var objParam = JSON.stringify(data)

              log.debug('here is the objParam: ', objParam)
              var deployment = findFreeDeployment()
              var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: 'customscript_swing_mr_shiprush',
                deploymentId: deployment,
                params: { custscript_fulfillment_data: objParam }
              })
              var taskId = mrTask.submit()
              if (taskId) {
                log.debug('Successfully Submitting : ', taskId)
              } else {
                log.debug('Map/Reduce execution Failed')
              }
            } else if (!data.fulfillments || data.fulfillments.length === 0) {
              log.debug(
                'data.fulfillments is empty: ',
                data.fulfillments.length
              )
              message += insertShippingRecord(data)
            }

            return jsonResponse(context, true, 'Success!', message)
            break
          default:
            throw 'Action not defined'
        }
        // NG-1471
        if (data.carrier_type == 'usps' || data.carrier == '17') {
          data.upsAcctNum = uspsAccount
        } else if (data.carrier_type == 'fedex' || data.carrier == '1') {
          data.upsAcctNum = data.emailLabel
            ? shipAccountMap.fedexAccount['Email Label Account']
            : shipAccountMap.fedexAccount[location.name]
        } else {
          log.error('error, no carrier_type or carrier detected')
        }

        var requestObj = constructXML(skeleton, data)
        log.debug('requestObj XML', requestObj)

        var response = lib.post(
          CONSTANT.BASE_URL + skeleton.URL,
          requestObj,
          CONSTANT.TOKEN
        )
        log.debug('response body', response.body)
        return jsonResponse(context, true, 'Success!', response.body)
      } catch (e) {
        log.error('Error', e.toString())
        if (typeof e == 'string') {
          return jsonResponse(context, false, e)
        }
        return jsonResponse(context, false, e.message)
      }
    }
  }

  function getCustomerAddress (customer, address, emailShipLabel) {
    search
      .create({
        type: 'customer',
        filters: [
          ['internalid', 'anyof', customer],
          'AND',
          ['address.isdefaultshipping', 'is', 'T']
        ],
        columns: [
          search.createColumn({ name: 'address1', join: 'Address' }),
          search.createColumn({ name: 'address2', join: 'Address' }),
          search.createColumn({ name: 'addressphone', join: 'Address' }),
          search.createColumn({ name: 'addressee', join: 'Address' }),
          search.createColumn({ name: 'attention', join: 'Address' }),
          search.createColumn({ name: 'city', join: 'Address' }),
          search.createColumn({ name: 'country', join: 'Address' }),
          search.createColumn({ name: 'countrycode', join: 'Address' }),
          search.createColumn({ name: 'state', join: 'Address' }),
          search.createColumn({ name: 'zipcode', join: 'Address' }),
          search.createColumn({ name: 'statedisplayname', join: 'Address' }),
          search.createColumn({ name: 'email' }),
          search.createColumn({ name: 'altname' }),
          search.createColumn({ name: 'entityid' })
        ]
      })
      .run()
      .each(function (result) {
        address.shipaddress1 = result.getValue({
          name: 'address1',
          join: 'Address'
        })
        address.shipaddress2 = result.getValue({
          name: 'address2',
          join: 'Address'
        })

        address.shipaddressee = emailShipLabel
          ? result.getValue({ name: 'entityid' }) +
            ' ' +
            lodash.startCase(result.getValue({ name: 'altname' }))
          : result.getValue({ name: 'addressee', join: 'Address' })

        address.shippingattention = result.getValue({
          name: 'attention',
          join: 'Address'
        })
        address.shipcity = result.getValue({ name: 'city', join: 'Address' })
        address.shipcountry = result.getValue({
          name: 'country',
          join: 'Address'
        })
        address.shipstate = result.getValue({ name: 'state', join: 'Address' })
        address.shipzip = result.getValue({ name: 'zipcode', join: 'Address' })
        address.shipphone = result.getValue({
          name: 'addressphone',
          join: 'Address'
        })

        address.email = result.getValue({ name: 'email' })
      })
    return address
  }

  function updateFulfillments (data) {
    log.debug(
      'shippingnumber/ fulfillments:',
      data.shippingnumber + ' / ' + data.fulfillments
    )
    var reference =
      data.ref_number == '' || !data.ref_number ? order : data.ref_number

    for (var i in data.fulfillments) {
      var rec = record.load({
        type: 'itemfulfillment',
        id: data.fulfillments[i]
      })
      var order = rec.getValue('createdfrom')
      rec.setValue({ fieldId: 'shipstatus', value: 'C' })
      rec.setSublistValue({
        sublistId: 'package',
        line: 0,
        fieldId: 'packageweight',
        value: data.finalWeight
      })

      rec.setSublistValue({
        sublistId: 'package',
        line: 0,
        fieldId: 'packagetrackingnumber',
        value: data.shippingnumber
      })
      //NG-1567
      if (data.carrier_type == 'usps' || data.carrier == '17') {
        rec.setValue({
          fieldId: 'custbody_swing_selected_carrier',
          value: 'USPS'
        })
      } else if (data.carrier_type == 'fedex' || data.carrier == '1') {
        rec.setValue({
          fieldId: 'custbody_swing_selected_carrier',
          value: 'FEDEX'
        })
      } else {
        rec.setValue({
          fieldId: 'custbody_swing_selected_carrier',
          value: 'none'
        })
      }
      rec.setValue({
        fieldId: 'custbody_swing_selected_method',
        value: data.shippingmethod
      })
      // data.rate is the carrier estimated rate for shipping
      rec.setValue({
        fieldId: 'custbody_swing_est_ship_rate',
        value: data.rate
      })
      // data.cost is what the buyer paid for shipping
      rec.setValue({ fieldId: 'shippingcost', value: data.cost })
      rec.setValue({
        fieldId: 'custbody_sps_trackingnumber',
        value: data.shippingnumber
      })
      rec.setValue({
        fieldId: 'custbody_swing_packageweight',
        value: data.finalWeight
      })
      rec.setValue({
        fieldId: 'custbody_swing_packagelength',
        value: data.length
      })
      rec.setValue({
        fieldId: 'custbody_swing_packagewidth',
        value: data.width
      })
      rec.setValue({
        fieldId: 'custbody_swing_packageheight',
        value: data.height
      })
      rec.setValue({
        fieldId: 'custbody_swing_fromstore',
        value: data.from_attention_name
      })
      rec.setValue({ fieldId: 'custbody_swing_ordernumber', value: reference })
      rec.setValue({
        fieldId: 'custbody_swing_customername',
        value: data.to_attention_name
      })

      var items = []
      var count = rec.getLineCount({ sublistId: 'item' })
      for (var i = 0; i < count; i++) {
        items.push(
          rec.getSublistValue({ sublistId: 'item', line: i, fieldId: 'item' })
        )
      }

      rec.save({ ignoreMandatoryFields: true })

      // log.audit("shipped items for order #" + order, items);
      var so = record.load({ type: 'salesorder', id: order })

      for (var i in items) {
        var line = so.findSublistLineWithValue({
          sublistId: 'item',
          fieldId: 'item',
          value: items[i]
        })
        log.debug('Item #' + items[i], line)
        if (line < 0) continue

        so.setSublistValue({
          sublistId: 'item',
          fieldId: 'custcol_swing_tracking_number',
          line: line,
          value: data.shippingnumber
        })
      }

      so.setValue({ fieldId: 'custbody_wipfli_wms_notes', value: data.note })

      so.save({ ignoreMandatoryFields: true })
    }
    return '  Fulfillments updated successfully'
  }

  function updatePoWithTrackingNumber (data, unitTesting) {
    try {
      log.debug('data: ', data)
      var trackingNum = data.shippingnumber
      if (trackingNum && data.poId) {
        var rec
        if (unitTesting) {
          rec = unitTesting.record
        } else {
          rec = record.load({ type: 'purchaseorder', id: data.poId })
        }

        var currentTrackingNum = rec.getValue({ fieldId: 'trackingnumbers' })
        var concatVal = currentTrackingNum + ', ' + trackingNum
        rec.setValue({ fieldId: 'trackingnumbers', value: concatVal })
        rec.save()
        return concatVal
      } else {
        return 'missingTrackingNumOrTranId'
      }
    } catch (e) {
      log.error('error updating purchase order with tracking number', e)
      return 'error'
    }
  }

  // for blank order shipping custom records -->
  function insertShippingRecord (data) {
    var reference =
      data.ref_number == '' || !data.ref_number ? 'None' : data.ref_number
    var saveRec = record.create({
      type: 'customrecord_blank_shipments'
    })
    saveRec.setValue({
      fieldId: 'name',
      value: data.shippingnumber
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_reference',
      value: reference
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_to_name',
      value: data.to_attention_name
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_to_address',
      value: data.to_address1
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_tracking_number',
      value: data.shippingnumber
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_from_name',
      value: data.from_attention_name
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_to_company',
      value: data.to_company_name
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_to_address2',
      value: data.to_address2
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_to_zipcode',
      value: data.to_zipcode
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_method',
      value: data.shippingmethod
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_length',
      value: data.length
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_width',
      value: data.width
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_height',
      value: data.height
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_weight',
      value: data.weight
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_ounce',
      value: data.ounce
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_ship_email',
      value: data.email
    })
    saveRec.setValue({
      fieldId: 'custrecord_blank_was_emailed',
      value: data.emailLabel
    })
    try {
      saveRec.save()
    } catch (e) {
      log.debug('error while saving record: ', JSON.stringify(e))
    }
    return 'Created Blank Shipment Record'
  }

  function sendEmail (data) {
    var template = render.create()
    template.setTemplateByScriptId('CUSTTMPL_SWING_SHIPRUSH_TEMPLATE')
    template.addCustomDataSource({
      alias: 'obj',
      format: render.DataSource.JSON,
      data: JSON.stringify(data)
    })

    var html = template.renderAsString()

    email.send({
      author: runtime
        .getCurrentScript()
        .getParameter('custscript_swing_email_author'),
      recipients: data.email,
      subject: '2nd Swing Shipping Confirmation',
      body: html
      //relatedRecords : { transactionId : rec.id }
    })

    return 'Email Sent Successfully.'
  }

  function sendLabelWithEmail (data) {
    try {
      var renderer = render.create()
      renderer.setTemplateByScriptId('CUSTTMPL_SWING_SHIPLABEL_TEMPLATE')
      var trimmedSoNumber = data.ref_number
      trimmedSoNumber.replace('W96-', '')
      trimmedSoNumber.replace('mag-', '')
      data.ref_number = trimmedSoNumber
      if (!data.poId) {
        data.ref_number += ' Return'
      }
      // Update customer name for email (remove id)
      var customerNameSplit = data.from_attention_name.split(' ')

      if (customerNameSplit.length == 3) {
        data.from_attention_name =
          customerNameSplit[1] + ' ' + customerNameSplit[2]
      }

      log.debug('from attention name: ', data.from_attention_name)
      var base64content = data.document.ContentMimeEncoded

      renderer.addCustomDataSource({
        alias: 'obj',
        format: render.DataSource.JSON,
        data: JSON.stringify(data)
      })

      var html = renderer.renderAsString()

      var fileName = data.from_attention_name.replace(/ /g, '_')

      var fileObj = file.create({
        name: fileName + '.png',
        fileType: file.Type.PNGIMAGE,
        contents: base64content,
        description: 'Temp Shipping Label File',
        encoding: file.Encoding.BASE_64
      })

      email.send({
        author: runtime
          .getCurrentScript()
          .getParameter('custscript_swing_email_author'),
        recipients: data.email,
        subject: '2nd Swing Shipping Confirmation',
        body: html,
        attachments: [fileObj]
        //relatedRecords : { transactionId : rec.id }
      })

      return 'Email sent with a label attached'
    } catch (e) {
      log.debug('error: ', e)
      return 'errror:  ' + e
    }
  }

  function saveContentsToFile (contents, folderId, fileName) {
    var date = new Date()
    var folder = folderId

    var fileObj = file.create({
      name: date + fileName + '.txt',
      fileType: file.Type.PLAINTEXT,
      contents: JSON.stringify(contents)
    })

    fileObj.folder = folder

    var id = fileObj.save()

    return id
  }

  function getFulfillmentData (fulfillments) {
    var data = {
      amount: 0,
      items: [],
      categories: [],
      dimensions: {},
      to: {},
      fulfillments: []
    }

    if (!fulfillments) return data

    fulfillments = fulfillments.split(',')
    data.fulfillments = fulfillments
    var firstFulfillment = []
    for (var i = 0; i < 20; i++) {
      firstFulfillment.push(fulfillments[i])
    }

    try {
      search
        .create({
          type: 'itemfulfillment',
          filters: [
            ['mainline', 'is', 'F'],
            // Shipping is "F" caused issues with Custom Orders
            // when not included, we have order $amounts being added multiple times for shipping lines
            // So shipping = F for only non-custom items
            'And',
            [
              [
                ['shipping', 'is', 'F'],
                'AND',
                [['class', 'noneof', '1'], 'AND', ['class', 'noneof', '@NONE@']]
              ],
              'OR',
              [['class', 'anyof', '@NONE@'], 'OR', ['class', 'anyof', '1']]
            ],
            'AND',
            ['taxline', 'is', 'F'], // ignore Avalara transactions
            'AND',
            ['internalid', 'anyof', firstFulfillment],
            //"AND", ["item.type","anyof","InvtPart"],
            'AND',
            ['createdfrom.mainline', 'is', 'T'],
            // we don't want total for shipping and handling to be added
            'AND',
            ['account', 'noneof', '108']
          ],
          columns: [
            search.createColumn({ name: 'item' }),
            search.createColumn({ name: 'entity' }),
            search.createColumn({ name: 'quantity' }),
            search.createColumn({ name: 'createdfrom' }),
            search.createColumn({ name: 'tranid', join: 'createdFrom' }),
            search.createColumn({ name: 'shipmethod', join: 'createdFrom' }),
            search.createColumn({ name: 'shippingcost', join: 'createdFrom' }),
            search.createColumn({ name: 'memomain', join: 'createdFrom' }),
            search.createColumn({ name: 'shipaddress1', join: 'createdFrom' }),
            search.createColumn({ name: 'shipaddress2', join: 'createdFrom' }),
            search.createColumn({ name: 'shipaddressee', join: 'createdFrom' }),
            search.createColumn({
              name: 'shippingattention',
              join: 'createdFrom'
            }),
            search.createColumn({ name: 'shipcity', join: 'createdFrom' }),
            search.createColumn({ name: 'shipcountry', join: 'createdFrom' }),
            search.createColumn({
              name: 'shipcountrycode',
              join: 'createdFrom'
            }),
            search.createColumn({
              name: 'custbody_wipfli_customer_phone',
              join: 'createdFrom'
            }),
            search.createColumn({ name: 'shipstate', join: 'createdFrom' }),
            search.createColumn({ name: 'shipzip', join: 'createdFrom' }),
            search.createColumn({
              name: 'custbody_wipfli_customer_email',
              join: 'createdFrom'
            }),
            search.createColumn({
              name: 'custitem_wms_parentitemcategory',
              join: 'item'
            }),
            search.createColumn({
              name: 'custbody_wipfli_wms_notes',
              join: 'createdFrom'
            })
          ]
        })
        .run()
        .each(function (result) {
          if (result.getValue('quantity') < 0) return true //exclude -ve vibe lol
          if (!data.tranid) {
            data.tranid = result.getValue({
              name: 'tranid',
              join: 'createdFrom'
            })
            data.entity = result.getValue({ name: 'entity' })
            data.shipmethod = result.getText({
              name: 'shipmethod',
              join: 'createdFrom'
            })
            data.shipmethodid = result.getValue({
              name: 'shipmethod',
              join: 'createdFrom'
            })
            data.cost = result.getValue({
              name: 'shippingcost',
              join: 'createdFrom'
            })
            data.memo = result.getValue({
              name: 'memomain',
              join: 'createdFrom'
            })
            data.to.shipaddress1 = result.getValue({
              name: 'shipaddress1',
              join: 'createdFrom'
            })
            data.to.shipaddress2 = result.getValue({
              name: 'shipaddress2',
              join: 'createdFrom'
            })
            data.to.shipaddressee = result.getValue({
              name: 'shipaddressee',
              join: 'createdFrom'
            })
            data.to.shippingattention = result.getValue({
              name: 'shippingattention',
              join: 'createdFrom'
            })
            data.to.shipcity = result.getValue({
              name: 'shipcity',
              join: 'createdFrom'
            })
            data.to.shipcountry = result.getValue({
              name: 'shipcountry',
              join: 'createdFrom'
            })
            data.to.shipstate = result.getValue({
              name: 'shipstate',
              join: 'createdFrom'
            })
            data.to.shipzip = result.getValue({
              name: 'shipzip',
              join: 'createdFrom'
            })
            data.to.shipphone = result.getValue({
              name: 'custbody_wipfli_customer_phone',
              join: 'createdFrom'
            })
            data.to.email = result.getValue({
              name: 'custbody_wipfli_customer_email',
              join: 'createdFrom'
            })
          }

          if (!data.memo)
            data.memo = result.getValue({
              name: 'custbody_wipfli_wms_notes',
              join: 'createdFrom'
            })

          data.amount += getOrderTotal(
            result.getValue({ name: 'createdfrom' }),
            result.getValue({ name: 'item' })
          )
          //if(result.getValue("quantity") > 0) - check for this to avoid line dups

          data.items.push(result.getText({ name: 'item' }))
          var category = result.getText({
            name: 'custitem_wms_parentitemcategory',
            join: 'item'
          })
          if (category) {
            data.categories.push(category)
          }
          return true
        })

      data.primary = {}
      if (data.shipmethod) {
        data.primary = getPrimaryShipping(data.shipmethodid)
      }
      data.dimensions = getCategory(data.categories)
    } catch (e) {
      log.error('Error - getFulfillmentData', e.toString())
    }
    return data
  }

  function getHtmlContent (emailShipLabel) {
    //Get HTML Content (html, style, script)
    if (emailShipLabel) {
      var html = getFileContent(
        'SuiteScripts/Shipping/template/emailShipLabelTemplate.html'
      )
    } else {
      var html = getFileContent(
        'SuiteScripts/Shipping/template/shiprush_template.html'
      )
    }

    html +=
      '<style>' +
      getFileContent('SuiteScripts/Shipping/style/style.css') +
      '</style>'
    html +=
      '<script>' +
      getFileContent('SuiteScripts/Shipping/js/countries.js') +
      '</script>'
    html +=
      '<script>' +
      getFileContent('SuiteScripts/Shipping/js/jquery.validate.js') +
      '</script>'
    html +=
      '<script>' +
      getFileContent('SuiteScripts/Shipping/js/additional.methods.js') +
      '</script>'
    html +=
      '<script>' +
      getFileContent('SuiteScripts/Shipping/js/parser.js') +
      '</script>'
    html +=
      '<script>' +
      getFileContent('SuiteScripts/Shipping/js/swal.js') +
      '</script>'
    html +=
      '<script>' +
      getFileContent('SuiteScripts/Shipping/js/script.js') +
      '</script>'
    return html
  }

  function getPrimaryShipping (id) {
    var obj = {}

    search
      .create({
        type: 'customrecord_swing_shiprush_shipping_met',
        filters: [['custrecord_swing_shipping_method', 'anyof', id]],
        columns: [
          'name',
          'custrecord_swing_carrier_id',
          'custrecord_swing_service_type',
          'custrecord_swing_shipping_method'
        ]
      })
      .run()
      .each(function (result) {
        obj.carrier_id = result.getValue('custrecord_swing_carrier_id')
        obj.service_type = result.getValue('custrecord_swing_service_type')
        obj.name = result.getValue('name')
        return true
      })

    return obj
  }

  function getOrderTotal (orderid, item) {
    var amount = 0
    if (!orderid || !item) return amount

    search
      .create({
        type: 'salesorder',
        filters: [
          ['type', 'anyof', 'SalesOrd'],
          'AND',
          ['internalid', 'anyof', orderid],
          'AND',
          ['mainline', 'is', 'F'],
          'AND',
          ['item', 'anyof', item],
          'AND',
          ['account', 'noneof', '108']
        ],
        columns: ['amount']
      })
      .run()
      .each(function (result) {
        amount = result.getValue('amount')
        return true
      })
    return parseFloat(amount)
  }

  function getBlankShipAddresses () {
    var emailAddressArray = []
    var addressSearchObj = search.create({
      type: 'customrecord_blank_ship_email_address',
      filters: [],
      columns: [
        search.createColumn({
          name: 'custrecord_sort_order',
          sort: search.Sort.ASC,
          label: 'Sort Order'
        }),
        search.createColumn({ name: 'name', label: 'name' }),
        search.createColumn({
          name: 'custrecord_email_address',
          label: 'Email Address'
        }),
        search.createColumn({ name: 'custrecord_prefix', label: 'Prefix' })
      ]
    })
    var searchResultCount = addressSearchObj.runPaged().count
    log.debug(
      'customrecord_blank_ship_email_addressSearchObj result count',
      searchResultCount
    )
    addressSearchObj.run().each(function (result) {
      var emailAddrObj = {}
      emailAddrObj.name = result.getValue('name')
      emailAddrObj.email = result.getValue('custrecord_email_address')
      emailAddrObj.order = result.getValue('custrecord_sort_order')
      emailAddrObj.prefix = result.getValue('custrecord_prefix')
      emailAddressArray.push(emailAddrObj)
      return true
    })
    return emailAddressArray
  }

  function getCategory (category) {
    var defaults = []
    if (category != null && category.length > 1) {
      category.forEach(function (element) {
        if (element && CONSTANT.ORDER_DEFAULTS[element]) {
          defaults.push(CONSTANT.ORDER_DEFAULTS[element].group)
        }
      })
      var unique = defaults.filter(function (x, i, a) {
        return a.indexOf(x) == i
      })
      if (unique[0] === 'apparel' && unique.length === 1) {
        return {
          length: 15,
          width: 12,
          height: 1,
          weight: null,
          ounces: 6,
          group: 'apparel'
        }
      } else {
        return CONSTANT.ORDER_DEFAULTS.MULTIPLE
      }
    } else
      return CONSTANT.ORDER_DEFAULTS[category]
        ? CONSTANT.ORDER_DEFAULTS[category]
        : CONSTANT.ORDER_DEFAULTS.DEFAULT
  }

  function getFromAddress () {
    var employee = search.lookupFields({
      type: search.Type.EMPLOYEE,
      id: runtime.getCurrentUser().id,
      columns: ['location']
    })
    if (!employee.location || employee.location.length < 1) return {}

    var address = {}
    search
      .create({
        type: search.Type.LOCATION,
        filters: ['internalid', 'anyof', employee.location[0].value],
        columns: [
          'name',
          'address1',
          'address2',
          'city',
          'state',
          'zip',
          'phone',
          search.createColumn({ name: 'country', join: 'address' })
        ]
      })
      .run()
      .each(function (result) {
        address.name = result.getValue('name')
        address.address1 = result.getValue('address1')
        address.address2 = result.getValue('address2')
        address.city = result.getValue('city')
        address.state = result.getValue('state')
        address.zip = result.getValue('zip')
        address.phone = result.getValue('phone')
        address.country = result.getValue({ name: 'country', join: 'address' })
        address.id = employee.location[0].value
      })
    return address
  }

  function getStoreLocations () {
    var addresses = []
    search
      .create({
        type: search.Type.LOCATION,
        filters: ['phone', 'isnotempty', ''],
        columns: [
          'name',
          'address1',
          'address2',
          'city',
          'state',
          'zip',
          'phone',
          search.createColumn({ name: 'country', join: 'address' })
        ]
      })
      .run()
      .each(function (result) {
        var address = {}
        address.id = result.getValue('externalid')
        address.name = result.getValue('name') + ' 2nd Swing'
        address.address1 = result.getValue('address1')
        address.address2 = result.getValue('address2')
        address.city = result.getValue('city')
        address.state = result.getValue('state')
        address.zip = result.getValue('zip')
        address.phone = result.getValue('phone')
        address.country = result.getValue({ name: 'country', join: 'address' })
        addresses.push(address)
        return true
      })

    return addresses
  }

  function getManufacturers () {
    var addresses = []
    search
      .create({
        type: search.Type.VENDOR,
        filters: ['address.address', 'startswith', 'RMA'],
        columns: [
          'entityid',
          'address1',
          'address2',
          'city',
          'state',
          'zipcode',
          'addressphone',
          'country',
          'attention'
        ]
      })
      .run()
      .each(function (result) {
        var address = {}
        address.id = result.getValue('externalid')
        address.name = result.getValue('entityid')
        address.address1 = result.getValue('address1')
        address.address2 = result.getValue('address2')
        address.city = result.getValue('city')
        address.state = result.getValue('state')
        address.zip = result.getValue('zipcode')
        address.phone = result.getValue('addressphone')
        address.country = result.getValue('country')
        address.attention = result.getValue('attention')
        addresses.push(address)
        return true
      })

    return addresses
  }

  function updateVariablesForEmailShipLabel (reqParams, html, order) {
    log.debug('request parameters ', reqParams)
    var custId = reqParams.custId
    var isPurchaseOrder = reqParams.PO == 'T'
    var addressString = reqParams.shipaddress
    var emailString = reqParams.email
    var gsvSite = reqParams.gsvSite
    log.debug('cust Id : ', custId)
    log.debug('is purchase order?', isPurchaseOrder)
    var addrObj = {}
    var custInfoObj = {}
    if (custId && !isPurchaseOrder) {
      custInfoObj = getCustomerAddress(custId, addrObj, true)
    }
    if (custId && isPurchaseOrder) {
      custInfoObj = JSON.parse(decodeURIComponent(addressString.toString()))
      custInfoObj.email = emailString
      custInfoObj.shipaddressee = custInfoObj.addressee
      custInfoObj.shipaddress1 = custInfoObj.addr1
      custInfoObj.address2 = custInfoObj.addr2
      log.debug('custInfoObj:', custInfoObj)
      html = html.replace(/"{{SET_TO_ADDRESS}}"/g, 'true')
      html = html.replace(/"{{GSV_SITE_NAME}}"/g, gsvSite)
    }
    custInfoObj.emailingShipLabel = true
    order.tranid = reqParams.orderId
    order.poId = reqParams.tranid
    html = html.replace(/"{{FROM_ADDRESS}}"/g, JSON.stringify(custInfoObj))
    return {
      html: html,
      order: order
    }
  }
  function updateTemplateVariables (obj, html, isTesting) {
    /** {
               suiteleturl,
               emailShipLabel,
               location,
               orderIsEmpty,
               order
            } */

    //Update Variables
    html = html.replace(/{{SUITELET_URL}}/g, obj.suiteleturl)
    if (!obj.emailShipLabel) {
      html = html.replace(/"{{FROM_ADDRESS}}"/g, JSON.stringify(obj.location))
      if (obj.orderIsEmpty) {
        if (isTesting) {
          return 'blankShipment'
        }
        blankShipAddresses = getBlankShipAddresses()
        log.debug('blank ship addresses: ', blankShipAddresses)
        html = html.replace(
          /"{{BLANK_SHIPMENT_ADDRESSES}}"/g,
          JSON.stringify(blankShipAddresses)
        )
      }
    }
    if (isTesting) {
      return false
    }
    html = html.replace(/"{{ORDER_DATA}}"/g, JSON.stringify(obj.order))
    return html
  }
  /*
   * Construct XML Request Object from JSON Data
   *
   * Input : obj, data
   * Output : XML formated request object
   *
   */
  function constructXML (obj, data) {
    return createNode(obj.node, obj.attr, obj.content, data)
  }

  function createNode (node, attr, content, data) {
    if (!attr) attr = ''

    return (
      '<' +
      node +
      ' ' +
      attr +
      '>' +
      resolveContent(content, data) +
      '</' +
      node +
      '>'
    )
  }

  function resolveContent (content, data) {
    if (!content) return ''

    if (content.value) return content.value
    else if (content.mapping) return data[content.mapping] || ''

    var xml = ''
    if (isArray(content)) {
      for (var i in content) {
        if (!content[i]) continue
        if (content[i].node) {
          if (content[i].eval) {
            // log.error("node", content[i]);
            // log.error("Eval " + content[i].eval, content[i].eval && !eval(data[content[i].eval]));
            if (!eval(data[content[i].eval])) continue
          }

          if (!content[i].content)
            content[i].content = {
              mapping: content[i].mapping,
              value: content[i].value
            } //Final node senario
          xml += createNode(
            content[i].node,
            content[i].attr,
            content[i].content,
            data
          )
        }
      }
    } else {
      if (content.node)
        xml = createNode(content.node, content.attr, content.content, data)
    }

    return xml
  }

  function jsonResponse (context, type, message, body) {
    var response = { success: type, message: message, body: body }
    context.response.write(JSON.stringify(response))
  }

  function getFileContent (name) {
    var content = file.load({ id: name })

    return content.getContents()
  }

  function isArray (value) {
    return value && typeof value === 'object' && value.constructor === Array
  }

  function findFreeDeployment () {
    var today = moment(new Date()).format('MM/DD/YYYY')
    today = today + ' 11:59 pm'
    log.debug('today moment', today)

    var mrStatusSearch = search.create({
      type: 'scheduledscriptinstance',
      filters: [
        ['datecreated', 'on', today],
        'AND',
        ['scriptdeployment.scriptid', 'is', 'customdeploy_swing_mr_shiprush']
      ],
      columns: [
        search.createColumn({
          name: 'enddate',
          sort: search.Sort.DESC,
          label: 'End Date'
        }),
        search.createColumn({ name: 'status', label: 'Status' }),
        search.createColumn({
          name: 'mapreducestage',
          label: 'Map/Reduce Stage'
        })
      ]
    })

    var searchResultCount = mrStatusSearch.runPaged().count
    log.debug('mrStatusSearch result count', searchResultCount)
    var mrStatusSearchObj = mrStatusSearch.run().getRange({ start: 0, end: 5 })
    var status = 0
    if (searchResultCount != 0) {
      status = mrStatusSearchObj[0].getValue('status')
      log.debug('status', status)
    }
    //if the first deployment is not running, then submit the task
    if (searchResultCount == 0 || status == 'Complete' || status == 'Failed') {
      return 'customdeploy_swing_mr_shiprush'
    } else {
      //Look for another deployment
      var scriptdeploymentSearchObj = search.create({
        type: 'scriptdeployment',
        filters: [['script.scriptid', 'is', 'customscript_swing_mr_shiprush']],
        columns: [
          search.createColumn({ name: 'scriptid', label: 'Custom ID' }),
          search.createColumn({ name: 'status', label: 'Status' }),
          search.createColumn({ name: 'isdeployed', label: 'Is Deployed' }),
          search.createColumn({ name: 'scripttype', label: 'Script Type' })
        ]
      })
      var deploySearchResultCount = scriptdeploymentSearchObj.runPaged().count
      log.debug(
        'scriptdeploymentSearchObj result count',
        deploySearchResultCount
      )
      var deploymentSearchObj = scriptdeploymentSearchObj
        .run()
        .getRange({ start: 0, end: 5 })

      //Start checking deployments to see which is available
      for (var i = 0; i < deploySearchResultCount; i++) {
        var currDeployment = deploymentSearchObj[i].getValue({
          name: 'scriptid'
        })
        log.debug(
          'currentDeployment to check if still running ' + i,
          currDeployment
        )
        //Now check if the deployment is currently running
        var mrStatusSearch = search.create({
          type: 'scheduledscriptinstance',
          filters: [
            ['datecreated', 'on', today],
            'AND',
            ['scriptdeployment.scriptid', 'is', currDeployment]
          ],
          columns: [
            search.createColumn({
              name: 'enddate',
              sort: search.Sort.DESC,
              label: 'End Date'
            }),
            search.createColumn({ name: 'status', label: 'Status' }),
            search.createColumn({
              name: 'mapreducestage',
              label: 'Map/Reduce Stage'
            })
          ]
        })
        var searchResultCount = mrStatusSearch.runPaged().count
        log.debug('mrStatusSearch result count', searchResultCount)
        var mrStatusSearchObj = mrStatusSearch
          .run()
          .getRange({ start: 0, end: 5 })
        // If the Map/Reduce script is not running
        var status = 0

        if (searchResultCount != 0) {
          status = mrStatusSearchObj[0].getValue('status')
          log.debug('status', status)
        }
        if (
          searchResultCount == 0 ||
          status == 'Complete' ||
          status == 'Failed'
        ) {
          return currDeployment
        } else {
          log.debug(
            'currentDeployment ' + currDeployment + 'is running',
            'checking next'
          )
        }
      }

      throw 'All deployments currently running'
    }
  } // end look for free deployments

  return {
    onRequest: onRequest,
    updatePoWithTrackingNumber: updatePoWithTrackingNumber,
    updateTemplateVariables: updateTemplateVariables
  }
})

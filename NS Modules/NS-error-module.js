/* SuiteScript error module
 *
 * @module N/error
 * @NApiVersion 2.x
 *
 * IMPORTANT! Beware of introducing circular dependencies, almost every single module depends on the [error] and [invoker] modules.
 * Only simple dependencies such as Java api bridges (although client side bridges could be an issue) are safe here.
 * Also note that it is intentional that [error] module does not use invoker for that reason, which means that any intercepting
 * logic there will not be called.
 */

define([
  'N/restricted/xmlApi',
  'N/restricted/errorApi',
  'N/restricted/remoteApiBridge',
  'N/nsobject'
], function (xmlApi, errorApi, remoteUtil, nsobject) {
  var ERROR_TYPES = Object.freeze({
    MISSING_REQD_ARGUMENT: 'SSS_MISSING_REQD_ARGUMENT',
    READ_ONLY_PROPERTY: 'READ_ONLY_PROPERTY',
    WRONG_PARAMETER_TYPE: 'WRONG_PARAMETER_TYPE',
    UNKNOWN_PARAM: 'UNKNOWN_PARAM',
    INVALID_FLD_VALUE: 'INVALID_FLD_VALUE',
    INVALID_FIELD_VALUE: 'INVALID_FIELD_VALUE',
    VALUE_1_OUTSIDE_OF_VALID_MINMAX_RANGE_FOR_FIELD_2:
      'VALUE_1_OUTSIDE_OF_VALID_MINMAX_RANGE_FOR_FIELD_2',
    INVALID_NUMBER_MUST_BE_LOWER_THAN_1: 'INVALID_NUMBER_MUST_BE_LOWER_THAN_1',
    INVALID_NUMBER_MUST_BE_GREATER_THAN_1:
      'INVALID_NUMBER_MUST_BE_GREATER_THAN_1',
    INVALID_NUMBER_MUST_BE_BETWEEN_1_AND_2:
      'INVALID_NUMBER_MUST_BE_BETWEEN_1_AND_2',
    INVALID_KEY_OR_REF: 'WS_INVALID_REFERENCE_KEY_1',
    EMPTY_KEY_NOT_ALLOWED: 'EMPTY_KEY_NOT_ALLOWED',
    INVALID_URL_URL_MUST_START_WITH_HTTP_HTTPS_FTP_OR_FILE:
      'INVALID_URL_URL_MUST_START_WITH_HTTP_HTTPS_FTP_OR_FILE',
    INVALID_URL_SPACES_ARE_NOT_ALLOWED_IN_THE_URL:
      'INVALID_URL_SPACES_ARE_NOT_ALLOWED_IN_THE_URL',
    INVALID_NUMBER_OR_PERCENTAGE: 'INVALID_NUMBER_OR_PERCENTAGE',
    INVALID_EMAILS_FOUND: 'INVALID_EMAILS_FOUND',
    INVALID_RCRD_TYPE: 'INVALID_RCRD_TYPE',
    IDENTIFIERS_CAN_CONTAIN_ONLY_DIGITS_ALPHABETIC_CHARACTERS_OR__WITH_NO_SPACES:
      'IDENTIFIERS_CAN_CONTAIN_ONLY_DIGITS_ALPHABETIC_CHARACTERS_OR__WITH_NO_SPACES',
    CREDIT_CARD_NUMBERS_MUST_CONTAIN_BETWEEN_13_AND_20_DIGITS:
      'CREDIT_CARD_NUMBERS_MUST_CONTAIN_BETWEEN_13_AND_20_DIGITS',
    CREDIT_CARD_NUMBER_MUST_CONTAIN_ONLY_DIGITS:
      'CREDIT_CARD_NUMBER_MUST_CONTAIN_ONLY_DIGITS',
    CREDIT_CARD_NUMBER_IS_NOT_VALID__PLEASE_CHECK_THAT_ALL_DIGITS_WERE_ENTERED_CORRECTLY:
      'CREDIT_CARD_NUMBER_IS_NOT_VALID__PLEASE_CHECK_THAT_ALL_DIGITS_WERE_ENTERED_CORRECTLY',
    PHONE_NUMBER_SHOULD_HAVE_SEVEN_DIGITS_OR_MORE:
      'PHONE_NUMBER_SHOULD_HAVE_SEVEN_DIGITS_OR_MORE',
    PLEASE_INCLUDE_THE_AREA_CODE_FOR_PHONE_NUMBER:
      'PLEASE_INCLUDE_THE_AREA_CODE_FOR_PHONE_NUMBER',
    THE_FIELD_1_CONTAINED_MORE_THAN_THE_MAXIMUM_NUMBER__2__OF_CHARACTERS_ALLOWED:
      'THE_FIELD_1_CONTAINED_MORE_THAN_THE_MAXIMUM_NUMBER__2__OF_CHARACTERS_ALLOWED',
    PROPERTY_VALUE_CONFLICT: 'PROPERTY_VALUE_CONFLICT',
    FORM_VALIDATION_FAILED_YOU_CANNOT_CREATE_THIS_SUBRECORD:
      'FORM_VALIDATION_FAILED_YOU_CANNOT_CREATE_THIS_SUBRECORD',
    FORM_VALIDATION_FAILED_YOU_CANNOT_SUBMIT_THIS_RECORD:
      'FORM_VALIDATION_FAILED_YOU_CANNOT_SUBMIT_THIS_RECORD',
    PLEASE_ENTER_AN_EXPIRATION_DATE_IN_MMYYYY_FORMAT:
      'PLEASE_ENTER_AN_EXPIRATION_DATE_IN_MMYYYY_FORMAT',
    PLEASE_ENTER_A_VALID_FROM_START_DATE_IN_MMYYYY_FORMAT:
      'PLEASE_ENTER_A_VALID_FROM_START_DATE_IN_MMYYYY_FORMAT',
    NOTICE_THE_CREDIT_CARD_APPEARS_TO_BE_INCORRECT:
      'NOTICE_THE_CREDIT_CARD_APPEARS_TO_BE_INCORRECT',
    FIELD_MUST_CONTAIN_A_VALUE: 'FIELD_MUST_CONTAIN_A_VALUE',
    NON_KATAKANA_DATA_FOUND: 'NON_KATAKANA_DATA_FOUND',
    COLOR_VALUE_MUST_BE_6_HEXADECIMAL_DIGITS_OF_THE_FORM_RRGGBB__EXAMPLE_FF0000_FOR_RED:
      'COLOR_VALUE_MUST_BE_6_HEXADECIMAL_DIGITS_OF_THE_FORM_RRGGBB__EXAMPLE_FF0000_FOR_RED',
    INVALID_DATE_VALUE_MUST_BE_1: 'INVALID_DATE_VALUE_MUST_BE_1',
    INVALID_DATE_VALUE_MUST_BE_ON_OR_AFTER_1CUTOFF_DATE:
      'INVALID_DATE_VALUE_MUST_BE_ON_OR_AFTER_1CUTOFF_DATE',
    INVALID_GETSELECTOPTION_FILTER_OPERATOR:
      'SSS_INVALID_GETSELECTOPTION_FILTER_OPERATOR',
    INVALID_UI_OBJECT_TYPE: 'SSS_INVALID_UI_OBJECT_TYPE',
    INVALID_SUBLIST_OPERATION: 'SSS_INVALID_SUBLIST_OPERATION',
    INVALID_SUITEAPP_APPLICATION_ID: 'INVALID_SUITEAPP_APPLICATION_ID',
    INVALID_SCRIPT_OPERATION_ON_READONLY_SUBLIST_FIELD:
      'A_SCRIPT_IS_ATTEMPTING_TO_EDIT_THE_1_SUBLIST_THIS_SUBLIST_IS_CURRENTLY_IN_READONLY_MODE_AND_CANNOT_BE_EDITED_CALL_YOUR_NETSUITE_ADMINISTRATOR_TO_DISABLE_THIS_SCRIPT_IF_YOU_NEED_TO_SUBMIT_THIS_RECORD',
    WS_NO_PERMISSIONS_TO_SET_VALUE: 'WS_NO_PERMISSIONS_TO_SET_VALUE',
    SCRIPT_EXECUTION_USAGE_LIMIT_EXCEEDED:
      'SCRIPT_EXECUTION_USAGE_LIMIT_EXCEEDED',
    NOT_SUPPORTED_ON_CURRENT_SUBRECORD: 'NOT_SUPPORTED_ON_CURRENT_SUBRECORD',
    FIELD_1_IS_NOT_A_SUBRECORD_FIELD: 'FIELD_1_IS_NOT_A_SUBRECORD_FIELD',
    THAT_RECORD_IS_NOT_EDITABLE: 'THAT_RECORD_IS_NOT_EDITABLE',
    SSS_INVALID_TYPE_ARG: 'SSS_INVALID_TYPE_ARG',
    SSS_INVALID_SRCH_OPERATOR: 'SSS_INVALID_SRCH_OPERATOR',
    SSS_INVALID_URL: 'SSS_INVALID_URL',
    SSS_INVALID_CURRENCY_ID: 'SSS_INVALID_CURRENCY_ID',
    SSS_INVALID_API_USAGE: 'SSS_INVALID_API_USAGE',
    FIELD_1_ALREADY_CONTAINS_A_SUBRECORD_YOU_CANNOT_CALL_CREATESUBRECORD:
      'FIELD_1_ALREADY_CONTAINS_A_SUBRECORD_YOU_CANNOT_CALL_CREATESUBRECORD',
    BUTTONS_MUST_INCLUDE_BOTH_A_LABEL_AND_VALUE:
      'BUTTONS_MUST_INCLUDE_BOTH_A_LABEL_AND_VALUE',
    SSS_INVALID_UI_OBJECT_TYPE: 'SSS_INVALID_UI_OBJECT_TYPE',
    INVALID_PAGE_RANGE: 'INVALID_PAGE_RANGE',
    SSS_UNSUPPORTED_METHOD: 'SSS_UNSUPPORTED_METHOD',
    SSS_TAX_REGISTRATION_REQUIRED: 'SSS_TAX_REGISTRATION_REQUIRED',
    INVALID_DIRECTION_FOR_SORTING: 'INVALID_DIRECTION_FOR_SORTING',
    INVALID_COLUMN_FOR_SORTING: 'INVALID_COLUMN_FOR_SORTING',
    INVALID_FILTER_FIELD_FOR_CURRENT_VIEW:
      'INVALID_FILTER_FIELD_FOR_CURRENT_VIEW',
    INVALID_CUSTOM_VIEW_VALUE: 'INVALID_CUSTOM_VIEW_VALUE',
    INVALID_PAGE_INDEX: 'INVALID_PAGE_INDEX',
    INVALID_TASK_TYPE: 'INVALID_TASK_TYPE',
    METHOD_IS_ONLY_ALLOWED_FOR_MATRIX_FIELD:
      'SSS_METHOD_IS_ONLY_ALLOWED_FOR_MATRIX_FIELD',
    SSS_METHOD_IS_ONLY_ALLOWED_FOR_MULTISELECT_FIELD:
      'SSS_METHOD_IS_ONLY_ALLOWED_FOR_MULTISELECT_FIELD',
    SSS_METHOD_IS_ONLY_ALLOWED_FOR_SELECT_FIELD:
      'SSS_METHOD_IS_ONLY_ALLOWED_FOR_SELECT_FIELD',
    SSS_RECORD_TYPE_MISMATCH: 'SSS_RECORD_TYPE_MISMATCH',
    SSS_INVALID_SUBLIST: 'SSS_INVALID_SUBLIST',
    SSS_INVALID_SUBLIST_OPERATION: 'SSS_INVALID_SUBLIST_OPERATION',
    SSS_SEARCH_FOR_EACH_LIMIT_EXCEEDED: 'SSS_SEARCH_FOR_EACH_LIMIT_EXCEEDED',
    SSS_INVALID_SEARCH_RESULT_INDEX: 'SSS_INVALID_SEARCH_RESULT_INDEX',
    SSS_SEARCH_RESULT_LIMIT_EXCEEDED: 'SSS_SEARCH_RESULT_LIMIT_EXCEEDED',
    INVALID_FIELD_INDEX: 'INVALID_FIELD_INDEX',
    INVALID_FIELD_ID: 'INVALID_FIELD_ID',
    INVALID_SUBRECORD_REFEFAILED_AN_UNEXPECTED_ERROR_OCCURREDRENCE:
      'INVALID_SUBRECORD_REFERENCE',
    FAILED_AN_UNEXPECTED_ERROR_OCCURRED: 'FAILED_AN_UNEXPECTED_ERROR_OCCURRED',
    CANNOT_CREATE_RECORD_INSTANCE: 'CANNOT_CREATE_RECORD_INSTANCE',
    CANNOT_CREATE_RECORD_DRAFT_OF_EXISTING_RECORD:
      'CANNOT_CREATE_RECORD_DRAFT_OF_EXISTING_RECORD',
    INVALID_SUBRECORD_MERGE: 'INVALID_SUBRECORD_MERGE',
    OPERATION_IS_NOT_ALLOWED: 'OPERATION_IS_NOT_ALLOWED',
    INVALID_CONFIGURATION_UNABLE_TO_CHANGE_REQUIRE_CONFIGURATION_FOR_1:
      'INVALID_CONFIGURATION_UNABLE_TO_CHANGE_REQUIRE_CONFIGURATION_FOR_1',
    INVALID_CONFIGURATION_UNABLE_TO_CHANGE_REQUIRE_CONFIGURATION_WITHOUT_A_CONTEXT:
      'INVALID_CONFIGURATION_UNABLE_TO_CHANGE_REQUIRE_CONFIGURATION_WITHOUT_A_CONTEXT',
    MUTUALLY_EXCLUSIVE_ARGUMENTS: 'MUTUALLY_EXCLUSIVE_ARGUMENTS',
    RELATIONSHIP_ALREADY_USED: 'RELATIONSHIP_ALREADY_USED',
    INVALID_SEARCH_TYPE: 'INVALID_SEARCH_TYPE',
    OPERATOR_ARITY_MISMATCH: 'OPERATOR_ARITY_MISMATCH',
    INVALID_SEARCH_OPERATOR: 'INVALID_SEARCH_OPERATOR',
    NEITHER_ARGUMENT_DEFINED: 'NEITHER_ARGUMENT_DEFINED',
    SSS_INVALID_MACRO_ID: 'SSS_INVALID_MACRO_ID',
    SSS_INVALID_ACTION_ID: 'SSS_INVALID_ACTION_ID',
    SSS_RECORD_DOES_NOT_SATISFY_CONDITION:
      'SSS_RECORD_DOES_NOT_SATISFY_CONDITION',
    SELECT_OPTION_ALREADY_PRESENT: 'SELECT_OPTION_ALREADY_PRESENT',
    SELECT_OPTION_NOT_FOUND: 'SELECT_OPTION_NOT_FOUND',
    YOU_HAVE_ATTEMPTED_AN_UNSUPPORTED_ACTION:
      'YOU_HAVE_ATTEMPTED_AN_UNSUPPORTED_ACTION',
    INVALID_RETURN_TYPE_EXPECTED_1: 'INVALID_RETURN_TYPE_EXPECTED_1',
    HISTORY_IS_ONLY_AVAILABLE_FOR_THE_LAST_30_DAYS:
      'HISTORY_IS_ONLY_AVAILABLE_FOR_THE_LAST_30_DAYS',
    SSS_ARGUMENT_DISCREPANCY: 'SSS_ARGUMENT_DISCREPANCY',
    THE_OPTIONS_ARE_MUTUALLY_EXCLUSIVE_1_2_ARG2_:
      'THE_OPTIONS_ARE_MUTUALLY_EXCLUSIVE_1_2_ARG2_',
    INVALID_FORMULA_TYPE: 'INVALID_FORMULA_TYPE',
    INVALID_AGGREGATE_TYPE: 'INVALID_AGGREGATE_TYPE',
    INVALID_SORT_LOCALE: 'INVALID_SORT_LOCALE',
    CANNOT_RESUBMIT_SUBMITTED_ASYNC_SEARCH_TASK:
      'CANNOT_RESUBMIT_SUBMITTED_ASYNC_SEARCH_TASK',
    SSS_INVALID_READ_SIZE: 'SSS_INVALID_READ_SIZE',
    SSS_INVALID_SEGMENT_SEPARATOR: 'SSS_INVALID_SEGMENT_SEPARATOR',
    INVALID_DATE_ID: 'INVALID_DATE_ID',
    INVALID_LOCALE: 'INVALID_LOCALE',
    TRANSLATION_HANDLE_IS_IN_AN_ILLEGAL_STATE:
      'TRANSLATION_HANDLE_IS_IN_AN_ILLEGAL_STATE',
    INVALID_SIGNATURE_TAG: 'INVALID_SIGNATURE_TAG',
    INVALID_ALGORITHM: 'INVALID_ALGORITHM',
    SIGNATURE_VERIFICATION_FAILED: 'SIGNATURE_VERIFICATION_FAILED',
    INVALID_CERTIFICATE_TYPE: 'INVALID_CERTIFICATE_TYPE',
    INVALID_SIGNATURE: 'INVALID_SIGNATURE',
    FIELD_1_CANNOT_BE_EMPTY: 'FIELD_1_CANNOT_BE_EMPTY',
    SSS_TAG_CANNOT_BE_EMPTY: 'SSS_TAG_CANNOT_BE_EMPTY',
    SSS_NOT_YET_SUPPORTED: 'SSS_NOT_YET_SUPPORTED',
    SSS_DUPLICATE_ALIAS: 'SSS_DUPLICATE_ALIAS',
    SSS_MISSING_ALIAS: 'SSS_MISSING_ALIAS',
    INVALID_SIGNATURE_TAG: 'INVALID_SIGNATURE_TAG',
    INVALID_ALGORITHM: 'INVALID_ALGORITHM',
    SIGNATURE_VERIFICATION_FAILED: 'SIGNATURE_VERIFICATION_FAILED',
    INVALID_CERTIFICATE_TYPE: 'INVALID_CERTIFICATE_TYPE',
    INVALID_SIGNATURE: 'INVALID_SIGNATURE',
    IDENTIFIERS_CAN_CONTAIN_ONLY_DIGITS_ALPHABETIC_CHARACTERS_OR__WITH_NO_SPACES:
      'IDENTIFIERS_CAN_CONTAIN_ONLY_DIGITS_ALPHABETIC_CHARACTERS_OR__WITH_NO_SPACES',
    ID_CANNOT_HAVE_MORE_THAN_N_CHARACTERS:
      'ID_CANNOT_HAVE_MORE_THAN_N_CHARACTERS',
    NAME_CANNOT_HAVE_MORE_THAN_N_CHARACTERS:
      'NAME_CANNOT_HAVE_MORE_THAN_N_CHARACTERS',
    PASSWORD_CANNOT_HAVE_MORE_THAN_N_CHARACTERS:
      'PASSWORD_CANNOT_HAVE_MORE_THAN_N_CHARACTERS',
    NAME_CANNOT_BE_EMPTY: 'NAME_CANNOT_BE_EMPTY',
    INVALID_KEY_TYPE: 'INVALID_KEY_TYPE',
    INVALID_SORT: 'INVALID_SORT',
    INVALID_ID_PREFIX: 'INVALID_ID_PREFIX',
    TOO_MANY_RESULTS: 'TOO_MANY_RESULTS',
    INVALID_HTTP_METHOD: 'INVALID_HTTP_METHOD',
    INVALID_OPERATION: 'INVALID_OPERATION'
  })

  var isVersionTwoOne = xmlApi !== errorApi // TODO: (P2) REMOVE THIS HACK! Inject apiVersion module that uses SuiteScriptRuntimeVersion

  /**
   *
   * @protected
   * @constructor
   */

  function SuiteScriptError (delegate) {
    var TYPE = 'error.SuiteScriptError'

    /**
     * @name SuiteScriptError#type
     * @type string
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'type', {
      get: function () {
        return TYPE
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'type'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#id
     * @type string
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'id', {
      get: function () {
        return delegate.getId()
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'id'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#name
     * @type string
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'name', {
      get: function () {
        return delegate.name || delegate.getCode ? delegate.getCode() : ''
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'name'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#message
     * @type string
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'message', {
      get: function () {
        return delegate.message || delegate.getDetails
          ? delegate.getDetails()
          : ''
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'message'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#stack
     * @type string[]
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'stack', {
      get: function () {
        return util.isFunction(delegate.getStackTrace)
          ? delegate.getStackTrace().slice(0)
          : ''
      },
      //'stack' must be settable in order to wrap a JS error with a SuiteScript error
      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#cause
     * @type Anything
     * @readonly
     * @since 2016.1
     */

    Object.defineProperty(this, 'cause', {
      get: function () {
        return delegate.cause || this
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'cause'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#notifyOff
     * @type boolean
     * @readonly
     * @since 2016.2
     */

    Object.defineProperty(this, 'notifyOff', {
      get: function () {
        return delegate.notifyOff
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'notifyOff'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })

    this.userFacing = true

    // Functions for debugger

    this.toJSON = function toJSON () {
      var delegateType = typeof delegate
      var cause = this
      if (
        delegateType === 'function' ||
        (delegateType === 'object' && !!delegate)
      ) {
        if (
          !!delegate.cause &&
          !!delegate.cause.getStackTrace &&
          !!delegate.cause.getMessage
        ) {
          cause = {
            message: delegate.cause.getMessage(),
            stack: delegate.cause.getStackTrace()
          }
        } else {
          cause = delegate.cause || delegate
        }
      }
      return {
        type: TYPE,
        name: this.name,
        message: this.message,
        stack: this.stack,
        cause: cause,
        id: this.id,
        notifyOff: this.notifyOff,
        data: this.data,
        userFacing: this.userFacing
      }
    }

    this.toString = function toString () {
      return JSON.stringify(this)
    }
  }

  //inheritance TODO this is not working for Error, SuiteScriptError is not an instanceof Error
  var debuggable = nsobject.getNewInstance()
  var err = Object.create(Error.prototype)
  debuggable.prototype = err
  SuiteScriptError.prototype = debuggable
  SuiteScriptError.prototype.constructor = SuiteScriptError

  /**
   *
   * @protected
   * @constructor
   */

  function UserEventError (delegate) {
    var TYPE = 'error.UserEventError'

    /**
     * @name SuiteScriptError#recordId
     * @type string
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'recordId', {
      get: function () {
        return delegate.getInternalId()
      },

      enumerable: true,
      configurable: false
    })

    /**
     * @name SuiteScriptError#eventType
     * @type string
     * @readonly
     * @since 2015.2
     */

    Object.defineProperty(this, 'eventType', {
      get: function () {
        return delegate.getUserEvent()
      },

      enumerable: true,
      configurable: false
    })

    this.toJSON = function toJSON () {
      var delegateType = typeof delegate
      return {
        type: TYPE,
        name: delegate.getCode(),
        message: delegate.getDetails(),
        stack: this.stack,
        eventType: delegate.getUserEvent(),
        recordId: delegate.getInternalId(),
        cause:
          delegateType === 'function' ||
          (delegateType === 'object' && !!delegate)
            ? delegate.cause || delegate
            : this,
        id: this.id
      }
    }

    this.toString = function toString () {
      return JSON.stringify(this)
    }
  }

  UserEventError.prototype = new SuiteScriptError()

  function getErrorMessage (
    errorCode,
    errorVal1,
    errorVal2,
    errorVal3,
    errorVal4
  ) {
    return remoteUtil.getErrorMessage(
      errorCode,
      errorVal1,
      errorVal2,
      errorVal3,
      errorVal4
    )
  }

  function prepareDelegate (apiError) {
    var stackTrace = isVersionTwoOne
      ? Error().stack.split('\n\t')
      : apiError.getStackTrace()
    var code = apiError.getCode()
    var details = apiError.getDetails()
    var id = apiError.getId()
    var userEvent = apiError.getUserEvent()
    var notifyOff = apiError.isSuppressNotification() || false
    var delegate = {
      getStackTrace: function () {
        return stackTrace
      },
      getDetails: function () {
        return details
      },
      getCode: function () {
        return code
      },
      getId: function () {
        return id
      }
    }
    delegate.notifyOff = notifyOff
    delegate.cause = {
      id: id,
      code: code,
      details: details,
      userEvent: userEvent,
      stackTrace: stackTrace.slice(0),
      toString: function () {
        return JSON.stringify(this)
      },
      toJSON: function () {
        return {
          type: 'internal error',
          code: code,
          details: details,
          userEvent: userEvent,
          stackTrace: stackTrace.slice(0),
          notifyOff: notifyOff
        }
      }
    }
    return delegate
  }

  function javaArrayToJsArray (javaArray) {
    var toRet = []
    for (var i = 0; javaArray && i < javaArray.length; i++)
      toRet[i] = javaArray[i]

    return toRet
  }

  // The result of this method will pass a potential call to JSON.stringify(), etc.
  function getSafeCause (errorObj) {
    var cause = errorObj.cause || errorObj
    if (cause instanceof Error) {
      var safeCopy = {}
      Object.getOwnPropertyNames(cause).forEach(function (prop) {
        safeCopy[prop] =
          prop === 'stack' || prop === 'rhinoException'
            ? cause[prop].toString()
            : cause[prop]
      })
      cause = safeCopy
    }
    return cause
  }

  function addCustomDataToError (suiteScriptError, data) {
    Object.defineProperty(suiteScriptError, 'data', {
      get: function () {
        return data
      },
      set: function (val) {
        throw new SuiteScriptError(
          errorApi.nlapiCreateError(
            ERROR_TYPES.READ_ONLY_PROPERTY,
            getErrorMessage(ERROR_TYPES.READ_ONLY_PROPERTY, 'data'),
            false
          )
        )
      },
      enumerable: true,
      configurable: false
    })
  }

  function createError (options) {
    var currentStackTrace = null
    if (isVersionTwoOne) currentStackTrace = Error().stack.split('\n')

    if (!options)
      throw new SuiteScriptError(
        errorApi.nlapiCreateError(
          ERROR_TYPES.MISSING_REQD_ARGUMENT,
          getErrorMessage(
            ERROR_TYPES.MISSING_REQD_ARGUMENT,
            'error.create',
            'options'
          ),
          false
        )
      )
    if (
      !!options['hasOwnProperty'] &&
      options.hasOwnProperty('notifyOff') &&
      !util.isBoolean(options.notifyOff)
    )
      throw new SuiteScriptError(
        errorApi.nlapiCreateError(
          ERROR_TYPES.WRONG_PARAMETER_TYPE,
          getErrorMessage(
            ERROR_TYPES.WRONG_PARAMETER_TYPE,
            'options.notifyOff',
            'boolean'
          ),
          false
        )
      )

    var toRet = null
    // Wrap internal Java exception
    if (
      options instanceof Object &&
      options.constructor &&
      options.constructor.name === 'JavaException'
    ) {
      toRet = new SuiteScriptError(
        prepareDelegate(errorApi.nlapiCreateError(options, null, false))
      )
      if (
        !!options.javaException &&
        util.isFunction(options.javaException.getData)
      )
        addCustomDataToError(toRet, JSON.parse(options.javaException.getData()))
      toRet.userFacing = false
    }
    //TODO clean up this mess - class objects should not be exposed to scripts, left over from Nashorn - Graal checks are all duck-typing, however, need to evaluate if deterministic
    else if (
      /*!!options.getClass && !!options.getClass().getName && !!options.getClass().getName()	
&& (options.getClass().getName().endsWith('NLServerSideScriptException') || options.getClass().getName().endsWith('NLUserError') || options.getClass().getName().endsWith('SuiteScriptError')))	
*/

      //TODO improve duck-typing if it must be the impl (make very specific)
      !!options.getCode &&
      !!options.getMessage
    ) {
      toRet = new SuiteScriptError(
        prepareDelegate(errorApi.nlapiCreateError(options, null, false))
      )
      if (
        options
          .getClass()
          .getName()
          .endsWith('SuiteScriptError')
      )
        addCustomDataToError(toRet, JSON.parse(options.getData()))
    }
    // [Rhino Only] Wrap nlobjError delegate
    else if (
      options instanceof Object &&
      options.constructor.name === 'nlobjError'
    ) {
      toRet = new SuiteScriptError(prepareDelegate(options))
      toRet.userFacing = false
    }
    // JS error is the "cause"
    else if (util.isError(options) || options instanceof SuiteScriptError) {
      var apiError = errorApi.nlapiCreateError(
        options.name,
        options.message,
        options.notifyOff || false
      )
      var delegate = {
        getStackTrace: function () {
          return isVersionTwoOne ? currentStackTrace : apiError.getStackTrace()
        },
        getDetails: function () {
          return options.message
        },
        getCode: function () {
          return options.name
        },
        getId: function () {
          return options.id
        }
      }
      delegate.cause = getSafeCause(options)
      delegate.notifyOff = options.notifyOff || false
      toRet = new SuiteScriptError(delegate)
    }
    // Standard case, options are args to create SuiteScriptError, duck type the arg
    else if (
      options.hasOwnProperty && // extends Object.prototype
      (options.hasOwnProperty('name') ||
        options.hasOwnProperty('message') ||
        options.hasOwnProperty('notifyOff'))
    ) {
      var apiError = errorApi.nlapiCreateError(
        options.name,
        options.message,
        options.notifyOff || false
      )
      var delegate = {
        getStackTrace: function () {
          return isVersionTwoOne ? currentStackTrace : apiError.getStackTrace()
        },
        getDetails: function () {
          return apiError.getDetails()
        },
        getCode: function () {
          return apiError.getCode()
        },
        getId: function () {
          return apiError.getId()
        }
      }
      delegate.cause = getSafeCause(options)
      delegate.notifyOff = options.notifyOff || false
      toRet = new SuiteScriptError(delegate)
    } else if (typeof options !== 'object') {
      //convenience method. If string is passed in, set it to details.
      var apiError = errorApi.nlapiCreateError(options, null, false)
      var delegate = {
        getStackTrace: function () {
          return isVersionTwoOne ? currentStackTrace : apiError.getStackTrace()
        },
        getDetails: function () {
          return options
        },
        getCode: function () {
          return ''
        },
        getId: function () {
          return apiError.getId()
        }
      }
      delegate.cause = getSafeCause(options)
      delegate.notifyOff = options.notifyOff || false
      toRet = new SuiteScriptError(delegate)
    } // nlobjError ctor logic tries to handle other cases (options is a java object)
    else {
      var apiError = errorApi.nlapiCreateError(options, null, false)
      var delegate = {
        getStackTrace: function () {
          return isVersionTwoOne ? currentStackTrace : apiError.getStackTrace()
        },
        getDetails: function () {
          return apiError.getDetails()
        },
        getCode: function () {
          return apiError.getCode()
        },
        getId: function () {
          return apiError.getId()
        }
      }
      delegate.cause = getSafeCause(options)
      delegate.notifyOff = options.notifyOff || false
      toRet = new SuiteScriptError(delegate)
    }
    if (options.userFacing !== undefined && options.userFacing !== null) {
      toRet.userFacing = options.userFacing
    }
    return toRet
  }

  return Object.freeze({
    /**
     * Create a new Error object
     *
     * @param {Object} options
     * @param {string} options.name
     * @param {string} options.message
     * @param {string} options.notifyOff
     * @return {SuiteScriptError}
     */

    create: createError,
    Type: ERROR_TYPES
  })
})
//# sourceURL=suitescript/resources/javascript//error.js

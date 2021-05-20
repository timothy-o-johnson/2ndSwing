/**
 * SuiteScript module
 *
 * @module N/ui/serverWidget
 * @NApiVersion 2.x
 *
 */

define([
  'N/error',
  'N/restricted/serverWidgetApi',
  'N/nsobject',
  'N/debugger',
  'N/restricted/invoker',
  'N/utilityFunctions',
  'N/util/serverWidgetUtility',
  'N/restricted/marshalUtil',
  'N/ui/message'
], function (
  error,
  serverWidgetApi,
  nsobject,
  debug,
  invoker,
  utilityFunctions,
  serverWidgetUtility,
  marshalUtil,
  uiMsg
) {
  /* imports */

  var FIELD_TYPES = Object.freeze({
    TEXT: 'TEXT',
    RADIO: 'RADIO',
    LABEL: 'LABEL',
    EMAIL: 'EMAIL',
    PHONE: 'PHONE',
    DATE: 'DATE',
    DATETIME: 'DATETIME',
    DATETIMETZ: 'DATETIMETZ',
    CURRENCY: 'CURRENCY',
    FLOAT: 'FLOAT',
    INTEGER: 'INTEGER',
    CHECKBOX: 'CHECKBOX',
    SELECT: 'SELECT',
    URL: 'URL',
    TIMEOFDAY: 'TIMEOFDAY',
    TEXTAREA: 'TEXTAREA',
    MULTISELECT: 'MULTISELECT',
    IMAGE: 'IMAGE',
    INLINEHTML: 'INLINEHTML',
    PASSWORD: 'PASSWORD',
    HELP: 'HELP',
    PERCENT: 'PERCENT',
    LONGTEXT: 'LONGTEXT',
    RICHTEXT: 'RICHTEXT',
    FILE: 'FILE'
  })

  var PAGE_LINK_TYPES = Object.freeze({
    BREADCRUMB: 'BREADCRUMB',
    CROSSLINK: 'CROSSLINK'
  })
  var FIELD_BREAK_TYPES = Object.freeze({
    NONE: 'NONE',
    STARTCOL: 'STARTCOL',
    STARTROW: 'STARTROW'
  })
  var FIELD_LAYOUT_TYPES = Object.freeze({
    NORMAL: 'NORMAL',
    OUTSIDE: 'OUTSIDE',
    OUTSIDEBELOW: 'OUTSIDEBELOW',
    OUTSIDEABOVE: 'OUTSIDEABOVE',
    STARTROW: 'STARTROW',
    MIDROW: 'MIDROW',
    ENDROW: 'ENDROW'
  })
  var SUBLIST_TYPES = Object.freeze({
    EDITOR: 'EDITOR',
    INLINEEDITOR: 'INLINEEDITOR',
    LIST: 'LIST',
    STATICLIST: 'STATICLIST'
  })
  var FIELD_DISPLAY_TYPE = Object.freeze({
    NORMAL: 'NORMAL',
    HIDDEN: 'HIDDEN',
    READONLY: 'READONLY',
    DISABLED: 'DISABLED',
    ENTRY: 'ENTRY',
    INLINE: 'INLINE'
  })

  var SUBLIST_DISPLAY_TYPE = Object.freeze({
    NORMAL: 'NORMAL',
    HIDDEN: 'HIDDEN'
  })

  var LAYOUT_JUSTIFICATION = Object.freeze({
    CENTER: 'CENTER',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
  })

  var LIST_STYLES = Object.freeze({
    GRID: 'grid',
    REPORT: 'report',
    PLAIN: 'plain',
    NORMAL: 'normal'
  })

  var ASSISTANT_SUBMIT_ACTION = Object.freeze({
    NEXT: 'next',
    BACK: 'back',
    CANCEL: 'cancel',
    FINISH: 'finish',
    JUMP: 'jump'
  })

  var _toJSON = debug.defaultToJson

  /**
   *
   * Encapsulates a Tab in a serverWidget.Form
   * @return {Tab}
   * @constructor
   *
   * @since 2015.2
   */

  function Tab (delegate) {
    var TYPE = 'serverWidget.Tab'
    /**
     * The label of the Tab
     * @name Tab#label
     * @type {string}
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return invoker(delegate, 'getLabel', [])
      },
      set: function (val) {
        invoker(delegate, 'setLabel', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /*
     * Helper property for insertSubtab
     */

    Object.defineProperty(this, '_insertSubtab', {
      set: function (val) {
        invoker(val.delegate, 'insertSubTab', [delegate, val.nextsub])
      },
      enumerable: false,
      configurable: false
    })
    /**
     * The Tab's field help
     * @name Tab#helpText
     * @type {string}
     */

    Object.defineProperty(this, 'helpText', {
      get: function () {
        return invoker(delegate, 'getHelpText', [])
      },
      set: function (val) {
        return invoker(delegate, 'setHelpText', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /*
     * Helper property for insertTab
     */

    Object.defineProperty(this, '_insertTab', {
      set: function (val) {
        invoker(val.delegate, 'insertTab', [delegate, val.nexttab])
      },
      enumerable: false,
      configurable: false
    })

    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  Tab.prototype = nsobject.getNewInstance()

  /**
   * Encalsulates a Sublist in a Form or a serverWidget.Assistant
   *
   *
   * @return {Sublist}
   * @constructor
   *
   * @since 2015.2
   */

  function Sublist (delegate) {
    var TYPE = 'serverWidget.Sublist'
    /**
     * The label of the field group
     * @name Sublist#label
     * @type {string}
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return invoker(delegate, 'getLabel', [])
      },
      set: function (val) {
        invoker(delegate, 'setLabel', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * The number of lines in the Sublist.
     * @name Sublist#lineCount
     * @type {number}
     * @readonly
     */

    Object.defineProperty(this, 'lineCount', {
      get: function () {
        return invoker(delegate, 'getLineItemCount', [])
      },
      set: function () {
        utilityFunctions.throwSuiteScriptError(
          error.Type.READ_ONLY_PROPERTY,
          'lineCount'
        )
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })

    /**
     * Set an id of a field that is to have unique values accross the rows in the sublist
     *
     * @param {Object} options
     * @param {string} options.id The id of the field to use as a unique field
     * @returns {Sublist}
     */

    this.updateUniqueFieldId = function updateUniqueFieldId (options) {
      utilityFunctions.checkArgs(
        [options, options.id],
        ['options', 'options.id'],
        'Sublist.updateUniqueFieldId'
      )
      invoker(delegate, 'setUniqueField', [options.id])
      return this
    }
    /**
     * Id of a field designated as a totalling column, which is used to calculate and display a running total for the sublist
     *
     * @param {Object} options
     * @param {string} options.id The id of the field to use as a total field
     * @returns {Sublist}
     */

    this.updateTotallingFieldId = function updateTotallingFieldId (options) {
      utilityFunctions.checkArgs(
        [options, options.id],
        ['options', 'options.id'],
        'Sublist.updateTotallingFieldId'
      )
      invoker(delegate, 'setAmountField', [options.id])
      return this
    }

    /**
     * Display type of the sublist. Possible values are in serverWidget.SublistDisplayType
     * @name Sublist#displayType
     * @type {FieldDisplayType}
     */

    Object.defineProperty(this, 'displayType', {
      get: function () {
        return invoker(delegate, 'getDisplayType', [])
      },
      set: function (val) {
        invoker(delegate, 'setDisplayType', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * Inline help text to this sublist.
     * @name Sublist#helpText
     * @type {string}
     */

    Object.defineProperty(this, 'helpText', {
      get: function () {
        return invoker(delegate, 'getHelpText', [])
      },
      set: function (val) {
        invoker(delegate, 'setHelpText', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })
    /*
     * Helper property for insertSubList
     */

    Object.defineProperty(this, '_insertSublist', {
      set: function (val) {
        invoker(val.delegate, 'insertSubList', [delegate, val.nextsublist])
      },
      enumerable: false,
      configurable: false
    })
    /**
     * Adds a button to the sublist
     *
     * @param {Object} options
     * @param {string} options.id the script id of button
     * @param {string} options.label the label of button
     * @param {string} [options.functionName] the function name to be triggered onClick for the button
     * @returns {Button}
     */

    this.addButton = function addButton (options) {
      utilityFunctions.checkArgs(
        [options.id, options.label],
        ['id', 'label'],
        'Sublist.addButton'
      )
      if (!options.functionName) options.functionName = null

      var button = invoker(delegate, 'addButton', [
        options.id,
        options.label,
        options.functionName
      ])
      return Object.freeze(new Button(button))
    }
    /**
     * Returns string value of a sublist field.
     *
     * @param {Object} options
     * @param {string} options.id Id of the field
     * @param {number} options.line Line number
     * @returns {string}
     */

    this.getSublistValue = function getSublistValue (options, line) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'Sublist.getSublistValue'
      )
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
        line = options.line
      }
      utilityFunctions.checkArgs(
        [id, line],
        ['options.id', 'options.line'],
        'Sublist.getSublistValue'
      )

      return invoker(delegate, 'getLineItemValue', [id, line + 1])
    }
    /**
     * Set the value of a field on the list
     *
     * @param {Object} options
     * @param {string} options.id id of the field to set
     * @param {number} options.line line number
     * @param {string} options.value value to set on the field
     */

    this.setSublistValue = function setSublistValue (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.line],
        ['options', 'options.id', 'options.line'],
        'Sublist.setSublistValue'
      )
      utilityFunctions.checkArgsAllowNull(
        [options.value],
        ['options.value'],
        'Sublist.setSublistValue'
      )
      return invoker(delegate, 'setLineItemValue', [
        options.id,
        options.line + 1,
        options.value
      ])
    }
    /**
     * Adds refresh all buttons to the sublist
     *
     * @returns {Button}
     */

    this.addRefreshButton = function addRefreshButton () {
      var button = invoker(delegate, 'addRefreshButton', [])
      return Object.freeze(new Button(button))
    }
    /**
     * Adds a "Mark All" and an "Unmark All" button to a sublist.
     *
     * @returns {Button[]}
     */

    this.addMarkAllButtons = function addMarkAllButtons () {
      var buttons = invoker(delegate, 'addMarkAllButtons', [])
      return utilityFunctions.wrapDelegates(buttons, Button)
    }

    /**
     * Add a field, column, to the Sublist
     * @param {Object} options
     * @param {string} options.id id of the filed to add
     * @param {string} options.label the UI label for the field
     * @param {string} options.type the type for this field
     * @param {string} [options.source] The internal id of the source list for this field if the field is a select
     * @param {string} [options.container] Used to specify either a tab or a field group
     * @returns {Field}
     */

    this.addField = function addField (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label, options.type],
        ['options', 'options.id', 'options.label', 'options.type'],
        'Sublist.addField'
      )
      if (!options.source) options.source = null
      if (!options.container) options.container = null

      var field = invoker(delegate, 'addField', [
        options.id,
        options.type,
        options.label,
        options.source,
        options.container
      ])
      return Object.freeze(new Field(field))
    }

    /**
     * Gets field from sublist
     * @param {Object} options
     * @param {string} options.id id of the field to get
     * @returns {Field}
     */

    this.getField = function getField (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Sublist.getField')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Sublist.getField')

      var field = invoker(delegate, 'getField', [id])
      return Object.freeze(new Field(field))
    }

    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  Sublist.prototype = nsobject.getNewInstance()

  /**
   * Encapsulate a field group on an Assistant or a Form objects.
   *
   *
   * @return {FieldGroup}
   * @constructor
   *
   * @since 2015.2
   */

  function FieldGroup (delegate) {
    var TYPE = 'serverWidget.FieldGroup'
    /**
     * Is the field group collapsible.
     * @name FieldGroup#isCollapsible
     * @type {boolean}
     */

    Object.defineProperty(this, 'isCollapsible', {
      get: function () {
        return invoker(delegate, 'getCollapsible', [])
      },
      set: function (val) {
        invoker(delegate, 'setCollapsible', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * Is the field group collapsed
     * @name FieldGroup#isCollapsed
     * @type {boolean}
     */

    Object.defineProperty(this, 'isCollapsed', {
      get: function () {
        return invoker(delegate, 'getDefaultCollapsed', [])
      },
      set: function (val) {
        invoker(delegate, 'setCollapsible', [delegate.getCollapsible(), val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * Is the field group's border hidden
     * @name FieldGroup#isBorderHidden
     * @type {boolean}
     */

    Object.defineProperty(this, 'isBorderHidden', {
      get: function () {
        return !invoker(delegate, 'getShowBorder', [])
      },
      set: function (val) {
        invoker(delegate, 'setShowBorder', [!val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * Do all the fields in this group display in a single column
     * @name Field#isBorderHidden
     * @type {boolean}
     */

    Object.defineProperty(this, 'isSingleColumn', {
      get: function () {
        return invoker(delegate, 'getSingleColumn', [])
      },
      set: function (val) {
        invoker(delegate, 'setSingleColumn', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * The label of the field group
     * @name FieldGroup#label
     * @type {string}
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return invoker(delegate, 'getLabel', [])
      },
      set: function (val) {
        invoker(delegate, 'setLabel', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  FieldGroup.prototype = nsobject.getNewInstance()

  /**
   * Return a wrapped an nlobjField
   *
   *
   * @return {Field}
   * @constructor
   *
   * @since 2015.2
   */

  function Field (delegate) {
    var TYPE = 'serverWidget.Field'

    /**
     * The internal id of the field.
     * @name Field#id
     * @type {string}
     * @readonly
     */

    Object.defineProperty(this, 'id', {
      get: function () {
        return invoker(delegate, 'getName', [])
      },
      set: function () {
        utilityFunctions.throwSuiteScriptError(
          error.Type.READ_ONLY_PROPERTY,
          'id'
        )
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })

    /**
     * The type of the field.
     * @name Field#FieldType
     * @type {FieldType}
     * @readonly
     */

    Object.defineProperty(this, 'type', {
      get: function () {
        return invoker(delegate, 'getType', [])
      },
      set: function () {
        utilityFunctions.throwSuiteScriptError(
          error.Type.READ_ONLY_PROPERTY,
          'type'
        )
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })

    /**
     * Update the breakType of the field
     * @param {Object} options
     * @param {FieldBreakType} options.breakType
     * @return {Field}
     */

    this.updateBreakType = function updateBreakType (options) {
      utilityFunctions.checkArgs(
        [options, options.breakType],
        ['options', 'options.breakType'],
        'Field.updateBreakType'
      )
      invoker(delegate, 'setBreakType', [options.breakType])
      return this
    }

    /**
     * Update the layout type of the field
     * @param {Object} options
     * @param {FieldLayoutType} options.layoutType
     * @return {Field}
     */

    this.updateLayoutType = function updateLayoutType (options) {
      utilityFunctions.checkArgs(
        [options, options.layoutType],
        ['options', 'options.layoutType'],
        'Field.updateBreakType'
      )
      invoker(delegate, 'setLayoutType', [options.layoutType, null])
      return this
    }

    /**
     * the text that gets displayed in lieu of the field value for URL fields
     * @name Field#linkText
     * @type {string}
     */

    Object.defineProperty(this, 'linkText', {
      get: function () {
        return invoker(delegate, 'getLinkText', [])
      },
      set: function (val) {
        invoker(delegate, 'setLinkText', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * The max length of the field
     * @name Field#maxLength
     * @type {number}
     */

    Object.defineProperty(this, 'maxLength', {
      get: function () {
        return invoker(delegate, 'getMaxLength', [])
      },
      set: function (val) {
        var num = util.isString(val) ? parseInt(val, 10) : val
        invoker(delegate, 'setMaxLength', [num])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * Is the field mandatory
     * @name Field#isMandatory
     * @type {boolean}
     */

    Object.defineProperty(this, 'isMandatory', {
      get: function () {
        return invoker(delegate, 'isMandatory', [])
      },
      set: function (val) {
        invoker(delegate, 'setMandatory', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    /**
     * The alias for the field. By default the alias is the field id
     * @name Field#alias
     * @type {string}
     */

    Object.defineProperty(this, 'alias', {
      get: function () {
        return invoker(delegate, 'getAlias', [])
      },
      set: function (val) {
        invoker(delegate, 'setAlias', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * The default value of the field
     * @name Field#defaultValue
     * @type {string}
     */

    Object.defineProperty(this, 'defaultValue', {
      get: function () {
        return invoker(delegate, 'getDefaultValue', [])
      },
      set: function (val) {
        invoker(delegate, 'setDefaultValue', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    /**
     * Sets the height and width for the field. Only supported on multi-selects,
     * long text, rich text, and fields that get rendered as INPUT (type=text) fields.
     * This API is not supported on list/record fields.
     * @param {Object} options
     * @param {number} options.height
     * @param {number} options.width
     * @return {Field}
     */

    this.updateDisplaySize = function updateDisplayHeight (options) {
      utilityFunctions.checkArgs(
        [options, options.height, options.width],
        ['options', 'options.height', 'options.width'],
        'Field.updateDisplayHeight'
      )
      var height = util.isString(options.height)
        ? parseInt(options.height, 10)
        : options.height
      var width = util.isString(options.width)
        ? parseInt(options.width, 10)
        : options.width
      invoker(delegate, 'setDisplaySize', [width, height])
      return this
    }
    /**
     *
     * Udpdate the field display type
     * @param {Object} options
     * @param {number} options.displayType
     * @return {Field}
     */

    this.updateDisplayType = function updateDisplayType (options) {
      utilityFunctions.checkArgs(
        [options, options.displayType],
        ['options', 'options.displayType'],
        'Field.updateDisplayType'
      )
      invoker(delegate, 'setDisplayType', [options.displayType])
      return this
    }
    /**
     * If Rich Text Editing is enabled, you can use this property
     * to set the height of the rich text field only.
     * @name Field#richTextHeight
     * @type {number}
     */

    Object.defineProperty(this, 'richTextHeight', {
      get: function () {
        return invoker(delegate, 'getRichTextHeight', [])
      },
      set: function (val) {
        var textHeight = util.isString(val) ? parseInt(val, 10) : val
        return invoker(delegate, 'setRichTextHeight', [textHeight])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * If Rich Text Editing is enabled, you can use this property
     * to set the width of the rich text field only.
     * @name Field#richTextWidth
     * @type {number}
     */

    Object.defineProperty(this, 'richTextWidth', {
      get: function () {
        return invoker(delegate, 'getRichTextWidth', [])
      },
      set: function (val) {
        var textWidth = util.isString(val) ? parseInt(val, 10) : val
        return invoker(delegate, 'setRichTextWidth', [textWidth])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * The label of the field
     * @name Field#label
     * @type {string}
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return invoker(delegate, 'getLabel', [])
      },
      set: function (val) {
        invoker(delegate, 'setLabel', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * the number of empty field spaces before/above this field.
     * @name Field#padding
     * @type {number}
     */

    Object.defineProperty(this, 'padding', {
      get: function () {
        return invoker(delegate, 'getPadding', [])
      },
      set: function (val) {
        var padding = util.isString(val) ? parseInt(val, 10) : val
        invoker(delegate, 'setPadding', [padding])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /*
     * Helper property for insertField
     */

    Object.defineProperty(this, '_insertField', {
      set: function (val) {
        invoker(val.delegate, 'insertField', [delegate, val.nextfield])
      },
      enumerable: false,
      configurable: false
    })

    /**
     * Get the select options for a field
     * @param {Object} options
     * @param {string} [options.filter] A search string to filter the select options that are returned.
     * @param {string} [options.filteroperator] Supported operators are contains | is | startswith. If not specified, defaults to the contains operator
     * @returns {Object[]}
     */

    this.getSelectOptions = function getSelectOptions (
      options,
      filteroperator
    ) {
      if (!options) {
        options = { filter: null, filteroperator: null }
      } else if (!utilityFunctions.isObject(options)) {
        var filter = options
        options = {
          filter: filter || null,
          filteroperator: filteroperator || null
        }
      } else {
        if (!options.filter) options.filter = null
        if (!options.filteroperator) options.filteroperator = null
      }
      var sOptions = []
      var optionObjects = invoker(delegate, 'getSelectOptions', [
        options.filter,
        options.filteroperator
      ])

      for (var i in optionObjects) {
        if (!optionObjects.hasOwnProperty(i)) continue
        sOptions[sOptions.length] = {
          value: optionObjects[i].getId(),
          text: optionObjects[i].getText()
        }
      }
      return sOptions
    }
    /**
     * Set help text for a field
     * @param {Object} options
     * @param {string} options.help The help text for the field
     * @param {boolean} [options.showInlineForAssistant] This means that field help will appear only in a field help popup box when the field label is clicked
     */

    this.setHelpText = function setHelpText (options, showInlineForAssistant) {
      if (!options)
        utilityFunctions.throwSuiteScriptError(
          error.Type.MISSING_REQD_ARGUMENT,
          'Field.setHelpText',
          'options'
        )
      var help = options
      if (utilityFunctions.isObject(options)) {
        help = options.help
        showInlineForAssistant = options.showInlineForAssistant
      }
      utilityFunctions.checkArgs([help], ['options.help'], 'Field.setHelpText')
      utilityFunctions.checkArgTypes([
        utilityFunctions.checkArgObject(help, 'help', util.isString)
      ])
      invoker(delegate, 'setHelpText', [help, !!showInlineForAssistant])
      return this
    }

    /**
     * Help text for the field
     * @name Field#helpText
     * @type {string}
     */

    Object.defineProperty(this, 'helpText', {
      get: function () {
        return invoker(delegate, 'getHelpText', [])
      },
      set: function (val) {
        this.setHelpText(val)
      },
      enumerable: false,
      configurable: false,
      writeable: true
    })

    /**
     * Add a select option to a select field
     * @param {Object} options
     * @param {string} options.value The internal id of the option
     * @param {string} options.text The display text for this option
     * @param {boolean} [options.isSelected] If true, this option is selected
     */

    this.addSelectOption = function addSelectOption (options) {
      utilityFunctions.checkArgsPresent(
        [options, options.value, options.text],
        ['options', 'options.value', 'options.text'],
        'Field.addSelectOption'
      )
      if (!options.isSelected) options.isSelected = false

      invoker(delegate, 'addSelectOption', [
        options.value,
        options.text,
        options.isSelected
      ])
    }

    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  Field.prototype = nsobject.getNewInstance()

  /**
   * Return a wrapped an nlobjButton
   *
   *
   * @return {Button}
   * @constructor
   *
   * @since 2015.2
   */

  function Button (delegate) {
    var TYPE = 'serverWidget.Button'
    /**
     * Is the button disabled
     * @name Button#isDisabled
     * @type {boolean}
     */

    Object.defineProperty(this, 'isDisabled', {
      get: function () {
        return invoker(delegate, 'getDisabled', [])
      },
      set: function (val) {
        invoker(delegate, 'setDisabled', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })

    /**
     * The label of the button
     * @name Button#label
     * @type {string}
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return invoker(delegate, 'getLabel', [])
      },
      set: function (val) {
        invoker(delegate, 'setLabel', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })

    /**
     * Is the button hidden
     * @name Button#isHidden
     * @type {boolean}
     */

    Object.defineProperty(this, 'isHidden', {
      get: function () {
        return !invoker(delegate, 'getVisible', [])
      },
      set: function (val) {
        invoker(delegate, 'setVisible', [!val])
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })

    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  Button.prototype = nsobject.getNewInstance()

  /**
   * Return a wrapped an nlobjAssistantStep
   *
   *
   * @return {AssistantStep}
   * @constructor
   *
   * @since 2015.2
   */

  function AssistantStep (delegate, assistantDelegate) {
    var TYPE = 'serverWidget.Step'
    /**
     * The internal id of the step.
     * @name AssistantStep#id
     * @type {string}
     * @readonly
     */

    Object.defineProperty(this, 'id', {
      get: function () {
        return invoker(delegate, 'getName', [])
      },
      set: function () {
        utilityFunctions.throwSuiteScriptError(
          error.Type.READ_ONLY_PROPERTY,
          'id'
        )
      },
      enumerable: true,
      configurable: false,
      writeable: false
    })
    /**
     * The label of the step
     * @name AssistantStep#label
     * @type {string}
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return invoker(delegate, 'getLabel', [])
      },
      set: function (val) {
        invoker(delegate, 'setLabel', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })
    /**
     * The numerical order of the step
     * @name AssistantStep#stepNumber
     * @type {number}
     */

    Object.defineProperty(this, 'stepNumber', {
      get: function () {
        return invoker(delegate, 'getStepNumber', [])
      },
      set: function (val) {
        var num = util.isString(val) ? parseInt(val, 10) : val
        invoker(delegate, 'setStepNumber', [num])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    /**
     * Help text for the step
     * @name AssistantStep#helpText
     * @type {string}
     */

    Object.defineProperty(this, 'helpText', {
      get: function () {
        return invoker(delegate, 'getHelpText', [])
      },
      set: function (val) {
        invoker(delegate, 'setHelpText', [val])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    /*
     * Helper function for assistant.setCurrentStep()
     */

    Object.defineProperty(this, '_makeMeCurrentStep', {
      set: function (val) {
        if (val === assistantDelegate)
          invoker(assistantDelegate, 'setCurrentStep', [delegate])
      },
      enumerable: false,
      configurable: false,
      writeable: true
    })

    /**
     * get all sublist fields' internal ids entered by the user during this step
     * @param {Object} options
     * @param {string} options.group The internal id of the sublist
     * @return {string[]}
     */

    this.getSublistFieldIds = function getSublistFieldIds (options) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'AssistantStep.getSublistFieldIds'
      )
      var group = options
      if (utilityFunctions.isObject(options)) {
        group = options.group
      }
      utilityFunctions.checkArgs(
        [options.group],
        ['options.group'],
        'AssistantStep.getSublistFieldIds'
      )

      return invoker(delegate, 'getAllLineItemFields', [group])
    }
    /**
     * Use this method to get all sublists entered by the user during this step
     * @return {string[]}
     */

    this.getSubmittedSublistIds = function getSubmittedSublistIds () {
      return invoker(delegate, 'getAllLineItems', [])
    }
    /**
     * Get all ids for fields in the assistant step
     * @return {string[]}
     */

    this.getFieldIds = function getFieldIds () {
      return invoker(delegate, 'getAllFields', [])
    }
    /**
     * Get the value of a field
     * @param {Object} options
     * @param {string} options.id Internal id for the field
     * @return {string|string[]}
     */

    this.getValue = function getValue (options) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'AssistantStep.getValue'
      )
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'AssistantStep.getValue')
      var field = assistantDelegate.getField(options.id, options.radio || null)

      if (field && field.type === FIELD_TYPES.MULTISELECT) {
        return invoker(delegate, 'getFieldValues', [id])
      } else {
        return invoker(delegate, 'getFieldValue', [id])
      }
    }
    /**
     * Get the number of lines in a sublist
     * @param {Object} options
     * @param {string} options.group internal Id of the sublist
     * @return {number}
     */

    this.getLineCount = function getLineCount (options) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'AssistantStep.getLineCount'
      )
      var group = options
      if (utilityFunctions.isObject(options)) {
        group = options.group
      }
      utilityFunctions.checkArgs(
        [group],
        ['options.group'],
        'AssistantStep.getLineCount'
      )

      return invoker(delegate, 'getLineItemCount', [group])
    }
    /**
     * Get the value of a field in a sublist
     * @param {Object} options
     * @param {string} options.group Internal id of the sublist
     * @param {string} options.id Internal id of the field
     * @param {string} options.line line number
     * @return {string}
     */

    this.getSublistValue = function getSublistValue (options) {
      utilityFunctions.checkArgs(
        [options, options.group, options.id, options.line],
        ['options', 'options.group', 'options.id', 'options.line'],
        'AssistantStep.getSublistValue'
      )
      if (!util.isNumber(options.line))
        utilityFunctions.throwSuiteScriptError(
          error.Type.MISSING_REQD_ARGUMENT,
          'AssistantStep.getSublistValue',
          'options.line'
        )
      else if (
        options.line < 0 ||
        options.line > this.getLineCount(options) - 1
      )
        utilityFunctions.throwSuiteScriptError(
          error.Type.SSS_INVALID_SUBLIST_OPERATION,
          options.line
        )
      return invoker(delegate, 'getLineItemValue', [
        options.group,
        options.id,
        options.line + 1
      ])
    }
    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  AssistantStep.prototype = nsobject.getNewInstance()

  /**
   * Return a wrapped an nlobjAssistant
   *
   *
   * @return {Assistant}
   * @constructor
   *
   * @since 2015.2
   */

  function Assistant (delegate) {
    var clientScriptFileId
    var clientScriptModulePath
    var TYPE = 'serverWidget.Assistant'
    /**
     * the current step of the assistant
     * @name Assistant#currentStep
     * @type {AssistantStep}
     * @readonly
     */

    Object.defineProperty(this, 'currentStep', {
      get: function () {
        var del = invoker(delegate, 'getCurrentStep', [])
        return del == null ? null : Object.freeze(new AssistantStep(del, this))
      },
      set: function (val) {
        if (val == null)
          error.create({ name: 'REQUIRED_PARAM_MISSING', message: 'step' })
        val._makeMeCurrentStep = delegate
      },
      enumerable: true,
      configurable: false
    })
    /**
     * an error message for the current step. If you choose, you can use HTML tags to format the message.
     * @name Assistant#errorHtml
     * @type {string}
     */

    Object.defineProperty(this, 'errorHtml', {
      get: function () {
        return invoker(delegate, 'getError', [])
      },
      set: function (val) {
        invoker(delegate, 'setError', [val == null ? null : val.toString()])
      },
      enumerable: true,
      configurable: false
    })
    /**
     * Mark the last page in an assistant. Set the rich text to display a completion message on the last page.
     * @name Assistant#finishedHtml
     * @type {string}
     */

    Object.defineProperty(this, 'finishedHtml', {
      get: function () {
        return invoker(delegate, 'getFinishedHtml', [])
      },
      set: function (val) {
        invoker(delegate, 'setFinished', [val])
      },
      enumerable: true,
      configurable: false
    })
    /**
     * Show or hide the assistant step numbers
     * @name Assistant#hideStepNumber
     * @type {boolean}
     */

    Object.defineProperty(this, 'hideStepNumber', {
      get: function () {
        return !invoker(delegate, 'isNumbered', [])
      },
      set: function (val) {
        invoker(delegate, 'setNumbered', [!val])
      },
      enumerable: true,
      configurable: false
    })
    /**
     * Use this method to enforce a sequential ordering of assistant steps. If steps are ordered,
     * users must complete the current step before the assistant will allow them to proceed to
     * the next step. From a display perspective, ordered steps will always appear in the left
     * panel of the assistant. Note that by default, steps in an assistant are ordered.
     * @name Assistant#isNotOrdered
     * @type {boolean}
     */

    Object.defineProperty(this, 'isNotOrdered', {
      get: function () {
        return !invoker(delegate, 'isOrdered', [])
      },
      set: function (val) {
        invoker(delegate, 'setOrdered', [!val])
      },
      enumerable: true,
      configurable: false
    })
    /**
     * Overall title of the Assistant
     * @name Assistant#title
     * @type {string}
     */

    Object.defineProperty(this, 'title', {
      get: function () {
        return invoker(delegate, 'getTitle', [])
      },
      set: function (val) {
        invoker(delegate, 'setTitle', [val])
      },
      enumerable: true,
      configurable: false
    })
    /**
     * show/hide the Add to Shortcuts link that appears in the top-right corner of an assistant page.
     * @name Assistant#hideAddToShortcutsLink
     * @type {boolean}
     */

    Object.defineProperty(this, 'hideAddToShortcutsLink', {
      get: function () {
        return !invoker(delegate, 'getShortcut', [])
      },
      set: function (val) {
        invoker(delegate, 'setShortcut', [!val])
      },
      enumerable: true,
      configurable: false
    })

    /**
     * Set the default values of many fields at once
     * @param {Object[]} values
     */

    this.updateDefaultValues = function updateDefaultValues (values) {
      utilityFunctions.checkArgs(
        [values],
        ['values'],
        'Assistant.setDefaultValues'
      )
      invoker(delegate, 'setFieldValues', [values])
    }

    /**
     * The script file id to be used in the assistant
     * @name Assistant#clientScriptFileId
     * @type {number}
     */

    Object.defineProperty(this, 'clientScriptFileId', {
      get: function () {
        return clientScriptFileId
      },
      set: function (givenFileId) {
        if (!util.isNumber(givenFileId) && !util.isString(givenFileId))
          utilityFunctions.throwSuiteScriptError(
            error.Type.WRONG_PARAMETER_TYPE,
            'clientScriptFileId',
            'number or string'
          )
        if (givenFileId && clientScriptModulePath)
          utilityFunctions.throwSuiteScriptError(
            'PROPERTY_VALUE_CONFLICT',
            'clientScriptModulePath',
            'clientScriptFileId'
          )
        var cleansedFileId = serverWidgetUtility.attachClientScriptFileAndReturnFileId(
          delegate,
          'Assistant',
          givenFileId
        )
        clientScriptFileId = cleansedFileId /* This should use givenFileId, but for legacy reasons we use cleansedFileId, mutating customer-set value. */
      },
      enumerable: true,
      configurable: false
    })
    Object.defineProperty(this, 'clientScriptModulePath', {
      get: function () {
        return clientScriptModulePath
      },
      set: function (givenModulePath) {
        if (!util.isString(givenModulePath))
          utilityFunctions.throwSuiteScriptError(
            error.Type.WRONG_PARAMETER_TYPE,
            'clientScriptModulePath',
            'string'
          )
        if (givenModulePath && clientScriptFileId)
          utilityFunctions.throwSuiteScriptError(
            'PROPERTY_VALUE_CONFLICT',
            'clientScriptModulePath',
            'clientScriptFileId'
          )
        var cleansedModulePath = serverWidgetUtility.attachClientScriptFileAndReturnModulePath(
          delegate,
          'Assistant',
          givenModulePath
        )
        clientScriptModulePath = givenModulePath
      },
      enumerable: true,
      configurable: false
    })
    /**
     * set the splash screen for an assistant page.
     * @param {Object}options
     * @param {string}options.title Title of the splash screen
     * @param {string}options.text1 Text of the splash scheen
     * @param {string} [options.text2] If you want splash content to have a two-column appearance, provide content
     * in the text2 parameter.
     */

    this.setSplash = function setSplash (options) {
      utilityFunctions.checkArgs(
        [options.title, options.text1],
        ['title', 'text1'],
        'Assistant.setSplash'
      )

      if (!options.text2) options.text2 = null

      invoker(delegate, 'setSplash', [
        options.title,
        options.text1,
        options.text2
      ])
    }
    /**
     * Get a Field object from its id
     * @param {Object} options
     * @param {string} options.id Internal id for the field
     * @return {Field}
     */

    this.getField = function getField (options, radio) {
      utilityFunctions.checkArgs([options], ['options'], 'Assistant.getField')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
        radio = options.radio
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Assistant.getField')
      if (!radio) radio = null
      utilityFunctions.checkArgs([id], ['options.id'], 'Assistant.getField')
      var field = invoker(delegate, 'getField', [id, radio])
      return Object.freeze(new Field(field))
    }
    /**
     * Get a FieldGroup object from its id
     * @param {Object} options
     * @param {string} options.id Id of the field group
     * @return {FieldGroup}
     */

    this.getFieldGroup = function getFieldGroup (options) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'Assistant.getFieldGroup'
      )
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Assistant.getField')

      return Object.freeze(
        new FieldGroup(invoker(delegate, 'getFieldGroup', [id]))
      )
    }
    /**
     * Get the name of last action taken by the user
     * @return {string}
     */

    this.getLastAction = function getLastAction () {
      return invoker(delegate, 'getLastAction', [])
    }
    /**
     * get the step the last submitted action came from
     * @return {AssistantStep}
     */

    this.getLastStep = function getLastStep () {
      var lastStep = invoker(delegate, 'getLastStep', [])
      if (lastStep)
        return Object.freeze
          ? Object.freeze(new AssistantStep(lastStep, delegate))
          : new AssistantStep(lastStep, delegate)
      else return null
    }
    /**
     * Get next logical step corresponding to the user's last submitted action
     * @return {AssistantStep}
     */

    this.getNextStep = function getNextStep () {
      var nextStep = invoker(delegate, 'getNextStep', [])
      if (nextStep)
        return Object.freeze
          ? Object.freeze(new AssistantStep(nextStep, delegate))
          : new AssistantStep(nextStep, delegate)
      else return null
    }

    /**
     * Get the number of steps
     * @return {number}
     */

    this.getStepCount = function getStepCount () {
      return invoker(delegate, 'getStepCount', [])
    }
    /**
     * True if the assistant has an error set
     * @return {boolean}
     */

    this.hasErrorHtml = function hasErrorHtml () {
      return invoker(delegate, 'hasError', [])
    }
    /**
     * Is the assistant finished
     * @return {boolean}
     */

    this.isFinished = function isFinished () {
      return invoker(delegate, 'isFinished', [])
    }
    /**
     * Get the a step given its id
     * @param {Object} options
     * @param {string} options.id Id for the step
     * @return {AssistantStep}
     */

    this.getStep = function getStep (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Assistant.getStep')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Assistant.getStep')
      return Object.freeze(
        new AssistantStep(invoker(delegate, 'getStep', [id]), delegate)
      )
    }
    /**
     * Get a Sublist object from its id
     * @param {Object} options
     * @param {string} options.id Id for the sublist
     * @return {Sublist}
     */

    this.getSublist = function getSublist (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Assistant.getSublist')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Assistant.getSublist')

      return Object.freeze(new Sublist(invoker(delegate, 'getSubList', [id])))
    }

    /**
     * Add a step to the assistant
     * @param {Object} options
     * @param {string} options.id Id for the step
     * @param {string} options.label UI label for the step
     */

    this.addStep = function addStep (options, label) {
      utilityFunctions.checkArgs([options], ['options'], 'Assistant.getSublist')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
        label = options.label
      }

      utilityFunctions.checkArgs(
        [id, label],
        ['options.id', 'options.label'],
        'Assistant.addStep'
      )
      return Object.freeze(
        new AssistantStep(invoker(delegate, 'addStep', [id, label]), delegate)
      )
    }
    /**
     * Add a field to the Assistant
     * @param {Object} options
     * @param {string} options.id Id for the field
     * @param {string} options.label Label for the field
     * @param {string} options.type Type for the field
     * @param {string} [options.source] The internalId or scriptId of the source list for this field if
     * it is a select (List/Record) field.
     * @param {string} [options.container] Id for the field group of tab to place the field in
     * @returns {Field}
     */

    this.addField = function addField (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label, options.type],
        ['options', 'options.id', 'options.label', 'options.type'],
        'Assistant.addField'
      )

      if (!options.source) options.source = null
      if (!options.container) options.container = null

      var field = invoker(delegate, 'addField', [
        options.id,
        options.type,
        options.label,
        options.source,
        options.container
      ])
      return field !== null ? Object.freeze(new Field(field)) : field
    }
    /**
     * Add a field group to the assistant
     * @param {Object} options
     * @param {string} options.id Id for the field group
     * @param {string} options.label UI label for the field group
     * @return {FieldGroup}
     */

    this.addFieldGroup = function addFieldGroup (options, label) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'Assistant.addFieldGroup'
      )

      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
        label = options.label
      }

      utilityFunctions.checkArgs(
        [id, label],
        ['options.id', 'options.label'],
        'Assistant.addFieldGroup'
      )

      return Object.freeze(
        new FieldGroup(invoker(delegate, 'addFieldGroup', [id, label]))
      )
    }
    /**
     * Add a Sublist to the assistant
     * @param {Object} options
     * @param {string} options.id Id for the sublist
     * @param {string} options.label UI label for the sublist
     * @param {string} options.type Type of sublist
     * @return {Sublist}
     */

    this.addSublist = function addSublist (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label, options.type],
        ['options', 'options.id', 'options.label', 'options.type'],
        'Assistant.addSublist'
      )
      return Object.freeze(
        new Sublist(
          invoker(delegate, 'addSubList', [
            options.id,
            options.type,
            options.label
          ])
        )
      )
    }
    /**
     * Get all ids for fields in the assistant
     *
     * @return {string[]}
     */

    this.getFieldIds = function getFieldIds () {
      return invoker(delegate, 'getAllFields', [null])
    }

    /**
     * Get all field ids in the given assistant field group
     * @param {Object} options
     * @param {string} options.id Id of the field group
     * @return {string[]}
     */

    this.getFieldIdsByFieldGroup = function getFieldIds (options) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'Assistant.getFieldIdsByFieldGroup'
      )

      var fieldGroupId = options
      if (options.hasOwnProperty('id')) fieldGroupId = options.id
      utilityFunctions.checkArgs(
        [fieldGroupId],
        ['options.id'],
        'Assistant.getFieldIdsByFieldGroup'
      )

      return invoker(delegate, 'getAllFields', [fieldGroupId])
    }
    /**
     * Get all ids for field groups in the assistant
     *
     * @return {string[]}
     */

    this.getFieldGroupIds = function getFieldGroupIds () {
      return invoker(delegate, 'getAllFieldGroups', [])
    }
    /**
     * Get all ids for sublists in the assistant
     *
     * @return {string[]}
     */

    this.getSublistIds = function getSublistIds () {
      return invoker(delegate, 'getAllSubLists', [])
    }
    /**
     * Get all steps in the assistant
     *
     * @return {AssistantStep[]}
     */

    this.getSteps = function getSteps () {
      var s = invoker(delegate, 'getAllSteps', [])
      return s.map(function (el, idx, arr) {
        return Object.freeze(new AssistantStep(el, delegate))
      })
    }
    /**
     * Use this method to manage redirects in an assistant. In most cases, an assistant redirects to itself
     * The sendRedirect(response) method is like a wrapper method that performs this redirect. This method
     * also addresses the case in which one assistant redirects to another assistant. In this scenario,
     * the second assistant must return to the first assistant if the user Cancels or the user Finishes.
     * This method, when used in the second assistant, ensures that the user is redirected back to the
     * first assistant.
     * @param {Object} options
     * @param {ServerResponse} options.response
     */

    this.sendRedirect = function sendRedirect (options) {
      utilityFunctions.checkArgs(
        [options],
        ['options'],
        'Assistant.sendRedirect'
      )
      var response = options
      if (
        utilityFunctions.isObject(options) &&
        !(
          options.hasOwnProperty('toString') &&
          options.toString() === 'http.ServerResponse'
        )
      ) {
        response = options.response
      }
      utilityFunctions.checkArgs(
        [response],
        ['options.response'],
        'Assistant.sendRedirect'
      )
      response._assistantSendRedirect = { delegate: delegate }
    }
    /*
     * Helper function for http.writePage()
     */

    Object.defineProperty(this, '_writeTo', {
      set: function (val) {
        invoker(val.delegate, 'writePage', [delegate])
      },
      enumerable: false,
      configurable: false
    })

    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this)
    }
  }

  Assistant.prototype = nsobject.getNewInstance()

  /**
   * Primary object used to encapsulate a NetSuite-looking form.
   *
   *
   * @return {Form}
   * @constructor
   *
   * @since 2015.2
   */

  function Form (delegate) {
    var clientScriptFileId
    var clientScriptModulePath
    var TYPE = 'serverWidget.Form'

    /**
     * The form title
     * @name Form#title
     * @type {string}
     */

    Object.defineProperty(this, 'title', {
      get: function () {
        return invoker(delegate, 'getDisplayValue', [])
      },
      set: function (val) {
        invoker(delegate, 'setTitle', [val])
      },
      enumerable: true,
      configurable: false
    })

    /*
     * Helper function for http.writePage()
     */

    Object.defineProperty(this, '_writeTo', {
      set: function (val) {
        invoker(val.delegate, 'writePage', [delegate])
      },
      enumerable: false,
      configurable: false
    })

    /**
     * This method is called during a beforeLoad UE or a suitelet and the message is later displayed on the client side,
     * once the pageInit script is completed. The method takes either an already created Message object or the options
     * object that would be used for creating the message.
     * @param {Object} options
     * @param {message.Message} options.message the message object to be displayed in browser
     * -- or --
     * @param {Object} options the message options object as described in N/ui/message: create()
     */

    this.addPageInitMessage = function addPageInitMessage (options) {
      if (!utilityFunctions.isObject(options))
        utilityFunctions.throwSuiteScriptError(error.Type.WRONG_PARAMETER_TYPE)

      var message
      if (options.toString() === 'message.Message') message = options
      else if (
        options.hasOwnProperty('message') &&
        options.message.toString() === 'message.Message'
      )
        message = options.message
      else message = uiMsg.create(options)

      message.show({ sendToClient: true })
    }

    /**
     * Adds a button to the ui form
     *
     * @param {Object} options
     * @param {string} options.id the script id of button
     * @param {string} options.label the label of button
     * @param {string} [options.functionName] the function name to be triggered onClick for the button
     * @returns {Button}
     */

    this.addButton = function addButton (options) {
      utilityFunctions.checkArgs(
        [options.id, options.label],
        ['id', 'label'],
        'Form.addButton'
      )
      if (!options.functionName) options.functionName = null

      var button = invoker(delegate, 'addButton', [
        options.id,
        options.label,
        options.functionName
      ])
      return Object.freeze(new Button(button))
    }
    /**
     * add a credential field to the ui form
     *
     * @param {Object} options
     * @param {string} options.id the script id of field
     * @param {string} options.label the label of field
     * @param {string[]|string} options.restrictToDomains List of domains that restrict the destination domains for the credential
     * @param {string[]|string} options.restrictToScriptIds List of scripts where the credential can be used
     * @param {boolean} [options.restrictToCurrentUser=false] Restrict the use of this credential to the user that creates is
     * @param {string} [options.container] Id of the form tab where the credential is placed
     * @returns {Field}
     */

    this.addCredentialField = function addCredentialField (options) {
      utilityFunctions.checkArgs(
        [
          options,
          options.id,
          options.label,
          options.restrictToScriptIds,
          options.restrictToDomains
        ],
        [
          'options',
          'options.id',
          'options.label',
          'options.restrictToScriptIds',
          'options.restrictToDomains'
        ],
        'Form.addCredentialField'
      )
      // Must have at least one restrictToScriptIds and restrictToDomains element or the GUID will not be decryptable
      utilityFunctions.checkArgs(
        [options.restrictToScriptIds[0], options.restrictToDomains[0]],
        ['options.restrictToScriptIds', 'options.restrictToDomains'],
        'Form.addCredentialField'
      )

      if (!options.restrictToDomains) options.restrictToDomains = null
      if (!options.defaultValue) options.defaultValue = null
      if (!options.restrictToCurrentUser) options.restrictToCurrentUser = false
      if (!options.container) options.container = null
      options.restrictToScriptIds = Array.isArray(options.restrictToScriptIds)
        ? options.restrictToScriptIds
        : [options.restrictToScriptIds]
      options.restrictToDomains = Array.isArray(options.restrictToDomains)
        ? options.restrictToDomains
        : [options.restrictToDomains]

      var field = invoker(delegate, 'addCredentialField', [
        options.id,
        options.label,
        options.restrictToDomains,
        options.restrictToScriptIds,
        options.defaultValue,
        options.restrictToCurrentUser,
        options.container
      ])
      return Object.freeze(new Field(field))
    }

    /**
     * add a secret key field to the ui form
     * `
     * @param {Object} options
     * @param {string} options.id the script id of field
     * @param {string[]|string} [options.restrictToScriptIds] List of scripts where the key can be used
     * @param {boolean} [options.restrictToCurrentUser=false] Restrict the use of this key to the user that created it
     * @param {string} [options.container] Id of the form tab or group where the key is placed
     * @returns {Field}
     */

    this.addSecretKeyField = function addSecretKeyField (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label, options.restrictToScriptIds],
        [
          'options',
          'options.id',
          'options.label',
          'options.restrictToScriptIds'
        ],
        'Form.addSecretKeyField'
      )
      return Object.freeze(
        new Field(
          delegate.addSecretKeyField(
            options.id,
            options.label,
            options.restrictToScriptIds,
            options.restrictToCurrentUser,
            options.container
          )
        )
      )
    }

    /**
     * Add a field to the form
     * @param {Object} options
     * @param {string} options.id Internal id for the field
     * @param {string} options.label UI label for the field
     * @param {string} options.type Type of the field
     * @param {string} [options.source] The internalId or scriptId of the source list for this field if it is a select (List/Record) or multi-select field
     * @param {string} [options.container] Tab or Field Group to add the field to
     * @returns {Field}
     */

    this.addField = function addField (options) {
      utilityFunctions.checkArgs(
        [options.id, options.label, options.type],
        ['id', 'label', 'type'],
        'Form.addField'
      )

      if (!options.source) options.source = null
      if (!options.container) options.container = null

      var field = invoker(delegate, 'addField', [
        options.id,
        options.type,
        options.label,
        options.source,
        options.container
      ])
      return Object.freeze(new Field(field))
    }
    /**
     * Add a field group to the form
     * @param {Object} options
     * @param {string} options.id the script id for field group
     * @param {string} options.label the label for field group
     * @param {string} [options.tab] the tab where field group should be added
     *
     * @return {FieldGroup}
     */

    this.addFieldGroup = function addFieldGroup (options) {
      utilityFunctions.checkArgs(
        [options.id, options.label],
        ['id', 'label'],
        'Form.addFieldGroup'
      )
      if (!options.tab) options.tab = null

      var fieldGroup = invoker(delegate, 'addFieldGroup', [
        options.id,
        options.label,
        options.tab
      ])
      return Object.freeze(new FieldGroup(fieldGroup))
    }

    /**
     * Add a link to the form
     * @param {Object} options
     * @param {string} options.type The type of link
     * @param {string} options.title The UI label for the linl
     * @param {string} options.url The URL the link navigates to
     */

    this.addPageLink = function addPageLink (options) {
      utilityFunctions.checkArgs(
        [options, options.type, options.title, options.url],
        ['options', 'options.type', 'options.title', 'options.url'],
        'Form.addPageLink'
      )
      //TODO: LINK TYPE IS NOT USED IN THE GUTS
      invoker(delegate, 'addPageLink', [
        options.type,
        options.title,
        options.url
      ])
    }
    /**
     * Add a Sublist to the form
     * @param {Object} options
     * @param {string} options.id The internal id for the sublist
     * @param {string} options.label The ui label for the sublist
     * @param {string} options.type The type of sublist
     * @param {string} [options.tab] The id of the tab where to add the sublist to
     * @return {Sublist}
     */

    this.addSublist = function addSublist (options) {
      utilityFunctions.checkArgs(
        [options.id, options.label, options.type],
        ['id', 'label', 'type'],
        'Form.addSublist'
      )
      if (!options.tab) options.tab = null

      var sublist = invoker(delegate, 'addSubList', [
        options.id,
        options.type,
        options.label,
        options.tab
      ])
      return Object.freeze(new Sublist(sublist))
    }
    /**
     * Add a Subtab to the form
     * @param {Object} options
     * @param {string} options.id The internal id for the sub tab
     * @param {string} options.label The UI label for the sub tab
     * @param {string} [options.tab] The tab under which to display this subtab. If empty, it is added to the main tab.
     * @return {Tab}
     */

    this.addSubtab = function addSubtab (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label],
        ['options', 'options.id', 'label'],
        'Form.addSubtab'
      )

      if (!options.tab) options.tab = null

      var tab = invoker(delegate, 'addSubTab', [
        options.id,
        options.label,
        options.tab
      ])
      return Object.freeze(new Tab(tab))
    }

    /**
     * Add a Tab to the form
     * @param {Object} options
     * @param {string} options.id The internal id for the Tab
     * @param {string} options.label The UI label for the tab
     * @return {Tab}
     */

    this.addTab = function addTab (options, label) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.addTab')

      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
        label = options.label
      }
      utilityFunctions.checkArgs(
        [id, label],
        ['options.id', 'options.label'],
        'Form.addTab'
      )

      var tab = invoker(delegate, 'addTab', [id, label])
      return Object.freeze(new Tab(tab))
    }
    /**
     * Add a Reset button to the form
     * @param {Object} [options]
     * @param {string} [options.label] The UI label used for this button. If no label is provided, the label defaults to Reset.
     * @return {Button}
     */

    this.addResetButton = function addResetButton (options) {
      var label = options
      if (utilityFunctions.isObject(options)) {
        label = options.label
      }
      var button = invoker(delegate, 'addResetButton', [label || null])
      return Object.freeze(new Button(button))
    }
    /**
     * Add a Submit button to the form
     * @param {Object} [options]
     * @param {string} [options.label] The UI label for this button. If no label is provided, the label defaults to Save.
     * @return {Button}
     */

    this.addSubmitButton = function addSubmitButton (options) {
      var label = options
      if (utilityFunctions.isObject(options)) {
        label = options.label
      }

      var button = invoker(delegate, 'addSubmitButton', [label || null])
      return Object.freeze(new Button(button))
    }
    /**
     * Get a Button object from its id
     * @param {Object} options
     * @param {string} options.id The id of the button to get
     * @return {Button}
     */

    this.getButton = function getButton (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.getButton')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Form.getButton')

      var button = invoker(delegate, 'getButton', [id])
      return button !== null ? Object.freeze(new Button(button)) : null
    }
    /**
     * Get a Field object from its id
     * @param {Object} options
     * @param {string} options.id The id for the field to get
     * @return {Field}
     */

    this.getField = function getField (options, radio) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.getField')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
        radio = options.radio
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Form.getField')
      if (!radio) radio = null

      var field = invoker(delegate, 'getField', [id, radio])
      return field !== null ? Object.freeze(new Field(field)) : null
    }
    /**
     * Get a Subtab object from its id
     * @param {Object} options
     * @param {string} options.id The id for the Tab to get
     * @return {Tab}
     */

    this.getSubtab = function getSubtab (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.getSubtab')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Form.getSubtab')

      var tab = invoker(delegate, 'getSubTab', [id])
      return tab !== null ? Object.freeze(new Tab(tab)) : null
    }
    /**
     * Get a Subtab object from its id
     * @param {Object} options
     * @param {string} options.id The id for the Tab to get
     * @return {Tab}
     */

    this.getTab = function getTab (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.getTab')

      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Form.getTab')

      var tab = invoker(delegate, 'getTab', [id])
      return tab !== null ? Object.freeze(new Tab(tab)) : null
    }
    /**
     * Get all the Tab objects
     * @return {Tab[]}
     */

    this.getTabs = function getTabs () {
      return invoker(delegate, 'getTabs', [])
    }
    /**
     * Get a Sublist object from its id
     * @param {Object} options
     * @param {string} options.id The id for the Sublist to get
     * @return {Sublist}
     */

    this.getSublist = function getSublist (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.getSublist')
      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Form.getSublist')

      var sublist = invoker(delegate, 'getSubList', [id])
      return sublist === null ? sublist : Object.freeze(new Sublist(sublist))
    }
    /**
     * Insert a field before another field
     * @param {Object} options
     * @param {Field} options.field The field to insert
     * @param {string} options.nextfield Id of the field to insert before
     */

    this.insertField = function insertField (options, nextfield) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.insertField')

      var field = options
      if (
        utilityFunctions.isObject(options) &&
        !(
          options.hasOwnProperty('toString') &&
          options.toString() === 'serverWidget.Field'
        )
      ) {
        field = options.field
        nextfield = options.nextfield
      }
      utilityFunctions.checkArgs(
        [field, nextfield],
        ['options.field, options.nextfield'],
        'Form.insertField'
      )

      field._insertField = { delegate: delegate, nextfield: nextfield }
    }
    /**
     * Insert a sublist before another sublist
     * @param {Object} options
     * @param {Sublist} options.sublist Sublist to insert
     * @param {string} options.nextsublist Id of the sublist to insert before
     */

    this.insertSublist = function insertSublist (options, nextsublist) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.insertSublist')

      var sublist = options
      if (
        utilityFunctions.isObject(options) &&
        !(
          options.hasOwnProperty('toString') &&
          options.toString() === 'serverWidget.Sublist'
        )
      ) {
        sublist = options.sublist
        nextsublist = options.nextsublist
      }
      utilityFunctions.checkArgs(
        [sublist, nextsublist],
        ['options.sublist, options.nextsublist'],
        'Form.insertSublist'
      )

      sublist._insertSublist = { delegate: delegate, nextsublist: nextsublist }
    }
    /**
     * Insert a subtab before another sublist
     * @param {Object} options
     * @param {Subtab} options.subtab Subtab to insert
     * @param {string} options.nextsub The id of the sublist/subtab you are inserting in front of
     */

    this.insertSubtab = function insertSubtab (options, nextsub) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.insertSubtab')

      var subtab = options
      if (
        utilityFunctions.isObject(options) &&
        !(
          options.hasOwnProperty('toString') &&
          options.toString() === 'serverWidget.Tab'
        )
      ) {
        subtab = options.subtab
        nextsub = options.nextsub
      }
      utilityFunctions.checkArgs(
        [subtab, nextsub],
        ['options.subtab, options.nextsub'],
        'Form.insertSubtab'
      )

      subtab._insertSubtab = { delegate: delegate, nextsub: nextsub }
    }
    /**
     * Insert a Tab before another tab
     * @param {Object} options
     * @param {Tab} options.tab Tab to insert
     * @param {string} options.nexttab Id of the tab to insert before
     */

    this.insertTab = function insertTab (options, nexttab) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.insertTab')

      var tab = options
      if (utilityFunctions.isObject(options)) {
        tab = options.tab
        nexttab = options.nexttab
      }
      utilityFunctions.checkArgs(
        [tab, nexttab],
        ['options.tab, options.nexttab'],
        'Form.insertTab'
      )

      tab._insertTab = { delegate: delegate, nexttab: nexttab }
    }
    /**
     * Remove a button given its id
     * @param {Object} options
     * @param {string} options.id Id of the button to remove
     */

    this.removeButton = function removeButton (options) {
      utilityFunctions.checkArgs([options], ['options'], 'Form.removeButton')

      var id = options
      if (utilityFunctions.isObject(options)) {
        id = options.id
      }
      utilityFunctions.checkArgs([id], ['options.id'], 'Form.removeButton')

      invoker(delegate, 'removeButton', [id])
    }
    /**
     * Set the default values of many fields at once
     * @param {Object[]} values
     */

    this.updateDefaultValues = function updateDefaultValues (values) {
      utilityFunctions.checkArgs([values], ['values'], 'Form.setDefaultValues')
      invoker(delegate, 'setDefaultValues', [values])
    }
    /**
     * The script file id to be used in the form
     * @name Form#clientScriptFileId
     * @type {number}
     */

    Object.defineProperty(this, 'clientScriptFileId', {
      get: function () {
        return clientScriptFileId
      },
      set: function (givenFileId) {
        if (givenFileId && clientScriptModulePath)
          utilityFunctions.throwSuiteScriptError(
            'PROPERTY_VALUE_CONFLICT',
            'clientScriptModulePath',
            'clientScriptFileId'
          )
        var cleansedFileId = serverWidgetUtility.attachClientScriptFileAndReturnFileId(
          delegate,
          'Form',
          givenFileId
        )
        clientScriptFileId = cleansedFileId /* This should use givenFileId, but for legacy reasons we use cleansedFileId, mutating customer-set value. */
      },
      enumerable: true,
      configurable: false
    })
    Object.defineProperty(this, 'clientScriptModulePath', {
      get: function () {
        return clientScriptModulePath
      },
      set: function (givenModulePath) {
        if (givenModulePath && clientScriptFileId)
          utilityFunctions.throwSuiteScriptError(
            'PROPERTY_VALUE_CONFLICT',
            'clientScriptModulePath',
            'clientScriptFileId'
          )
        var cleansedModulePath = serverWidgetUtility.attachClientScriptFileAndReturnModulePath(
          delegate,
          'Form',
          givenModulePath
        )
        clientScriptModulePath = givenModulePath
      },
      enumerable: true,
      configurable: false
    })
    this.toString = function toString () {
      return TYPE
    }
    this.toJSON = function toJSON () {
      return _toJSON.call(this, TYPE)
    }
  }

  Form.prototype = nsobject.getNewInstance()

  /* Module functions */

  function createForm (config, hideNavBar) {
    utilityFunctions.checkArgs([config], ['config'], 'serverWidget.createForm')
    var title = config
    if (utilityFunctions.isObject(config)) {
      title = config.title
      hideNavBar = config.hideNavBar
    }
    utilityFunctions.checkArgs(
      [title],
      ['config.title'],
      'serverWidget.createForm'
    )
    if (!hideNavBar) hideNavBar = false
    return Object.freeze(
      new Form(
        invoker(serverWidgetApi, 'nlapiCreateForm', [
          title,
          marshalUtil.nsObjectToMap({ hideHeader: hideNavBar })
        ])
      )
    )
  }
  
  function createAssistant (config, hideNavBar) {
    utilityFunctions.checkArgs(
      [config],
      ['config'],
      'serverWidget.createAssistant'
    )

    var title = config
    if (utilityFunctions.isObject(config)) {
      title = config.title
      hideNavBar = config.hideNavBar
    }
    utilityFunctions.checkArgs(
      [title],
      ['config.title'],
      'serverWidget.createAssistant'
    )
    if (!hideNavBar) hideNavBar = false
    return Object.freeze(
      new Assistant(
        invoker(serverWidgetApi, 'nlapiCreateAssistant', [
          title,
          marshalUtil.nsObjectToMap({ hideHeader: hideNavBar })
        ])
      )
    )
  }

  /**
   * Primary object used to encapsulate a list page
   *
   * @return {List}
   * @constructor
   *
   * @since 2015.2
   */

  function List (delegate, listTitle) {
    var listStyle
    var clientScriptFileId
    var clientScriptModulePath

    /**
     * Sets the display style for this list
     * @name List#style
     * @type string
     * @since 2015.2
     */

    Object.defineProperty(this, 'style', {
      get: function () {
        return listStyle
      },
      set: function (val) {
        listStyle = val
        invoker(delegate, 'setStyle', [listStyle])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    /**
     * List title
     * @name List#title
     * @type string
     * @since 2015.2
     */

    Object.defineProperty(this, 'title', {
      get: function () {
        return listTitle
      },
      set: function (val) {
        listTitle = val
        invoker(delegate, 'setTitle', [listTitle])
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    Object.defineProperty(this, '_writeTo', {
      set: function (val) {
        invoker(val.delegate, 'writePage', [delegate])
      },
      enumerable: false,
      configurable: false,
      writeable: true
    })

    /**
     * Add a Button to the list page
     *
     * @param {Object} options
     * @param {string} options.id the script id for button
     * @param {string} options.label the ui label of button
     * @param {string} [options.functionName] the function name to be triggered onClick for the button
     * @returns {Button}
     */

    this.addButton = function addButton (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label],
        ['options', 'options.id', 'options.label'],
        'List.addButton'
      )
      if (!options.functionName) options.functionName = null

      var button = invoker(delegate, 'addButton', [
        options.id,
        options.label,
        options.functionName
      ])
      return Object.freeze(new Button(button))
    }

    /**
     * Add a Column to the List page
     * @param {Object} options
     * @param {string} options.id The internal id for the column
     * @param {string} options.type The type for the column
     * @param {string} options.label The ui label for the column
     * @param {string} [options.align] The layout justification for this column.
     * @return {ListColumn}
     */

    this.addColumn = function addColumn (options) {
      utilityFunctions.checkArgs(
        [options, options.id, options.label, options.type],
        ['options', 'options.id', 'options.label', 'options.type'],
        'List.addColumn'
      )

      if (!options.align) options.align = null

      return Object.freeze(
        new ListColumn(
          invoker(delegate, 'addColumn', [
            options.id,
            options.type,
            options.label,
            options.align
          ]),
          options.id,
          options.type,
          options.label
        )
      )
    }

    /**
     * Add an Edit or Edit/View column
     * @param {Object} options
     * @param {ListColumn} options.column The Edit/View column is added to the left of this column
     * @param {boolean} [options.showView] If true then an Edit/View column will be added. Otherwise only an Edit column will be added.
     * @param {string} [options.showHrefCol] - If set, this value must be included in row data provided for the
     * list and will be used to determine whether the URL for this link is clickable
     * @param {string} [options.link] The target of Edit/View link
     * @param {string} [options.linkParam] If set, this value must be included in row data provided for the
     * list and will be appended to link as url parameter (defaults to column)
     * @param {string} [options.linkParamName] Name of the url link parameter (defauls to 'id' if not set)
     * @return {ListColumn}
     */

    this.addEditColumn = function addEditColumn (options) {
      if (!options || !utilityFunctions.isObject(options))
        utilityFunctions.throwSuiteScriptError(
          error.Type.MISSING_REQD_ARGUMENT,
          'List.addEditColumn',
          'options'
        )
      if (!options.column)
        utilityFunctions.throwSuiteScriptError(
          error.Type.MISSING_REQD_ARGUMENT,
          'List.addEditColumn',
          'options.column'
        )
      if (!options.showView || !util.isBoolean(options.showView))
        options.showView = false
      if (!options.showHrefCol || !util.isString(options.showHrefCol))
        options.showHrefCol = null
      if (!options.link || !util.isString(options.link)) options.link = null
      if (!options.linkParam || !util.isString(options.linkParam))
        options.linkParam = null
      if (!options.linkParamName || !util.isString(options.linkParamName))
        options.linkParamName = null

      var editColumn = options.column
      if (editColumn.hasOwnProperty('_javaListColumn')) {
        editColumn = options.column._javaListColumn
      }

      return Object.freeze(
        new ListColumn(
          invoker(delegate, 'addEditColumn', [
            editColumn,
            options.showView,
            options.showHrefCol,
            options.link,
            options.linkParam,
            options.linkParamName
          ])
        )
      )
    }

    /**
     * Adds a navigation cross-link to the list page
     * @param {Object} options
     * @param {string} options.type The type of link to add: breadcrumb or crosslink
     * @param {string} options.title The UI text displayed in the link
     * @param {string} options.url The URL used for this link
     * @return {List}
     */

    this.addPageLink = function addPageLink (options) {
      utilityFunctions.checkArgs(
        [options, options.type, options.title, options.url],
        ['options', 'options.type', 'options.title', 'options.url'],
        'List.addPageLink'
      )
      invoker(delegate, 'addPageLink', [
        options.type,
        options.title,
        options.url
      ])
      return this
    }

    /**
     * Add a row (Array of name/value pairs or search.Result)
     * @param {Object} options
     * @param {string} options.row An Array of rows containing name/value pairs containing the values for corresponding
     * @return {List}
     */

    this.addRow = function addRow (options) {
      var row = options
      if (options.hasOwnProperty('row')) {
        row = options.row
      }
      utilityFunctions.checkArgs([row], ['options.row'], 'List.addRow')

      if (row.hasOwnProperty('toString') && row.toString() === 'search.Result')
        row = row._saveToTemplateRenderer
      invoker(delegate, 'addRow', [row])
      return this
    }

    /**
     * Adds multiple rows (Array of search.Result or name/value pair Arrays)
     * @param {Object} options
     * @param {string} options.rows Array of search.Result or name/value pair Arrays
     * @return {List}
     */

    this.addRows = function addRows (options) {
      var rows = options
      if (
        utilityFunctions.isObject(options) &&
        options.hasOwnProperty('rows')
      ) {
        rows = options.rows
      }
      utilityFunctions.checkArgs([rows], ['options.rows'], 'List.addRows')
      if (
        rows.hasOwnProperty('toString') &&
        rows.toString() === 'search.ResultSet'
      ) {
        rows = rows._getResultset
      } else if (util.isArray(rows)) {
        for (var i = 0; rows && i < rows.length; i++) {
          if (
            rows[i].hasOwnProperty('toString') &&
            rows[i].toString() === 'search.Result'
          )
            rows[i] = rows[i]._saveToTemplateRenderer
        }
      }
      invoker(delegate, 'addRows', [rows])
      return this
    }

    /**
     * The script file id to be used in the list page
     * @name List#clientScriptFileId
     * @type {number}
     */

    Object.defineProperty(this, 'clientScriptFileId', {
      get: function () {
        return clientScriptFileId
      },
      set: function (givenFileId) {
        if (givenFileId && clientScriptModulePath)
          utilityFunctions.throwSuiteScriptError(
            'PROPERTY_VALUE_CONFLICT',
            'clientScriptModulePath',
            'clientScriptFileId'
          )
        var cleansedFileId = serverWidgetUtility.attachClientScriptFileAndReturnFileId(
          delegate,
          'List',
          givenFileId
        )
        clientScriptFileId = cleansedFileId /* This should use givenFileId, but for legacy reasons we use cleansedFileId, mutating customer-set value. */
      },

      enumerable: true,
      configurable: false
    })
    Object.defineProperty(this, 'clientScriptModulePath', {
      get: function () {
        return clientScriptModulePath
      },
      set: function (givenModulePath) {
        if (givenModulePath && clientScriptFileId)
          utilityFunctions.throwSuiteScriptError(
            'PROPERTY_VALUE_CONFLICT',
            'clientScriptModulePath',
            'clientScriptFileId'
          )
        var cleansedModulePath = serverWidgetUtility.attachClientScriptFileAndReturnModulePath(
          delegate,
          'List',
          givenModulePath
        )
        clientScriptModulePath = givenModulePath
      },

      enumerable: true,
      configurable: false
    })
    function toJSON () {
      return {
        title: listTitle,
        style: listStyle
      }
    }

    function toString () {
      return 'serverWidget.List'
    }
  }

  List.prototype = nsobject.getNewInstance()

  /**
   * Return a wrapped an nlobjListColumn
   *
   *
   * @return {ListColumn}
   * @constructor
   *
   * @since 2015.2
   */

  function ListColumn (delegate, lcId, lcType, lcLabel) {
    /**
     * Adds a URL parameter (optionally defined per row) to the list column's URL
     * @param {Object} options
     * @param {string} options.param Name for the parameter
     * @param {string} options.value Value for the parameter
     * @param {string} [options.dynamic] If true, then the parameter value is actually an alias that is calculated per row
     * @return {ListColumn}
     */

    this.addParamToURL = function addParamToURL (options) {
      utilityFunctions.checkArgs(
        [options, options.param, options.value],
        ['options', 'options.param', 'options.value'],
        'ListColumn.addParamToURL'
      )

      if (!options.dynamic || !util.isBoolean(options.dynamic))
        options.dynamic = false

      invoker(delegate, 'addParamToURL', [
        options.param,
        options.value,
        options.dynamic
      ])
      return this
    }

    /**
     * @name ColumnList#label Label this list column
     * @type {string} string
     */

    Object.defineProperty(this, 'label', {
      get: function () {
        return lcLabel
      },
      set: function (val) {
        lcLabel = val
        invoker(delegate, 'setLabel', [lcLabel])
        return delegate
      },
      enumerable: true,
      configurable: false,
      writeable: true
    })

    /**
     * Sets the base URL for the list column
     * @param {Object} options
     * @param {string} options.url The base url or a column in the data source that returs the
     * base url for each row
     * @param {string} [options.dynamic] If true, then the URL is actually an alias that is calculated per row
     * @return {ListColumn}
     */

    this.setURL = function setURL (options, dynamic) {
      var url = options
      if (utilityFunctions.isObject(options) && options.hasOwnProperty('url')) {
        url = options.url
        dynamic = options.dynamic
      }
      utilityFunctions.checkArgs([url], ['options.url'], 'ColumnList.setUrl')

      if (!util.isBoolean(dynamic)) dynamic = false
      invoker(delegate, 'setURL', [url, dynamic || false])
      return this
    }

    Object.defineProperty(this, '_javaListColumn', {
      get: function () {
        return delegate
      },
      enumerable: false,
      configurable: false,
      writeable: false
    })

    function toJSON () {
      return {
        id: lcId,
        type: lcType,
        label: lcLabel
      }
    }

    function toString () {
      return 'serverWidget.ListColumn'
    }
  }

  ListColumn.prototype = nsobject.getNewInstance()

  /* Module functions */

  function createList (config, hideNavBar) {
    utilityFunctions.checkArgs([config], ['config'], 'serverWidget.createList')
    var title = config
    if (utilityFunctions.isObject(config) && config.hasOwnProperty('title')) {
      title = config.title
      hideNavBar = config.hideNavBar
    }
    utilityFunctions.checkArgs(
      [title],
      ['config.title'],
      'serverWidget.createList'
    )
    if (!hideNavBar) hideNavBar = false

    return Object.freeze(
      new List(
        invoker(serverWidgetApi, 'nlapiCreateList', [
          title,
          marshalUtil.nsObjectToMap({ hideHeader: hideNavBar })
        ]),
        title
      )
    )
  }

  /** @alias N/serverWidget */

  return Object.freeze({
    /**
     * Instantiate a assistant object (specifying the title, and whether to hide the menu)
     * @restriction Server SuiteScript only
     * @param {Object} config
     * @param {string} config.title form title
     * @param {boolean} config.hideNavBar (optional)
     * @return {Assistant}
     * @since 2015.2
     */

    createAssistant: createAssistant,
    /**
     * Instantiate a form object (specifying the title, and whether to hide the menu)
     * @restriction Server SuiteScript only
     * @param {Object} config
     * @param {string} config.title form title
     * @param {boolean} config.hideNavBar (optional)
     * @return {Form}
     * @since 2015.2
     */

    createForm: createForm,
    /**
     * Instantiate a List object (specifying the title, and whether to hide the navigation bar)
     * @restriction This API is available to Suitelets only.
     * @param {Object} config
     * @param {string} config.title list title
     * @param {boolean} [config.hideNavBa]
     * @return {List}
     * @since 2015.2
     */

    createList: createList,
    _createForm: function (delegate) {
      return Object.freeze(new Form(delegate))
    },
    _ListColumn: Object.freeze(ListColumn),
    _Field: Object.freeze(Field),
    _Button: Object.freeze(Button),
    /**
     * @enum
     */

    FieldType: FIELD_TYPES,
    /**
     * @enum
     */

    FormPageLinkType: PAGE_LINK_TYPES,
    /**
     * @enum
     */

    SublistType: SUBLIST_TYPES,
    /**
     * @enum
     */

    FieldBreakType: FIELD_BREAK_TYPES,
    /**
     * @enum
     */

    FieldLayoutType: FIELD_LAYOUT_TYPES,
    /**
     * @enum
     */

    FieldDisplayType: FIELD_DISPLAY_TYPE,
    /**
     * @enum
     */

    SublistDisplayType: SUBLIST_DISPLAY_TYPE,
    /**
     * @enum
     */

    LayoutJustification: LAYOUT_JUSTIFICATION,
    /**
     * @enum
     */

    ListStyle: LIST_STYLES,
    /**
     * @enum
     */

    AssistantSubmitAction: ASSISTANT_SUBMIT_ACTION
  })
})

//# sourceURL=suitescript/resources/javascript//serverWidget.js

"use strict";
(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["WebhookModalNew0.0.1"],{

/***/ "./src/js/react/components/ErrorBoundary/index.js":
/*!********************************************************!*\
  !*** ./src/js/react/components/ErrorBoundary/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // From: https://blog.logrocket.com/async-rendering-react-suspense/
// Error boundaries currently have to be classes.

var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary() {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasError: false,
      error: null
    });

    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true,
        error: error
      };
    }
  }]);

  return ErrorBoundary;
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/js/react/views/webhooks/ModalNew.js":
/*!*************************************************!*\
  !*** ./src/js/react/views/webhooks/ModalNew.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/select-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _RequestMethodValues__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./RequestMethodValues */ "./src/js/react/views/webhooks/RequestMethodValues.js");
/* harmony import */ var _RequestFormatValues__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./RequestFormatValues */ "./src/js/react/views/webhooks/RequestFormatValues.js");
/* harmony import */ var _RequestHeadersValues__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RequestHeadersValues */ "./src/js/react/views/webhooks/RequestHeadersValues.js");
/* harmony import */ var _RequestHeaderFields__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./RequestHeaderFields */ "./src/js/react/views/webhooks/RequestHeaderFields.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-unused-vars */

















/**
 * Retrieve a webhook or create dummy ID if creating a new one.
 *
 * @param {number} id          The ID of the webhook to retrieve.
 * @param {string} nonce       The nonce for the request.
 * @param {number} modalNumber The number of the modal.
 * @return {Promise} The promise for the request.
 */

var retrieveWebhook = function retrieveWebhook() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var nonce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var modalNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if ('' === nonce) {
    nonce = sceWebhooks.get_webhook_nonce;
  }

  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_retrieve_webhook', {
    webhook_id: id,
    nonce: nonce
  });
};

var ModalNew = function ModalNew(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.modalNumber),
      _useState2 = _slicedToArray(_useState, 2),
      modalNumber = _useState2[0],
      setModalNumber = _useState2[1];

  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveWebhook, props.id, props.nonce, modalNumber),
      _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
      defaults = _useAsyncResource2[0],
      getDefaults = _useAsyncResource2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading Webhook', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14___default()), {
      color: '#9c68b0',
      loading: true,
      cssOverride: true,
      size: 25,
      speedMultiplier: 0.65
    }))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Interface, _extends({
    defaults: defaults
  }, props)));
};

var Interface = function Interface(props) {
  var _errors$name2, _errors$webhookUrl2;

  var defaults = props.defaults,
      onSave = props.onSave;
  var response = defaults();
  var _response$data = response.data,
      data = _response$data.data,
      success = _response$data.success;

  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      saving = _useState4[0],
      setSaving = _useState4[1];

  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSaved = _useState6[0],
      setIsSaved = _useState6[1];

  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useForm)({
    defaultValues: {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('New Webhook', 'comment-edit-pro'),
      webhookUrl: '',
      webhookEnabled: true,
      requestMethod: 'POST',
      requestFormat: 'JSON',
      requestHeaders: [{
        label: '',
        value: '',
        customName: '',
        customValue: ''
      }],
      requestBody: [{
        key: '',
        value: '',
        customValue: ''
      }],
      sendApprovedComments: true,
      sendPendingComments: false,
      sendSpamComments: false,
      sendDeletedComments: false,
      sendEditedComments: false
    }
  }),
      register = _useForm.register,
      control = _useForm.control,
      handleSubmit = _useForm.handleSubmit,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      reset = _useForm.reset,
      setError = _useForm.setError;

  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useWatch)({
    control: control
  });

  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useFormState)({
    control: control
  }),
      errors = _useFormState.errors,
      isDirty = _useFormState.isDirty,
      dirtyFields = _useFormState.dirtyFields,
      touchedFields = _useFormState.touchedFields;

  var _useFieldArray = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useFieldArray)({
    control: control,
    name: 'requestHeaders'
  }),
      requestHeadersFields = _useFieldArray.fields,
      appendRequestHeaders = _useFieldArray.append,
      removeRequestHeaders = _useFieldArray.remove;

  var _useFieldArray2 = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useFieldArray)({
    control: control,
    name: 'requestBody'
  }),
      requestBodyFields = _useFieldArray2.fields,
      appendRequestBody = _useFieldArray2.append,
      removeRequestBody = _useFieldArray2.remove;
  /**
   * Set the form values when the data is retrieved.
   */


  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (data) {
      reset(data.form);
    }
  }, [data]);

  var hasErrors = function hasErrors() {
    return Object.keys(errors).length > 0;
  };

  var onSubmit = function onSubmit(formData) {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_save_webhook', _objectSpread({
      nonce: data.nonce,
      webhook_id: data.webhook_id
    }, formData)).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        setIsSaved(true);
        setTimeout(function () {
          setIsSaved(false);
          props.onSave(ajaxData);
        }, 3000);
      } else {}
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setSaving(false);
    });
  };

  var getSaveIcon = function getSaveIcon() {
    if (saving) {
      return _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"];
    }

    if (isSaved) {
      return _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__["default"];
    }

    return false;
  };

  var getSaveText = function getSaveText() {
    if (saving) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'quotes-dlx');
    }

    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saved', 'quotes-dlx');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Webhook', 'quotes-dlx');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "form-table sce-form-table-modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "name",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref) {
      var _errors$name;

      var field = _ref.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], _extends({}, field, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Name', 'comment-edit-pro'),
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
          'has-error': 'required' === ((_errors$name = errors.name) === null || _errors$name === void 0 ? void 0 : _errors$name.type),
          'is-required': true
        }),
        "aria-required": "true",
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add a name for this webhook to easily identify it in the list of webhooks.', 'comment-edit-pro')
      }));
    }
  }), 'required' === ((_errors$name2 = errors.name) === null || _errors$name2 === void 0 ? void 0 : _errors$name2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enabled', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "webhookEnabled",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
          _onChange = _ref2$field.onChange,
          value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__toggle-control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enabled', 'comment-edit-pro'),
        checked: value,
        onChange: function onChange(methodValue) {
          _onChange(methodValue);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook URL', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "webhookUrl",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref3) {
      var _errors$webhookUrl;

      var field = _ref3.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], _extends({}, field, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook URL', 'comment-edit-pro'),
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
          'has-error': 'required' === ((_errors$webhookUrl = errors.webhookUrl) === null || _errors$webhookUrl === void 0 ? void 0 : _errors$webhookUrl.type),
          'is-required': true
        }),
        "aria-required": "true",
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the URL of the webhook you want to send data to.', 'comment-edit-pro')
      }));
    }
  }), 'required' === ((_errors$webhookUrl2 = errors.webhookUrl) === null || _errors$webhookUrl2 === void 0 ? void 0 : _errors$webhookUrl2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Method', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "requestMethod",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref4) {
      var _ref4$field = _ref4.field,
          _onChange2 = _ref4$field.onChange,
          value = _ref4$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_18__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Method', 'comment-edit-pro'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select how the Webhook should send data to the URL.', 'comment-edit-pro'),
        value: value,
        options: _RequestMethodValues__WEBPACK_IMPORTED_MODULE_10__["default"],
        onChange: function onChange(methodValue) {
          _onChange2(methodValue);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Format', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "requestFormat",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref5) {
      var _ref5$field = _ref5.field,
          _onChange3 = _ref5$field.onChange,
          value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_18__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Format', 'comment-edit-pro'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select how the Webhook should format the data sent to the URL.', 'comment-edit-pro'),
        value: value,
        options: _RequestFormatValues__WEBPACK_IMPORTED_MODULE_11__["default"],
        onChange: function onChange(methodValue) {
          _onChange3(methodValue);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Headers', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater__row sce-admin__values-repeater__row-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater__row__key"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name', 'comment-edit-pro'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater__row__key"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Value', 'comment-edit-pro'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null)), requestHeadersFields.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row",
      key: item.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row__key"
    }, 'custom' === getValues("requestHeaders[".concat(index, "].name")) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestHeaders[".concat(index, "].customName"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref6) {
        var _errors$requestHeader, _errors$requestHeader2, _errors$requestHeader3;

        var _ref6$field = _ref6.field,
            _onChange4 = _ref6$field.onChange,
            value = _ref6$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
          value: value !== null && value !== void 0 ? value : '',
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$requestHeader = errors.requestHeaders) === null || _errors$requestHeader === void 0 ? void 0 : (_errors$requestHeader2 = _errors$requestHeader[index]) === null || _errors$requestHeader2 === void 0 ? void 0 : (_errors$requestHeader3 = _errors$requestHeader2.customName) === null || _errors$requestHeader3 === void 0 ? void 0 : _errors$requestHeader3.type),
            'is-required': true
          }),
          "aria-required": "true",
          onChange: function onChange(methodValue) {
            _onChange4(methodValue);
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__text-control-reset button-reset",
      icon: "no-alt",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
      onClick: function onClick() {
        setValue("requestHeaders[".concat(index, "].name"), 'none');
      },
      showTooltip: false
    })), 'custom' !== getValues("requestHeaders[".concat(index, "].name")) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestHeaders[".concat(index, "].name"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref7) {
        var _ref7$field = _ref7.field,
            _onChange5 = _ref7$field.onChange,
            value = _ref7$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_18__["default"], {
          value: value,
          options: _RequestHeadersValues__WEBPACK_IMPORTED_MODULE_12__["default"],
          onChange: function onChange(methodValue) {
            _onChange5(methodValue);
          }
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row__value"
    }, 'custom' === getValues("requestHeaders[".concat(index, "].value")) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestHeaders[".concat(index, "].customValue"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref8) {
        var _errors$requestHeader4, _errors$requestHeader5, _errors$requestHeader6;

        var _ref8$field = _ref8.field,
            _onChange6 = _ref8$field.onChange,
            value = _ref8$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
          value: value !== null && value !== void 0 ? value : '',
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$requestHeader4 = errors.requestHeaders) === null || _errors$requestHeader4 === void 0 ? void 0 : (_errors$requestHeader5 = _errors$requestHeader4[index]) === null || _errors$requestHeader5 === void 0 ? void 0 : (_errors$requestHeader6 = _errors$requestHeader5.customValue) === null || _errors$requestHeader6 === void 0 ? void 0 : _errors$requestHeader6.type),
            'is-required': true
          }),
          "aria-required": "true",
          onChange: function onChange(methodValue) {
            _onChange6(methodValue);
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__text-control-reset button-reset",
      icon: "no-alt",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
      onClick: function onClick() {
        setValue("requestHeaders[".concat(index, "].value"), 'none');
      },
      showTooltip: false
    })), 'custom' !== getValues("requestHeaders[".concat(index, "].value")) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestHeaders[".concat(index, "].value"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref9) {
        var _ref9$field = _ref9.field,
            _onChange7 = _ref9$field.onChange,
            value = _ref9$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_18__["default"], {
          value: value,
          options: _RequestHeaderFields__WEBPACK_IMPORTED_MODULE_13__["default"],
          onChange: function onChange(methodValue) {
            _onChange7(methodValue);
          }
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row__actions"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
      icon: "plus",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Request Header', 'comment-edit-pro'),
      onClick: function onClick() {
        appendRequestHeaders(index);
      },
      showTooltip: false
    }), requestHeadersFields.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
      icon: "minus",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove Request Header', 'comment-edit-pro'),
      onClick: function onClick() {
        removeRequestHeaders(index);
      },
      showTooltip: false
    })));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Body', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater__row sce-admin__values-repeater__row-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater__row__key"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Key', 'comment-edit-pro'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__values-repeater__row__key"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Value', 'comment-edit-pro'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null)), requestBodyFields.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row",
      key: item.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row__key"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestBody[".concat(index, "].key"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref10) {
        var _errors$requestBody, _errors$requestBody$i, _errors$requestBody$i2;

        var _ref10$field = _ref10.field,
            _onChange8 = _ref10$field.onChange,
            value = _ref10$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
          value: value !== null && value !== void 0 ? value : '',
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$requestBody = errors.requestBody) === null || _errors$requestBody === void 0 ? void 0 : (_errors$requestBody$i = _errors$requestBody[index]) === null || _errors$requestBody$i === void 0 ? void 0 : (_errors$requestBody$i2 = _errors$requestBody$i.key) === null || _errors$requestBody$i2 === void 0 ? void 0 : _errors$requestBody$i2.type),
            'is-required': true
          }),
          "aria-required": "true",
          onChange: function onChange(methodValue) {
            _onChange8(methodValue);
          }
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row__value"
    }, 'custom' === getValues("requestBody[".concat(index, "].value")) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestBody[".concat(index, "].customValue"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref11) {
        var _errors$requestBody2, _errors$requestBody2$, _errors$requestBody2$2;

        var _ref11$field = _ref11.field,
            _onChange9 = _ref11$field.onChange,
            value = _ref11$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
          value: value !== null && value !== void 0 ? value : '',
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$requestBody2 = errors.requestBody) === null || _errors$requestBody2 === void 0 ? void 0 : (_errors$requestBody2$ = _errors$requestBody2[index]) === null || _errors$requestBody2$ === void 0 ? void 0 : (_errors$requestBody2$2 = _errors$requestBody2$.customValue) === null || _errors$requestBody2$2 === void 0 ? void 0 : _errors$requestBody2$2.type),
            'is-required': true
          }),
          "aria-required": "true",
          onChange: function onChange(methodValue) {
            _onChange9(methodValue);
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__text-control-reset button-reset",
      icon: "no-alt",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
      onClick: function onClick() {
        setValue("requestBody[".concat(index, "].value"), 'none');
      },
      showTooltip: false
    })), 'custom' !== getValues("requestBody[".concat(index, "].value")) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "requestBody[".concat(index, "].value"),
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref12) {
        var _ref12$field = _ref12.field,
            _onChange10 = _ref12$field.onChange,
            value = _ref12$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_18__["default"], {
          value: value,
          options: _RequestHeaderFields__WEBPACK_IMPORTED_MODULE_13__["default"],
          onChange: function onChange(methodValue) {
            _onChange10(methodValue);
          }
        });
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin__values-repeater__row__actions"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
      icon: "plus",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Request Body', 'comment-edit-pro'),
      onClick: function onClick() {
        appendRequestBody(index);
      },
      showTooltip: false
    }), requestBodyFields.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
      icon: "minus",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove Request Body', 'comment-edit-pro'),
      onClick: function onClick() {
        removeRequestBody(index);
      },
      showTooltip: false
    })));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Triggers', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-panel-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "sendApprovedComments",
    control: control,
    render: function render(_ref13) {
      var _ref13$field = _ref13.field,
          _onChange11 = _ref13$field.onChange,
          value = _ref13$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__toggle-control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Approved Comments', 'comment-edit-pro'),
        checked: value,
        onChange: function onChange(methodValue) {
          _onChange11(methodValue);
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-panel-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "sendPendingComments",
    control: control,
    render: function render(_ref14) {
      var _ref14$field = _ref14.field,
          _onChange12 = _ref14$field.onChange,
          value = _ref14$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__toggle-control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Pending (Moderated) Comments', 'comment-edit-pro'),
        checked: value,
        onChange: function onChange(methodValue) {
          _onChange12(methodValue);
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-panel-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "sendSpamComments",
    control: control,
    render: function render(_ref15) {
      var _ref15$field = _ref15.field,
          _onChange13 = _ref15$field.onChange,
          value = _ref15$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__toggle-control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Spam Comments', 'comment-edit-pro'),
        checked: value,
        onChange: function onChange(methodValue) {
          _onChange13(methodValue);
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-panel-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "sendDeletedComments",
    control: control,
    render: function render(_ref16) {
      var _ref16$field = _ref16.field,
          _onChange14 = _ref16$field.onChange,
          value = _ref16$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__toggle-control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Deleted Comments', 'comment-edit-pro'),
        checked: value,
        onChange: function onChange(methodValue) {
          _onChange14(methodValue);
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-panel-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "sendEditedComments",
    control: control,
    render: function render(_ref17) {
      var _ref17$field = _ref17.field,
          _onChange15 = _ref17$field.onChange,
          value = _ref17$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__toggle-control",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Edited Comments', 'comment-edit-pro'),
        checked: value,
        onChange: function onChange(methodValue) {
          _onChange15(methodValue);
        }
      });
    }
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-primary qdlx__btn--icon-right', {
      'has-error': hasErrors()
    }, {
      'has-icon': saving || isSaved
    }, {
      'is-saving': saving && !isSaved
    }, {
      'is-saved': isSaved
    }),
    type: "submit",
    text: getSaveText(),
    icon: getSaveIcon(),
    iconSize: "18",
    iconPosition: "right",
    disabled: saving
  })), hasErrors() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
    status: "error",
    politeness: "polite"
  }), isSaved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalNew);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestFormatValues.js":
/*!************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestFormatValues.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var RequestFormatValues = [{
  value: 'json',
  label: 'JSON'
}, {
  value: 'form',
  label: 'FORM'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestFormatValues);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestHeaderFields.js":
/*!************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestHeaderFields.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");

var RequestHeaderFields = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a Field', 'comment-edit-pro'),
  value: 'none'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Commenter Name', 'comment-edit-pro'),
  value: 'commenter_name'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Commenter Email', 'comment-edit-pro'),
  value: 'commenter_email'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Commenter Website', 'comment-edit-pro'),
  value: 'commenter_website'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Content', 'comment-edit-pro'),
  value: 'comment_content'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment ID', 'comment-edit-pro'),
  value: 'comment_id'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Parent ID', 'comment-edit-pro'),
  value: 'comment_parent_id'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Post ID', 'comment-edit-pro'),
  value: 'comment_post_id'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Post Title', 'comment-edit-pro'),
  value: 'comment_post_title'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Post URL', 'comment-edit-pro'),
  value: 'comment_post_url'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Author IP', 'comment-edit-pro'),
  value: 'comment_author_ip'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Author User Agent', 'comment-edit-pro'),
  value: 'comment_author_user_agent'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Date', 'comment-edit-pro'),
  value: 'comment_date'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Date GMT', 'comment-edit-pro'),
  value: 'comment_date_gmt'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Approved', 'comment-edit-pro'),
  value: 'comment_approved'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Comment Type', 'comment-edit-pro'),
  value: 'comment_type'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Value', 'comment-edit-pro'),
  value: 'custom'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestHeaderFields);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestHeadersValues.js":
/*!*************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestHeadersValues.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");

var RequestHeadersValues = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a Name', 'comment-edit-pro'),
  value: 'none'
}, {
  label: 'Accept',
  value: 'Accept-Charset'
}, {
  label: 'Accept-Charset',
  value: 'Accept-Charset'
}, {
  label: 'Accept-Encoding',
  value: 'Accept-Encoding'
}, {
  label: 'Accept-Language',
  value: 'Accept-Language'
}, {
  label: 'Accept-Datetime',
  value: 'Accept-Datetime'
}, {
  label: 'Authorization',
  value: 'Authorization'
}, {
  label: 'Cache-Control',
  value: 'Cache-Control'
}, {
  label: 'Connection',
  value: 'Connection'
}, {
  label: 'Cookie',
  value: 'Cookie'
}, {
  label: 'Content-Length',
  value: 'Content-Length'
}, {
  label: 'Content-Type',
  value: 'Content-Type'
}, {
  label: 'Date',
  value: 'Date'
}, {
  label: 'Expect',
  value: 'Expect'
}, {
  label: 'Forwarded',
  value: 'Forwarded'
}, {
  label: 'From',
  value: 'From'
}, {
  label: 'Host',
  value: 'Host'
}, {
  label: 'If-Match',
  value: 'If-Match'
}, {
  label: 'If-Modified-Since',
  value: 'If-Modified-Since'
}, {
  label: 'If-None-Match',
  value: 'If-None-Match'
}, {
  label: 'If-Range',
  value: 'If-Range'
}, {
  label: 'If-Unmodified-Since',
  value: 'If-Unmodified-Since'
}, {
  label: 'Max-Forwards',
  value: 'Max-Forwards'
}, {
  label: 'Origin',
  value: 'Origin'
}, {
  label: 'Pragma',
  value: 'Pragma'
}, {
  label: 'Proxy-Authorization',
  value: 'Proxy-Authorization'
}, {
  label: 'Range',
  value: 'Range'
}, {
  label: 'Referer',
  value: 'Referer'
}, {
  label: 'TE',
  value: 'TE'
}, {
  label: 'User-Agent',
  value: 'User-Agent'
}, {
  label: 'Upgrade',
  value: 'Upgrade'
}, {
  label: 'Via',
  value: 'Via'
}, {
  label: 'Warning',
  value: 'Warning'
}, {
  label: 'Custom Name',
  value: 'custom'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestHeadersValues);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestMethodValues.js":
/*!************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestMethodValues.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var RequestMethodValues = [{
  value: 'GET',
  label: 'GET'
}, {
  value: 'POST',
  label: 'POST'
}, {
  value: 'PUT',
  label: 'PUT'
}, {
  value: 'PATCH',
  label: 'PATCH'
}, {
  value: 'DELETE',
  label: 'DELETE'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestMethodValues);

/***/ })

}]);
//# sourceMappingURL=WebhookModalNew0.0.1.chunk.bundle.js.map
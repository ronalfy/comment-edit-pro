"use strict";
(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["Recaptcha0.0.3"],{

/***/ "./src/js/react/views/spam-protection/Recapcha.js":
/*!********************************************************!*\
  !*** ./src/js/react/views/spam-protection/Recapcha.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/range-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Context */ "./src/js/react/views/spam-protection/Context.js");
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














var retrieveRecaptchaSettings = function retrieveRecaptchaSettings() {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_get_recaptcha_options', {
    nonce: sceSpamProtection.get_nonce
  });
};
var Recaptcha = function Recaptcha(props) {
  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveRecaptchaSettings, []),
    _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
    defaults = _useAsyncResource2[0],
    getDefaults = _useAsyncResource2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load reCAPTCHA 3 Settings.', 'comment-edit-pro'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Recaptcha', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_11___default()), {
      color: '#9c68b0',
      loading: true,
      cssOverride: true,
      size: 25,
      speedMultiplier: 0.65
    }))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Interface, _extends({
    defaults: defaults
  }, props))));
};
var Interface = function Interface(props) {
  var defaults = props.defaults;
  var response = defaults();
  var _response$data = response.data,
    data = _response$data.data,
    success = _response$data.success;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    saving = _useState2[0],
    setSaving = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSaved = _useState4[0],
    setIsSaved = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    resetting = _useState6[0],
    setResetting = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isReset = _useState8[0],
    setIsReset = _useState8[1];
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Context__WEBPACK_IMPORTED_MODULE_10__["default"]),
    turnstileEnabled = _useContext.turnstileEnabled,
    setRecaptchaEnabled = _useContext.setRecaptchaEnabled;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setRecaptchaEnabled(data.recaptchaEnabled);
  }, [data.recaptchaEnabled]);
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_12__.useForm)({
      defaultValues: {
        recaptchaEnabled: data.recaptchaEnabled,
        recaptchaSiteKey: data.recaptchaSiteKey,
        recaptchaSecretKey: data.recaptchaSecretKey,
        recaptchaLoggedInUsersEnabled: data.recaptchaLoggedInUsersEnabled,
        recaptchaScoreThreshold: data.recaptchaScoreThreshold
      }
    }),
    register = _useForm.register,
    control = _useForm.control,
    handleSubmit = _useForm.handleSubmit,
    setValue = _useForm.setValue,
    getValues = _useForm.getValues,
    reset = _useForm.reset,
    setError = _useForm.setError;
  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_12__.useWatch)({
    control: control
  });
  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_12__.useFormState)({
      control: control
    }),
    errors = _useFormState.errors,
    isDirty = _useFormState.isDirty,
    dirtyFields = _useFormState.dirtyFields,
    touchedFields = _useFormState.touchedFields;
  var hasErrors = function hasErrors() {
    return Object.keys(errors).length > 0;
  };
  var onSubmit = function onSubmit(formData) {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_save_recaptcha_options', _objectSpread({
      nonce: sceSpamProtection.save_nonce
    }, formData)).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsSaved(true);
        setTimeout(function () {
          setIsSaved(false);
        }, 3000);
      } else {}
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setSaving(false);
    });
  };
  var handleReset = function handleReset() {
    setResetting(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_reset_recaptcha_options', {
      nonce: sceSpamProtection.reset_nonce
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsReset(true);
        reset({
          recaptchaEnabled: false,
          recaptchaSiteKey: '',
          recaptchaSecretKey: '',
          recaptchaLoggedInUsersEnabled: true
        });
        setTimeout(function () {
          setIsReset(false);
        }, 3000);
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setResetting(false);
    });
  };
  var getSiteKey = function getSiteKey() {
    var _errors$recaptchaSite2;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Site Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "recaptchaSiteKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref) {
        var _errors$recaptchaSite;
        var field = _ref.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Recaptcha 3 Site Key', 'quotes-dlx')
        }, field, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$recaptchaSite = errors.recaptchaSiteKey) === null || _errors$recaptchaSite === void 0 ? void 0 : _errors$recaptchaSite.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Recaptcha 3 Site Key', 'comment-edit-pro'),
          "aria-required": "true"
        }));
      }
    }), 'required' === ((_errors$recaptchaSite2 = errors.recaptchaSiteKey) === null || _errors$recaptchaSite2 === void 0 ? void 0 : _errors$recaptchaSite2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };
  var getSecretKey = function getSecretKey() {
    var _errors$recaptchaSecr;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secret Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "recaptchaSecretKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref2) {
        var _errors$recaptchaSite3;
        var field = _ref2.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Recaptcha 3 Secret Key', 'quotes-dlx')
        }, field, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$recaptchaSite3 = errors.recaptchaSiteKey) === null || _errors$recaptchaSite3 === void 0 ? void 0 : _errors$recaptchaSite3.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Recaptcha 3 Secret Key', 'comment-edit-pro'),
          "aria-required": "true"
        }));
      }
    }), 'required' === ((_errors$recaptchaSecr = errors.recaptchaSecretKey) === null || _errors$recaptchaSecr === void 0 ? void 0 : _errors$recaptchaSecr.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };
  var getLoggedInToggle = function getLoggedInToggle() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Logged-in Users', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "recaptchaLoggedInUsersEnabled",
      control: control,
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
          _onChange = _ref3$field.onChange,
          value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Recaptcha for Logged-in Users', 'comment-edit-pro'),
          className: "sce-admin__toggle-control",
          checked: value,
          onChange: function onChange(boolValue) {
            _onChange(boolValue);
          },
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can exclude logged-in users from Recaptcha with this setting.', 'comment-edit-pro')
        });
      }
    })));
  };
  var getRecaptchaThreshold = function getRecaptchaThreshold() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('reCAPTCHA Threshold', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "recaptchaScoreThreshold",
      control: control,
      render: function render(_ref4) {
        var _ref4$field = _ref4.field,
          _onChange2 = _ref4$field.onChange,
          value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Set reCAPTCHA Minimum Threshold', 'comment-edit-pro'),
          step: 0.05,
          value: value,
          max: 1,
          min: 0,
          currentInput: value,
          initialPosition: value,
          allowReset: true,
          className: "sce-admin__range-control",
          onChange: function onChange(recaptchaThreshold) {
            _onChange2(recaptchaThreshold);
          },
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The threshold score is between 0 and 1. The higher the score, the higher the chance of a successful reCAPTCHA challenge. The default value is 0.5. Meaning that the reCAPTCHA challenge will succeed if the score is greater than or equal to 0.5.', 'comment-edit-pro'),
          trackColor: "#8019c4",
          railColor: "#dad4eb"
        }));
      }
    })));
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
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Recaptcha Options', 'quotes-dlx');
  };
  var getResetText = function getResetText() {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'quotes-dlx');
    }
    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'quotes-dlx');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From Recaptcha', 'quotes-dlx');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Recaptcha', 'comment-edit-pro'), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/recaptcha-3-support"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Using Recaptcha 3, you can further protect from bots and spam.', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "form-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Recaptcha', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "recaptchaEnabled",
    control: control,
    render: function render(_ref5) {
      var _ref5$field = _ref5.field,
        _onChange3 = _ref5$field.onChange,
        value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Recaptcha 3', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          setRecaptchaEnabled(boolValue);
          _onChange3(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or disable Recaptcha 3 support.', 'comment-edit-pro')
      });
    }
  }), turnstileEnabled && getValues('recaptchaEnabled') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('It is not recommended to have both reCAPTCHA 3 and Cloudflare Turnstile enabled.', 'comment-edit-pro'),
    status: "warning",
    politeness: "polite"
  })))), getValues('recaptchaEnabled') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getSiteKey(), getSecretKey(), getLoggedInToggle(), getRecaptchaThreshold()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
  }), getValues('recaptchaEnabled') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-danger qdlx__btn--icon-right', {
      'has-icon': resetting
    }, {
      'is-resetting': {
        resetting: resetting
      }
    }),
    type: "button",
    text: getResetText(),
    icon: resetting ? _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"] : false,
    iconSize: "18",
    iconPosition: "right",
    disabled: saving || resetting,
    onClick: function onClick(e) {
      setResetting(true);
      handleReset(e);
    }
  })), hasErrors() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
    status: "error",
    politeness: "polite"
  }), isSaved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  }), isReset && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been reset.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recaptcha);

/***/ })

}]);
//# sourceMappingURL=Recaptcha0.0.3.chunk.bundle.js.map
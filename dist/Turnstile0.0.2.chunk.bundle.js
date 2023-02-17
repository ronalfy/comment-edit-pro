"use strict";
(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["Turnstile0.0.2"],{

/***/ "./src/js/react/views/spam-protection/Turnstile.js":
/*!*********************************************************!*\
  !*** ./src/js/react/views/spam-protection/Turnstile.js ***!
  \*********************************************************/
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
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/select-control/index.js");
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















var retrieveTurnstileSettings = function retrieveTurnstileSettings() {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_get_turnstile_options', {
    nonce: sceSpamProtection.get_nonce
  });
};

var Turnstile = function Turnstile(props) {
  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveTurnstileSettings, []),
      _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
      defaults = _useAsyncResource2[0],
      getDefaults = _useAsyncResource2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load Turnstile Settings.', 'comment-edit-pro'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloudflare Turnstile', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_11___default()), {
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
  var _errors$turnstileSite2, _errors$turnstileSecr2, _errors$turnstileComm2;

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
      recaptchaEnabled = _useContext.recaptchaEnabled,
      setTurnstileEnabled = _useContext.setTurnstileEnabled;

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setTurnstileEnabled(data.turnstileEnabled);
  }, [data.recaptchaEnabled]);

  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_12__.useForm)({
    defaultValues: {
      turnstileEnabled: data.turnstileEnabled,
      turnstileSitekey: data.turnstileSitekey,
      turnstileSecret: data.turnstileSecret,
      turnstileTheme: data.turnstileTheme,
      turnstileLanguage: data.turnstileLanguage,
      turnstileWidgetSize: data.turnstileWidgetSize,
      turnstileCommentSubmitButtonId: data.turnstileCommentSubmitButtonId,
      turnstileLoggedInUsersEnabled: data.turnstileLoggedInUsersEnabled
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
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_save_turnstile_options', _objectSpread({
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
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_reset_turnstile_options', {
      nonce: sceSpamProtection.reset_nonce
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        setIsReset(true);
        reset(ajaxData);
        setTimeout(function () {
          setIsReset(false);
        }, 3000);
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setResetting(false);
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

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Turnstile Options', 'quotes-dlx');
  };

  var getResetText = function getResetText() {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'quotes-dlx');
    }

    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'quotes-dlx');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From Turnstile', 'quotes-dlx');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloudflare Turnstile', 'comment-edit-pro'), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/recaptcha-3-support"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloudflare Turnstile is an alternative captcha that is designed for privacy and user experience.', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "form-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Turnstile', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileEnabled",
    control: control,
    render: function render(_ref) {
      var _ref$field = _ref.field,
          _onChange = _ref$field.onChange,
          value = _ref$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Cloudflare Turnstile', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          setTurnstileEnabled(boolValue);

          _onChange(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or disable the Cloudflare Turnstile integration.', 'comment-edit-pro')
      });
    }
  }), recaptchaEnabled && getValues('turnstileEnabled') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('It is not recommended to have both reCAPTCHA 3 and Cloudflare Turnstile enabled.', 'comment-edit-pro'),
    status: "warning",
    politeness: "polite"
  })))), getValues('turnstileEnabled') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Logged-in Users', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, getValues('turnstileLoggedInUsersEnabled'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileLoggedInUsersEnabled",
    control: control,
    render: function render(_ref2) {
      var _ref2$field = _ref2.field,
          _onChange2 = _ref2$field.onChange,
          value = _ref2$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Cloudflare Turnstile for Logged-in Users', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          _onChange2(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can exclude logged-in users from Cloudflare Turnstile with this setting.', 'comment-edit-pro')
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Keys', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileSitekey",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref3) {
      var _errors$turnstileSite;

      var field = _ref3.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sitekey', 'quotes-dlx')
      }, field, {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
          'has-error': 'required' === ((_errors$turnstileSite = errors.turnstileSitekey) === null || _errors$turnstileSite === void 0 ? void 0 : _errors$turnstileSite.type),
          'is-required': true
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Turnstile sitekey.', 'comment-edit-pro'),
        "aria-required": "true"
      }));
    }
  }), 'required' === ((_errors$turnstileSite2 = errors.turnstileSitekey) === null || _errors$turnstileSite2 === void 0 ? void 0 : _errors$turnstileSite2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileSecret",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref4) {
      var _errors$turnstileSecr;

      var field = _ref4.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secret Key', 'quotes-dlx')
      }, field, {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
          'has-error': 'required' === ((_errors$turnstileSecr = errors.turnstileSecret) === null || _errors$turnstileSecr === void 0 ? void 0 : _errors$turnstileSecr.type),
          'is-required': true
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Turnstile secret key.', 'comment-edit-pro'),
        "aria-required": "true"
      }));
    }
  }), 'required' === ((_errors$turnstileSecr2 = errors.turnstileSecret) === null || _errors$turnstileSecr2 === void 0 ? void 0 : _errors$turnstileSecr2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Language', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileTheme",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref5) {
      var _ref5$field = _ref5.field,
          _onChange3 = _ref5$field.onChange,
          value = _ref5$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Language', 'comment-edit-pro'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select the language of the widget.', 'comment-edit-pro'),
        value: value,
        options: [
        /* auto, ar-eg, de, en, es, fa, fr, id, it, ja, ko, nl, pl, pt-br, ru, tr, zh-cn, zh-tw */
        {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto', 'comment-edit-pro'),
          value: 'auto'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Arabic', 'comment-edit-pro'),
          value: 'ar-eg'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('German', 'comment-edit-pro'),
          value: 'de'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('English', 'comment-edit-pro'),
          value: 'en'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Spanish', 'comment-edit-pro'),
          value: 'es'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Persian', 'comment-edit-pro'),
          value: 'fa'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('French', 'comment-edit-pro'),
          value: 'fr'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Indonesian', 'comment-edit-pro'),
          value: 'id'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Italian', 'comment-edit-pro'),
          value: 'it'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Japanese', 'comment-edit-pro'),
          value: 'ja'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Korean', 'comment-edit-pro'),
          value: 'ko'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dutch', 'comment-edit-pro'),
          value: 'nl'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Polish', 'comment-edit-pro'),
          value: 'pl'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Portuguese', 'comment-edit-pro'),
          value: 'pt-br'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Russian', 'comment-edit-pro'),
          value: 'ru'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Turkish', 'comment-edit-pro'),
          value: 'tr'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Chinese (Simplified)', 'comment-edit-pro'),
          value: 'zh-cn'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Chinese (Traditional)', 'comment-edit-pro'),
          value: 'zh-tw'
        }],
        onChange: function onChange(widgetThemeValue) {
          _onChange3(widgetThemeValue);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Appearance', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileTheme",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref6) {
      var _ref6$field = _ref6.field,
          _onChange4 = _ref6$field.onChange,
          value = _ref6$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Appearance', 'comment-edit-pro'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select the theme for the widget.', 'comment-edit-pro'),
        value: value,
        options: [
        /* light, dark, auto */
        {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto', 'comment-edit-pro'),
          value: 'auto'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Light', 'comment-edit-pro'),
          value: 'light'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Dark', 'comment-edit-pro'),
          value: 'dark'
        }],
        onChange: function onChange(widgetThemeValue) {
          _onChange4(widgetThemeValue);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Size', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileWidgetSize",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref7) {
      var _ref7$field = _ref7.field,
          _onChange5 = _ref7$field.onChange,
          value = _ref7$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Size', 'comment-edit-pro'),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select the size for the widget.', 'comment-edit-pro'),
        value: value,
        options: [
        /* normal, compact */
        {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Normal', 'comment-edit-pro'),
          value: 'normal'
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Compact', 'comment-edit-pro'),
          value: 'compact'
        }],
        onChange: function onChange(widgetSizeValue) {
          _onChange5(widgetSizeValue);
        }
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Comment Submit Button ID', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "turnstileCommentSubmitButtonId",
    control: control,
    rules: {
      required: true
    },
    render: function render(_ref8) {
      var _errors$turnstileComm;

      var field = _ref8.field;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Submit Comment Button ID', 'quotes-dlx')
      }, field, {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
          'has-error': 'required' === ((_errors$turnstileComm = errors.turnstileCommentSubmitButtonId) === null || _errors$turnstileComm === void 0 ? void 0 : _errors$turnstileComm.type),
          'is-required': true
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter the CSS/HTML ID for the comment form button so Cloudflare Turnstile can target the correct button.', 'comment-edit-pro'),
        "aria-required": "true"
      }));
    }
  }), 'required' === ((_errors$turnstileComm2 = errors.turnstileCommentSubmitButtonId) === null || _errors$turnstileComm2 === void 0 ? void 0 : _errors$turnstileComm2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
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
  }), getValues('turnstileEnabled') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Turnstile);

/***/ })

}]);
//# sourceMappingURL=Turnstile0.0.2.chunk.bundle.js.map
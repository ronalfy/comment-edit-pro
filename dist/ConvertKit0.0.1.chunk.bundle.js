"use strict";
(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["ConvertKit0.0.1"],{

/***/ "./src/js/react/views/integrations/ConvertKit.js":
/*!*******************************************************!*\
  !*** ./src/js/react/views/integrations/ConvertKit.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/radio-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/checkbox-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
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














var retrieveConvertKitOptions = function retrieveConvertKitOptions() {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_get_convertkit_options', {
    nonce: sceIntegrations.ck_get_nonce
  });
};

var ConvertKit = function ConvertKit(props) {
  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveConvertKitOptions, []),
      _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
      defaults = _useAsyncResource2[0],
      getDefaults = _useAsyncResource2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load ConvertKit Settings.', 'comment-edit-pro'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_10___default()), {
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

  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      credentialsRefreshing = _useState10[0],
      setCredentialsRefreshing = _useState10[1];

  console.log(data);

  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_11__.useForm)({
    defaultValues: {
      enableConvertKit: data.enableConvertKit,
      apiValid: data.apiValid,
      apiKey: data.apiKey,
      secretKey: data.secretKey,
      signUpLabel: data.signUpLabel,
      checkboxEnabled: data.checkboxEnabled,
      formOrTag: data.formOrTag,
      forms: data.forms,
      tags: data.tags,
      selectedForm: data.selectedForm,
      selectedTags: data.selectedTags
    }
  }),
      register = _useForm.register,
      control = _useForm.control,
      handleSubmit = _useForm.handleSubmit,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      reset = _useForm.reset,
      setError = _useForm.setError;

  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_11__.useWatch)({
    control: control
  });

  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_11__.useFormState)({
    control: control
  }),
      errors = _useFormState.errors,
      isDirty = _useFormState.isDirty,
      dirtyFields = _useFormState.dirtyFields,
      touchedFields = _useFormState.touchedFields;
  /**
   * Check if we need to re-connect or initially connect to the ConvertKit API.
   *
   * @return {boolean} true if we need to re-connect, false if not.
   */


  var needsCredentialRefresh = function needsCredentialRefresh() {
    if (!getValues('apiValid')) {
      return true;
    }

    if (isDirty && (dirtyFields.apiKey || dirtyFields.secretKey)) {
      return true;
    }

    return false;
  };

  var hasErrors = function hasErrors() {
    return Object.keys(errors).length > 0;
  };

  var onSubmit = function onSubmit(formData) {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_save_convertkit_options', _objectSpread({
      nonce: sceIntegrations.ck_save_nonce
    }, formData)).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var forms = ajaxData.forms,
            tags = ajaxData.tags;
        var newFormValues = [];
        forms.forEach(function (keys, index) {
          newFormValues.push(keys);
        });
        var newTagValues = [];
        tags.forEach(function (keys, index) {
          newTagValues.push(keys);
        });
        setValue('forms', newFormValues);
        setValue('tags', newTagValues);
        setIsSaved(true);
        setTimeout(function () {
          setIsSaved(false);
        }, 3000);
      } else {
        setError('apiKey', {
          type: 'noForms',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setSaving(false);
    });
  };

  var onRefreshCredentials = function onRefreshCredentials(formData) {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_refresh_convertkit_connection', _objectSpread({
      nonce: sceIntegrations.ck_refresh_nonce
    }, formData)).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var forms = ajaxData.forms,
            tags = ajaxData.tags,
            apiValid = ajaxData.apiValid;
        var newFormValues = [];
        forms.forEach(function (keys, index) {
          newFormValues.push(keys);
        });
        var newTagValues = [];
        tags.forEach(function (keys, index) {
          newTagValues.push(keys);
        });
        var updatedFormValues = {
          forms: newFormValues,
          tags: newTagValues,
          apiValid: apiValid
        };
        reset(_objectSpread(_objectSpread({}, formValues), updatedFormValues), {
          keepErrors: false,
          keepDirty: false
        });
      } else {
        setValue('apiValid', false);
        setError('apiKey', {
          type: 'noForms',
          message: ajaxData.message
        });
        setError('secretKey', {
          type: 'noForms',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setSaving(false);
    });
  };

  var handleReset = function handleReset() {
    setResetting(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_reset_convertkit_options', {
      nonce: sceIntegrations.reset_nonce
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        setIsReset(true);
        reset({
          enableMailchimp: false,
          mailchimpServerPrefix: '',
          apiKey: '',
          mailchimpLists: [],
          selectedList: '',
          signUpLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up for Updates', 'comment-edit-pro')
        });
        setTimeout(function () {
          setIsReset(false);
        }, 3000);
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setResetting(false);
    });
  };

  var getNewsletterLabel = function getNewsletterLabel() {
    var _errors$signUpLabel2;

    if (!getValues('selectedList')) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Label', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "signUpLabel",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref) {
        var _errors$signUpLabel;

        var field = _ref.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({}, field, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign-up Label', 'comment-edit-pro'),
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$signUpLabel = errors.signUpLabel) === null || _errors$signUpLabel === void 0 ? void 0 : _errors$signUpLabel.type),
            'is-required': true
          }),
          "aria-required": "true",
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This text will be shown in the comment section when a user leaves a comment.', 'comment-edit-pro')
        }));
      }
    }), 'required' === ((_errors$signUpLabel2 = errors.signUpLabel) === null || _errors$signUpLabel2 === void 0 ? void 0 : _errors$signUpLabel2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };

  var getSignupCheckbox = function getSignupCheckbox() {
    if (!getValues('selectedList')) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "checkboxEnabled",
      control: control,
      render: function render(_ref2) {
        var _ref2$field = _ref2.field,
            _onChange = _ref2$field.onChange,
            value = _ref2$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox Checked', 'comment-edit-pro'),
          className: "sce-admin__toggle-control",
          checked: value,
          onChange: function onChange(boolValue) {
            _onChange(boolValue);
          },
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Check the sign-up checkbox by default (not recommended).', 'comment-edit-pro')
        });
      }
    })));
  };
  /**
   * Gets the form or tag radio option.
   *
   * @return {JSX.Element} Form or tags interface.
   */


  var getFormOrTag = function getFormOrTag() {
    if (needsCredentialRefresh()) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Forms or Tags', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "formOrTag",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
            _onChange2 = _ref3$field.onChange,
            value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Subscribers to Forms or Tags', 'comment-edit-pro'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select whether to add new subscribers to a an existing ConvertKit form or tag(s).', 'comment-edit-pro'),
          selected: getValues('formOrTag'),
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Forms', 'comment-edit-pro'),
            value: 'form'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tags', 'comment-edit-pro'),
            value: 'tag'
          }],
          onChange: function onChange(formOrTagValue) {
            _onChange2(formOrTagValue);
          }
        });
      }
    })));
  };

  var getConvertKitForms = function getConvertKitForms() {
    var _errors$selectedForm;

    var convertKitForms = getValues('forms');

    if (convertKitForms.length === 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Forms', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "convertKitForms",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref4) {
        var _ref4$field = _ref4.field,
            _onChange3 = _ref4$field.onChange,
            value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a form for your subscribers', 'comment-edit-pro'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a default form that will be used when signing up your subscribers.', 'comment-edit-pro'),
          selected: getValues('selectedForm'),
          options: getValues('forms'),
          onChange: function onChange(formSelectedValue) {
            _onChange3(formSelectedValue);

            setValue('selectedForm', formSelectedValue);
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "selectedForm",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref5) {
        var field = _ref5.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({}, field, {
          type: "hidden",
          "aria-hidden": "true"
        }));
      }
    }), 'required' === ((_errors$selectedForm = errors.selectedForm) === null || _errors$selectedForm === void 0 ? void 0 : _errors$selectedForm.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };

  var getConvertKitTags = function getConvertKitTags() {
    var convertKitTags = getValues('tags');

    if (convertKitTags.length === 0 || 'tag' !== getValues('formOrTag')) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Tags', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, convertKitTags.length > 0 && convertKitTags.map(function (tag) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
        key: tag.id,
        name: "convertKitTags",
        control: control,
        rules: {
          required: true
        },
        render: function render(_ref6) {
          var _ref6$field = _ref6.field,
              _onChange4 = _ref6$field.onChange,
              value = _ref6$field.value;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
            label: tag.name,
            checked: value,
            onChange: function onChange(tagSelectedValue) {
              _onChange4(tagSelectedValue);
            }
          });
        }
      });
    })));
  };

  var getAPIKey = function getAPIKey() {
    var _errors$apiKey2, _errors$apiKey3, _errors$apiKey4;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('API Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "apiKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref7) {
        var _errors$apiKey;

        var field = _ref7.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit API Key', 'comment-edit-pro')
        }, field, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$apiKey = errors.apiKey) === null || _errors$apiKey === void 0 ? void 0 : _errors$apiKey.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your ConvertKit API Key in order to choose a form or tag.', 'comment-edit-pro'),
          "aria-required": "true"
        }));
      }
    }), 'required' === ((_errors$apiKey2 = errors.apiKey) === null || _errors$apiKey2 === void 0 ? void 0 : _errors$apiKey2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'noForms' === ((_errors$apiKey3 = errors.apiKey) === null || _errors$apiKey3 === void 0 ? void 0 : _errors$apiKey3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$apiKey4 = errors.apiKey) === null || _errors$apiKey4 === void 0 ? void 0 : _errors$apiKey4.message,
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };

  var getSecretKey = function getSecretKey() {
    var _errors$secretKey, _errors$secretKey2;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secret Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
      name: "secretKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref8) {
        var _errors$apiKey5;

        var field = _ref8.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Secret Key', 'comment-edit-pro')
        }, field, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$apiKey5 = errors.apiKey) === null || _errors$apiKey5 === void 0 ? void 0 : _errors$apiKey5.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your ConvertKit Secret Key in order to choose a form or tag.', 'comment-edit-pro'),
          "aria-required": "true"
        }));
      }
    }), 'required' === ((_errors$secretKey = errors.secretKey) === null || _errors$secretKey === void 0 ? void 0 : _errors$secretKey.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'noForms' === ((_errors$secretKey2 = errors.secretKey) === null || _errors$secretKey2 === void 0 ? void 0 : _errors$secretKey2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No ConvertKit forms or tags for the API key were found.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
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
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'comment-edit-pro');
    }

    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saved', 'comment-edit-pro');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save ConvertKit Options', 'comment-edit-pro');
  };

  var getRefreshCredentialsText = function getRefreshCredentialsText() {
    if (saving) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connecting…', 'comment-edit-pro');
    }

    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connected', 'comment-edit-pro');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connect to ConvertKit', 'comment-edit-pro');
  };

  var getResetText = function getResetText() {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'comment-edit-pro');
    }

    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'comment-edit-pro');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From ConvertKit', 'comment-edit-pro');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro'), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/mailchimp-integration"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When someone leaves a comment, they can be given the option to subscribe to your ConvertKit account.', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(function (submitData, e) {
      e.preventDefault();

      if (!needsCredentialRefresh()) {
        onSubmit(submitData);
      } else {
        onRefreshCredentials(submitData);
      }
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "form-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_11__.Controller, {
    name: "enableConvertKit",
    control: control,
    render: function render(_ref9) {
      var _ref9$field = _ref9.field,
          _onChange5 = _ref9$field.onChange,
          value = _ref9$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable ConvertKit', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          //setShowButtonOptions( boolValue );
          _onChange5(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or Disable the ConvertKit Integration.', 'comment-edit-pro')
      });
    }
  }))), getValues('enableConvertKit') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getAPIKey(), getSecretKey(), getFormOrTag(), getConvertKitForms(), getConvertKitTags(), getNewsletterLabel(), getSignupCheckbox()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin-buttons"
  }, !needsCredentialRefresh() && getValues('apiValid') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
  }), needsCredentialRefresh() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-primary qdlx__btn--icon-right', {
      'has-error': hasErrors()
    }),
    type: "submit",
    text: getRefreshCredentialsText(),
    icon: false,
    disabled: credentialsRefreshing
  }), !needsCredentialRefresh() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConvertKit);

/***/ })

}]);
//# sourceMappingURL=ConvertKit0.0.1.chunk.bundle.js.map
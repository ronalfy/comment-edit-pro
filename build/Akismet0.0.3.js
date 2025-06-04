(globalThis["webpackChunksimple_comment_editing_options"] = globalThis["webpackChunksimple_comment_editing_options"] || []).push([["Akismet0.0.3"],{

/***/ "./src/js/SendCommand.js":
/*!*******************************!*\
  !*** ./src/js/SendCommand.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sendCommand)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-undef */
/* eslint-disable camelcase */


function sendCommand(action, data, ajaxUrl = '') {
  const params = {
    action
  };
  const default_data = {
    nonce: false,
    action
  };
  if ('undefined' === typeof data) {
    data = {};
  }
  for (const opt in default_data) {
    if (!data.hasOwnProperty(opt)) {
      data[opt] = default_data[opt];
    }
  }
  let sendAjaxUrl = '';
  if (typeof ajaxurl === 'undefined') {
    sendAjaxUrl = ajaxUrl;
  } else {
    sendAjaxUrl = ajaxurl;
  }
  const options = {
    method: 'post',
    url: sendAjaxUrl,
    params,
    paramsSerializer(jsparams) {
      return qs__WEBPACK_IMPORTED_MODULE_0___default().stringify(jsparams, {
        arrayFormat: 'brackets'
      });
    },
    data: qs__WEBPACK_IMPORTED_MODULE_0___default().stringify(data)
  };
  return (0,axios__WEBPACK_IMPORTED_MODULE_1__["default"])(options);
}

/***/ }),

/***/ "./src/js/react/components/ErrorBoundary/index.js":
/*!********************************************************!*\
  !*** ./src/js/react/components/ErrorBoundary/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

// From: https://blog.logrocket.com/async-rendering-react-suspense/
// Error boundaries currently have to be classes.
class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/js/react/components/Notice/index.js":
/*!*************************************************!*\
  !*** ./src/js/react/components/Notice/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
// eslint-disable-next-line no-unused-vars

 // ES6




const Notice = props => {
  const {
    message,
    status,
    politeness,
    icon,
    className,
    inline,
    children
  } = props;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__.speak)(message, politeness);
  }, [message, status, politeness]);
  const hasIcon = () => {
    return icon !== null;
  };
  const getIcon = Icon => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Icon, {
      width: 16,
      height: 16,
      fill: "#6c757d"
    });
  };
  const containerClasses = classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, 'sce-admin__notice', {
    'sce-admin__notice--has-icon': hasIcon(),
    [`sce-admin__notice-type--${status}`]: true,
    [`sce-admin__notice-appearance--inline`]: inline,
    [`sce-admin__notice-appearance--block`]: !inline
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: containerClasses,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      isDismissible: false,
      spokenMessage: message,
      actions: [],
      ...props,
      children: [hasIcon() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "sce-admin__notice-icon",
        children: getIcon(icon)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "sce-admin__notice-message",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [message, " ", children, " "]
        })
      })]
    })
  });
};
Notice.defaultProps = {
  message: '',
  status: 'info',
  politeness: 'polite',
  icon: null,
  className: '',
  inline: false
};
Notice.propTypes = {
  message: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string).isRequired,
  status: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['info', 'warning', 'success', 'error']),
  politeness: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOf(['assertive', 'polite']),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  inline: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notice);

/***/ }),

/***/ "./src/js/react/components/icons/CircularExplanation.js":
/*!**************************************************************!*\
  !*** ./src/js/react/components/icons/CircularExplanation.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

const CircularExclamationIcon = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: props.width,
    height: props.height,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      fill: `var( ${props.var})`,
      d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-24 152c0-13.2 10.8-24 24-24s24 10.75 24 24v128c0 13.25-10.75 24-24 24s-24-10.7-24-24V152zm24 248c-17.36 0-31.44-14.08-31.44-31.44s14.07-31.44 31.44-31.44 31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
    })
  });
};
CircularExclamationIcon.defaultProps = {
  width: 16,
  height: 16,
  fill: '#333333'
};
CircularExclamationIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircularExclamationIcon);

/***/ }),

/***/ "./src/js/react/components/icons/ClipboardCheck.js":
/*!*********************************************************!*\
  !*** ./src/js/react/components/icons/ClipboardCheck.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable no-unused-vars */


function ClipboardCheck(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "clipboard-check",
    className: "prefix__svg-inline--fa prefix__fa-clipboard-check prefix__fa-w-12",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512",
    width: "16",
    height: "16",
    ...props,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      fill: "currentColor",
      d: "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClipboardCheck);

/***/ }),

/***/ "./src/js/react/components/icons/Spinner.js":
/*!**************************************************!*\
  !*** ./src/js/react/components/icons/Spinner.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

const Spinner = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512",
    width: props.width,
    height: props.height,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      className: "fa-primary",
      fill: props.primaryColor,
      d: "M256 32c0-17.67 14.3-32 32-32 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-8.8 15.3-28.4 20.6-44.6 11.7-14.4-8.8-19.6-28.4-10.8-44.6 16.3-27.3 25.7-60.1 25.7-96 0-106-86-192-192-192-17.7 0-32-13.43-32-32v.9z"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M287.1 64c-106 0-192 85.1-192 192 0 106 86 192 192 192 71 0 132.2-37.5 165.8-93.6l.1.1c-6.9 14.9-1.5 32.8 12.1 41.2 16.2 8.9 35.8 3.6 44.6-11.7.2-.3.4-.6.5-.9C466.1 460.1 383.1 512 288 512 146.6 512 32 397.4 32 256S146.6 0 288 0c-17.7 0-32 14.33-32 32s14.3 32 32 32h-.9z",
      fill: props.secondaryColor,
      style: {
        opacity: 0.4
      }
    })]
  });
};
Spinner.defaultProps = {
  width: 24,
  height: 24,
  primaryColor: 'currentColor',
  secondaryColor: 'currentColor'
};
Spinner.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  primaryColor: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  secondaryColor: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./src/js/react/views/spam-protection/Akismet.js":
/*!*******************************************************!*\
  !*** ./src/js/react/views/spam-protection/Akismet.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
/* eslint-disable no-unused-vars */














const retrieveAkismetOptions = () => {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_get_akismet_options', {
    nonce: sceSpamProtection.get_nonce
  });
};
const Akismet = props => {
  const [defaults, getDefaults] = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveAkismetOptions, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__["default"], {
    fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("p", {
      children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load Akismet Settings.', 'comment-edit-pro'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        href: "https://dlxplugins.com/support/",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "DLX Plugins Support"
      })]
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h2", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Akismet', 'comment-edit-pro')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12___default()), {
          color: '#9c68b0',
          loading: true,
          cssOverride: true,
          size: 25,
          speedMultiplier: 0.65
        })]
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Interface, {
        defaults: defaults,
        ...props
      })
    })
  });
};
const Interface = props => {
  const {
    defaults
  } = props;
  const response = defaults();
  const {
    data,
    success
  } = response.data;
  const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isSaved, setIsSaved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [resetting, setResetting] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isReset, setIsReset] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm)({
    defaultValues: {
      akismetActive: data.akismetActive,
      akismetEnabled: data.akismetEnabled,
      akismetEditCommentsEnabled: data.akismetEditCommentsEnabled,
      akismetApiValid: data.akismetApiValid,
      akismetLoggedInUsersEnabled: data.akismetLoggedInUsersEnabled,
      akismetSkipPingbacks: data.akismetSkipPingbacks,
      akismetSkipHasGravatar: data.akismetSkipHasGravatar
    }
  });
  const formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useWatch)({
    control
  });
  const {
    errors,
    isDirty,
    dirtyFields,
    touchedFields
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useFormState)({
    control
  });
  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };
  const onSubmit = formData => {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_save_akismet_options', {
      nonce: sceSpamProtection.save_nonce,
      ...formData
    }).then(ajaxResponse => {
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
        }, 3000);
      } else {}
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setSaving(false);
    });
  };
  const handleReset = () => {
    setResetting(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_reset_akismet_options', {
      nonce: sceSpamProtection.reset_nonce
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsReset(true);
        reset({
          akismetApiValid: getValues('akismetApiValid'),
          akismetActive: getValues('akismetActive'),
          akismetEnabled: true,
          akismetEditCommentsEnabled: true,
          akismetLoggedInUsersEnabled: true,
          akismetSkipHasGravatar: false,
          akismetSkipPingbacks: false
        });
        setTimeout(() => {
          setIsReset(false);
        }, 3000);
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setResetting(false);
    });
  };
  const getSaveIcon = () => {
    if (saving) {
      return _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_5__["default"];
    }
    if (isSaved) {
      return _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_6__["default"];
    }
    return false;
  };
  const getSaveText = () => {
    if (saving) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'quotes-dlx');
    }
    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saved', 'quotes-dlx');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Akismet Options', 'quotes-dlx');
  };
  const getResetText = () => {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Restoring Defaults…', 'quotes-dlx');
    }
    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Restored.', 'quotes-dlx');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Restore Akismet Defaults', 'quotes-dlx');
  };
  const getAkismetHeader = () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("h2", {
        children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Akismet', 'comment-edit-pro'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("a", {
          className: "sce-admin-heading-docs",
          target: "_blank",
          rel: "noreferrer",
          href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/akismet-spam-protection",
          children: ["(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
        className: "description",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Akismet is a highly useful plugin for preventing comment spam.', 'comment-edit-pro')
      })]
    });
  };
  if (!getValues('akismetActive')) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
      children: [getAkismetHeader(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The Akismet plugin is not active.', 'comment-edit-pro'),
        status: "warning",
        politeness: "polite"
      })]
    });
  }
  if (!getValues('akismetApiValid')) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
      children: [getAkismetHeader(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The API key for Akismet is invalid.', 'comment-edit-pro'),
        status: "warning",
        politeness: "polite"
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [getAkismetHeader(), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("form", {
      onSubmit: handleSubmit(onSubmit),
      children: [getValues('akismetActive') && getValues('akismetApiValid') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Akismet is enabled and is protecting you from comment spam.', 'comment-edit-pro'),
          status: "success",
          politeness: "polite"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("table", {
        className: "form-table",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("tbody", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Akismet Spam Protection', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
                name: "akismetEnabled",
                control: control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Akismet for Comments', 'comment-edit-pro'),
                  className: "sce-admin__toggle-control",
                  checked: value,
                  onChange: boolValue => {
                    //setShowButtonOptions( boolValue );
                    onChange(boolValue);
                  },
                  help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Akismet protection is on by default for comments. Disabling this will prevent Akismet protection for new comments.', 'comment-edit-pro')
                })
              })
            })]
          }), getValues('akismetEnabled') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("th", {
                scope: "row",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Logged-in Users ', 'comment-edit-pro')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("td", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
                  name: "akismetLoggedInUsersEnabled",
                  control: control,
                  render: ({
                    field: {
                      onChange,
                      value
                    }
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Akismet for Logged-in Users', 'comment-edit-pro'),
                    className: "sce-admin__toggle-control",
                    checked: value,
                    onChange: boolValue => {
                      //setShowButtonOptions( boolValue );
                      onChange(boolValue);
                    },
                    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By default, Akismet protection is enabled for all logged-in users.', 'comment-edit-pro')
                  })
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("th", {
                scope: "row",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edit Comments', 'comment-edit-pro')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("td", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
                  name: "akismetEditCommentsEnabled",
                  control: control,
                  render: ({
                    field: {
                      onChange,
                      value
                    }
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Akismet for Edited Comments', 'comment-edit-pro'),
                    className: "sce-admin__toggle-control",
                    checked: value,
                    onChange: boolValue => {
                      //setShowButtonOptions( boolValue );
                      onChange(boolValue);
                    },
                    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('By default, Akismet is enabled for edited comments.', 'comment-edit-pro')
                  })
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("th", {
                scope: "row",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip Akismet', 'comment-edit-pro')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("td", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                  className: "sce-panel-row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
                    name: "akismetSkipPingbacks",
                    control: control,
                    render: ({
                      field: {
                        onChange,
                        value
                      }
                    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip Pingbacks/Trackbacks', 'comment-edit-pro'),
                      className: "sce-admin__toggle-control",
                      checked: value,
                      onChange: boolValue => {
                        onChange(boolValue);
                      },
                      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip pingbacks and trackbacks when checking for spam.', 'comment-edit-pro')
                    })
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                  className: "sce-panel-row",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
                    name: "akismetSkipHasGravatar",
                    control: control,
                    render: ({
                      field: {
                        onChange,
                        value
                      }
                    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip Commenters With a Gravatar', 'comment-edit-pro'),
                      className: "sce-admin__toggle-control",
                      checked: value,
                      onChange: boolValue => {
                        onChange(boolValue);
                      },
                      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Skip spam checking for users with a valid Gravatar.', 'comment-edit-pro')
                    })
                  })
                })]
              })]
            })]
          })]
        })
      }), getValues('akismetActive') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "sce-admin-buttons",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
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
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-danger qdlx__btn--icon-right', {
              'has-icon': resetting
            }, {
              'is-resetting': {
                resetting
              }
            }),
            type: "button",
            text: getResetText(),
            icon: resetting ? _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_5__["default"] : false,
            iconSize: "18",
            iconPosition: "right",
            disabled: saving || resetting,
            onClick: e => {
              setResetting(true);
              handleReset(e);
            }
          })]
        }), hasErrors() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
          status: "error",
          politeness: "polite"
        }), isSaved && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
          status: "success",
          politeness: "assertive"
        }), isReset && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been reset.', 'comment-edit-pro'),
          status: "success",
          politeness: "assertive"
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Akismet);

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=Akismet0.0.3.js.map?ver=43d230dd8d245d98e461
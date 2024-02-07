(globalThis["webpackChunksimple_comment_editing_options"] = globalThis["webpackChunksimple_comment_editing_options"] || []).push([["Turnstile0.0.3"],{

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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/a11y */ "@wordpress/a11y");
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);

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
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: containerClasses
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    isDismissible: false,
    spokenMessage: message,
    actions: [],
    ...props
  }, hasIcon() && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sce-admin__notice-icon"
  }, getIcon(icon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sce-admin__notice-message"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, message, " ", children, " "))));
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
  message: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string).isRequired,
  status: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf(['info', 'warning', 'success', 'error']),
  politeness: prop_types__WEBPACK_IMPORTED_MODULE_4___default().oneOf(['assertive', 'polite']),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  inline: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool)
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


 // ES6

const CircularExclamationIcon = props => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: props.width,
    height: props.height
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: `var( ${props.var})`,
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm-24 152c0-13.2 10.8-24 24-24s24 10.75 24 24v128c0 13.25-10.75 24-24 24s-24-10.7-24-24V152zm24 248c-17.36 0-31.44-14.08-31.44-31.44s14.07-31.44 31.44-31.44 31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
  }));
};
CircularExclamationIcon.defaultProps = {
  width: 16,
  height: 16,
  fill: '#333333'
};
CircularExclamationIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
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

/* eslint-disable no-unused-vars */

function ClipboardCheck(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "clipboard-check",
    className: "prefix__svg-inline--fa prefix__fa-clipboard-check prefix__fa-w-12",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512",
    width: "16",
    height: "16",
    ...props
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    fill: "currentColor",
    d: "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z"
  }));
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


 // ES6

const Spinner = props => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512",
    width: props.width,
    height: props.height
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "fa-primary",
    fill: props.primaryColor,
    d: "M256 32c0-17.67 14.3-32 32-32 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-8.8 15.3-28.4 20.6-44.6 11.7-14.4-8.8-19.6-28.4-10.8-44.6 16.3-27.3 25.7-60.1 25.7-96 0-106-86-192-192-192-17.7 0-32-13.43-32-32v.9z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M287.1 64c-106 0-192 85.1-192 192 0 106 86 192 192 192 71 0 132.2-37.5 165.8-93.6l.1.1c-6.9 14.9-1.5 32.8 12.1 41.2 16.2 8.9 35.8 3.6 44.6-11.7.2-.3.4-.6.5-.9C466.1 460.1 383.1 512 288 512 146.6 512 32 397.4 32 256S146.6 0 288 0c-17.7 0-32 14.33-32 32s14.3 32 32 32h-.9z",
    fill: props.secondaryColor,
    style: {
      opacity: 0.4
    }
  }));
};
Spinner.defaultProps = {
  width: 24,
  height: 24,
  primaryColor: 'currentColor',
  secondaryColor: 'currentColor'
};
Spinner.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  primaryColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  secondaryColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./src/js/react/views/spam-protection/Turnstile.js":
/*!*********************************************************!*\
  !*** ./src/js/react/views/spam-protection/Turnstile.js ***!
  \*********************************************************/
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
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Context */ "./src/js/react/views/spam-protection/Context.js");

/* eslint-disable no-unused-vars */














const retrieveTurnstileSettings = () => {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_get_turnstile_options', {
    nonce: sceSpamProtection.get_nonce
  });
};
const Turnstile = props => {
  const [defaults, getDefaults] = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveTurnstileSettings, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__["default"], {
    fallback: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load Turnstile Settings.', 'comment-edit-pro'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloudflare Turnstile', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12___default()), {
      color: '#9c68b0',
      loading: true,
      cssOverride: true,
      size: 25,
      speedMultiplier: 0.65
    }))
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Interface, {
    defaults: defaults,
    ...props
  })));
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
    recaptchaEnabled,
    setTurnstileEnabled
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Context__WEBPACK_IMPORTED_MODULE_11__["default"]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setTurnstileEnabled(data.turnstileEnabled);
  }, [data.recaptchaEnabled]);
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
      turnstileEnabled: data.turnstileEnabled,
      turnstileSitekey: data.turnstileSitekey,
      turnstileSecret: data.turnstileSecret,
      turnstileTheme: data.turnstileTheme,
      turnstileLanguage: data.turnstileLanguage,
      turnstileWidgetSize: data.turnstileWidgetSize,
      turnstileLoggedInUsersEnabled: data.turnstileLoggedInUsersEnabled
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
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_save_turnstile_options', {
      nonce: sceSpamProtection.save_nonce,
      ...formData
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
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
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_reset_turnstile_options', {
      nonce: sceSpamProtection.reset_nonce
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsReset(true);
        reset(ajaxData);
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
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Turnstile Options', 'quotes-dlx');
  };
  const getResetText = () => {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'quotes-dlx');
    }
    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'quotes-dlx');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From Turnstile', 'quotes-dlx');
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloudflare Turnstile', 'comment-edit-pro'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/spam-protection/cloudflare-turnstile"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Cloudflare Turnstile is an alternative captcha that is designed for privacy and user experience.', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit(onSubmit)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "form-table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Turnstile', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileEnabled",
    control: control,
    render: ({
      field: {
        onChange,
        value
      }
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Cloudflare Turnstile', 'comment-edit-pro'),
      className: "sce-admin__toggle-control",
      checked: value,
      onChange: boolValue => {
        setTurnstileEnabled(boolValue);
        onChange(boolValue);
      },
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or disable the Cloudflare Turnstile integration.', 'comment-edit-pro')
    })
  }), recaptchaEnabled && getValues('turnstileEnabled') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('It is not recommended to have both reCAPTCHA 3 and Cloudflare Turnstile enabled.', 'comment-edit-pro'),
    status: "warning",
    politeness: "polite"
  })))), getValues('turnstileEnabled') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Logged-in Users', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, getValues('turnstileLoggedInUsersEnabled'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileLoggedInUsersEnabled",
    control: control,
    render: ({
      field: {
        onChange,
        value
      }
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Cloudflare Turnstile for Logged-in Users', 'comment-edit-pro'),
      className: "sce-admin__toggle-control",
      checked: value,
      onChange: boolValue => {
        onChange(boolValue);
      },
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can exclude logged-in users from Cloudflare Turnstile with this setting.', 'comment-edit-pro')
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Keys', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileSitekey",
    control: control,
    rules: {
      required: true
    },
    render: ({
      field
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sitekey', 'quotes-dlx'),
      ...field,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
        'has-error': 'required' === errors.turnstileSitekey?.type,
        'is-required': true
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Turnstile sitekey.', 'comment-edit-pro'),
      "aria-required": "true"
    })
  }), 'required' === errors.turnstileSitekey?.type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileSecret",
    control: control,
    rules: {
      required: true
    },
    render: ({
      field
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secret Key', 'quotes-dlx'),
      ...field,
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
        'has-error': 'required' === errors.turnstileSecret?.type,
        'is-required': true
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Turnstile secret key.', 'comment-edit-pro'),
      "aria-required": "true"
    })
  }), 'required' === errors.turnstileSecret?.type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
    status: "error",
    politeness: "assertive",
    inline: true,
    icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Language', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileTheme",
    control: control,
    rules: {
      required: true
    },
    render: ({
      field: {
        onChange,
        value
      }
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Language', 'comment-edit-pro'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select the language of the widget.', 'comment-edit-pro'),
      value: value,
      options: [/* auto, ar-eg, de, en, es, fa, fr, id, it, ja, ko, nl, pl, pt-br, ru, tr, zh-cn, zh-tw */
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
      onChange: widgetThemeValue => {
        onChange(widgetThemeValue);
      }
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Appearance', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileTheme",
    control: control,
    rules: {
      required: true
    },
    render: ({
      field: {
        onChange,
        value
      }
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Appearance', 'comment-edit-pro'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select the theme for the widget.', 'comment-edit-pro'),
      value: value,
      options: [/* light, dark, auto */
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
      onChange: widgetThemeValue => {
        onChange(widgetThemeValue);
      }
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Size', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "turnstileWidgetSize",
    control: control,
    rules: {
      required: true
    },
    render: ({
      field: {
        onChange,
        value
      }
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Widget Size', 'comment-edit-pro'),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select the size for the widget.', 'comment-edit-pro'),
      value: value,
      options: [/* normal, compact */
      {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Normal', 'comment-edit-pro'),
        value: 'normal'
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Compact', 'comment-edit-pro'),
        value: 'compact'
      }],
      onChange: widgetSizeValue => {
        onChange(widgetSizeValue);
      }
    })
  })))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sce-admin-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
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
  }), getValues('turnstileEnabled') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
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
  })), hasErrors() && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
    status: "error",
    politeness: "polite"
  }), isSaved && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  }), isReset && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been reset.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Turnstile);

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=Turnstile0.0.3.js.map
(globalThis["webpackChunksimple_comment_editing_options"] = globalThis["webpackChunksimple_comment_editing_options"] || []).push([["ConvertKit0.0.1"],{

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

/***/ "./src/js/react/components/icons/ConvertKit.js":
/*!*****************************************************!*\
  !*** ./src/js/react/components/icons/ConvertKit.js ***!
  \*****************************************************/
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

const ConvertKitIcon = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
    viewBox: "0 0 1600 1500",
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: props.width,
    height: props.height,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
      d: "M772.031 1184.2c277.837 0 492.588-212.07 492.588-473.68 0-245.084-201.745-394.733-335.381-394.733-186.076 0-335.222 131.93-356.472 327.783-3.938 36.27-32.381 66.685-68.477 66.425-60.008-.435-147.245-.95-202.469-.76-23.774.085-43.431-19.41-42.256-43.41 8.334-169.862 64.548-328.686 171.743-450.69C550.42 79.568 723.882-.005 929.238-.005 1274.272-.005 1600 316.741 1600 710.52c0 436.015-357.563 789.475-820.627 789.475-330.241 0-662.845-218.05-778.968-522.89-.431-1.13-.501-2.31-.291-3.535 1.545-9.02 4.616-17.26 7.64-25.375 4.397-11.795 8.696-23.325 8.068-36.62l-2.007-42.46c-.989-20.95 10.725-40.43 29.674-49.34l16.786-7.895c19.141-9.005 32.747-26.735 36.513-47.575 5.627-31.145 32.686-53.785 64.27-53.785 49.318 0 92.209 33.135 108.32 80.25 77.542 226.765 200.814 393.43 502.653 393.43Z",
      fill: props.fill
    })
  });
};
ConvertKitIcon.defaultProps = {
  width: 32,
  height: 30,
  fill: '#FB6068'
};
ConvertKitIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConvertKitIcon);

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

/***/ "./src/js/react/views/integrations/ConvertKit.js":
/*!*******************************************************!*\
  !*** ./src/js/react/views/integrations/ConvertKit.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _webhooks_RequestHeaderFields__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../webhooks/RequestHeaderFields */ "./src/js/react/views/webhooks/RequestHeaderFields.js");
/* harmony import */ var _components_icons_ConvertKit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/icons/ConvertKit */ "./src/js/react/components/icons/ConvertKit.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);
/* eslint-disable no-unused-vars */
















const retrieveConvertKitOptions = () => {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_get_convertkit_options', {
    nonce: sceIntegrations.ck_get_nonce
  });
};
const ConvertKit = props => {
  const [defaults, getDefaults] = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveConvertKitOptions, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__["default"], {
    fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("p", {
      children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load ConvertKit Settings.', 'comment-edit-pro'), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("a", {
        href: "https://dlxplugins.com/support/",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "DLX Plugins Support"
      })]
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
      fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h2", {
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14___default()), {
          color: '#9c68b0',
          loading: true,
          cssOverride: true,
          size: 25,
          speedMultiplier: 0.65
        })]
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(Interface, {
        defaults: defaults,
        ...props
      })
    })
  });
};
const Interface = props => {
  var _data$forms, _data$tags, _data$customFields;
  const tagInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const customFieldInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
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
  const [credentialsRefreshing, setCredentialsRefreshing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isRefreshingTags, setIsRefreshingTags] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isRefreshingForms, setIsRefreshingForms] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isRefreshingCustomFields, setIsRefreshingCustomFields] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isAddingTag, setIsAddingTag] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isAddingCustomField, setIsAddingCustomField] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    trigger
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useForm)({
    defaultValues: {
      enableConvertKit: data.enableConvertKit,
      apiValid: data.apiValid,
      apiKey: data.apiKey,
      secretKey: data.secretKey,
      signUpLabel: data.signUpLabel,
      checkboxEnabled: data.checkboxEnabled,
      formOrTag: data.formOrTag,
      forms: (_data$forms = data.forms) !== null && _data$forms !== void 0 ? _data$forms : [],
      tags: (_data$tags = data.tags) !== null && _data$tags !== void 0 ? _data$tags : [],
      customFields: (_data$customFields = data.customFields) !== null && _data$customFields !== void 0 ? _data$customFields : [],
      selectedForm: data.selectedForm,
      tagInput: '',
      customFieldInput: ''
    }
  });
  const formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useWatch)({
    control
  });
  const {
    errors,
    isDirty,
    dirtyFields,
    touchedFields
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useFormState)({
    control
  });

  /**
   * Check if we need to re-connect or initially connect to the ConvertKit API.
   *
   * @return {boolean} true if we need to re-connect, false if not.
   */
  const needsCredentialRefresh = () => {
    // If convertkit is disabled, no need to refresh.
    if (!getValues('enableConvertKit')) {
      return false;
    }

    // If api isn't valid, refresh.
    if (!getValues('apiValid')) {
      return true;
    }
    if (isDirty && (dirtyFields.apiKey || dirtyFields.secretKey)) {
      return true;
    }
    return false;
  };

  /**
   * Check if we can save the form.
   *
   * @return {boolean} true to show the save button, false to hide it.
   */
  const canShowSaveButton = () => {
    // If convertkit is disabled and form is not dirty, no save button.
    if (!getValues('enableConvertKit') && !isDirty) {
      return false;
    }

    // If convertKit is disabled, we can always save.
    if (!getValues('enableConvertKit')) {
      return true;
    }
    const forms = getValues('forms');
    const tags = getValues('tags');
    if (getValues('apiValid') && forms.length === 0 && tags.length === 0) {
      return false;
    }
    if (!getValues('apiValid') && isDirty) {
      return false;
    }
    if (needsCredentialRefresh()) {
      return false;
    }

    // Check to see if any forms are selected.
    if (getValues('formOrTag') === 'form') {
      if (forms.length === 0) {
        return false;
      }
      if ('0' === getValues('selectedForm')) {
        return false;
      }
      if ('0' !== getValues('selectedForm')) {
        // Check if selectedForm is not in the forms array.
        const selectedForm = getValues('selectedForm');
        let selected = false;
        forms.forEach(form => {
          if (form.value === selectedForm) {
            selected = true;
          }
        });
        if (!selected) {
          return false;
        }
      }
    }

    // Check to see if any tags are selected.
    if (getValues('formOrTag') === 'tag') {
      if (tags.length === 0) {
        return false;
      }
      let selected = false;
      tags.forEach(tag => {
        if (tag.selected) {
          selected = true;
        }
      });
      if (!selected) {
        return false;
      }
    }
    return true;
  };
  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };
  const onSubmit = formData => {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_save_convertkit_options', {
      nonce: sceIntegrations.ck_save_nonce,
      ...formData
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsSaved(true);

        // Reset form.
        reset({
          ...formData,
          ...ajaxData
        }, {
          keepErrors: false,
          keepDirty: false
        });
        setTimeout(() => {
          setIsSaved(false);
        }, 3000);
      } else {
        // todo - set save error.
        // setError( 'apiKey', { type: 'noForms', message: ajaxData.message } );
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setSaving(false);
    });
  };
  const onRefreshCredentials = formData => {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_refresh_convertkit_connection', {
      nonce: sceIntegrations.ck_refresh_nonce,
      ...formData
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        // Reset form state.
        reset({
          ...formValues,
          ...ajaxData
        }, {
          keepErrors: false,
          keepDirty: false
        });
      } else {
        const updatedFormValues = {
          apiValid: false
        };
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: false,
          keepDirty: false
        });
        setError('apiKey', {
          type: 'noForms',
          message: ajaxData.message
        });
        setError('secretKey', {
          type: 'noForms',
          message: ajaxData.message
        });
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setSaving(false);
    });
  };
  const onAddTag = tagLabel => {
    tagLabel = tagLabel.trim();
    if ('' === tagLabel) {
      setError('tagInput', {
        type: 'addTagError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tag name cannot be empty.', 'comment-edit-pro')
      });
      return;
    }

    // Check to see if label is in use.
    const currentTags = getValues('tags');
    const tagExists = currentTags.find(tag => tag.label === tagLabel);
    if (tagExists) {
      setError('tagInput', {
        type: 'addTagError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tag name already in use.', 'comment-edit-pro')
      });
      return;
    }

    // Start adding the tag.
    setIsAddingTag(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_add_convertkit_tag', {
      nonce: sceIntegrations.ck_add_tag_nonce,
      label: tagLabel
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        const {
          tags
        } = ajaxData;
        const newTagValues = [];
        tags.forEach((keys, index) => {
          newTagValues.push(keys);
        });
        setValue('tagInput', '');
        setValue('tags', newTagValues);
      } else {
        setError('tagInput', {
          type: 'addTagError',
          message: ajaxData.message
        });
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setIsAddingTag(false);
      tagInput.current.focus();
    });
  };
  const onAddCustomField = customFieldLabel => {
    customFieldLabel = customFieldLabel.trim();
    if ('' === customFieldLabel) {
      setError('customFieldInput', {
        type: 'addCustomFieldError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The Custom Field name cannot be empty.', 'comment-edit-pro')
      });
      return;
    }

    // Check to see if label is in use.
    const currentCustomFields = getValues('customFields');
    const customFieldExists = currentCustomFields.find(customField => customField.label === customFieldLabel);
    if (customFieldExists) {
      setError('customFieldInput', {
        type: 'addCustomFieldError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Field name already in use.', 'comment-edit-pro')
      });
      return;
    }

    // Start adding the Custom Field.
    setIsAddingCustomField(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_add_convertkit_custom_field', {
      nonce: sceIntegrations.ck_add_custom_field_nonce,
      label: customFieldLabel
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        const {
          customFields
        } = ajaxData;
        const newCustomFieldValues = [];
        customFields.forEach((keys, index) => {
          newCustomFieldValues.push(keys);
        });
        setValue('customFields', newCustomFieldValues);
      } else {
        setError('customFieldInput', {
          type: 'addCustomFieldError',
          message: ajaxData.message
        });
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setIsAddingCustomField(false);
      customFieldInputRef.current.focus();
    });
  };
  const onHandleTagsRefresh = formData => {
    setIsRefreshingTags(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_refresh_convertkit_tags', {
      nonce: sceIntegrations.ck_refresh_tags_nonce
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        const {
          tags,
          apiValid
        } = ajaxData;
        const newTagValues = [];
        const oldTagValues = getValues('tags');
        tags.forEach((keys, index) => {
          // Use old selection state for new tags.
          const oldTag = oldTagValues.find(tag => tag.value === keys.value);
          if (oldTag) {
            keys.selected = oldTag.selected;
          }
          newTagValues.push(keys);
        });
        const updatedFormValues = {
          tags: newTagValues,
          apiValid
        };
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: true,
          keepDirty: true
        });
      } else {
        const updatedFormValues = {};
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: true,
          keepDirty: true
        });
        setError('tags', {
          type: 'noTags',
          message: ajaxData.message
        });
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setIsRefreshingTags(false);
    });
  };
  const onHandleFormsRefresh = formData => {
    setIsRefreshingForms(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_refresh_convertkit_forms', {
      nonce: sceIntegrations.ck_refresh_forms_nonce
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        const {
          forms,
          apiValid
        } = ajaxData;
        const updatedFormValues = {
          forms
        };
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: true,
          keepDirty: true
        });
      } else {
        const updatedFormValues = {};
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: true,
          keepDirty: true
        });
        setError('forms', {
          type: 'noForms',
          message: ajaxData.message
        });
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setIsRefreshingForms(false);
    });
  };
  const onHandleCustomFieldsRefresh = formData => {
    setIsRefreshingCustomFields(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_refresh_convertkit_custom_fields', {
      nonce: sceIntegrations.ck_refresh_custom_fields_nonce
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        const {
          customFields,
          apiValid
        } = ajaxData;
        const newCustomFieldValues = [];
        const oldCustomFieldValues = getValues('customFields');
        customFields.forEach((keys, index) => {
          // Use old selection state for new tags.
          const oldCustomFields = oldCustomFieldValues.find(customField => customField.value === keys.value);
          if (oldCustomFields) {
            var _oldCustomFields$fiel;
            keys.field = oldCustomFields.field;
            keys.field_value = (_oldCustomFields$fiel = oldCustomFields.field_value) !== null && _oldCustomFields$fiel !== void 0 ? _oldCustomFields$fiel : '';
          }
          newCustomFieldValues.push(keys);
        });
        const updatedFormValues = {
          customFields: newCustomFieldValues,
          apiValid
        };
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: true,
          keepDirty: true
        });
      } else {
        const updatedFormValues = {};
        reset({
          ...formValues,
          ...updatedFormValues
        }, {
          keepErrors: true,
          keepDirty: true
        });
        setError('customFields', {
          type: 'noFields',
          message: ajaxData.message
        });
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setIsRefreshingCustomFields(false);
    });
  };
  const getNewsletterLabel = () => {
    if (!canShowSaveButton() || needsCredentialRefresh()) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {});
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Label', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("td", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
          name: "signUpLabel",
          control: control,
          rules: {
            required: true
          },
          render: ({
            field
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            ...field,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign-up Label', 'comment-edit-pro'),
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
              'has-error': 'required' === errors.signUpLabel?.type,
              'is-required': true
            }),
            "aria-required": "true",
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This text will be shown in the comment section when a user leaves a comment.', 'comment-edit-pro')
          })
        }), 'required' === errors.signUpLabel?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
          status: "error",
          politeness: "assertive",
          inline: true,
          icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
        })]
      })]
    });
  };
  const getSignupCheckbox = () => {
    if (!canShowSaveButton() || needsCredentialRefresh()) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {});
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
          name: "checkboxEnabled",
          control: control,
          render: ({
            field: {
              onChange,
              value
            }
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox Checked', 'comment-edit-pro'),
            className: "sce-admin__toggle-control",
            checked: value,
            onChange: boolValue => {
              onChange(boolValue);
            },
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Check the sign-up checkbox by default (not recommended).', 'comment-edit-pro')
          })
        })
      })]
    });
  };

  /**
   * Gets the form or tag radio option.
   *
   * @return {JSX.Element} Form or tags interface.
   */
  const getFormOrTag = () => {
    if (needsCredentialRefresh()) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {});
    }
    const forms = getValues('forms');
    const tags = getValues('tags');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Forms and Tags', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
          name: "formOrTag",
          control: control,
          rules: {
            required: true
          },
          render: ({
            field: {
              onChange,
              value
            }
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RadioControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Subscribers to Forms or Tags', 'comment-edit-pro'),
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select whether to add new subscribers to a an existing ConvertKit form or tag(s).', 'comment-edit-pro'),
              selected: getValues('formOrTag'),
              options: [{
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Forms and Tags', 'comment-edit-pro'),
                value: 'form'
              }, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tags Only', 'comment-edit-pro'),
                value: 'tag'
              }],
              onChange: formOrTagValue => {
                onChange(formOrTagValue);
              }
            })
          })
        })
      })]
    });
  };
  const getConvertKitForms = () => {
    // Get forms.
    // eslint-disable-next-line @wordpress/no-unused-vars-before-return
    const convertKitForms = getValues('forms');
    if (!getValues('apiValid') || needsCredentialRefresh() || 'form' !== getValues('formOrTag')) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {});
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Forms (Required)', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("td", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
          children: [convertKitForms.length !== 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
            name: "selectedForm",
            control: control,
            rules: {
              required: true
            },
            render: ({
              field: {
                onChange,
                value
              }
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RadioControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a form for your subscribers', 'comment-edit-pro'),
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a default form that will be used when signing up your subscribers.', 'comment-edit-pro'),
              selected: value,
              options: getValues('forms'),
              onChange: formSelectedValue => {
                onChange(formSelectedValue);
              },
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
                'has-error': 'required' === errors.apiKey?.type,
                'is-required': true
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: "sce-admin-buttons",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
              isBusy: isRefreshingForms,
              disabled: isRefreshingForms,
              onClick: () => {
                onHandleFormsRefresh();
              },
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-link qdlx__btn--icon-right', {
                'has-error': hasErrors()
              }, {
                'has-icon': isRefreshingForms
              }, {
                'is-saving': isRefreshingForms
              }),
              text: isRefreshingForms ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refreshing…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refresh Forms', 'comment-edit-pro')
            })
          }), 'required' === errors.selectedForm?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
            status: "error",
            politeness: "assertive",
            inline: true,
            icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
          })]
        }), 'form' === getValues('formOrTag') && convertKitForms.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are no forms associated with this ConvertKit account and setup cannot continue. Please create a form in ConvertKit or try tags instead.', 'comment-edit-pro'),
          status: "error",
          politeness: "assertive",
          inline: false,
          icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
        })]
      })]
    });
  };
  const getConvertKitTags = () => {
    // Don't show tags if api is invalid.
    if (!getValues('apiValid') || needsCredentialRefresh()) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {});
    }
    const convertKitTags = getValues('tags');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Tags', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
          children: ['tag' === getValues('formOrTag') && getValues('tags').length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are no tags available. Try creating a tag below.', 'comment-edit-pro'),
            status: "warning",
            politeness: "assertive",
            inline: false,
            icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
          }), convertKitTags.length > 0 && getValues('apiValid') && convertKitTags.map((tag, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
            name: `tags[${index}].selected`,
            control: control,
            render: ({
              field: {
                onChange,
                value
              }
            }) => {
              var _getValues$index$sele;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
                label: tag.label,
                onChange: enableValue => {
                  onChange(enableValue);
                },
                checked: (_getValues$index$sele = getValues('tags')[index].selected) !== null && _getValues$index$sele !== void 0 ? _getValues$index$sele : false
              });
            }
          }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: "sce-admin-buttons",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
              isBusy: isRefreshingTags,
              disabled: isRefreshingTags,
              onClick: () => {
                onHandleTagsRefresh();
              },
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-link qdlx__btn--icon-right', {
                'has-error': hasErrors()
              }, {
                'has-icon': isRefreshingTags
              }, {
                'is-saving': isRefreshingTags
              }),
              text: isRefreshingTags ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refreshing…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refresh Tags', 'comment-edit-pro')
            })
          }), 'noTags' === errors.tags?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
            message: errors.tags?.message,
            status: "error",
            politeness: "assertive",
            inline: false,
            icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "sce-convertkit-add-tag",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "sce-convertkit-add-tag-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
                name: "tagInput",
                control: control,
                rules: {
                  pattern: /[-_ 0-9A-Za-z]/
                },
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  type: "text",
                  value: value,
                  onChange: tagInputValue => {
                    clearErrors('tagInput');
                    onChange(tagInputValue);
                  },
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add New Tag', 'comment-edit-pro'),
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                    'has-error': 'required' === errors.tagInput?.type
                  }),
                  placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tag Name', 'comment-edit-pro'),
                  "aria-required": "true",
                  ref: tagInput
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                className: "sce-admin-buttons",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                  onClick: async e => {
                    const validationResult = await trigger('tagInput');
                    if (validationResult) {
                      onAddTag(getValues('tagInput'));
                    }
                  },
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right'),
                  text: isAddingTag ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Adding…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add New Tag', 'comment-edit-pro')
                })
              })]
            }), 'pattern' === errors.tagInput?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Special characters are not allowed in tags.', 'comment-edit-pro'),
              status: "error",
              politeness: "assertive",
              inline: false,
              icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
            }), 'addTagError' === errors.tagInput?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
              message: errors.tagInput?.message,
              status: "error",
              politeness: "assertive",
              inline: false,
              icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
            })]
          })]
        })
      })]
    });
  };
  const getCustomFields = () => {
    // Don't show custom fields if api is invalid.
    if (!getValues('apiValid') || needsCredentialRefresh()) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {});
    }
    const convertKitCustomFields = getValues('customFields');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Map Custom Fields', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("td", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
          children: [getValues('customFields').length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are no custom fields available. You can create one below.', 'comment-edit-pro'),
            status: "warning",
            politeness: "assertive",
            inline: false,
            icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
          }), convertKitCustomFields.length > 0 && getValues('apiValid') && convertKitCustomFields.map((tag, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "sce-convertkit-custom-field",
            children: ['custom' !== getValues('customFields')[index].field && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
                name: `customFields[${index}].field`,
                control: control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => {
                  var _getValues$index$fiel;
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
                    label: tag.label,
                    onChange: customFieldSelectedValue => {
                      onChange(customFieldSelectedValue);
                    },
                    value: (_getValues$index$fiel = getValues('customFields')[index].field) !== null && _getValues$index$fiel !== void 0 ? _getValues$index$fiel : false,
                    options: _webhooks_RequestHeaderFields__WEBPACK_IMPORTED_MODULE_11__["default"],
                    className: "sce-admin__select-control"
                  });
                }
              })
            }), 'custom' === getValues('customFields')[index].field && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
                name: `customFields[${index}].field_value`,
                control: control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  value: value !== null && value !== void 0 ? value : '',
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {}),
                  onChange: methodValue => {
                    onChange(methodValue);
                  },
                  label: tag.label
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                className: "sce-admin__text-control-reset button-reset",
                icon: "no-alt",
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
                onClick: () => {
                  setValue(`customFields[${index}].field`, 'none');
                },
                showTooltip: false
              })]
            })]
          }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
            className: "sce-admin-buttons",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
              isBusy: isRefreshingCustomFields,
              disabled: isRefreshingCustomFields,
              onClick: () => {
                onHandleCustomFieldsRefresh();
              },
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-link qdlx__btn--icon-right', {
                'has-error': hasErrors()
              }, {
                'has-icon': isRefreshingCustomFields
              }, {
                'is-saving': isRefreshingCustomFields
              }),
              text: isRefreshingCustomFields ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refreshing…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refresh Custom Fields', 'comment-edit-pro')
            })
          }), 'noCustomFields' === errors.customFields?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
            message: errors.customFields?.message,
            status: "error",
            politeness: "assertive",
            inline: false,
            icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "sce-convertkit-add-tag",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
              className: "sce-convertkit-add-tag-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
                name: "customFieldInput",
                control: control,
                rules: {
                  pattern: /[-_ 0-9A-Za-z]/
                },
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  type: "text",
                  value: value,
                  onChange: customFieldValue => {
                    clearErrors('customFieldInput');
                    onChange(customFieldValue);
                  },
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add New Custom Field', 'comment-edit-pro'),
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                    'has-error': 'required' === errors.customFieldInput?.type
                  }),
                  placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Field Name', 'comment-edit-pro'),
                  ref: customFieldInputRef
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
                className: "sce-admin-buttons",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                  onClick: async e => {
                    const validationResult = await trigger('customFieldInput');
                    if (validationResult) {
                      onAddCustomField(getValues('customFieldInput'));
                    }
                  },
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right'),
                  text: isAddingTag ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Adding…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Custom Field', 'comment-edit-pro')
                })
              })]
            }), 'pattern' === errors.customFieldInput?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Special characters are not allowed in custom fields.', 'comment-edit-pro'),
              status: "error",
              politeness: "assertive",
              inline: false,
              icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
            }), 'addCustomFieldError' === errors.customFieldInput?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
              message: errors.customFieldInput?.message,
              status: "error",
              politeness: "assertive",
              inline: false,
              icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
            })]
          })]
        })
      })]
    });
  };
  const getAPIKey = () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('API Key', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("td", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
          name: "apiKey",
          control: control,
          rules: {
            required: true
          },
          render: ({
            field: {
              onChange,
              value
            }
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit API Key', 'comment-edit-pro'),
            type: "text",
            value: value,
            onChange: apiKeyValue => {
              onChange(apiKeyValue);
              clearErrors();
            },
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
              'has-error': 'required' === errors.apiKey?.type,
              'is-required': true
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your ConvertKit API Key in order to choose a form or tag.', 'comment-edit-pro'),
            "aria-required": "true"
          })
        }), 'required' === errors.apiKey?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
          status: "error",
          politeness: "assertive",
          inline: true,
          icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
        }), 'noForms' === errors.apiKey?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: errors.apiKey?.message,
          status: "error",
          politeness: "assertive",
          inline: true,
          icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
        })]
      })]
    });
  };
  const getSecretKey = () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
        scope: "row",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secret Key', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("td", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
          name: "secretKey",
          control: control,
          rules: {
            required: true
          },
          render: ({
            field: {
              onChange,
              value
            }
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Secret Key', 'comment-edit-pro'),
            type: "text",
            value: value,
            onChange: secretKey => {
              onChange(secretKey);
              clearErrors();
            },
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
              'has-error': 'required' === errors.secretKey?.type,
              'is-required': true
            }),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your ConvertKit Secret Key in order to choose a form or tag.', 'comment-edit-pro'),
            "aria-required": "true"
          })
        }), 'required' === errors.secretKey?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
          status: "error",
          politeness: "assertive",
          inline: true,
          icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
        }), 'noForms' === errors.secretKey?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          message: errors.secretKey?.message,
          status: "error",
          politeness: "assertive",
          inline: true,
          icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
        })]
      })]
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
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'comment-edit-pro');
    }
    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saved', 'comment-edit-pro');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save ConvertKit Options', 'comment-edit-pro');
  };
  const getRefreshCredentialsText = () => {
    if (saving) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connecting…', 'comment-edit-pro');
    }
    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connected', 'comment-edit-pro');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connect to ConvertKit', 'comment-edit-pro');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "sce-admin__tabs--content-heading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("h2", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_icons_ConvertKit__WEBPACK_IMPORTED_MODULE_12__["default"], {
          width: 48,
          height: 45,
          fill: '#FB6068',
          "aria-hidden": "true"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
          className: "sce-admin__heading--text",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("a", {
          className: "sce-admin-heading-docs",
          target: "_blank",
          rel: "noreferrer",
          href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/convertkit-integration",
          children: ["(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")"]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("p", {
        className: "description",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When someone leaves a comment, they can be given the option to subscribe to your ConvertKit account.', 'comment-edit-pro')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("form", {
      onSubmit: handleSubmit((submitData, e) => {
        e.preventDefault();
        if (!needsCredentialRefresh()) {
          onSubmit(submitData);
        } else {
          onRefreshCredentials(submitData);
        }
      }),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("table", {
        className: "form-table",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tbody", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
                name: "enableConvertKit",
                control: control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable ConvertKit', 'comment-edit-pro'),
                  className: "sce-admin__toggle-control",
                  checked: value,
                  onChange: boolValue => {
                    clearErrors();
                    onChange(boolValue);
                  },
                  help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or Disable the ConvertKit Integration.', 'comment-edit-pro')
                })
              })
            })]
          }), getValues('enableConvertKit') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: [getAPIKey(), getSecretKey(), getFormOrTag(), getConvertKitForms(), getConvertKitTags(), getCustomFields(), getNewsletterLabel(), getSignupCheckbox()]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        className: "sce-admin-buttons",
        children: [getValues('apiValid') && canShowSaveButton() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
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
        }), needsCredentialRefresh() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-primary qdlx__btn--icon-right', {
            'has-error': hasErrors()
          }),
          type: "submit",
          text: getRefreshCredentialsText(),
          icon: false,
          disabled: credentialsRefreshing
        })]
      }), hasErrors() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
        status: "error",
        politeness: "polite"
      }), isSaved && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
        status: "success",
        politeness: "assertive"
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConvertKit);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestHeaderFields.js":
/*!************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestHeaderFields.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const RequestHeaderFields = [{
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

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=ConvertKit0.0.1.js.map?ver=54c81a01401e29eb4186
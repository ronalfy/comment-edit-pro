(globalThis["webpackChunksimple_comment_editing_options"] = globalThis["webpackChunksimple_comment_editing_options"] || []).push([["Slack0.0.3"],{

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

/***/ "./src/js/react/components/icons/Slack.js":
/*!************************************************!*\
  !*** ./src/js/react/components/icons/Slack.js ***!
  \************************************************/
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

const SlackIcon = props => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 2134 2134",
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: props.width,
    height: props.height
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M1336.74 984.942c121.908 0 221.087-99.184 221.087-221.096V221.087C1557.827 99.179 1458.648 0 1336.74 0c-121.913 0-221.096 99.179-221.096 221.087V763.85c.004 121.908 99.187 221.092 221.096 221.092ZM1753.65 984.942h158.596c121.908 0 221.088-99.184 221.088-221.096-.001-121.909-99.18-221.088-221.088-221.088-121.913 0-221.096 99.179-221.096 221.088v158.596c0 34.516 27.984 62.5 62.5 62.5ZM221.088 1017.69h542.758c121.908 0 221.087-99.184 221.087-221.096 0-121.904-99.179-221.084-221.087-221.084H221.088C99.179 575.515 0 674.694 0 796.598c0 121.908 99.179 221.092 221.088 221.092ZM763.842 442.175h158.587c34.517 0 62.5-27.983 62.5-62.5V221.087C984.929 99.179 885.75 0 763.842 0 641.933 0 542.754 99.179 542.754 221.088c0 121.908 99.179 221.087 221.088 221.087ZM796.592 1148.39c-121.909 0-221.088 99.183-221.088 221.095v542.755c0 121.912 99.179 221.095 221.088 221.095 121.916.001 221.1-99.183 221.1-221.095v-542.754c0-121.913-99.188-221.096-221.1-221.096ZM379.679 1148.39H221.087C99.179 1148.39 0 1247.573 0 1369.485c0 121.909 99.179 221.088 221.088 221.088 121.912 0 221.095-99.179 221.095-221.088V1210.89c-.004-34.517-27.987-62.5-62.504-62.5ZM1912.25 1115.64h-542.754c-121.909 0-221.088 99.183-221.088 221.095 0 121.905 99.179 221.084 221.088 221.084h542.758c121.908 0 221.087-99.179 221.087-221.084-.004-121.912-99.183-221.095-221.091-221.095ZM1369.49 1691.15h-158.588c-34.516 0-62.5 27.983-62.5 62.5v158.592c0 121.912 99.179 221.095 221.088 221.095 121.912.001 221.096-99.183 221.096-221.095-.005-121.909-99.184-221.092-221.096-221.092Z",
    fill: props.fill
  }));
};
SlackIcon.defaultProps = {
  width: 32,
  height: 32,
  fill: '#FB6068'
};
SlackIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlackIcon);

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

/***/ "./src/js/react/views/integrations/Slack.js":
/*!**************************************************!*\
  !*** ./src/js/react/views/integrations/Slack.js ***!
  \**************************************************/
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
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/escape-html */ "@wordpress/escape-html");
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _components_icons_Slack__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/icons/Slack */ "./src/js/react/components/icons/Slack.js");

/* eslint-disable no-unused-vars */
















const retrieveRecaptchaSettings = () => {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_9__["default"])('sce_get_slack_options', {
    nonce: sceIntegrations.get_nonce
  });
};
const Slack = props => {
  const [defaults, getDefaults] = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveRecaptchaSettings, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_12__["default"], {
    fallback: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load Slack Settings.', 'comment-edit-pro'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slack', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_14___default()), {
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
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_15__.useForm)({
    defaultValues: {
      slackEnabled: data.slackEnabled,
      slackWebhookUrl: data.slackWebhookUrl,
      slackModerationEnabled: data.slackModerationEnabled,
      slackEditCommentsEnabled: data.slackEditCommentsEnabled
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
  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };
  const onSubmit = formData => {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_9__["default"])('sce_save_slack_options', {
      nonce: sceIntegrations.save_nonce,
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
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_9__["default"])('sce_reset_slack_options', {
      nonce: sceIntegrations.reset_nonce
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsReset(true);
        reset({
          slackEnabled: false,
          slackWebhookUrl: '',
          slackModerationEnabled: false,
          slackEditCommentsEnabled: false
        });
        setTimeout(() => {
          setIsReset(false);
        }, 3000);
      }
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setResetting(false);
    });
  };
  const getWebhookUrl = () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slack Webhook URL', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "slackWebhookUrl",
      control: control,
      rules: {
        required: true,
        validate: value => {
          return (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.isURL)(value);
        }
      },
      render: ({
        field: {
          onChange,
          value
        }
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slack Webhook URL', 'quotes-dlx'),
        value: (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_5__.escapeAttribute)(value),
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
          'has-error': 'required' === errors.slackWebhookUrl?.type || 'validate' === errors.slackWebhookUrl?.type,
          'is-required': true
        }),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Slack webhook URL', 'comment-edit-pro'),
        "aria-required": "true",
        onChange: newValue => {
          onChange(newValue);
        }
      })
    }), 'required' === errors.slackWebhookUrl?.type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_11__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.', 'comment-edit-pro'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_10__["default"]
    }), 'validate' === errors.slackWebhookUrl?.type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_11__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Please enter a valid URL.', 'comment-edit-pro'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_10__["default"]
    })));
  };
  const getModerationCheckbox = () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Moderated Comments', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "slackModerationEnabled",
      control: control,
      render: ({
        field: {
          onChange,
          value
        }
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Moderated Comments', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: boolValue => {
          onChange(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You will also receive notifications from comments in moderation.', 'comment-edit-pro')
      })
    })));
  };
  const getEditCommentsCheckbox = () => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Edited Comments', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
      name: "slackEditCommentsEnabled",
      control: control,
      render: ({
        field: {
          onChange,
          value
        }
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Comment Editing Notifications', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: boolValue => {
          onChange(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When a user edits their comment, send a Slack notification.', 'comment-edit-pro')
      })
    })));
  };
  const getSaveIcon = () => {
    if (saving) {
      return _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_7__["default"];
    }
    if (isSaved) {
      return _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_8__["default"];
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
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Slack Options', 'quotes-dlx');
  };
  const getResetText = () => {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'quotes-dlx');
    }
    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'quotes-dlx');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From Slack', 'quotes-dlx');
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sce-admin__tabs--content-heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_icons_Slack__WEBPACK_IMPORTED_MODULE_13__["default"], {
    width: 48,
    height: 48,
    fill: '#FB6068',
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "sce-admin__heading--text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Slack Notifications', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/slack-integration"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Receive a Slack notification when someone leaves a comment.', 'comment-edit-pro'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit(onSubmit)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "form-table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Slack Notifications', 'comment-edit-pro')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_hook_form__WEBPACK_IMPORTED_MODULE_15__.Controller, {
    name: "slackEnabled",
    control: control,
    render: ({
      field: {
        onChange,
        value
      }
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Slack Notifications', 'comment-edit-pro'),
      className: "sce-admin__toggle-control",
      checked: value,
      onChange: boolValue => {
        onChange(boolValue);
      },
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or disable Slack notifications.', 'comment-edit-pro')
    })
  }))), getValues('slackEnabled') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, getWebhookUrl(), getModerationCheckbox(), getEditCommentsCheckbox()))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sce-admin-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
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
  }), getValues('slackEnabled') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-danger qdlx__btn--icon-right', {
      'has-icon': resetting
    }, {
      'is-resetting': {
        resetting
      }
    }),
    type: "button",
    text: getResetText(),
    icon: resetting ? _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_7__["default"] : false,
    iconSize: "18",
    iconPosition: "right",
    disabled: saving || resetting,
    onClick: e => {
      setResetting(true);
      handleReset(e);
    }
  })), hasErrors() && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_11__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
    status: "error",
    politeness: "polite"
  }), isSaved && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_11__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  }), isReset && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Notice__WEBPACK_IMPORTED_MODULE_11__["default"], {
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been reset.', 'comment-edit-pro'),
    status: "success",
    politeness: "assertive"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slack);

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=Slack0.0.3.js.map
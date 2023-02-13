(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["Mailchimp0.0.1"],{

/***/ "./node_modules/@wordpress/components/build-module/radio-control/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@wordpress/components/build-module/radio-control/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RadioControl": () => (/* binding */ RadioControl),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "./node_modules/react/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "./node_modules/@wordpress/compose/build-module/hooks/use-instance-id/index.js");
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base-control */ "./node_modules/@wordpress/components/build-module/base-control/index.js");
/* harmony import */ var _v_stack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../v-stack */ "./node_modules/@wordpress/components/build-module/v-stack/component.js");



/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */



/**
 * Render a user interface to select the user type using radio inputs.
 *
 * ```jsx
 * import { RadioControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyRadioControl = () => {
 *   const [ option, setOption ] = useState( 'a' );
 *
 *   return (
 *     <RadioControl
 *       label="User type"
 *       help="The type of the current user"
 *       selected={ option }
 *       options={ [
 *         { label: 'Author', value: 'a' },
 *         { label: 'Editor', value: 'e' },
 *       ] }
 *       onChange={ ( value ) => setOption( value ) }
 *     />
 *   );
 * };
 * ```
 */

function RadioControl(props) {
  const {
    label,
    className,
    selected,
    help,
    onChange,
    hideLabelFromVision,
    options = [],
    ...additionalProps
  } = props;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__["default"])(RadioControl);
  const id = `inspector-radio-control-${instanceId}`;

  const onChangeValue = event => onChange(event.target.value);

  if (!(options !== null && options !== void 0 && options.length)) {
    return null;
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_base_control__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __nextHasNoMarginBottom: true,
    label: label,
    id: id,
    hideLabelFromVision: hideLabelFromVision,
    help: help,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, 'components-radio-control')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_v_stack__WEBPACK_IMPORTED_MODULE_5__["default"], {
    spacing: 1
  }, options.map((option, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", {
    key: `${id}-${index}`,
    className: "components-radio-control__option"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    id: `${id}-${index}`,
    className: "components-radio-control__input",
    type: "radio",
    name: id,
    value: option.value,
    onChange: onChangeValue,
    checked: option.value === selected,
    "aria-describedby": !!help ? `${id}__help` : undefined
  }, additionalProps)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
    htmlFor: `${id}-${index}`
  }, option.label)))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadioControl);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/components/build-module/text-control/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/components/build-module/text-control/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextControl": () => (/* binding */ TextControl),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "./node_modules/react/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/compose */ "./node_modules/@wordpress/compose/build-module/hooks/use-instance-id/index.js");
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base-control */ "./node_modules/@wordpress/components/build-module/base-control/index.js");



/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */



function UnforwardedTextControl(props, ref) {
  const {
    __nextHasNoMarginBottom,
    label,
    hideLabelFromVision,
    value,
    help,
    className,
    onChange,
    type = 'text',
    ...additionalProps
  } = props;
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_1__["default"])(TextControl);
  const id = `inspector-text-control-${instanceId}`;

  const onChangeValue = event => onChange(event.target.value);

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_base_control__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    label: label,
    hideLabelFromVision: hideLabelFromVision,
    id: id,
    help: help,
    className: className
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "components-text-control__input",
    type: type,
    id: id,
    value: value,
    onChange: onChangeValue,
    "aria-describedby": !!help ? id + '__help' : undefined,
    ref: ref
  }, additionalProps)));
}
/**
 * TextControl components let users enter and edit text.
 *
 * ```jsx
 * import { TextControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyTextControl = () => {
 *   const [ className, setClassName ] = useState( '' );
 *
 *   return (
 *     <TextControl
 *       label="Additional CSS Class"
 *       value={ className }
 *       onChange={ ( value ) => setClassName( value ) }
 *     />
 *   );
 * };
 * ```
 */


const TextControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(UnforwardedTextControl);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextControl);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/components/build-module/v-stack/component.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@wordpress/components/build-module/v-stack/component.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VStack": () => (/* binding */ VStack),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "./node_modules/react/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/context */ "./node_modules/@wordpress/components/build-module/ui/context/context-connect.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view */ "./node_modules/@wordpress/components/build-module/view/component.js");
/* harmony import */ var _hook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hook */ "./node_modules/@wordpress/components/build-module/v-stack/hook.js");



/**
 * External dependencies
 */

/**
 * Internal dependencies
 */




function UnconnectedVStack(props, forwardedRef) {
  const vStackProps = (0,_hook__WEBPACK_IMPORTED_MODULE_1__.useVStack)(props);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_view__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, vStackProps, {
    ref: forwardedRef
  }));
}
/**
 * `VStack` (or Vertical Stack) is a layout component that arranges child
 * elements in a vertical line.
 *
 * `VStack` can render anything inside.
 *
 * ```jsx
 * import {
 * 	__experimentalText as Text,
 * 	__experimentalVStack as VStack,
 * } from `@wordpress/components`;
 *
 * function Example() {
 * 	return (
 * 		<VStack>
 * 			<Text>Code</Text>
 * 			<Text>is</Text>
 * 			<Text>Poetry</Text>
 * 		</VStack>
 * 	);
 * }
 * ```
 */


const VStack = (0,_ui_context__WEBPACK_IMPORTED_MODULE_4__.contextConnect)(UnconnectedVStack, 'VStack');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VStack);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/@wordpress/components/build-module/v-stack/hook.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/components/build-module/v-stack/hook.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useVStack": () => (/* binding */ useVStack)
/* harmony export */ });
/* harmony import */ var _ui_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/context */ "./node_modules/@wordpress/components/build-module/ui/context/use-context-system.js");
/* harmony import */ var _h_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../h-stack */ "./node_modules/@wordpress/components/build-module/h-stack/hook.js");
/**
 * Internal dependencies
 */


function useVStack(props) {
  const {
    expanded = false,
    ...otherProps
  } = (0,_ui_context__WEBPACK_IMPORTED_MODULE_0__.useContextSystem)(props, 'VStack');
  const hStackProps = (0,_h_stack__WEBPACK_IMPORTED_MODULE_1__.useHStack)({
    direction: 'column',
    expanded,
    ...otherProps
  });
  return hStackProps;
}
//# sourceMappingURL=hook.js.map

/***/ }),

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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* eslint-disable no-undef */

/* eslint-disable camelcase */


function sendCommand(action, data) {
  var params = {
    action: action
  };
  var default_data = {
    nonce: false,
    action: action
  };

  if ('undefined' === typeof data) {
    data = {};
  }

  for (var opt in default_data) {
    if (!data.hasOwnProperty(opt)) {
      data[opt] = default_data[opt];
    }
  }

  var options = {
    method: 'post',
    url: ajaxurl,
    params: params,
    paramsSerializer: function paramsSerializer(jsparams) {
      return qs__WEBPACK_IMPORTED_MODULE_1___default().stringify(jsparams, {
        arrayFormat: 'brackets'
      });
    },
    data: qs__WEBPACK_IMPORTED_MODULE_1___default().stringify(data)
  };
  return axios__WEBPACK_IMPORTED_MODULE_0___default()(options);
}

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/a11y */ "./node_modules/@wordpress/a11y/build-module/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/notice/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line no-unused-vars

 // ES6





var Notice = function Notice(props) {
  var _classNames;

  var message = props.message,
      status = props.status,
      politeness = props.politeness,
      icon = props.icon,
      className = props.className,
      inline = props.inline,
      children = props.children;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_wordpress_a11y__WEBPACK_IMPORTED_MODULE_1__.speak)(message, politeness);
  }, [message, status, politeness]);

  var hasIcon = function hasIcon() {
    return icon !== null;
  };

  var getIcon = function getIcon(Icon) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Icon, {
      width: 16,
      height: 16,
      fill: "#6c757d"
    });
  };

  var containerClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'sce-admin__notice', (_classNames = {
    'sce-admin__notice--has-icon': hasIcon()
  }, _defineProperty(_classNames, "sce-admin__notice-type--".concat(status), true), _defineProperty(_classNames, "sce-admin__notice-appearance--inline", inline), _defineProperty(_classNames, "sce-admin__notice-appearance--block", !inline), _classNames));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: containerClasses
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
    isDismissible: false,
    spokenMessage: message,
    actions: []
  }, props), hasIcon() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__notice-icon"
  }, getIcon(icon)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__notice-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, message, " ", children, " "))));
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
  message: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string.isRequired),
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

var CircularExclamationIcon = function CircularExclamationIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    width: props.width,
    height: props.height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    fill: "var( ".concat(props["var"], ")"),
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable no-unused-vars */


function ClipboardCheck(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", _extends({
    "aria-hidden": "true",
    "data-prefix": "fas",
    "data-icon": "clipboard-check",
    className: "prefix__svg-inline--fa prefix__fa-clipboard-check prefix__fa-w-12",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 384 512",
    width: "16",
    height: "16"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

var Spinner = function Spinner(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512",
    width: props.width,
    height: props.height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    className: "fa-primary",
    fill: props.primaryColor,
    d: "M256 32c0-17.67 14.3-32 32-32 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-8.8 15.3-28.4 20.6-44.6 11.7-14.4-8.8-19.6-28.4-10.8-44.6 16.3-27.3 25.7-60.1 25.7-96 0-106-86-192-192-192-17.7 0-32-13.43-32-32v.9z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
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
  primaryColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired),
  secondaryColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./src/js/react/views/integrations/Mailchimp.js":
/*!******************************************************!*\
  !*** ./src/js/react/views/integrations/Mailchimp.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/radio-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
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













var retrieveAvatarOptions = function retrieveAvatarOptions() {
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_get_mailchimp_options', {
    nonce: sceIntegrations.get_nonce
  });
};

var Mailchimp = function Mailchimp(props) {
  var _useAsyncResource = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveAvatarOptions, []),
      _useAsyncResource2 = _slicedToArray(_useAsyncResource, 2),
      defaults = _useAsyncResource2[0],
      getDefaults = _useAsyncResource2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_9___default()), {
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

  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useForm)({
    defaultValues: {
      enableMailchimp: data.enableMailchimp,
      apiKey: data.apiKey,
      mailchimpServerPrefix: data.mailchimpServerPrefix,
      mailchimpLists: data.mailchimpLists,
      selectedList: data.selectedList,
      signUpLabel: data.signUpLabel,
      checkboxEnabled: data.checkboxEnabled
    }
  }),
      register = _useForm.register,
      control = _useForm.control,
      handleSubmit = _useForm.handleSubmit,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      reset = _useForm.reset,
      setError = _useForm.setError;

  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useWatch)({
    control: control
  });

  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useFormState)({
    control: control
  }),
      errors = _useFormState.errors,
      isDirty = _useFormState.isDirty,
      dirtyFields = _useFormState.dirtyFields,
      touchedFields = _useFormState.touchedFields;

  var hasErrors = function hasErrors() {
    return Object.keys(errors).length > 0;
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var apiKey = getValues('apiKey');

    if ('' === apiKey || null === apiKey) {
      return;
    } // Try to get server prefix for Mailchimp API key.


    var regex = new RegExp(/-(\w+)$/);
    var matches = apiKey.match(regex); // If no matches, return empty string.

    if (null === matches) {
      return;
    } // We have matches! Match should be index 1.


    var serverPrefix = matches[1];
    setValue('mailchimpServerPrefix', serverPrefix, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false
    });
  }, [formValues.apiKey]);

  var onSubmit = function onSubmit(formData) {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_save_mailchimp_options', _objectSpread({
      nonce: sceIntegrations.save_nonce
    }, formData)).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var lists = ajaxData.lists,
            mailchimp_selected_list = ajaxData.mailchimp_selected_list,
            mailchimp_signup_label = ajaxData.mailchimp_signup_label;
        var listsValues = [];
        lists.forEach(function (keys, index) {
          listsValues.push(keys);
        });
        setValue('selectedList', mailchimp_selected_list);
        setValue('mailchimpLists', listsValues);
        setValue('signUpLabel', mailchimp_signup_label);
        setIsSaved(true);
        setTimeout(function () {
          setIsSaved(false);
        }, 3000);
      } else {
        setError('apiKey', {
          type: 'noLists',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setSaving(false);
    });
  };

  var handleReset = function handleReset() {
    setResetting(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_reset_mailchimp_options', {
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
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Label', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
      name: "signUpLabel",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref) {
        var _errors$signUpLabel;

        var field = _ref.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_11__["default"], _extends({}, field, {
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
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
      name: "checkboxEnabled",
      control: control,
      render: function render(_ref2) {
        var _ref2$field = _ref2.field,
            _onChange = _ref2$field.onChange,
            value = _ref2$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox Checked', 'comment-edit-pro'),
          className: "sce-admin__toggle-control",
          checked: value,
          onChange: function onChange(boolValue) {
            _onChange(boolValue);
          },
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Check the newsletter checkbox by default (not recommended).', 'comment-edit-pro')
        });
      }
    })));
  };

  var getMailchimpLists = function getMailchimpLists() {
    var _errors$selectedList;

    var mailchimpCurrentLists = getValues('mailchimpLists');

    if (mailchimpCurrentLists.length === 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp Lists', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
      name: "mailchimpLists",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
            _onChange2 = _ref3$field.onChange,
            value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a default list', 'comment-edit-pro'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a default list that will be used for your newsletter prompt', 'comment-edit-pro'),
          selected: getValues('selectedList'),
          options: getValues('mailchimpLists'),
          onChange: function onChange(listValue) {
            _onChange2(getValues('mailchimpLists'));

            setValue('selectedList', listValue);
          }
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
      name: "selectedList",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref4) {
        var field = _ref4.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_11__["default"], _extends({}, field, {
          type: "hidden",
          "aria-hidden": "true"
        }));
      }
    }), 'required' === ((_errors$selectedList = errors.selectedList) === null || _errors$selectedList === void 0 ? void 0 : _errors$selectedList.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };

  var getServerPrefix = function getServerPrefix() {
    var apiKey = getValues('apiKey');

    if ('' === apiKey) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    } // Output server prefix in readonly mode.


    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Server Prefix', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
      name: "mailchimpServerPrefix",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref5) {
        var _errors$apiKey;

        var field = _ref5.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_11__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp Server Prefix', 'quotes-dlx')
        }, field, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$apiKey = errors.apiKey) === null || _errors$apiKey === void 0 ? void 0 : _errors$apiKey.type),
            'is-required': true
          }),
          disabled: true,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A server prefix is automatically generated for API access.', 'comment-edit-pro'),
          "aria-required": "true"
        }));
      }
    })));
  };

  var getAPIKey = function getAPIKey() {
    var _errors$apiKey3, _errors$apiKey4;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('API Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
      name: "apiKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref6) {
        var _errors$apiKey2;

        var field = _ref6.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_11__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp API Key', 'quotes-dlx')
        }, field, {
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$apiKey2 = errors.apiKey) === null || _errors$apiKey2 === void 0 ? void 0 : _errors$apiKey2.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your Mailchimp API Key in order to choose a default list.', 'comment-edit-pro'),
          "aria-required": "true"
        }));
      }
    }), 'required' === ((_errors$apiKey3 = errors.apiKey) === null || _errors$apiKey3 === void 0 ? void 0 : _errors$apiKey3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'noLists' === ((_errors$apiKey4 = errors.apiKey) === null || _errors$apiKey4 === void 0 ? void 0 : _errors$apiKey4.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No Mailchimp lists for the API key were found.'),
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
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'quotes-dlx');
    }

    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saved', 'quotes-dlx');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Mailchimp Options', 'quotes-dlx');
  };

  var getResetText = function getResetText() {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'quotes-dlx');
    }

    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'quotes-dlx');
    }

    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From Mailchimp', 'quotes-dlx');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp', 'comment-edit-pro'), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/mailchimp-integration"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When someone leaves a comment, they can be given the option to subscribe to your newsletter on Mailchimp.', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "form-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
    name: "enableMailchimp",
    control: control,
    render: function render(_ref7) {
      var _ref7$field = _ref7.field,
          _onChange3 = _ref7$field.onChange,
          value = _ref7$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_12__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Mailchimp', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          //setShowButtonOptions( boolValue );
          _onChange3(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or Disable the Mailchimp Integration.', 'comment-edit-pro')
      });
    }
  }))), getValues('enableMailchimp') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getAPIKey(), getServerPrefix(), getMailchimpLists(), getNewsletterLabel(), getSignupCheckbox()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin-buttons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
  }), '' !== getValues('selectedList') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mailchimp);

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=Mailchimp0.0.1.chunk.bundle.js.map
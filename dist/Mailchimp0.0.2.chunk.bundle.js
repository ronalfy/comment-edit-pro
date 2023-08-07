(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["Mailchimp0.0.2"],{

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
    alignment = 'stretch',
    ...otherProps
  } = (0,_ui_context__WEBPACK_IMPORTED_MODULE_0__.useContextSystem)(props, 'VStack');
  const hStackProps = (0,_h_stack__WEBPACK_IMPORTED_MODULE_1__.useHStack)({
    direction: 'column',
    expanded,
    alignment,
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
  var ajaxUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
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
  var sendAjaxUrl = '';
  if (typeof ajaxurl === 'undefined') {
    sendAjaxUrl = ajaxUrl;
  } else {
    sendAjaxUrl = ajaxurl;
  }
  var options = {
    method: 'post',
    url: sendAjaxUrl,
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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

/***/ "./src/js/react/components/icons/Mailchimp.js":
/*!****************************************************!*\
  !*** ./src/js/react/components/icons/Mailchimp.js ***!
  \****************************************************/
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

var MailchimpIcon = function MailchimpIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    viewBox: "0 0 1600 1697",
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: props.width,
    height: props.height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M363.302 880.469A158.2 158.2 0 0 0 326.07 883c-75.382 12.218-131.357 78.242-131.357 154.942 0 9.223.81 18.429 2.419 27.509 8.92 84.554 98.664 155.856 181.742 157.978 8.527.217 17.055-.352 25.479-1.699 89.9-14.618 113.439-107.676 98.62-199.082-16.739-103.204-89.967-139.585-139.671-142.179Zm88.09 244.517c-7.722 11.613-21.236 18.03-35.071 16.652-24.664-1.961-43.833-23.063-43.526-47.913a117.48 117.48 0 0 1 9.049-46.767c7.936-19.347.518-41.846-17.346-52.61a48.821 48.821 0 0 0-35.759-6.36 45.956 45.956 0 0 0-29.265 19.273 99.71 99.71 0 0 0-10.724 24.042c-.487 1.481-.873 2.641-1.167 3.398-4.073 10.435-10.574 13.485-14.969 12.919a8.604 8.604 0 0 1-6.772-6.374c-4.622-28.24 4.659-57.046 24.877-77.211 17.587-17.632 42.338-26.141 66.992-23.033 25.933 3.129 48.72 18.929 60.829 42.175 11.65 27.975 8.862 59.991-7.445 85.51a397.468 397.468 0 0 0-2.742 5.951 33.894 33.894 0 0 0-.859 32.695 24.028 24.028 0 0 0 19.952 9.644 45.807 45.807 0 0 0 10.896-1.461c4.617-1.024 9.392-2.081 12.298 1.392a6.902 6.902 0 0 1 .752 8.08v-.002Z",
    style: {
      fill: '#fff',
      fillRule: 'nonzero'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M1512.14 1298.38a473.014 473.014 0 0 0 32.101-149.709c0-63.106-35.57-89.263-58.22-89.263-.693-2.437-5.173-18.892-11.342-38.7a312.336 312.336 0 0 0-12.54-33.761c18.53-25.713 26.379-57.691 21.874-89.11-3.709-24.229-15.184-46.595-32.676-63.689-33.207-28.315-72.838-48.003-115.394-57.328-6.412-1.799-27.545-7.619-29.401-8.189-.146-1.215-1.544-69.517-2.818-98.841a339.787 339.787 0 0 0-12.978-86.88c-10.024-40.568-30.751-77.681-59.992-107.419 73.218-76.129 118.925-159.989 118.814-231.93-.208-138.353-169.605-180.221-378.353-93.513-.229.097-43.921 18.676-44.233 18.836-.194-.195-79.962-78.692-81.16-79.748-238-208.226-982.153 621.436-744.233 822.938l51.996 44.18a257.062 257.062 0 0 0-14.459 118.378c7.046 58.252 35.737 111.735 80.295 149.682 43.254 39.431 99.175 62.016 157.564 63.634 92.585 214.01 304.124 345.292 552.161 352.683 266.067 7.925 489.412-117.3 582.994-342.251Zm54.612-253.266c22.787 29.541 34.52 66.212 33.133 103.557a522.268 522.268 0 0 1-35.882 169.934l-.504 1.271c-48.272 116.601-132.592 214.589-240.462 279.444-112.283 65.601-240.245 99.304-370.127 97.486h-.028a861.23 861.23 0 0 1-25.384-.382c-128.189-2.69-253.353-39.802-362.448-107.467-96.029-60.448-173.759-146.184-224.716-247.862-58.706-9.159-113.531-35.213-157.813-74.997-55.045-47.238-90.337-113.667-98.762-185.896a322.984 322.984 0 0 1 5.997-105.036l-24.138-20.502C26.145 920.419 2.475 871.258.257 818.914a387.017 387.017 0 0 1 27.165-157.355c49.55-135.888 163.539-297.697 304.941-432.848A1136.336 1136.336 0 0 1 540.952 67.979C603.91 27.531 676.233 4.132 750.857.067c48.12-1.26 95.027 15.502 131.542 47.006 2.085 1.827 33.334 32.527 57.036 55.849 5.948-2.521 10.227-4.335 10.352-4.383a592.158 592.158 0 0 1 221.932-49.472c141.665 0 233.316 76.309 233.496 194.41.111 72.872-35.508 154.563-101.172 233.645a323.323 323.323 0 0 1 40.072 89.957 397.25 397.25 0 0 1 15.198 100.258c.638 14.6 1.288 38.026 1.815 58.703 48.441 12.317 93.215 36.2 130.503 69.614 25.277 25.191 41.861 57.869 47.307 93.215a172.483 172.483 0 0 1-15.372 102.357 431.778 431.778 0 0 1 4.238 12.856c1.24 3.987 2.41 7.828 3.504 11.474a117.957 117.957 0 0 1 35.445 29.558h-.001Z",
    style: {
      fill: '#fff',
      fillRule: 'nonzero'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M1398.1 976.018c18.26-17.237 27.919-41.805 26.313-66.923a58.31 58.31 0 0 0-16.556-32.992 206.198 206.198 0 0 0-90.834-43.691c-15.257-4.349-25.609-7.134-36.761-10.861-19.834-6.63-29.635-11.97-31.854-49.84-.969-16.563-3.815-74.262-4.839-98.104-1.807-41.779-6.762-98.886-41.647-122.462a57.906 57.906 0 0 0-29.834-9.682 55.524 55.524 0 0 0-17.702 1.759 93.411 93.411 0 0 0-46.376 26.62c-32.841 30.125-76.822 45.037-121.12 41.067-24.418-1.04-50.294-4.9-79.955-6.687-5.773-.342-11.56-.705-17.34-1.012-78.869 2.34-144.808 63.003-154.04 141.717-16.982 118.652 67.626 179.967 92.05 215.946a30.252 30.252 0 0 1 6.722 16.13 25.922 25.922 0 0 1-8.694 16.995l.007.035c-68.657 77.634-93.492 185.24-65.846 285.301a237.74 237.74 0 0 0 12.378 34.605c61.735 146.513 253.251 214.745 440.355 152.69a455.573 455.573 0 0 0 71.083-30.501 373.983 373.983 0 0 0 108.852-82.612c48.252-49.159 79.956-112.306 90.628-180.504 5.635-37.759-2.618-52.374-13.855-59.402a40.871 40.871 0 0 0-26.136-4.844 368.872 368.872 0 0 0-24.892-86.188l-20.107-46.56ZM1091.47 410.153c3.019.696 4.937-4.543 2.236-6.063a337.345 337.345 0 0 0-144.317-37.937c-1.425-.022-2.586-1.206-2.586-2.638 0-.568.184-1.122.523-1.578a147.129 147.129 0 0 1 27.157-27.337 2.731 2.731 0 0 0 1.049-2.151c0-1.494-1.224-2.723-2.711-2.723-.053 0-.106.002-.159.005-61.605 6.078-120.837 27.054-172.616 61.127-.44.298-.958.458-1.488.458-1.46 0-2.661-1.207-2.661-2.673 0-.196.021-.392.064-.583a190.673 190.673 0 0 1 18.266-44.715c.205-.377.312-.8.312-1.23 0-1.408-1.153-2.567-2.555-2.567-.41 0-.814.099-1.178.289-74.773 41.253-141.419 95.881-196.651 161.19a2.698 2.698 0 0 0-.659 1.768c0 1.475 1.209 2.689 2.677 2.689a2.67 2.67 0 0 0 1.562-.505c64.005-44.927 136.116-76.899 212.292-94.125a585.852 585.852 0 0 1 261.442-.702M871.242 198.219s-64.777-75.33-84.33-80.886C666.608 84.724 406.738 264.492 240.81 501.999c-67.139 96.098-163.249 266.275-117.292 353.803a352.184 352.184 0 0 0 54.917 53.112c30.781-43.339 77.153-73.013 129.264-82.72 65.417-183.708 180.279-345.65 331.772-467.757a1694.155 1694.155 0 0 1 231.771-160.218",
    style: {
      fill: '#fff',
      fillRule: 'nonzero'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M447.036 1121.72a7.327 7.327 0 0 1 .73 8.213c-7.112 11.594-20.204 18.163-33.704 16.912-24.374-2.638-42.785-24.056-41.83-48.663a125.63 125.63 0 0 1 8.697-47.506c7.703-19.451.713-41.862-16.663-53.421a44.8 44.8 0 0 0-34.366-6.463c-11.608 2.453-21.752 9.514-28.115 19.571a104.604 104.604 0 0 0-10.312 24.415c-.462 1.505-.834 2.686-1.116 3.449-3.915 10.609-10.158 13.702-14.387 13.134-2-.278-4.749-1.621-6.512-6.477-4.479-28.425 4.353-57.392 23.912-78.423 16.443-17.736 40.437-26.451 64.37-23.382 25.383 3.504 47.375 19.617 58.45 42.825 11.194 28.468 8.55 60.613-7.146 86.849-.981 2.202-1.878 4.223-2.635 6.051a36.112 36.112 0 0 0-.826 33.203 22.68 22.68 0 0 0 19.169 9.789 41.88 41.88 0 0 0 10.465-1.485c4.442-1.046 9.031-2.118 11.819 1.407m1094.82 27.457a473.831 473.831 0 0 1-31.89 149.4c-92.974 224.474-314.855 349.441-579.177 341.531-246.409-7.375-456.569-138.385-548.549-351.945-58.052-1.631-113.627-24.178-156.525-63.5-44.311-37.945-72.805-91.3-79.772-149.369a257.596 257.596 0 0 1 14.364-118.128l-51.656-44.09c-236.36-201.078 502.91-1029 739.36-821.204 1.193 1.046 80.432 79.386 80.631 79.579.315-.162 43.72-18.707 43.941-18.797 207.385-86.527 375.669-44.749 375.88 93.307.109 71.798-45.298 155.484-118.032 231.447 29.066 29.716 49.651 66.744 59.59 107.189a340.174 340.174 0 0 1 12.895 86.708c1.262 29.258 2.659 97.421 2.8 98.634 1.846.562 22.842 6.367 29.206 8.169 42.309 9.321 81.688 28.973 114.642 57.211 17.393 17.083 28.791 39.396 32.461 63.552 4.482 31.337-3.31 63.23-21.726 88.922a313.21 313.21 0 0 1 12.458 33.694c6.121 19.772 10.575 36.18 11.261 38.614 22.5-.001 57.838 26.1 57.838 89.077v-.001Zm-1044.53-123.177c-16.074-104.82-86.45-141.762-134.202-144.397a144.14 144.14 0 0 0-35.781 2.563c-85.232 17.325-133.369 90.376-123.897 185.297 14.153 87.352 86.76 154.06 174.636 160.448 8.197.22 16.396-.36 24.482-1.73 86.385-14.844 109.002-109.352 94.762-202.181ZM643.006 360.6a1683.092 1683.092 0 0 1 230.251-159.881c81.036-46.78-64.344-75.169-83.776-80.708C669.968 87.459 411.793 266.854 246.957 503.86 180.259 599.756 84.78 769.581 130.43 856.922a350.38 350.38 0 0 0 54.559 53.001c30.51-43.198 76.59-72.816 128.421-82.543 64.862-183.153 178.959-344.739 329.596-466.78Zm259.752 829.489c6.443 28.34 27.9 50.94 55.777 58.748a250.277 250.277 0 0 0 43.941 12.023c189.049 32.764 365.787-76.144 405.58-103.574 2.987-2.06 4.961-.052 2.564 3.584a63.421 63.421 0 0 1-3.897 5.598c-48.7 63.294-179.628 136.59-349.969 136.564-74.292-.013-148.545-26.384-175.809-66.903-42.298-62.874-2.096-154.644 68.385-145.081.083.013 24.116 2.757 30.871 3.512 109.552 10.583 219.997-7.225 320.749-51.715 96.159-44.975 132.485-94.47 127.035-134.535a57.763 57.763 0 0 0-16.579-32.758 206.98 206.98 0 0 0-90.91-43.386c-15.273-4.32-25.636-7.077-36.8-10.783-19.848-6.587-29.66-11.888-31.885-49.495-.967-16.447-3.813-73.742-4.844-97.421-1.814-41.487-6.762-98.195-41.69-121.609a58.22 58.22 0 0 0-29.853-9.615 56.11 56.11 0 0 0-17.727 1.75 93.703 93.703 0 0 0-46.413 26.436c-32.983 29.945-76.96 44.736-121.243 40.778-24.437-1.027-50.336-4.863-80.021-6.638-5.775-.343-11.575-.704-17.362-1.001-78.649 2.072-144.62 62.285-154.185 140.728-16.997 117.825 67.691 178.71 92.14 214.438a29.895 29.895 0 0 1 6.73 16.02 25.71 25.71 0 0 1-8.704 16.873v.039c-68.658 76.834-93.556 183.87-65.902 283.31a234.95 234.95 0 0 0 12.388 34.366c61.795 145.494 253.49 213.243 440.771 151.615a458.151 458.151 0 0 0 71.151-30.271 374.177 374.177 0 0 0 108.958-82.046c48.225-48.685 79.973-111.419 90.711-179.246 5.638-37.503-2.614-52.006-13.869-58.987a41.238 41.238 0 0 0-26.161-4.817 364.124 364.124 0 0 0-24.911-85.59 544.727 544.727 0 0 1-178.366 89.381 717.202 717.202 0 0 1-238.518 25.985c-51.719-4.21-85.936-19.423-98.806 22.718a555.191 555.191 0 0 0 243.204 24.924c.149-.015.299-.023.449-.023 2.251 0 4.158 1.737 4.377 3.988a4.733 4.733 0 0 1-2.73 4.715c-1.809.829-96.064 44.939-248.627-2.599ZM621.415 506.831c63.537-44.807 135.184-76.713 210.903-93.921a579.518 579.518 0 0 1 259.733-.704c2.992.691 4.903-4.533 2.224-6.043a334.07 334.07 0 0 0-143.38-37.865 2.637 2.637 0 0 1-2.571-2.63c0-.567.183-1.12.521-1.574a146.685 146.685 0 0 1 26.987-27.282 2.724 2.724 0 0 0-1.813-4.862c-61.235 6.081-120.092 27.018-171.489 61.003a2.642 2.642 0 0 1-1.482.457c-1.449 0-2.642-1.198-2.642-2.654 0-.199.023-.398.067-.592a190.65 190.65 0 0 1 18.143-44.62c.206-.377.314-.8.314-1.23 0-1.404-1.149-2.559-2.547-2.559-.405 0-.804.097-1.164.283-74.333 41.214-140.544 95.732-195.362 160.862a2.683 2.683 0 0 0-.656 1.759c0 1.466 1.201 2.673 2.661 2.673.557 0 1.1-.175 1.553-.501Zm497.837 399.952c10.66 6.78 24.849 4.411 32.752-5.467 4.768-9.271-2.155-21.845-15.471-28.091-10.662-6.777-24.852-4.403-32.752 5.481-4.775 9.264 2.155 21.838 15.471 28.077Zm40.843-150.336a113.54 113.54 0 0 0 20.166 46.1 127.93 127.93 0 0 1 31.359 0 97.904 97.904 0 0 0 1.532-56.674c-7.526-34.368-17.712-55.168-38.76-51.935-21.041 3.24-21.817 28.141-14.297 62.509Zm44.775 78.949a26.316 26.316 0 0 0-7.288-1.029c-14.495 0-26.423 11.981-26.423 26.541s11.928 26.542 26.423 26.542c14.33 0 26.182-11.71 26.419-26.102 1.576-12.331-6.93-23.87-19.131-25.952Z",
    fill: props.fill
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M971.522 870.434a127.06 127.06 0 0 0 .983-64.705c-7.616-34.421-19.131-54.09-40.473-50.85-21.342 3.239-21.895 30.979-15.016 65.544a126.548 126.548 0 0 0 18.148 44.429c16.982 23.805 28.497 17.644 36.327 5.582h.031Z",
    fill: props.fill
  }));
};
MailchimpIcon.defaultProps = {
  width: 32,
  height: 34,
  fill: '#FB6068'
};
MailchimpIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MailchimpIcon);

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
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/radio-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _components_icons_Mailchimp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/icons/Mailchimp */ "./src/js/react/components/icons/Mailchimp.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Could not load Mailchimp Settings.', 'comment-edit-pro'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      href: "https://dlxplugins.com/support/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "DLX Plugins Support"))
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_11___default()), {
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
  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_12__.useForm)({
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
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var apiKey = getValues('apiKey');
    if ('' === apiKey || null === apiKey) {
      return;
    }
    // Try to get server prefix for Mailchimp API key.
    var regex = new RegExp(/-(\w+)$/);
    var matches = apiKey.match(regex);

    // If no matches, return empty string.
    if (null === matches) {
      return;
    }

    // We have matches! Match should be index 1.
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
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Label', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "signUpLabel",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref) {
        var _errors$signUpLabel;
        var field = _ref.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({}, field, {
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
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "checkboxEnabled",
      control: control,
      render: function render(_ref2) {
        var _ref2$field = _ref2.field,
          _onChange = _ref2$field.onChange,
          value = _ref2$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp Lists', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "mailchimpLists",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
          _onChange2 = _ref3$field.onChange,
          value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
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
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "selectedList",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref4) {
        var field = _ref4.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({}, field, {
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
    }

    // Output server prefix in readonly mode.
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Server Prefix', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "mailchimpServerPrefix",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref5) {
        var _errors$apiKey;
        var field = _ref5.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp Server Prefix', 'comment-edit-pro')
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
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('API Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
      name: "apiKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref6) {
        var _errors$apiKey2;
        var field = _ref6.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp API Key', 'comment-edit-pro')
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
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saving…', 'comment-edit-pro');
    }
    if (isSaved) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Saved', 'comment-edit-pro');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Mailchimp Options', 'comment-edit-pro');
  };
  var getResetText = function getResetText() {
    if (resetting) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnecting…', 'comment-edit-pro');
    }
    if (isReset) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnected', 'comment-edit-pro');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Disconnect From Mailchimp', 'comment-edit-pro');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__tabs--content-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_icons_Mailchimp__WEBPACK_IMPORTED_MODULE_10__["default"], {
    width: 48,
    height: 51,
    fill: '#FB6068',
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "sce-admin__heading--text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/mailchimp-integration"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When someone leaves a comment, they can be given the option to subscribe to your newsletter on Mailchimp.', 'comment-edit-pro'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", {
    className: "form-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    scope: "row"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mailchimp', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_12__.Controller, {
    name: "enableMailchimp",
    control: control,
    render: function render(_ref7) {
      var _ref7$field = _ref7.field,
        _onChange3 = _ref7$field.onChange,
        value = _ref7$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
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
  }), '' !== getValues('selectedList') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
//# sourceMappingURL=Mailchimp0.0.2.chunk.bundle.js.map
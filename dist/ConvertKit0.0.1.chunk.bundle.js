"use strict";
(self["webpackChunksimple_comment_editing_options"] = self["webpackChunksimple_comment_editing_options"] || []).push([["ConvertKit0.0.1"],{

/***/ "./node_modules/@wordpress/components/build-module/checkbox-control/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/components/build-module/checkbox-control/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CheckboxControl": () => (/* binding */ CheckboxControl),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "./node_modules/react/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "./node_modules/@wordpress/compose/build-module/hooks/use-ref-effect/index.js");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "./node_modules/@wordpress/compose/build-module/hooks/use-instance-id/index.js");
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/deprecated */ "./node_modules/@wordpress/deprecated/build-module/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/reset.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _base_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../base-control */ "./node_modules/@wordpress/components/build-module/base-control/index.js");



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
 * Checkboxes allow the user to select one or more items from a set.
 *
 * ```jsx
 * import { CheckboxControl } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyCheckboxControl = () => {
 *   const [ isChecked, setChecked ] = useState( true );
 *   return (
 *     <CheckboxControl
 *       label="Is author"
 *       help="Is the user a author or not?"
 *       checked={ isChecked }
 *       onChange={ setChecked }
 *     />
 *   );
 * };
 * ```
 */
function CheckboxControl(props) {
  const {
    __nextHasNoMarginBottom,
    label,
    className,
    heading,
    checked,
    indeterminate,
    help,
    onChange,
    ...additionalProps
  } = props;

  if (heading) {
    (0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_2__["default"])('`heading` prop in `CheckboxControl`', {
      alternative: 'a separate element to implement a heading',
      since: '5.8'
    });
  }

  const [showCheckedIcon, setShowCheckedIcon] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [showIndeterminateIcon, setShowIndeterminateIcon] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false); // Run the following callback every time the `ref` (and the additional
  // dependencies) change.

  const ref = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__["default"])(node => {
    if (!node) {
      return;
    } // It cannot be set using an HTML attribute.


    node.indeterminate = !!indeterminate;
    setShowCheckedIcon(node.matches(':checked'));
    setShowIndeterminateIcon(node.matches(':indeterminate'));
  }, [checked, indeterminate]);
  const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__["default"])(CheckboxControl);
  const id = `inspector-checkbox-control-${instanceId}`;

  const onChangeValue = event => onChange(event.target.checked);

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_base_control__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __nextHasNoMarginBottom: __nextHasNoMarginBottom,
    label: heading,
    id: id,
    help: help,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('components-checkbox-control', className)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", {
    className: "components-checkbox-control__input-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    id: id,
    className: "components-checkbox-control__input",
    type: "checkbox",
    value: "1",
    onChange: onChangeValue,
    checked: checked,
    "aria-describedby": !!help ? id + '__help' : undefined
  }, additionalProps)), showIndeterminateIcon ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"],
    className: "components-checkbox-control__indeterminate",
    role: "presentation"
  }) : null, showCheckedIcon ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
    className: "components-checkbox-control__checked",
    role: "presentation"
  }) : null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createElement)("label", {
    className: "components-checkbox-control__label",
    htmlFor: id
  }, label));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxControl);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/check.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/check.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "./node_modules/react/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "./node_modules/@wordpress/primitives/build-module/svg/index.js");


/**
 * WordPress dependencies
 */

const check = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (check);
//# sourceMappingURL=check.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/reset.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/reset.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "./node_modules/react/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "./node_modules/@wordpress/primitives/build-module/svg/index.js");


/**
 * WordPress dependencies
 */

const reset = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M7 11.5h10V13H7z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reset);
//# sourceMappingURL=reset.js.map

/***/ }),

/***/ "./src/js/react/components/icons/ConvertKit.js":
/*!*****************************************************!*\
  !*** ./src/js/react/components/icons/ConvertKit.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);

 // ES6

var ConvertKitIcon = function ConvertKitIcon(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    viewBox: "0 0 1600 1500",
    xmlns: "http://www.w3.org/2000/svg",
    xmlSpace: "preserve",
    width: props.width,
    height: props.height
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M772.031 1184.2c277.837 0 492.588-212.07 492.588-473.68 0-245.084-201.745-394.733-335.381-394.733-186.076 0-335.222 131.93-356.472 327.783-3.938 36.27-32.381 66.685-68.477 66.425-60.008-.435-147.245-.95-202.469-.76-23.774.085-43.431-19.41-42.256-43.41 8.334-169.862 64.548-328.686 171.743-450.69C550.42 79.568 723.882-.005 929.238-.005 1274.272-.005 1600 316.741 1600 710.52c0 436.015-357.563 789.475-820.627 789.475-330.241 0-662.845-218.05-778.968-522.89-.431-1.13-.501-2.31-.291-3.535 1.545-9.02 4.616-17.26 7.64-25.375 4.397-11.795 8.696-23.325 8.068-36.62l-2.007-42.46c-.989-20.95 10.725-40.43 29.674-49.34l16.786-7.895c19.141-9.005 32.747-26.735 36.513-47.575 5.627-31.145 32.686-53.785 64.27-53.785 49.318 0 92.209 33.135 108.32 80.25 77.542 226.765 200.814 393.43 502.653 393.43Z",
    fill: props.fill
  }));
};

ConvertKitIcon.defaultProps = {
  width: 32,
  height: 30,
  fill: '#FB6068'
};
ConvertKitIcon.propTypes = {
  width: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  height: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  fill: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConvertKitIcon);

/***/ }),

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
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/text-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/toggle-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/radio-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/button/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/checkbox-control/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @wordpress/components */ "./node_modules/@wordpress/components/build-module/select-control/index.js");
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _webhooks_RequestHeaderFields__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../webhooks/RequestHeaderFields */ "./src/js/react/views/webhooks/RequestHeaderFields.js");
/* harmony import */ var _components_icons_ConvertKit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/icons/ConvertKit */ "./src/js/react/components/icons/ConvertKit.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_12___default()), {
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
  var _data$forms, _data$tags, _data$customFields;

  var tagInput = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var customFieldInputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
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

  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isRefreshingTags = _useState12[0],
      setIsRefreshingTags = _useState12[1];

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState14 = _slicedToArray(_useState13, 2),
      isRefreshingForms = _useState14[0],
      setIsRefreshingForms = _useState14[1];

  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isRefreshingCustomFields = _useState16[0],
      setIsRefreshingCustomFields = _useState16[1];

  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isAddingTag = _useState18[0],
      setIsAddingTag = _useState18[1];

  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      isAddingCustomField = _useState20[0],
      setIsAddingCustomField = _useState20[1];

  var _useForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm)({
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
  }),
      register = _useForm.register,
      control = _useForm.control,
      handleSubmit = _useForm.handleSubmit,
      setValue = _useForm.setValue,
      getValues = _useForm.getValues,
      reset = _useForm.reset,
      setError = _useForm.setError,
      clearErrors = _useForm.clearErrors,
      trigger = _useForm.trigger;

  var formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useWatch)({
    control: control
  });

  var _useFormState = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useFormState)({
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
    // If convertkit is disabled, no need to refresh.
    if (!getValues('enableConvertKit')) {
      return false;
    } // If api isn't valid, refresh.


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


  var canShowSaveButton = function canShowSaveButton() {
    // If convertkit is disabled and form is not dirty, no save button.
    if (!getValues('enableConvertKit') && !isDirty) {
      return false;
    } // If convertKit is disabled, we can always save.


    if (!getValues('enableConvertKit')) {
      return true;
    }

    var forms = getValues('forms');
    var tags = getValues('tags');

    if (getValues('apiValid') && forms.length === 0 && tags.length === 0) {
      return false;
    }

    if (!getValues('apiValid') && isDirty) {
      return false;
    }

    if (needsCredentialRefresh()) {
      return false;
    } // Check to see if any forms are selected.


    if (getValues('formOrTag') === 'form') {
      if (forms.length === 0) {
        return false;
      }

      if ('0' === getValues('selectedForm')) {
        return false;
      }

      if ('0' !== getValues('selectedForm')) {
        // Check if selectedForm is not in the forms array.
        var selectedForm = getValues('selectedForm');
        var selected = false;
        forms.forEach(function (form) {
          if (form.value === selectedForm) {
            selected = true;
          }
        });

        if (!selected) {
          return false;
        }
      }
    } // Check to see if any tags are selected.


    if (getValues('formOrTag') === 'tag') {
      if (tags.length === 0) {
        return false;
      }

      var _selected = false;
      tags.forEach(function (tag) {
        if (tag.selected) {
          _selected = true;
        }
      });

      if (!_selected) {
        return false;
      }
    }

    return true;
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
        setIsSaved(true); // Reset form.

        reset(_objectSpread(_objectSpread({}, formData), ajaxData), {
          keepErrors: false,
          keepDirty: false
        });
        setTimeout(function () {
          setIsSaved(false);
        }, 3000);
      } else {// todo - set save error.
        // setError( 'apiKey', { type: 'noForms', message: ajaxData.message } );
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
        // Reset form state.
        reset(_objectSpread(_objectSpread({}, formValues), ajaxData), {
          keepErrors: false,
          keepDirty: false
        });
      } else {
        var updatedFormValues = {
          apiValid: false
        };
        reset(_objectSpread(_objectSpread({}, formValues), updatedFormValues), {
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
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setSaving(false);
    });
  };

  var onAddTag = function onAddTag(tagLabel) {
    tagLabel = tagLabel.trim();

    if ('' === tagLabel) {
      setError('tagInput', {
        type: 'addTagError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tag name cannot be empty.', 'comment-edit-pro')
      });
      return;
    } // Check to see if label is in use.


    var currentTags = getValues('tags');
    var tagExists = currentTags.find(function (tag) {
      return tag.label === tagLabel;
    });

    if (tagExists) {
      setError('tagInput', {
        type: 'addTagError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tag name already in use.', 'comment-edit-pro')
      });
      return;
    } // Start adding the tag.


    setIsAddingTag(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_add_convertkit_tag', {
      nonce: sceIntegrations.ck_add_tag_nonce,
      label: tagLabel
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var tags = ajaxData.tags;
        var newTagValues = [];
        tags.forEach(function (keys, index) {
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
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setIsAddingTag(false);
      tagInput.current.focus();
    });
  };

  var onAddCustomField = function onAddCustomField(customFieldLabel) {
    customFieldLabel = customFieldLabel.trim();

    if ('' === customFieldLabel) {
      setError('customFieldInput', {
        type: 'addCustomFieldError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The Custom Field name cannot be empty.', 'comment-edit-pro')
      });
      return;
    } // Check to see if label is in use.


    var currentCustomFields = getValues('customFields');
    var customFieldExists = currentCustomFields.find(function (customField) {
      return customField.label === customFieldLabel;
    });

    if (customFieldExists) {
      setError('customFieldInput', {
        type: 'addCustomFieldError',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Field name already in use.', 'comment-edit-pro')
      });
      return;
    } // Start adding the Custom Field.


    setIsAddingCustomField(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_add_convertkit_custom_field', {
      nonce: sceIntegrations.ck_add_custom_field_nonce,
      label: customFieldLabel
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var customFields = ajaxData.customFields;
        var newCustomFieldValues = [];
        customFields.forEach(function (keys, index) {
          newCustomFieldValues.push(keys);
        });
        setValue('customFields', newCustomFieldValues);
      } else {
        setError('customFieldInput', {
          type: 'addCustomFieldError',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setIsAddingCustomField(false);
      customFieldInputRef.current.focus();
    });
  };

  var onHandleTagsRefresh = function onHandleTagsRefresh(formData) {
    setIsRefreshingTags(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_refresh_convertkit_tags', {
      nonce: sceIntegrations.ck_refresh_tags_nonce
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var tags = ajaxData.tags,
            apiValid = ajaxData.apiValid;
        var newTagValues = [];
        var oldTagValues = getValues('tags');
        tags.forEach(function (keys, index) {
          // Use old selection state for new tags.
          var oldTag = oldTagValues.find(function (tag) {
            return tag.value === keys.value;
          });

          if (oldTag) {
            keys.selected = oldTag.selected;
          }

          newTagValues.push(keys);
        });
        var updatedFormValues = {
          tags: newTagValues,
          apiValid: apiValid
        };
        reset(_objectSpread(_objectSpread({}, formValues), updatedFormValues), {
          keepErrors: true,
          keepDirty: true
        });
      } else {
        var _updatedFormValues = {};
        reset(_objectSpread(_objectSpread({}, formValues), _updatedFormValues), {
          keepErrors: true,
          keepDirty: true
        });
        setError('tags', {
          type: 'noTags',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setIsRefreshingTags(false);
    });
  };

  var onHandleFormsRefresh = function onHandleFormsRefresh(formData) {
    setIsRefreshingForms(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_refresh_convertkit_forms', {
      nonce: sceIntegrations.ck_refresh_forms_nonce
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var forms = ajaxData.forms,
            apiValid = ajaxData.apiValid;
        var updatedFormValues = {
          forms: forms
        };
        reset(_objectSpread(_objectSpread({}, formValues), updatedFormValues), {
          keepErrors: true,
          keepDirty: true
        });
      } else {
        var _updatedFormValues2 = {};
        reset(_objectSpread(_objectSpread({}, formValues), _updatedFormValues2), {
          keepErrors: true,
          keepDirty: true
        });
        setError('forms', {
          type: 'noForms',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setIsRefreshingForms(false);
    });
  };

  var onHandleCustomFieldsRefresh = function onHandleCustomFieldsRefresh(formData) {
    setIsRefreshingCustomFields(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_6__["default"])('sce_refresh_convertkit_custom_fields', {
      nonce: sceIntegrations.ck_refresh_custom_fields_nonce
    }).then(function (ajaxResponse) {
      var ajaxData = ajaxResponse.data.data;
      var ajaxSuccess = ajaxResponse.data.success;

      if (ajaxSuccess) {
        var customFields = ajaxData.customFields,
            apiValid = ajaxData.apiValid;
        var newCustomFieldValues = [];
        var oldCustomFieldValues = getValues('customFields');
        customFields.forEach(function (keys, index) {
          // Use old selection state for new tags.
          var oldCustomFields = oldCustomFieldValues.find(function (customField) {
            return customField.value === keys.value;
          });

          if (oldCustomFields) {
            var _oldCustomFields$fiel;

            keys.field = oldCustomFields.field;
            keys.field_value = (_oldCustomFields$fiel = oldCustomFields.field_value) !== null && _oldCustomFields$fiel !== void 0 ? _oldCustomFields$fiel : '';
          }

          newCustomFieldValues.push(keys);
        });
        var updatedFormValues = {
          customFields: newCustomFieldValues,
          apiValid: apiValid
        };
        reset(_objectSpread(_objectSpread({}, formValues), updatedFormValues), {
          keepErrors: true,
          keepDirty: true
        });
      } else {
        var _updatedFormValues3 = {};
        reset(_objectSpread(_objectSpread({}, formValues), _updatedFormValues3), {
          keepErrors: true,
          keepDirty: true
        });
        setError('customFields', {
          type: 'noFields',
          message: ajaxData.message
        });
      }
    })["catch"](function (ajaxResponse) {}).then(function (ajaxResponse) {
      setIsRefreshingCustomFields(false);
    });
  };

  var getNewsletterLabel = function getNewsletterLabel() {
    var _errors$signUpLabel2;

    if (!canShowSaveButton() || needsCredentialRefresh()) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Label', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "signUpLabel",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref) {
        var _errors$signUpLabel;

        var field = _ref.field;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, field, {
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
    if (!canShowSaveButton() || needsCredentialRefresh()) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Sign Up Checkbox', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "checkboxEnabled",
      control: control,
      render: function render(_ref2) {
        var _ref2$field = _ref2.field,
            _onChange = _ref2$field.onChange,
            value = _ref2$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
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

    var forms = getValues('forms');
    var tags = getValues('tags');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Forms and Tags', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "formOrTag",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref3) {
        var _ref3$field = _ref3.field,
            _onChange2 = _ref3$field.onChange,
            value = _ref3$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
          onChange: function onChange(formOrTagValue) {
            _onChange2(formOrTagValue);
          }
        }));
      }
    })));
  };

  var getConvertKitForms = function getConvertKitForms() {
    var _errors$selectedForm;

    // Get forms.
    // eslint-disable-next-line @wordpress/no-unused-vars-before-return
    var convertKitForms = getValues('forms');

    if (!getValues('apiValid') || needsCredentialRefresh() || 'form' !== getValues('formOrTag')) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Forms (Required)', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, convertKitForms.length !== 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "selectedForm",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref4) {
        var _errors$apiKey;

        var _ref4$field = _ref4.field,
            _onChange3 = _ref4$field.onChange,
            value = _ref4$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_16__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a form for your subscribers', 'comment-edit-pro'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select a default form that will be used when signing up your subscribers.', 'comment-edit-pro'),
          selected: value,
          options: getValues('forms'),
          onChange: function onChange(formSelectedValue) {
            _onChange3(formSelectedValue);
          },
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
            'has-error': 'required' === ((_errors$apiKey = errors.apiKey) === null || _errors$apiKey === void 0 ? void 0 : _errors$apiKey.type),
            'is-required': true
          })
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin-buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
      isBusy: isRefreshingForms,
      disabled: isRefreshingForms,
      onClick: function onClick() {
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
    })), 'required' === ((_errors$selectedForm = errors.selectedForm) === null || _errors$selectedForm === void 0 ? void 0 : _errors$selectedForm.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })), 'form' === getValues('formOrTag') && convertKitForms.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are no forms associated with this ConvertKit account and setup cannot continue. Please create a form in ConvertKit or try tags instead.', 'comment-edit-pro'),
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };

  var getConvertKitTags = function getConvertKitTags() {
    var _errors$tags, _errors$tags2, _errors$tagInput2, _errors$tagInput3, _errors$tagInput4;

    // Don't show tags if api is invalid.
    if (!getValues('apiValid') || needsCredentialRefresh()) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    var convertKitTags = getValues('tags');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Tags', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, 'tag' === getValues('formOrTag') && getValues('tags').length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are no tags available. Try creating a tag below.', 'comment-edit-pro'),
      status: "warning",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), convertKitTags.length > 0 && getValues('apiValid') && convertKitTags.map(function (tag, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
        key: index,
        name: "tags[".concat(index, "].selected"),
        control: control,
        render: function render(_ref5) {
          var _getValues$index$sele;

          var _ref5$field = _ref5.field,
              _onChange4 = _ref5$field.onChange,
              value = _ref5$field.value;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_18__["default"], {
            label: tag.label,
            onChange: function onChange(enableValue) {
              _onChange4(enableValue);
            },
            checked: (_getValues$index$sele = getValues('tags')[index].selected) !== null && _getValues$index$sele !== void 0 ? _getValues$index$sele : false
          });
        }
      });
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin-buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
      isBusy: isRefreshingTags,
      disabled: isRefreshingTags,
      onClick: function onClick() {
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
    })), 'noTags' === ((_errors$tags = errors.tags) === null || _errors$tags === void 0 ? void 0 : _errors$tags.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$tags2 = errors.tags) === null || _errors$tags2 === void 0 ? void 0 : _errors$tags2.message,
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-convertkit-add-tag"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-convertkit-add-tag-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "tagInput",
      control: control,
      rules: {
        pattern: /[-_ 0-9A-Za-z]/
      },
      render: function render(_ref6) {
        var _errors$tagInput;

        var _ref6$field = _ref6.field,
            _onChange5 = _ref6$field.onChange,
            value = _ref6$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          type: "text",
          value: value,
          onChange: function onChange(tagInputValue) {
            clearErrors('tagInput');

            _onChange5(tagInputValue);
          },
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add New Tag', 'comment-edit-pro'),
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$tagInput = errors.tagInput) === null || _errors$tagInput === void 0 ? void 0 : _errors$tagInput.type)
          }),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tag Name', 'comment-edit-pro'),
          "aria-required": "true",
          ref: tagInput
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin-buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
      onClick: /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
          var validationResult;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return trigger('tagInput');

                case 2:
                  validationResult = _context.sent;

                  if (validationResult) {
                    onAddTag(getValues('tagInput'));
                  }

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref7.apply(this, arguments);
        };
      }(),
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right'),
      text: isAddingTag ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Adding…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add New Tag', 'comment-edit-pro')
    }))), 'pattern' === ((_errors$tagInput2 = errors.tagInput) === null || _errors$tagInput2 === void 0 ? void 0 : _errors$tagInput2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Special characters are not allowed in tags.', 'comment-edit-pro'),
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'addTagError' === ((_errors$tagInput3 = errors.tagInput) === null || _errors$tagInput3 === void 0 ? void 0 : _errors$tagInput3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$tagInput4 = errors.tagInput) === null || _errors$tagInput4 === void 0 ? void 0 : _errors$tagInput4.message,
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })))));
  };

  var getCustomFields = function getCustomFields() {
    var _errors$customFields, _errors$customFields2, _errors$customFieldIn2, _errors$customFieldIn3, _errors$customFieldIn4;

    // Don't show custom fields if api is invalid.
    if (!getValues('apiValid') || needsCredentialRefresh()) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
    }

    var convertKitCustomFields = getValues('customFields');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Map Custom Fields', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getValues('customFields').length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are no custom fields available. You can create one below.', 'comment-edit-pro'),
      status: "warning",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), convertKitCustomFields.length > 0 && getValues('apiValid') && convertKitCustomFields.map(function (tag, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "sce-convertkit-custom-field",
        key: index
      }, 'custom' !== getValues('customFields')[index].field && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
        name: "customFields[".concat(index, "].field"),
        control: control,
        render: function render(_ref8) {
          var _getValues$index$fiel;

          var _ref8$field = _ref8.field,
              _onChange6 = _ref8$field.onChange,
              value = _ref8$field.value;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_19__["default"], {
            label: tag.label,
            onChange: function onChange(customFieldSelectedValue) {
              _onChange6(customFieldSelectedValue);
            },
            value: (_getValues$index$fiel = getValues('customFields')[index].field) !== null && _getValues$index$fiel !== void 0 ? _getValues$index$fiel : false,
            options: _webhooks_RequestHeaderFields__WEBPACK_IMPORTED_MODULE_10__["default"],
            className: "sce-admin__select-control"
          });
        }
      })), 'custom' === getValues('customFields')[index].field && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
        name: "customFields[".concat(index, "].field_value"),
        control: control,
        render: function render(_ref9) {
          var _ref9$field = _ref9.field,
              _onChange7 = _ref9$field.onChange,
              value = _ref9$field.value;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
            value: value !== null && value !== void 0 ? value : '',
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {}),
            onChange: function onChange(methodValue) {
              _onChange7(methodValue);
            },
            label: tag.label
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "sce-admin__text-control-reset button-reset",
        icon: "no-alt",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
        onClick: function onClick() {
          setValue("customFields[".concat(index, "].field"), 'none');
        },
        showTooltip: false
      })));
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin-buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
      isBusy: isRefreshingCustomFields,
      disabled: isRefreshingCustomFields,
      onClick: function onClick() {
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
    })), 'noCustomFields' === ((_errors$customFields = errors.customFields) === null || _errors$customFields === void 0 ? void 0 : _errors$customFields.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$customFields2 = errors.customFields) === null || _errors$customFields2 === void 0 ? void 0 : _errors$customFields2.message,
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-convertkit-add-tag"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-convertkit-add-tag-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "customFieldInput",
      control: control,
      rules: {
        pattern: /[-_ 0-9A-Za-z]/
      },
      render: function render(_ref10) {
        var _errors$customFieldIn;

        var _ref10$field = _ref10.field,
            _onChange8 = _ref10$field.onChange,
            value = _ref10$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          type: "text",
          value: value,
          onChange: function onChange(customFieldValue) {
            clearErrors('customFieldInput');

            _onChange8(customFieldValue);
          },
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add New Custom Field', 'comment-edit-pro'),
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$customFieldIn = errors.customFieldInput) === null || _errors$customFieldIn === void 0 ? void 0 : _errors$customFieldIn.type)
          }),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Field Name', 'comment-edit-pro'),
          ref: customFieldInputRef
        });
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "sce-admin-buttons"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
      onClick: /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
          var validationResult;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return trigger('customFieldInput');

                case 2:
                  validationResult = _context2.sent;

                  if (validationResult) {
                    onAddCustomField(getValues('customFieldInput'));
                  }

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref11.apply(this, arguments);
        };
      }(),
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-secondary qdlx__btn--icon-right'),
      text: isAddingTag ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Adding…', 'comment-edit-pro') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Custom Field', 'comment-edit-pro')
    }))), 'pattern' === ((_errors$customFieldIn2 = errors.customFieldInput) === null || _errors$customFieldIn2 === void 0 ? void 0 : _errors$customFieldIn2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Special characters are not allowed in custom fields.', 'comment-edit-pro'),
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'addCustomFieldError' === ((_errors$customFieldIn3 = errors.customFieldInput) === null || _errors$customFieldIn3 === void 0 ? void 0 : _errors$customFieldIn3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$customFieldIn4 = errors.customFieldInput) === null || _errors$customFieldIn4 === void 0 ? void 0 : _errors$customFieldIn4.message,
      status: "error",
      politeness: "assertive",
      inline: false,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })))));
  };

  var getAPIKey = function getAPIKey() {
    var _errors$apiKey3, _errors$apiKey4, _errors$apiKey5;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('API Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "apiKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref12) {
        var _errors$apiKey2;

        var _ref12$field = _ref12.field,
            _onChange9 = _ref12$field.onChange,
            value = _ref12$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit API Key', 'comment-edit-pro'),
          type: "text",
          value: value,
          onChange: function onChange(apiKeyValue) {
            _onChange9(apiKeyValue);

            clearErrors();
          },
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$apiKey2 = errors.apiKey) === null || _errors$apiKey2 === void 0 ? void 0 : _errors$apiKey2.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your ConvertKit API Key in order to choose a form or tag.', 'comment-edit-pro'),
          "aria-required": "true"
        });
      }
    }), 'required' === ((_errors$apiKey3 = errors.apiKey) === null || _errors$apiKey3 === void 0 ? void 0 : _errors$apiKey3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'noForms' === ((_errors$apiKey4 = errors.apiKey) === null || _errors$apiKey4 === void 0 ? void 0 : _errors$apiKey4.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$apiKey5 = errors.apiKey) === null || _errors$apiKey5 === void 0 ? void 0 : _errors$apiKey5.message,
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    })));
  };

  var getSecretKey = function getSecretKey() {
    var _errors$secretKey2, _errors$secretKey3, _errors$secretKey4;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
      scope: "row"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Secret Key', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
      name: "secretKey",
      control: control,
      rules: {
        required: true
      },
      render: function render(_ref13) {
        var _errors$secretKey;

        var _ref13$field = _ref13.field,
            _onChange10 = _ref13$field.onChange,
            value = _ref13$field.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_14__["default"], {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit Secret Key', 'comment-edit-pro'),
          type: "text",
          value: value,
          onChange: function onChange(secretKey) {
            _onChange10(secretKey);

            clearErrors();
          },
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
            'has-error': 'required' === ((_errors$secretKey = errors.secretKey) === null || _errors$secretKey === void 0 ? void 0 : _errors$secretKey.type),
            'is-required': true
          }),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enter your ConvertKit Secret Key in order to choose a form or tag.', 'comment-edit-pro'),
          "aria-required": "true"
        });
      }
    }), 'required' === ((_errors$secretKey2 = errors.secretKey) === null || _errors$secretKey2 === void 0 ? void 0 : _errors$secretKey2.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
      status: "error",
      politeness: "assertive",
      inline: true,
      icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_7__["default"]
    }), 'noForms' === ((_errors$secretKey3 = errors.secretKey) === null || _errors$secretKey3 === void 0 ? void 0 : _errors$secretKey3.type) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Notice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      message: (_errors$secretKey4 = errors.secretKey) === null || _errors$secretKey4 === void 0 ? void 0 : _errors$secretKey4.message,
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin__tabs--content-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_icons_ConvertKit__WEBPACK_IMPORTED_MODULE_11__["default"], {
    width: 48,
    height: 45,
    fill: '#FB6068',
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "sce-admin__heading--text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    className: "sce-admin-heading-docs",
    target: "_blank",
    rel: "noreferrer",
    href: "https://docs.dlxplugins.com/v/comment-edit-pro/features-overview/integrations/mailchimp-integration"
  }, "(", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Docs', 'comment-edit-pro'), ")")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When someone leaves a comment, they can be given the option to subscribe to your ConvertKit account.', 'comment-edit-pro'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
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
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('ConvertKit', 'comment-edit-pro')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_13__.Controller, {
    name: "enableConvertKit",
    control: control,
    render: function render(_ref14) {
      var _ref14$field = _ref14.field,
          _onChange11 = _ref14$field.onChange,
          value = _ref14$field.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_15__["default"], {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable ConvertKit', 'comment-edit-pro'),
        className: "sce-admin__toggle-control",
        checked: value,
        onChange: function onChange(boolValue) {
          clearErrors();

          _onChange11(boolValue);
        },
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable or Disable the ConvertKit Integration.', 'comment-edit-pro')
      });
    }
  }))), getValues('enableConvertKit') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, getAPIKey(), getSecretKey(), getFormOrTag(), getConvertKitForms(), getConvertKitTags(), getCustomFields(), getNewsletterLabel(), getSignupCheckbox()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sce-admin-buttons"
  }, getValues('apiValid') && canShowSaveButton() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
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
  }), needsCredentialRefresh() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_17__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('qdlx__btn qdlx__btn-primary qdlx__btn--icon-right', {
      'has-error': hasErrors()
    }),
    type: "submit",
    text: getRefreshCredentialsText(),
    icon: false,
    disabled: credentialsRefreshing
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConvertKit);

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

/***/ })

}]);
//# sourceMappingURL=ConvertKit0.0.1.chunk.bundle.js.map
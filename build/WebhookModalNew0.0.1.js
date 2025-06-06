"use strict";
(globalThis["webpackChunksimple_comment_editing_options"] = globalThis["webpackChunksimple_comment_editing_options"] || []).push([["WebhookModalNew0.0.1"],{

/***/ "./src/js/react/components/ErrorBoundary/index.js":
/*!********************************************************!*\
  !*** ./src/js/react/components/ErrorBoundary/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/js/react/views/webhooks/ModalNew.js":
/*!*************************************************!*\
  !*** ./src/js/react/views/webhooks/ModalNew.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-async-resource */ "./node_modules/use-async-resource/lib/index.js");
/* harmony import */ var use_async_resource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(use_async_resource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-spinners/BeatLoader */ "./node_modules/react-spinners/BeatLoader.js");
/* harmony import */ var react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_icons_Spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/icons/Spinner */ "./src/js/react/components/icons/Spinner.js");
/* harmony import */ var _components_icons_ClipboardCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/icons/ClipboardCheck */ "./src/js/react/components/icons/ClipboardCheck.js");
/* harmony import */ var _SendCommand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../SendCommand */ "./src/js/SendCommand.js");
/* harmony import */ var _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/icons/CircularExplanation */ "./src/js/react/components/icons/CircularExplanation.js");
/* harmony import */ var _components_Notice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Notice */ "./src/js/react/components/Notice/index.js");
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/ErrorBoundary */ "./src/js/react/components/ErrorBoundary/index.js");
/* harmony import */ var _RequestMethodValues__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./RequestMethodValues */ "./src/js/react/views/webhooks/RequestMethodValues.js");
/* harmony import */ var _RequestFormatValues__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RequestFormatValues */ "./src/js/react/views/webhooks/RequestFormatValues.js");
/* harmony import */ var _RequestHeadersValues__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./RequestHeadersValues */ "./src/js/react/views/webhooks/RequestHeadersValues.js");
/* harmony import */ var _RequestHeaderFields__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./RequestHeaderFields */ "./src/js/react/views/webhooks/RequestHeaderFields.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__);
/* eslint-disable no-unused-vars */


















/**
 * Retrieve a webhook or create dummy ID if creating a new one.
 *
 * @param {number} id          The ID of the webhook to retrieve.
 * @param {string} nonce       The nonce for the request.
 * @param {number} modalNumber The number of the modal.
 * @return {Promise} The promise for the request.
 */

const retrieveWebhook = (id = 0, nonce = '', modalNumber = 0) => {
  if ('' === nonce) {
    nonce = sceWebhooks.get_webhook_nonce;
  }
  return (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_retrieve_webhook', {
    webhook_id: id,
    nonce
  });
};
const ModalNew = props => {
  const [modalNumber, setModalNumber] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.modalNumber);
  const [defaults, getDefaults] = (0,use_async_resource__WEBPACK_IMPORTED_MODULE_2__.useAsyncResource)(retrieveWebhook, props.id, props.nonce, modalNumber);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
    fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h2", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading Webhook', 'comment-edit-pro')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)((react_spinners_BeatLoader__WEBPACK_IMPORTED_MODULE_16___default()), {
        color: '#9c68b0',
        loading: true,
        cssOverride: true,
        size: 25,
        speedMultiplier: 0.65
      })]
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(Interface, {
      defaults: defaults,
      ...props
    })
  });
};
const Interface = props => {
  const {
    defaults,
    onSave
  } = props;
  const response = defaults();
  const {
    data,
    success
  } = response.data;
  const [saving, setSaving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isSaved, setIsSaved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_17__.useForm)({
    defaultValues: {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('New Webhook', 'comment-edit-pro'),
      webhookUrl: '',
      webhookEnabled: true,
      requestMethod: 'POST',
      requestFormat: 'JSON',
      requestHeaders: [{
        label: '',
        value: '',
        customName: '',
        customValue: ''
      }],
      requestBody: [{
        key: '',
        value: '',
        customValue: ''
      }],
      sendApprovedComments: true,
      sendPendingComments: true,
      sendSpamComments: false
    }
  });
  const formValues = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_17__.useWatch)({
    control
  });
  const {
    errors,
    isDirty,
    dirtyFields,
    touchedFields
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_17__.useFormState)({
    control
  });
  const {
    fields: requestHeadersFields,
    append: appendRequestHeaders,
    remove: removeRequestHeaders
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_17__.useFieldArray)({
    control,
    name: 'requestHeaders'
  });
  const {
    fields: requestBodyFields,
    append: appendRequestBody,
    remove: removeRequestBody
  } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_17__.useFieldArray)({
    control,
    name: 'requestBody'
  });

  /**
   * Set the form values when the data is retrieved.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data) {
      reset(data.form);
    }
  }, [data]);
  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };
  const onSubmit = formData => {
    setSaving(true);
    (0,_SendCommand__WEBPACK_IMPORTED_MODULE_7__["default"])('sce_save_webhook', {
      nonce: data.nonce,
      webhook_id: data.webhook_id,
      ...formData
    }).then(ajaxResponse => {
      const ajaxData = ajaxResponse.data.data;
      const ajaxSuccess = ajaxResponse.data.success;
      if (ajaxSuccess) {
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
          props.onSave(ajaxData);
        }, 3000);
      } else {}
    }).catch(ajaxResponse => {}).then(ajaxResponse => {
      setSaving(false);
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
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Webhook', 'quotes-dlx');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("form", {
      onSubmit: handleSubmit(onSubmit),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("table", {
        className: "form-table sce-form-table-modal",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tbody", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("td", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                name: "name",
                control: control,
                rules: {
                  required: true
                },
                render: ({
                  field
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  ...field,
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Name', 'comment-edit-pro'),
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                    'has-error': 'required' === errors.name?.type,
                    'is-required': true
                  }),
                  "aria-required": "true",
                  help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add a name for this webhook to easily identify it in the list of webhooks.', 'comment-edit-pro')
                })
              }), 'required' === errors.name?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
                message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
                status: "error",
                politeness: "assertive",
                inline: true,
                icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enabled', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                name: "webhookEnabled",
                control: control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                  className: "sce-admin__toggle-control",
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enabled', 'comment-edit-pro'),
                  checked: value,
                  onChange: methodValue => {
                    onChange(methodValue);
                  }
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook URL', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("td", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                name: "webhookUrl",
                control: control,
                rules: {
                  required: true
                },
                render: ({
                  field
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                  ...field,
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook URL', 'comment-edit-pro'),
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                    'has-error': 'required' === errors.webhookUrl?.type,
                    'is-required': true
                  }),
                  "aria-required": "true",
                  help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add the URL of the webhook you want to send data to.', 'comment-edit-pro')
                })
              }), 'required' === errors.webhookUrl?.type && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
                message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This field is a required field.'),
                status: "error",
                politeness: "assertive",
                inline: true,
                icon: _components_icons_CircularExplanation__WEBPACK_IMPORTED_MODULE_8__["default"]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Method', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                name: "requestMethod",
                control: control,
                rules: {
                  required: true
                },
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Method', 'comment-edit-pro'),
                  help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select how the Webhook should send data to the URL.', 'comment-edit-pro'),
                  value: value,
                  options: _RequestMethodValues__WEBPACK_IMPORTED_MODULE_11__["default"],
                  onChange: methodValue => {
                    onChange(methodValue);
                  }
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Format', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                name: "requestFormat",
                control: control,
                rules: {
                  required: true
                },
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
                  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Format', 'comment-edit-pro'),
                  help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select how the Webhook should format the data sent to the URL.', 'comment-edit-pro'),
                  value: value,
                  options: _RequestFormatValues__WEBPACK_IMPORTED_MODULE_12__["default"],
                  onChange: methodValue => {
                    onChange(methodValue);
                  }
                })
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Headers', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                className: "sce-admin__values-repeater",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "sce-admin__values-repeater__row sce-admin__values-repeater__row-heading",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                    className: "sce-admin__values-repeater__row__key",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Name', 'comment-edit-pro')
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                    className: "sce-admin__values-repeater__row__key",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Value', 'comment-edit-pro')
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {})]
                }), requestHeadersFields.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "sce-admin__values-repeater__row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "sce-admin__values-repeater__row__key",
                    children: ['custom' === getValues(`requestHeaders[${index}].name`) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                        name: `requestHeaders[${index}].customName`,
                        control: control,
                        rules: {
                          required: true
                        },
                        render: ({
                          field: {
                            onChange,
                            value
                          }
                        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                          value: value !== null && value !== void 0 ? value : '',
                          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                            'has-error': 'required' === errors.requestHeaders?.[index]?.customName?.type,
                            'is-required': true
                          }),
                          "aria-required": "true",
                          onChange: methodValue => {
                            onChange(methodValue);
                          }
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        className: "sce-admin__text-control-reset button-reset",
                        icon: "no-alt",
                        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
                        onClick: () => {
                          setValue(`requestHeaders[${index}].name`, 'none');
                        },
                        showTooltip: false
                      })]
                    }), 'custom' !== getValues(`requestHeaders[${index}].name`) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                      name: `requestHeaders[${index}].name`,
                      control: control,
                      render: ({
                        field: {
                          onChange,
                          value
                        }
                      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
                        value: value,
                        options: _RequestHeadersValues__WEBPACK_IMPORTED_MODULE_13__["default"],
                        onChange: methodValue => {
                          onChange(methodValue);
                        }
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "sce-admin__values-repeater__row__value",
                    children: ['custom' === getValues(`requestHeaders[${index}].value`) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                        name: `requestHeaders[${index}].customValue`,
                        control: control,
                        rules: {
                          required: true
                        },
                        render: ({
                          field: {
                            onChange,
                            value
                          }
                        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                          value: value !== null && value !== void 0 ? value : '',
                          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                            'has-error': 'required' === errors.requestHeaders?.[index]?.customValue?.type,
                            'is-required': true
                          }),
                          "aria-required": "true",
                          onChange: methodValue => {
                            onChange(methodValue);
                          }
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        className: "sce-admin__text-control-reset button-reset",
                        icon: "no-alt",
                        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
                        onClick: () => {
                          setValue(`requestHeaders[${index}].value`, 'none');
                        },
                        showTooltip: false
                      })]
                    }), 'custom' !== getValues(`requestHeaders[${index}].value`) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                      name: `requestHeaders[${index}].value`,
                      control: control,
                      render: ({
                        field: {
                          onChange,
                          value
                        }
                      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
                        value: value,
                        options: _RequestHeaderFields__WEBPACK_IMPORTED_MODULE_14__["default"],
                        onChange: methodValue => {
                          onChange(methodValue);
                        }
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "sce-admin__values-repeater__row__actions",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
                      icon: "plus",
                      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Request Header', 'comment-edit-pro'),
                      onClick: () => {
                        appendRequestHeaders(index);
                      },
                      showTooltip: false
                    }), requestHeadersFields.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
                      icon: "minus",
                      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove Request Header', 'comment-edit-pro'),
                      onClick: () => {
                        removeRequestHeaders(index);
                      },
                      showTooltip: false
                    })]
                  })]
                }, item.id))]
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Request Body', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("td", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                className: "sce-admin__values-repeater",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "sce-admin__values-repeater__row sce-admin__values-repeater__row-heading",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                    className: "sce-admin__values-repeater__row__key",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Key', 'comment-edit-pro')
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                    className: "sce-admin__values-repeater__row__key",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h3", {
                      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Value', 'comment-edit-pro')
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {})]
                }), requestBodyFields.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                  className: "sce-admin__values-repeater__row",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                    className: "sce-admin__values-repeater__row__key",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                      name: `requestBody[${index}].key`,
                      control: control,
                      render: ({
                        field: {
                          onChange,
                          value
                        }
                      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                        value: value !== null && value !== void 0 ? value : '',
                        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                          'has-error': 'required' === errors.requestBody?.[index]?.key?.type,
                          'is-required': true
                        }),
                        "aria-required": "true",
                        onChange: methodValue => {
                          onChange(methodValue);
                        }
                      })
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "sce-admin__values-repeater__row__value",
                    children: ['custom' === getValues(`requestBody[${index}].value`) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.Fragment, {
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                        name: `requestBody[${index}].customValue`,
                        control: control,
                        rules: {
                          required: true
                        },
                        render: ({
                          field: {
                            onChange,
                            value
                          }
                        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                          value: value !== null && value !== void 0 ? value : '',
                          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('sce-admin__text-control', {
                            'has-error': 'required' === errors.requestBody?.[index]?.customValue?.type,
                            'is-required': true
                          }),
                          "aria-required": "true",
                          onChange: methodValue => {
                            onChange(methodValue);
                          }
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                        className: "sce-admin__text-control-reset button-reset",
                        icon: "no-alt",
                        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Text Input', 'comment-edit-pro'),
                        onClick: () => {
                          setValue(`requestBody[${index}].value`, 'none');
                        },
                        showTooltip: false
                      })]
                    }), 'custom' !== getValues(`requestBody[${index}].value`) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                      name: `requestBody[${index}].value`,
                      control: control,
                      render: ({
                        field: {
                          onChange,
                          value
                        }
                      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
                        value: value,
                        options: _RequestHeaderFields__WEBPACK_IMPORTED_MODULE_14__["default"],
                        onChange: methodValue => {
                          onChange(methodValue);
                        }
                      })
                    })]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
                    className: "sce-admin__values-repeater__row__actions",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
                      icon: "plus",
                      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Add Request Body', 'comment-edit-pro'),
                      onClick: () => {
                        appendRequestBody(index);
                      },
                      showTooltip: false
                    }), requestBodyFields.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                      className: "sce-admin__values-repeater-remove sce-admin__values-repeater-button button-reset",
                      icon: "minus",
                      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove Request Body', 'comment-edit-pro'),
                      onClick: () => {
                        removeRequestBody(index);
                      },
                      showTooltip: false
                    })]
                  })]
                }, item.id))]
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("th", {
              scope: "row",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Webhook Triggers', 'comment-edit-pro')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("td", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                className: "sce-panel-row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                  name: "sendApprovedComments",
                  control: control,
                  render: ({
                    field: {
                      onChange,
                      value
                    }
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                    className: "sce-admin__toggle-control",
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Approved Comments', 'comment-edit-pro'),
                    checked: value,
                    onChange: methodValue => {
                      onChange(methodValue);
                    }
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                className: "sce-panel-row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                  name: "sendPendingComments",
                  control: control,
                  render: ({
                    field: {
                      onChange,
                      value
                    }
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                    className: "sce-admin__toggle-control",
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Pending (Moderated) Comments', 'comment-edit-pro'),
                    checked: value,
                    onChange: methodValue => {
                      onChange(methodValue);
                    }
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
                className: "sce-panel-row",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_17__.Controller, {
                  name: "sendSpamComments",
                  control: control,
                  render: ({
                    field: {
                      onChange,
                      value
                    }
                  }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
                    className: "sce-admin__toggle-control",
                    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Send Spam Comments', 'comment-edit-pro'),
                    checked: value,
                    onChange: methodValue => {
                      onChange(methodValue);
                    }
                  })
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "sce-admin-buttons",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
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
        })
      }), hasErrors() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('There are form validation errors. Please correct them above.', 'comment-edit-pro'),
        status: "error",
        politeness: "polite"
      }), isSaved && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_Notice__WEBPACK_IMPORTED_MODULE_9__["default"], {
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your settings have been saved.', 'comment-edit-pro'),
        status: "success",
        politeness: "assertive"
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalNew);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestFormatValues.js":
/*!************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestFormatValues.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const RequestFormatValues = [{
  value: 'json',
  label: 'JSON'
}, {
  value: 'form',
  label: 'FORM'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestFormatValues);

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

/***/ "./src/js/react/views/webhooks/RequestHeadersValues.js":
/*!*************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestHeadersValues.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

const RequestHeadersValues = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a Name', 'comment-edit-pro'),
  value: 'none'
}, {
  label: 'Accept',
  value: 'Accept'
}, {
  label: 'Accept-Charset',
  value: 'Accept-Charset'
}, {
  label: 'Accept-Encoding',
  value: 'Accept-Encoding'
}, {
  label: 'Accept-Language',
  value: 'Accept-Language'
}, {
  label: 'Accept-Datetime',
  value: 'Accept-Datetime'
}, {
  label: 'Authorization',
  value: 'Authorization'
}, {
  label: 'Cache-Control',
  value: 'Cache-Control'
}, {
  label: 'Connection',
  value: 'Connection'
}, {
  label: 'Cookie',
  value: 'Cookie'
}, {
  label: 'Content-Length',
  value: 'Content-Length'
}, {
  label: 'Content-Type',
  value: 'Content-Type'
}, {
  label: 'Date',
  value: 'Date'
}, {
  label: 'Expect',
  value: 'Expect'
}, {
  label: 'Forwarded',
  value: 'Forwarded'
}, {
  label: 'From',
  value: 'From'
}, {
  label: 'Host',
  value: 'Host'
}, {
  label: 'If-Match',
  value: 'If-Match'
}, {
  label: 'If-Modified-Since',
  value: 'If-Modified-Since'
}, {
  label: 'If-None-Match',
  value: 'If-None-Match'
}, {
  label: 'If-Range',
  value: 'If-Range'
}, {
  label: 'If-Unmodified-Since',
  value: 'If-Unmodified-Since'
}, {
  label: 'Max-Forwards',
  value: 'Max-Forwards'
}, {
  label: 'Origin',
  value: 'Origin'
}, {
  label: 'Pragma',
  value: 'Pragma'
}, {
  label: 'Proxy-Authorization',
  value: 'Proxy-Authorization'
}, {
  label: 'Range',
  value: 'Range'
}, {
  label: 'Referer',
  value: 'Referer'
}, {
  label: 'TE',
  value: 'TE'
}, {
  label: 'User-Agent',
  value: 'User-Agent'
}, {
  label: 'Upgrade',
  value: 'Upgrade'
}, {
  label: 'Via',
  value: 'Via'
}, {
  label: 'Warning',
  value: 'Warning'
}, {
  label: 'Custom Name',
  value: 'custom'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestHeadersValues);

/***/ }),

/***/ "./src/js/react/views/webhooks/RequestMethodValues.js":
/*!************************************************************!*\
  !*** ./src/js/react/views/webhooks/RequestMethodValues.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const RequestMethodValues = [{
  value: 'GET',
  label: 'GET'
}, {
  value: 'POST',
  label: 'POST'
}, {
  value: 'PUT',
  label: 'PUT'
}, {
  value: 'PATCH',
  label: 'PATCH'
}, {
  value: 'DELETE',
  label: 'DELETE'
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestMethodValues);

/***/ })

}]);
//# sourceMappingURL=WebhookModalNew0.0.1.js.map?ver=7c0957bd026b86cdbffa
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./src/js/turnstile/index.js ***!
  \***********************************/
/**
 * Turnstile JS functionality.
 */

/**
 * This is the main callback for Cloudflare.
 */
window.sceInitTurnstile = function () {
  // Get submit button.
  var submitButton = document.getElementById('sce-turnstile-submit');

  if (null === submitButton) {
    return;
  } // Now get the main form.


  var commentForm = submitButton.closest('form');

  if (null === commentForm) {
    return;
  } // We have the form. Now get the textarea.


  var commentFormTextarea = commentForm.querySelector('textarea ');

  if (null === commentFormTextarea) {
    return;
  } // Check that turnstile is present.


  if (typeof turnstile === 'undefined') {
    return;
  }
  /**
   * This is the callback for when the user has filled out the textarea.
   * We wait until the textarea is filled out to load turnstile to avoid the 300 second timeout of the token.
   */


  var turnstileBeginRender = function turnstileBeginRender() {
    // Remove the event listener immediately.
    commentFormTextarea.removeEventListener('input', turnstileBeginRender); // Now init turnstile.

    var widgetId = turnstile.render('#sce-turnstile', {
      sitekey: sceTurnstileLocal.sitekey,
      callback: function callback(token) {
        setTimeout(function () {
          // Reset the widget.
          turnstile.reset(widgetId);
        }, 300000); // 300 seconds (5 mins).
      },
      size: sceTurnstileLocal.size,
      theme: sceTurnstileLocal.theme,
      language: sceTurnstileLocal.language
    });
  }; // Set up the textarea event. Only load turnstile if the user has begun filling out the textarea.


  commentFormTextarea.addEventListener('input', turnstileBeginRender);
};
/******/ })()
;
//# sourceMappingURL=sce-cloudflare-turnstile.js.map
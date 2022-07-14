/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/js/avatars.js ***!
  \***************************/
window.addEventListener('load', function (event) {
  var avatars = sceAvatars.avatars;

  function preload() {
    avatars.forEach(function (avatar, index) {
      var image = new Image();
      new Image().src = avatar;
    });
  }

  preload(avatars);
});
/******/ })()
;
//# sourceMappingURL=avatars.js.map
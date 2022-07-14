/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/js/avatars.js ***!
  \***************************/
window.addEventListener('load', function (event) {
  var avatars = sceAvatars.avatars;

  function preload() {
    var imageHtml = '';
    avatars.forEach(function (avatar, index) {
      var image = new Image();
      image.src = avatar;
      image.alt = 'Avatar';
      image.width = 128;
      image.height = 128;
      imageHtml += "<img class=\"sce-inline-avatar\" src=\"".concat(image.src, "\" alt=\"").concat(image.alt, "\" width=\"").concat(image.width, "\" height=\"").concat(image.height, "\" />");
    });
    var sceAvatarPlaceholder = document.getElementById('sce-avatars');
    sceAvatarPlaceholder.innerHTML = imageHtml;
  }

  preload(avatars);
});
/******/ })()
;
//# sourceMappingURL=avatars.js.map
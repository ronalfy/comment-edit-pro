/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ./src/js/delete-post-comments-init.js ***!
  \*********************************************/
/**
 * Init fancybox for delete post comments link.
 */
window.addEventListener('load', function () {
  var deletePostCommentsLink = document.querySelector('.sce-delete-post-comments a');
  if (null !== deletePostCommentsLink) {
    // Init fancybox for link.
    deletePostCommentsLink.addEventListener('click', function (event) {
      event.preventDefault();
      jQuery.fancybox.open({
        src: event.target.href,
        type: 'iframe',
        width: '450px',
        baseClass: 'sce-fancybox-delete-post-comments'
      });
    });
  }
});
/******/ })()
;
//# sourceMappingURL=delete-post-comments-init.js.map
/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/js/avatars.js ***!
  \***************************/
/* eslint-disable no-unused-vars */
// Pre-load all the avatar images.
window.addEventListener('load', function (event) {
  var imageHtml = ''; // Todo: Offload to new file.

  var avatars = sceAvatars.avatars;
  /**
   * Get all the pngs and pre-load in the footer.
   */

  function preload() {
    // eslint-disable-next-line no-unused-vars
    avatars.forEach(function (avatarData, index) {
      var image = new Image();
      image.src = avatarData.avatar_url;
      image.alt = 'Avatar';
      image.width = 128;
      image.height = 128;
      image['data-key'] = avatarData.avatar_key; // Set scoped imageHtml string with all images.

      imageHtml += "<img class=\"sce-inline-avatar\" src=\"".concat(image.src, "\" alt=\"").concat(image.alt, "\" width=\"").concat(image.width, "\" height=\"").concat(image.height, "\" data-key=\"").concat(image['data-key'], "\" />");
    }); // This is the close button for the avatar popup.

    imageHtml += "<div class=\"sce-avatar-form-modal-close\"><div class=\"sce-avatar-form-modal-close-x\"></div><div class=\"sce-avatar-form-modal-close-x\"></div></div>";
    var sceAvatarPlaceholder = document.getElementById('sce-avatars');
    sceAvatarPlaceholder.innerHTML = imageHtml;
  } // Run after doc has finished loading. Preloads all the png files.


  preload(avatars); // Function for toggling interface.

  var toggleModalState = function toggleModalState() {
    var avatarsModal = document.querySelector('#sce-avatar-form-modal-wrapper');
    avatarsModal.classList.remove('sce-comment-form-hidden');

    if (avatarsModal.classList.contains('sce-avatar-open')) {
      avatarsModal.classList.remove('sce-avatar-open');
      avatarsModal.classList.add('sce-avatar-closed');
      return;
    }

    avatarsModal.classList.remove('sce-avatar-closed');
    avatarsModal.classList.add('sce-avatar-open');
  }; // This runs when someone clicks on the avatar image.


  var avatarWrapper = document.querySelector('.comment-form-sce-avatar .sce-avatar img');
  avatarWrapper.addEventListener('click', function (e) {
    toggleModalState();
  }); // Avatar modal - Actions to run for when the modal is visible.
  // Credit: https://codepen.io/rebelchris/pen/MWyyLXR

  var modalWrapper = document.querySelector('#sce-avatar-form-modal');
  modalWrapper.setAttribute('height', '0');
  modalWrapper.setAttribute('height', '0');
  modalWrapper.classList.add('sce-comment-form-hidden');
  modalWrapper.setAttribute('aria-hidden', 'true');
  modalWrapper.innerHTML = imageHtml;
  modalWrapper.querySelectorAll('.sce-inline-avatar').forEach(function (avatar) {
    avatar.addEventListener('click', function (e) {
      var filename = e.target.getAttribute('data-key');
      var imgUrl = e.target.getAttribute('src'); // Get the current avatar image.

      var currentAvatar = document.querySelector('.comment-form-sce-avatar img.avatar');
      var commentFormInput = document.querySelector('#sce-comment-form-avatar');
      commentFormInput.setAttribute('value', filename);
      currentAvatar.setAttribute('src', imgUrl);
    });
  }); // Close button.

  var closeButton = modalWrapper.querySelector('.sce-avatar-form-modal-close');
  closeButton.addEventListener('click', function (e) {
    toggleModalState();
  });

  window.sceAvatars = function (event, commentId, userId, postId, nonce) {
    // From: https://stackoverflow.com/a/28222246
    var getOffset = function getOffset(el) {
      var rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      };
    }; // Remove all existing popovers.


    var avatarPopovers = document.querySelectorAll('.sce-avatars-popover');

    if (null !== avatarPopovers) {
      avatarPopovers.forEach(function (popover) {
        popover.remove();
      });
    } // Get wrapper for avatar container.


    var avatarsContainer = document.getElementById('sce-avatars');
    var avatarsClone = avatarsContainer.cloneNode(true);
    avatarsClone.id = 'sce-avatars-' + commentId;
    avatarsClone.classList.add('sce-avatars-popover');
    avatarsClone.style.display = ''; // Get x,y height position.

    var wrapper_x = getOffset(event.target).left + 60; // Need an option for this.

    var wrapper_y = getOffset(event.target).top; // Need an option for this.
    // Add avatars clone styles..
    // Append to the avatars contianer.

    var wrapper = document.createElement('div');
    wrapper.classList.add('sce-avatar-popover-wrapper');
    wrapper.style.left = wrapper_x + 'px';
    wrapper.style.top = wrapper_y + 'px';
    wrapper.style.position = 'absolute'; // Append a wrapper inside the wrapper for relative positioning.

    var wrapperInner = document.createElement('div');
    wrapperInner.classList.add('sce-avatar-popover-inner'); // Add interface inside inner wrapper.

    wrapperInner.appendChild(avatarsClone); // Now append to the wrapper.

    wrapper.appendChild(wrapperInner); // Finally, display to dom.

    avatarsContainer.after(wrapper);
  };
});
/******/ })()
;
//# sourceMappingURL=avatars.js.map
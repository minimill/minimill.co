document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementsByClassName('contact')[0];
  var openContactModalLink = document.getElementsByClassName('open-contact-modal-link')[0];
  var closeContactModalLinks = document.getElementsByClassName('close-contact-modal-link');
  var body = document.body;
  var modalIsOpen = false;

  function _shouldCloseModal(link) {
    var href = link.getAttribute('href');
    if (href[0] === '#' || href === window.location.pathname) {
      return true;
    }

    return false;
  }

  function closeContactModal(e) {
    if (!_shouldCloseModal(this) || !modalIsOpen) { return; }

    if (e) { e.preventDefault(); }

    // Remove any hash if there is one
    history.pushState('', document.title, window.location.pathname + window.location.search);

    // Fade out modal
    modal.className = modal.className.replace(' visible', '');
    body.className = body.className.replace(' contact-modal-open', '');

    // Close modal
    setTimeout(function() {
      modal.className = modal.className.replace(' active', '');
      modalIsOpen = false;
    }, 200);
  }

  function openContactModal(e) {
    if (modalIsOpen) { return; }

    if (e) { e.preventDefault(); }

    window.location.hash = '#contact';
    modal.className += ' active visible';
    body.className += ' contact-modal-open';
    modalIsOpen = true;
  }

  if (window.location.hash === '#contact') {
    openContactModal();
  }

  for (var i = 0; i < closeContactModalLinks.length; i++) {
    closeContactModalLinks[i].addEventListener('click', closeContactModal);
  }

  openContactModalLink.addEventListener('click', openContactModal);
  document.documentElement.addEventListener('keyup', function(e) {
    if (e.keyCode == 27) { // escape key
      closeContactModal();
    }
  });
});

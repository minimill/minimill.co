document.addEventListener('DOMContentLoaded', function() {
  var links = document.getElementsByClassName('scroll-to');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', onClickScrollToLink);
  }

  function onClickScrollToLink(e) {
    var linkHREF = e.target.getAttribute('href');

    if (linkHREF[0] !== '#') {
      return;
    }

    e.preventDefault();
    var target = document.getElementById(linkHREF.slice(1));
    var offset = target.offsetTop;

    PageAnimation.scrollTo(offset, 200);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var workLink = document.getElementById('work-link');
  var MOBILE_WIDTH = 640;
  var md = new MobileDetect(window.navigator.userAgent);

  workLink.addEventListener('click', onClickWorkLink);

  function onClickWorkLink(e) {
    var linkHREF = '#world-after-capital'

    if (linkHREF[0] !== '#') {
      return;
    }

    e.preventDefault();
    var target = document.getElementById(linkHREF.slice(1));
    var offset = target.offsetTop;

    PageAnimation.scrollTo(offset, 200);
  }

  if (md.mobile() === null) {
    // Sections
    var sections = new Sections().enable();

    // PageAnimation
    new PageAnimation({
      animateLinksToSelf: true,
      scrollTiming: 'during',

      shouldAnimate: function(anchor, path) {
        if (anchor.id === 'work-link') {
          return false;
        }

        return window.innerWidth > MOBILE_WIDTH;
      },

      computeScrollOffset: function(animation) {
        if (animation.path === '/') {
          return 0;
        }

        var currentElement = animation.anchor;
        while (currentElement) {
          if (currentElement.className.indexOf('animated-section') > -1) {
            return currentElement.offsetTop;
          }

          currentElement = currentElement.parentElement;
        }
      },
    }).register(/^\/$/, 'sections', 'animating-to-home', {
      scrollTiming: 'after',
    }).register(/^\/wac\/?$/, 'sections', 'animating-to-wac-project')
      .register(/^\/fin\/?$/, 'sections', 'animating-to-fin-project')
      .register(/^\/upchannel\/?$/, 'sections', 'animating-to-upchannel-project')
      .register(/^\/unscan\/?$/, 'sections', 'animating-to-unscan-project')
      .register(/^\/team\/?$/, 'sections', 'animating-to-team-page')
      .enable();
  } else {
    var sectionElements = document.getElementsByClassName('project-preview');
    var height = window.innerHeight * 1.2;
    for (var i = 0; i < sectionElements.length; i++) {
      sectionElements[i].style.minHeight = height + 'px';
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var workLinks = document.getElementsByClassName('work-link');
  var MOBILE_WIDTH = 640;
  var md = new MobileDetect(window.navigator.userAgent);

  for (var i = 0; i < workLinks.length; i++) {
    workLinks[i].addEventListener('click', onClickWorkLink);
  }

  var hero = document.getElementsByClassName('section-work-hero')[0];
  hero.style.height = hero.offsetHeight + 'px';

  window.addEventListener('resize', function() {
    hero.style.height = '';
    hero.style.height = hero.offsetHeight + 'px';
  });

  function onClickWorkLink(e) {
    var linkHREF = '#world-after-capital';

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
    var sections;
    setTimeout(function() {
      sections = new Sections().enable();
    }, 100);

    // PageAnimation
    new PageAnimation({
      animateLinksToSelf: true,
      scrollTiming: 'during',

      shouldAnimate: function(anchor, path) {
        if (anchor.className.indexOf('work-link') >= 0) {
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
    for (i = 0; i < sectionElements.length; i++) {
      sectionElements[i].style.minHeight = height + 'px';
    }
  }
});

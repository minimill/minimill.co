window.addEventListener('load', function() {
  var workLinks = document.getElementsByClassName('work-link');
  var workHero = document.getElementById('work-hero');
  var MOBILE_WIDTH = 640;
  var md = new MobileDetect(window.navigator.userAgent);

  for (var i = 0; i < workLinks.length; i++) {
    workLinks[i].addEventListener('click', onClickWorkLink);
  }

  window.addEventListener('resize', function() {
    if (md.mobile() === null) {
      workHero.style.height = '';
      workHero.style.height = workHero.offsetHeight + 'px';
    }
  });

  function onClickWorkLink(e) {
    var linkHREF = '#world-after-capital';

    if (linkHREF[0] !== '#') {
      return;
    }

    e.preventDefault();
    var target = document.getElementById(linkHREF.slice(1));
    var offset = target.offsetTop;

    Pangea.scrollTo(offset, 1000);
  }

  if (md.mobile() === null) {
    // Sections
    var sections = new Sections({
      mobileWidth: 1024,
    }).enable();

    // Page animations managed by pangea.js
    new Pangea({
      animateLinksToSelf: true,
      scrollTiming: 'before',
      scrollDuration: 500,

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
    }).register(/^\/worldaftercapital\/?$/, 'fixed', 'animating-to-wac-project')
      .register(/^\/fin\/?$/, 'fixed', 'animating-to-fin-project')
      .register(/^\/upchannel\/?$/, 'fixed', 'animating-to-upchannel-project')
      .register(/^\/unscan\/?$/, 'fixed', 'animating-to-unscan-project')
      .register(/^\/team\/?$/, 'work-hero', 'animating-to-team-page')
      .enable();
  } else {
    workHero.style.height = workHero.clientHeight + 'px';
  }
});

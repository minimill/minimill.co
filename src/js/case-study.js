var sections = new Sections().enable();
var MOBILE_WIDTH = 640;
var md = new MobileDetect(window.navigator.userAgent);
if (md.mobile() === null) {
  new PageAnimation({
    shouldAnimate: function() {
      return window.innerWidth > MOBILE_WIDTH;
    },
  }).register(/^\/$/, 'sections', 'animating-to-home', {
    scrollTiming: 'after',
  }).register(/^\/team$/, 'sections', 'animating-to-team-page')
    .enable();
}

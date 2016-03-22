var MOBILE_WIDTH = 640;
var md = new MobileDetect(window.navigator.userAgent);
if (md.mobile() === null) {
  var sections = new Sections({
    mobileWidth: 1024,
  }).enable();
  new Pangea({
    scrollTiming: 'before',
    scrollDuration: 500,
    shouldAnimate: function() {
      return window.innerWidth > MOBILE_WIDTH;
    },
  }).register(/^\/$/, 'background-work-hero', 'animating-to-home', {
    scrollTiming: 'after',
  }).register(/^\/team\/?$/, 'background-work-hero', 'animating-to-team-page')
    .enable();
}

document.addEventListener('DOMContentLoaded', function() {
  var MOBILE_WIDTH = 640;
  var md = new MobileDetect(window.navigator.userAgent);

  if (md.mobile() === null) {
    new PageAnimation({
      scrollDuration: 500,
    }).register(/^\/$/, 'team-hero', 'animating-to-home')
      .register(/^\/worldaftercapital\/?$/, 'team-hero', 'animating-to-wac-project')
      .register(/^\/fin\/?$/, 'team-hero', 'animating-to-fin-project')
      .register(/^\/upchannel\/?$/, 'team-hero', 'animating-to-upchannel-project')
      .register(/^\/unscan\/?$/, 'team-hero', 'animating-to-unscan-project')
      .enable();
  }
});

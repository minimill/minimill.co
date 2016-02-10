var sections=(new Sections).enable(),MOBILE_WIDTH=640,md=new MobileDetect(window.navigator.userAgent);null===md.mobile()&&new PageAnimation({shouldAnimate:function(){return window.innerWidth>MOBILE_WIDTH}}).register(/^\/$/,"sections","animating-to-home",{scrollTiming:"after"}).register(/^\/team$/,"sections","animating-to-team-page").enable();
//# sourceMappingURL=dist/js/case-study.js.map

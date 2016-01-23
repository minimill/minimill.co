(function(global) {
  'use strict';

  function Sections(options) {
    var opts = options || {};

    this.settings = {
      bodyClassPrefix: opts.bodyClassPrefix || 'in-section-',
      sectionClass: opts.sectionClass || 'animated-section',
      mobileWidth: opts.mobileWidth || 640,
    };

    this.sectionElements = document.getElementsByClassName(this.settings.sectionClass);
    if (!this.sectionElements) {
      console.error('Could not find any elements with the class "' + this.settings.sectionClass + '".');
    }

    this.lastWindowHeight = window.innerHeight;
    this.inRAF = false;
    this.lastYOffset = window.pageYOffset;
    this.sectionMap = this._computeSectionMap();
    this._onScroll();

    return this;
  }

  Sections.prototype._computeSectionMap = function() {
    var sectionMap = [];

    [].forEach.call(this.sectionElements, function(sectionElement) {
      console.log(this.lastWindowHeight);
      sectionMap.push({
        element: sectionElement,
        begin: Math.max(sectionElement.offsetTop - (this.lastWindowHeight / 2), 0),
        end: sectionElement.offsetTop - (this.lastWindowHeight / 2) + sectionElement.clientHeight,
        sectionId: sectionElement.dataset.sectionId,
      });
    }.bind(this));

    return sectionMap;
  };

  Sections.prototype._onScroll = function() {
    for (var i = 0; i < this.sectionMap.length; i++) {
      if (this.lastYOffset >= this.sectionMap[i].begin && this.lastYOffset < this.sectionMap[i].end) {
        var newBodyClassName = document.body.className;
        var newSectionClass = this.settings.bodyClassPrefix + this.sectionMap[i].sectionId;

        // Remove other section classes
        var re = new RegExp(this.settings.bodyClassPrefix + '.+ ', 'g');
        newBodyClassName = newBodyClassName.replace(re, '');
        newBodyClassName = newBodyClassName.replace('  ', ' ');

        // Add new section class
        newBodyClassName += ' ' + newSectionClass + ' ';

        // Set body class name
        document.body.className = newBodyClassName;
      }
    }

    this.inRAF = false;
  };

  Sections.prototype._getOnScroll = function() {
    var _this = this;

    var onScroll = function() {
      _this.lastYOffset = window.pageYOffset;
      if (!_this.inRAF) {
        _this.inRAF = true;
        window.requestAnimationFrame(_this._onScroll.bind(_this));
      }
    };

    return onScroll;
  };

  Sections.prototype._onResize = function() {
    this.sectionMap = this._computeSectionMap();
    this._onScroll();
  }

  Sections.prototype._getOnResize = function() {
    var _this = this;

    var onResize = function() {
      _this.lastWindowHeight = window.innerHeight;
      if (!_this.inRAF) {
        _this.inRAF = true;
        window.requestAnimationFrame(_this._onResize.bind(_this));
      }
    };

    return onResize;
  };

  Sections.prototype.enable = function() {
    this.onScroll = this._getOnScroll();
    this.onResize = this._getOnResize();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.onResize);
  };

  Sections.prototype.disable = function() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
  };

  if (typeof define === 'function' && define.amd) {
    define(Sections);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sections;
  } else {
    global.Sections = Sections;
  }

}(this));

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'jquery', 'jquery-scroll'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('jquery-scroll'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery, global.jqueryScroll);
    global.index = mod.exports;
  }
})(this, function (exports, _jquery, _jqueryScroll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = _interopRequireDefault(_jquery);

  var _jqueryScroll2 = _interopRequireDefault(_jqueryScroll);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var defaults = {
    navSelector: '#js-nav-wrap',
    navSubTagName: 'a',
    sectionSelector: '.js-slide-section',
    delay: 500,
    offset: 0,
    activeClass: 'is-active',
    duration: 800,
    easing: 'swing'
  };

  var $document = (0, _jquery2.default)(document);

  var isSectionScope = function isSectionScope($elem, offset) {
    var position = $document.scrollTop();
    var min = Math.floor($elem.offset().top - offset);
    var max = Math.floor($elem.offset().top - offset) + Math.floor($elem.innerHeight());

    return position >= min && position <= max;
  };

  var NavSlide = function NavSlide(option) {
    var options = _extends({}, defaults, option);

    var navSelector = options.navSelector,
        sectionSelector = options.sectionSelector,
        navSubTagName = options.navSubTagName,
        activeClass = options.activeClass,
        offset = options.offset,
        duration = options.duration,
        easing = options.easing;


    var $nav = (0, _jquery2.default)(navSelector);
    var $slide = (0, _jquery2.default)(sectionSelector);
    var $category = $nav.find(navSubTagName);

    var activeIndex = -1;

    var scrollHandle = function scrollHandle() {
      var oldIndex = activeIndex;
      var isScope = false;

      $slide.each(function (index, elem) {
        var $elem = (0, _jquery2.default)(elem);

        if (isSectionScope($elem, offset)) {
          activeIndex = index;
          isScope = true;
        }
      });

      if (isScope) {
        if (oldIndex !== activeIndex) {
          var $activeCategory = $category.eq(activeIndex);
          $category.removeClass(activeClass);
          $activeCategory.addClass(activeClass);
        }
      } else {
        activeIndex = -1;
        $category.removeClass(activeClass);
      }
    };

    $document.on('scroll', scrollHandle);

    scrollHandle();

    $category.on('click', function (e) {
      e.preventDefault();
      var $this = (0, _jquery2.default)(this);
      (0, _jqueryScroll2.default)({
        selector: $slide.eq($this.data('index')),
        offset: offset,
        duration: duration,
        easing: easing
      });
    });
  };

  exports.default = NavSlide;
});

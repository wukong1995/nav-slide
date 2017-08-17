'use strict';

import $ from 'jquery';
import scrollTo from 'jquery-scroll';

const defaults = {
  navSelector: '#nav',
  navSubTagName: 'a',
  isUseAnchor: false,
  isChangeHash: true,
  sectionSelector: $('.category'),
  delay: 500,
  offset: 0,
  activeClass: 'active',
  duration: 800,
  easing: 'swing'
}

const navSlide = option => {
  const options = Object.assign({}, defaults, option);

  const $document = $(document);
  const $nav = $(options.navSelector);
  const $item = options.sectionSelector;
  const $category = $nav.find(options.navSubTagName);

  let activeIndex = 0;
  $category.eq(0).addClass(options.activeClass);

  $document.on('scroll', () => {
    const position = $document.scrollTop();
    const oldIndex = activeIndex;

    $item.each((index, elem) => {
      const $elem = $(elem);

      if (position >= Math.floor($elem.offset().top - options.offset)
        && position <= Math.floor($elem.offset().top - options.offset) + Math.floor($elem.innerHeight())) {
        activeIndex = index;
      }
    });

    if (oldIndex !== activeIndex) {
      const $activeCategory = $category.eq(activeIndex);
      $category.removeClass(options.activeClass);
      $activeCategory.addClass(options.activeClass);

      if(options.isUseAnchor && options.isChangeHash) {
        location.hash = $activeCategory.attr('href');
      }
    }
  });

  // 不使用锚点，为每个tag挂在事件
  if(!options.isUseAnchor) {
    $category.on('click', function (e) {
      e.preventDefault();
      const $this = $(this);
      scrollTo({
        selector: $item.eq($this.data('index')),
        offset: options.offset,
        duration: options.duration,
        easing: options.easing
      });
    });
  }
};

export default navSlide;

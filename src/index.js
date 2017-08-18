import $ from 'jquery';
import scrollTo from 'jquery-scroll';

const defaults = {
  navSelector: '#js-nav-wrap',
  navSubTagName: 'a',
  sectionSelector: '.js-slide-section',
  delay: 500,
  offset: 0,
  activeClass: 'is-active',
  duration: 800,
  easing: 'swing'
}

const $document = $(document);

const isSectionScope = ($elem, offset) => {
  const position = $document.scrollTop();
  const min = Math.floor($elem.offset().top - offset);
  const max = Math.floor($elem.offset().top - offset) + Math.floor($elem.innerHeight());

  return position >= min && position <= max;
}

const navSlide = option => {
  const options = Object.assign({}, defaults, option);

  const { navSelector, sectionSelector, navSubTagName, activeClass, offset, duration, easing } = options;

  const $nav = $(navSelector);
  const $slide = $(sectionSelector);
  const $category = $nav.find(navSubTagName);

  let activeIndex = -1;


  const scrollHandle = () => {
    const oldIndex = activeIndex;
    let isScope = false;

    $slide.each((index, elem) => {
      const $elem = $(elem);

      if (isSectionScope($elem, offset)) {
        activeIndex = index;
        isScope = true;
      }
    });

    if (isScope) {
      if (oldIndex !== activeIndex) {
        const $activeCategory = $category.eq(activeIndex);
        $category.removeClass(activeClass);
        $activeCategory.addClass(activeClass);
      }
    } else {
      activeIndex = -1;
      $category.removeClass(activeClass);
    }
  }

  $document.on('scroll', scrollHandle);

  scrollHandle();

  $category.on('click', function (e) {
    e.preventDefault();
    const $this = $(this);
    scrollTo({
      selector: $slide.eq($this.data('index')),
      offset,
      duration,
      easing
    });
  });
};

export default navSlide;

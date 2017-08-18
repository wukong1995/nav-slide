# nav-slide
- - -
###Install
`npm install nav-slide --save`

###Usage for webpack
```javascript
import navSlide from 'nav-slide';
// 样式自己写

const modal = new navSlide([options]);
```

#### *options*
-----
- navSelector           // 默认值：'#js-nav-wrap',
- navSubTagName         // 默认值：'a',
- sectionSelector       // 默认值：'.js-slide-section',
- delay                 // 默认值：500,
- offset                // 默认值：0,
- activeClass           // 默认值：'is-active',
- duration              // 默认值：800,
- easing                // 默认值：'swing'

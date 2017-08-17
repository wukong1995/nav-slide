# nav-slide
- - -
###Install
`npm install nav-slide --save`

###Usage for webpack
```javascript
import navSilde from 'nav-slide';
// 样式自己写

const modal = new navSilde([options]);
```

#### *options*
-----
- navSelector           // 默认值：'#nav',
- navSubTagName         // 默认值：'a',
- isUseAnchor           // 默认值：false,
- isChangeHash          // 默认值：true,
- sectionSelector       // 默认值：$('.category'),
- delay                 // 默认值：500,
- offset                // 默认值：0,
- activeClass           // 默认值：'active',
- duration              // 默认值：800,
- easing                // 默认值：'swing'


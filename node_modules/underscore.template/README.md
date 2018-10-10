# underscore.template
> Extracted template from [Underscore](http://underscorejs.org/), use `_.template` without full underscore source.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Bower version][bower-image]][bower-url]
[![Build Status](https://travis-ci.org/superRaytin/underscore.template.svg?branch=master)](https://travis-ci.org/superRaytin/underscore.template)

[![underscore.template](https://nodei.co/npm/underscore.template.png)](https://npmjs.org/package/underscore.template)

[npm-url]: https://npmjs.org/package/underscore.template
[downloads-image]: http://img.shields.io/npm/dm/underscore.template.svg
[npm-image]: http://img.shields.io/npm/v/underscore.template.svg
[bower-url]:http://badge.fury.io/bo/underscore.template
[bower-image]: https://badge.fury.io/bo/underscore.template.svg

# Installation

### NPM

```
npm install underscore.template
```

### Bower

```
bower install underscore.template
```

# Usage

### Node.js

```js
var UnderscoreTemplate = require('underscore.template');
var template = UnderscoreTemplate("<b><%- value %></b>");

template({value: 'hello world'});
// <b>hello world</b>

template({value: '<script>'});
// <b>&lt;script&gt;</b>
```

### Browser

Simply download the latest minified version from the `dist/` folder. API is available in a global object called `UnderscoreTemplate`.

```html
<script src="./dist/underscore.template.js"></script>
```

```js
var template = UnderscoreTemplate("<b><%- value %></b>");

template({value: 'hello world'});
// <b>hello world</b>
```

# Testing

```
npm test
```

# License

MIT, see the [LICENSE](/LICENSE) file for detail.
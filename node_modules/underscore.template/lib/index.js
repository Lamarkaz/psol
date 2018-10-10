'use strict';

var _ = require('./underscore.template');
var UnderscoreTemplate = _.template;

function Template(text, data, settings) {
  return UnderscoreTemplate(text, data, settings);
}

Template._ = _;
module.exports = Template;

// If we're in the browser,
// define it if we're using AMD, otherwise leak a global.
if (typeof define === 'function' && define.amd) {
  define(function() {
    return Template;
  });
} else if (typeof window !== 'undefined' || typeof navigator !== 'undefined') {
  window.UnderscoreTemplate = Template;
}
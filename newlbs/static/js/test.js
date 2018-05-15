(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BASE_URL = '//10.222.11.216:8001/';
// const BASE_URL = '//orionmm.jd.local/'


var GET_SHOPLIST = exports.GET_SHOPLIST = 'omm/ml.htm';

var GET_SHOPDETAIL = exports.GET_SHOPDETAIL = 'omm/md.htm';

var GET_PRIZE = exports.GET_PRIZE = 'omm/tp.htm';

var GET_COUPON = exports.GET_COUPON = 'omm/tp.htm';
},{}],2:[function(require,module,exports){
'use strict';

var _api = require('./api.js');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(api.GET_SHOPDETAIL);
},{"./api.js":1}]},{},[2]);

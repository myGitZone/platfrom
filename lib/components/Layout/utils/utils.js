"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowser = exports.isUrl = void 0;

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

var isUrl = function isUrl(path) {
  return reg.test(path);
};

exports.isUrl = isUrl;

var isBrowser = function isBrowser() {
  return typeof window !== 'undefined';
};

exports.isBrowser = isBrowser;
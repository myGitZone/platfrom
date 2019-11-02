"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
var _default = function _default(_ref) {
  var className = _ref.className,
      links = _ref.links,
      copyright = _ref.copyright;
  var clsString = (0, _classnames.default)(_index.default['ant-pro-global-footer'], className);
  return _react.default.createElement("footer", {
    className: clsString
  }, links && _react.default.createElement("div", {
    className: _index.default['ant-pro-global-footer-links']
  }, links.map(function (link) {
    return _react.default.createElement("a", {
      key: link.key,
      title: link.key,
      target: link.blankTarget ? '_blank' : '_self',
      href: link.href
    }, link.title);
  })), copyright && _react.default.createElement("div", {
    className: _index.default['ant-pro-global-footer-copyright']
  }, copyright));
};

exports.default = _default;
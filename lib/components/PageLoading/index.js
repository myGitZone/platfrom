"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
var PageLoding = function PageLoding() {
  return _react.default.createElement("div", {
    style: {
      paddingTop: 100,
      textAlign: 'center'
    }
  }, _react.default.createElement(_spin.default, {
    size: "large"
  }));
};

var _default = PageLoding;
exports.default = _default;
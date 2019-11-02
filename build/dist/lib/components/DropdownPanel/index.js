"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("antd/lib/menu/style");
var _menu = _interopRequireDefault(require("antd/lib/menu"));
var _react = _interopRequireDefault(require("react"));
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore
var DropdownPanel = function DropdownPanel(props) {
    return _react.default.createElement(_menu.default, {
        className: _index.default.sysmenu,
        selectedKeys: ['1']
    }, _react.default.createElement(_menu.default.Item, {
        key: "1"
    }, "\u5C71\u4E1C\u653F\u52A1\u5927\u6570\u636E\u4E2D\u5FC3"), _react.default.createElement(_menu.default.Item, {
        key: "2"
    }, "\u5929\u6D25\u5927\u6E2F\u653F\u52A1\u6570\u636E\u4E2D\u5FC3"), _react.default.createElement(_menu.default.Item, {
        key: "3"
    }, "\u5C71\u4E1C\u62DB\u8FDC"));
};
var _default = DropdownPanel;
exports.default = _default;
//# sourceMappingURL=index.js.map
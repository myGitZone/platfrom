"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("antd/lib/icon/style");
var _icon = _interopRequireDefault(require("antd/lib/icon"));
require("antd/lib/tooltip/style");
var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));
var _react = _interopRequireDefault(require("react"));
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore
var baseClassName = _index.default['ant-pro-setting-drawer-block-checbox'];
var BlockCheckbox = function BlockCheckbox(_ref) {
    var value = _ref.value, onChange = _ref.onChange, list = _ref.list;
    return _react.default.createElement("div", {
        className: baseClassName,
        key: value
    }, list.map(function (item) {
        return _react.default.createElement(_tooltip.default, {
            title: item.title,
            key: item.key
        }, _react.default.createElement("div", {
            className: "".concat(baseClassName, "-item"),
            onClick: function onClick() {
                return onChange(item.key);
            }
        }, _react.default.createElement("img", {
            src: item.url,
            alt: item.key
        }), _react.default.createElement("div", {
            className: "".concat(baseClassName, "-selectIcon"),
            style: {
                display: value === item.key ? 'block' : 'none'
            }
        }, _react.default.createElement(_icon.default, {
            type: "check"
        }))));
    }));
};
var _default = BlockCheckbox;
exports.default = _default;
//# sourceMappingURL=BlockCheckbox.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("./GridContent.less");
var _react = _interopRequireDefault(require("react"));
var _RouteContext = _interopRequireDefault(require("../RouteContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var GridContent = function GridContent(props) {
    return _react.default.createElement(_RouteContext.default.Consumer, null, function (value) {
        var children = props.children, propsContentWidth = props.contentWidth;
        var contentWidth = propsContentWidth || value.contentWidth;
        var className = 'ant-pro-grid-content';
        if (contentWidth === 'Fixed') {
            className = 'ant-pro-grid-content wide';
        }
        return _react.default.createElement("div", {
            className: className
        }, children);
    });
};
var _default = GridContent;
exports.default = _default;
//# sourceMappingURL=index.js.map
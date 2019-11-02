function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) { return typeof obj; };
}
else {
    _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
} return _typeof(obj); }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) {
    if (i % 2) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; }));
        }
        ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); });
    }
    else {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    }
} return target; }
function _defineProperty(obj, key, value) { if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
}
else {
    obj[key] = value;
} return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps)
    _defineProperties(Constructor.prototype, protoProps); if (staticProps)
    _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
} return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
} return self; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass)
    _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { isBrowser } from '../utils/utils'; // @ts-ignore
import styles from './index.less';
var TopNavHeader = 
/*#__PURE__*/
function (_Component) {
    _inherits(TopNavHeader, _Component);
    function TopNavHeader() {
        var _this;
        _classCallCheck(this, TopNavHeader);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(TopNavHeader).apply(this, arguments));
        _this.state = {};
        _this.maim = null;
        return _this;
    }
    _createClass(TopNavHeader, [{
            key: "render",
            value: function render() {
                var _this2 = this;
                var _this$props = this.props, theme = _this$props.theme, menuData = _this$props.menuData, logo = _this$props.logo, title = _this$props.title, contentWidth = _this$props.contentWidth, rightContentRender = _this$props.rightContentRender;
                var maxWidth = this.state.maxWidth;
                var flatMenuKeys = getFlatMenuKeys(menuData);
                var baseClassName = styles['ant-pro-top-nav-header'];
                return React.createElement("div", {
                    className: "".concat(baseClassName, " ").concat(theme === 'light' ? 'light' : '')
                }, React.createElement("div", {
                    ref: function ref(_ref) {
                        _this2.maim = _ref;
                    },
                    className: "".concat(baseClassName, "-main ").concat(contentWidth === 'Fixed' ? 'wide' : '')
                }, React.createElement("div", {
                    className: "".concat(baseClassName, "-left")
                }, React.createElement("div", {
                    className: "".concat(baseClassName, "-logo"),
                    key: "logo",
                    id: "logo"
                }, React.createElement("a", null, defaultRenderLogo(logo), React.createElement("h1", null, title)))), React.createElement("div", {
                    style: {
                        maxWidth: maxWidth,
                        flex: 1
                    },
                    className: "".concat(baseClassName, "-menu")
                }, React.createElement(BaseMenu, Object.assign({}, this.props, {
                    flatMenuKeys: flatMenuKeys
                }))), rightContentRender && rightContentRender(_objectSpread({}, this.props))));
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function getDerivedStateFromProps(props) {
                var contentWidth = props.contentWidth;
                var innerWidth = isBrowser() ? window.innerWidth : 0;
                return {
                    maxWidth: (contentWidth === 'Fixed' && innerWidth > 1200 ? 1200 : innerWidth) - 280 - 120
                };
            }
        }]);
    return TopNavHeader;
}(Component);
export { TopNavHeader as default };
//# sourceMappingURL=index.js.map
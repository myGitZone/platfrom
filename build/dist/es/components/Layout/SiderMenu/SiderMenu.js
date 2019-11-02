import "antd/es/layout/style";
import _Layout from "antd/es/layout";
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) { return typeof obj; };
}
else {
    _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
} return _typeof(obj); }
function _defineProperty(obj, key, value) { if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
}
else {
    obj[key] = value;
} return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
} }
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
import classNames from 'classnames';
import BaseMenu from './BaseMenu';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils'; // @ts-ignore
import styles from './index.less';
var Sider = _Layout.Sider; // 是否第一次加载
var firstMount = true;
export var defaultRenderLogo = function defaultRenderLogo(logo, collapsed) {
    // 如果是字符串则直接用img进行展示
    if (typeof logo === 'string') {
        return React.createElement("img", {
            className: collapsed ? styles['img-collapsed'] : styles.img,
            src: logo,
            alt: "logo"
        });
    } // 如果是一个函数，则返回函数的返回的值，值为React.ReactNode
    if (typeof logo === 'function') {
        return logo();
    }
    return logo;
};
var SiderMenu = 
/*#__PURE__*/
function (_Component) {
    _inherits(SiderMenu, _Component);
    function SiderMenu(props) {
        var _this;
        _classCallCheck(this, SiderMenu);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(SiderMenu).call(this, props)); // 判断是否为第一级菜单
        _this.isMainMenu = function (key) {
            var _this$props$menuData = _this.props.menuData, menuData = _this$props$menuData === void 0 ? [] : _this$props$menuData;
            return menuData.some(function (item) {
                if (key) {
                    return item.key === key || item.path === key;
                }
                return false;
            });
        }; // (openKeys: string[]) => void 表示handleOpenChange的类型是一个函数，接收openKeys的数组，并且没有返回值
        _this.handleOpenChange = function (openKeys) {
            // 判断展开的第一级节点是不是有多个
            var moreThanOne = openKeys.filter(function (openKey) {
                return _this.isMainMenu(openKey);
            }).length > 1;
            if (moreThanOne) {
                // 如果有多个展开的第一级节点，则取最新的一个，这里控制菜单只是展开一个
                _this.setState({
                    openKeys: [openKeys.pop()].filter(function (item) {
                        return item;
                    })
                });
            }
            else {
                _this.setState({
                    openKeys: _toConsumableArray(openKeys)
                });
            }
        };
        _this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        };
        return _this;
    }
    _createClass(SiderMenu, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // 修改第一次加载为false，
                firstMount = false;
            }
        }, {
            key: "render",
            value: function render() {
                var _classNames;
                var _this$props = this.props, logo = _this$props.logo, collapsed = _this$props.collapsed, title = _this$props.title, fixSiderbar = _this$props.fixSiderbar, _onCollapse = _this$props.onCollapse, theme = _this$props.theme, _this$props$siderWidt = _this$props.siderWidth, siderWidth = _this$props$siderWidt === void 0 ? 256 : _this$props$siderWidt, isMobile = _this$props.isMobile, layout = _this$props.layout, _this$props$trigger = _this$props.trigger, trigger = _this$props$trigger === void 0 ? null : _this$props$trigger, renderSysChange = _this$props.renderSysChange;
                var openKeys = this.state.openKeys; // 如果左侧silder是展开状态，或者菜单不是在左侧，而是在头部，则默认的不展开任何节点，因为这时候是鼠标移入展示的。不需要展开
                var defaultProps = collapsed || layout !== 'sidemenu' ? {} : {
                    openKeys: openKeys
                };
                var siderClassName = classNames(styles['ant-pro-sider-menu-sider'], (_classNames = {}, _defineProperty(_classNames, styles['fix-sider-bar'], fixSiderbar), _defineProperty(_classNames, styles.light, theme === 'light'), _classNames));
                return React.createElement(Sider, {
                    collapsible: true,
                    trigger: trigger,
                    collapsed: collapsed,
                    breakpoint: "lg",
                    onCollapse: function onCollapse(collapse, type) {
                        // 如果是第一次加载或者不是手机端，则可以进行收缩
                        if (firstMount || !isMobile) {
                            if (_onCollapse) {
                                _onCollapse(collapse);
                            }
                        }
                    },
                    width: siderWidth,
                    theme: theme,
                    className: siderClassName
                }, React.createElement("div", {
                    className: styles['ant-pro-sider-menu-logo'],
                    id: "logo"
                }, React.createElement("a", null, defaultRenderLogo(logo, collapsed), collapsed ? null : React.createElement("h1", null, title))), React.createElement("div", {
                    className: styles.sys
                }, renderSysChange && renderSysChange()), React.createElement(BaseMenu, Object.assign({}, this.props, {
                    mode: "inline",
                    handleOpenChange: this.handleOpenChange,
                    onOpenChange: this.handleOpenChange,
                    style: {
                        width: '100%',
                        background: 'transparent'
                    }
                }, defaultProps)));
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function getDerivedStateFromProps(props, state) {
                var pathname = state.pathname, flatMenuKeysLen = state.flatMenuKeysLen;
                var _props$location = props.location, location = _props$location === void 0 ? {
                    pathname: '/'
                } : _props$location, _props$flatMenuKeys = props.flatMenuKeys, flatMenuKeys = _props$flatMenuKeys === void 0 ? [] : _props$flatMenuKeys;
                if (location.pathname !== pathname || flatMenuKeys.length !== flatMenuKeysLen) {
                    return {
                        pathname: location.pathname,
                        flatMenuKeysLen: flatMenuKeys.length,
                        openKeys: getDefaultCollapsedSubMenus(props)
                    };
                }
                return null;
            }
        }]);
    return SiderMenu;
}(Component);
export { SiderMenu as default };
SiderMenu.defaultProps = {
    flatMenuKeys: [],
    onCollapse: function onCollapse() {
        return undefined;
    },
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: function handleOpenChange() {
        return undefined;
    },
    menuData: [],
    onOpenChange: function onOpenChange() {
        return undefined;
    }
};
//# sourceMappingURL=SiderMenu.js.map
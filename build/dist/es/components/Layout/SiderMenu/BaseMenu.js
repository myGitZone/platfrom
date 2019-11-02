import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/menu/style";
import _Menu from "antd/es/menu";
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) { return typeof obj; };
}
else {
    _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
} return _typeof(obj); }
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
import classNames from 'classnames';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '../utils/utils';
import { urlToList } from '../utils/pathTools'; // @ts-ignore
import styles from './index.less';
var SubMenu = _Menu.SubMenu;
var IconFont = _Icon.createFromIconfontCN({
    scriptUrl: ''
}); // Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
var getIcon = function getIcon(icon) {
    if (typeof icon === 'string') {
        // 如果是url，说明是网络图片，用img
        if (isUrl(icon) || icon.startsWith('/')) {
            return React.createElement(_Icon, {
                component: function component() {
                    return React.createElement("img", {
                        src: icon,
                        alt: "icon",
                        className: "ant-pro-sider-menu-icon"
                    });
                }
            });
        } // 如果是icon-开头，用IconFont进行加载
        if (icon.startsWith('icon-')) {
            return React.createElement(IconFont, {
                type: icon
            });
        } // 直接用Icon组件
        return React.createElement(_Icon, {
            type: icon
        });
    }
    return icon;
};
var BaseMenu = 
/*#__PURE__*/
function (_Component) {
    _inherits(BaseMenu, _Component);
    function BaseMenu(props) {
        var _this;
        _classCallCheck(this, BaseMenu);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseMenu).call(this, props));
        _this.state = {};
        /**
         * 获得菜单子节点
         */
        _this.getNavMenuItems = function () {
            var menusData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            return ( // filter是过滤掉有name属性并且不是隐藏的
            // map是获取子menu
            menusData.filter(function (item) {
                return item.name && !item.hideInMenu;
            }).map(function (item) {
                return _this.getSubMenuOrItem(item);
            }).filter(function (item) {
                return item;
            }));
        }; // Get the currently selected menu
        _this.getSelectedMenuKeys = function (pathname) {
            var flatMenuKeys = _this.props.flatMenuKeys;
            return urlToList(pathname).map(function (itemPath) {
                return getMenuMatches(flatMenuKeys, itemPath).pop();
            }).filter(function (item) {
                return item;
            });
        };
        /**
         * get SubMenu or Item
         */
        _this.getSubMenuOrItem = function (item) {
            // 如果有children，并且子菜单不隐藏，并且children是有name的菜单
            if (Array.isArray(item.children) && !item.hideChildrenInMenu && item.children.some(function (child) {
                return child && !!child.name;
            })) {
                // 名字做国际化
                var name = _this.getIntlName(item);
                return React.createElement(SubMenu, {
                    title: item.icon ? React.createElement("span", null, getIcon(item.icon), React.createElement("span", null, name)) : name,
                    key: item.path
                }, _this.getNavMenuItems(item.children));
            }
            return React.createElement(_Menu.Item, {
                key: item.path
            }, _this.getMenuItemPath(item));
        };
        _this.getIntlName = function (item) {
            var name = item.name, locale = item.locale;
            var _this$props = _this.props, _this$props$menu = _this$props.menu, menu = _this$props$menu === void 0 ? {
                locale: false
            } : _this$props$menu, formatMessage = _this$props.formatMessage;
            if (locale && menu.locale && formatMessage) {
                return formatMessage({
                    id: locale,
                    defaultMessage: name
                });
            }
            return name;
        };
        /**
         * 判断是否是http链接.返回 Link 或 a
         * Judge whether it is http link.return a or Link
         * @memberof SiderMenu
         */
        _this.getMenuItemPath = function (item) {
            var itemPath = _this.conversionPath(item.path);
            var icon = getIcon(item.icon);
            var _this$props2 = _this.props, _this$props2$location = _this$props2.location, location = _this$props2$location === void 0 ? {
                pathname: '/'
            } : _this$props2$location, isMobile = _this$props2.isMobile, onCollapse = _this$props2.onCollapse, menuItemRender = _this$props2.menuItemRender;
            var target = item.target; // if local is true formatMessage all name。
            var name = _this.getIntlName(item);
            var defaultItem = React.createElement(React.Fragment, null, icon, React.createElement("span", null, name));
            var isHttpUrl = isUrl(itemPath); // Is it a http link
            if (isHttpUrl) {
                defaultItem = React.createElement("a", {
                    href: itemPath,
                    target: target
                }, icon, React.createElement("span", null, name));
            }
            if (menuItemRender) {
                return menuItemRender(_objectSpread({}, item, {
                    isUrl: isHttpUrl,
                    itemPath: itemPath,
                    isMobile: isMobile,
                    replace: itemPath === location.pathname,
                    onClick: function onClick() {
                        return onCollapse && onCollapse(true);
                    }
                }), defaultItem);
            }
            return defaultItem;
        };
        _this.conversionPath = function (path) {
            if (path && path.indexOf('http') === 0) {
                return path;
            }
            return "/".concat(path || '').replace(/\/+/g, '/');
        };
        _this.getPopupContainer = function (fixedHeader, layout) {
            if (fixedHeader && layout === 'topmenu' && _this.warp) {
                return _this.warp;
            }
            return document.body;
        };
        _this.getRef = function (ref) {
            _this.warp = ref;
        };
        var iconfontUrl = props.iconfontUrl; // reset IconFont
        if (iconfontUrl) {
            IconFont = _Icon.createFromIconfontCN({
                scriptUrl: iconfontUrl
            });
        }
        return _this;
    }
    _createClass(BaseMenu, [{
            key: "render",
            value: function render() {
                var _this$props3 = this.props, openKeys = _this$props3.openKeys, theme = _this$props3.theme, mode = _this$props3.mode, _this$props3$location = _this$props3.location, location = _this$props3$location === void 0 ? {
                    pathname: '/'
                } : _this$props3$location, className = _this$props3.className, collapsed = _this$props3.collapsed, handleOpenChange = _this$props3.handleOpenChange, style = _this$props3.style, _this$props3$layout = _this$props3.layout, layout = _this$props3$layout === void 0 ? 'sidemenu' : _this$props3$layout, menuData = _this$props3.menuData; // 根据pathanme获取选中的菜单
                var selectedKeys = this.getSelectedMenuKeys(location.pathname); // 如果没有选中的节点，则获取展开的最后一个
                if (!selectedKeys.length && openKeys) {
                    selectedKeys = [openKeys[openKeys.length - 1]];
                }
                var props = {}; // 如果有openKeys，并且是没有关闭的状态，并且是左侧菜单，则将openkeys赋值给Menu
                if (openKeys && !collapsed && layout === 'sidemenu') {
                    props = {
                        openKeys: openKeys.length === 0 ? _toConsumableArray(selectedKeys) : openKeys
                    };
                }
                var cls = classNames(className, _defineProperty({}, styles['top-nav-menu'], mode === 'horizontal'));
                return React.createElement(React.Fragment, null, React.createElement(_Menu, Object.assign({}, props, {
                    key: "Menu",
                    mode: mode,
                    theme: theme,
                    onOpenChange: handleOpenChange,
                    selectedKeys: selectedKeys,
                    style: style,
                    className: cls
                }), this.getNavMenuItems(menuData)), React.createElement("div", {
                    ref: this.getRef
                }));
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function getDerivedStateFromProps(props) {
                var iconfontUrl = props.iconfontUrl; // reset IconFont
                if (iconfontUrl) {
                    IconFont = _Icon.createFromIconfontCN({
                        scriptUrl: iconfontUrl
                    });
                }
                return null;
            }
        }]);
    return BaseMenu;
}(Component);
export { BaseMenu as default };
BaseMenu.defaultProps = {
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
//# sourceMappingURL=BaseMenu.js.map
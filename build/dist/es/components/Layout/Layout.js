import "antd/es/layout/style";
import _Layout from "antd/es/layout";
function _objectWithoutProperties(source, excluded) { if (source == null)
    return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
            continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
            continue;
        target[key] = source[key];
    }
} return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null)
    return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
        continue;
    target[key] = source[key];
} return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
            break;
    }
}
catch (err) {
    _d = true;
    _e = err;
}
finally {
    try {
        if (!_n && _i["return"] != null)
            _i["return"]();
    }
    finally {
        if (_d)
            throw _e;
    }
} return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr))
    return arr; }
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
import React, { useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import useMedia from 'react-media-hook2';
import Header from './Header';
import defaultGetPageTitle from './getPageTitle';
import getLocales from './locales';
import Footer from './Footer';
import RouteContext from './RouteContext';
import SiderMenu from './SiderMenu';
import { getBreadcrumbProps } from './utils/getBreadcrumbProps';
import getMenuData from './utils/getMenuData';
import { isBrowser } from './utils/utils'; // @ts-ignore
import styles from './Layout.less';
var Content = _Layout.Content;
var query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599
    },
    'screen-xxl': {
        minWidth: 1600
    }
};
var headerRender = function headerRender(props) {
    // 如果header是不需要的，则返回null
    if (props.headerRender === false) {
        return null;
    }
    return React.createElement(Header, Object.assign({}, props));
};
var footerRender = function footerRender(props) {
    if (props.footerRender === false) {
        return null;
    }
    if (props.footerRender) {
        return props.footerRender(_objectSpread({}, props), React.createElement(Footer, null));
    }
    return React.createElement(Footer, null);
}; // 参数props: BasicLayoutProps  返回值 React.ReactNode
var renderSiderMenu = function renderSiderMenu(props) {
    // layout 菜单布局  isMobile  是否是移动端打开   menuRender 自定义菜单的展示
    var layout = props.layout, isMobile = props.isMobile, menuRender = props.menuRender; // 如果menuRender是false，则表示不进行菜单渲染
    if (menuRender === false) {
        return null;
    } // 如果是头部菜单并且不是手机端打开的话，则不进行渲染
    if (layout === 'topmenu' && !isMobile) {
        return null;
    }
    if (menuRender) {
        // 传入参数，和默认的渲染组件，返回函数修改后的组件，通过menuRender进行判断是展示默认的还是需要进行修改
        return menuRender(props, React.createElement(SiderMenu, Object.assign({}, props)));
    }
    return React.createElement(SiderMenu, Object.assign({}, props));
};
var defaultPageTitleRender = function defaultPageTitleRender(pageProps, props) {
    var pageTitleRender = props.pageTitleRender;
    if (pageTitleRender === false) {
        return props.title || '';
    }
    if (pageTitleRender) {
        var title = pageTitleRender(pageProps);
        if (typeof title === 'string') {
            return title;
        }
        console.warn('pro-layout: renderPageTitle return value should be a string');
    }
    return defaultGetPageTitle(pageProps);
};
function useCollapsed(collapsed, onCollapse) {
    var _useState = useState(false), _useState2 = _slicedToArray(_useState, 2), nativeCollapsed = _useState2[0], setCollapsed = _useState2[1];
    if (collapsed !== undefined && onCollapse) {
        return [collapsed, onCollapse];
    }
    return [nativeCollapsed, setCollapsed];
}
var getPaddingLeft = function getPaddingLeft(hasLeftPadding, collapsed, siderWidth) {
    if (hasLeftPadding) {
        return collapsed ? 80 : siderWidth;
    }
    return undefined;
};
var BasicLayout = function BasicLayout(props) {
    var children = props.children, onCollapse = props.onCollapse, _props$location = props.location, location = _props$location === void 0 ? {
        pathname: '/'
    } : _props$location, fixedHeader = props.fixedHeader, fixSiderbar = props.fixSiderbar, _props$navTheme = props.navTheme, navTheme = _props$navTheme === void 0 ? 'dark' : _props$navTheme, PropsLayout = props.layout, _props$route = props.route, route = _props$route === void 0 ? {
        routes: []
    } : _props$route, _props$siderWidth = props.siderWidth, siderWidth = _props$siderWidth === void 0 ? 256 : _props$siderWidth, menu = props.menu, _props$showHeader = props.showHeader, showHeader = _props$showHeader === void 0 ? true : _props$showHeader, menuDataRender = props.menuDataRender;
    var formatMessage = function formatMessage(_ref) {
        var id = _ref.id, defaultMessage = _ref.defaultMessage, rest = _objectWithoutProperties(_ref, ["id", "defaultMessage"]);
        if (props.formatMessage) {
            return props.formatMessage(_objectSpread({
                id: id,
                defaultMessage: defaultMessage
            }, rest));
        }
        var locales = getLocales();
        if (locales[id]) {
            return locales[id];
        }
        if (defaultMessage) {
            return defaultMessage;
        }
        return id;
    };
    var _route$routes = route.routes, routes = _route$routes === void 0 ? [] : _route$routes;
    var _getMenuData = getMenuData(routes, menu, formatMessage, menuDataRender), breadcrumb = _getMenuData.breadcrumb, menuData = _getMenuData.menuData;
    /**
     * init variables
     */
    var isMobile = useMedia({
        id: 'BasicLayout',
        query: '(max-width: 599px)'
    })[0]; // If it is a fix menu, calculate padding
    // don't need padding in phone mode
    var hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile; // whether to close the menu
    var _useCollapsed = useCollapsed(props.collapsed, onCollapse), _useCollapsed2 = _slicedToArray(_useCollapsed, 2), collapsed = _useCollapsed2[0], handleMenuCollapse = _useCollapsed2[1]; // Splicing parameters, adding menuData and formatMessage in props
    var defaultProps = _objectSpread({}, props, {
        formatMessage: formatMessage,
        breadcrumb: breadcrumb
    }); // gen page title
    var pageTitle = defaultPageTitleRender(_objectSpread({
        pathname: location.pathname
    }, defaultProps), props); // gen breadcrumbProps, parameter for pageHeader
    var breadcrumbProps = getBreadcrumbProps(_objectSpread({}, props, {
        breadcrumb: breadcrumb
    }));
    return React.createElement(DocumentTitle, {
        title: pageTitle
    }, React.createElement(ContainerQuery, {
        query: query
    }, function (params) {
        return React.createElement("div", {
            className: classNames(params, styles['ant-design-pro'], styles.basicLayout)
        }, React.createElement(_Layout, null, renderSiderMenu(_objectSpread({
            menuData: menuData,
            handleMenuCollapse: handleMenuCollapse,
            isMobile: isMobile,
            theme: navTheme,
            collapsed: collapsed
        }, defaultProps)), React.createElement(_Layout, {
            style: {
                paddingLeft: getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth),
                minHeight: '100vh',
                borderLeft: '4px solid #000',
                position: 'relative'
            }
        }, showHeader && headerRender(_objectSpread({
            menuData: menuData,
            handleMenuCollapse: handleMenuCollapse,
            isMobile: isMobile,
            collapsed: collapsed
        }, defaultProps)), React.createElement(Content, {
            className: styles['ant-pro-basicLayout-content'],
            style: !fixedHeader ? {
                paddingTop: 0
            } : {}
        }, React.createElement(RouteContext.Provider, {
            value: _objectSpread({
                breadcrumb: breadcrumbProps
            }, props, {
                menuData: menuData,
                isMobile: isMobile,
                collapsed: collapsed,
                title: pageTitle.split('-')[0].trim()
            })
        }, children)), footerRender(_objectSpread({
            isMobile: isMobile,
            collapsed: collapsed
        }, defaultProps)))));
    }));
};
BasicLayout.defaultProps = {
    logo: '',
    location: isBrowser() ? window.location : undefined
};
export default BasicLayout;
//# sourceMappingURL=Layout.js.map
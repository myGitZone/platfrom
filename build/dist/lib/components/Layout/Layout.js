"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("antd/lib/layout/style");
var _layout = _interopRequireDefault(require("antd/lib/layout"));
var _react = _interopRequireWildcard(require("react"));
var _reactContainerQuery = require("react-container-query");
var _reactDocumentTitle = _interopRequireDefault(require("react-document-title"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactMediaHook = _interopRequireDefault(require("react-media-hook2"));
var _Header = _interopRequireDefault(require("./Header"));
var _getPageTitle = _interopRequireDefault(require("./getPageTitle"));
var _locales = _interopRequireDefault(require("./locales"));
var _Footer = _interopRequireDefault(require("./Footer"));
var _RouteContext = _interopRequireDefault(require("./RouteContext"));
var _SiderMenu = _interopRequireDefault(require("./SiderMenu"));
var _getBreadcrumbProps = require("./utils/getBreadcrumbProps");
var _getMenuData2 = _interopRequireDefault(require("./utils/getMenuData"));
var _utils = require("./utils/utils");
var _Layout2 = _interopRequireDefault(require("./Layout.less"));
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) {
    return obj;
}
else {
    var newObj = {};
    if (obj != null) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                if (desc.get || desc.set) {
                    Object.defineProperty(newObj, key, desc);
                }
                else {
                    newObj[key] = obj[key];
                }
            }
        }
    }
    newObj.default = obj;
    return newObj;
} }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var Content = _layout.default.Content;
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
    return _react.default.createElement(_Header.default, Object.assign({}, props));
};
var footerRender = function footerRender(props) {
    if (props.footerRender === false) {
        return null;
    }
    if (props.footerRender) {
        return props.footerRender(_objectSpread({}, props), _react.default.createElement(_Footer.default, null));
    }
    return _react.default.createElement(_Footer.default, null);
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
        return menuRender(props, _react.default.createElement(_SiderMenu.default, Object.assign({}, props)));
    }
    return _react.default.createElement(_SiderMenu.default, Object.assign({}, props));
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
    return (0, _getPageTitle.default)(pageProps);
};
function useCollapsed(collapsed, onCollapse) {
    var _useState = (0, _react.useState)(false), _useState2 = _slicedToArray(_useState, 2), nativeCollapsed = _useState2[0], setCollapsed = _useState2[1];
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
        var locales = (0, _locales.default)();
        if (locales[id]) {
            return locales[id];
        }
        if (defaultMessage) {
            return defaultMessage;
        }
        return id;
    };
    var _route$routes = route.routes, routes = _route$routes === void 0 ? [] : _route$routes;
    var _getMenuData = (0, _getMenuData2.default)(routes, menu, formatMessage, menuDataRender), breadcrumb = _getMenuData.breadcrumb, menuData = _getMenuData.menuData;
    /**
     * init variables
     */
    var isMobile = (0, _reactMediaHook.default)({
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
    var breadcrumbProps = (0, _getBreadcrumbProps.getBreadcrumbProps)(_objectSpread({}, props, {
        breadcrumb: breadcrumb
    }));
    return _react.default.createElement(_reactDocumentTitle.default, {
        title: pageTitle
    }, _react.default.createElement(_reactContainerQuery.ContainerQuery, {
        query: query
    }, function (params) {
        return _react.default.createElement("div", {
            className: (0, _classnames.default)(params, _Layout2.default['ant-design-pro'], _Layout2.default.basicLayout)
        }, _react.default.createElement(_layout.default, null, renderSiderMenu(_objectSpread({
            menuData: menuData,
            handleMenuCollapse: handleMenuCollapse,
            isMobile: isMobile,
            theme: navTheme,
            collapsed: collapsed
        }, defaultProps)), _react.default.createElement(_layout.default, {
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
        }, defaultProps)), _react.default.createElement(Content, {
            className: _Layout2.default['ant-pro-basicLayout-content'],
            style: !fixedHeader ? {
                paddingTop: 0
            } : {}
        }, _react.default.createElement(_RouteContext.default.Provider, {
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
    location: (0, _utils.isBrowser)() ? window.location : undefined
};
var _default = BasicLayout;
exports.default = _default;
//# sourceMappingURL=Layout.js.map
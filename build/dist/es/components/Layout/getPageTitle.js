import pathToRegexp from 'path-to-regexp';
export var matchParamsPath = function matchParamsPath(pathname, breadcrumb) {
    if (breadcrumb) {
        var pathKey = Object.keys(breadcrumb).find(function (key) {
            return pathToRegexp(key).test(pathname);
        });
        if (pathKey) {
            return breadcrumb[pathKey];
        }
    }
    return {
        path: ''
    };
};
var getPageTitle = function getPageTitle(props) {
    var pathname = props.pathname, breadcrumb = props.breadcrumb, formatMessage = props.formatMessage, _props$title = props.title, title = _props$title === void 0 ? 'Ant Design Pro' : _props$title, _props$menu = props.menu, menu = _props$menu === void 0 ? {
        locale: false
    } : _props$menu;
    if (!pathname) {
        return title;
    }
    var currRouterData = matchParamsPath(pathname, breadcrumb);
    if (!currRouterData) {
        return title;
    }
    var pageName = currRouterData.name;
    if (menu.locale && currRouterData.locale) {
        pageName = formatMessage({
            id: currRouterData.locale || '',
            defaultMessage: currRouterData.name
        });
    }
    if (!pageName) {
        return title;
    }
    return "".concat(pageName, " - ").concat(title);
};
export default getPageTitle;
//# sourceMappingURL=getPageTitle.js.map
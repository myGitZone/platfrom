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
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one'; // Conversion router to menu.
function formatter(props) {
    var data = props.data, menu = props.menu, formatMessage = props.formatMessage, authority = props.authority, parentName = props.parentName;
    return data.filter(function (item) {
        return item && item.name && item.path;
    }).map(function () {
        var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            path: ''
        };
        if (!item.name) {
            return item;
        }
        var name = item.name;
        var locale = "".concat(parentName || 'menu', ".").concat(name); // if enableMenuLocale use item.name,
        // close menu international
        var localeName = menu.locale || !formatMessage ? name : formatMessage({
            id: locale,
            defaultMessage: name
        });
        var result = _objectSpread({}, item, {
            name: localeName,
            locale: locale,
            routes: null
        });
        if (item.routes) {
            var children = formatter(_objectSpread({}, props, {
                authority: item.authority || authority,
                data: item.routes,
                parentName: locale
            })); // Reduce memory usage
            result.children = children;
        }
        return result;
    });
}
var memoizeOneFormatter = memoizeOne(formatter, isEqual);
/**
 * filter menuData
 */
var defaultFilterMenuData = function defaultFilterMenuData() {
    var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return menuData.filter(function (item) {
        return item && item.name && !item.hideInMenu;
    }).map(function (item) {
        if (item.children && Array.isArray(item.children) && !item.hideChildrenInMenu && item.children.some(function (child) {
            return child && !!child.name;
        })) {
            var children = defaultFilterMenuData(item.children);
            if (children.length)
                return _objectSpread({}, item, {
                    children: children
                });
        }
        return _objectSpread({}, item, {
            children: undefined
        });
    }).filter(function (item) {
        return item;
    });
};
/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
var getBreadcrumbNameMap = function getBreadcrumbNameMap(menuData) {
    var routerMap = {};
    var flattenMenuData = function flattenMenuData(data) {
        data.forEach(function (menuItem) {
            if (!menuItem) {
                return;
            }
            if (menuItem && menuItem.children) {
                flattenMenuData(menuItem.children);
            } // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};
var memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);
export default (function (routes, menu, formatMessage, menuDataRender) {
    var originalMenuData = memoizeOneFormatter({
        data: routes,
        formatMessage: formatMessage,
        menu: menu || {
            locale: false
        }
    });
    if (menuDataRender) {
        originalMenuData = menuDataRender(originalMenuData);
    }
    var menuData = defaultFilterMenuData(originalMenuData);
    var breadcrumb = memoizeOneGetBreadcrumbNameMap(originalMenuData);
    return {
        breadcrumb: breadcrumb,
        menuData: menuData
    };
});
//# sourceMappingURL=getMenuData.js.map
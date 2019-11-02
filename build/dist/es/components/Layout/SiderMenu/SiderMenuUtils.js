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
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../utils/pathTools';
/**
 * 参数menuData 返回string数组
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export var getFlatMenuKeys = function getFlatMenuKeys() {
    var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var keys = []; // 遍历菜单
    menuData.forEach(function (item) {
        // 如果item为空，则直接返回
        if (!item) {
            return;
        }
        keys.push(item.path); // 如果有children则进行递归
        if (item.children) {
            keys = keys.concat(getFlatMenuKeys(item.children));
        }
    });
    return keys;
};
export var getMenuMatches = function getMenuMatches() {
    var flatMenuKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var path = arguments.length > 1 ? arguments[1] : undefined;
    return flatMenuKeys.filter(function (item) {
        return item && pathToRegexp(item).test(path);
    });
};
/**
 * 获得菜单子节点
 */
export var getDefaultCollapsedSubMenus = function getDefaultCollapsedSubMenus(props) {
    var _props$location = props.location, location = _props$location === void 0 ? {
        pathname: '/'
    } : _props$location, flatMenuKeys = props.flatMenuKeys; // urlToList转成数组/userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
    // 然后通过map遍历，获取path
    // filter进行除去false的项
    // reduce进行数组合并。
    return urlToList(location.pathname).map(function (item) {
        return getMenuMatches(flatMenuKeys, item)[0];
    }).filter(function (item) {
        return item;
    }).reduce(function (acc, curr) {
        return [].concat(_toConsumableArray(acc), [curr]);
    }, ['/']);
};
//# sourceMappingURL=SiderMenuUtils.js.map
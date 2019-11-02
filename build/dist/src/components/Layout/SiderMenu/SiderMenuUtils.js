import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../utils/pathTools';
/**
 * 参数menuData 返回string数组
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData = []) => {
    let keys = [];
    // 遍历菜单
    menuData.forEach(item => {
        // 如果item为空，则直接返回
        if (!item) {
            return;
        }
        keys.push(item.path);
        // 如果有children则进行递归
        if (item.children) {
            keys = keys.concat(getFlatMenuKeys(item.children));
        }
    });
    return keys;
};
export const getMenuMatches = (flatMenuKeys = [], path) => flatMenuKeys.filter(item => item && pathToRegexp(item).test(path));
/**
 * 获得菜单子节点
 */
export const getDefaultCollapsedSubMenus = (props) => {
    const { location = { pathname: '/' }, flatMenuKeys } = props;
    // urlToList转成数组/userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
    // 然后通过map遍历，获取path
    // filter进行除去false的项
    // reduce进行数组合并。
    return urlToList(location.pathname)
        .map(item => getMenuMatches(flatMenuKeys, item)[0])
        .filter(item => item)
        .reduce((acc, curr) => [...acc, curr], ['/']);
};
//# sourceMappingURL=SiderMenuUtils.js.map
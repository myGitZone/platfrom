import { Icon, Menu } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '../utils/utils';
import { urlToList } from '../utils/pathTools';
// @ts-ignore
import styles from './index.less';
const { SubMenu } = Menu;
let IconFont = Icon.createFromIconfontCN({
    scriptUrl: '',
});
// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon) => {
    if (typeof icon === 'string') {
        // 如果是url，说明是网络图片，用img
        if (isUrl(icon) || icon.startsWith('/')) {
            return (React.createElement(Icon, { component: () => (React.createElement("img", { src: icon, alt: "icon", className: "ant-pro-sider-menu-icon" })) }));
        }
        // 如果是icon-开头，用IconFont进行加载
        if (icon.startsWith('icon-')) {
            return React.createElement(IconFont, { type: icon });
        }
        // 直接用Icon组件
        return React.createElement(Icon, { type: icon });
    }
    return icon;
};
export default class BaseMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        /**
         * 获得菜单子节点
         */
        this.getNavMenuItems = (menusData = []) => 
        // filter是过滤掉有name属性并且不是隐藏的
        // map是获取子menu
        menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => this.getSubMenuOrItem(item))
            .filter(item => item);
        // Get the currently selected menu
        this.getSelectedMenuKeys = (pathname) => {
            const { flatMenuKeys } = this.props;
            return urlToList(pathname)
                .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
                .filter(item => item);
        };
        /**
         * get SubMenu or Item
         */
        this.getSubMenuOrItem = (item) => {
            // 如果有children，并且子菜单不隐藏，并且children是有name的菜单
            if (Array.isArray(item.children) &&
                !item.hideChildrenInMenu &&
                item.children.some(child => child && !!child.name)) {
                // 名字做国际化
                const name = this.getIntlName(item);
                return (React.createElement(SubMenu, { title: item.icon ? (React.createElement("span", null,
                        getIcon(item.icon),
                        React.createElement("span", null, name))) : (name), key: item.path }, this.getNavMenuItems(item.children)));
            }
            return React.createElement(Menu.Item, { key: item.path }, this.getMenuItemPath(item));
        };
        this.getIntlName = (item) => {
            const { name, locale } = item;
            const { menu = {
                locale: false,
            }, formatMessage, } = this.props;
            if (locale && menu.locale && formatMessage) {
                return formatMessage({
                    id: locale,
                    defaultMessage: name,
                });
            }
            return name;
        };
        /**
         * 判断是否是http链接.返回 Link 或 a
         * Judge whether it is http link.return a or Link
         * @memberof SiderMenu
         */
        this.getMenuItemPath = (item) => {
            const itemPath = this.conversionPath(item.path);
            const icon = getIcon(item.icon);
            const { location = { pathname: '/' }, isMobile, onCollapse, menuItemRender, } = this.props;
            const { target } = item;
            // if local is true formatMessage all name。
            const name = this.getIntlName(item);
            let defaultItem = (React.createElement(React.Fragment, null,
                icon,
                React.createElement("span", null, name)));
            const isHttpUrl = isUrl(itemPath);
            // Is it a http link
            if (isHttpUrl) {
                defaultItem = (React.createElement("a", { href: itemPath, target: target },
                    icon,
                    React.createElement("span", null, name)));
            }
            if (menuItemRender) {
                return menuItemRender({
                    ...item,
                    isUrl: isHttpUrl,
                    itemPath,
                    isMobile,
                    replace: itemPath === location.pathname,
                    onClick: () => onCollapse && onCollapse(true),
                }, defaultItem);
            }
            return defaultItem;
        };
        this.conversionPath = (path) => {
            if (path && path.indexOf('http') === 0) {
                return path;
            }
            return `/${path || ''}`.replace(/\/+/g, '/');
        };
        this.getPopupContainer = (fixedHeader, layout) => {
            if (fixedHeader && layout === 'topmenu' && this.warp) {
                return this.warp;
            }
            return document.body;
        };
        this.getRef = (ref) => {
            this.warp = ref;
        };
        const { iconfontUrl } = props;
        // reset IconFont
        if (iconfontUrl) {
            IconFont = Icon.createFromIconfontCN({
                scriptUrl: iconfontUrl,
            });
        }
    }
    static getDerivedStateFromProps(props) {
        const { iconfontUrl } = props;
        // reset IconFont
        if (iconfontUrl) {
            IconFont = Icon.createFromIconfontCN({
                scriptUrl: iconfontUrl,
            });
        }
        return null;
    }
    render() {
        const { openKeys, theme, mode, location = {
            pathname: '/',
        }, className, collapsed, handleOpenChange, style, 
        // fixedHeader = false,
        layout = 'sidemenu', menuData, } = this.props;
        // 根据pathanme获取选中的菜单
        let selectedKeys = this.getSelectedMenuKeys(location.pathname);
        // 如果没有选中的节点，则获取展开的最后一个
        if (!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        let props = {};
        // 如果有openKeys，并且是没有关闭的状态，并且是左侧菜单，则将openkeys赋值给Menu
        if (openKeys && !collapsed && layout === 'sidemenu') {
            props = {
                openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
            };
        }
        const cls = classNames(className, {
            [styles['top-nav-menu']]: mode === 'horizontal',
        });
        return (React.createElement(React.Fragment, null,
            React.createElement(Menu, Object.assign({}, props, { key: "Menu", mode: mode, theme: theme, onOpenChange: handleOpenChange, selectedKeys: selectedKeys, style: style, className: cls }), this.getNavMenuItems(menuData)),
            React.createElement("div", { ref: this.getRef })));
    }
}
BaseMenu.defaultProps = {
    flatMenuKeys: [],
    onCollapse: () => undefined,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => undefined,
    menuData: [],
    onOpenChange: () => undefined,
};
//# sourceMappingURL=BaseMenu.js.map
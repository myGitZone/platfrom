import React, { useState } from 'react';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import { Layout } from 'antd';
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
import { isBrowser } from './utils/utils';
// @ts-ignore
import styles from './Layout.less';
const { Content } = Layout;
const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};
const headerRender = (props) => {
    // 如果header是不需要的，则返回null
    if (props.headerRender === false) {
        return null;
    }
    return React.createElement(Header, Object.assign({}, props));
};
const footerRender = (props) => {
    if (props.footerRender === false) {
        return null;
    }
    if (props.footerRender) {
        return props.footerRender({ ...props }, React.createElement(Footer, null));
    }
    return React.createElement(Footer, null);
};
// 参数props: BasicLayoutProps  返回值 React.ReactNode
const renderSiderMenu = (props) => {
    // layout 菜单布局  isMobile  是否是移动端打开   menuRender 自定义菜单的展示
    const { layout, isMobile, menuRender } = props;
    // 如果menuRender是false，则表示不进行菜单渲染
    if (menuRender === false) {
        return null;
    }
    // 如果是头部菜单并且不是手机端打开的话，则不进行渲染
    if (layout === 'topmenu' && !isMobile) {
        return null;
    }
    if (menuRender) {
        // 传入参数，和默认的渲染组件，返回函数修改后的组件，通过menuRender进行判断是展示默认的还是需要进行修改
        return menuRender(props, React.createElement(SiderMenu, Object.assign({}, props)));
    }
    return React.createElement(SiderMenu, Object.assign({}, props));
};
const defaultPageTitleRender = (pageProps, props) => {
    const { pageTitleRender } = props;
    if (pageTitleRender === false) {
        return props.title || '';
    }
    if (pageTitleRender) {
        const title = pageTitleRender(pageProps);
        if (typeof title === 'string') {
            return title;
        }
        console.warn('pro-layout: renderPageTitle return value should be a string');
    }
    return defaultGetPageTitle(pageProps);
};
function useCollapsed(collapsed, onCollapse) {
    const [nativeCollapsed, setCollapsed] = useState(false);
    if (collapsed !== undefined && onCollapse) {
        return [collapsed, onCollapse];
    }
    return [nativeCollapsed, setCollapsed];
}
const getPaddingLeft = (hasLeftPadding, collapsed, siderWidth) => {
    if (hasLeftPadding) {
        return collapsed ? 80 : siderWidth;
    }
    return undefined;
};
const BasicLayout = props => {
    const { children, onCollapse, location = { pathname: '/' }, fixedHeader, fixSiderbar, navTheme = 'dark', layout: PropsLayout, route = {
        routes: [],
    }, siderWidth = 256, menu, showHeader = true, menuDataRender, } = props;
    const formatMessage = ({ id, defaultMessage, ...rest }) => {
        if (props.formatMessage) {
            return props.formatMessage({
                id,
                defaultMessage,
                ...rest,
            });
        }
        const locales = getLocales();
        if (locales[id]) {
            return locales[id];
        }
        if (defaultMessage) {
            return defaultMessage;
        }
        return id;
    };
    const { routes = [] } = route;
    const { breadcrumb, menuData } = getMenuData(routes, menu, formatMessage, menuDataRender);
    /**
     * init variables
     */
    const isMobile = useMedia({
        id: 'BasicLayout',
        query: '(max-width: 599px)',
    })[0];
    // If it is a fix menu, calculate padding
    // don't need padding in phone mode
    const hasLeftPadding = fixSiderbar && PropsLayout !== 'topmenu' && !isMobile;
    // whether to close the menu
    const [collapsed, handleMenuCollapse] = useCollapsed(props.collapsed, onCollapse);
    // Splicing parameters, adding menuData and formatMessage in props
    const defaultProps = {
        ...props,
        formatMessage,
        breadcrumb,
    };
    // gen page title
    const pageTitle = defaultPageTitleRender({
        pathname: location.pathname,
        ...defaultProps,
    }, props);
    // gen breadcrumbProps, parameter for pageHeader
    const breadcrumbProps = getBreadcrumbProps({
        ...props,
        breadcrumb,
    });
    return (React.createElement(DocumentTitle, { title: pageTitle },
        React.createElement(ContainerQuery, { query: query }, params => (React.createElement("div", { className: classNames(params, styles['ant-design-pro'], styles.basicLayout) },
            React.createElement(Layout, null,
                renderSiderMenu({
                    menuData,
                    handleMenuCollapse,
                    isMobile,
                    theme: navTheme,
                    collapsed,
                    ...defaultProps,
                }),
                React.createElement(Layout, { style: {
                        paddingLeft: getPaddingLeft(!!hasLeftPadding, collapsed, siderWidth),
                        minHeight: '100vh',
                        borderLeft: '4px solid #000',
                        position: 'relative',
                    } },
                    showHeader && headerRender({
                        menuData,
                        handleMenuCollapse,
                        isMobile,
                        collapsed,
                        ...defaultProps,
                    }),
                    React.createElement(Content, { className: styles['ant-pro-basicLayout-content'], style: !fixedHeader ? { paddingTop: 0 } : {} },
                        React.createElement(RouteContext.Provider, { value: {
                                breadcrumb: breadcrumbProps,
                                ...props,
                                menuData,
                                isMobile,
                                collapsed,
                                title: pageTitle.split('-')[0].trim(),
                            } }, children)),
                    footerRender({
                        isMobile,
                        collapsed,
                        ...defaultProps,
                    }))))))));
};
BasicLayout.defaultProps = {
    logo: '',
    location: isBrowser() ? window.location : undefined,
};
export default BasicLayout;
//# sourceMappingURL=Layout.js.map
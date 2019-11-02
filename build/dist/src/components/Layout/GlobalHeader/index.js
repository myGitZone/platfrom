import React, { Component } from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import debounce from 'lodash/debounce';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { isBrowser } from '../utils/utils';
// @ts-ignore
import styles from './index.less';
const defaultRenderCollapsedButton = (collapsed) => (React.createElement(Icon, { type: collapsed ? 'menu-unfold' : 'menu-fold' }));
export default class GlobalHeader extends Component {
    constructor() {
        super(...arguments);
        this.triggerResizeEvent = debounce(() => {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('resize', true, false);
            if (isBrowser()) {
                window.dispatchEvent(event);
            }
        });
        this.toggle = () => {
            const { collapsed, onCollapse } = this.props;
            if (onCollapse)
                onCollapse(!collapsed);
            this.triggerResizeEvent();
        };
        this.renderCollapsedButton = () => {
            const { collapsed, collapsedButtonRender = defaultRenderCollapsedButton, menuRender, } = this.props;
            if (collapsedButtonRender !== false && menuRender !== false) {
                return (React.createElement("span", { className: styles['ant-pro-global-header-trigger'], onClick: this.toggle }, collapsedButtonRender(collapsed)));
            }
            return null;
        };
    }
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    render() {
        const { sysList = [], selectSysKey, onSysChange } = this.props;
        const systemItem = sysList.find(item => item.key === selectSysKey) || { name: '', key: '' };
        const menu = (React.createElement(Menu, { className: styles.sysmenu, selectedKeys: [systemItem.key], onClick: onSysChange }, sysList.map((item) => React.createElement(Menu.Item, { key: item.key }, item.name))));
        const { isMobile, logo, rightContentRender } = this.props;
        return (React.createElement("div", { className: styles['ant-pro-global-header'] },
            sysList.length > 0 ? (React.createElement(Dropdown, { className: styles.selectsys, trigger: ['click'], overlay: menu },
                React.createElement("div", null,
                    systemItem.name,
                    React.createElement(Icon, { style: { marginLeft: '10px' }, type: "caret-right" })))) : null,
            isMobile && (React.createElement("a", { className: styles['ant-pro-global-header-logo'], key: "logo" }, defaultRenderLogo(logo))),
            rightContentRender && rightContentRender(this.props)));
    }
}
//# sourceMappingURL=index.js.map
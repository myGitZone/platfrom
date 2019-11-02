import React, { Component } from 'react';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import { isBrowser } from '../utils/utils';
// @ts-ignore
import styles from './index.less';
export default class TopNavHeader extends Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.maim = null;
    }
    static getDerivedStateFromProps(props) {
        const { contentWidth } = props;
        const innerWidth = isBrowser() ? window.innerWidth : 0;
        return {
            maxWidth: (contentWidth === 'Fixed' && innerWidth > 1200 ? 1200 : innerWidth) -
                280 -
                120,
        };
    }
    render() {
        const { theme, menuData, logo, title, contentWidth, rightContentRender, } = this.props;
        const { maxWidth } = this.state;
        const flatMenuKeys = getFlatMenuKeys(menuData);
        const baseClassName = styles['ant-pro-top-nav-header'];
        return (React.createElement("div", { className: `${baseClassName} ${theme === 'light' ? 'light' : ''}` },
            React.createElement("div", { ref: ref => {
                    this.maim = ref;
                }, className: `${baseClassName}-main ${contentWidth === 'Fixed' ? 'wide' : ''}` },
                React.createElement("div", { className: `${baseClassName}-left` },
                    React.createElement("div", { className: `${baseClassName}-logo`, key: "logo", id: "logo" },
                        React.createElement("a", null,
                            defaultRenderLogo(logo),
                            React.createElement("h1", null, title)))),
                React.createElement("div", { style: { maxWidth, flex: 1 }, className: `${baseClassName}-menu` },
                    React.createElement(BaseMenu, Object.assign({}, this.props, { flatMenuKeys: flatMenuKeys }))),
                rightContentRender &&
                    rightContentRender({
                        ...this.props,
                    }))));
    }
}
//# sourceMappingURL=index.js.map
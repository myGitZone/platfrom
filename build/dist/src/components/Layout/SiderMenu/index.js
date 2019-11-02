import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';
// @ts-ignore
import styles from './index.less';
const SiderMenuWrapper = props => {
    // menuData 菜单数据
    const { isMobile, menuData, collapsed, onCollapse } = props;
    // 将菜单展开，将树状的结构展开成一维数组
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return isMobile ? (React.createElement(Drawer, { visible: !collapsed, placement: "left", className: styles['ant-pro-sider-menu'], onClose: () => onCollapse && onCollapse(true), style: {
            padding: 0,
            height: '100vh',
        } },
        React.createElement(SiderMenu, Object.assign({}, props, { flatMenuKeys: flatMenuKeys, collapsed: isMobile ? false : collapsed })))) : (React.createElement(SiderMenu, Object.assign({ className: styles['ant-pro-sider-menu'] }, props, { flatMenuKeys: flatMenuKeys })));
};
SiderMenuWrapper.defaultProps = {
    onCollapse: () => undefined,
};
export default SiderMenuWrapper;
//# sourceMappingURL=index.js.map
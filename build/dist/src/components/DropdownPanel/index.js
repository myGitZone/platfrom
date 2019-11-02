import React from 'react';
import { Menu } from 'antd';
// @ts-ignore
import styles from './index.less';
const DropdownPanel = props => {
    return (React.createElement(Menu, { className: styles.sysmenu, selectedKeys: ['1'] },
        React.createElement(Menu.Item, { key: "1" }, "\u5C71\u4E1C\u653F\u52A1\u5927\u6570\u636E\u4E2D\u5FC3"),
        React.createElement(Menu.Item, { key: "2" }, "\u5929\u6D25\u5927\u6E2F\u653F\u52A1\u6570\u636E\u4E2D\u5FC3"),
        React.createElement(Menu.Item, { key: "3" }, "\u5C71\u4E1C\u62DB\u8FDC")));
};
export default DropdownPanel;
//# sourceMappingURL=index.js.map
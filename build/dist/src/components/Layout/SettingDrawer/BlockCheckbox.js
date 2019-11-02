import { Icon, Tooltip } from 'antd';
import React from 'react';
// @ts-ignore
import styles from './index.less';
const baseClassName = styles['ant-pro-setting-drawer-block-checbox'];
const BlockCheckbox = ({ value, onChange, list, }) => (React.createElement("div", { className: baseClassName, key: value }, list.map(item => (React.createElement(Tooltip, { title: item.title, key: item.key },
    React.createElement("div", { className: `${baseClassName}-item`, onClick: () => onChange(item.key) },
        React.createElement("img", { src: item.url, alt: item.key }),
        React.createElement("div", { className: `${baseClassName}-selectIcon`, style: {
                display: value === item.key ? 'block' : 'none',
            } },
            React.createElement(Icon, { type: "check" }))))))));
export default BlockCheckbox;
//# sourceMappingURL=BlockCheckbox.js.map
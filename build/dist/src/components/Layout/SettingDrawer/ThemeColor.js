import './ThemeColor.less';
import { Icon, Tooltip } from 'antd';
import React from 'react';
const Tag = ({ color, check, ...rest }) => (React.createElement("div", Object.assign({}, rest, { style: { backgroundColor: color } }), check ? React.createElement(Icon, { type: "check" }) : ''));
const ThemeColor = ({ colors, title, value, onChange, formatMessage, }) => {
    const colorList = colors || [
        {
            key: 'dust',
            color: '#F5222D',
        },
        {
            key: 'volcano',
            color: '#FA541C',
        },
        {
            key: 'sunset',
            color: '#FAAD14',
        },
        {
            key: 'cyan',
            color: '#13C2C2',
        },
        {
            key: 'green',
            color: '#52C41A',
        },
        {
            key: 'daybreak',
            color: '#1890FF',
        },
        {
            key: 'geekblue',
            color: '#2F54EB',
        },
        {
            key: 'purple',
            color: '#722ED1',
        },
    ];
    return (React.createElement("div", { className: "theme-color" },
        React.createElement("h3", { className: "theme-color-title" }, title),
        React.createElement("div", { className: "theme-color-content" }, colorList.map(({ key, color }) => (React.createElement(Tooltip, { key: color, title: formatMessage({ id: `app.setting.themecolor.${key}` }) },
            React.createElement(Tag, { className: "theme-color-block", color: color, check: value === color, onClick: () => onChange && onChange(color) })))))));
};
export default ThemeColor;
//# sourceMappingURL=ThemeColor.js.map
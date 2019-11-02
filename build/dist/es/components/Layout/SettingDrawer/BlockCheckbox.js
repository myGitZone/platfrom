import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import React from 'react'; // @ts-ignore
import styles from './index.less';
var baseClassName = styles['ant-pro-setting-drawer-block-checbox'];
var BlockCheckbox = function BlockCheckbox(_ref) {
    var value = _ref.value, onChange = _ref.onChange, list = _ref.list;
    return React.createElement("div", {
        className: baseClassName,
        key: value
    }, list.map(function (item) {
        return React.createElement(_Tooltip, {
            title: item.title,
            key: item.key
        }, React.createElement("div", {
            className: "".concat(baseClassName, "-item"),
            onClick: function onClick() {
                return onChange(item.key);
            }
        }, React.createElement("img", {
            src: item.url,
            alt: item.key
        }), React.createElement("div", {
            className: "".concat(baseClassName, "-selectIcon"),
            style: {
                display: value === item.key ? 'block' : 'none'
            }
        }, React.createElement(_Icon, {
            type: "check"
        }))));
    }));
};
export default BlockCheckbox;
//# sourceMappingURL=BlockCheckbox.js.map
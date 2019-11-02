import React, { useState } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import Trigger from '@/components/Trigger';
import Layout, { SettingDrawer, } from '@/components/Layout';
// import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '@/assets/logo.png';
import openLogo from '@/assets/logo-open.png';
import sysNormal from '@/assets/system-normal.png';
import sysHover from '@/assets/system-hover.png';
const BasicLayout = props => {
    const [collapsed, handleMenuCollapse] = useState(true);
    const [selectSysKey, handleSysKeyChange] = useState('1');
    const pluginArr = [];
    const initTop = 200;
    for (let i = 0; i < 4; i += 1) {
        pluginArr.push({
            icon: '',
            children: React.createElement("div", null, "ddd"),
            top: `${initTop + (i * 60)}px`,
        });
    }
    const [plugins, setPlugins] = useState(pluginArr);
    return (React.createElement(React.Fragment, null,
        React.createElement(Layout, Object.assign({ logo: collapsed ? logo : openLogo, collapsed: collapsed, showHeader: false, trigger: React.createElement(Trigger, { onCollapsed: handleMenuCollapse, collapsed: collapsed }), 
            // onCollapse={handleMenuCollapse}
            menuItemRender: (menuItemProps, defaultDom) => 
            // 判断是否为url，如果是url则直接返回fefaultDom
            // 如果不是，则通过link进行控制路由
            (menuItemProps.isUrl ? (defaultDom) : (React.createElement(Link, { to: menuItemProps.path }, defaultDom))), rightContentRender: rightProps => (null), renderSysChange: () => (React.createElement("div", null,
                !collapsed ? React.createElement("span", null, "\u6307\u6807\u5B57\u5178") : null,
                React.createElement("img", { src: collapsed ? sysNormal : sysHover, alt: "" }))), sysList: [
                {
                    name: '山东大数据',
                    key: '1',
                },
                {
                    name: '山东大数据1',
                    key: '2',
                },
            ], selectSysKey: selectSysKey, onSysChange: data => { handleSysKeyChange(data.key); }, siderWidth: 156, systemname: "\u6307\u6807\u5B57\u5178" }, props, props.settings, { footerRender: false }), props.children),
        React.createElement(SettingDrawer, { plugins: plugins })));
};
export default connect(({ settings }) => ({
    settings,
}))(BasicLayout);
//# sourceMappingURL=BasicLayout.js.map
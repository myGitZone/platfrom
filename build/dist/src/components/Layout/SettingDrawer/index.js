import { Drawer, Icon, } from 'antd';
import React, { Component } from 'react';
// @ts-ignore
import styles from './index.less';
class SettingDrawer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            collapse: false,
            currentCollapseIndex: 0,
        };
        this.togglerContent = (index) => {
            const { collapse, currentCollapseIndex } = this.state;
            const { onCollapseChange } = this.props;
            if (onCollapseChange) {
                onCollapseChange(!collapse);
                return;
            }
            if (currentCollapseIndex !== index) {
                this.setState({
                    currentCollapseIndex: index,
                });
            }
            else {
                this.setState({ collapse: !collapse });
            }
        };
    }
    static getDerivedStateFromProps(props, state) {
        if ('collapse' in props) {
            return {
                collapse: !!props.collapse,
                currentCollapseIndex: state.currentCollapseIndex,
            };
        }
        return null;
    }
    render() {
        const { getContainer, children, plugins } = this.props;
        const { collapse, currentCollapseIndex } = this.state;
        return (React.createElement(Drawer, { visible: collapse, width: 300, closable: false, placement: "right", mask: false, getContainer: getContainer, handler: React.createElement(React.Fragment, null, plugins.map((item, index) => (React.createElement("div", { className: styles['ant-pro-setting-drawer-handle'], onClick: () => { this.togglerContent(index); }, style: { top: `${200 + (index * 50)}px` } },
                React.createElement(Icon, { type: collapse && currentCollapseIndex === index ? 'close' : 'setting', style: {
                        color: '#fff',
                        fontSize: 20,
                    } }))))), style: {
                zIndex: 999,
            } }, children));
    }
}
export default SettingDrawer;
//# sourceMappingURL=index.js.map
import React, { Component } from 'react';
import { Layout } from 'antd';
import GlobalHeader from './GlobalHeader';
import TopNavHeader from './TopNavHeader';
// @ts-ignore
import styles from './Header.less';
const { Header } = Layout;
class HeaderView extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: true,
        };
        this.ticking = false;
        this.oldScrollTop = 0;
        this.getHeadWidth = () => {
            const { isMobile, collapsed, fixedHeader, layout, siderWidth = 256, } = this.props;
            if (isMobile || !fixedHeader || layout === 'topmenu') {
                return '100%';
            }
            return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
        };
        // 配置中，下滑隐藏头部
        this.handScroll = () => {
            // 自动隐藏头部
            const { autoHideHeader } = this.props;
            // 获取是否可见的state
            const { visible } = this.state;
            // 如果不是自动隐藏，则直接return
            if (!autoHideHeader) {
                return;
            }
            // 获取滚动的距离
            const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
            if (!this.ticking) {
                // flag 标记是否在进行动画
                this.ticking = true;
                requestAnimationFrame(() => {
                    // 如果向上则显示
                    if (this.oldScrollTop > scrollTop) {
                        this.setState({
                            visible: true,
                        });
                    }
                    else if (scrollTop > 300 && visible) {
                        // 如果滚动超过300，并且当前是可见，则隐藏
                        this.setState({
                            visible: false,
                        });
                    }
                    else if (scrollTop < 300 && !visible) {
                        // 如果滚动小于300，并且当前是隐藏，则可见
                        this.setState({
                            visible: true,
                        });
                    }
                    this.oldScrollTop = scrollTop;
                    this.ticking = false;
                });
            }
        };
        this.renderContent = () => {
            const { isMobile, handleMenuCollapse, navTheme, layout, headerRender, } = this.props;
            const isTop = layout === 'topmenu';
            let defaultDom = (React.createElement(GlobalHeader, Object.assign({ onCollapse: handleMenuCollapse }, this.props)));
            if (isTop && !isMobile) {
                defaultDom = (React.createElement(TopNavHeader, Object.assign({ theme: navTheme, mode: "horizontal", onCollapse: handleMenuCollapse }, this.props)));
            }
            if (headerRender) {
                return headerRender(this.props);
            }
            return defaultDom;
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (!props.autoHideHeader && !state.visible) {
            return {
                visible: true,
            };
        }
        return null;
    }
    componentDidMount() {
        document.addEventListener('scroll', this.handScroll, { passive: true });
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handScroll);
    }
    render() {
        const { fixedHeader } = this.props;
        const { visible } = this.state;
        const width = this.getHeadWidth();
        return visible ? (React.createElement(Header, { style: { padding: 0, width, zIndex: 2, height: '50px' }, className: fixedHeader ? styles['ant-pro-fixed-header'] : '' }, this.renderContent())) : null;
    }
}
export default HeaderView;
//# sourceMappingURL=Header.js.map
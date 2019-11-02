import React, { Component } from 'react';

import { Layout } from 'antd';
import { BasicLayoutProps } from './Layout';
import GlobalHeader, { GlobalHeaderProps } from './GlobalHeader';
import { Settings } from './defaultSettings';
import TopNavHeader from './TopNavHeader';
import { WithFalse } from './typings';
// @ts-ignore
import styles from './Header.less';

const { Header } = Layout;

export interface HeaderViewProps extends Partial<Settings>, GlobalHeaderProps {
  isMobile?: boolean;
  collapsed?: boolean;
  logo?: React.ReactNode;
  autoHideHeader?: boolean;
  menuRender?: BasicLayoutProps['menuRender'];
  headerRender?: BasicLayoutProps['headerRender'];
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  handleMenuCollapse?: (collapse: boolean) => void;
  siderWidth?: number;
}

interface HeaderViewState {
  visible: boolean;
}

class HeaderView extends Component<HeaderViewProps, HeaderViewState> {
  static getDerivedStateFromProps(
    props: HeaderViewProps,
    state: HeaderViewState,
  ): HeaderViewState | null {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  state = {
    visible: true,
  };

  ticking: boolean = false;

  oldScrollTop: number = 0;

  componentDidMount(): void {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount(): void {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const {
      isMobile,
      collapsed,
      fixedHeader,
      layout,
      siderWidth = 256,
    } = this.props;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
  };

  // 配置中，下滑隐藏头部
  handScroll = () => {
    // 自动隐藏头部
    const { autoHideHeader } = this.props;
    // 获取是否可见的state
    const { visible } = this.state;
    // 如果不是自动隐藏，则直接return
    if (!autoHideHeader) {
      return;
    }
    // 获取滚动的距离
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      // flag 标记是否在进行动画
      this.ticking = true;
      requestAnimationFrame(() => {
        // 如果向上则显示
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          // 如果滚动超过300，并且当前是可见，则隐藏
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
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

  renderContent = () => {
    const {
      isMobile,
      handleMenuCollapse,
      navTheme,
      layout,
      headerRender,
    } = this.props;
    const isTop = layout === 'topmenu';
    let defaultDom = (
      <GlobalHeader onCollapse={handleMenuCollapse} {...this.props} />
    );
    if (isTop && !isMobile) {
      defaultDom = (
        <TopNavHeader
          theme={navTheme}
          mode="horizontal"
          onCollapse={handleMenuCollapse}
          {...this.props}
        />
      );
    }
    if (headerRender) {
      return headerRender(this.props);
    }
    return defaultDom;
  };

  render(): React.ReactNode {
    const { fixedHeader } = this.props;
    const { visible } = this.state;
    const width = this.getHeadWidth();
    return visible ? (
      <Header
        style={{ padding: 0, width, zIndex: 2, height: '50px' }}
        className={fixedHeader ? styles['ant-pro-fixed-header'] : ''}
      >
        {this.renderContent()}
      </Header>
    ) : null;
  }
}

export default HeaderView;

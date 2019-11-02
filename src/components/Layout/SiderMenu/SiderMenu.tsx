import React, { Component } from 'react';

import { Layout } from 'antd';
import classNames from 'classnames';
import BaseMenu, { BaseMenuProps } from './BaseMenu';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

// @ts-ignore
import styles from './index.less';

const { Sider } = Layout;

// 是否第一次加载
let firstMount = true;

export const defaultRenderLogo = (logo: React.ReactNode, collapsed?: boolean): React.ReactNode => {
  if (!logo) {
    return '';
  }
  // 如果是字符串则直接用img进行展示
  if (typeof logo === 'string') {
    return <img className={collapsed ? styles['img-collapsed'] : styles.img} src={logo} alt="logo" />;
  }
  // 如果是一个函数，则返回函数的返回的值，值为React.ReactNode
  if (typeof logo === 'function') {
    return logo();
  }
  return logo;
};

export interface SiderMenuProps
  extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>> {
  logo?: React.ReactNode;
  siderWidth?: number;
  trigger?: React.ReactNode;
  renderSysChange?: ()=>{}
}

interface SiderMenuState {
  pathname?: string;
  openKeys?: string[];
  flatMenuKeysLen?: number;
}

export default class SiderMenu extends Component<
  SiderMenuProps,
  SiderMenuState
> {
  static defaultProps: Partial<SiderMenuProps> = {
    flatMenuKeys: [],
    onCollapse: () => undefined,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    handleOpenChange: () => undefined,
    menuData: [],
    onOpenChange: () => undefined,
  };

  static getDerivedStateFromProps(
    props: SiderMenuProps,
    state: SiderMenuState,
  ): SiderMenuState | null {
    const { pathname, flatMenuKeysLen } = state;
    const { location = { pathname: '/' }, flatMenuKeys = [] } = props;
    if (
      location.pathname !== pathname ||
      flatMenuKeys.length !== flatMenuKeysLen
    ) {
      return {
        pathname: location.pathname,
        flatMenuKeysLen: flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props), // 获取展开的节点
      };
    }
    return null;
  }

  constructor(props: SiderMenuProps) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount(): void {
    // 修改第一次加载为false，
    firstMount = false;
  }

  // 判断是否为第一级菜单
  isMainMenu: (key: string) => boolean = key => {
    const { menuData = [] } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  // (openKeys: string[]) => void 表示handleOpenChange的类型是一个函数，接收openKeys的数组，并且没有返回值
  handleOpenChange: (openKeys: string[]) => void = openKeys => {
    // 判断展开的第一级节点是不是有多个
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    if (moreThanOne) {
      // 如果有多个展开的第一级节点，则取最新的一个，这里控制菜单只是展开一个
      this.setState({
        openKeys: [openKeys.pop()].filter(item => item) as string[],
      });
    } else {
      this.setState({ openKeys: [...openKeys] });
    }
  };

  render(): React.ReactNode {
    const {
      logo,
      collapsed,
      title,
      fixSiderbar,
      onCollapse,
      theme,
      siderWidth = 256,
      isMobile,
      layout,
      trigger = null,
      renderSysChange,
    } = this.props;
    const { openKeys } = this.state;
    // 如果左侧silder是展开状态，或者菜单不是在左侧，而是在头部，则默认的不展开任何节点，因为这时候是鼠标移入展示的。不需要展开
    const defaultProps = collapsed || layout !== 'sidemenu' ? {} : { openKeys };
    const siderClassName = classNames(styles['ant-pro-sider-menu-sider'], {
      [styles['fix-sider-bar']]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    return (
      <Sider
        collapsible
        trigger={trigger}
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={(collapse, type) => {
          // 如果是第一次加载或者不是手机端，则可以进行收缩
          if (firstMount || !isMobile) {
            if (onCollapse) {
              onCollapse(collapse);
            }
          }
        }}
        width={siderWidth}
        theme={theme}
        className={siderClassName}
      >
        <div className={styles['ant-pro-sider-menu-logo']} id="logo">
          <a>
            {defaultRenderLogo(logo, collapsed as boolean)}
            {
              collapsed ? null : <h1>{title}</h1>
            }
          </a>
        </div>
        <div className={styles.sys}>
          {
            renderSysChange && renderSysChange()
          }
        </div>
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ width: '100%', background: 'transparent' }}
          {...defaultProps}
        />
      </Sider>
    );
  }
}

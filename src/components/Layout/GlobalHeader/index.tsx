import React, { Component } from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import debounce from 'lodash/debounce';
import { HeaderViewProps } from '../Header';
import { defaultRenderLogo } from '../SiderMenu/SiderMenu';
import { isBrowser } from '../utils/utils';
import { WithFalse } from '../typings';

// @ts-ignore
import styles from './index.less';

interface SysItem {name: string, key: string}
interface SelectItem {
  key: string
}
interface Fn {
  (data:SelectItem):void
}
export interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: HeaderViewProps['menuRender'];
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  rightContentRender?: HeaderViewProps['rightContentRender'];
  sysList?: SysItem[];
  selectSysKey?: string;
  onSysChange?: Fn
}

const defaultRenderCollapsedButton = (collapsed?: boolean) => (
  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
);

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    if (isBrowser()) {
      window.dispatchEvent(event);
    }
  });

  componentWillUnmount(): void {
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  renderCollapsedButton = () => {
    const {
      collapsed,
      collapsedButtonRender = defaultRenderCollapsedButton,
      menuRender,
    } = this.props;

    if (collapsedButtonRender !== false && menuRender !== false) {
      return (
        <span className={styles['ant-pro-global-header-trigger']} onClick={this.toggle}>
          {collapsedButtonRender(collapsed)}
        </span>
      );
    }

    return null;
  };

  render(): React.ReactNode {
    const { sysList = [], selectSysKey, onSysChange } = this.props;
    const systemItem : SysItem = sysList.find(item => item.key === selectSysKey) || { name: '', key: '' };
    const menu = (
      <Menu className={styles.sysmenu} selectedKeys={[systemItem.key]} onClick={onSysChange}>
        {
          sysList.map((item: SysItem) =>
            <Menu.Item key={item.key}>{item.name}</Menu.Item>)
        }
      </Menu>
    );
    const { isMobile, logo, rightContentRender } = this.props;
    return (
      <div className={styles['ant-pro-global-header']}>
        {
          sysList.length > 0 ? (
            <Dropdown className={styles.selectsys} trigger={['click']} overlay={menu}>
              <div>
                {
                  systemItem.name
                }
                <Icon style={{ marginLeft: '10px' }} type="caret-right" />
              </div>
            </Dropdown>
          ) : null
        }
        {isMobile && (
          <a className={styles['ant-pro-global-header-logo']} key="logo">
            {defaultRenderLogo(logo)}
          </a>
        )}
        {/* {this.renderCollapsedButton()} */}
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}

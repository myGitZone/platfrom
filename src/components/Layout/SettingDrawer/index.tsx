import {
  Drawer,
  Icon,
} from 'antd';
import React, { Component } from 'react';

// @ts-ignore
import styles from './index.less';

// interface BodyProps {
//   title: string;
// }
// const Body: React.FC<BodyProps> = ({ children, title }) => (
//   <div style={{ marginBottom: 24 }}>
//     <h3 className={styles['ant-pro-setting-drawer-title']}>{title}</h3>
//     {children}
//   </div>
// );

export interface SettingDrawerProps {
  collapse?: boolean;
  // for test
  getContainer?: any;
  onCollapseChange?: (collapse: boolean) => void;
  children: any;
  plugins: {icon: string; children: React.ReactNode, top: string}[]
}

export interface SettingDrawerState {
  collapse?: boolean;
  currentCollapseIndex: number
}

class SettingDrawer extends Component<SettingDrawerProps, SettingDrawerState> {
  state: SettingDrawerState = {
    collapse: false,
    currentCollapseIndex: 0,
  };

  static getDerivedStateFromProps(
    props: SettingDrawerProps,
    state: SettingDrawerState,
  ): SettingDrawerState | null {
    if ('collapse' in props) {
      return {
        collapse: !!props.collapse,
        currentCollapseIndex: state.currentCollapseIndex,
      };
    }
    return null;
  }

  togglerContent = (index: number) => {
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
    } else {
      this.setState({ collapse: !collapse });
    }
  };

  render(): React.ReactNode {
    const { getContainer, children, plugins } = this.props;
    const { collapse, currentCollapseIndex } = this.state;
    return (
      <Drawer
        visible={collapse}
        width={300}
        closable={false}
        placement="right"
        mask={false}
        getContainer={getContainer}
        handler={
          <React.Fragment>
            {
              plugins.map((item, index) => (
                  <div
                    className={styles['ant-pro-setting-drawer-handle']}
                    onClick={() => { this.togglerContent(index); }}
                    style={{ top: `${200 + (index * 50)}px` }}
                  >
                    <Icon
                      type={collapse && currentCollapseIndex === index ? 'close' : 'setting'}
                      style={{
                        color: '#fff',
                        fontSize: 20,
                      }}
                    />
                  </div>
                ))
            }
          </React.Fragment>
        }
        style={{
          zIndex: 999,
        }}
      >
        {children}
      </Drawer>
    );
  }
}

export default SettingDrawer;

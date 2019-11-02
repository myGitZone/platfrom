import React from 'react';
import {Menu} from 'antd';
// @ts-ignore
import styles from './index.less';

interface DropdownPanel {
}

const DropdownPanel:React.FC<DropdownPanel> = props => {
  return (
      <Menu className={styles.sysmenu} selectedKeys={['1']}>
        <Menu.Item key="1">山东政务大数据中心</Menu.Item>
        <Menu.Item key="2">天津大港政务数据中心</Menu.Item>
        <Menu.Item key="3">山东招远</Menu.Item>
      </Menu>
  );
};
export default DropdownPanel;

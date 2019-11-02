import "antd/es/drawer/style";
import _Drawer from "antd/es/drawer";
import React from 'react';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils'; // @ts-ignore

import styles from './index.less';

var SiderMenuWrapper = function SiderMenuWrapper(props) {
  // menuData 菜单数据
  var isMobile = props.isMobile,
      menuData = props.menuData,
      collapsed = props.collapsed,
      onCollapse = props.onCollapse; // 将菜单展开，将树状的结构展开成一维数组

  var flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? React.createElement(_Drawer, {
    visible: !collapsed,
    placement: "left",
    className: styles['ant-pro-sider-menu'],
    onClose: function onClose() {
      return onCollapse && onCollapse(true);
    },
    style: {
      padding: 0,
      height: '100vh'
    }
  }, React.createElement(SiderMenu, Object.assign({}, props, {
    flatMenuKeys: flatMenuKeys,
    collapsed: isMobile ? false : collapsed
  }))) : React.createElement(SiderMenu, Object.assign({
    className: styles['ant-pro-sider-menu']
  }, props, {
    flatMenuKeys: flatMenuKeys
  }));
};

SiderMenuWrapper.defaultProps = {
  onCollapse: function onCollapse() {
    return undefined;
  }
};
export default SiderMenuWrapper;
import "antd/es/avatar/style";
import _Avatar from "antd/es/avatar";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import React from 'react';
// @ts-ignore
import styles from './index.less';

var Trigger = function Trigger(props) {
  var collapsed = props.collapsed,
      onCollapsed = props.onCollapsed,
      onLogout = props.onLogout,
      _props$userName = props.userName,
      userName = _props$userName === void 0 ? '用户名' : _props$userName,
      userPic = props.userPic;
  return React.createElement("div", {
    className: styles.container
  }, React.createElement("div", {
    className: collapsed ? styles['arrow-container-collapsed'] : styles['arrow-container'],
    onClick: function onClick() {
      return onCollapsed(!collapsed);
    }
  }, React.createElement(_Icon, {
    style: {
      fontSize: '20px',
      color: '#a7aabd',
      verticalAlign: 'middle'
    },
    type: collapsed ? 'double-right' : 'double-left'
  }), collapsed ? null : React.createElement("span", {
    style: {
      verticalAlign: 'middle',
      marginLeft: '25px'
    }
  }, "\u6536\u8D77\u83DC\u5355")), React.createElement("div", {
    className: collapsed ? styles['avatar-container-collapsed'] : styles['avatar-container']
  }, React.createElement(_Avatar, {
    src: userPic,
    icon: "user",
    style: {
      verticalAlign: 'middle'
    }
  }), collapsed ? null : React.createElement("span", {
    style: {
      verticalAlign: 'middle',
      marginLeft: '20px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '80px',
      display: 'inline-block'
    }
  }, userName)), React.createElement("div", {
    className: collapsed ? styles['logout-container-collapsed'] : styles['logout-container'],
    onClick: onLogout
  }, React.createElement(_Icon, {
    style: {
      fontSize: '25px',
      color: '#a7aabd',
      verticalAlign: 'middle'
    },
    type: "poweroff"
  }), collapsed ? null : React.createElement("span", {
    style: {
      verticalAlign: 'middle',
      marginLeft: '20px'
    }
  }, "\u9000\u51FA\u7CFB\u7EDF")));
};

export default Trigger;
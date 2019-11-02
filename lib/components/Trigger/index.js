"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/avatar/style");

var _avatar = _interopRequireDefault(require("antd/lib/avatar"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
var Trigger = function Trigger(props) {
  var collapsed = props.collapsed,
      onCollapsed = props.onCollapsed,
      onLogout = props.onLogout,
      _props$userName = props.userName,
      userName = _props$userName === void 0 ? '用户名' : _props$userName,
      userPic = props.userPic;
  return _react.default.createElement("div", {
    className: _index.default.container
  }, _react.default.createElement("div", {
    className: collapsed ? _index.default['arrow-container-collapsed'] : _index.default['arrow-container'],
    onClick: function onClick() {
      return onCollapsed(!collapsed);
    }
  }, _react.default.createElement(_icon.default, {
    style: {
      fontSize: '20px',
      color: '#a7aabd',
      verticalAlign: 'middle'
    },
    type: collapsed ? 'double-right' : 'double-left'
  }), collapsed ? null : _react.default.createElement("span", {
    style: {
      verticalAlign: 'middle',
      marginLeft: '25px'
    }
  }, "\u6536\u8D77\u83DC\u5355")), _react.default.createElement("div", {
    className: collapsed ? _index.default['avatar-container-collapsed'] : _index.default['avatar-container']
  }, _react.default.createElement(_avatar.default, {
    src: userPic,
    icon: "user",
    style: {
      verticalAlign: 'middle'
    }
  }), collapsed ? null : _react.default.createElement("span", {
    style: {
      verticalAlign: 'middle',
      marginLeft: '20px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '80px',
      display: 'inline-block'
    }
  }, userName)), _react.default.createElement("div", {
    className: collapsed ? _index.default['logout-container-collapsed'] : _index.default['logout-container'],
    onClick: onLogout
  }, _react.default.createElement(_icon.default, {
    style: {
      fontSize: '25px',
      color: '#a7aabd',
      verticalAlign: 'middle'
    },
    type: "poweroff"
  }), collapsed ? null : _react.default.createElement("span", {
    style: {
      verticalAlign: 'middle',
      marginLeft: '20px'
    }
  }, "\u9000\u51FA\u7CFB\u7EDF")));
};

var _default = Trigger;
exports.default = _default;
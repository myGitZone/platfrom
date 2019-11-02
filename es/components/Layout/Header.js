import "antd/es/layout/style";
import _Layout from "antd/es/layout";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import GlobalHeader from './GlobalHeader';
import TopNavHeader from './TopNavHeader'; // @ts-ignore

import styles from './Header.less';
var Header = _Layout.Header;

var HeaderView =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderView, _Component);

  function HeaderView() {
    var _this;

    _classCallCheck(this, HeaderView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderView).apply(this, arguments));
    _this.state = {
      visible: true
    };
    _this.ticking = false;
    _this.oldScrollTop = 0;

    _this.getHeadWidth = function () {
      var _this$props = _this.props,
          isMobile = _this$props.isMobile,
          collapsed = _this$props.collapsed,
          fixedHeader = _this$props.fixedHeader,
          layout = _this$props.layout,
          _this$props$siderWidt = _this$props.siderWidth,
          siderWidth = _this$props$siderWidt === void 0 ? 256 : _this$props$siderWidt;

      if (isMobile || !fixedHeader || layout === 'topmenu') {
        return '100%';
      }

      return collapsed ? 'calc(100% - 80px)' : "calc(100% - ".concat(siderWidth, "px)");
    }; // 配置中，下滑隐藏头部


    _this.handScroll = function () {
      // 自动隐藏头部
      var autoHideHeader = _this.props.autoHideHeader; // 获取是否可见的state

      var visible = _this.state.visible; // 如果不是自动隐藏，则直接return

      if (!autoHideHeader) {
        return;
      } // 获取滚动的距离


      var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

      if (!_this.ticking) {
        // flag 标记是否在进行动画
        _this.ticking = true;
        requestAnimationFrame(function () {
          // 如果向上则显示
          if (_this.oldScrollTop > scrollTop) {
            _this.setState({
              visible: true
            });
          } else if (scrollTop > 300 && visible) {
            // 如果滚动超过300，并且当前是可见，则隐藏
            _this.setState({
              visible: false
            });
          } else if (scrollTop < 300 && !visible) {
            // 如果滚动小于300，并且当前是隐藏，则可见
            _this.setState({
              visible: true
            });
          }

          _this.oldScrollTop = scrollTop;
          _this.ticking = false;
        });
      }
    };

    _this.renderContent = function () {
      var _this$props2 = _this.props,
          isMobile = _this$props2.isMobile,
          handleMenuCollapse = _this$props2.handleMenuCollapse,
          navTheme = _this$props2.navTheme,
          layout = _this$props2.layout,
          headerRender = _this$props2.headerRender;
      var isTop = layout === 'topmenu';
      var defaultDom = React.createElement(GlobalHeader, Object.assign({
        onCollapse: handleMenuCollapse
      }, _this.props));

      if (isTop && !isMobile) {
        defaultDom = React.createElement(TopNavHeader, Object.assign({
          theme: navTheme,
          mode: "horizontal",
          onCollapse: handleMenuCollapse
        }, _this.props));
      }

      if (headerRender) {
        return headerRender(_this.props);
      }

      return defaultDom;
    };

    return _this;
  }

  _createClass(HeaderView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('scroll', this.handScroll, {
        passive: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('scroll', this.handScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var fixedHeader = this.props.fixedHeader;
      var visible = this.state.visible;
      var width = this.getHeadWidth();
      return visible ? React.createElement(Header, {
        style: {
          padding: 0,
          width: width,
          zIndex: 2,
          height: '50px'
        },
        className: fixedHeader ? styles['ant-pro-fixed-header'] : ''
      }, this.renderContent()) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (!props.autoHideHeader && !state.visible) {
        return {
          visible: true
        };
      }

      return null;
    }
  }]);

  return HeaderView;
}(Component);

export default HeaderView;
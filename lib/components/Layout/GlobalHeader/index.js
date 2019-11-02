"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireWildcard(require("react"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _SiderMenu = require("../SiderMenu/SiderMenu");

var _utils = require("../utils/utils");

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var defaultRenderCollapsedButton = function defaultRenderCollapsedButton(collapsed) {
  return _react.default.createElement(_icon.default, {
    type: collapsed ? 'menu-unfold' : 'menu-fold'
  });
};

var GlobalHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(GlobalHeader, _Component);

  function GlobalHeader() {
    var _this;

    _classCallCheck(this, GlobalHeader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlobalHeader).apply(this, arguments));
    _this.triggerResizeEvent = (0, _debounce.default)(function () {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);

      if ((0, _utils.isBrowser)()) {
        window.dispatchEvent(event);
      }
    });

    _this.toggle = function () {
      var _this$props = _this.props,
          collapsed = _this$props.collapsed,
          onCollapse = _this$props.onCollapse;
      if (onCollapse) onCollapse(!collapsed);

      _this.triggerResizeEvent();
    };

    _this.renderCollapsedButton = function () {
      var _this$props2 = _this.props,
          collapsed = _this$props2.collapsed,
          _this$props2$collapse = _this$props2.collapsedButtonRender,
          collapsedButtonRender = _this$props2$collapse === void 0 ? defaultRenderCollapsedButton : _this$props2$collapse,
          menuRender = _this$props2.menuRender;

      if (collapsedButtonRender !== false && menuRender !== false) {
        return _react.default.createElement("span", {
          className: _index.default['ant-pro-global-header-trigger'],
          onClick: _this.toggle
        }, collapsedButtonRender(collapsed));
      }

      return null;
    };

    return _this;
  }

  _createClass(GlobalHeader, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.triggerResizeEvent.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          _this$props3$sysList = _this$props3.sysList,
          sysList = _this$props3$sysList === void 0 ? [] : _this$props3$sysList,
          selectSysKey = _this$props3.selectSysKey,
          onSysChange = _this$props3.onSysChange;
      var systemItem = sysList.find(function (item) {
        return item.key === selectSysKey;
      }) || {
        name: '',
        key: ''
      };

      var menu = _react.default.createElement(_menu.default, {
        className: _index.default.sysmenu,
        selectedKeys: [systemItem.key],
        onClick: onSysChange
      }, sysList.map(function (item) {
        return _react.default.createElement(_menu.default.Item, {
          key: item.key
        }, item.name);
      }));

      var _this$props4 = this.props,
          isMobile = _this$props4.isMobile,
          logo = _this$props4.logo,
          rightContentRender = _this$props4.rightContentRender;
      return _react.default.createElement("div", {
        className: _index.default['ant-pro-global-header']
      }, sysList.length > 0 ? _react.default.createElement(_dropdown.default, {
        className: _index.default.selectsys,
        trigger: ['click'],
        overlay: menu
      }, _react.default.createElement("div", null, systemItem.name, _react.default.createElement(_icon.default, {
        style: {
          marginLeft: '10px'
        },
        type: "caret-right"
      }))) : null, isMobile && _react.default.createElement("a", {
        className: _index.default['ant-pro-global-header-logo'],
        key: "logo"
      }, (0, _SiderMenu.defaultRenderLogo)(logo)), rightContentRender && rightContentRender(this.props));
    }
  }]);

  return GlobalHeader;
}(_react.Component);

exports.default = GlobalHeader;
import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/drawer/style";
import _Drawer from "antd/es/drawer";
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) { return typeof obj; };
}
else {
    _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
} return _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps)
    _defineProperties(Constructor.prototype, protoProps); if (staticProps)
    _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
} return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
} return self; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass)
    _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
import React, { Component } from 'react'; // @ts-ignore
import styles from './index.less';
var SettingDrawer = 
/*#__PURE__*/
function (_Component) {
    _inherits(SettingDrawer, _Component);
    function SettingDrawer() {
        var _this;
        _classCallCheck(this, SettingDrawer);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(SettingDrawer).apply(this, arguments));
        _this.state = {
            collapse: false,
            currentCollapseIndex: 0
        };
        _this.togglerContent = function (index) {
            var _this$state = _this.state, collapse = _this$state.collapse, currentCollapseIndex = _this$state.currentCollapseIndex;
            var onCollapseChange = _this.props.onCollapseChange;
            if (onCollapseChange) {
                onCollapseChange(!collapse);
                return;
            }
            if (currentCollapseIndex !== index) {
                _this.setState({
                    currentCollapseIndex: index
                });
            }
            else {
                _this.setState({
                    collapse: !collapse
                });
            }
        };
        return _this;
    }
    _createClass(SettingDrawer, [{
            key: "render",
            value: function render() {
                var _this2 = this;
                var _this$props = this.props, getContainer = _this$props.getContainer, children = _this$props.children, plugins = _this$props.plugins;
                var _this$state2 = this.state, collapse = _this$state2.collapse, currentCollapseIndex = _this$state2.currentCollapseIndex;
                return React.createElement(_Drawer, {
                    visible: collapse,
                    width: 300,
                    closable: false,
                    placement: "right",
                    mask: false,
                    getContainer: getContainer,
                    handler: React.createElement(React.Fragment, null, plugins.map(function (item, index) {
                        return React.createElement("div", {
                            className: styles['ant-pro-setting-drawer-handle'],
                            onClick: function onClick() {
                                _this2.togglerContent(index);
                            },
                            style: {
                                top: "".concat(200 + index * 50, "px")
                            }
                        }, React.createElement(_Icon, {
                            type: collapse && currentCollapseIndex === index ? 'close' : 'setting',
                            style: {
                                color: '#fff',
                                fontSize: 20
                            }
                        }));
                    })),
                    style: {
                        zIndex: 999
                    }
                }, children);
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function getDerivedStateFromProps(props, state) {
                if ('collapse' in props) {
                    return {
                        collapse: !!props.collapse,
                        currentCollapseIndex: state.currentCollapseIndex
                    };
                }
                return null;
            }
        }]);
    return SettingDrawer;
}(Component);
export default SettingDrawer;
//# sourceMappingURL=index.js.map
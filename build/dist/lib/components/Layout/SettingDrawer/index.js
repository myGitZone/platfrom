"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("antd/lib/icon/style");
var _icon = _interopRequireDefault(require("antd/lib/icon"));
require("antd/lib/drawer/style");
var _drawer = _interopRequireDefault(require("antd/lib/drawer"));
var _react = _interopRequireWildcard(require("react"));
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) {
    return obj;
}
else {
    var newObj = {};
    if (obj != null) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                if (desc.get || desc.set) {
                    Object.defineProperty(newObj, key, desc);
                }
                else {
                    newObj[key] = obj[key];
                }
            }
        }
    }
    newObj.default = obj;
    return newObj;
} }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
                return _react.default.createElement(_drawer.default, {
                    visible: collapse,
                    width: 300,
                    closable: false,
                    placement: "right",
                    mask: false,
                    getContainer: getContainer,
                    handler: _react.default.createElement(_react.default.Fragment, null, plugins.map(function (item, index) {
                        return _react.default.createElement("div", {
                            className: _index.default['ant-pro-setting-drawer-handle'],
                            onClick: function onClick() {
                                _this2.togglerContent(index);
                            },
                            style: {
                                top: "".concat(200 + index * 50, "px")
                            }
                        }, _react.default.createElement(_icon.default, {
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
}(_react.Component);
var _default = SettingDrawer;
exports.default = _default;
//# sourceMappingURL=index.js.map
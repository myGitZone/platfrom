"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SiderMenu = require("../SiderMenu/SiderMenu");
var _BaseMenu = _interopRequireDefault(require("../SiderMenu/BaseMenu"));
var _SiderMenuUtils = require("../SiderMenu/SiderMenuUtils");
var _utils = require("../utils/utils");
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) { return typeof obj; };
}
else {
    _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
} return _typeof(obj); }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) {
    if (i % 2) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; }));
        }
        ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); });
    }
    else {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    }
} return target; }
function _defineProperty(obj, key, value) { if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
}
else {
    obj[key] = value;
} return obj; }
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
var TopNavHeader = 
/*#__PURE__*/
function (_Component) {
    _inherits(TopNavHeader, _Component);
    function TopNavHeader() {
        var _this;
        _classCallCheck(this, TopNavHeader);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(TopNavHeader).apply(this, arguments));
        _this.state = {};
        _this.maim = null;
        return _this;
    }
    _createClass(TopNavHeader, [{
            key: "render",
            value: function render() {
                var _this2 = this;
                var _this$props = this.props, theme = _this$props.theme, menuData = _this$props.menuData, logo = _this$props.logo, title = _this$props.title, contentWidth = _this$props.contentWidth, rightContentRender = _this$props.rightContentRender;
                var maxWidth = this.state.maxWidth;
                var flatMenuKeys = (0, _SiderMenuUtils.getFlatMenuKeys)(menuData);
                var baseClassName = _index.default['ant-pro-top-nav-header'];
                return _react.default.createElement("div", {
                    className: "".concat(baseClassName, " ").concat(theme === 'light' ? 'light' : '')
                }, _react.default.createElement("div", {
                    ref: function ref(_ref) {
                        _this2.maim = _ref;
                    },
                    className: "".concat(baseClassName, "-main ").concat(contentWidth === 'Fixed' ? 'wide' : '')
                }, _react.default.createElement("div", {
                    className: "".concat(baseClassName, "-left")
                }, _react.default.createElement("div", {
                    className: "".concat(baseClassName, "-logo"),
                    key: "logo",
                    id: "logo"
                }, _react.default.createElement("a", null, (0, _SiderMenu.defaultRenderLogo)(logo), _react.default.createElement("h1", null, title)))), _react.default.createElement("div", {
                    style: {
                        maxWidth: maxWidth,
                        flex: 1
                    },
                    className: "".concat(baseClassName, "-menu")
                }, _react.default.createElement(_BaseMenu.default, Object.assign({}, this.props, {
                    flatMenuKeys: flatMenuKeys
                }))), rightContentRender && rightContentRender(_objectSpread({}, this.props))));
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function getDerivedStateFromProps(props) {
                var contentWidth = props.contentWidth;
                var innerWidth = (0, _utils.isBrowser)() ? window.innerWidth : 0;
                return {
                    maxWidth: (contentWidth === 'Fixed' && innerWidth > 1200 ? 1200 : innerWidth) - 280 - 120
                };
            }
        }]);
    return TopNavHeader;
}(_react.Component);
exports.default = TopNavHeader;
//# sourceMappingURL=index.js.map
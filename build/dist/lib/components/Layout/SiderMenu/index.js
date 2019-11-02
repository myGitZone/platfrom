"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("antd/lib/drawer/style");
var _drawer = _interopRequireDefault(require("antd/lib/drawer"));
var _react = _interopRequireDefault(require("react"));
var _SiderMenu = _interopRequireDefault(require("./SiderMenu"));
var _SiderMenuUtils = require("./SiderMenuUtils");
var _index = _interopRequireDefault(require("./index.less"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-ignore
var SiderMenuWrapper = function SiderMenuWrapper(props) {
    // menuData 菜单数据
    var isMobile = props.isMobile, menuData = props.menuData, collapsed = props.collapsed, onCollapse = props.onCollapse; // 将菜单展开，将树状的结构展开成一维数组
    var flatMenuKeys = (0, _SiderMenuUtils.getFlatMenuKeys)(menuData);
    return isMobile ? _react.default.createElement(_drawer.default, {
        visible: !collapsed,
        placement: "left",
        className: _index.default['ant-pro-sider-menu'],
        onClose: function onClose() {
            return onCollapse && onCollapse(true);
        },
        style: {
            padding: 0,
            height: '100vh'
        }
    }, _react.default.createElement(_SiderMenu.default, Object.assign({}, props, {
        flatMenuKeys: flatMenuKeys,
        collapsed: isMobile ? false : collapsed
    }))) : _react.default.createElement(_SiderMenu.default, Object.assign({
        className: _index.default['ant-pro-sider-menu']
    }, props, {
        flatMenuKeys: flatMenuKeys
    }));
};
SiderMenuWrapper.defaultProps = {
    onCollapse: function onCollapse() {
        return undefined;
    }
};
var _default = SiderMenuWrapper;
exports.default = _default;
//# sourceMappingURL=index.js.map
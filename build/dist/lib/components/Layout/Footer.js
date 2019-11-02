"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
require("antd/lib/icon/style");
var _icon = _interopRequireDefault(require("antd/lib/icon"));
require("antd/lib/layout/style");
var _layout = _interopRequireDefault(require("antd/lib/layout"));
var _react = _interopRequireWildcard(require("react"));
var _GlobalFooter = _interopRequireDefault(require("./GlobalFooter"));
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
var Footer = _layout.default.Footer;
var defaultLinks = [ // {
//   key: 'Ant Design Pro',
//   title: 'Ant Design Pro',
//   href: 'https://pro.ant.design',
//   blankTarget: true,
// },
// {
//   key: 'github',
//   title: <Icon type="github" />,
//   href: 'https://github.com/ant-design/ant-design-pro',
//   blankTarget: true,
// },
// {
//   key: 'Ant Design',
//   title: 'Ant Design',
//   href: 'https://ant.design',
//   blankTarget: true,
// },
];
var defaultCopyright = '2019 东方国信';
var FooterView = function FooterView(_ref) {
    var links = _ref.links, copyright = _ref.copyright;
    return _react.default.createElement(Footer, {
        style: {
            padding: 0
        }
    }, _react.default.createElement(_GlobalFooter.default, {
        links: links || defaultLinks,
        copyright: _react.default.createElement(_react.Fragment, null, "Copyright ", _react.default.createElement(_icon.default, {
            type: "copyright"
        }), " ", copyright || defaultCopyright)
    }));
};
var _default = FooterView;
exports.default = _default;
//# sourceMappingURL=Footer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _settingDrawer = _interopRequireDefault(require("./en-US/settingDrawer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var _default = _objectSpread({}, _settingDrawer.default);
exports.default = _default;
//# sourceMappingURL=en-US.js.map
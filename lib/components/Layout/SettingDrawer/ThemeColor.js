"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

require("./ThemeColor.less");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Tag = function Tag(_ref) {
  var color = _ref.color,
      check = _ref.check,
      rest = _objectWithoutProperties(_ref, ["color", "check"]);

  return _react.default.createElement("div", Object.assign({}, rest, {
    style: {
      backgroundColor: color
    }
  }), check ? _react.default.createElement(_icon.default, {
    type: "check"
  }) : '');
};

var ThemeColor = function ThemeColor(_ref2) {
  var colors = _ref2.colors,
      title = _ref2.title,
      value = _ref2.value,
      onChange = _ref2.onChange,
      formatMessage = _ref2.formatMessage;
  var colorList = colors || [{
    key: 'dust',
    color: '#F5222D'
  }, {
    key: 'volcano',
    color: '#FA541C'
  }, {
    key: 'sunset',
    color: '#FAAD14'
  }, {
    key: 'cyan',
    color: '#13C2C2'
  }, {
    key: 'green',
    color: '#52C41A'
  }, {
    key: 'daybreak',
    color: '#1890FF'
  }, {
    key: 'geekblue',
    color: '#2F54EB'
  }, {
    key: 'purple',
    color: '#722ED1'
  }];
  return _react.default.createElement("div", {
    className: "theme-color"
  }, _react.default.createElement("h3", {
    className: "theme-color-title"
  }, title), _react.default.createElement("div", {
    className: "theme-color-content"
  }, colorList.map(function (_ref3) {
    var key = _ref3.key,
        color = _ref3.color;
    return _react.default.createElement(_tooltip.default, {
      key: color,
      title: formatMessage({
        id: "app.setting.themecolor.".concat(key)
      })
    }, _react.default.createElement(Tag, {
      className: "theme-color-block",
      color: color,
      check: value === color,
      onClick: function onClick() {
        return onChange && onChange(color);
      }
    }));
  })));
};

var _default = ThemeColor;
exports.default = _default;
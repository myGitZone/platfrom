import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/icon/style";
import _Icon from "antd/es/icon";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import './ThemeColor.less';
import React from 'react';

var Tag = function Tag(_ref) {
  var color = _ref.color,
      check = _ref.check,
      rest = _objectWithoutProperties(_ref, ["color", "check"]);

  return React.createElement("div", Object.assign({}, rest, {
    style: {
      backgroundColor: color
    }
  }), check ? React.createElement(_Icon, {
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
  return React.createElement("div", {
    className: "theme-color"
  }, React.createElement("h3", {
    className: "theme-color-title"
  }, title), React.createElement("div", {
    className: "theme-color-content"
  }, colorList.map(function (_ref3) {
    var key = _ref3.key,
        color = _ref3.color;
    return React.createElement(_Tooltip, {
      key: color,
      title: formatMessage({
        id: "app.setting.themecolor.".concat(key)
      })
    }, React.createElement(Tag, {
      className: "theme-color-block",
      color: color,
      check: value === color,
      onClick: function onClick() {
        return onChange && onChange(color);
      }
    }));
  })));
};

export default ThemeColor;
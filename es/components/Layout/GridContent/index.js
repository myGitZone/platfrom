import './GridContent.less';
import React from 'react';
import RouteContext from '../RouteContext';

var GridContent = function GridContent(props) {
  return React.createElement(RouteContext.Consumer, null, function (value) {
    var children = props.children,
        propsContentWidth = props.contentWidth;
    var contentWidth = propsContentWidth || value.contentWidth;
    var className = 'ant-pro-grid-content';

    if (contentWidth === 'Fixed') {
      className = 'ant-pro-grid-content wide';
    }

    return React.createElement("div", {
      className: className
    }, children);
  });
};

export default GridContent;
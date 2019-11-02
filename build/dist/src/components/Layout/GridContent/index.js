import './GridContent.less';
import React from 'react';
import RouteContext from '../RouteContext';
const GridContent = props => (React.createElement(RouteContext.Consumer, null, value => {
    const { children, contentWidth: propsContentWidth } = props;
    const contentWidth = propsContentWidth || value.contentWidth;
    let className = 'ant-pro-grid-content';
    if (contentWidth === 'Fixed') {
        className = 'ant-pro-grid-content wide';
    }
    return React.createElement("div", { className: className }, children);
}));
export default GridContent;
//# sourceMappingURL=index.js.map
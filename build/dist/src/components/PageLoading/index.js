import React from 'react';
import { Spin } from 'antd';
// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
const PageLoding = () => (React.createElement("div", { style: { paddingTop: 100, textAlign: 'center' } },
    React.createElement(Spin, { size: "large" })));
export default PageLoding;
//# sourceMappingURL=index.js.map
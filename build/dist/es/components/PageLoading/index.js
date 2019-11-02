import "antd/es/spin/style";
import _Spin from "antd/es/spin";
import React from 'react';
// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
var PageLoding = function PageLoding() {
    return React.createElement("div", {
        style: {
            paddingTop: 100,
            textAlign: 'center'
        }
    }, React.createElement(_Spin, {
        size: "large"
    }));
};
export default PageLoding;
//# sourceMappingURL=index.js.map
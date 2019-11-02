import { Icon, Layout } from 'antd';
import React, { Fragment } from 'react';
import GlobalFooter from './GlobalFooter';
const { Footer } = Layout;
const defaultLinks = [
// {
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
const defaultCopyright = '2019 东方国信';
const FooterView = ({ links, copyright }) => (React.createElement(Footer, { style: { padding: 0 } },
    React.createElement(GlobalFooter, { links: links || defaultLinks, copyright: React.createElement(Fragment, null,
            "Copyright ",
            React.createElement(Icon, { type: "copyright" }),
            " ",
            copyright || defaultCopyright) })));
export default FooterView;
//# sourceMappingURL=Footer.js.map
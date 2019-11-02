import "antd/es/icon/style";
import _Icon from "antd/es/icon";
import "antd/es/layout/style";
import _Layout from "antd/es/layout";
import React, { Fragment } from 'react';
import GlobalFooter from './GlobalFooter';
var Footer = _Layout.Footer;
var defaultLinks = [// {
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
  var links = _ref.links,
      copyright = _ref.copyright;
  return React.createElement(Footer, {
    style: {
      padding: 0
    }
  }, React.createElement(GlobalFooter, {
    links: links || defaultLinks,
    copyright: React.createElement(Fragment, null, "Copyright ", React.createElement(_Icon, {
      type: "copyright"
    }), " ", copyright || defaultCopyright)
  }));
};

export default FooterView;
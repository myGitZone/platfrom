import React from 'react';
import classNames from 'classnames';
// @ts-ignore
import styles from './index.less';
export default ({ className, links, copyright }) => {
    const clsString = classNames(styles['ant-pro-global-footer'], className);
    return (React.createElement("footer", { className: clsString },
        links && (React.createElement("div", { className: styles['ant-pro-global-footer-links'] }, links.map(link => (React.createElement("a", { key: link.key, title: link.key, target: link.blankTarget ? '_blank' : '_self', href: link.href }, link.title))))),
        copyright && (React.createElement("div", { className: styles['ant-pro-global-footer-copyright'] }, copyright))));
};
//# sourceMappingURL=index.js.map
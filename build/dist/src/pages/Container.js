import React from 'react';
// @ts-ignore
import styles from './Container.less';
class Container extends React.PureComponent {
    render() {
        const { route } = this.props;
        return (React.createElement("iframe", { className: styles.container, title: "container", src: route.value }));
    }
}
export default Container;
//# sourceMappingURL=Container.js.map
import React from 'react';
// @ts-ignore
import styles from './Container.less';

interface RouterTypes {
  route: {value: string};
  location: { pathname?: string };
  children?: any;
}

class Container extends React.PureComponent<RouterTypes> {
    render() {
      const { route } = this.props;
        return (
          <iframe className={styles.container} title="container" src={route.value} />
        );
    }
}

export default Container;

import React from 'react';
import { Icon, Avatar } from 'antd';

// @ts-ignore
import styles from './index.less';

interface TriggerPropsTypes {
  collapsed: boolean,
  onCollapsed: any,
  onLogout: ()=>void,
  userName: string,
  userPic: string
}

const Trigger: React.FC<TriggerPropsTypes> = props => {
  const {
    collapsed, onCollapsed, onLogout, userName = '用户名', userPic,
  } = props;
  return (
    <div className={styles.container}>
      <div className={collapsed ? styles['arrow-container-collapsed'] : styles['arrow-container']} onClick={() => onCollapsed(!collapsed)} >
        <Icon style={{ fontSize: '20px', color: '#a7aabd', verticalAlign: 'middle' }} type={collapsed ? 'double-right' : 'double-left'}/>
        {
          collapsed ? null : <span style={{ verticalAlign: 'middle', marginLeft: '25px' }}>收起菜单</span>
        }
      </div>
      <div className={collapsed ? styles['avatar-container-collapsed'] : styles['avatar-container']}>
        <Avatar src={userPic} icon="user" style={{ verticalAlign: 'middle' }}/>
        {collapsed ? null : <span style={{ verticalAlign: 'middle', marginLeft: '20px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '80px', display: 'inline-block' }}>{userName}</span>}
      </div>
      <div className={collapsed ? styles['logout-container-collapsed'] : styles['logout-container']} onClick={onLogout}>
        <Icon style={{ fontSize: '25px', color: '#a7aabd', verticalAlign: 'middle' }} type="poweroff"/>
        {collapsed ? null : <span style={{ verticalAlign: 'middle', marginLeft: '20px' }}>退出系统</span>}
      </div>
    </div>
  );
};

export default Trigger;

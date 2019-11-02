import React, { useState } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import Trigger from '@/components/Trigger';
import Layout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  SettingDrawer,
} from '@/components/Layout';
// import RightContent from '@/components/GlobalHeader/RightContent';
import logo from '@/assets/logo.png';
import openLogo from '@/assets/logo-open.png';
import sysNormal from '@/assets/system-normal.png';
import sysHover from '@/assets/system-hover.png';
import { ConnectState, DefaultSettings } from '@/models/connect';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: DefaultSettings
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [collapsed, handleMenuCollapse] = useState<boolean>(true);
  const [selectSysKey, handleSysKeyChange] = useState<string>('1');
  const pluginArr = [];
  const initTop = 200;
  for (let i = 0; i < 4; i += 1) {
    pluginArr.push({
      icon: '',
      children: <div>ddd</div>,
      top: `${initTop + (i * 60)}px`,
    });
  }
  const [plugins, setPlugins] = useState<{icon: string; children: React.ReactNode, top: string}[]>(pluginArr);
  return (
    <React.Fragment>
      <Layout
        logo={collapsed ? logo : openLogo}
        collapsed={collapsed}
        showHeader={false}
        trigger={<Trigger onCollapsed={handleMenuCollapse} collapsed={collapsed} />}
        // onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) =>
          // 判断是否为url，如果是url则直接返回fefaultDom
          // 如果不是，则通过link进行控制路由
          (menuItemProps.isUrl ? (
            defaultDom
          ) : (
            <Link to={menuItemProps.path}>{defaultDom}</Link>
          ))
        }
        rightContentRender={rightProps => (
           null
        )}
        renderSysChange={() => (
            <div>
              {
                !collapsed ? <span>指标字典</span> : null
              }
              <img src={collapsed ? sysNormal : sysHover} alt=""/>
            </div>
          )}
        sysList={[
          {
            name: '山东大数据',
            key: '1',
          },
          {
            name: '山东大数据1',
            key: '2',
          },
        ]}
        selectSysKey={selectSysKey}
        onSysChange={data => { handleSysKeyChange(data.key); }}
        siderWidth={156}
        systemname="指标字典"
        {...props}
        {...props.settings}
        footerRender={false}
      >
        {props.children}
      </Layout>
      <SettingDrawer plugins={plugins}>
      </SettingDrawer>
    </React.Fragment>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);

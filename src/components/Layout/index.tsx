import BasicLayout, { BasicLayoutProps } from './Layout';
import DefaultHeader, { HeaderViewProps as HeaderProps } from './Header';
import SettingDrawer, {
  SettingDrawerProps,
  SettingDrawerState,
} from './SettingDrawer';

import DefaultFooter, { FooterProps } from './Footer';
import GridContent from './GridContent';
import RouteContext from './RouteContext';
import getMenuData from './utils/getMenuData';
import getPageTitle from './getPageTitle';

export { Settings } from './defaultSettings';

export { MenuDataItem } from './typings';

export {
  BasicLayout,
  BasicLayoutProps,
  HeaderProps,
  RouteContext,
  GridContent,
  DefaultHeader,
  DefaultFooter,
  FooterProps,
  SettingDrawer,
  SettingDrawerState,
  SettingDrawerProps,
  getPageTitle,
  getMenuData,
};

export default BasicLayout;

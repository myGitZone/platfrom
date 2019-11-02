import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

interface SettingModelType {
  namespace: string;
  state: DefaultSettings
}

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
};
export default SettingModel;

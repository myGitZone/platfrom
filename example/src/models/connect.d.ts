import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { DefaultSettings } from '../../config/defaultSettings';

export { DefaultSettings };

export interface ConnectState {
  settings?: DefaultSettings,
  global?: any
}
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

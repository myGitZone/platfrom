// @ts-ignore
import * as request from '@/services/api';
import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from './connect.d';

interface StateTypes {
  userInfo: any
}

interface GloalModelType {
  namespace: string;
  state: StateTypes,
  effects: {
    login: Effect
  },
  reducers: {
    saveInfo: Reducer<StateTypes>;
  }
}

const gloalModel: GloalModelType = {
  namespace: 'global',
  state: {
    userInfo: {},
  },
  effects: {
    * login({ payload }, { call, put }) {
      const response = yield call(request.login, payload);
      sessionStorage.setItem('userInfo', JSON.stringify(response.data));
      yield put(
        routerRedux.replace({
          pathname: '/test',
        }),
      );
    },
  },
  reducers: {
    saveInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};

export default gloalModel;

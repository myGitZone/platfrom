// @ts-ignore
import * as request from '@/services/api';
import { routerRedux } from 'dva/router';
const gloalModel = {
    namespace: 'global',
    state: {
        userInfo: {},
    },
    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(request.login, payload);
            sessionStorage.setItem('userInfo', JSON.stringify(response.data));
            yield put(routerRedux.replace({
                pathname: '/test',
            }));
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
//# sourceMappingURL=global.js.map
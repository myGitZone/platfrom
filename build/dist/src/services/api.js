import request from '@/utils/request';
import * as api from './request-url';
const METHODE = {
    DELETE: 'DELETE',
    POST: 'POST',
    PUT: 'PUT',
};
export async function login({ username = '', password = '', code = '', userType = '', }) {
    return request(api.login, {
        method: METHODE.POST,
        body: {
            username,
            password,
            code,
            userType,
        },
    });
}
//# sourceMappingURL=api.js.map
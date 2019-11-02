import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import { routerRedux } from 'dva/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  options = {},
) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      tokenId: localStorage.getItem('tokenId'),
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  let newUrl = url;
  if (
    newOptions.method === 'POST'
    || newOptions.method === 'PUT'
    || newOptions.method === 'DELETE'
  ) {
    newOptions.headers = {
      Accept: 'application/json',
      // cacheControl: 'no-cache',
      ...newOptions.headers,
    };
    if (!(newOptions.body instanceof FormData)) {
      const { body } = newOptions;
      if (body) {
        const params = new URLSearchParams();
        Object.keys(body)
          .forEach(item => params.append(item, body[item]));
        newOptions.body = params;
      }
      // newOptions.body = newOptions.body;
    }
  } else {
    newUrl = newUrl.indexOf('?') > 0 ? `${newUrl}&dc=${new Date().getTime()}` : `${newUrl}?dc=${new Date().getTime()}`;
  }
  return fetch(newUrl, newOptions)
    .then(checkStatus)
    .then(response => response.json()).then(result => {
      if ('code' in result && (result.code.toString() === '2' || result.code.toString() === '3')) {
        throw result;
      }
      return result;
    })
    // eslint-disable-next-line consistent-return
    .catch(e => {
      if ('code' in e && (e.code.toString() === '2' || e.code.toString() === '3')) {
        // eslint-disable-next-line eslint-comments/disable-enable-pair
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch(routerRedux.push('/user'));
        return e;
      }
        const status = e.status || e.name;
        if (status === 401) {
          // @HACK
          window.g_app._store.dispatch({
            type: 'login/logout',
          });
          // eslint-disable-next-line consistent-return
          return;
        }
        // environment should not be used
        if (status === 403) {
          router.push('/exception/403');
          // eslint-disable-next-line consistent-return
          return;
        }
        if (status <= 504 && status >= 500) {
          router.push('/exception/500');
          // eslint-disable-next-line consistent-return
          return;
        }
        if (status >= 404 && status < 422) {
          router.push('/exception/404');
        }
    });
}

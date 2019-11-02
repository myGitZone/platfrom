"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

require("antd/lib/notification/style");

var _notification2 = _interopRequireDefault(require("antd/lib/notification"));

var _fetch = _interopRequireDefault(require("dva/fetch"));

var _router = _interopRequireDefault(require("umi/router"));

var _router2 = require("dva/router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var codeMessage = {
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
  504: '网关超时。'
};

var checkStatus = function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  var errortext = codeMessage[response.status] || response.statusText;

  _notification2.default.error({
    message: "\u8BF7\u6C42\u9519\u8BEF ".concat(response.status, ": ").concat(response.url),
    description: errortext
  });

  var error = new Error(errortext);
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


function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultOptions = {
    credentials: 'include',
    headers: {
      tokenId: localStorage.getItem('tokenId')
    }
  };

  var newOptions = _objectSpread({}, defaultOptions, {}, options);

  var newUrl = url;

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    newOptions.headers = _objectSpread({
      Accept: 'application/json'
    }, newOptions.headers);

    if (!(newOptions.body instanceof FormData)) {
      var body = newOptions.body;

      if (body) {
        var params = new URLSearchParams();
        Object.keys(body).forEach(function (item) {
          return params.append(item, body[item]);
        });
        newOptions.body = params;
      } // newOptions.body = newOptions.body;

    }
  } else {
    newUrl = newUrl.indexOf('?') > 0 ? "".concat(newUrl, "&dc=").concat(new Date().getTime()) : "".concat(newUrl, "?dc=").concat(new Date().getTime());
  }

  return (0, _fetch.default)(newUrl, newOptions).then(checkStatus).then(function (response) {
    return response.json();
  }).then(function (result) {
    if ('code' in result && (result.code.toString() === '2' || result.code.toString() === '3')) {
      throw result;
    }

    return result;
  }) // eslint-disable-next-line consistent-return
  .catch(function (e) {
    if ('code' in e && (e.code.toString() === '2' || e.code.toString() === '3')) {
      // eslint-disable-next-line eslint-comments/disable-enable-pair

      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch(_router2.routerRedux.push('/user'));

      return e;
    }

    var status = e.status || e.name;

    if (status === 401) {
      // @HACK
      window.g_app._store.dispatch({
        type: 'login/logout'
      }); // eslint-disable-next-line consistent-return


      return;
    } // environment should not be used


    if (status === 403) {
      _router.default.push('/exception/403'); // eslint-disable-next-line consistent-return


      return;
    }

    if (status <= 504 && status >= 500) {
      _router.default.push('/exception/500'); // eslint-disable-next-line consistent-return


      return;
    }

    if (status >= 404 && status < 422) {
      _router.default.push('/exception/404');
    }
  });
}
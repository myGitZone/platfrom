"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;

var _request = _interopRequireDefault(require("@/utils/request"));

var api = _interopRequireWildcard(require("./request-url"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var METHODE = {
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT'
};

function login(_x) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var _ref$username, username, _ref$password, password, _ref$code, code, _ref$userType, userType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$username = _ref.username, username = _ref$username === void 0 ? '' : _ref$username, _ref$password = _ref.password, password = _ref$password === void 0 ? '' : _ref$password, _ref$code = _ref.code, code = _ref$code === void 0 ? '' : _ref$code, _ref$userType = _ref.userType, userType = _ref$userType === void 0 ? '' : _ref$userType;
            return _context.abrupt("return", (0, _request.default)(api.login, {
              method: METHODE.POST,
              body: {
                username: username,
                password: password,
                code: code,
                userType: userType
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _login.apply(this, arguments);
}
import enTWLocal from './en-US';
import zhLocal from './zh-CN';
import zhTWLocal from './zh-TW';
import { isBrowser } from '../utils/utils';
var locales = {
  'zh-CN': zhLocal,
  'zh-TW': zhTWLocal,
  'en-US': enTWLocal
};

var getLanguage = function getLanguage() {
  // support ssr
  var lang = undefined;

  if (isBrowser()) {
    window.localStorage.getItem('umi_locale');
  }

  return lang || window.g_locale || navigator.language;
};

export { getLanguage };
export default (function (locale) {
  if (locale) {
    return locales[locale];
  }

  var gLocale = getLanguage();

  if (locales[gLocale]) {
    return locales[gLocale];
  }

  return locales['zh-CN'];
});
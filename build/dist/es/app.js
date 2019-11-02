"use strict";
window.getUserInfo = function () {
    return {
        a: 13
    };
};
window.addEventListener('message', function (e) {
    if (e.data === 'load') {
        // eslint-disable-next-line no-underscore-dangle
        var model = JSON.parse(sessionStorage.getItem('userInfo'));
        e.source.postMessage({
            type: 'single',
            data: model
        }, '*');
    }
});
//# sourceMappingURL=app.js.map
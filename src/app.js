window.getUserInfo = function () {
  return {
    a: 13,
  };
};

window.addEventListener('message', e => {
  if (e.data === 'load') {
    // eslint-disable-next-line no-underscore-dangle
    const model = JSON.parse(sessionStorage.getItem('userInfo'));
    e.source.postMessage({ type: 'single', data: model }, '*');
  }
});

const toggleClass = (selector, cssClass, state) => {
  const element = document.querySelector(selector);
  if (typeof (state) === 'undefined') {
    element.classList.toggle(cssClass);
  } else {
    element.classList.toggle(cssClass, state);
  }
};

const addListener = (selector, listenerType, callback) => {
  const element = document.querySelector(selector);
  element.addEventListener(listenerType, callback);
};

module.exports.toggleClass = toggleClass;
module.exports.addListener = addListener;

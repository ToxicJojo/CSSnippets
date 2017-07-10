const toggleClass = (selector, cssClass) => {
  const element = document.querySelector(selector);
  element.classList.toggle(cssClass);
};

const addListener = (selector, listenerType, callback) => {
  const element = document.querySelector(selector);
  element.addEventListener(listenerType, callback);
};

module.exports.toggleClass = toggleClass;
module.exports.addListener = addListener;

const getElementForSelector = (selector) => {
  if (typeof (selector) === 'string') {
    return document.querySelector(selector);
  }

  return selector;
};

const toggleClass = (selector, cssClass, state) => {
  const element = getElementForSelector(selector);

  if (typeof (state) === 'undefined') {
    element.classList.toggle(cssClass);
  } else {
    element.classList.toggle(cssClass, state);
  }
};

const addListener = (selector, listenerType, callback) => {
  const element = getElementForSelector(selector);
  element.addEventListener(listenerType, callback);
};

const doForEach = (selector, action) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach(action);
};

module.exports.toggleClass = toggleClass;
module.exports.addListener = addListener;
module.exports.doForEach = doForEach;

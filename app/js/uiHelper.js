const getElementForSelector = (selector) => {
  if (typeof (selector) === 'string') {
    return document.querySelectorAll(selector);
  } else if (typeof (selector) === 'object') {
    return [selector];
  }

  return selector;
};

const toggleClass = (selector, cssClass, state) => {
  const elements = getElementForSelector(selector);

  elements.forEach((element) => {
    if (typeof (state) === 'undefined') {
      element.classList.toggle(cssClass);
    } else {
      element.classList.toggle(cssClass, state);
    }
  });
};

const addListener = (selector, listenerType, callback) => {
  const elements = getElementForSelector(selector);

  elements.forEach((element) => {
    element.addEventListener(listenerType, callback);
  });
};

const doForEach = (selector, action) => {
  const elements = getElementForSelector(selector);

  elements.forEach(action);
};


const initTabs = () => {
  addListener('ul.tabNav li', 'click', (e) => {
    e.preventDefault();
    const element = e.target;

    const tabGroup = element.dataset.tabGroup;
    const tabType = element.dataset.tabType;

    toggleClass(`ul.tabNav li[data-tab-group="${tabGroup}"]`, 'active', false);
    toggleClass(`ul.tabNav li[data-tab-group="${tabGroup}"][data-tab-type="${tabType}"]`, 'active', true);

    toggleClass(`.tabContent[data-tab-group="${tabGroup}"]`, 'hidden', true);
    toggleClass(`.tabContent[data-tab-group="${tabGroup}"][data-tab-type="${tabType}"]`, 'hidden', false);
  });
};

module.exports.toggleClass = toggleClass;
module.exports.addListener = addListener;
module.exports.doForEach = doForEach;
module.exports.initTabs = initTabs;

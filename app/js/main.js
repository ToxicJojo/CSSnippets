const UI = require('./uiHelper');

UI.registerServiceWorker();

/**
 * Toggles the state of the side nav. The nav can be eighter hidden or
 * visible.
 * @param {boolean} open Indicates whether the nav should be show or hidden.
 *                       If not provided the state will simply toggle.
*/
const toggleSideNav = (open) => {
  if (typeof (open) === 'undefined') {
    // If no state is provided toggle the side-nav.
    UI.toggleClass('.side-nav', 'open');
    UI.toggleClass('.side-nav-click', 'open');
  } else {
    UI.toggleClass('.side-nav', 'open', open);
    UI.toggleClass('.side-nav-click', 'open', open);
  }
};

const markActivePage = (pageName) => {
  // Set the active page to active and all others to inactive.
  UI.doForEach('.side-nav a', (element) => {
    if (element.dataset.page === pageName) {
      UI.toggleClass(element, 'active', true);
    } else {
      UI.toggleClass(element, 'active', false);
    }
  });
};

/**
 * Makes a GET request to the provided url.
 * @param {string} pageUrl The url to load.
 * @return {Promise} A Promise that on success resolves to the response of the
                     GET request. Rejects to an object that contains the HTTP
                     status and status text.
*/
const getPageContent = (pageUrl) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open('GET', pageUrl);
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = () => {
      reject({
        status: this.status,
        statusText: request.statusText,
      });
    };

    request.send();
  });
};

/**
 * Shows the passed page. The current .content div will be hidden and a
 * loading state will be shown until the load is completed.
 * @param {string} pageName The name of the page to load. The request will go to
 *                          page/${pageName} .
*/
const showPage = async (pageName) => {
  // Show a loading state
  UI.toggleClass('.content', 'hidden', true);
  UI.toggleClass('.loading', 'hidden', false);

  history.pushState(null, pageName, pageName);

  markActivePage(pageName);

  // Load the html for the requested page.
  const pageContent = await getPageContent(`${pageName}/content`);

  // Create a new element to insert.
  const template = document.createElement('div');
  template.innerHTML = pageContent;

  const content = document.querySelector('.content');
  const contentWrapper = document.querySelector('.content-wrapper');
  // Replace the old content with the loaded content.
  contentWrapper.replaceChild(template.firstChild, content);

  UI.initTabs();
  UI.initSourceToggle();
  Prism.highlightAll();

  // Hide the loading statse.
  UI.toggleClass('.content', 'hidden', false);
  UI.toggleClass('.loading', 'hidden', true);

  // Hide the sidenav.
  toggleSideNav(false);
};

// Add the listener to toggle the sidenav when on mobile.
UI.addListener('#headerBars', 'click', (e) => {
  e.preventDefault();
  toggleSideNav();
});

UI.addListener('#sideNavClick', 'click', (e) => {
  e.preventDefault();
  toggleSideNav();
});

UI.addListener('.side-nav a', 'click', (e) => {
  e.preventDefault();

  const page = e.target.dataset.page;
  showPage(page);
});

UI.initTabs();
UI.initSourceToggle();

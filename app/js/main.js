const UI = require('./uiHelper');


const toggleSideNav = () => {
  UI.toggleClass('.side-nav', 'open');
  UI.toggleClass('.side-nav-click', 'open');
};

UI.addListener('#headerBars', 'click', (e) => {
  e.preventDefault();
  toggleSideNav();
});

UI.addListener('#sideNavClick', 'click', (e) => {
  e.preventDefault();

  toggleSideNav();
});

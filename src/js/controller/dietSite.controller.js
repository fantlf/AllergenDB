
techteamApp.controller('dietSiteCtrl', ['$router', dietSiteCtrl]);

function dietSiteCtrl($router) {
  $router.config([
    { path: '/',              redirectTo: '/home' },
    { path: '/home',          component: 'home' },
    { path: '/sevent',        component: 'sevent' },
    { path: '/sample',        component: 'sample' },
  ]);
}

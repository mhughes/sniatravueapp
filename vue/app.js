var App           = require('app.vue');
//var mainComponent = require('components/main-component.vue');

/*** Components ***/
/*** Components ***/

// function requireAuth (to, from, next) {
//   if (!Auth.loggedIn()) {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else {
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    component: require('components/home.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
});

const app = new Vue({
  router,
  render: h => h(App),
  data: {
    auth:     Auth,
    api_url:  Config.api_url,
    tools:    Tools,
  },
}).$mount('#app');

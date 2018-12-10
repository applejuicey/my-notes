import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/readnote/:noteid',
      name: 'noteDisplay',
      component: () => import('./views/NoteDisplay.vue')
    },
    {
      path: '/admin',
      component: () => import('./views/Admin/AdminRouterView.vue'),
      children: [
        {
          path: '',
          name: 'adminLogin',
          component: () => import('./views/Admin/AdminLogin.vue'),
        },
        {
          path: 'manageNote',
          component: () => import('./views/Admin/notesManagementRouterView.vue'),
          children: [
            {
              path: '',
              name: 'notesManagement',
              component: () => import('./views/Admin/notesManagement.vue'),
            },
            {
              path: ':noteID',
              name: 'noteManagement',
              component: () => import('./views/Admin/noteManagement.vue'),
            }
          ],
        },
        {
          path: 'createNote',
          name: 'createNote',
          component: () => import('./views/Admin/createNote.vue'),
        },
      ],
    },
    {
      name: '404',
      path: '*',
      component: () => import('./views/Page404.vue'),
      meta: {
        title: '404找不到页面'
      }
    },
  ]
})

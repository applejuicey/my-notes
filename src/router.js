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
      meta: {
        isRouterView: true,
        displayedName: '管理员首页',
      },
      children: [
        {
          path: '',
          name: 'admin',  //为了方便breadcrumb的使用，默认路径的name规定为和path相同
          component: () => import('./views/Admin/Admin.vue'),
          meta: {
            displayedName: '管理员首页',
          },
        },
        {
          path: 'listnotes',
          name: 'listNotes',
          component: () => import('./views/Admin/listNotes.vue'),
          meta: {
            displayedName: '管理所有笔记',
          },
        },
        {
          path: 'editnote/:noteid',
          name: 'editNote',
          component: () => import('./views/Admin/editNote.vue'),
          meta: {
            displayedName: '编辑笔记',
          },
        },
        {
          path: 'createnote',
          name: 'createNote',
          component: () => import('./views/Admin/createNote.vue'),
          meta: {
            displayedName: '新建笔记',
          },
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

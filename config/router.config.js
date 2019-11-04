export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/report' },
      {
        path: '/report',
        name: 'report',
        icon: 'file',
        component: './Report/list/List',
        // routes: [
        //   {
        //     path: '/report/list',
        //     name: 'list',
        //     component: './Report/list/List',
        //   },
        // ],
      },
      {
        path: '/news',
        name: 'news',
        icon: 'schedule',
        component: './News/List',
        // routes: [
        //   {
        //     path: '/news/list',
        //     name: 'list',
        //     component: './News/List',
        //   },
        // ],
      },
      {
        path: '/users',
        name: 'user',
        icon: 'user',
        component: './Users',
        // routes: [
        //   {
        //     path: '/users',
        //     name: 'list',
        //     component: './Users',
        //   },
        // ],
      },
      {
        path: '/picture',
        name: 'picture',
        icon: 'picture',
        component: './Picture/List',
        // routes: [
        //   {
        //     path: '/picture/list',
        //     name: 'list',
        //     component: './Picture/List',
        //   },
        // ],
      },
      {
        path: '/organization',
        name: 'organization',
        icon: 'team',
        component: './Organization/List',
        // routes: [
        //   {
        //     path: '/organization/list',
        //     name: 'list',
        //     component: './Organization/List',
        //   },
        // ],
      },
      {
        component: '404',
      },
    ],
  },
];

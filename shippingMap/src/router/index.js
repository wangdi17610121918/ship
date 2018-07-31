import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/views/layout/Layout'
import MapLayout from '@/views/layout/mapLayout'
import MainLayout from '@/views/layout/MainLayout'
/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '/',
    component: MapLayout,
    redirect: '/shipping/routemap/index'
  },
  {
    path: '/shipping/routemap',
    component: MapLayout,
    hidden: true,
    redirect: '/shipping/routemap/index',
    children: [{
      path: 'index',
      component: () => import('@/views/routemap/index'),
      name: 'ship',
      meta: { title: 'ship', icon: 'icon' }
    },
    {
      path: 'pirates-drills',
      component: () => import('@/views/routemap/piratesDrills/index'),
      name: 'piratesDrills',
      meta: { title: 'piratesDrills', icon: 'icon' }
    },
    {
      path: 'typhoon',
      component: () => import('@/views/routemap/typhoon/index'),
      name: 'typhoon',
      meta: { title: 'typhoon', icon: 'icon' }
    },
    //   path: 'shipsSearch',
    //   component: () => import('@/views/routemap/shipsSearch/index'),
    //   name: 'shipsSearch',
    //   meta: { title: 'shipsSearch', icon: 'icon' }
    // },
    {
      path: 'fleet',
      component: () => import('@/views/routemap/fleet/index'),
      name: 'fleet',
      meta: { title: 'fleet', icon: 'icon' }
    },
    // {
    //   path: 'portInquiry',
    //   component: () => import('@/views/routemap/portInquiry/index'),
    //   name: 'portInquiry',
    //   meta: { title: 'portInquiry', icon: 'icon' }
    // },
    {
      path: 'shipLines',
      component: () => import('@/views/routemap/lineSpeed/index'),
      name: 'shipLine',
      meta: { title: 'shipLine', icon: 'icon' }
    },
    {
      path: 'history',
      component: () => import('@/views/routemap/history/index'),
      name: 'history',
      meta: { title: 'history', icon: 'icon' }
    }
    ]
  },
  {
    path: '/shipping/shipHall',
    component: MainLayout,
    hidden: true,
    redirect: 'shipping/shipHall/index',
    children: [{
      path: 'index',
      component: () => import('@/views/shipHall/index'),
      name: 'shipHall',
      meta: { title: 'shipHall', icon: 'icon' }
    }
    ]
  },
  {
    path: '/shipping/mapInformation',
    component: MainLayout,
    hidden: true,
    redirect: 'shipping/mapInformation/index',
    children: [{
      path: 'index',
      component: () => import('@/views/mapInformation/index'),
      name: 'mapInformation',
      meta: { title: 'mapInformation', icon: 'icon' }
    }
    ]
  },
  {
    path: '/shipping/Cooperative',
    component: MainLayout,
    hidden: true,
    redirect: 'shipping/Cooperative/index',
    children: [{
      path: 'index',
      component: () => import('@/views/Cooperative/index'),
      name: 'cooperative',
      meta: { title: 'Cooperative', icon: 'icon' }
    }]
  },
  { path: '*', redirect: '/shipping/routemap/index', hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
//   {
//     path: '/permission',
//     component: Layout,
//     hidden: true,
//     redirect: '/permission/index',
//     alwaysShow: true, // will always show the root menu
//     meta: {
//       title: 'permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [{
//       path: 'page',
//       component: () => import('@/views/permission/page'),
//       name: 'pagePermission',
//       meta: {
//         title: 'pagePermission',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'directive',
//       component: () => import('@/views/permission/directive'),
//       name: 'directivePermission',
//       meta: {
//         title: 'directivePermission'
//         // if do not set roles, means: this page does not require permission
//       }
//     }]
//   },
//
//   {
//     path: '/icon',
//     component: Layout,
//     hidden: true,
//     children: [{
//       path: 'index',
//       component: () => import('@/views/svg-icons/index'),
//       name: 'icons',
//       meta: { title: 'icons', icon: 'icon', noCache: true }
//     }]
//   },
//
//   {
//     path: '/error',
//     component: Layout,
//     hidden: true,
//     redirect: 'noredirect',
//     name: 'errorPages',
//     meta: {
//       title: 'errorPages',
//       icon: '404'
//     },
//     children: [
//       { path: '401', component: () => import('@/views/errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
//       { path: '404', component: () => import('@/views/errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
//     ]
//   },
//
//   {
//     path: '/error-log',
//     component: Layout,
//     hidden: true,
//     redirect: 'noredirect',
//     children: [{ path: 'log', component: () => import('@/views/errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
//   },
//
//   {
//     path: '/theme',
//     component: Layout,
//     hidden: true,
//     redirect: 'noredirect',
//     children: [{ path: 'index', component: () => import('@/views/theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
//   },
//
//   {
//     path: '/i18n',
//     hidden: true,
//     component: Layout,
//     children: [{ path: 'index', component: () => import('@/views/i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
//   },
//
//   { path: '*', redirect: '/404', hidden: true }
// ]

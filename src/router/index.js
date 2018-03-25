import Vue from 'vue'
import Router from 'vue-router'
import bus from '../bus'

Vue.use(Router)

//base

const Index = resolve => require(['../views/Index'], resolve)

const Login = resolve => require(['../views/Login'], resolve)

const Home = resolve => require(['../views/demo/Home'], resolve)

const Forbidden = resolve => require(['../views/demo/403'], resolve)

const NotFound = resolve => require(['../views/demo/NotFound'], resolve)

const Icon = resolve => require(['../views/demo/Icon'], resolve)

const Demo = resolve => require(['../views/demo/Demo'], resolve)

const Frame = resolve => require(['../views/demo/VueFrame'], resolve)
// sys

const UserManager = resolve => require(['../views/sys/User'], resolve)

const RoleManager = resolve => require(['../views/sys/Role'], resolve)

// test

const Test = resolve => require(['../views/demo/Test'], resolve)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '//',
          name: '首页',
          component: Home,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/demo',
          name: 'demo',
          component: Demo,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        }, {
          path: '/icon',
          name: 'icon',
          component: Icon,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/sys/user',
          name: '用戶管理',
          component: UserManager,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            permissions:'sys-user'
          }
        },
        {
          path: '/sys/role',
          name: '角色管理',
          component: RoleManager,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            permissions:'sys-role'
          }
        },
        {
          path: '/403',
          name: '403',
          component: Forbidden
        },
        {
          path: '/test',
          name: 'test',
          component: Test
        },
        {
          path: '/frame',
          name: 'frame',
          component: Frame,
          props: (route) => ({ target: route.query.target })
        },{
          path: '/*',
          name: '404',
          component: NotFound,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          }
        }
      ]
    }]
});

router.beforeEach((to, from, next) => {
  if (to.path === "/logout") {
    bus.state.token = undefined;
    next({
      path: '/login'
    })
  }else{
    bus.state.menu_title = to.name;
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      // console.log('token:',bus.state.token!=null,bus.state.token,)
      if (bus.state.token!="undefined"&&bus.state.token) {  // 通过vuex state获取当前的token是否存在
        if(to.meta.permissions){
          if(bus.action.hasPermissions(bus,to.meta.permissions)){
            next();
          }else{
            bus.state.menu_title = '403'
            next('/403');
          }
        }else{
          next();
        }
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      next();
    }
  }
})

export default router;

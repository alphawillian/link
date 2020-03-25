import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home')
const Liehu = () => import('./views/Liehu')
const AddressHome = () => import('./views/AddressHome')
const AddressCity = () => import('./views/AddressCity')

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '附近优惠'
    }
  },
  {
    path: '/liehu',
    name: 'Liehu',
    component: Liehu,
    meta: {
      title: '附近商户'
    }
  },
  {
    path: '/addressHome',
    name: 'AddressHome',
    component: AddressHome,
    meta: {
      title: '地址更改'
    }
  },
  {
    path: '/addressCity',
    name: 'AddressCity',
    component: AddressCity,
    meta: {
      title: '城市选择'
    }
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new Router({
  routes,
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) { // 滚到顶部
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  console.log(to)
  document.title = to.meta.title
  document.querySelector('title').innerText = to.meta.title
  next()
})

// 路由完成之后的操作
router.afterEach((to, from) => {
  if (window.__qd__ && window.__qd__.page) {
    // 上报事件
    window.__qd__.page(to.fullPath, from.fullPath)
  }
})



export default router

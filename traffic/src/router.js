import Vue from 'vue'
import Router from 'vue-router'
import { sendPointFn } from './utils/utils'

const Index = () =>
  import('./views/index')
const City = () =>
  import('./views/city')
const Question = () =>
  import('./views/question')
const Course = () =>
  import('./views/course')
const MyCards = () =>
  import('./views/my-cards')
const CardDetail = () =>
  import('./views/card-detail')

Vue.use(Router)
const routes = [{
  path: '/index',
  name: 'index',
  meta: {
    title: '出行主页'
  },
  component: Index
}, {
  path: '/city',
  name: 'city',
  meta: {
    title: '出行主页'
  },
  component: City
}, {
  path: '/question',
  name: 'question',
  meta: {
    title: '常见问题'
  },
  component: Question
}, {
  path: '/course',
  name: 'course',
  meta: {
    title: '使用教程'
  },
  component: Course
}, {
  path: '/mycards',
  name: 'mycards',
  meta: {
    title: '我的权益卡'
  },
  component: MyCards
}, {
  path: '/carddetail',
  name: 'carddetail',
  meta: {
    title: '权益卡详情'
  },
  component: CardDetail
}, {
  path: '*',
  redirect: '/index'
}]
const router = new Router({
  routes,
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) { // 滚到顶部
    return { x: 0, y: 0 }
  }
})
// 全局路由配置 路由开始之前的操作
router.beforeEach((to, from, next) => {
  // 判断页面是否下线
  const pageData = window.data_source_100001819
  console.log('pageData:', pageData)
  if (!(pageData.online)) {
    location.href = 'https://pb.jd.com/common/offline/html/index.html?goto=https://m.jd.com/'
  }
  // 切换标题
  console.log('to', to)
  document.title = to.meta.title
  document.querySelector('title').innerText = to.meta.title
  sendPointFn(to.name)
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

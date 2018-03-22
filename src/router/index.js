import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/components/Index/Index'
import IndexNav from '@/components/Index/IndexNav'
import ModuleTemplate from '@/components/ClassSection/ModuleTemplate'
import ModuleList from '@/components/ClassSection/ModuleList' // 课程列表
// 视频
import Video from '@/components/Video/Video'
// 支付
import Order from '@/components/Dialogs/OrderPage'
// 个人中心
import Personal from '@/components/Personal/Personal'
import PersonalCourseList from '@/components/Personal/PersonalCourseList'
import PersonalOrderList from '@/components/Personal/PersonalOrderList'
import PersonalBalance from '@/components/Personal/PersonalBalance'
import PersonalVoucher from '@/components/Personal/PersonalVoucher'
// 资讯
import News from '@/components/News/News'
import NewsNav from '@/components/News/NewsNav'
// 错误
import NotFoundComponent from '@/components/Top/Mistakes'
import Download from '@/components/Top/PleaseDownloadApp'
// 登录和注册
import Login from '@/components/Log/Login'
import Register from '@/components/Log/Register'
import Forget from '@/components/Log/ForgetPage'
import About from '@/components/Top/About'
//
Vue.use(Router)
//
const routes = [{
    path: '/',
    components: {
      default: Index,
      page_nav: IndexNav
    },
    // 路由是有优先级的，先定义先匹配。
    children: [{
      path: '/page/:page_id',
      name: 'IndexModules',
      component: ModuleTemplate
    }, {
      path: '/page/4',
      name: 'Index',
      component: ModuleTemplate,
      alias: ''
    },{
      path: '/list/:list_id',
      name: 'ModuleList',
      component: ModuleList
    }]
  },
  // 课程视频：
  {
    path: '/video/course_id/:course_id',
    name: 'Video',
    components: {
      default: Video,
      page_nav: IndexNav
    },
  }, {
    path: '/video/course_id/:course_id/video_id/:video_id',
    name: 'VideoWithId',
    components: {
      default: Video,
      page_nav: IndexNav
    },
  },
  // 支付:
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  // 个人中心：
  {
    path: '/personal',
    components: {
      default: Personal,
      page_nav: IndexNav
    },
    beforeEnter: (to, from, next) => {
      if (!sessionStorage.getItem('user_id') || sessionStorage.getItem('user_id') == '') {
        next({
          path: '/mistakes',
        })
      } else {
        next()
      }
    },
    children: [{
      path: '',
      name: 'PersonalCourseList',
      component: PersonalCourseList,
      alias: 'courselist'
    }, {
      path: 'order',
      name: 'PersonalOrderList',
      component: PersonalOrderList
    }, {
      path: 'balance',
      name: 'PersonalBalance',
      component: PersonalBalance
    }, {
      path: 'voucher',
      name: 'PersonalVoucher',
      component: PersonalVoucher
    }]
  },
  // 资讯：
  {
    path: '/news',
    name: 'news',
    components: {
      default: News,
      page_nav: NewsNav
    }
  },
  // 下载APP:
  {
    path: '/app',
    name: 'App',
    component: Download
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  },
  // 版权页：
  {
    path: '/about/:page',
    name: 'about',
    component: About
  },
  // 404：必须在末尾
  {
    path: '*',
    component: NotFoundComponent
  },
]
export default new Router({
  mode: 'history',
  routes,
})

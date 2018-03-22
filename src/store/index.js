import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import md5 from 'js-md5'
import urls from '../common/js/urls.js'
Vue.use(Vuex)
const state = {
  // 测试结束
  user: {
    user_id: '',
    username: '',
    nickname: '',
    current_exam_type_id: '',
    image_url: '',
    sex: 0, //(1, '男'), (2, '女')
    token: '',
    type: 0, //(0, '普通用户'), (1, '老师'), (2, '助教'), (9, '测试帐号'),
    vip: 0,
  },
  index_module_page_id: '',
  index_nav: [],
  current_page_id: 0,
  index_right: {
    message: [],
    balls: [],
    topic: [],
    hslider: [],
    hfive: [],
  },
  pages: {
    my_course: {}
  }, //通用的页面数据
}
const store = {
  state,
  mutations: {
    // 账号：
    userLogin(state, user_info) {
      for (var key in user_info) {
        state.user[key] = user_info[key]
        sessionStorage.setItem(key, state.user[key])
      }
      return state.user
    },
    keep_user_login(state) {
      if (state.user.user_id != '') return false
      for (var key in state.user) {
        state.user[key] = sessionStorage.getItem(key)
      }
    },
    update_user(state, user_info) {
      if (!user_info) return false
      for (var key in user_info) {
        state.user[key] = user_info[key]
        sessionStorage.setItem(key, state.user[key])
      }
    },
    user_logout(state) {
      for (var key in state.user) {
        state.user[key] = ''
        sessionStorage.setItem(key, '')
      }
    },
    // 首页：
    setIndexModulePageId(state, page_id) {
      state.index_module_page_id = page_id
    },
    setIndexNav(state, obj) {
      state.index_nav = obj
    },
    setSearchMsg(state, str) {
      state.search_msg = str
    },
    setPages(state, arr) {
      var page_id = arr[0],
        page_data = arr[1]
      if (!state.pages[page_id]) {
        state.pages[page_id] = {
          hasBought: []
        }
      }
      for (var key in page_data) {
        state.pages[page_id][key] = page_data[key]
      }
    },
    setIndexRightMessage(state, obj) {
      state.index_right.message = obj
    },
    setIndexRightBalls(state, obj) {
      state.index_right.balls = obj
    },
    setIndexRightTopic(state, obj) {
      state.index_right.topic = obj
    },
    setIndexRightHslider(state, obj) {
      state.index_right.hslider = obj
    },
    setIndexRightHfive(state, obj) {
      state.index_right.hfive = obj
    },
    setCurrentPageId(state, pid) {
      state.current_page_id = pid
    },
    getUserId(state) {
      return state.user.user_
    }
  },
  actions: {
    setCurrentPageId(context, pid) {
      // 新的路由id进来就更新缓存
      if (pid instanceof Array && pid[0] == 'my_course') {
        axios.post(urls.my_course + '?userid=' + pid[1]).then((response) => {
          context.commit('setPages', [pid[0], response.data.result])
          // 更新路由会连带着更新页面，要确定页面数据加载完成后再更新
          context.commit('setCurrentPageId', pid[0])
        }).catch((response) => {
          console.log(response)
        })
      } else {
        axios.get(urls.by_page + '?page_id=' + pid).then((response) => {
          context.commit('setPages', [pid, response.data.cate_info])
          // 更新路由会连带着更新页面，要确定页面数据加载完成后再更新
          context.commit('setCurrentPageId', pid)
        }).catch((response) => {
          console.log(response)
        })
      }
    },
    userLogin(context, user_info) {
      if (!user_info || !user_info.username || user_info.username == '' || !user_info.password || user_info.password == '') return false
      axios.post(urls.login + "?username=" + user_info.username + "&password=" + md5(user_info.password)).then(function(response) {
        if (response.data.code != 200) {
          alert(response.data.msg)
          return false
        }
        context.commit('userLogin', response.data.result.userinfo)
      })
    }
  },
  getters: {
    current_page: (state) => {
      return state.pages[state.current_page_id] || {}
    },
  },
}
export default new Vuex.Store(store)

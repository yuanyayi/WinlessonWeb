<!-- 首页左侧分栏 -->
<template>
  <div id="index_left">
    <div v-if="!pageData.page">稍等一下，数据马上加载...</div>
    <div v-else v-for="(module, index) in moduleList" >
      <index-carousel v-if="module.content_module_type==1" :module="module" :key="module.id"></index-carousel>
      <class-section-live v-if="module.content_module_type==3" :module="module" :key="module.id"></class-section-live>
      <class-section v-if="module.content_module_type==4" :module="module" :key="module.id"></class-section>
      <class-section-offline v-if="module.content_module_type==5" :module="module" :key="module.id"></class-section-offline>
    </div>
  </div>
</template>
<script>
  import urls from 'common/js/urls.js'
  import IndexCarousel from "./IndexCarousel"
  import ClassSectionLive from "./ClassSectionLive"
  import ClassSectionOffline from "./ClassSectionOffline"
  import ClassSection from "./ClassSection"
  export default {
    name: "module",
    components: {
      IndexCarousel,
      ClassSectionLive,
      ClassSectionOffline,
      ClassSection,
    },
    data() {
      return {
        moduleList: [],
        // slideshow: [], //1-首页轮播图
        message: [], // 2-滚动消息
        // livevideo: [], // 3-直播课
        // course: [], // 4-课程
        // offlinecourse: [], // 5-线下课程
        banner: [], // 6-Banner图
        hfive: [], // 7-h5卡片
        hslider: [], // 8-横滑卡片
        balls: [], // 9-球区
        topic: [], // 10-话题
        pageId: '',
        pagetitle: ''
      }
    },
    computed: {
      page_route_id() {
        return this.$route.params.page_id
      },
      pageData() {
        return this.$store.getters.current_page
      },
      user() {
        return this.$store.state.user
      }
    },
    created: function() {
      this.updateRouteId()
    },
    watch: {
      pageData: function(val) {
        if (val.page) this.newPage(val)
      },
      page_route_id: function(val) {
        this.updateRouteId()
      },
      'user.user_id': {
        handler: function(val, oldVal) {
          this.newPage(this.pageData)
        },
        deep: true
      }
    },
    methods: {
      updateRouteId: function() {
        var route_id = this.$route.params.page_id || this.$store.state.index_module_page_id;
        this.$store.dispatch('setCurrentPageId', route_id).then(() => {
          this.newPage(this.pageData)
        })
      },
      newPage: function(val) {
        // 页面模块整理
        if (!val.page) {
          console.log('ModuleTemplate has not found pageData.page.');
          return false;
        }
        var _this = this
        let index_page_id = this.$store.state.index_module_page_id
        // 基本页面内容
        // 防止重复进行清空：
          _this.moduleList = [], //模块列表
          _this.message = [], // 滚动消息
          _this.banner = [], // Banner图
          _this.hfive = [], // h5卡片
          _this.hslider = [], // 横滑卡片
          _this.balls = [], // 球区
          _this.topic = []; //话题
        for (var i = 0; i < val.page.modules.length; i++) {
          var module = val.page.modules[i]
          switch (module.content_module_type) {
            case 1: //轮播图
              _this.moduleList.push(module)
              break;
            case 2: // 滚动消息
              _this.message.push(module)
              break;
            case 3: // 直播课
              _this.cidfilter(module, 'livevideo')
              break;
            case 4: // 课程
              _this.cidfilter(module, 'course')
              break;
            case 5: // 线下课程
              _this.moduleList.push(module)
              break;
            case 6: // Banner图
              _this.banner.push(module)
              break;
            case 7:
              _this.hfive.push(module)
              break;
            case 8: // 横滑卡片
              _this.hslider.push(module)
              break;
            case 9: // 球区
              _this.balls.push(module)
              break;
            case 10: // 话题
              _this.topic.push(module)
              break;
            default:
              console.log("此页面出现了不确定的模块")
              break;
          }
        }
        this.pageId = val.content_page_id || index_page_id;
        this.pagetitle = val.title;
        if (index_page_id == this.pageId) {
          this.$store.commit('setIndexRightMessage', _this.message)
          this.$store.commit('setIndexRightBalls', _this.balls)
          this.$store.commit('setIndexRightTopic', _this.topic)
          this.$store.commit('setIndexRightHslider', _this.hslider)
          this.$store.commit('setIndexRightHfive', _this.hfive)
        }
      },
      cidfilter: function(module, name) { //根据课程id设置购买状态
        var _this = this
        // 如果没人登录，购买状态置为空
        if (!_this.user.user_id || _this.user.user_id == '') {
          for (var j = 0; j < module['contentpage' + name + '_datas'].length; j++) {
            module['contentpage' + name + '_datas'][j].bought = false
          }
          _this.moduleList.push(module)
          return true
        }
        // loop1: 请求是否购买过
        var temp = '',
          arr = []
        for (var j = 0; j < module['contentpage' + name + '_datas'].length; j++) {
          temp += module['contentpage' + name + '_datas'][j].course.course_id.toString() + ','
        }
        _this.axios.get(urls.list_by_id + '?user_id=' + _this.user.user_id + '&course_ids=' + temp).then(function(response) {
          for (var k in response.data.user_course_list) {
            arr.push(response.data.user_course_list[k].course_id.toString())
          }
          // loop2: 给item增加一个字段：
          for (var j = 0; j < module['contentpage' + name + '_datas'].length; j++) {
            for (var k = 0; k < arr.length; k++) {
              if (module['contentpage' + name + '_datas'][j].course.course_id == arr[k]) {
                module['contentpage' + name + '_datas'][j].bought = true
              }
              continue
            }
          }
          // 下一步：
          _this.moduleList.push(module)
        }).catch(function(error) {
          _this.moduleList.push(module)
        })
      }
    }
  }

</script>
<style lang="less">
  @import url("../../common/style/var.less");
  @icon: "../../common/images/";
  #index_left {
    &>* {
      margin-bottom: 20px;
    }
    .banner {
      height: 240px;
      overflow: hidden;
      background: #ccc;
    }
  } // 课程右上控制器轮播图
  .right-controler {
    @t_height: 50px;
    ul.am-direction-nav {
      display: inline-block;
      width: auto;
      position: absolute;
      top: -@t_height;
      right: 0;
      height: @t_height;
      line-height: @t_height;
      color: transparent;
      li {
        vertical-align: middle;
        display: inline-block;
        margin-left: 15px;
        margin-right: 0;
        a {
          display: block;
          opacity: 1;
          width: 25px;
          height: 25px;
          .one_bg_img;
          cursor: pointer;
        }
        a.am-prev {
          background-image: url("@{icon}prev.png");
        }
        a.am-next {
          background-image: url("@{icon}next.png");
        }
      }
    } // 左右
    ol.am-control-nav {
      top: -@t_height;
      right: 80px;
      width: auto;
      height: @t_height;
      line-height: @t_height;
      color: transparent;
      li {
        height: 8px;
        vertical-align: middle;
        margin-right: 8px;
        a {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.10);
        }
        a.am-active {
          background: rgba(0, 0, 0, 0.40);
        }
      }
    } // 页码
  }

</style>

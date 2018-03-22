<!-- 首页显示框架 -->
<template>
  <div class="container-fluid main">
    <!-- *************************************视频页主页面******************************************* -->
    <div class="main_left" :data-course_id="course_info.course_id">
      <!-- 课程视频播放区 -->
      <div id="bsk_class_media">
        <div id="class-video">
          <img :src="course_info.course_cover"> </div>
        <h3>{{course_info.course_name}}</h3>
      </div>
      <!-- 课程播放详情页的标签页 -->
      <div id="bsk-class-tabs" class="am-tabs" data-am-tabs>
        <!-- 标题 -->
        <ul class="am-tabs-nav am-nav am-nav-tabs flex">
          <li class="am-active"><a href="javascript:void(0)">课程详情</a></li>
          <li><a href="javascript:void(0)">课程表</a></li>
          <li><a href="javascript:void(0)">互动</a></li>
        </ul>
        <!-- 内容 -->
        <div id="bskClassContent" class="am-tabs-bd">
          <!-- 课程详情的图片 -->
          <div class="am-tab-panel am-active">
            <div v-show="course_info.intro_pic_crops.length>0" v-for="intro_pic in course_info.intro_pic_crops">
              <img :src="intro_pic"> </div>
            <div v-show="!course_info.intro_pic_crops.length>0">
              <img :src="course_info.intro_pic"> </div>
          </div>
          <!-- 课程表 -->
          <div class="am-tab-panel">
            <video-table v-for="module in video_table.videoList" :video_table="module" :current_id="video_now.videoId" :key="module.id"></video-table>
          </div>
          <!-- 互动 -->
          <div class="am-tab-panel">
            <ul class="discuss_list">
              <interaction-li v-for="(item, index) in chatList" :key="index" :item="item"></interaction-li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 课程播放详情页的标签页-结束 -->
    </div>
    <!-- *************************************视频页右侧模块******************************************* -->
    <aside id="bsk_class_info" class="main_right">
      <section>
        <!-- 一张封面图 -->
        <div class="frame">
          <img :src="course_info.course_cover"> </div>
        <!-- 评分 -->
        <div class="border rank-box cf">
          <div class="fl">{{course_info.average_score}}</div>
          <p>
            <rank-stars :point="course_info.average_score" class="large"></rank-stars>
          </p>
          <p>{{course_info.evaluate_num}}人评价</p>
        </div>
        <!-- 课时-人数-咨询 -->
        <ul class="flex">
          <li class="border"><i class="icon-video"></i>{{course_info.video_num}}课时</li>
          <li class="border"><i class="icon-people"></i>{{course_info.subscribe_num}}人听课</li>
          <li class="border"><a href="http://wpa.qq.com/msgrd?v=3&uin=2143880238&site=qq&menu=yes"><i class="icon-service"></i><b>咨询课程</b></a></li>
        </ul>
        <!-- 价格 -->
        <button v-show="has_buy" class="unabled">已购买</button>
        <button v-show="!has_buy" @click.stop.prevent="gotoOrder">￥{{course_info.course_price}} 立即购买</button>
      </section>
      <!-- 讲义 -->
      <div class="download" v-if="course_info.handouts_url">
        <button :title="course_info.handouts_name"><a :href="course_info.handouts_url" target="_blank"><i class="icon-download"></i><b>下载课程讲义</b></a></button>
      </div>
      <!-- 主讲教师 -->
      <ul class="teachers">
        <h4>主讲教师</h4>
        <li v-for="teacher in course_info.teachers" :data-teacher_id="teacher.teacher_id">
          <div class="frame">
            <img :src="teacher.teacher_head"> </div>
          <h5>{{teacher.teacher_name}}</h5>
          <p>{{teacher.ranks}}</p>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
  // js库
  import urls from 'common/js/urls.js'
  // 组件
  import InteractionLi from './InteractionLi'
  import VideoTable from './VideoTable'
  import RankStars from "../ClassSection/RankStars"
  export default {
    name: "video-page",
    components: {
      InteractionLi,
      VideoTable,
      RankStars,
    },
    data() {
      return {
        course_info: {
          saleStopTime: '',
          average_score: 10,
          video_num: 0,
          course_desc: '',
          tag: {},
          handouts_name: "",
          handouts_url: '',
          course_id: '',
          need_address: 1,
          course_name: '',
          subscribe_num: 0,
          evaluate_num: 0,
          is_live: 0,
          course_cover: '',
          teachers: [],
          course_price: 0,
          intro_pic_crops: [],
          teacher_super_cover: '',
          intro_pic: '',
          apple_id: '',
          apple_price: ''
        },
        has_buy: false,
        course_list_name: '课程表',
        latest_video_record: {},
        video_table: {
          timestamp: '0000000000',
          title: '',
          videoList: []
        },
        video_now: {
          beyondTime: 0,
          canPlayNum: 999999,
          channelId: '',
          chapterId: '',
          courseId: '',
          createTime: '',
          duration: 0,
          endTime: '',
          glFileId: '',
          handoutsUrl: '',
          hls_url: '',
          isLive: 0,
          is_vip: 0,
          liveUrl: '',
          startTime: '',
          videoAdressMp4Bq: '',
          videoId: '',
          videoIndex: '1',
          videoName: "",
          videoSize: 0,
          videoTypeId: '',
          live_status: false, //增加的需要重新请求
        },
        chatList: [],
        video_player: {},
      } //return end.
    },
    computed: {
      router_course_id() {
        return this.$route.params.course_id
      },
      router_video_id() {
        return this.$route.params.video_id
      },
      current_user() {
        return this.$store.state.user
      }
    },
    watch: {
      video_now(val) {
        this.video_player = this.createVideoPlayer()
      },
      'current_user.user_id': {
        handler: function(val, oldVal) {
          this.getCourseDetail(this.router_course_id)
        },
        deep: true
      },
      has_buy(val, oldVal) {
        if(val && !oldVal ) this.video_player = this.createVideoPlayer()
      }
    },
    mounted: function() {
      var _this = this
      this.getCourseDetail(this.router_course_id)
      this.getCourseVideos(this.router_course_id, this.router_video_id)
      // 2秒拉取一次互动信息。
      if (this.video_now.isLive) {
        this.chat_timer = setInterval(function() {
          if (!_this.router_course_id || _this.router_course_id == '') return false
          _this.getChatList(_this.router_course_id)
        }, 2000)
      }
    },
    destroyed: function() {
      clearInterval(this.chat_timer)
      this.addVideoRecord()
      $('.vcp-player').remove()
    },
    methods: {
      // 获取课程信息
      getCourseDetail: function(course_id) {
        if(this.current_user.login=='') return false;
        var temp_url = urls.course_detail + "?course_id=" + course_id
        if (this.current_user.user_id && this.current_user.user_id != '') {
          temp_url += '&user_id=' + this.current_user.user_id
        }
        this.axios.get(temp_url).then((response) => {
          if (response.data.code != 200) return false;
          if (this.has_buy) return false;
          // course_info:
          for (var key in response.data.course_info) {
            this.course_info[key] = response.data.course_info[key]
          }
          // 其他信息
          var tempArr = ['course_list_name', 'latest_video_record', 'has_buy'];
          for (var index in tempArr) {
            if (response.data[tempArr[index]] == '') continue
            this[tempArr[index]] = response.data[tempArr[index]]
          }
        })
      },
      // 获取视频列表
      getCourseVideos: function(course_id, video_id) {
        var _this = this
        this.axios.get(urls.course_videos + "?courseId=" + course_id).then((response) => {
          if (response.data.code != 200) return false;
          for (var key in response.data.result) {
            _this.video_table[key] = response.data.result[key]
          }
          // 默认播放第一个视频
          if ((!video_id || video_id == '') && (_this.video_table.videoList[0])) {
            for (var key in _this.video_table.videoList[0].videos[0]) {
              _this.video_now[key] = _this.video_table.videoList[0].videos[0][key]
            }
          }
          // 指定video_id的：
          else {
            _this.gotoVideoById(video_id)
          }
          _this.video_player = _this.createVideoPlayer()
        })
      },
      // 根据video_id更改video_now
      gotoVideoById: function(video_id, fromchild=0) {
        this.addVideoRecord()
        for (var i = 0; i < this.video_table.videoList.length; i++) {
          for (var j = 0; j < this.video_table.videoList[i].videos.length; j++) {
            // 遍历videoList，查找指定的video==item
            var item = this.video_table.videoList[i].videos[j];
            // 找到了：
            if (item.videoId == video_id) {
              // 判断直播状态：
              if (this.item && this.item.isLive) {
                this.axios.post(urls.live_status + '?userid=' + this.current_user.user_id + '&channelId=' + this.item.channelId + '&videoId=' + this.item.videoId).then(function(response) {
                  if (response.data.code != 200) {
                    // 视作视频不能播放
                    _this.video_now.live_status = false
                    this.video_player = this.createVideoPlayer()
                    return false;
                  }
                  var res = response.data.result
                  if (res.liveStatus == 0) {
                    _this.video_now.live_status = false
                    return false;
                  }
                  _this.video_now.live_status = true
                });
              }
              //复制item信息进入video_now
              for (var key in item) {
                this.video_now[key] = item[key];
              }
              if(fromchild && (!this.video_now.glFileId || this.video_now.glFileId=='')) {
                alert("直播尚未开始，请稍后再来~")
                return false;
              }
              this.video_player = this.createVideoPlayer()
              return true;
            }
          }
        }
      },
      // 创建视频播放窗口
      createVideoPlayer: function(opt) {
        var _this = this
        $('.vcp-player').remove()
        if(!this.video_now.glFileId || this.video_now.glFileId=='') {
          return false;
        }
        // 创建播放器
        var opt = opt || {};
        var option = {
          "app_id": "1251323988",
          "channel_id": this.video_now.channelId,
          "file_id": this.video_now.glFileId,
          "width": 600,
          "height": 338,
          "cache_time": 0.3,
          "wording": {
            '10000': '请求超时,请检查网络设置',
            '11046': '密码错误，请重新输入',
            '20110': '密码错误，请重新输入',
            '20113': '直播源不存在(20113)',
            '1009': '直播源已失效(1009)',
            '3': '直播源已结束',
            '1001': '无效参数',
            TIP_REQUIRE_SAFARI: '当前浏览器不能支持视频播放,请使用safari打开观看',
            TIP_REQUIRE_FLASH: '当前浏览器不能支持视频播放，可下载最新的QQ浏览器或者安装FLASH即可播放'
          },
          "auto_play": 1,
          "coverpic": _this.course_info.course_cover,
          "live": _this.video_now.isLive,
          "controls": "default",
          "x5_type": "h5",
          "stop_time": this.has_buy ? 0 : 180, //seconds
        }
        for (var key in opt) {
          option[key] = opt[key];
        }
        return new qcVideo.Player('class-video', option);
      },
      // 上传视频观看记录
      addVideoRecord: function() {
        if (!this.has_buy) return false
        if (!this.current_user.user_id || this.current_user.user_id=='') return false
        if (!this.video_player.id) return false
        this.axios.post(urls.add_video_record + '?userid=' + this.current_user.user_id + '&courseId=' + this.course_info.course_id + '&videoId='+this.video_now.videoId+'&playedTime='+this.video_player.getCurrentTime())
      },
      // 互动：
      getChatList: function(course_id) {
        var _this = this;
        this.axios.post(urls.getChatList + '?courseId=' + course_id).then(function(response) {
          _this.chatList = response.data.result.chatList;
        });
      },
      // 前往订单
      gotoOrder: function() {
        if (this.course_info.course_price > 0) {
          this.$router.push({ name: 'Order', query: { pId: this.course_info.course_id } })
          return false
        }
        // 处理免费课程：
        else if (!this.current_user.user_id || this.current_user.user_id == '') {
          this.$router.push({ path: '/login' })
        } else {
          var _this = this
          this.axios.post(urls.add_to_mycourse + '?userid=' + this.current_user.user_id + '&courseId=' + this.course_info.course_id).then(function(response) {
            if (response.data && response.data.code == 200) {
              _this.has_buy = true
              _this.getCourseDetail(_this.router_course_id)
            } else {
              alert("抱歉请求没有成功，请稍后再试~")
            }
          }).catch(function() {
            alert("因为网络问题，请求没有成功，请稍后再试~")
          })
        }
      },
    }
  }

</script>
<style lang="less">
  @import "../../common/style/var.less";
  /**************** 课程播放详情页 ***************/

  #bsk-class-tabs {
    @this_h: 60px;
    border: 1px solid @sep;
    border-radius: 2px;
    padding: 0 30px 20px; // 标签
    .am-tabs-nav {
      width: 100%;
      height: @this_h;
      line-height: @this_h;
      border: none;
      margin-bottom: 20px;
      position: relative;
      li {
        height: 100%;
        text-align: center;
        border: none;
        a {
          height: 100%;
          line-height: @this_h;
          margin-right: 0;
          padding: 0;
          font-size: 16px;
          &:hover {
            background: #fff;
            font-weight: bolder;
            border: none;
          }
        }
      }
      li.am-active {
        border: none;
        a {
          border: none;
        }
        &:after {
          content: "";
          display: block;
          height: 4px;
          border-radius: 4px;
          background-color: @theme;
        }
      }
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .1);
        position: absolute;
        bottom: -4px;
        z-index: -1;
      }
    } // 课程表
    .am-table-hover>tbody>tr {
      cursor: default;
      i {
        display: none;
      }
      &.cur {
        i {
          display: inline-block;
        }
        td {
          background-color: @bg_light;
        }
      }
      &:hover {
        td {
          background: #fff;
        }
        span {
          color: #fff;
          background-color: @theme_red;
        }
      }
    } // 内容
    .am-tabs-bd {
      border: none;
      table {
        color: @default;
        thead {
          background: @bg_dark;
          border: none;
          color: @font;
        }
        td.small {
          width: 80px !important;
          font-size: 100%;
        }
        td {
          border-top: none;
          border-bottom: 1px solid @bg_dark;
        }
        td.grey {
          color: @font_unabled;
        }
        td.wide {
          width: 120px;
          text-align: center;
        }
      }
      .b1 tbody td:first-child, .b3 tbody td:nth-child(3) {
        color: @theme_red;
        .font-b;
        font-size: 14px;
      } // 用户回复
      // .user_response {
      //   margin-bottom: 20px;
      //   &:after {
      //     .cf_after;
      //   }
      //   textarea {
      //     display: block;
      //     resize: none;
      //     width: 100%;
      //     height: 120px;
      //     padding: 10px;
      //     line-height: 20px;
      //   }
      //   button {
      //     width: 80px;
      //     height: 32px;
      //     line-height: 32px;
      //     float: right;
      //     margin-top: 15px;
      //   }
      // }
      // 互动展示
      .discuss_list {
        li+li {
          margin-top: 30px;
        }
        li {
          font-size: 12px;
          &:after {
            .cf_after;
          }
          .frame {
            width: 41px;
            height: 41px;
            float: left;
            margin-right: 15px;
          }
          .name {
            .font-b;
            color: @theme_red;
            .fr {
              .font-r;
              color: @font_light;
              .from {
                color: @font_unabled;
              }
            }
          }
          p {
            margin-left: 41 + 15px;
          }
          .content {
            font-size: 14px;
          }
        }
        p.divide {
          margin-top: 15px;
          margin-bottom: 15px;
          .font-r;
          color: @font_light;
          text-align: center;
          position: relative;
          span {
            padding-left: 38px;
            padding-right: 38px;
            background: #fff;
          }
          &:after {
            content: "";
            height: 1px;
            width: 100%;
            background: @sep;
            position: absolute;
            top: 50%;
            left: 0;
            z-index: -1;
          }
        }
      }
    }
    .v_code {
      .frame {
        width: 300px;
        height: 300px;
        margin: 40px auto 15px;
      }
      p {
        font-size: 14px;
        .font-r;
      }
    }
  }
  /*************** 课程详情播放区 ***************/

  #bsk_class_media {
    h3 {
      margin-bottom: 40px;
    }
    button {
      display: block;
    }
  }
  #class-video {
    width: 600px;
    height: 338px;
    margin-bottom: 30px;
    position: relative;
    img {
      position: absolute;
    }
    &:after {
      content: "";
      display: block;
      width: 612px;
      height: 350px;
      position: absolute;
      border: 1px solid #e5e5e5;
      top: -6px;
      left: -6px;
      z-index: -1;
    }
  }
  #bsk_class_info {
    section {
      border-radius: 4px;
      overflow: hidden;
    }
    overflow: hidden;
    button {
      width: 100%;
      height: 50px;
      padding: 14px;
      line-height: 22px;
      .font-b;
      font-size: 16px;
      &.unabled {
        background-color: @unabled !important;
      }
    } // 课程的封面图
    .frame {
      width: 300px;
      height: 168px;
    }
    .border {
      border: 1px solid #e5e5e5;
    } // 评分
    .rank-box {
      padding: 20px;
      .fl {
        .font-b;
        font-size: 36px;
        margin-right: 20px;
        line-height: 50px;
      }
      .rank {
        width: 148px;
        height: 22px;
        margin-bottom: 6px;
      }
    } // 课时-人数-咨询
    ul.flex {
      .font-r;
      font-size: 12px;
      li {
        width: 100px;
        height: 40px;
        border-top: none !important;
        text-align: center;
        line-height: 40px;
      }
      li+li {
        border-left: none !important;
      }
    } // 价格
    button {
      border-radius: 0;
      background-color: @theme_red;
    } // 讲义
    .download {
      button {
        .border;
        background: #FFFFFF;
        border-radius: 4px;
      }
      margin-top: 20px;
    } // 主讲教师
    .teachers {
      margin-top: 20px;
      h4 {
        margin-bottom: 10px;
      }
      &:after {
        .cf_after;
      }
      li {
        width: 90px;
        margin-right: 15px;
        float: left;
        .frame {
          width: 100%;
          height: 90px;
          margin-bottom: 10px;
        }
        h5 {
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 7px;
        }
        p {
          font-size: 12px;
          color: @font_light;
        }
      }
      li:nth-of-type(3n) {
        margin-right: 0;
      }
      li:nth-of-type(n+4) {
        margin-top: 20px;
      }
    }
  }

</style>

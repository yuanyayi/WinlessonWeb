<template>
  <div id="personal_course_list">
    <h3>我的课程</h3>
    <div class="section">
      <h4>直播课</h4>
      <ul class="class_card_list circle_list col-2">
        <li @click="gotoVideoCourse(item.courseId)" v-for="(item,index) in livevideo" class="animate">
          <div class="frame circle">
            <img v-if="item.teacherInfo.length>0" :src="item.teacherInfo[0].teacherPic">
            <img v-else :src="item.courseCover">
          </div>
          <h5 :title="item.courseName">{{item.courseName}}</h5>
          <p class="times"><i class="icon-time"></i><b class="light">{{item.saleStopTime.split("T")[0].split("-")[1]}}月{{item.saleStopTime.split("T")[0].split("-")[2]}}日</b> {{item.saleStopTime.split("T")[1].slice(0,5)}}</p>
          <p class="people"><i class="icon-people"></i><b>{{item.subscribeNum}}</b>人报名</p>
        </li>
      </ul>
    </div>
    <div class="section">
      <h4>普通课程</h4>
      <ul class="class_card_list regular_list col-2">
        <li v-for="item in course" @click="gotoVideoCourse(item.courseId)" class="class_card_normal">
          <div class="frame">
            <img :src="item.courseCover">
            <div class="frame_mask">
              <button v-if="item.coursePrice<=0" @click.stop.self="gotoVideoCourse(item.courseId)">免费观看</button>
              <button v-else @click.stop.self="gotoOrder(item.courseId)">¥{{item.coursePrice}} 立即购买</button>
            </div>
          </div>
          <div class="class_card_info">
            <p class="cf"> <span v-if="item.tag" class="tag">{{item.tag.name}}</span>
              <rank-stars :point="item.averageScore"><b>{{item.averageScore}}</b></rank-stars>
            </p>
            <h5 class="title" :title="item.courseName">{{item.courseName}}</h5>
            <div class="oneline">
              <p class="times"><i class="icon-video"></i><b>{{item.videoNum}}</b> 课时</p>
              <p class="people"><i class="icon-people"></i><b>{{item.subscribeNum}}</b>人听课</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import urls from 'common/js/urls.js'
  import RankStars from "components/ClassSection/RankStars"
  export default {
    name: "personal-course-list",
    components: {
      RankStars
    },
    mounted: function() {
      this.updateRouteId();
      if (this.pageData) this.newPage(this.pageData);
    },
    computed: {
      pageData() {
        return this.$store.getters.current_page
      },
      user() {
        return this.$store.state.user
      }
    },
    watch: {
      pageData: function(val) {
        this.newPage(val);
      },
      'user.user_id': {
        handler: function(val, oldVal) {
          this.updateRouteId();
        },
        deep: true
      }
    },
    methods: {
      updateRouteId: function() {
        if (!this.user || !this.user.user_id || this.user.user_id == '') return false
        this.$store.dispatch('setCurrentPageId', ['my_course', this.user.user_id]).then(() => {
          this.newPage(this.pageData)
        })
      },
      newPage: function(val) {
        var _this = this;
        // 基本页面内容
        this.livevideo = [] // 直播课
        this.course = [] // 课程
        // 页面模块整理
        if (!val.myCourseList) return false;
        for (var i = 0; i < val.myCourseList.length; i++) {
          var module = val.myCourseList[i];
          switch (module.isLive) {
            case 1: // 直播课
              _this.livevideo.push(module);
              break;
            default: // 课程
              _this.course.push(module);
              break;
          }
        }
      },
      gotoVideoCourse(course_id) {
        this.$router.push({ path: "/video/course_id/" + course_id })
      }
    },
    data() {
      return {
        livevideo: [], // 3-直播课
        course: [], // 4-课程
        pageId: '',
        pagetitle: '',
      }
    },
  }

</script>
<style lang="less">
  @import url("../../common/style/var.less");
  #personal_course_list {
    h3 {
      margin-bottom: 22px;
    }
    h4 {
      margin-bottom: 20px;
    }
    .class_card_normal .frame:hover .frame_mask {
      display: none !important;
    }
    .circle_list {
      li {
        width: 270px;
        height: 113px;
        border: 1px solid @sep;
      }
      li .frame:after {
        display: block;
      }
      li p, li h5 {
        width: auto;
      }
    }
  }
  // 复制过来的样式
  .class_card_normal {
    width: 270px;
    border: 1px solid @sep;
    margin-right: 20px;
    margin-bottom: 20px;
    .frame {
      width: 270px;
      height: 152px;
      position: absolute;
      top: -1px;
      left: -1px;
      .frame_mask {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .4);
        button {
          display: block;
          position: relative;
          margin: auto;
          right: 0;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: auto; // 样式
          height: 32px;
          line-height: 22px;
          color: #fff;
          background-color: rgba(255, 255, 255, .5);
          padding: 5px 10px;
          text-align: center;
          .font-m;
          font-size: 16px;
          border-radius: 0;
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
        }
      }
      &:hover .frame_mask {
        display: block;
      }
    }
    .class_card_info {
      position: relative;
      top: -1px;
      padding: 10px;
      .title {
        .font-m;
        font-size: 14px;
        color: @default;
        .one_line_text;
        margin-bottom: 5px;
      }
      .tag {
        display: block;
        height: 18px;
        line-height: 16px;
        padding: 0 5px;
        float: left;
        border: 1px solid @sep;
        background-color: @bg_light;
        color: @font;
        .font-r;
        font-size: 12px;
        border-radius: 2px;
        margin-right: 10px;
      }
      .oneline {
        font-size: 12px;
        .font-r;
        color: @font_light;
        .rank {
          vertical-align: -2px;
          margin-right: 5px;
        }
      }
      .oneline>p+p {
        margin-left: 10px;
      }
    }
  }

</style>

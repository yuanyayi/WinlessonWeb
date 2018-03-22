<template>
  <li class="class_card_normal" @click="gotoVideoCourse(item.course.course_id)" :class="{bought:item.bought}">
    <div class="frame">
      <img :src="item.course.course_cover">
      <div class="frame_mask">
        <button v-if="item.course.course_price<=0" @click.stop.self="gotoVideoCourse(item.course.course_id)">免费观看</button>
        <button v-else @click.stop.self="gotoOrder(item.course.course_id)">¥{{item.course.course_price}} 立即购买</button>
      </div>
    </div>
    <div class="class_card_info">
      <p class="cf" style="margin-bottom: 5px;"> <span v-if="item.course.tag" class="tag">{{item.course.tag.name}}</span>
        <rank-stars :point="item.course.average_score"><b>{{item.course.average_score}}</b></rank-stars>
      </p>
      <h5 class="title" :title="item.course.course_name">{{item.course.course_name}}</h5>
      <div class="oneline">
        <p class="times"><i class="icon-video"></i><b>{{item.course.video_num}}</b> 课时</p>
        <p class="people"><i class="icon-people"></i><b>{{item.course.subscribe_num}}</b>人听课</p>
      </div>
    </div>
  </li>
</template>
<script>
  import RankStars from "./RankStars"
  export default {
    name: "class-card",
    props: ['item'],
    components: {
      RankStars
    },
    methods: {
      gotoVideoCourse(course_id) {
        this.$router.push({ name: 'Video', params: { course_id: course_id } })
      },
      gotoOrder: function(course_id) {
        this.$router.push({ name: 'Order', query: { pId: course_id } })
      },
    }
  }

</script>
<style lang="less">
  @import url("../../common/style/var.less");
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
        background-color: rgba(0,0,0,.4);
        button {
          display: block;
          position: relative;
          margin: auto;
          right: 0;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: auto;
          // 样式
          height: 32px;
          line-height: 22px;
          color: #fff;
          background-color: rgba(255,255,255,.5);
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

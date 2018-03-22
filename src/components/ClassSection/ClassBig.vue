<!-- 带定时器的大幅课程卡片 -->
<template>
  <li @click="gotoVideoCourse(item.course.course_id)" :class="{bought:item.course.bought}" class="class_card_big animate" style="width: 600px !important;">
    <div class="frame">
      <img :src="item.course.teacher_super_cover"> </div>
    <h5 class="title" :title="item.course.course_name">{{item.course.course_name}}</h5>
    <p class="details">{{item.course_desc}}</p>
    <p class="info"><span class="tag">{{item.course.tag.name}}</span>
      <rank-stars :point="item.course.average_score"></rank-stars><i class="divi">&nbsp;|&nbsp;</i><b>{{item.course.video_num}}</b>课时<i class="divi">&nbsp;|&nbsp;</i><b>{{item.course.subscribe_num}}</b>人听课</p>
    <p class="oneline"><span class="money">¥{{item.course.course_price}}</span> <span v-if="item.course.deadline_time" class="counter">报名倒计时<span :id="counter_id" class="countdown"></span> </span>
    </p>
  </li>
</template>
<script>
  import { Countdown } from 'common/js/countdown.js'
  import RankStars from "./RankStars"
  export default {
    name: "class-big",
    props: ['item'],
    components: {
      RankStars
    },
    data() {
      return {
        counter_id: 'counter' + parseInt(Math.random() * 100000),
        child_item: this.item,
        c: {},
      }
    },
    mounted: function() {
      if (!$("#" + this.counter_id) || $("#" + this.counter_id).length <= 0) return false
      this.c = new Countdown($("#" + this.counter_id), parseInt(this.child_item.course.deadline_time) * 1000 , ":", "d:h:m:s");
    },
    methods: {
      gotoVideoCourse(course_id) {
        this.$router.push({ path: "/video/course_id/" + course_id })
      }
    }
  }

</script>

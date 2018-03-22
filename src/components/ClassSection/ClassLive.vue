<!-- 直播课-课程卡片 -->
<template>
  <li @click="gotoVideoCourse(item.course_id)" :class="{bought:item.bought}" class="animate">
    <div class="frame circle">
      <img v-if="item.course.teachers" :src="item.course.teachers[0].teacher_head">
      <img v-else :src="item.course.course_cover">
      <img src="./images/radius_frame.png">
    </div>
    <h5 :title="item.course_title" class="title">{{item.course_title}}</h5>
    <p class="details">{{item.course_desc}}</p>
    <p class="times"><i class="icon-time"></i><b class="light">{{item.course_time_desc.split(" ")[0]}}</b> {{item.course_time_desc.split(" ")[1]}}</p>
    <p class="people"><i class="icon-people"></i><b>{{item.course.subscribe_num}}</b>人报名</p>
    <button class="yellow">立即报名</button>
  </li>
</template>
<script>
  import RankStars from "./RankStars"
  export default {
    name: "class-live",
    props: ['item'],
    components: {
      RankStars
    },
    methods: {
      gotoVideoCourse(course_id){
        this.$router.push({path:"/video/course_id/"+ course_id})
      }
    }
  }

</script>
<!-- wide -->
<template>
  <li @click="gotoVideoCourse(item.course.course_id)" :class="{bought:item.bought}">
    <div class="frame">
      <img :src="item.course.teacher_super_cover"> </div>
    <h5 :title="item.course.course_name">{{item.course.course_name}} </h5>
    <p class="info"><span v-if="item.course.tag" class="type">{{item.course.tag.name}}</span>
      <rank-stars :point="item.course.average_score"></rank-stars><b>{{item.course.average_score}}</b></p>
    <p class="times"><i class="icon-video"></i><b>{{item.course.video_num}}</b> 课时</p>
    <p class="people"><i class="icon-people"></i><b>{{item.course.subscribe_num}}</b>人听课</p>
    <p class="details" :title="item.course_desc">{{item.course_desc}}</p>
    <p class="price">¥{{item.course.course_price}}</p>
  </li>
</template>
<script>
  import RankStars from "./RankStars"
  export default {
    name: "wide-class",
    props: ['item'],
    components: {
      RankStars
    },
    methods: {
      gotoVideoCourse(course_id) {
        this.$router.push({ path: "/video/course_id/" + course_id })
      }
    }
  }

</script>

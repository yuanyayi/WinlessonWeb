<template>
  <ul id="talking">
    <h4 class="hr">{{module.title}}</h4>
    <li class="cf" v-for="(item, index) in module.contentpagetopic_datas" @click="$router.push({name:'App'})">
      <div class="frame">
        <img :src="item.topic_image">
        <img class="icon" :src="item.topic_icon">
      </div>
      <h5>{{item.topic_title}}</h5>
      <p class="detail">{{item.participant_count}}人参加</p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: "index-talking",
    props: ['module'],
  }
</script>
<style lang="less">
  #talking {
    .frame img:not(.icon) {
      width: auto !important;
      height: 100%;
    }
  }
</style>
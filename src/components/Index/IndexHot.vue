<template>
  <ul id="hot_actives" style="padding-top:1px;">
    <h4 class="hr">{{module.title}}</h4>
    <li v-for="item in module.contentpagehslider_datas" :title="item.title" :data-article_id="item.article_id">
      <router-link v-if="item.skip_type==1" :to="{path: '/video/course_id/'+item.course_id}"> <img :src="item.web_imageurl"> </router-link>
      <a v-if="item.skip_type==2" :href="item.h5_url"> <img :src="item.web_imageurl"> </a>
      <img v-else :src="item.web_imageurl">
    </li>
  </ul>
</template>
<script type="text/javascript">
  export default {
    name: 'index-hot',
    props: ['module'],
  }
</script>
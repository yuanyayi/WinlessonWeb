<template>
  <div id="index-slider" class="banner am-slider" data-am-flexslider>
    <ul class="am-slides">
      <li v-for="(item, index) in module.contentpageslideshow_datas" :title="item.title" :key="index" :data-skip_id="item.skip_id" :data-skip_web_content="item.skip_web_content">
        <router-link v-if="item.skip_id && item.skip_id != ''" :to="{path: '/video/course_id/'+item.skip_id}">
          <img :src="item.web_imageurl">
        </router-link>
        <a v-else :href="item.skip_web_content" target="_blank">
          <img :src="item.web_imageurl">
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "index-carousel",
    props: ['module'],
    mounted: function() {
      $('#index-slider').flexslider();
    },
  }

</script>
<style lang="less">
  #index-slider ol.am-control-nav {
    width: 100%;
    height: 8px;
    text-align: center;
    bottom: 14px;
    line-height: 8px;
    color: transparent;
    li {
      vertical-align: middle;
      margin-right: 4px;
    }
    li a {
      width: 10px;
      height: 3px;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.5);
      vertical-align: middle;
    }
    li a.am-active {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #fff;
    }
  }

</style>

<!-- 近期直播 -->
<template>
  <section id="live_class">
    <h4 class="icon hr"><img class="icon-img" :src="module.module_image">{{module.title}}</h4>
    <div class="bgcolorful am-slider am-slider-carousel right-controler live_class_slider">
      <ul class="class_card_list circle_list am-slides">
        <class-live v-for="(item, index) in module.contentpagelivevideo_datas" :item="item" :key="item.id"></class-live>
        <!-- prepare for one course case: -->
        <li v-if="module.contentpagelivevideo_datas.length==1">
          <div class="frame full_card">
            <!-- <img src=""> -->
          </div>
        </li>
        <!-- do not delete beyond this line -->
      </ul>
    </div>
  </section>
</template>
<script>
  import ClassLive from "./ClassLive"
  export default {
    name: "class-section-live",
    props: ['module'],
    components: {
      ClassLive
    },
    mounted: function() {
      $('.live_class_slider').flexslider({itemWidth: 270, itemMargin: 20, slideshow: false });
    },
    updated: function() {
      $('.live_class_slider').flexslider({itemWidth: 270, itemMargin: 20, slideshow: false });
    },

  }

</script>

<style>
  #live_class .class_card_list li {
    width: 270px !important;
    margin-right: 20px !important;
    height: 162px !important;
  }
  #live_class .class_card_list li .full_card {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #live_class .class_card_list li .full_card:after {
    display: none;
  }
</style>

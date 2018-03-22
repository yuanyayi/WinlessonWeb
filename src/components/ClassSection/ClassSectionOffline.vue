<!-- 线下班 -->
<template>
  <section id="offline_class">
    <h4 class="icon hr">
      <img class="icon-img" :src="module.module_image">{{module.title}}</h4>
    <div class="bgcolorful am-slider am-slider-carousel right-controler offline_class_slider" data-am-flexslider>
      <ul class="class_card_list offline_list am-slides">
        <li v-for="(item, index) in module.contentpageofflinecourse_datas" style="margin-right: 20px;" class="animate">
          <div class="frame">
            <img :src="item.web_imageurl"> </div>
          <h5 :title="item.title" class="title"><a :href="item.web_url" target="_blank">{{item.title}}</a></h5>
          <p class="date"><i class="icon-calender"></i>开班日期<span>{{item.lesson_time}}</span></p>
          <p class="city"><i class="icon-position"></i>开课地点<b class="important">{{item.site}}</b></p>
          <p class="remain"><i class="icon-people"></i>剩余名额<span class="important"><i class="schedule"><i :style="'width:'+againstPercent(item.sign_num)"></i></i><b>{{againstPercent(item.sign_num)}}</b></span></span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
  export default {
    name: "class-section-offline",
    props: ['module'],
    mounted: function() {
      $('.offline_class_slider').flexslider({ itemWidth: 560, itemMargin: 20, slideshow: false })
    },
    updated: function() {
      $('.offline_class_slider').flexslider({ itemWidth: 560, itemMargin: 20, slideshow: false })
    },
    methods: {
      againstPercent: function(value) {
        var arr = value.split("/")
        return (parseInt(arr[0]) / parseInt(arr[1])) * 100 + '%'
      }
    }
  }

</script>
<style lang="less">
  #offline_class {
    ul li p *:nth-child(2) {
      margin-left: 5px;
    }
  }
</style>

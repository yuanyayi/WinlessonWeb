<!-- 课程栏目处理 -->
<template>
  <section>
    <h4 class="icon hr">
      <img class="icon-img" :src="module.module_image">{{module.title}}<span v-if="countdown_list.length == 0" class="right"><router-link v-if="module.course_skip_category_id" :to="{name: 'ModuleList', params: { list_id: module.course_skip_category_id }, query:{title:module.title}}">查看全部</router-link></span></h4>
    <!-- 幻灯展示 -->
    <div v-if="countdown_list.length != 0" data-am-flexslider class="am-slider right-controler slider-with-width600">
      <ul class="class_card_list bigscreen_list am-slides">
        <class-big v-for="item in countdown_list" :item="item" :key="item.id"></class-big>
      </ul>
    </div>
    <div class="bgcolorful" v-if="special_list.length!= 0 || normal_list.length != 0">
      <!-- 横向展示 -->
      <ul v-if="special_list.length != 0" class="class_card_list col-2">
        <class-card-normal v-for="item in special_list" :item="item" :key="item.id"></class-card-normal>
      </ul>
      <!-- 纵向课程 -->
      <ul v-if="normal_list.length != 0" id="regular_list" class="class_card_list col-2">
        <class-card-normal v-for="item in normal_list" :item="item" :key="item.id"></class-card-normal>
      </ul>
    </div>
  </section>
</template>
<script>
  import ClassCardNormal from "./ClassCardNormal"
  import ClassBig from "./ClassBig"
  export default {
    name: "class-section",
    props: ['module'],
    components: {
      ClassCardNormal,
      // ClassWide,
      ClassBig,
    },
    created: function() {
      for (var i = 0; i < this.module.contentpagecourse_datas.length; i++) {
        var item = this.module.contentpagecourse_datas[i];
        if ([2, 5].indexOf(item.show_type) != -1) {
          if (this.$route.params.page_id == this.$store.state.index_module_page_id) {
            this.countdown_list.push(item)
          }else{
            this.special_list.push(item)
          }
        } else {
          this.normal_list.push(item)
        }
      }
    },
    mounted: function() {
      $('.slider-with-width600').flexslider({ itemWidth: 600})
    },
    updated: function() {
      $('.slider-with-width600').flexslider({ itemWidth: 600})
    },
    data() {
      return {
        normal_list: [],
        countdown_list: [],
        special_list: [],
      }
    },
  }

</script>

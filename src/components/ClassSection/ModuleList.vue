<!-- 很单纯的课程列表页 -->
<template>
  <div id="index_left">
    <div v-if="course_info_list.length<=0">稍等一下，数据马上加载...</div>
    <section v-else>
      <h4 class="icon hr">{{title}}</h4>
      <div class="bgcolorful" v-if="special_list.length!= 0 || normal_list.length != 0">
        <ul class="class_card_list col-2">
          <class-card-normal v-if="course_info_list.length>0" v-for="(item, index) in course_info_list" :item="item" :key="item.id"></class-card-normal>
        </ul>
      </div>
    </section>
    </div>
</template>
<script>
  import urls from 'common/js/urls.js'
  import ClassCardNormal from "./ClassCardNormal"
  export default {
    name: "module-list",
    components: {
      ClassCardNormal
    },
    data() {
      return {
        course_info_list: [],
        special_list: [],
        normal_list: [],
      }
    },
    computed: {
      list_route_id() {
        return this.$route.params.list_id
      },
      user() {
        return this.$store.state.user
      },
      title() {
        return this.$route.query.title
      }
    },
    created: function() {
      this.newPage()
    },
    watch: {
      list_route_id: function(val) {},
      'user.user_id': {
        handler: function(val, oldVal) {},
        deep: true
      }
    },
    methods: {
      newPage: function() {
        let cid = this.list_route_id
        let _this = this
        this.axios.get(urls.course_list + '?category_id=' + cid).then(function(response) {
          if (response.data.code != 200) return false
          for (let i = 0; i < response.data.course_info_list.length; i++) {
            _this.course_info_list.push({
              course: response.data.course_info_list[i],
              bought: false
            })
          }
        }).then(function() {
          for (var i = 0; i < _this.course_info_list.length; i++) {
            var item = _this.course_info_list[i];
            if ([2, 5].indexOf(item.show_type) != -1) {
              if (_this.$route.params.page_id == _this.$store.state.index_module_page_id) {
                _this.countdown_list.push(item)
              } else {
                _this.special_list.push(item)
              }
            } else {
              _this.normal_list.push(item)
            }
          }
        })
      },
    }
  }

</script>
<style lang="less">
  #index_left {
    &>* {
      margin-bottom: 20px;
    }
    .banner {
      height: 240px;
      overflow: hidden;
      background: #ccc;
    }

  }

</style>

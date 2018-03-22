<!-- 球区 -->
<template>
  <ul id="balls">
    <li v-for="item in module.contentpageball_datas">
      <!-- 1、课程详情页 -->
      <router-link v-if="item.skip_type==1" :to="{path: '/video/course_id/'+ item.course_id}">{{item.title}}</router-link>
      <!-- 2、资讯详情 -->
      <a :href="getByArticalId(item.article_id)" v-if="item.skip_type==2" target="_blank">{{item.title}}</a>
      <!-- 3、H5，5、话题：跳转APP -->
      <router-link v-if="item.skip_type==3 || item.skip_type==5" to="/app">{{item.title}}</router-link>
      <router-link v-else-if="item.skip_type==4" :to="{path:'/page/'+ item.page_id}">{{item.title}}</router-link>
    </li>
  </ul>
</template>
<script>
import urls from 'common/js/urls.js'
  export default {
    name: "index-balls",
    props: ['module'],
    methods:{
      getByArticalId(a_id){
        return urls.base_url+'/is/'+a_id;
      }
    },
    data(){
      return {
        test:{
          title:'测试',
          skip_type:4,
          page_id: 11,
        }
      }
    }
  }
</script>

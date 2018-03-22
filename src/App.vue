<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view name="page_nav"></router-view>
    <login-nav></login-nav>
    <!-- 正文 -->
    <router-view></router-view>
    <!-- 正文-结束 -->
    <top-footer></top-footer>
    <!-- 右侧悬浮栏 -->
    <aside-panel></aside-panel>
  </div>
</template>
<script>
  import urls from 'common/js/urls.js'
  import TopNav from 'components/Top/TopNav'
  import LoginNav from 'components/Log/LoginNav'
  import TopFooter from 'components/Top/TopFooter'
  import News from 'components/News/News'
  import AsidePanel from 'components/AsidePanel/AsidePanel'

  export default {
    name: 'app',
    components: {
      TopNav,
      LoginNav,
      TopFooter,
      News,
      AsidePanel
    },
    data() {
      return {
        search_msg: '',
        index_nav: [],
      }
    },
    computed: {
      user: function() {
        return this.$store.state.user
      }
    },
    created: function() {
      var _this = this;
      // 发起一个请求获取首页页面模块信息，发送到总数据栈；
      this.axios.get(urls.index).then((response) => {
        var res = response.data;
        // 横向，模块列表
        for (var i = 0; i < res.category_list.length; i++) {
          var item = res.category_list[i];
          var nav_item = {
            category_type: item.category_type,
            en_title: item.en_title,
            title: item.title,
            category_weburl_content: item.category_weburl_content,
            id: item.id,
            content_page_id: item.content_page_id,
          };
          _this.index_nav.push(nav_item);
        }
        this.$store.commit('setIndexNav', this.index_nav);
        // 纵向：模块页面内容
        this.$store.commit('setIndexModulePageId', res.category_list[0].content_page_id);
        this.$store.commit('setPages', [res.category_list[0].content_page_id, res.category_list[0]]);
        // 搜索信息栏
        this.search_msg = res.search_msg;
        this.$store.commit('setSearchMsg', this.search_msg);
      })
    },
    mounted: function() {
      this.$store.commit('keep_user_login')
    },
  }

</script>
<style lang="less">
  @import "common/style/base.less";
  @images: "../images/";
  @import "common/style/classcards.less";
</style>

<!-- 网站首页模块导航，应该是动态的 -->
<template>
  <header class="index_nav">
    <div class="container-fluid oneline">
      <router-link to="/" class="logo">
        <img src="../../common/images/logo.png"> </router-link>
      <nav>
        <li v-for="i in index_nav"> <a v-if="i.category_weburl_content" :href="i.category_weburl_content" target="_blank">{{i.title}}</a>
          <router-link v-else :to="{ name: 'IndexModules', params: { page_id: i.content_page_id }}">{{i.title}}</router-link>
        </li>
      </nav>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'index-nav',
    computed: {
      index_nav() {
        return this.$store.state.index_nav
      }
    }
  }

</script>
<style lang="less">
  @import "../../common/style/var.less";
  .index_nav {
    @this_h: 72px;
    height: @this_h;
    line-height: @this_h;
    background-color: @bg_yellow;
    color: @theme_red;
    .logo {
      width: 106px;
      height: @this_h;
      margin-right: 50px;
    }
    .font-r;
    font-size: 16px;
    li {
      display: inline-block;
      cursor: pointer;
    }
    li+li {
      padding-left: 30px;
    }
    a:hover, a:active {
      color: @theme;
    }
    a:active {
      .font-b;
    }
    .container-fluid {
      padding-left: 42px;
    }
    .router-link-active {
      text-shadow: 0 1px 0 #fff;
    }
  }

</style>

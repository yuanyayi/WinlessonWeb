<!-- 网站首页模块导航，应该是动态的 -->
<template>
  <header class="index_nav" id="news_nav">
    <div class="container-fluid oneline">
      <router-link to="/" class="logo">
        <img src="/static/image/logo.png"> </router-link>
      <nav>
        <li> <a>资讯首页</a> </li>
      </nav>
    </div>
  </header>
</template>
<script>
  export default {
    name: "news-nav",
  }

</script>
<style lang="less" data-name="news_nav-style">
  #news_nav {
    background-color: #f9f9f9;
    color: #333;
  }
  .font-b {
    font-family: PingFangSC-Semibold, Microsoft YaHei, Helvetica, Arial, sans-serif;
    font-weight: bolder;
  }
  @theme: #ffbc42;
  .index_nav {
    @this_h: 72px;
    height: @this_h;
    line-height: @this_h;
    .logo {
      width: 106px;
      height: @this_h;
      margin-right: 50px;
    }
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
  }

</style>

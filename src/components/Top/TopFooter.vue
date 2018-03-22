<template>
  <!-- 统一的页脚 -->
  <footer id="top_footer" class="container-fluid">
    <div class="am-u-sm-4">&copy;必胜公考备案信息 京ICP备16001403号</div>
    <nav class="am-u-sm-8">
      <router-link :to="{name: 'about',params:{page:'index'}}">关于必胜公考</router-link>
      <router-link :to="{name: 'about',params:{page:'contact'}}">联系我们</router-link>
      <router-link :to="{name: 'about',params:{page:'joinus'}}">招贤纳士</router-link>
      <router-link :to="{name: 'about',params:{page:'copyright'}}">版权声明</router-link>
      <router-link :to="{name: 'about',params:{page:'responsible'}}">免责声明</router-link>
      <router-link :to="{name: 'about',params:{page:'service'}}">服务条款</router-link>
      <a href="http://www.gjgwy.org/">国家公务员考试网</a>
    </nav>
  </footer>
</template>
<script>
  export default {
    name: "top-footer",
  }

</script>
<style lang="less" data-name="top-footer-style">
  @import "../../common/style/var.less";
  #top_footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    line-height: 30px;
    .font-m;
    font-size: 12px;
    color: @font_light;
    letter-spacing: -0.67px;
    nav {
      a {
        color: @theme_red;
        margin-right: 4px;
        position: relative;
      }
      a:after {
        content: "|";
        .font-r;
        color: @font_light;
        margin-left: 6px;
      }
      a:last-child:after {
        display: none;
      }
    }
    &>*:last-child {
      text-align: right;
    }
    &:before {
      .hr-after-inner;
    }
  }

</style>

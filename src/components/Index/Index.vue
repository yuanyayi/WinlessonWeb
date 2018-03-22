<!-- 首页显示框架 -->
<template>
  <div class="container-fluid main cf">
    <router-view class="main_left"></router-view>
    <index-right class="main_right"></index-right>
  </div>
</template>
<script>
  import IndexRight from "./IndexRight"
  export default {
    name: "index",
    components: { IndexRight },
  }

</script>
<style lang="less">
  .mr15 {
    margin-right: 15px;
  }

</style>

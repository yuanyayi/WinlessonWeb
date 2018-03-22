<template>
  <div class="container-fluid main download-app">
    <h2>此功能仅支持APP使用哦，欢迎下载必胜公考APP！</h2>
    <!-- 悬浮的二维码 -->
    <div class="float-v-code">
      <header>
        <h3>必胜公考APP</h3>
        <p>必胜公考 公考必胜</p>
      </header>
      <img src="../../common/images/app.png">
      <p><b>iPhone</b> · <b>Android</b></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'please-download-app',
  }

</script>
<style lang="less">
  // 悬浮的二维码
  .download-app .float-v-code {
    display: block !important;
    position: relative;
    margin: auto;
    width: 290px;
    padding: 40px 52px;
    text-align: center;
    background: #fff;
    font-family: PingFangSC-Medium, Microsoft YaHei, Helvetica, Arial, sans-serif;
    font-weight: normal;
    color: #333;
    z-index: 999;
    header {
      margin-bottom: 40px;
    }
    img {
      width: 185px;
      height: 185px;
      margin-bottom: 17px;
    }
    p {
      color: #6663;
    }
  }
</style>

<template>
  <section id="balance">
    <p>我的余额</p>
    <p class="money">￥<slot name="balance"></slot></span>
    </p>
    <div class="decoration_border"></div>
  </section>
</template>
<script>
  import urls from 'common/js/urls.js'
  export default {
    name: "personal-balance",
  }

</script>
<style lang="less">
  @import url("../../common/style/var.less");
  /*余额*/

  #balance {
    text-align: center;
    display: block;
    position: relative;
    width: 400px;
    height: 120px;
    margin-bottom: 15px;
    background: @theme_red;
    color: #fff;
    font-size: 12px;
    padding-top: 24px;
    .money {
      margin-top: 5px;
      font-family: PingFangSC-Medium, Microsoft YaHei;
      font-weight: 500;
      line-height: 50px;
      font-size: 36px;
    }
    .decoration_border {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding: 5px;
      &:after {
        content: "";
        display: block;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid #ffbc42;
      }
    }
  }

</style>

<!-- 忘记密码 -->
<template>
  <div class="forget"><router-link :to="{name:'forget'}">忘记密码？</router-link></div>
</template>
<script>
  export default {
    name: 'forget',
  }

</script>
<style lang="less">
  .forget {
    position: absolute;
    top: 0px;
    right: 12px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999;
    cursor: pointer;
    a:hover {
      background: #f2f2f2;
    }
  }
</style>

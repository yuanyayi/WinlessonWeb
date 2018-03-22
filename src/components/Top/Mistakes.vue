<template>
  <div class="container-fluid main mistakes">
    <p>您还没有登录！</p>
    <p>{{secondsLeft}}秒后<router-link to="/" class="pointer a">返回主页</router-link></p>
  </div>
</template>

<script>
  export default {
    name: 'mistakes-page',
    data(){
      return {
        secondsLeft: 10,
      }
    },
    created: function(){
      var _this = this
      this.timer = setInterval(function(){
        _this.secondsLeft-=1
        if(_this.secondsLeft==0){
          clearInterval(_this.timer)
          _this.$router.push('/')
        }
      },1000)

    }
  }
</script>

<style lang="less">
  .mistakes a.a {
    color: blue;
    text-decoration: underline;
    &:hover {
      color: darken(blue, 20%)
    }
  }
</style>

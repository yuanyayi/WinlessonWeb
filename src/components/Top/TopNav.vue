<!-- 顶部细条最高导航 -->
<template>
  <header id="top_nav" class="am-nav">
    <nav class="am-u-sm-6 am-nav am-nav-pills ">
      <router-link to="/">首页</router-link>
      <router-link to="/news">资讯</router-link>
    </nav>
    <nav class="am-u-sm-6 am-nav am-nav-pills right"> <a @click.stop.prevent>下载必胜公考APP
    <!-- 悬浮的二维码 -->
  <div class="float-v-code">
    <header>
      <h4>必胜公考APP</h4>
      <p>必胜公考 公考必胜</p>
    </header>
    <img src="../../common/images/app.png">
    <p><b>iPhone</b> · <b>Android</b></p>
  </div></a>
      <router-link v-if="!user.user_id || user.user_id==''" to="/login" class="logout_status">登录</router-link>
      <router-link v-if="!user.user_id || user.user_id==''" to="/register" class="logout_status">注册</router-link>
      <a v-else class="login_status" @click.stop.prevent>
        <div class="frame circle">
          <img :src="user.image_url"> </div>{{user.nickname}}的账号 <i class="icon-open"></i>
        <div class="menu">
          <ul>
            <li>
              <router-link :to="{ path: '/personal' }">个人中心</router-link>
            </li>
            <!-- <li>账号管理</li> -->
            <li @click="user_logout">退出</li>
          </ul>
        </div>
      </a>
    </nav>
  </header>
</template>
<script>
  export default {
    name: 'top-nav',
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      user_logout: function() {
        this.$store.commit('user_logout')
      }
    }
  }

</script>
<style lang="less" data-name="top-nav-style">
  @import "../../common/style/var.less"; // 1-顶部细条最高导航--统一的页头
  #top_nav {
    .right {
      text-align: right;
    }
    @this_h: 30px;
    height: @this_h;
    line-height: @this_h;
    padding-left: 15px;
    padding-right: 15px;
    background-color: @theme_red;
    font-size: 12px;
    color: #f6d8be;
    z-index: 999;
    a {
      position: relative;
      &:hover, &:active {
        color: #fff;
        &>.float-v-code {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .login_status .frame {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      vertical-align: -5px;
    }
    .login_status {
      div.menu {
        position: absolute;
        color: #333;
        z-index: 99;
        width: 100%;
        text-align: left;
        ul {
          display: inline-block;
          background: #fff;
          padding-top: 10px;
          padding-bottom: 5px;
          li {
            display: block;
            width: 96px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            &:hover {
              background-color: rgba(100, 100, 100, 0.1);
              a, a:hover {
                color: inherit;
              }
            }
          }
        }
      }
    }
  }

</style>

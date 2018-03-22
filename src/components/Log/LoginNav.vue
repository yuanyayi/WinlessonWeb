<!-- 用户登录模块-横条，登录后自动隐藏 -->
<template>
  <section id="index_login" v-show="!do_not_show_login_nav">
    <!-- 三栏样式 -->
    <ul class="container-fluid oneline">
      <li>
        <img src="./images/login_banner.png"> </li>
      <li>
        <img src="./images/bsk3.0.png">
        <div class="oneline">
          <button>下载必胜公考APP</button><span class="code">
          <!-- 悬浮的二维码 -->
          <div class="float-v-code">
            <img src="../../common/images/app.png">
            <p><b>iPhone</b> · <b>Android</b></p>
          </div>
          </span></div>
      </li>
      <li>
        <!-- 登录表格 -->
        <form class="login_form">
          <label :class="{error:errors.username.error}">
            <input v-model="input_user.username" type="text" name="username" placeholder="用户手机号" @blur="checkinput" @focus="typing"></label>
          <label class="pw" :class="{error:errors.password.error}">
            <input v-model="input_user.password" type="password" name="password" placeholder="密码" @blur="checkinput" @focus="typing">
            <forget></forget></label>
          <div class="oneline">
            <button @click.stop.prevent="user_login" @keyup.enter="user_login">登录</button>
            <button @click.stop.prevent="$router.push({name: 'register'})">注册</button>
          </div>
        </form>
      </li>
    </ul>
  </section>
</template>
<script>
  import Forget from './Forget'
  export default {
    name: "login-nav",
    components: {
      Forget,
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      do_not_show_login_nav: function() {
        return (this.user.user_id && this.user.user_id != '') || this.$route.path == '/register' || this.$route.path == '/login' || this.$route.path == '/forget'
      }
    },
    data() {
      return {
        input_user: {
          username: '',
          password: '',
        },
        errors: {
          username: {
            error: false,
            errormsg: ''
          },
          password: {
            error: false,
            errormsg: ''
          }
        },
      }
    },
    methods: {
      // 验证输入信息
      checkinput() {
        this.typing()
        if (this.input_user.username == '') {
          this.errors.username = { error: true, errormsg: '请填写手机号！' }
          return false
        }
        if (this.input_user.password == '') {
          this.errors.password = { error: true, errormsg: '请填写密码！' }
          return false
        }
        return true
      },
      typing() {
        for(var key in this.errors) {
          this.errors[key].error = false
        }
      },
      user_login() {
        this.$store.dispatch('userLogin', this.input_user)
      }
    }
  }

</script>
<style lang="less" data-name="login-nav-style">
  @import "../../common/style/var.less"; // 3-用户登录区，登录后隐藏
  #index_login {
    @icon: "./images/";
    @this_h: 200px;
    height: @this_h;
    line-height: @this_h;
    background: @theme_yellow url("@{icon}bg_dots.png") top left/20px 20px;
    & * {
      line-height: normal;
    }
    li:first-child {
      width: 400px;
    }
    li:nth-child(2) {
      width: 200px;
      @this_h: 34px;
      img {
        margin-bottom: 25px;
      }
      button {
        width: 134px;
        height: @this_h;
        margin-right: 5px;
        background-color: @theme_red;
        .font-m;
        color: #fff;
        font-size: 14px;
      }
      button:hover+.code {
        .float-v-code {
          display: block;
        }
      }
      .code {
        display: inline-block;
        width: 34px;
        height: @this_h;
        .one_bg_img;
        background-image: url("@{icon}rectcode.png");
        position: relative;
        .float-v-code {
          left: 34px + 5px;
        }
        &:hover {
          .float-v-code {
            display: block;
          }
        }
      }
    }
    li:last-child {
      width: 300px+40*2;
      padding: 0 40px;
      .login_form {
        @alert: red;
        button {
          background: @theme_orange;
          margin: 0;
        }
        button:last-child {
          background: @theme_yellow;
          color: @theme_orange;
          border: 1px solid @theme_orange;
          float: right;
        }
        .forget {
          top: 10px;
          right: 20px;
        }
        .error {
          input {
            border-color: @alert;
          }
        }
      }
    }
  }

</style>

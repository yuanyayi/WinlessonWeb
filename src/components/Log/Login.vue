<!-- 用户登录模块-横条，登录后自动隐藏 -->
<template>
  <div class="container-fluid login">
    <h2>登录必胜公考</h2>
    <div class="form">
      <label :class="{error:errors.username.error}"><span>手机号</span>
        <input v-model="input_user.username" type="text" name="username" @blur="checkinput" id="first_input" autofocus @focus="typing"> <span class="errormsg font-r alert" v-html="errors.username.errormsg"></span></label>
      <label :class="{error:errors.password.error}"><span>密码</span>
        <input v-model="input_user.password" type="password" name="password" @blur="checkinput" @focus="typing">
        <forget></forget> <span class="errormsg font-r alert" v-html="errors.password.errormsg"></span> </label>
      <label>
        <button @click.stop.prevent="user_login" @keyup.enter="user_login">登录</button>
      </label>
    </div>
  </div>
</template>
<script>
  import Forget from './Forget'
  export default {
    name: "login",
    components: {
      Forget,
    },
    computed: {
      user() {
        return this.$store.state.user;
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
    watch: {
      user: {
        handler: function(val, oldVal) {
          if (val.user_id && val.user_id != '') {
            this.$router.replace({ path: '/' })
          }
        },
        deep: true
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
<style lang="less">
  @import url("./style/logstyle.less");

</style>

<template>
  <div class="container-fluid register">
    <h2>
      <img src="./images/welcome.png"> </h2>
    <div class="form">
      <label :class="{error:errors.username.error}"><span>手机号</span>
        <input v-model="username" type="text" name="username" @blur="checkinput" id="first_input" autofocus> <span class="errormsg font-r alert" v-html="errors.username.errormsg" @focus="typing"></span></label>
      <label :class="{error:errors.password.error}"><span>密码</span>
        <input v-model="password" type="password" name="password" @blur="checkinput" @focus="typing"> <span class="errormsg font-r alert" v-html="errors.password.errormsg"></span>
        <forget></forget>
      </label>
      <get-verify-code :username='username'></get-verify-code>
      <label class="font-r">
        <input v-model="toggle" type="checkbox">我已经认真阅读并同意《<a class="orange">必胜公考用户协议</a>》。</label>
      <label>
        <button @click="register" @keyup.enter="register">注册</button>
      </label>
    </div>
  </div>
</template>
<script type="text/javascript">
  import md5 from 'js-md5'
  import urls from 'common/js/urls.js'
  import Forget from './Forget'
  import GetVerifyCode from './GetVerifyCode'
  export default {
    name: 'register',
    components: {
      Forget,
      GetVerifyCode
    },
    data() {
      return {
        username: '',
        password: '',
        verify_code: '',
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
        get_verify_code: 0,
        toggle: false,
      }
    },
    methods: {
      // 验证输入信息
      checkinput() {
        this.typing()
        if (this.username == '') {
          this.errors.username = { error: true, errormsg: '请填写手机号！' }
          return false
        }
        if (this.password == '') {
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
      // 注册
      register() {
        if (!this.checkinput()) {
          return false
        } else if (!this.toggle) {
          alert("请阅读《必胜公考用户协议》")
          return false
        } else if (!this.verify_code) {
          alert("请填写验证码!")
          return false
        }
        var _this = this
        this.axios.post(urls.register + '?username=' + this.username + '&password=' + md5(this.password) + '&verify_code=' + this.verify_code).then(function(response) {
          if (response.data.code != 200) {
            this.errors.username = { error: true, errormsg: '该手机号已被注册，请<a href="/login">直接登录></a>' }
            return false
          }
          alert("注册成功！稍后为您跳转...")
          setTimeout(function() { _this.$router.go(-1) }, 10 * 1000)
        })
      },
      // 获取验证码
      setVerifyCode(val) {
        this.verify_code = val
      }
    }
  }

</script>
<style lang="less">
  @import url("./style/logstyle.less");

</style>

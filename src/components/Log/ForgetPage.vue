<template>
  <div class="container-fluid forgetpage">
    <h2>修改密码</h2>
    <div class="form">
      <label :class="{error:errors.username.error}"><span>手机号</span>
        <input v-model="username" type="text" name="username" @blur="checkinput" @focus="typing" id="first_input" autofocus> <span class="errormsg font-r alert" v-html="errors.username.errormsg"></span></label>
      <get-verify-code :username='username'></get-verify-code>
      <label :class="{error:errors.password1.error}"><span>新密码</span>
        <input v-model="password1" type="password" name="password" @blur="checkinput" @focus="typing"> <span class="errormsg font-r alert" v-html="errors.password1.errormsg"></span> </label>
      <label :class="{error:errors.password2.error}"><span style="margin-right: 0;">重复密码</span>
        <input v-model="password2" type="password" name="password" @blur="checkinput" @focus="typing"> <span class="errormsg font-r alert" v-html="errors.password2.errormsg"></span> </label>
      <label>
        <button @click="reset" @keyup.enter="reset">修改密码</button>
      </label>
      <div class="mask" v-show="mask">
        <h4>注册成功！请登录，稍后为您跳转... {{timer_count}}秒</h4>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import md5 from 'js-md5'
  import urls from 'common/js/urls.js'
  import GetVerifyCode from './GetVerifyCode'
  export default {
    name: 'forget-page',
    components: {
      GetVerifyCode
    },
    data() {
      return {
        username: '',
        password1: '',
        password2: '',
        verify_code: '',
        get_verify_code: 0,
        toggle: false,
        errors: {
          username: {
            error: false,
            errormsg: ''
          },
          password1: {
            error: false,
            errormsg: ''
          },
          password2: {
            error: false,
            errormsg: ''
          }
        },
        timer_count: 10,
        mask: false
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
        if (this.password1 == '') {
          this.errors.password1 = { error: true, errormsg: '请填写新密码！' }
          return false
        }
        if (this.password2 == '') {
          this.errors.password2 = { error: true, errormsg: '请重复新密码！' }
          return false
        } else if (this.password2.toString() != this.password1.toString()) {
          this.errors.password2 = { error: true, errormsg: '两次输入的密码不一致！' }
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
      reset() {
        if (!this.checkinput()) return false
        if (!this.verify_code) return false
        var _this = this
        this.axios.post(urls.reset + '?username=' + this.username + '&password=' + md5(this.password1) + '&verify_code=' + this.verify_code).then(function(response) {
          if (response.data.code != 200) {
            alert(response.data.msg)
            return false
          }
          _this.mask = true
          var timer = setInterval(function() {
            _this.timer_count -= 1;
            if (_this.timer_count == 0) {
              clearInterval(timer)
              _this.$router.go({ path: '/login' })
            }
          }, _this.timer_count * 1000)
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
  .forgetpage {
    position: relative;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      &>* {
        margin-top: 40px;
      }
    }
  }

</style>

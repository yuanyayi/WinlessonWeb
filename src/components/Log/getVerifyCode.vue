<!-- 获取验证码-整行标签 -->
<template>
  <label class="get_vc" :class="{error:errors.verify_code.error}"> <span>验证码</span>
    <button class="get_vc-btn white" @click="getVerifyCode" :class="{grey:get_verify_code>0}">{{get_verify_code>0 ? get_verify_code+'秒' :'获取验证码'}}</button>
    <input v-model="verify_code" type="text" v-on:blur="check_verify_code">  <span class="errormsg font-r alert" v-html="errors.verify_code.errormsg"></span></label>
</template>
<script>
  import urls from 'common/js/urls.js'
  export default {
    name: 'get-verify-code',
    props: ['username'],
    data() {
      return {
        verify_code: '',
        get_verify_code: 0,
        errors: {
          verify_code: {
            error: false,
            errormsg: '',
          }
        }
      }
    },
    watch: {
      verify_code(val) {
        this.$parent.setVerifyCode(val)
      }
    },
    methods: {
      check_verify_code(){
        this.errors.verify_code.error = false
        if(!this.verify_code || this.verify_code=='') {
          this.errors.verify_code = {error: true, errormsg:'请输入验证码！'}
        }
      },
      // 获取验证码
      getVerifyCode() {
        if (!this.username || this.username == '' || this.username.length != 11) return false
        if (this.get_verify_code > 0) return false
        var _this = this
        this.get_verify_code = 60
        this.axios.post(urls.get_verify_code + '?username=' + this.username).then(function(response) {
          if (response.data.code != 200) {
            this.errors.verify_code = {error: true, errormsg: response.data.msg}
            return false
          }
          var timer = setInterval(function() {
            if (_this.get_verify_code <= 0) {
              clearInterval(timer)
            }
            _this.get_verify_code -= 1
          }, 1000)
        })
      },
    }
  }

</script>
<style lang="less">
  .get_vc {
    width: 100%;
    button, input {
      float: right;
    }
    input {
      width: 195px !important;
      margin-right: 5px;
    }
    button.get_vc-btn {
      width: 100px;
      margin: 0 !important;
    }
  }

</style>

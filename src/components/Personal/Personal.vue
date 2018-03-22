<!-- 个人中心 -->
<template>
  <div class="container-fluid main cf">
    <div class="personal_left">
      <!-- 用户信息 -->
      <div class="info">
        <div class="frame circle">
          <img :src="user.image_url"> </div>
        <p class="name" @click="changName">{{user.nickname}}
          <input v-show="changing_name" name="nickname" v-model="input_nickname" @blur="updateNickName" @keyup.enter="input_nickname" ref="input_nickname" id="input_nickname" placeholder="在此输入您的新名字" /> </p> <!-- <a class="edit">编辑个人信息</a> --> </div>
      <!-- 列表 -->
      <ul class="funcs">
        <router-link tag="li" :to="{ name: 'PersonalCourseList', params: { user_id: user.user_id }}">我的课程</router-link>
        <router-link tag="li" :to="{ name: 'PersonalOrderList', params: { user_id: user.user_id }}">我的订单</router-link>
        <router-link tag="li" :to="{ name: 'PersonalBalance'}">余额<b class="right">￥ {{balance}}</b></router-link>
        <router-link tag="li" :to="{ name: 'PersonalVoucher', params: { user_id: user.user_id }}">优惠券<b class="right">{{vouchers}} 张</b></router-link>
      </ul>
    </div>
    <aside class="personal_right">
      <router-view><span slot="balance">{{balance}}</span></router-view>
    </aside>
  </div>
</template>
<script>
  import urls from 'common/js/urls.js'
  export default {
    name: "index",
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    data() {
      return {
        balance: "0.00",
        vouchers: 0,
        input_nickname: '',
        changing_name: false,
      }
    },
    watch: {
      user: function(val) {
        alert("您已退出登录！")
        if (!val.user_id || val.user_id == '') {
          alert("您已退出登录！")
          this.$router.go('{name:Index}')
          return false
        }
      }
    },
    created: function() {
      var _this = this
      if (this.user.user_id && this.user.user_id != '') {
        _this.axios.post(urls.get_balance + "?user_id=" + _this.user.user_id).then(function(response) {
          _this.balance = response.data.balance
        })
      }
    },
    methods: {
      setVoucherLength: function(n) {
        this.vouchers = n;
      },
      changName: function(ev) {
        this.changing_name = true
        window.setTimeout(function(){
          document.getElementById("input_nickname").focus()
        }, 50);
      },
      updateNickName: function() {
        this.changing_name = false
        var temp = this.input_nickname
        var _this = this
        if (temp != '' && !!this.user.user_id) {
          this.axios.post(urls.set_info + "?user_id=" + this.user.user_id + "&nick_name=" + temp).then(function(response) {
            if (response.data.code != 200) return false
            _this.$store.commit('update_user', { 'nickname': temp })
          _this.input_nickname=''
          })
        }
      }
    },
  }

</script>
<style lang="less">
  @import url("../../common/style/var.less");
  @icon: "../../common/images/"; //
  .personal_left {
    width: 200px;
    margin-right: 40px;
    float: left;
    .font-b; // 用户信息
    .info {
      background: @bg_yellow;
      border: 1px solid @theme;
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 25px;
      .frame {
        width: 100px;
        height: 100px;
        margin: 30px auto 15px;
      }
      .name {
        width: 90%;
        margin: auto;
        font-size: 24px;
        color: @default;
        // height: 33px;
        line-height: 33px;
        margin-bottom: 5px;
        position: relative;
        input {
          box-sizing: border-box;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          margin: auto;
          height: 100%;
          width: 100%;
          padding: 3px 5px;
          font-size: 14px;
        }
      }
      .edit {
        font-size: 12px;
        color: @theme_red;
      }
    } // 功能列表
    .funcs {
      .font-m;
      font-size: 14px;
      color: @default;
      li {
        position: relative;
        padding-left: 5px;
        .right {
          position: absolute;
          right: 5px;
          .font-r;
          color: @theme_red;
        }
        height: 44px;
        line-height: 44px;
        &:after {
          .hr-after-inner;
          bottom: 0;
        }
        &:hover {
          background-color: @bg_light;
        }
        &.router-link-exact-active {
          background-color: @theme_yellow;
        }
        a {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
  .personal_right {
    width: 700px;
    float: left;
    h2 {
      position: relative;
      .font-b;
      font-size: 24px;
      height: 33px;
      line-height: 33px;
    }
    .section {
      margin-bottom: 40px;
    }
    #personal_order_list {
      table {
        width: 100%;
        border-color: @bg_dark;
        .font-r;
        font-size: 16px;
        color: @default;
        td {
          border-color: @bg_dark;
          padding: 10px;
        }
        thead {
          background-color: @bg_dark;
          color: @font;
          font-size: 12px;
          td:first-child {
            width: 400px;
          }
          td:last-child {
            text-align: right;
          }
        }
        tbody {
          td+td {
            width: 150px;
            text-align: center;
          }
          td:first-child {
            width: 400px;
          }
          .desc {
            font-size: 12px;
            color: @font_light;
          }
          .price {
            color: @theme_red;
          }
        }
      }
    }
  }
  .personal_right .wide_list li {
    .details {
      display: none;
    }
  }

</style>

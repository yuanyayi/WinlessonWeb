<template>
  <section id="voucher_list_box">
    <ul id="voucher_list_abled">
      <!-- 有效 -->
      <voucher-li v-for="(item,index) in voucher_list" v-if="!!item.status" :voucher="item" :key="index"></voucher-li>
      <!-- 无效 -->
      <voucher-li v-for="(item,index) in voucher_list" v-if="!item.status" :voucher="item" :key="index" class="disabled"></voucher-li>
    </ul>
  </section>
</template>
<script>
  // js库
  import urls from 'common/js/urls.js'
  import VoucherLi from "./VoucherLi"
  export default {
    name: 'personal-voucher',
    components: {
      VoucherLi
    },
    data() {
      return {
        voucher_list: [],
      }
    },
    computed: {
      user_id() {
        return this.$store.state.user.user_id;
      },
    },
    created: function() {
      var _this = this;
      this.axios.get(urls.get_voucher_list+"?user_id="+ _this.user_id).then(function(response) {
        _this.voucher_list = response.data.result.voucherList;
        _this.$parent.setVoucherLength(_this.voucher_list.length);
      })
    }
  }

</script>
<style>
  /*代金券*/
  #voucher_list_box {
    width: 500px;
  }
  .coupon {
    background: #fff;
    padding: 10px;
    border: 1px solid #e5e5e5;
    position: relative;
    margin-bottom: 15px;
    color: #333;
    font-size: 12px;
    font-family: PingFangSC-Regular;
  }
  .coupon .font-m {
    font-family: PingFangSC-Medium;
  }
  .coupon .font-16 {
    font-size: 16px;
  }
  .coupon .font-grey {
    color: #666;
  }
  .coupon .font-lightgrey {
    color: #999;
  }
  .coupon p {
    margin-top: 5px;
  }
  .coupon .rightCheck {
    display: none;
  }
  .coupon .mb10 {
    margin-bottom: 10px;
  }
  .coupon.checked .rightCheck {
    display: block;
  }
  .coupon .content {
    border: 2px dashed #e5e5e5;
    padding: 15px;
  }
  .coupon .content .money {
    color: #e37d28;
    font-size: 36px;
    line-height: 50px;
    font-family: PingFangSC-Semibold, Microsoft YaHei;
    font-weight: 600;
  }
  .coupon .content .money+p {
    text-align: right;
  }
  .coupon.disabled:after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .1) !important;
  }

</style>

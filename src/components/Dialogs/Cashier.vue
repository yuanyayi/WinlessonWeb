<template>
  <div class="mask" @click.self="cancel_payment">
    <div v-if="finalfee>0" class="cashier">
      <p class="small"><span class="grey">订单号：<slot name="orderid"></slot></span><span class="bold" style="margin-left: 30px;">实付金额：<slot name="final"></slot></span></p>
      <div class="frame">
        <slot name="weixin"></slot>
      </div>
      <p class="small grey center" style="margin-bottom: 20px;">使用微信扫描二维码进行支付</p>
      <h5 class="center bold" style="margin-bottom: 30px;">微信支付</h5>
      <button class="white" @click="success_payment">支付成功！跳转回课程页面</button>
    </div>
    <div v-else class="cashier">
      <h5 class="center bold hover" @click="success_payment" style="cursor: pointer;">您已支付成功！回点击跳转课程页面</h5>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: "cashier",
    props:["finalfee"],
    methods: {
      cancel_payment: function(){
        this.$parent.cashier.show = false
        this.$parent.createOrder()
      },
      success_payment: function(){
        this.$parent.$router.go(-1);
      }
    }
  }

</script>
<style lang="less">
  .cashier {
    background: #fff;
    position: absolute;
    margin: auto;
    top: 20%;
    left: 0;
    right: 0;
    width: 500px;
    padding: 40px;
    border-radius: 4px;
    h5 {
      font-family: PingFangSC-Medium;
      font-size: 14px;
    }
    .small {
      font-size: 12px;
    }
    .bold {
      font-family: PingFangSC-Medium;
      font-weight: bold;
    }
    .grey {
      color: #666;
    }
    span.money {
      font-family: PingFangSC-Medium;
      color: #e37d28;
    }
    .frame {
      width: 180px;
      height: 180px;
      margin: 30px auto;
    }
    .center {
      text-align: center;
    }
    button {
      display: block;
      margin: auto;
      padding: 5px 15px;
    }
    .hover:hover {
      text-decoration: underline;
    }
  }

</style>

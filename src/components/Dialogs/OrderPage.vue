<template>
  <div class="dialog container-fluid">
    <h2>确认订单信息</h2>
    <!-- 收货人信息 -->
    <div v-if="!!order_content.needAddress">
      <h5>收货人信息</h5>
      <ul class="list_of_address">
        <li class="cur" v-if="order_content.address_info.contactName">
          <h6 class="hr">收货人：{{order_content.address_info.contactName}}</h6>
          <p>{{order_content.address_info.contactAddress}}</p>
          <p>{{order_content.address_info.contactNumber}}</p>
          <p class="right" @click="changeAddress">修改></p>
        </li>
        <li class="new" v-else @click="changeAddress"> <span></span> 新建地址 </li>
      </ul>
    </div>
    <!-- 商品信息 -->
    <div>
      <h5>商品信息</h5>
      <table class="am-table am-table-bordered sale_table">
        <thead>
          <tr>
            <td>课程名称</td>
            <td>金额</td>
            <td>优惠</td>
            <td></td>
          </tr>
        </thead>
        <tfoot>
          <!-- 代金券 -->
          <tr style="font-family: PingFangSC-Medium; font-size: 14px;">
            <td colspan="4">优惠券 <span colspan="4" v-show="!order_content.voucherList.length>0" class="grey">无可用优惠券</span></td>
          </tr>
          <tr v-if="order_content.voucherList.length>0">
            <td colspan="4" style="border-top: none;">
              <ul class="voucherlist">
                <li v-for="(item,index) in order_content.voucherList" :class="{cur: index == using_voucher.index}" @click="chooseThisVoucher(index,item.value, item.id)" :title="item.name+':'+item.scopeDesc">￥{{item.value}}</li>
              </ul>
            </td>
          </tr>
          <!-- 余额 -->
          <tr class="hr">
            <td colspan="4" v-if="!order_content.supportBalance" class="grey">余额不可用</td>
            <td colspan="4" v-else>余额 <span class="price">￥{{order_content.balance}}</span> <span class="right"><button v-show="order_content.balance>0.01" :class="{used: using_balance.used}" @click="useBalance">{{using_balance.used?'已抵用':'抵用'}}</button></span></td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td class="title">
              <p>{{order_content.productName}}</p>
              <p class="small light">订单编号: {{order_content.orderId}}</p>
            </td>
            <td class="price">￥{{order_content.productPrice}}</td>
            <td class="grey">-￥{{using_voucher.value}}</td>
            <td class="price">￥{{order_content.productPrice-using_voucher.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 总价 -->
    <div class="foot">
      <!-- <span class="p">总计：</span><span class="money">￥{{total}}</span> -->
      <button @click="cofirmOrder">确认支付</button>
    </div>
    <!-- 修改地址蒙层 -->
    <div v-show="changingAddress" class="mask changingAddress" @click.self="cancel_change_address">
      <dl class="form">
        <div class="close" @click="cancel_change_address"><i class="icon-close"></i></div>
        <h2>录入地址信息</h2>
        <dt>收货人</dt>
        <dd>
          <input type="text" name="" v-model="receive.contactName"> </dd>
        <br/>
        <dt>电话</dt>
        <dd>
          <input type="text" name="" v-model="receive.contactNumber"> </dd>
        <br/>
        <dt>地址</dt>
        <dd>
          <input type="text" name="" v-model="receive.contactAddress"> </dd>
        <br/>
        <button @click.stop.prevent="save_change_address">保存</button>
      </dl>
    </div>
    <!-- 收银台： -->
    <cashier v-show="cashier.show" :finalfee="cashier.value"> <span slot="final" class="money">{{cashier.value}}</span> <span slot="orderid">{{order_content.orderId}}</span>
      <img :src="cashier.weixin" slot="weixin" /> </cashier>
  </div>
</template>
<script type="text/javascript">
  // js库
  import urls from 'common/js/urls.js'
  // 组件
  import Cashier from './Cashier'
  export default {
    name: "order",
    components: {
      Cashier
    },
    data() {
      return {
        order_content: {
          orderId: '',
          pay_type: [],
          address_info: {},
          productPrice: 0,
          needAddress: 0,
          voucherList: [],
          productName: "",
          apple_id: "",
          originalprice: "",
          supportBalance: 1,
          payTime: "",
          balance: 0,
          discountType: 0
        },
        cofirmOrderInfo: {
          userid: '',
          username: '',
          ticketId: '',
          productType: 1,
          platform: 2,
          orderId: '',
          discountMethods: '',
        },
        changingAddress: false,
        receive: {
          contactAddress: '',
          contactName: '',
          contactNumber: '',
        },
        using_voucher: {
          index: -1,
          value: 0,
          id: -1,
        },
        using_balance: {
          used: false,
        },
        // total: 0,
        cashier: {
          show: false,
          value: 0,
          weixin: 'weixinpaycode',
        }
      }
    },
    computed: {
      user() {
        var user = this.$store.state.user
        this.cofirmOrderInfo.userid = user.user_id
        this.cofirmOrderInfo.username = user.username
        return this.$store.state.user
      },
      discountType() {
        return this.order_content.discountType
      }
    },
    created: function() {
      this.createOrder(this.$route.query.pId)
    },
    methods: {
      // 生成订单
      createOrder: function(pId, pType) {
        // 未登录处理：
        if (!this.user.user_id || this.user.user_id == '') {
          alert("您还没有登录！")
          this.$router.push({path:"/login"})
        }
        // 正常流程：
        var _this = this,
          pId = pId || this.$route.query.pId,
          pType = pType || 1
        // 创建订单：
        this.axios.post(urls.create_order + '?userid=' + this.user.user_id + '&productId=' + pId + '&productType=' + pType + '&username=' + this.user.username).then((response) => {
          if (response.code == 200) { return false }
          for (var key in _this.order_content) {
            _this.order_content[key] = response.data.result[key]
          }
          // 信息初始化
          this.cofirmOrderInfo.orderId = this.order_content.orderId
          // 修改地址专用
          for (var key in this.receive) {
            this.receive[key] = this.order_content.address_info[key]
          }
          // 最终价格初始化
          // this.total = this.order_content.productPrice
        })
      },
      cancel_change_address: function() {
        this.changingAddress = false
      },
      save_change_address: function() {
        var _this = this
        var temp_url = urls.change_address + '?';
        for (var item in this.receive) {
          temp_url += item + '=' + this.receive[item] + '&'
        }
        temp_url += 'userid=' + this.cofirmOrderInfo.userid + '&orderId=' + this.cofirmOrderInfo.orderId + '&productId=' + this.$route.query.pId
        // 上传记录
        this.axios.post(temp_url).then((response) => {
          if (response.data.code != 200) { alert("抱歉，保存新地址失败了，请一会儿重试！"); return false }
          _this.changingAddress = false
          // 更新地址显示
          _this.createOrder()
        })
      },
      changeAddress: function() {
        this.changingAddress = true;
      },
      // 选择优惠方式：
      chooseThisVoucher: function(index, value, id) {
        if (this.using_voucher.index == index) {
          this.using_voucher.index = -1
          this.using_voucher.value = 0
          this.using_voucher.id = -1
        } else {
          if (this.discountType == 0) {
            this.using_balance.used = false
          }
          this.using_voucher.index = index
          this.using_voucher.value = value
          this.using_voucher.id = id
        }
      },
      useBalance: function() {
        if (!this.using_balance.used) {
          if (this.discountType == 0) {
            this.using_voucher.index = -1
            this.using_voucher.value = 0
            this.using_voucher.id = -1
          }
          this.using_balance.used = true
        } else {
          this.using_balance.used = false
        }
      },
      // 确认支付
      cofirmOrder: function() {
        var _this = this
        // 打包:
        if (!this.discountType) {
          if (this.using_balance.used) { this.cofirmOrderInfo.discountMethods = 'YE' } else if (this.using_voucher.id != -1) {
            this.cofirmOrderInfo.discountMethods = 'DJQ'
            this.cofirmOrderInfo.ticketId = this.using_voucher.id
          }
        } else if (this.discountType && (this.using_voucher.id != -1) && this.using_balance.used) {
          this.cofirmOrderInfo.discountMethods = 'DJQ,YE'
        }
        // 创建url：
        var temp_url = urls.confirm_order + '?';
        for (var item in this.cofirmOrderInfo) {
          if (item == 'discountMethods' && this.cofirmOrderInfo.discountMethods == '') continue;
          temp_url += item + '=' + this.cofirmOrderInfo[item] + '&'
        }
        temp_url = temp_url.slice(0, -1)
        // 提交订单：
        this.axios.post(temp_url).then((response) => {
          if (response.data.code != 200) return false
          // 做到这里了
          _this.cashier.value = response.data.result.finalFee
          _this.cashier.show = true
          _this.getWeixinCode(_this.cofirmOrderInfo.orderId)
        })
      },
      getWeixinCode: function(order_id) {
        var _this = this
        this.axios.get(urls.wxcode + '?order_id=' + order_id).then((response) => {
          // if (response.data.code != 200) return false
          _this.cashier.weixin = response.data.url
        })
      },
    }
  }

</script>
<style lang="less" data-name="order-page-style">
  .dialog {
    padding: 40px;
    &>* {
      margin-bottom: 40px;
    }
    h5 {
      margin-bottom: 10px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #333333;
    }
    .list_of_address {
      li {
        box-sizing: border-box;
        width: 280px;
        height: 154px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333;
        padding: 15px;
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
        position: relative;
        border: 1px solid #ccc;
        h6 {
          position: relative;
          margin-bottom: 17px;
          font-weight: normal;
          padding: 0;
          &:after {
            bottom: -5px;
          }
        }
        p+p {
          margin-top: 10px;
        }
        p.right {
          text-align: right;
          font-size: 12px;
          color: #999;
          cursor: pointer;
          position: absolute;
          right: 15px;
          bottom: 15px;
        }
        &.cur {
          border: 5px solid #e37d28;
        }
        &.new {
          text-align: center;
          span {
            display: block;
            width: 40px;
            height: 40px;
            margin: 24px auto 10px;
            background-image: url('./images/plus.png')
          }
          font-size: 12px;
          color: #999;
        }
      }
    }
    .sale_table {
      border-color: #e5e5e5;
      background: #f9f9f9;
      td {
        vertical-align: middle;
        padding-left: 15px;
        padding-right: 15px;
      }
      thead td, tbody td:not(.title) {
        text-align: center;
      }
      tbody, .voucherlist li {
        background: #fff;
      }
      tbody>tr:first-child>td {
        border-top: 1px solid #e5e5e5;
      }
      thead td+td, tbody td+td {
        width: 150px;
      }
      tbody td+td {
        border-left: transparent;
      }
      .voucherlist {
        margin-bottom: 40px;
      }
      .voucherlist li {
        height: 57px;
        padding: 10px 23px;
        margin-right: 20px;
        margin-bottom: 10px;
        font-family: PingFangSC-Semibold;
        font-size: 24px;
        color: #666666;
        display: inline-block;
        border: 2px solid #e5e5e5;
        &.cur {
          border: 2px solid #E37D28;
        }
      }
      tr.hr {
        td {
          padding: 15px;
          border-top: none;
          clear: both;
          position: relative;
          .right {
            float: right;
          }
          &:after {
            content: "";
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 2px;
            background-image: url("/static/icon/hr_dots_wide.png");
            background-repeat: repeat-x;
          }
        }
        button {
          width: 64px;
          height: 26px;
        }
        button.used {
          background: #e5e5e5;
          color: #fff;
        }
      }
      tbody {
        .price {
          font-size: 18px;
        }
        .title {
          font-size: 18px;
          p:first-child {
            margin-bottom: 5px;
          }
        }
        tr {
          height: 77px;
        }
      }
      .price {
        font-family: PingFangSC-Semibold;
        color: #E37D28;
        font-weight: bold;
      }
      .small {
        font-size: 12px;
      }
      .grey {
        color: #999;
      }
      .light {
        color: #ccc;
      }
    }
    .foot {
      position: absolute;
      bottom: 30px;
      left: 0;
      width: 100%;
      height: 80px;
      text-align: right;
      line-height: 34px;
      background: #f9f9f9;
      border-top: 1px solid #e5e5e5;
      padding: 23px 42px;
      margin-bottom: 0;
      font-family: PingFangSC-Medium;
      bottom: 0;
      z-index: 1;
      >* {
        vertical-align: top;
      }
      span.p {
        font-size: 16px;
      }
      span.money {
        font-size: 24px;
        color: #e37d28;
      }
      button {
        background: #e37d28;
        width: 134px;
        height: 34px;
        margin-left: 30px;
      }
    }
  }
  .changingAddress {
    .form {
      width: 550px;
      padding: 40px;
      margin: auto;
      top: 20%;
      left: 0;
      right: 0;
      h2 {
        margin-bottom: 40px;
      }
      dt, dd {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin-bottom: 20px;
      }
      dt {
        width: 58px;
        padding-right: 5px;
      }
      input {
        width: 300px;
        height: 100%;
        padding-left: .5em;
      }
      button {
        width: 160px;
        height: 36px;
        line-height: 36px;
        margin-top: 20px;
        margin-left: 52px;
      }
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
      }
    }
  }

</style>

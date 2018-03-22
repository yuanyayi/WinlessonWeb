<template>
  <aside id="index_right">
    <index-message v-for="(module, index) in index_right.message" :module="module" :key="module.id"></index-message>
    <!-- <hfive v-for="(module, index) in index_right.hfive" :module="module" :key="module.id"></hfive> -->
    <index-balls v-for="(module, index) in index_right.balls" :module="module" :key="module.id"></index-balls>
    <index-talking v-for="(module, index) in index_right.topic" :module="module" :key="module.id"></index-talking>
    <index-hot v-for="(module, index) in index_right.hslider" :module="module" :key="module.id"></index-hot>
    <!-- 合作站点 -->
    <ul id="friends" class="cf" style="padding-top:1px; margn-bottom:34px;">
      <h4 class="hr">合作站点</h4>
      <a href="http://www.gjgwy.org/" target="_blank">
        <img src="http://img.winlesson.com/images/d209e58ee2eeddc56ef1d466e9bcd37d.jpeg" alt="国家公务员考试网">
        <p>国家公务员考试网</p>
      </a>
      <a href="http://www.gjgwy.net/" target="_blank">
        <img src="http://img.winlesson.com/images/4f74b1393baee4f9cf7528029b861844.jpeg" alt="国家公务员考试网">
        <p>国家公务员考试网</p>
      </a>
      <a href="http://www.dujiaoshou.cn/" target="_blank">
        <img src="http://img.winlesson.com/images/e0483fc077ccaf56e49abaab3aa9a36c.jpg" alt="独角兽网校">
        <p>独角兽网校</p>
      </a>
      <a href="http://www.ysedu.com/" target="_blank">
        <img src="http://img.winlesson.com/images/e056bb336400e581b66f05ba6e724208.jpg" alt="育德园师">
        <p>育德园师</p>
      </a>
      <a href="http://www.mbaschool.com.cn" target="_blank">
        <img src="http://img.winlesson.com/images/7a42522ac78635b432cc6377626d0400.jpg" alt="社科赛斯教育集团">
        <p>社科赛斯教育集团</p>
      </a>
      <a href="http://www.100chuan.cn" target="_blank">
        <img src="http://img.winlesson.com/images/aaa9411ef757278024cefbcfc37c01e4.jpg" alt="百川教育">
        <p>百川教育</p>
      </a>
    </ul>
    <!-- 咨询课程 -->
    <div id="consult"><!-- <a href="http://wpa.qq.com/msgrd?v=3&uin=2143880238&site=qq&menu=yes" style="display:block; width: 100%; height: 100%;"></a> --></div>
    <!-- 扫码 -->
    <ul id="v-code">
      <li class="am-u-sm-6">
        <img src="../../common/images/index_weixin.png" alt="">
        <p>扫码关注微信公众号</p>
      </li>
      <li class="am-u-sm-6">
        <img src="../../common/images/index_weibo.png" alt="">
        <p>扫码关注新浪微博</p>
      </li>
    </ul>
  </aside>
</template>
<script type="text/javascript">
  import IndexMessage from "./IndexMessage"
  import IndexBalls from "./IndexBalls"
  import IndexTalking from "./IndexTalking"
  import IndexHot from "./IndexHot"
  // import Hfive from "./Hfive"
  export default {
    name: "index-right",
    components: {
      // SearchBox,
      IndexMessage,
      IndexBalls,
      IndexTalking,
      IndexHot,
      // Hfive
    },
    computed: {
      count() {
        return this.$store.state.count
      },
      index_right() {
        return this.$store.state.index_right
      }
    }
  }

</script>
<style lang="less">
  @import url("../../common/style/var.less");
  // 首页右侧分栏
  #index_right {
    &>* {
      margin-bottom: 20px;
    }
    .row {
      margin-left: 0px;
      li {
        padding: 0;
      }
    }
    h4 {
      margin-bottom: 20px;
    }
    /* 正在发生 */
    #things_happening {
      background-color: @bg_light;
      padding-top: 15px;
      padding-bottom: 5px;
      &>* {
        padding-left: 10px;
        padding-right: 10px;
      }
      h5 {
        margin-bottom: 5px;
      }
      li {
        padding-top: 13px;
        padding-bottom: 13px;
        .font-r;
        font-size: 14px;
        color: @theme_red;
        cursor: pointer;
      }
      li:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    /* 球区 */
    #balls {
      width: 100%;
      line-height: 40px;
      .font-m;
      font-size: 16px;
      color: @theme_red;
      border-collapse: collapse;
      li {
        padding-left: 10px;
        padding-right: 10px;
        width: 50%;
        display: inline-block;
        border: 1px solid #e5e5e5;
      }
      li:nth-child(2n) {
        border-left: 0;
      }
      li:nth-child(n+3) {
        border-top: 0;
      }
    } // talking 来唠！
    #talking {
      padding-top: 1px;
      li {
        clear: both;
        .frame {
          width: 160px;
          height: 90px;
          float: left;
          margin-right: 10px;
          position: relative;
          .icon {
            position: absolute;
            width: 60px;
            height: 45px;
            bottom: 0;
            right: 5px;
          }
        }
        h5 {
          .font-m;
          font-size: 14px;
          color: @theme_red;
        }
      }
      li+li {
        margin-top: 30px;
      }
      p {
        font-size: 12px;
      }
      p.detail {
        margin-top: 5px;
        color: @font_light;
      }
      button {
        margin-top: 8px;
        width: 44px;
        .font-b;
        font-size: 12px;
      }
    } // 热门活动
    #hot_actives {
      li {
        height: 113px;
        margin-bottom: 20px;
        overflow: hidden;
      }
    } // 合作站点
    #friends {
      a {
        width: 90px;
        margin-bottom: 10px;
        margin-right: 15px;
        font-size: 12px;
        .font-m;
        color: @theme_red;
        text-align: center;
        vertical-align: top;
        &:nth-child(3n+1) {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 54px;
          margin-bottom: 10px;
        }
      }
      &>*:nth-child(3n) {
        margin-right: 0;
      }
    } // 咨询课程
    #consult {
      height: 60px;
      line-height: 60px;
      margin-top: 40px;
      margin-bottom: 20px;
      background: @theme_yellow;
      border-radius: 4px;
      .one_bg_img;
      background-image: url("@{images}consult.png");
      cursor: pointer;
    } // 扫码
    #v-code li {
      width: 140px;
      padding: 0;
      &:first-child {
        margin-right: 20px;
      }
      img {
        width: 140px;
        height: 140px;
      }
      p {
        .font-r;
        font-size: 12px;
        color: @font;
        text-align: center;
        margin-top: 10px;
      }
    }
  }

</style>

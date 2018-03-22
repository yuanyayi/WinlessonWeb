<template>
  <ul id="bsk_aside_panel">
    <li> <a @click.prevent.stop="backToTop" id="asideTop" class="hide"></a> </li>
    <li> <a @click id="asideQQ" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2143880238&site=qq&menu=yes"></a> </li>
    <li> <a @click.prevent.stop id="asideWeixin"></a>
      <img src="./image/index_weixin.png"> </li>
    <li> <a @click.prevent.stop id="asideWeibo"></a>
      <img src="./image/index_weibo.png"> </li>
  </ul>
</template>
<script>
  document.onscroll = function() {
    var scrollTop = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;
    if (scrollTop > window.screen.height - 200) {
      $('#asideTop').removeClass('hide');
    } else {
      $('#asideTop').addClass('hide');
    }
  }
  export default {
    name: 'aside-panel',
    methods: {
      backToTop: function() {
        var doc = document.body.scrollTop == 0 ? $(document.documentElement) : $('body');
        doc.animate({ 'scrollTop': 0 });
      }
    }
  }

</script>
<style scope>
  #bsk_aside_panel {
    width: 48px;
    position: fixed;
    right: 6px;
    bottom: 30px;
    z-index: 800;
  }
  #bsk_aside_panel, #bsk_aside_panel * {
    margin: 0;
    padding: 0;
  }
  #bsk_aside_panel li {
    width: 48px;
    height: 48px;
    margin-bottom: 5px;
    position: relative;
  }
  #bsk_aside_panel li a {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #FAB200;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  #asideTop.hide {
    display: none;
  }
  #asideTop {
    background-image: url("./image/index_icons.png");
    background-position: 2px 0;
    background-size: 130%;
    position: relative;
  }
  #asideTop:after {
    content: "";
    display: block;
    height: 48px;
    width: 0;
    overflow: hidden;
    font-size: 14px;
    color: #fff;
  }
  #asideTop:hover:after {
    content: "返回顶部";
    width: 82px;
    height: 48px;
    line-height: 48px;
    position: absolute;
    top: 0;
    right: 48px;
    background-color: inherit;
    text-align: center;
    -webkit-transition: width .5s ease;
    -ms-transition: width .5s ease;
    -moz-transition: width .5s ease;
    -o-transition: width .5s ease;
    transition: width .5s ease;
  }
  #asideQQ {
    background-image: url("./image/index_icons.png");
    background-position: 0 -48px;
  }
  #asideQQ:after {
    content: "";
    display: block;
    height: 48px;
    width: 0;
    overflow: hidden;
    font-size: 14px;
    color: #fff;
  }
  #asideQQ:hover:after {
    content: "QQ咨询";
    width: 82px;
    height: 48px;
    line-height: 48px;
    position: absolute;
    top: 0;
    right: 48px;
    background-color: inherit;
    text-align: center;
    -webkit-transition: width .5s ease;
    -ms-transition: width .5s ease;
    -moz-transition: width .5s ease;
    -o-transition: width .5s ease;
    transition: width .5s ease;
  }
  #asideWeixin {
    background-image: url("./image/index_icons.png");
    background-position: 0 -144px;
  }
  #asideWeibo {
    background-image: url("./image/index_icons.png");
    background-position: 0 -192px;
  }
  #asideWeixin~img, #asideWeibo~img {
    width: 0px;
    height: 122px;
    display: none;
    position: absolute;
    top: -37px;
    right: 48px;
  }
  #asideWeixin:hover~img, #asideWeibo:hover~img {
    width: 128px;
    height: 122px;
    display: block;
  }

</style>

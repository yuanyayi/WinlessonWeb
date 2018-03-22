<template>
  <div class="container-fluid main cf">
    <aside class="news_left">
      <section id="speed">
        <h4>必胜快报</h4>
        <p v-for="item in infos" :data-info_id="item.info_id"><a :href="item.content" target='_blank'>{{item.title}}</a></p>
      </section>
      <!-- 列表 -->
      <ul class="funcs">
        <li v-for="module in categories" :data-module_id="module.id" @click="showModuleById" :class="{cur: module.id==currentModuleId}"> {{module.name}} </li>
      </ul>
    </aside>
    <div v-for="module in categories" class="news_right" v-show="module.id==currentModuleId">
      <h3>{{module.name}}</h3>
      <ul class="news-table">
        <li class="thead"><span>资讯标题</span><span>热度</span><span>回复</span><span>时间</span></li>
        <li v-for="arti in module.articles"> <a :href="arti.short_url" target='_blank'><span><b>{{arti.title}}</b></span><span>{{arti.view_count}}</span><span>{{arti.comment_count}}</span><span>{{arti.created_at | justDate}}</span></a> </li>
      </ul>
      <div class="page-controler" v-show="module.articles.length>50"><span>1-50条/共{{module.articles.length}}条</span><a class="prev"></a> <a class="next"></a> </div>
    </div>
  </div>
</template>
<script>
  import urls from 'common/js/urls.js'
  export default {
    name: "news",
    data() {
      return {
        infos: [],
        categories: [],
        currentModuleId: 0,
      }
    },
    created: function() {
      var _this = this;
      this.axios.get(urls.get_news_index).then(function(response) {
        _this.infos = response.data.infos
        _this.categories = response.data.categories
        _this.currentModuleId = response.data.categories[0].id
      })
    },
    filters: {
      justDate(value) {
        return value.slice(0, 10);
      }
    },
    methods: {
      showModuleById: function(event) {
        this.currentModuleId = event.target.getAttribute('data-module_id');
      }
    }
  }

</script>
<style lang="less">
  @import "../../common/style/var.less";
  @icon: "../../common/images/";
  .news_left, .news_right {
    float: left;
  }
  .news_left {
    width: 200px;
    margin-right: 40px;
    #speed {
      border: 1px solid #ffbc42;
      padding: 15px 7px;
      background: #fffcf0;
      margin-bottom: 20px;
      h4 {
        margin-top: 0;
        margin-bottom: 15px;
      }
      p {
        color: #e37d28;
        padding-left: 3px;
        padding-right: 3px;
      }
      p+p {
        margin-top: 7px;
      }
    }
  }
  .news_right {
    width: 700px;
    b {
      font-weight: normal;
    }
    h3 {
      margin-bottom: 20px;
    }
    .news-table {
      li {
        height: 40px;
        padding: 10px 0;
        text-align: left;
        font-size: 14px;
        position: relative;
        span {
          display: inline-block;
        }
        span:first-child {
          width: 460px;
          color: #e37d28;
          .one_line_text;
        }
        span:nth-child(2) {
          width: 60px;
          color: #e37d28;
        }
        span:nth-child(3) {
          width: 60px;
          color: @default;
        }
        span:last-child {
          width: 120px;
          color: @font_light;
        }
        &:after {
          .hr-after-inner;
          bottom: 0;
        }
        &:hover span:first-child b {
          background-color: #e37d28;
          color: #fff;
        }
      }
      li.thead {
        .font-r;
        font-size: 12px;
        color: @font;
        padding-top: 18px;
        padding-bottom: 5px;
        span {
          color: inherit;
          font-size: inherit;
          vertical-align: top;
          line-height: 17px;
        }
        &:after {
          .hr-after-inner.dark;
          bottom: 0;
        }
        &:hover {
          background-color: #fff;
        }
      }
    } // 课程右上控制器轮播图
    .page-controler {
      margin-top: 20px;
      @t_height: 25px;
      height: @t_height;
      line-height: @t_height;
      text-align: right;
      &>* {
        vertical-align: top;
      }
      a {
        display: inline-block;
        opacity: 1;
        width: 25px;
        height: 25px;
        .one_bg_img;
        cursor: pointer;
      }
      a.prev {
        background-image: url("@{icon}prev.png");
        margin-left: 10px;
      }
      a.next {
        background-image: url("@{icon}next.png");
        margin-left: 15px;
      }
      span {
        .font-r;
        font-size: 12px;
        color: @font_light;
      }
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
      &.router-link-exact-active, &.cur {
        background-color: @theme_yellow;
      }
      a {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .hr-after-inner {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-image: url("@{icon}hr_dots.png");
    .dark {
      background-image: url("@{icon}hr_dots_dark.png");
    }
  }

</style>

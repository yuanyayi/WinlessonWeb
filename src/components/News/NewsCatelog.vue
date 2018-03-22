<template>
  <div v-for="module in categories" class="news_right" v-show="module.id==currentModuleId">
    <h3>{{module.name}}</h3>
    <ul class="news-table">
      <li class="thead"><span>资讯标题</span><span>热度</span><span>回复</span><span>时间</span></li>
      <li v-for="arti in module.articles"> <a :href="arti.short_url" target='_blank'><span><b>{{arti.title}}</b></span><span>{{arti.view_count}}</span><span>{{arti.comment_count}}</span><span>{{arti.created_at | justDate}}</span></a> </li>
    </ul>
    <div class="page-controler" v-show="module.articles.length>50"><span>1-50条/共{{module.articles.length}}条</span><a class="prev"></a> <a class="next"></a> </div>
  </div>
</template>

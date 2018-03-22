<template>
  <ul id="things_happening">
    <h4 style="margin-bottom: 0;">{{module.title}}</h4>
    <li v-for="(item, index) in module.contentpagemessage_datas" :title="item.paramters.title">
      <a target="_blank" :href="item.skip_web_content">{{item.paramters.title}}</a>
    </li>
  </ul>
</template>
<script>
  export default {
    name: "index-message",
    props: ['module'],
  }
</script>

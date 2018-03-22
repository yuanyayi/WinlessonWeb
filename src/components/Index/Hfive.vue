<template>
  <ul id="hfive" >
    <li v-for="item in module.contentpagehfive_datas">
      <iframe :name="'hfive'+item.id" :src="item.web_url"></iframe>
    </li>
  </ul>
</template>
<script type="text/javascript">
  export default {
    name: 'hfive',
    props: ['module'],
    data(){
      return {
        course_id: '',
      }
    },
    mounted: function(){
      console.log(window.frames["hfive8"].document.getElementsByTagname("script"))
    }
  }
</script>

<style lang="less">
  #hfive {
    li {
      height: 150px;
    }
  }
</style>
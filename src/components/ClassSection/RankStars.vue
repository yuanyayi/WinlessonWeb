<template> <span class="rank">
    <span class="rank_stars">
      <img src="./images/combined_stars.png">
    <img class="large" src="./images/combined_stars_large.png">
    <i :style="'width: '+lengthOfStars(point)"></i>
    </span><b>{{point}}</b> </span>
</template>
<script>
  export default {
    name: "rank-stars",
    props: ["point"],
    methods: {
      lengthOfStars: function(num) {
        var num = num || ''
        typeof(num) == 'number' ? num: num = parseInt(num)
        return num * 10 + "%"
      }
    }
  }

</script>
<style lang="less">
  .rank {
    &, &>* {
      vertical-align: middle;
    }
    .rank_stars {
      width: 62px;
      height: 10px;
      display: inline-block;
      position: relative;
      background-color: #f2f2f2;
      text-align: left;
      margin-right: 5px;
      vertical-align: -4px;
      img {
        width: 100%;
        display: block;
        position: absolute;
        left: 0;
        z-index: 1;
      }
      img.large {
        display: none;
      }
      i {
        background-color: #ffbc42;
        vertical-align: top;
        height: 100%;
      }
    }
    &.large {
      .rank_stars {
        width: 148px;
        height: 22px;
        img {
          display: none;
        }
        img.large {
          display: block;
        }
      }
      b {
        display: none;
      }
    }
  }

</style>

<template>
  <li>
    <div class="frame">
      <img :src="item.userInfo.imageUrl">
    </div>
    <p class="name">{{item.userInfo.nickname}}
      <span class="fr">
        <span class="from mr15">来自 必胜公考APP</span>
        <span class="time">{{item.createTime}}</span></span>
    </p>
    <p class="content">{{item.content}}</p>
  </li>
</template>

<script>
  export default {
    name: 'interaction-li',
    props: ['item'],
  }
</script>
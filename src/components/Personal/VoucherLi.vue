<template>
  <li class="coupon" :data-id="voucher.id" :data-value="voucher.value"> <i class="rightCheck"></i>
    <div class="content">
      <div class="fr">
        <p class="money">￥<span>{{voucher.value}}</span></p>
        <p>满{{voucher.minValue}}元可用</p>
      </div>
      <p class="title font-m font-16">{{voucher.name}}</p>
      <p class="mb10">有效期至<span>{{voucher.inValidTime}}</span></p>
      <p class="font-m">适用课程</p>
      <p class="font-grey mb10">{{voucher.scopeDesc}}</p>
      <p class="detail font-lightgrey">{{voucher.description}}</p>
    </div>
  </li>
</template>

<script>
  export default {
    name: "voucher-li",
    props: ['voucher']
  }
</script>

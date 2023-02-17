<script>
export default {
  name: "lbt",
  props: ["lbtArr", "width", "auto", "height", "hPix"],
  mounted() {},
};
</script>
<template>
  <div class="swiper">
    <mt-swipe :auto="auto" :style="{ height: height + hPix }">
      <mt-swipe-item v-for="item of lbtArr" :key="item.id">
        <img :src="item.src" :style="{ width: width + '%' }" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<style lang="less">
.swiper {
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
  }
}
</style>

<script>
import mui from "../../assets/mui/js/mui.js";
export default {
  name: "pics-list",
  data() {
    return {
      cate: [],
      listArr: [],
      id: 1,
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    this.getPicCate();
    this.getPicList(0);
  },
  methods: {
    async getPicCate() {
      const result = await this.axios.get("/api/getimgcategory");

      if (result.meta.status == 0) {
        this.cate = result.message;
      }
    },
    async getPicList(id) {
      console.log(id);
      const result = await this.axios.get("/api/getimages/" + id);
      if (result.meta.status == 0) {
        this.listArr = result.message;
      }
    },
  },
};
</script>
<template>
  <div class="pic-list">
    <div
      id="sliderSegmentedControl"
      class="
        mui-scroll-wrapper
        mui-slider-indicator
        mui-segmented-control
        mui-segmented-control-inverted
      "
    >
      <div class="mui-scroll">
        <a
          href=":javascript:;"
          :class="['mui-control-item', { 'mui-active': item.cateId == id }]"
          data-wid="tab-top-subpage-1.html"
          v-for="item of cate"
          :key="item.cateId"
          @click="getPicList(item.cateId)"
        >
          {{ item.title }}
        </a>
      </div>
    </div>
    <!-- list -->
    <ul class="list">
      <li v-for="item of listArr" :key="item.id">
        <img v-lazy="item.img_url" />
        <p>{{ item.zhai_yao }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.pic-list {
  background: #ffffff;
  .list {
    padding: 0.266667rem;
    li {
      position: relative;
      height: 10rem;
      margin-bottom: 0.4rem;
      list-style: none;
      border-radius: 0.106667rem;
      box-shadow: 0 -1px 10px 0 #81d4fa, 1px 0 10px 0 #81d4fa,
        0 1px 10px 0 #81d4fa, -1px 0 10px 0 #81d4fa;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        left: 0;
        bottom: 0.133333rem;

        box-sizing: border-box;
        height: 2rem;
        line-height: 0.6rem;
        width: 100%;
        color: #ffffff;
        font-size: 0.4rem;
        padding: 0.2rem 0.2rem 0 0.2rem;

        background-color: #000;
        filter: alpha(opacity=40);
        background: rgba(0, 0, 0, 0.4);

        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
  background: url("../../assets/images/loading.webp");
}
</style>
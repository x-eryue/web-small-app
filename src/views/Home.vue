<script>
import swipe from "../components/lbt.vue";
export default {
  name: "home",
  data() {
    return {
      lbtArr: [],
    };
  },
  mounted() {
    this.getLunBo();
  },
  methods: {
    async getLunBo() {
      try {
        const result = await this.axios.get("/pics/getlunbo");
        const { meta, message } = result;
        if (meta.status == 200) {
          this.lbtArr = message;
        } else {
          console.log(meta.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  components: {
    swipe,
  },
};
</script>
<template>
  <div class="home">
    <!-- 轮播图 -->
    <swipe :lbtArr="this.lbtArr" :width="100" :acto="4000"></swipe>
    <!-- 九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/news-list">
            <img
              src="../assets/images/gird/menu1.png"
              alt="新闻资讯"
              title="新闻资讯"
            />
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/pic-list">
            <img
              src="../assets/images/gird/menu2.png"
              alt="新闻资讯"
              title="新闻资讯"
            />
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/goods-list">
            <img
              src="../assets/images/gird/menu3.png"
              alt="新闻资讯"
              title="新闻资讯"
            />
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/news-list">
            <img
              src="../assets/images/gird/menu4.png"
              alt="新闻资讯"
              title="新闻资讯"
            />
            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/news-list">
            <img
              src="../assets/images/gird/menu5.png"
              alt="新闻资讯"
              title="新闻资讯"
            />
            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/news-list">
            <img
              src="../assets/images/gird/menu6.png"
              alt="新闻资讯"
              title="新闻资讯"
            />
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home .mui-content > .mui-table-view:first-child {
  margin-top: 0;
}
.home .mui-grid-view.mui-grid-9 {
  background-color: #fff;
  /* border: none; */
}
.home .mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>

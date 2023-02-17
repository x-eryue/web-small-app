<script>
import cmt from "../../components/Comment.vue";
export default {
  name: "news-list",
  data() {
    return {
      news_id: this.$route.query.news_id,
      newsInfo: {},
    };
  },
  components: {
    cmt,
  },
  mounted() {
    this.getNewsInfo();
  },
  methods: {
    async getNewsInfo() {
      try {
        const ret = await this.axios.get("/api/getnew/" + this.news_id);
        const { meta, message } = ret;
        if (meta.status !== 1) {
          this.newsInfo = message;
        }
      } catch (err) {}
    },
  },
};
</script>
<template>
  <div class="news-info">
    <div class="header">
      <h2 class="title">{{ newsInfo.title }}</h2>
      <p class="info">
        <span>{{ newsInfo.add_time }}</span>
      </p>
    </div>
    <div class="cont" v-html="newsInfo.content"></div>
    <cmt :newsId="news_id"></cmt>
  </div>
</template>
<style lang="less" scoped>
.news-info {
  background: #fff;

  // 40px
  padding: 0 0.533333rem 1rem 0.533333rem;
  .header {
    border-bottom: 0.026667rem solid #f0f0f0;

    margin-bottom: 0.4rem;
    .title {
      // 40px
      font-size: 0.533333rem;
      font-weight: 500;
      //   20px
      margin-bottom: 0.266667rem;
    }
    .info {
      display: flex;
      justify-content: space-between;
      font-size: 0.266667rem;
      color: #666666;
    }
  }
  .cont {
    padding: 0 0.533333rem 0.533333rem 0.533333rem;
    margin-bottom: 0.533333rem;
    font-size: 0.48rem;
    color: #000000;
    /deep/.content {
      line-height: 0.8rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
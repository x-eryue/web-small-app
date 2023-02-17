<script>
export default {
  name: "newslist",
  data() {
    return {
      listArr: [],
    };
  },
  mounted() {
    this.getNewsList();
  },
  methods: {
    async getNewsList() {
      const ret = await this.axios.get("/api/getnewslist");
      const { meta, message } = ret;
      if (meta.status !== 1) {
        this.listArr = message;
      } else {
        this.msg = meta.msg;
      }
    },
    gotoNewsInfo(news_id) {
      this.$router.push({ path: "/news-info", query: { news_id } });
    },
  },
};
</script>
<template>
  <div class="newslist">
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item of listArr"
        :key="item.news_id"
        @click="gotoNewsInfo(item.news_id)"
      >
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h5 class="mui-ellipsis">{{ item.title }}</h5>
            <div>
              <span>发表时间:{{ item.add_time }}</span>
              <span>点击:{{ item.click }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
</style>
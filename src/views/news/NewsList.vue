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
      try {
        const result = await this.axios.get("/news/getnewslist");
        const { meta, message } = result;
        if (meta.status == 200) {
          this.listArr = message;
        } else {
          console.log(meta.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    gotoNewsInfo(news_id) {
      this.$router.push({ path: "/home/news-info", query: { news_id } });
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
              <span>发表时间:{{ item.add_time | formData }}</span>
              <span>点击:{{ item.click }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped></style>

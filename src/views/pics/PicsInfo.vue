<script>
import router from "@/router";
export default {
  name: "pics-info",
  data() {
    return {
      picInfo: {},
      thum: {},
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.getPicInfo();
    this.getThum();
  },
  methods: {
    prediv(src) {},
    async getPicInfo() {
      const result = await this.axios.get(`/pics/getimageInfo/${this.id}`);
      const { meta, message } = result;
      if (meta.status == 200) {
        this.picInfo = message;
      }
    },
    async getThum() {
      const result = await this.axios(`/pics/getgoodsthum/${this.id}`);
      const { meta, message } = result;
      if (meta.status == 200) {
        this.thum = message;
      }
    },
  },
};
</script>
<template>
  <div class="pics-info">
    <div class="header">
      <div class="title one-elli">
        {{ picInfo.title }}
      </div>
      <div class="info">
        <span>发表时间 : {{ picInfo.add_time | formData }}</span>
        <span>点击 : {{ picInfo.click }}</span>
      </div>
    </div>
    <!-- thum -->
    <div class="thum">
      <div
        class="thum-card"
        v-for="(item, index) in thum"
        :key="index"
        @click="prediv(item.src)"
      >
        <img :src="item.src" />
      </div>
    </div>
    <!-- v-html -->
    <div class="content" v-html="picInfo.content"></div>
  </div>
</template>
<style lang="less" scoped>
.pics-info {
  padding: 0.1333rem 0.2667rem;
}

.header {
  height: 2.1333rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-bottom: 0.0533rem solid #ededed;
  margin-bottom: 0.5333rem;
}

.title {
  color: #00b0ff;
  font-size: 0.4rem;
  line-height: 0.4rem;
}

.info {
  font-size: 0.3467rem;
  color: #666666;
  display: flex;
  justify-content: space-between;
}

.thum {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 0.2667rem;
}

.thum .thum-card:last-child {
  margin-right: 0;
}

.thum-card {
  height: 2.9333rem;
  width: 2.8rem;
  border-radius: 0.08rem;
  margin-right: 0.3467rem;
}

.thum-card img {
  width: 100%;
  height: 100%;
}

.content {
  font-size: 30rpx;
  line-height: 1.8;
}
</style>

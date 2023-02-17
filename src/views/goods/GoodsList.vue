<script>
export default {
  name: "goods-list",
  data() {
    return {
      listArr: [],
      pageindex: 1,
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      let result = await this.axios.get(
        "/api/getgoods?pageindex=" + this.pageindex
      );
      console.log(result);
      result.meta.status === 0 ? (this.listArr = result.message) : "";
    },
  },
};
</script>
<template>
  <div class="goods-list">
    <router-link
      :to="{ path: '/goods-info', query: { id: item.id } }"
      class="mui-card"
      v-for="item of listArr"
      :key="item.id"
      tag="div"
    >
      <div class="mui-card-header">
        <img :src="item.img_url" alt="" />
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <h4>{{ item.title }}</h4>
        </div>
      </div>
      <div class="mui-card-footer">
        <div class="price">
          <strong>￥{{ item.market_price }}</strong>
          <i>￥{{ item.sell_price }}</i>
        </div>
        <div class="hot">
          <span>热卖中</span>
          <span>剩余{{ item.stock_quantity }}件</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.1rem 0.1rem 50px 0.1rem;
  width: 100%;
  .mui-card-header,
  .mui-card-content-inner {
    padding: 0;
  }
  .mui-card-content-inner {
    h4 {
      height: 1.4rem;
      font-size: 0.48rem;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      margin: 0;
    }
  }
  .mui-card-footer {
    padding: 0;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: #eee;
    height: 1.1733rem;
    div {
      width: 100%;
    }
    .price {
      display: flex;
      font-size: 0.48rem;
      strong {
        display: block;
        color: red;
        font-weight: normal;
        margin-right: 0.213333rem;
      }
      i {
        display: block;
        text-decoration: line-through;
        color: #9b9b9b;
        font-size: 0.36rem;
      }
    }
    .hot {
      display: flex;
      justify-content: space-between;
      font-size: 0.16rem;
    }
  }
  .mui-card {
    margin: 0;
    width: 49%;
    min-height: 7rem;
    margin-bottom: 0.48rem;
    img {
      height: 5.333333rem;
      width: 100%;
    }
  }
}
</style>
<script>
import swipe from "../../components/lbt.vue";
import numberBox from "../../components/NumberBox";
import { mapActions } from "vuex";
export default {
  name: "goods-info",
  data() {
    return {
      id: this.$route.query.id,
      goodsInfo: {},
      lbtArr: [],
      curVal: 1,
    };
  },
  mounted() {
    this.getGoodsInfo();
    this.getGoodsLbt();
  },
  methods: {
    async getGoodsInfo() {
      try {
        const result = await this.axios({
          url: "/goods/getinfo/" + this.id,
          method: "get",
        });
        const { meta, message } = result;
        if (meta.status == 200) {
          this.goodsInfo = message;
        } else {
          console.log(meta.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getGoodsLbt() {
      try {
        const result = await this.axios({
          url: "/goods/getgoodslunbo/" + this.id,
          method: "get",
        });
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
    changeValue(val) {
      this.curVal = Number.parseInt(val);
    },
    ...mapActions({
      add_car: "add_to_car",
    }),
    addToCar() {
      //  car需要的数据 id ,cou pic 库存 当前价格
      const data = {
        id: this.id,
        cou: this.curVal,
        img_url: this.goodsInfo.img_url,
        stock_quantity: this.goodsInfo.stock_quantity,
        sell_price: this.goodsInfo.sell_price,
        title: this.goodsInfo.title,
        select: true,
      };
      this.add_car(data);
    },
  },
  components: {
    swipe,
    numberBox,
  },
};
</script>
<template>
  <div class="goods-info">
    <!-- lbt card -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner g-lbt">
          <swipe
            :lbtArr="lbtArr"
            :width="50"
            :height="5.5"
            :hPix="'rem'"
          ></swipe>
        </div>
      </div>
    </div>
    <!-- tools info -->
    <div class="mui-card">
      <div class="mui-card-header">
        <h4 class="one-elli">{{ goodsInfo.title }}</h4>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <span class="market"
              >市场价:￥ <i>{{ goodsInfo.market_price }}</i></span
            >
            <span class="sell"
              >销售价:￥
              <i style="color: red">{{ goodsInfo.sell_price }}</i></span
            >
          </div>
          <div class="box-num">
            <span>购买数量:</span>
            <number-box
              @changeVal="changeValue"
              :value="curVal"
              :maxNum="goodsInfo.stock_quantity"
              :minNum="1"
            ></number-box>
          </div>
          <div class="g-btn">
            <mt-button type="primary" size="normal">立即购买</mt-button>
            <mt-button type="danger" size="normal" @click="addToCar"
              >加入购物车</mt-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- info -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner g-param">
          <span>商品货号:{{ goodsInfo.goods_no }}</span>
          <span>库存情况:{{ goodsInfo.stock_quantity }}</span>
          <span>上架时间:{{ goodsInfo.add_time | formData }}</span>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large">图文介绍</mt-button>
        <mt-button type="danger" plain size="large">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.goods-info {
  background: #fff;
  line-height: 1.5;
  padding-bottom: 50px;
  .mui-card-content-inner.g-lbt {
    padding: 0;
  }
  .mui-card-content {
    font-size: 0.4rem;
  }
  .mui-card-content-inner {
    padding: 0.4rem;
  }
  h4 {
    font-weight: normal;
  }
  .market {
    margin-right: 0.4rem;
    i {
      text-decoration: line-through;
    }
  }
  .g-btn {
    .mint-button {
      height: 1.2rem;
      width: 3.6rem;
    }
    .mint-button--primary {
      margin-right: 0.4rem;
    }
  }
  .g-param {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    span {
      flex: 1;
      padding: 0.2rem;
    }
  }
  .mui-card-footer {
    display: block;
    .mint-button--primary {
      margin-bottom: 0.4rem;
    }
  }
  .box-num {
    display: flex;
    align-items: center;
    margin: 0.2rem 0;
  }
}
</style>

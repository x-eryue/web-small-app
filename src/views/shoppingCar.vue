<script>
import { mapState, mapActions, mapGetters } from "vuex";
import numberBox from "../components/NumberBox.vue";
export default {
  name: "shopping-car",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      carData: "carData",
    }),
  },
  components: {
    numberBox,
  },
  methods: {
    changeSwitch(e, id) {
      let select = e;
      this.updated_select({ id, select });
    },
    remove(id) {
      this.remove_goods(id);
    },
    changeVlue(val, id) {
      let data = {
        id,
        cou: parseInt(val),
      };
      console.log(data);
      this.updated_car_num(data);
    },
    ...mapActions(["updated_select", "remove_goods", "updated_car_num"]),
    ...mapGetters({
      con: "get_car_cou",
      price: "count_goods_price",
    }),
  },
};
</script>
<template>
  <div class="shopping-car">
    <div class="mui-card" v-for="item of carData" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner car-card">
          <!-- 左 -->
          <div class="left">
            <mt-switch
              v-model="item.select"
              @change="changeSwitch($event, item.id)"
            ></mt-switch>
          </div>
          <!-- 中 -->
          <div class="center">
            <img :src="item.img_url" />
          </div>
          <!-- 右 -->
          <div class="right">
            <h4 class="top one-elli">{{ item.title }}</h4>
            <div class="bottom">
              <span>￥{{ item.sell_price }}</span>
              <numberBox
                :value="item.cou"
                @changeVal="changeVlue($event, item.id)"
              ></numberBox>
              <a href="javascript:;" @click="remove(item.id)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jie-suan">
          <div class="text">
            <span>总计(不含运费)</span>
            <span>
              已勾选商品
              <i style="color: red">{{ con() }}</i
              >件
            </span>
            <span
              >总价:<i style="color: red">￥{{ price() }}</i></span
            >
          </div>
          <div class="btn">
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@font-size: 0.4rem;
.shopping-car {
  background: #fff;
  .car-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.8rem;
    .center {
      padding: 0 0.2667rem;
      img {
        height: 2.2rem;
        width: 1.2rem;
      }
    }
    .right {
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      font-size: @font-size;
      .top {
        font-size: @font-size;
      }
      .bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .jie-suan {
    height: 3rem;
    font-size: @font-size;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
    .text {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      i {
        padding: 0 0.2rem;
      }
    }
    .btn {
      display: flex;
      justify-content: space-between;
      align-content: center;
      flex-wrap: wrap;
      .mint-button {
        font-size: 0.5rem;
        width: 3rem;
        height: 1rem;
      }
    }
  }
}
</style>

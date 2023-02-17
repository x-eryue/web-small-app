const getters = {
  get_car_cou(state) {
    let cou = 0;
    state.carData.map((item) => {
      if (item.select) {
        cou += item.cou;
      }
    });
    return cou;
  },
  count_goods_price(state) {
    let price = 0;
    let floatPrice;
    state.carData.map((item) => {
      if (item.select) {
        floatPrice = (item.sell_price * 10 * item.cou) / 10;
        price += floatPrice;
      }
    });
    return price;
  },
};
export default getters;
/**
 * getters 类似于计算属性
 *
 * getters不会修改数据，只是把数据安照我们自己的需求，做了重新的组织和包装
 *
 * this.$store.getters.名称
 *
 * 使用mapGetters来映射到methods中
 * mapGetters
 * ...mapGetters(['名'])
 *
 *
 */

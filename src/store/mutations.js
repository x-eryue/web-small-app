import {
  ADD_TO_CAR,
  UPDATED_SELECT,
  REMOVE_GOODS,
  UPDATED_CAR_NUM,
} from "./mutations-type";
// 专门用来 修改state中的数据的
// 如果要修改state中的数据，必须调用mutations 提供的方法

// [] 解释 在es6中字面量定义对象时，用表达式作为对象的属性名，把表达式放在方括号内
const mutations = {
  [ADD_TO_CAR](state, data) {
    // 判断商品是否存在
    // id筛选
    let carArr = state.carData.filter((item) => item.id == data.id);

    if (state.carData.length == 0 || carArr.length == 0) {
      // 空 或id不重复 直接添加
      state.carData.push(data);
    } else {
      carArr[0].cou += data.cou;
    }
    localStorage.setItem("carData", JSON.stringify(state.carData));
  },
  [UPDATED_SELECT](state, data) {
    let carArr = state.carData.filter((item) => item.id == data.id);
    carArr.select = data.select;
    localStorage.setItem("carData", JSON.stringify(state.carData));
  },
  [REMOVE_GOODS](state, id) {
    let index = state.carData.findIndex((item) => item.id == id);
    state.carData.splice(index, 1);
    localStorage.setItem("carData", JSON.stringify(state.carData));
  },
  [UPDATED_CAR_NUM](state, data) {
    let carArr = state.carData.filter((item) => item.id == data.id);
    carArr[0].cou = data.cou;
    localStorage.setItem("carData", JSON.stringify(state.carData));
  },
};
export default mutations;
/**
 * 如果要在组件中调用mutations的函数只能通过 this.$store.commit('函数名')
 * 使用mapMutations来映射到methods中
 * ...mapMutations(['名'])
 * mutations 传递参数只能传递一个唯一的参数
 * 如果要传递多个参数 ，可以以数组或对象的形式传递
 *
 *
 * */

const actions = {
  add_to_car({ commit }, data) {
    commit("ADD_TO_CAR", data);
  },
  updated_select({ commit }, data) {
    commit("UPDATED_SELECT", data);
  },
  remove_goods({ commit }, id) {
    commit("REMOVE_GOODS", id);
  },
  updated_car_num({ commit }, data) {
    commit("UPDATED_CAR_NUM", data);
  },
};
export default actions;
/**
 * 动作
 *
 * this.$store.dispatch('m')
 *
 * actions 提交的是mutation， 而不是直接变更状态
 * actions 可以包含任意的异步操作
 * mutation只能放同步操作
 *
 * mutation中写异步的方法无法被测试工具监听到数据的变化
 *
 * actions = {
 *  newAdd(context){
 * 在actions 可以定义一些我们的行为，才提对应的mutations 方法
 * 在actions中 不能直接操作state，如果想修改state值，只能在actions中提交对应的mutations
 *
 * context.comit('add')
 *  }
 * };
 *
 * 使用mapActions来映射到methods中
 * ...actions([""])
 *
 */

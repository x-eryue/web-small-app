import Vue from "vue";
import Vuex from "vuex";
//
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
Vue.use(Vuex);
// 公共的状态对象
export default new Vuex.Store({
  // mapState 映射状态
  state,
  // 类似于计算属性 包装
  getters,
  // mapMutations 映射行为
  mutations,
  // 动作
  actions,
});
// 1. 什么是Vuex
// vuex 是为了实现组件之间数据共享的一种机制
// 2. 为什么要有Vuex
// 因为使用父子传递或者兄弟传值，太麻烦了；不好管理，项目代码写起来太麻烦
// 当有了VUEX，想要共享数据，只需要把数据挂债到vuex就行，想要获取数据，直接从vuex上拿就行
// 当vuex中的数据被修改之后，其他引用了此数据的组件，也会被同步更新
// 注意：只有组件间共享的数据，才有必要存储到vuex中，组件自己私有的数据，还要存储到自己的data中

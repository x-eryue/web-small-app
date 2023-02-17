const carData = JSON.parse(localStorage.getItem("carData")) || [];
// 存储数据
const state = {
  carData,
};
export default state;
// this.$store.state
/**
 * compute: mapState({
 * count:state=>state.count
 * countAlias:'count'
 * countPluslLocalState(state){
 * return state.count + this.localCount
 * }
 * })
 *
 */

// mapState 辅助函数
// import {mapState} from 'vuex'
/**
 * compute mapState([
 * 映射this.$store.state.count
 * 'count'
 * ])
 *
 */

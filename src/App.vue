<script>
import mui from "./assets/mui/js/mui.js";
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    this.title = this.$route.meta.title;
  },
  updated() {
    this.title = this.$route.meta.title;
  },
  computed: {
    isBackShow: function () {
      return this.$route.meta.title !== "首页";
    },
  },
  methods: {
    ...mapGetters({
      cou: "get_car_cou",
    }),
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<template>
  <div id="app">
    <!-- 顶部条 -->
    <mt-header fixed :title="title">
      <router-link to="/" slot="left" v-show="isBackShow">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <router-view />
    <!-- 底部nav -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item-new">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item-new">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
      <router-link to="/shopping-car" class="mui-tab-item-new">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" v-show="cou()">{{ cou() }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/users" class="mui-tab-item-new">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
    </nav>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #fff;
  height: 100%;
  //
  padding-top: 40px;
  padding-bottom: 50px;
  // 改类名解决tabbar 无法跳转问题
  .mui-bar-tab .mui-tab-item-new.mui-active {
    color: #007aff;
  }
  .mui-bar-tab .mui-tab-item-new {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }
  .mui-bar-tab .mui-tab-item-new .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-new .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

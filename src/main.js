import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
// 样式重置
import "./assets/css/normalize.css";
// 公共样式
import "./assets/css/common.css";
// flexible
import "./assets/js/flexible.js";
// min-ui
import "mint-ui/lib/style.css";
import { Header, Swipe, SwipeItem, Lazyload, Button, Switch } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);
// mui
import "./assets/mui/css/mui.min.css";
// mui icon扩展
import "./assets/mui/css/icons-extra.css";
// mui js
import "./assets/mui/js/mui.js";
// axios vue-axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://127.0.0.1:3000/api";
// 响应拦截器
axios.interceptors.response.use((res) => {
  return res.data;
});
Vue.filter("formData", function (val) {
  if (!val) return "";
  let numData = new Date().getTime(val);
  let d = new Date(numData);
  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();
  let h = d.getHours();
  if (h < 10) {
    h = "0" + h;
  }
  let m = d.getMinutes();
  if (m < 10) {
    m = "0" + m;
  }
  let s = d.getSeconds();
  if (s < 10) {
    s = "0" + s;
  }
  return `${year + "/" + month + "/" + date + " " + h + "-" + m + "-" + s}`;
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/shopping-car",
    name: "shopping-car",
    component: () => import("../views/shoppingCar.vue"),
    meta: {
      title: "购物车",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue"),
    meta: {
      title: "搜索",
    },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/Users.vue"),
    meta: {
      title: "用户",
    },
  },
  {
    path: "/home/news-list",
    name: "news-list",
    component: () => import("../views/news/NewsList.vue"),
    meta: {
      title: "新闻列表",
    },
  },
  {
    path: "/home/news-info",
    name: "news-info",
    component: () => import("../views/news/NewsInfo.vue"),
    meta: {
      title: "新闻详情",
    },
  },
  {
    path: "/home/goods-list",
    name: "goods-list",
    component: () => import("../views/goods/GoodsList.vue"),
    meta: {
      title: "商品列表",
    },
  },
  {
    path: "/home/goods-info",
    name: "goods-info",
    component: () => import("../views/goods/GoodsInfo.vue"),
    meta: {
      title: "商品详情",
    },
  },
  {
    path: "/home/pic-list",
    name: "pic-list",
    component: () => import("../views/pics/PicsList.vue"),
    meta: {
      title: "图片列表",
    },
  },
  {
    path: "/home/pic-info",
    name: "pic-info",
    component: () => import("../views/pics/PicsInfo.vue"),
    meta: {
      title: "图片详情",
    },
  },
  {
    path: "/users/logins",
    name: "logins",
    component: () => import("../views/users/Logins.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/users/register",
    name: "register",
    component: () => import("../views/users/Register.vue"),
    meta: {
      title: "注册",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "mui-active",
});

export default router;

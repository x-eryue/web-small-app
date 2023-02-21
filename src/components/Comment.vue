<script>
import { MessageBox } from "mint-ui";
export default {
  name: "comment",
  props: ["newsId"],
  data() {
    return {
      cmtValue: "",
      timer: null,
      token: null,
      isToken: false,
      user: {},
      list: [],
      pageindex: 1,
      disabled: false,
    };
  },
  mounted() {
    this.getCmtList();
  },
  methods: {
    async getCmtList() {
      try {
        const result = await this.axios.get(
          `/cmts/getcmts/${this.newsId}?pageindex=${this.pageindex}`
        );
        const { meta, message } = result;
        if (meta.status == 200) {
          this.list = message;
        }
      } catch (e) {
        console.log(e);
      }
    },
    btnClick() {
      this.disabled = true;
      // 提交时验证用户是否登录，有token验证token,没有token跳转登录页
      this.token = localStorage.getItem("token");
      if (this.token) {
        this.verifyToken();
        // token 验证成功则进行请求
      } else {
        MessageBox.confirm("你还没有登录", "请登录")
          .then((action) => {
            this.$router.push({ path: "/users/logins" });
            this.disabled = false;
          })
          .catch((cancel) => {
            this.disabled = false;
            console.log(cancel);
          });
      }
    },
    async verifyToken() {
      try {
        const result = await this.axios.post("/users/verifyToken", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const { meta, message } = result;
        if (meta.status == 200) {
          this.user = message;
          this.postCmt();
          this.disabled = false;
        } else {
          MessageBox.confirm("用户以过期", "请登录")
            .then((action) => {
              this.$router.push({ path: "/users/logins" });
            })
            .catch((cancel) => {
              console.log(cancel);
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async postCmt() {
      if (this.cmtValue.trim() == "") {
        alert("评论内容不能为空");
        return;
      }
      try {
        const result = await this.axios.post("/cmts/postcmts/" + this.newsId, {
          data: {
            content: this.cmtValue,
            user: this.user,
          },
        });
        const { meta, message } = result;
        if (meta.status == 200) {
          this.list.unshift(message);
          this.cmtValue = "";
        }
      } catch (e) {
        console.log(e);
      }
    },
    getMore() {
      this.pageindex + 1;
      this.getCmtList();
    },
  },
};
</script>
<template>
  <div class="comment">
    <div class="cmt-area">
      <h5>发表评论</h5>
      <textarea placeholder="文明用语" v-model="cmtValue"></textarea>
      <mt-button
        @click="btnClick"
        type="primary"
        size="large"
        :disabled="disabled"
        >提交</mt-button
      >
    </div>
    <div class="cmt-list">
      <div class="box" v-for="(item, index) of list" :key="index">
        <div class="user-info">
          <img :src="item.user_avatar" />
          <span>{{ item.nick_name }}</span>
        </div>
        <div class="content">{{ item.contents }}</div>
        <div class="add_time">{{ item.add_time | formData }}</div>
      </div>
    </div>
    <mt-button type="primary" size="large" plain @click="getMore">
      获取更多
    </mt-button>
  </div>
</template>

<style lang="less" scoped>
.comment {
  .cmt-list {
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    .box {
      height: auto;
      min-height: 3rem;
      max-height: 5rem;
      padding-top: 0.2rem;
      border-bottom: 1px solid salmon;
      font-size: 0.6rem;
      line-height: 0.6rem;
      .user-info {
        display: flex;
        display: -webkit-flex;
        img {
          height: 1.5rem;
          width: 1.5rem;
          border-radius: 50%;
        }
        span {
          padding-left: 0.6rem;
        }
      }
      .content {
        padding-left: 2.1rem;
        height: auto;
      }
    }
  }
}
</style>

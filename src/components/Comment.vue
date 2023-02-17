<script>
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
    };
  },
  mounted() {
    this.getCmtList();
  },
  methods: {
    async getCmtList() {
      const ret = await this.axios.get(
        `/api/getcomments/${this.newsId}?pageindex=${this.pageindex}`
      );
      console.log(111);
      this.list = this.list.concat(ret.message);
    },
    btnClick() {
      // 提交时验证用户是否登录，有token验证token,没有token跳转登录页
      this.token = localStorage.getItem("token");
      // 防抖
      if (this.token) {
        this.verifyToken();
        // token 验证成功则进行请求
      } else {
        alert("去登录");
      }
    },
    async verifyToken() {
      try {
        const { meta, message } = await this.axios.post(
          "/api/user/verifyToken",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (meta.status !== 1) {
          this.user = message;
          this.postCmt();
        } else {
          this.$router.push("/login");
          alert(meta.msg);
        }
      } catch (err) {}
    },
    async postCmt() {
      const ret = await this.axios.post("/api/postcomments/" + this.newsId, {
        data: {
          content: this.cmtValue,
          user: this.user,
        },
      });
    },
    changeCmtVal(e) {
      let val = e.target.value;
      this.cmtValue = val;
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
      <textarea placeholder="文明用语" @input="changeCmtVal"></textarea>
      <mt-button @click="btnClick" type="primary" size="large">提交</mt-button>
    </div>
    <div class="cmt-list">
      <div class="box" v-for="(item, index) of list" :key="index">
        <div class="user-info">
          <img :src="item.user_avatar" />
          <span>{{ item.nick_name }}</span>
        </div>
        <div class="content">{{ item.contents }}</div>
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
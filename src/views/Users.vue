<script>
export default {
  name: "users",
  data() {
    return {
      user: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    if (!token) {
      // token 不存在时
      next({ path: "/users/logins" });
    }
    next();
  },
  mounted() {
    const token = localStorage.getItem("token");
    this.verifyToken(token);
  },
  methods: {
    async verifyToken(token) {
      try {
        const result = await this.axios.post("/users/verifyToken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { message, meta } = result;
        if (meta.status == 200 && message) {
          this.user = {
            user_avatar: message.user_avatar,
            nick_name: message.nick_name,
            user_name: message.user_name,
          };
        } else {
          console.log(meta.status);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="user">
    <div class="user-info" v-if="user.user_avatar">
      <div class="avatar">
        <img :src="user.user_avatar" alt="avatar" />
      </div>
      <div class="info">
        <div class="nick">{{ user.nick_name }}</div>
        <div class="uname">用户名：{{ user.user_name }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.user {
  height: 100%;
  background-color: #ececec;
  .user-info {
    padding: 0.4rem 0.4rem 0.8rem 0.4rem;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    background-color: #ffffff;
    .avatar {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 0.1rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      width: 7.066667rem;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      justify-content: space-between;
      .nick {
        font-weight: 500;
        font-size: 0.6rem;
      }
      .uname {
        font-size: 0.4rem;
        color: #8b8b8b;
      }
    }
  }
}
</style>

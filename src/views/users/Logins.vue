<script>
export default {
  name: "logins",
  data() {
    return {
      user_name: "",
      user_pwd: "",
    };
  },
  mounted() {},
  methods: {
    async login() {
      const result = await this.axios.post("/api/user/login", {
        user_name: this.user_name,
        user_pwd: this.user_pwd,
      });
      const { messag, meta, token } = result;
      if (meta.status !== 1) {
        // 登录成功
        this.$router.push({ path: "/users" });
        localStorage.setItem("token", token);
      }
    },
  },
};
</script>
<template>
  <div class="logins">
    <div class="logins-wrap">
      <div class="cell">
        <label for="user_name">账&nbsp;&nbsp;号:</label>
        <input
          type="text"
          name="user_name"
          id="user_name"
          placeholder="账号:admin;密码:admin"
        />
      </div>
      <div class="cell">
        <label for="user_pwd">密&nbsp;&nbsp;码:</label>
        <input type="text" name="user_pwd" id="user_pwd" />
      </div>
      <mt-button type="primary" size="large" @click="login">登录</mt-button>
    </div>
    <div class="logins-extra">
      <span
        >还没有账号？<router-link to="/users/register">去注册</router-link>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.logins {
  padding: 1rem;
}
.logins-wrap {
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .cell {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    font-size: 0.4rem;
    label {
      flex: 1;
    }
    input {
      flex: 5;
      margin-bottom: 0;
    }
  }
}
.logins-extra {
  font-size: 0.4rem;
  text-align: end;
}
</style>
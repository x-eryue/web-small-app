<script>
export default {
  name: "register",
  data() {
    return {
      avatar_src: "",
      user_name: "",
      nick_name: "",
      user_pwd: "",
    };
  },
  methods: {
    async avatar(e) {
      const file = e.target.files;
      const data = new FormData();
      data.append("avatar", file[0]);
      const ret = await this.axios.post("/api/user/upload", data, {
        "content-type": "multipart/from-data",
      });
      this.avatar_src = ret.message.avatar_src;
    },
    async register() {
      const ret = await this.axios.post("/api/user/register", {
        user_name: this.user_name,
        nick_name: this.nick_name,
        user_pwd: this.user_pwd,
        avatar_src: this.avatar_src,
      });
      const token = ret.token;
      localStorage.setItem("token", token);
      this.$router.push({ path: "/users" });
    },
  },
};
</script>

<template>
  <div class="logins">
    <div class="file-upload">
      <!-- 文件上传 -->
      <div class="upload">
        <input type="file" name="avatar" @change="avatar" accept="image/*" />
      </div>
      <!-- 图片预览 -->
      <div class="preview">
        <img :src="avatar_src" alt="" v-if="avatar_src" />
      </div>
    </div>
    <div class="logins-wrap">
      <div class="cell">
        <label for="nick_name">昵&nbsp;&nbsp;称:</label>
        <input
          type="text"
          name="nick_name"
          id="nick_name"
          v-model="nick_name"
        />
      </div>
      <div class="cell">
        <label for="user_name">账&nbsp;&nbsp;号:</label>
        <input
          type="text"
          name="user_name"
          id="user_name"
          placeholder="账号:admin;密码:admin"
          v-model="user_name"
        />
      </div>
      <div class="cell">
        <label for="user_pwd">密&nbsp;&nbsp;码:</label>
        <input
          type="pasword"
          name="user_pwd"
          id="user_pwd"
          v-model="user_pwd"
        />
      </div>
      <mt-button type="primary" size="large" @click="register">注册</mt-button>
    </div>
    <div class="logins-extra">
      <span
        >已有账号？<router-link to="/users/logins">去登录</router-link>
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
.file-upload {
  display: flex;
  justify-content: space-around;
  .upload {
    height: 3rem;
    width: 2.2rem;
    background: rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:after {
      content: "+";
      width: 1rem;
      height: 1rem;
      font-size: 1rem;
      position: absolute;
      left: 50%;
      top: 50%;
      line-height: 1rem;
      text-align: center;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 2.2rem;
      opacity: 0;
      z-index: 999;
    }
  }
}
.preview {
  margin-left: 1rem;
  height: 3rem;
  width: 2.2rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
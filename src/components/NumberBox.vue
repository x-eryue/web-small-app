<script>
import mui from "../assets/mui/js/mui.js";
export default {
  name: "number-box",
  props: {
    maxNum: {
      type: Number,
      default: 10,
    },
    minNum: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      val: 0,
    };
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    changeNumBoxVal(e) {
      let num = e.target.value;
      if (num > this.maxNum) {
        num = this.maxNum;
      }
      if (num < this.minNum) {
        num = this.minNum;
      }
      this.val = num;
      this.$emit("changeVal", this.val);
    },
  },
};
</script>
<template>
  <div class="num-box">
    <div class="mui-numbox" :data-numbox-min="minNum" :data-numbox-max="maxNum">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        :value="value"
        @input="changeNumBoxVal"
        @change="changeNumBoxVal"
      />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<style lang="less">
.num-box {
  .mui-numbox .mui-input-numbox,
  .mui-numbox .mui-numbox-input {
    display: block;
  }
  .mui-numbox {
    height: 0.8rem;
    width: 3rem;
  }
}
</style>
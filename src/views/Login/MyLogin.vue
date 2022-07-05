<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="van-nav-bar" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        required
        :rules="rules.mobile"
      >
        <template #left-icon>
          <IconFont icon="shouji"></IconFont>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        required
        placeholder="验证码"
        maxlength="6"
        :rules="rules.code"
        ><template #left-icon>
          <IconFont icon="yanzhengma"></IconFont>
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            :time="3000"
            format="ss s"
            v-if="isShowCountDown"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            size="small"
            @click="sendSmsCode"
            :disabled="bool"
            >发送验证码</van-button
          ></template
        ></van-field
      >
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import IconFont from "@/components/IconFont.vue";
import { login, getSmsCode } from "@/api/user.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      bool: false,
      isShowCountDown: false,
      username: "",
      password: "",
      //   user: {
      //     mobile: "",
      //     code: "",
      //   },
      mobile: "",
      code: "",
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
    };
  },
  methods: {
    // onSubmit(value) {
    //   login(value).then((res) => {
    //     console.log(res);
    //   });
    // },
    async onSubmit(value) {
      try {
        const res = await login(value);
        console.log(res);
        Toast.success("success"); //this.$toast
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "服务器错误");
      }
    },
    // sendSmsCode() {
    //   this.isShowCountDown = true;
    //   this.$refs.form.validate("mobile").then(
    //     () => {
    //       console.log("发送验证码中...");
    //     },
    //     () => {
    //       return;
    //     }
    //   );
    // },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.bool = true;
        await getSmsCode(this.mobile);
        this.isShowCountDown = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        this.$toast.fail(e?.response?.data?.message || "出错了");
        this.isShowCountDown = false;
      } finally {
        this.bool = false;
      }
    },
    //   try {
    //     await this.$refs.form.validate("mobile");
    //     this.isShowCountDown = true;
    //     await getSmsCode(this.mobile);
    //     this.$toast.success("发送验证码成功");
    //   } catch (e) {
    //     this.$toast.fail(e?.response?.data?.message || "出错了");
    //     this.isShowCountDown = false;
    //   }
    // },
    fn() {},
  },
  components: {
    IconFont,
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 16px;
    color: #666;
  }
}
</style>

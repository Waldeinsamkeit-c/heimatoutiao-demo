<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        required
        v-model="mobile"
        name="mobile"
        placeholder="用户名"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <IconFont icon="shouji"></IconFont>
        </template>
      </van-field>
      <van-field
        required
        v-model="code"
        type="password"
        name="code"
        placeholder="密码"
        :rules="rules.code"
      >
        <template #left-icon>
          <IconFont icon="yanzhengma"></IconFont>
        </template>
        <van-button type="primary" slot="button" class="send-sms-btn"
          >发送验证码</van-button
        ></van-field
      >
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      // user: {
      //   mobile: "",
      //   code: "",
      // },
      mobile: "",
      code: "",
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "请输入正确格式手机号",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(values) {
      login(values).then(
        (res) => {
          console.log(res);
          Toast.success("成功文案");
        },
        (err) => {
          console.log(err);
          Toast.fail("失败文案");
        }
      );
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 40px;
  }
  .send-sms-btn {
    width: 190px;
    height: 60px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>

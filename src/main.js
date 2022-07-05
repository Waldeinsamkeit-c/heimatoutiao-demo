import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
Vue.config.productionTip = false;
//
import IconFont from "@/components/IconFont.vue";
Vue.component("IconFont", IconFont);
//
import Vant from "vant";
import "vant/lib/index.less";
//
import "amfe-flexible";
//
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res);
});
Vue.use(Vant);
//
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

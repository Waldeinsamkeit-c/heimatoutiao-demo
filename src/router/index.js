import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => {
        return import("@/views/Login/MyLogin.vue");
      },
    },
  ],
});

export default router;

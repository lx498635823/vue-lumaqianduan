import Vue from "vue";
import VueRouter from "vue-router";
//import Login from "../views/Login/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // 重定向直接在path后面添加，默认连接到这里
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    //component: Login
    //或者这样写
    component: () => import("../views/Login/index.vue")
  }
  // 测试
  //{
  //   path: "/index",
  //   name: "Index",
  //   //component: Login
  //   //或者这样写
  //   component: () => import("../views/Index/index.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;

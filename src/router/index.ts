import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/chats/:chatId",
      name: "chats",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ChatView.vue"),
    },
    { path: "/(.*)*", redirect: "/chats/1" },
  ],
});

export default router;

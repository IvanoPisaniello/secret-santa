import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import Success from "./pages/Success.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/success",
        name: "success",
        component: Success,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router };
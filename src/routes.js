import homeComponent from "@/components/home"
import contactComponent from "@/components/contact"

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export const router = new Router({
    mode: "hash",
    routes: [
        {path: "", component: homeComponent},
        {path: "/contact", component: contactComponent},
    ]
});

import { HTTP } from "@/common";
import homeComponent from "@/components/home"
import contactComponent from "@/components/contact"

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

HTTP.get("/api/onlinestore").then((response) => {
    var recVar = (response.data.Body == null) ? {} : response.data.Body;


}).catch((e) => {
    console.log(e)
})


export const router = new Router({
    mode: "hash",
    routes: [
        {path: "", component: homeComponent},
        {path: "/contact", component: contactComponent},
    ]
});

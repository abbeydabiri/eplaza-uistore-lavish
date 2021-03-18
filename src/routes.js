import { HTTP } from "@/common";
import homeComponent from "@/components/home"
// import aboutComponent from "@/components/about";
import contactComponent from "@/components/contact"

import productComponent from "@/components/product";
import categoryComponent from "@/components/category";

import basketComponent from "@/components/basket";
import checkoutComponent from "@/components/checkout";
import paymentComponent from "@/components/payment";


import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);



export const router = new Router({
    mode: "hash",
    routes: [
        { path: "", name:"home", component: homeComponent },
        // { path: "/about", name:"about", component: aboutComponent },
        { path: "/contact", name:"contact", component: contactComponent },
        
        { path: "/basket", name:"basket", component: basketComponent },
        { path: "/payment", name:"payment", component: paymentComponent },
        { path: "/checkout", name:"checkout", component: checkoutComponent },
        { path: "/c/:category", name:"category", component: categoryComponent },
        { path: "/p/:id/:title", name:"product", component: productComponent },
    ]
});

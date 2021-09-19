
<template>
    <section>
        <div v-if="products.length==0" class=" w-100 tc mv1">
            <h1 class="f5 tc ma2 fw1 pt5 dark-gray"> <i class="f4 fas fa-spinner fa-spin"></i> searching please wait... </h1>
        </div>

        <div class="w-100 flex flex-wrap items-end overflow-y-scroll h-100" style="">
            <div class="flex flex-row w-third-ns w-50 flex-grow-0 flex-shrink-0 pa2" style="" v-for="(product, index) in products" :key="index">
                <div @click="$router.push({name:'product',params:{id:product.ID, title:product.Title}})" class="w-100 tc pointer hovershadow" @mouseenter="product.Focus=true" @mouseleave="product.Focus=false">
                        <div class="h5-ns h4 w-100 flex overflow-hidden" style="max-height:250px;background-position: center;background-size: cover;"
                        :style="{ backgroundImage: `url('` + product.Image + `')` }" ></div>
                    <div class="w-100 flex flex-column tc pa1 near-black br2 br--bottom"> 
                        <div class="f6 pa1 truncate">{{product.Title}}</div> 
                        <div class="f5 fw6 pb1">{{product.Currency}}{{humanNumber(product.Amount)}}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { humanNumber } from "@/common";

    export default {
        props: ['products'],
        data(){return{ }},
        methods:{
            humanNumber,
        }
    }
</script>
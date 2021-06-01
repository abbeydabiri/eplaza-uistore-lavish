
<template>
    <section>
        <div v-if="products.length==0" class=" w-100 tc mv1">
            <h1 class="f5 tc ma2 fw1 pt5 mid-gray"> <i class="f4 fas fa-spinner fa-spin"></i> searching please wait... </h1>
        </div>


        <nav class="">
            <div class="pointer items-center flex f6 f5-ns">
                <div class="h4 flex items-center self-start mt2">
                    <i class="f5 f4-ns fa fa-caret-left mid-gray mr1" @click="goLeft" />
                </div>
                <div ref="scroller" class="nowrap overflow-x-auto w-100 mid-gray">
                    <span class="dib w-25-l w-thid-m w-50 pa2 pl0" style="" v-for="(product, index) in products" :key="index">
                        <span @click="$router.push({name:'product',params:{id:product.ID, title:product.Title}})" class="w-100 tc pointer hovershadow" @mouseenter="product.Focus=true" @mouseleave="product.Focus=false">
                            <div class="br2 br--top ba b--black-20 w-100 overflow-hidden ">
                                <img class="w-100 aspect-ratio h4 item" :src="product.Image" style="object-fit: cover;float:left" />
                            </div>
                            <div class="w-100 flex flex-column tc pa1 near-black br2 br--bottom"> 
                                <div class="f7 pa1 truncate"><small>{{product.Title}}</small></div> 
                                <div class="f7 pb1 red fw6"><small>{{product.Currency}}{{humanNumber(product.Amount)}}</small></div>
                            </div>
                        </span>
                    </span>
                </div>
                <div class="h4 flex items-center self-start mt2">
                    <i class="f5 f4-ns fa fa-caret-right ml1 mid-gray" @click="goRight" />
                </div>
            </div>
        </nav>

    </section>
</template>

<script>
import { humanNumber } from "@/common";

    export default {
        props: ['products'],
        data(){return{ }},
        methods:{
            humanNumber,
            goLeft() {
                if (this.$refs.scroller.scrollLeft > 0) {
                    // this.$refs.scroller.scrollLeft -= document.getElementsByClassName("itemimage")[0].clientWidth;
                }
                if (this.$refs.scroller.scrollLeft < 0){
                    this.$refs.scroller.scrollLeft = 0
                }
            },
            goRight() {
                if (this.$refs.scroller.scrollLeft <= this.$refs.scroller.scrollWidth) {
                    this.$refs.scroller.scrollLeft += document.getElementsByClassName("item")[0].clientWidth;
                    
                } 
                
                if (this.$refs.scroller.scrollLeft > this.$refs.scroller.scrollWidth){
                    this.$refs.scroller.scrollLeft = this.$refs.scroller.scrollWidth
                }
            },
        }
    }
</script>
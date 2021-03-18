<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt4-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column">
            <div class="fl pa2 pt4-l w-100">
                <span class="fw5 black f2">{{getStoreTitle}}</span>
            </div>
            
            <div class="w-100 flex flex-column flex-row-ns items-end">
                <div class="pa2 pr0 fl w-60-ns w-100">
                    <div class="w-100 inline-flex br2 items-center bg-white">
                        <span class="pa2 near-white br2 br--left bg-black pointer">
                            <i class="fas fa-search"></i>
                        </span>
                        <input class="pa2 ba b--silver bn br2 br--right w-100 fw2 i" placeholder="Search for products" type="text" model="Sale">
                    </div>
                </div>

                <div class="f7 fl pa2 w-100 w-40-ns tc tl-ns gray">
                    <span class="black">Shop by: </span>
                    <span class="pointer " @click="$router.push({name:'category', params:{category:'all'}})" :class="{'dark-gray':curCategory==''}">All Categories</span> 
                    <span class="pointer ml1" @click="$router.push({name:'category', params:{category:category.Category}})" :class="{'dark-gray':curCategory==category.Category}" v-for="(category, index) in getCategoryList" :key="index"> | {{category.Category}} </span> 
                </div>
            </div>

            <div v-if="productList.length==0" class=" w-100 pa5 tc mv5">
                <h1 class="f5 tc ma2 fw1 pt5 dark-gray"> <i class="f4 fas fa-spinner fa-spin"></i> searching please wait... </h1>
            </div>

            <div class="w-100 flex flex-wrap items-end overflow-y-scroll" style="">
                <div class="flex flex-column w-20-l w-third-m w-50 flex-grow-0 flex-shrink-0 pa2" style="" v-for="(product, index) in productList" :key="index">
                    <div @click="$router.push({name:'product',params:{id:product.ID, title:product.Title}})" class="w-100 tc pointer hovershadow" @mouseenter="product.Focus=true" @mouseleave="product.Focus=false">
                        <div class="w-100">
                            <img class="h-100 w-100 aspect-ratio" :src="product.Image"/>
                        </div>
                        <div class="w-100 fl tl f6-ns f7 pt2"> 
                            <span class="pv2 dark-red">{{product.Title}}</span>
                            <span class="db">{{product.Currency}}{{humanNumber(product.Amount)}} </span>
                        </div>
                    </div>
                </div>    
            </div>

        </div>
    
    </div>
</template>

<script>
    import navbar from "@/components/reuseables/navbar"
    import { mapGetters } from 'vuex';
    import { HTTP, humanNumber } from "@/common";

    export default {
        name: 'home',
        components: {navbar},
        data(){return{
            lBtn:false,
            productList:[],
            curCategory:"",
        }},
        computed: {
            ...mapGetters('onlinestore', ['getCategoryList','getStoreTitle']),
        },
        watch: {
            '$route.params.category': function(newCurCategory, oldCurCategory) {
                this.curCategory = newCurCategory
                if (this.curCategory == "all") {
                    this.curCategory = ""
                }
                this.searchProducts()
            }
        },
        mounted() { 
            this.searchProducts()
        },
        methods:{
            humanNumber,
            searchProducts() {
                const app = this;
                clearTimeout(app.searchTimeout);
            

                var delay = 150
                // var delay = (app.productList.length == 0) ? 0 : 750;
                // app.searchTimeout = setTimeout(function(app){
                app.productList = []
                const url = "/api/pricelistlines/search";
                const search = {text: "", field: "Title", limit: 10, skip: 0, filter:{title:"", category:this.curCategory,}, RefField:"PricelistID", RefID:0 };
                HTTP.post(url, search, { withCredentials: true }).then((response) => {
                    if (response.data.Code != undefined) {
                        switch(response.data.Code){
                            case 200:
                                var productList = (response.data.Body != null) ? response.data.Body : []
                                for (let i = 0; i < productList.length; i++) {
                                    productList[i]["Focus"] = false
                                    productList[i]["Currency"] = "₦"
                                }
                                app.productList = productList
                            break;
                        }
                    }
                }).catch((e) => { console.log(e); app.isSearching = false })
            },
        
        }
    }
</script>
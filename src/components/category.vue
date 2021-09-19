<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt2-l">
            <navbar />
        </div>
        
        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column pt2-l">

            <div class="w-100 items-center flex">
                <div class="fl w-50 w-30-m w-20-l inline-flex br2 items-center bg-white pa2 pr0">
                    <input class="pa2 ba b--silver bg-black-05 bn br2 br--left w-100 fw2 i" :placeholder="'Search for '+curCategory.toLowerCase()" type="text" v-model="searchForm.text">
                    <span class="pa2 near-white br2 br--right bg-black pointer" @click="searchProducts">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
                <div class="w-50 w-70-m w-80-l fl">
                    <categories :curCategory="curCategory" />
                </div>
            </div>
            
            <div class="fl w-100 h-100 overflow-y-scroll flex flex-column ">
                <products :products="productList" />
            </div>
        </div>
    
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { HTTP, humanNumber } from "@/common";

    import navbar from "@/components/reuseables/navbar"
    import products from "@/components/reuseables/products"
    import categories from "@/components/reuseables/categories"

    export default {
        name: 'home',
        components: {navbar, products, categories},
        data(){return{
            lBtn:false,
            productList:[],
            curCategory: this.$route.params.category,
            searchForm: {text: "", field: "Title", limit: 100, skip: 0, filter:{title:"", category:"",}, RefField:"PricelistID", RefID:0 },
        }},
        computed: {
            ...mapGetters('onlinestore', ['getCategoryList','getStoreTitle']),
        },
        watch: {
            '$route.params.category': function(newCurCategory, oldCurCategory) {
                this.curCategory = newCurCategory
                if (this.curCategory == "all" || this.curCategory == undefined) {
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
                app.productList = []
                const url = "/api/pricelistlines/search";
                app.searchForm.filter.category = this.curCategory

                HTTP.post(url, app.searchForm, { withCredentials: true }).then((response) => {
                    if (response.data.Code != undefined) {
                        switch(response.data.Code){
                            case 200:
                                var productList = (response.data.Body != null) ? response.data.Body : []
                                for (let i = 0; i < productList.length; i++) {
                                    productList[i]["Focus"] = false
                                    productList[i]["Currency"] = ""
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
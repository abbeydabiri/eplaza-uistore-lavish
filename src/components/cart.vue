<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt2-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column pt2-l">
            <div class="pa2 pb0 fw5 black f3-ns f4">SHOPPING CART</div>

            <div class="f6 fl w-100 tr">
                <span @click="$router.push({name:'home'})" class="ph2 fw5 black f7 tr"> Continue Shopping > </span>
            </div>

            <div class="w-100 flex flex-wrap ">
                <div class="w-70-l w-60-m w-100 pa2">
                    <div class="w-100 bg-light-gray pa2 fw6"> PRODUCTS </div>
                    <div class="w-100 flex pt3 bb b--black-10 pb1">
                        <div class="w4 tc pa2">
                            <img :src="getStoreImage" class="w-100"/>
                        </div>
                        <div class="w-90-ns w-100">
                            <div class="w-100 fl f5-ns f6">
                                {{record.Item}} oraimo FreePods-2 2Baba-Version TWS True Wireless Stereo Earbuds
                            </div>
                            <div class="w-100 fl f4-ns f5 fw5 pv3 mid-gray"> 
                                <span class="b">₦</span> {{humanNumber(shoppingBasket.Totalincltax)}}
                            </div>

                            <div class="w-100">
                                <div class="f7 f6-ns pr3 db w-100 fl">
                                    Quantity:
                                </div>
                                <div class="w-100 fl f7 f6-ns pv1 flex items-center mid-gray">
                                    <span class="f5-ns f6 pointer flex items-center noselect mr4-l mr3">
                                        <span class="w1 tc pv1 br--left ba b--black-40" @click="(Quantity>1) ? Quantity-- : Quantity">
                                            -
                                        </span>
                                        <span class="w3 tc pv1 bb bt b--black-40" @click="Quantity=1">
                                            {{Quantity}}
                                        </span>
                                        <span class="w1 tc pv1 br--right ba b--black-40" @click="Quantity++">
                                            +
                                        </span>
                                    </span>

                                    <span class="f5-ns f6 pointer flex items-center noselect dib ml4-l ml3">
                                        <span class="w-100 ph2 tc pv1 dark-red">
                                            <i class="fa fa-times mr1 f6-ns f7"></i> <small>Remove</small>
                                        </span>
                                    </span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-30-l w-40-m w-100 self-end pa2">
                    <div class="fl w-100 bg-light-gray pv2 tc fw6"> ORDER SUMMARY </div>
                    <div class="fl w-100 pv3 tc bb bt b--black-20 flex items-center"> 
                        <div class="w-30 tl f6"> Total: </div>
                        <div class="w-70 tr"> $$$$ </div>
                    </div>
                    <div class="fl w-100 pv3">
                        <div class="w-100 pv2 tl f7 flex items-center"> 
                            <small><span class="pv1 ph2 br1 bg-red white">Note</span></small>
                            <span class="pl2 fw6">Additonal comments</span>
                        </div>
                        <div class="w-100 pv1 tl f7 flex items-center">
                            <textarea class="w-100 fl pa h4 b--black-40"></textarea>
                        </div>
                        <div class="fl w-100 f6 pv3 pointer">
                            <div @click="$router.push({name:'checkout'})" class="f6-ns f7 fl w-100 ph2 tc pv2 ba b--black-40">PROCEED TO CHECKOUT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { HTTP, humanNumber,  updateTotals } from "@/common";

    import navbar from "@/components/reuseables/navbar"

    export default {
        name: 'home',
        components: {navbar},
        data(){return{
            notifications:[], Quantity:1, showImageNav:false, record:{ID:0, imageList:[], Image:"", Title:"", Amount:0, Barcode:""},
            shoppingBasket:{ 
                ID:0, Title:"", Code:"", Vatformula:"Inclusive", Shippingmethod:"Pickup", Mobile:"", Email:"", Street:"", 
                City:"", State:"", Country:"", Totalexcltax: 0, Totalincltax: 0, Taxamount: 0, Workflow:"pending", items:{} 
            },
        }},
        computed: {
            ...mapGetters('onlinestore', ['getCategoryList','getStoreImage', 'getStoreTitle']),
        },
        watch: {
            watch: {
                '$route.params.id': function(newID, oldId) {
                    // this.getPricelistline()
                }
            },
        },
        mounted() { 
        //    this.getPricelistline()
            this.shoppingBasket = JSON.parse(localStorage.getItem("shoppingBasket"))
            if(this.shoppingBasket !== null && this.shoppingBasket !== undefined) {
                this.updateCart()
            }
        },
        methods:{
            humanNumber,
            goLeft() {
                if (this.$refs.imagescroller.scrollLeft > 0) {
                    // this.$refs.imagescroller.scrollLeft -= document.getElementsByClassName("itemimage")[0].clientWidth;
                }
                if (this.$refs.imagescroller.scrollLeft < 0){
                    this.$refs.imagescroller.scrollLeft = 0
                }
            },
            goRight() {
                if (this.$refs.imagescroller.scrollLeft <= this.$refs.imagescroller.scrollWidth) {
                    this.$refs.imagescroller.scrollLeft += document.getElementsByClassName("itemimage")[0].clientWidth;
                    
                } 
                
                if (this.$refs.imagescroller.scrollLeft > this.$refs.imagescroller.scrollWidth){
                    this.$refs.imagescroller.scrollLeft = this.$refs.imagescroller.scrollWidth
                }
            },
            getPricelistline() {
                const app = this;

                if (app.$route.params.id == undefined || app.$route.params.id == null || app.$route.params.id == "") {
                    //redirect back to home page
                    app.$router.push({name:'home'})
                    return
                }
                
                app.record = {ID:0, imageList:[], Image:"", Title:"", Amount:0, Barcode:""}
                var id = app.$route.params.id
                HTTP.get("/api/pricelistlines" + "?id=" +id , { withCredentials: true }).then((response) => {
                    app.notifications = [response.data];
                    app.record = (response.data.Body == null || response.data.Body == undefined) ? {imageList:[]} : response.data.Body;
                    if ( response.data.Body.ID !== undefined && response.data.Body.ID == id) {  
                        if (app.record.imageList == null || app.record.imageList == undefined) {
                            app.record.imageList = []
                        }
                        app.isFound = true;
                    }
                }).catch((e) => { console.log(e); });
            },
            

            delItem(item) {
                if(item.ID > 0) {
                    if (this.shoppingBasket.deleteList == undefined){
                        this.shoppingBasket.deleteList = {}
                    }
                    this.shoppingBasket.deleteList[item.ID] = item.PricelistlineID
                }
                this.$delete(this.shoppingBasket.items, item.PricelistlineID)
                this.updateCart()
            },
            delItemQty(item) {
                (item.Quantity <= 1) ? item.Quantity = 1 : item.Quantity--
                this.shoppingBasket.items[item.PricelistlineID] = item
                this.updateCart()
            },
            addItemQty(item) {
                item.Quantity++;
                this.shoppingBasket.items[item.PricelistlineID] = item
                this.updateCart()
            },
            toggleShippingmethod(){
                switch(this.shoppingBasket.Shippingmethod) {
                    case "Delivery":
                        this.shoppingBasket.Shippingmethod = "Pickup";
                        break; 
                    default:
                        this.shoppingBasket.Shippingmethod = "Delivery";
                        break;
                }
            },
            updateCart() {
                const app = this;

                var order = app.shoppingBasket
                order.lines = order.items
                app.$delete(order, "items")

                order = updateTotals(order)
                order.items = order.lines
                app.$delete(order, "lines")

                app.shoppingBasket = order
                if (app.shoppingBasket.ID !== undefined && app.shoppingBasket.ID > 0 && app.shoppingBasket.Code !== undefined && app.shoppingBasket.Code !== "") {
                    app.$refs.shoppingbasket.Sale = app.shoppingBasket.Code;
                    app.$refs.shoppingbasket.SaleID = app.shoppingBasket.ID;
                }

                if (app.shoppingBasket.CustomerID !== undefined && app.shoppingBasket.CustomerID > 0) {
                    app.$refs.customer.Customer = app.shoppingBasket.Customer;
                    app.$refs.customer.CustomerID = app.shoppingBasket.CustomerID;
                }
                localStorage.setItem("shoppingBasket", JSON.stringify(app.shoppingBasket));
            },
        }
    }
</script>
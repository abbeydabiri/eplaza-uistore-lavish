<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt2-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column pt2-l">
            <div class="w-100 flex flex-column flex-row-ns items-end">
                <div class="f6 fl pa2 w-100 w-60-ns tc tl-ns">
                    <span class="pointer gray" @click="$router.push({name:'home'})">Home</span> 
                    <small class="mh1">></small>
                    <span @click="$router.push({name:'category',params:{category:record.Category}})"  class="mid-gray pointer">{{record.Category}} </span>
                    <small class="mh1">></small>
                    <span class="mid-gray pointer">{{record.Title}} </span>
                </div>
            </div>
            

            <div class=" w-100 pa5 tc" :class="{'dn':record.ID>0}" >
                <h1 class="f5 tc ma2 fw1 dark-gray"> <i class="f4 fas fa-spinner fa-spin"></i> searching please wait... </h1>
            </div>

            <div class="f7 fl pa2 w-100 " :class="{'dn':record.ID==0}">
                <div class="fl w-50-l w-60-m w-100 h-100-l">

                    <div class="flex flex-row items-center w-100 relative  br2" @mouseenter="showImageNav=true" @mouseleave="showImageNav=false"> 
                        <i :class="{'bg-white-70 black':showImageNav,'bg-white-30 black-30':!showImageNav}" class="absolute left-0 pointer fa fa-caret-left ml2 f5-ns f6 ph2 pv1 br-100" @click="prevImage"  />
                        <div id="zoom-img" class="w-100 flex productImage overflow-hidden" style="max-height:500px;height:75vh;background-position: center;background-size: cover;"
                        :style="{ backgroundImage: 'url(' + record.imageList[curImage].Filepath + ')' }" ></div>
                        <i :class="{'bg-white-70 black':showImageNav,'bg-white-30 black-30':!showImageNav}" class="absolute right-0 pointer fa fa-caret-right mr2 f5-ns f6 ph2 pv1 br-100" @click="nextImage" />
                    </div>

                    <nav class="pv2">
                        <div class="pointer items-center flex f6 f5-ns">
                            <i class="pointer fa fa-caret-left mid-gray f5-ns f6 mr1" @click="goLeft"  />
                            <div ref="imagescroller" class="nowrap overflow-x-auto w-100 dark-gray">
                                <span class="ba b--black-20 br2 dib mr1 h3" v-for="(image, index) in record.imageList" :key="index"> 
                                    <img @click="curImage = index" class="bn h-100 itemimage" :src="image.Filepath" style="object-fit: contain"/>    
                                </span>
                            </div>
                            <i class="pointer fa fa-caret-right mid-gray f5-ns f6 ml1" @click="goRight" />
                        </div>
                    </nav>

                </div>
                <div class="fl fr-ns pt0-ns pa2-ns w-50-l w-40-m w-100">
                
                    <div class="w-100 fl f4-l f5 fw5">
                        {{record.Item}}
                    </div>

                    <div class="w-100 fl f4-l f5 fw5 pv2 red"> 
                        <span class="b">₦</span>{{humanNumber(record.Amount)}}
                    </div>

                    <div v-if="record.ItemDescription!==''" class="mid-gray w-100 fl f6 pt2 pb3">
                        {{record.ItemDescription}}
                    </div>
                    <div v-else class="mid-gray w-100 fl f6 pt2 pb3">
                        Description:
                    </div>


                    <div class="f7 pr3 db w-100 fl">
                        Quantity:
                    </div>
                    <div class="w-100 fl f7 pv1 ">
                        <span class="f6 pointer flex items-center noselect">
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
                    </div>

                    <div class="dn fl w-100 f6 pv2 pb3">
                        <span @click="$router.push({name:'cart'})" click="$router.push({name:'cart'})" class="f6-ns f7 fl  ph3 tc pv2 ba b--black-40">Add to Cart</span>
                    </div>

                    <div class="dn fl w-100 f6 pv2 pt3">
                        <span @click="$router.push({name:'home'})" click="$router.push({name:'checkout'})" class="f6-ns f7 fl  ph5 tc pv2 ba b--black-40">Buy It Now</span>
                    </div>

                    <div class="fl w-100 f6 pv2 pt3">
                        <a class="link" target="_blank" :href="buyViaWhatsapp()">
                            <span class="f6-ns f7 fl black ph5 tc pv2 ba b--black-40">Buy It Now</span>
                        </a>
                    </div>

                    <div class="fl w-100 mt3 bt b--black-20">
                        <p class="f6 fw6">YOU MAY ALSO LIKE</p>

                        <youmaylike :products="productList" />


                    </div>
                    
                </div>
            </div>

        </div>
    
    </div>
</template>

<style>
    /*
    .productImage img {
        display: block;
        transition: transform .4s;  
    }

    .productImage:hover img {
        transform: scale(1.5);
        transform-origin: 50% 50%;
    }
    */
</style>

<script>
    import { mapGetters } from 'vuex';
    import { HTTP, humanNumber, addZoom } from "@/common";

    import navbar from "@/components/reuseables/navbar"
    import youmaylike from "@/components/reuseables/youmaylike"
    import categories from "@/components/reuseables/categories"

    export default {
        name: 'home',
        components: {navbar, youmaylike, categories},
        data(){return{
            notifications:[], Quantity:1, showImageNav:false, record:{ID:0, imageList:[{Filepath:""}], Image:"", Title:"", Amount:0, Barcode:"", Category:""},
            searchForm: {text: "", field: "Title", limit: 10, skip: 0, filter:{title:"", category:"",}, RefField:"PricelistID", RefID:0 },
            curImage:0, productList:[],
            shoppingBasket:{ 
                ID:0, Title:"", Code:"", Vatformula:"Inclusive", Shippingmethod:"Pickup", Mobile:"", Email:"", Street:"", 
                City:"", State:"", Country:"", Totalexcltax: 0, Totalincltax: 0, Taxamount: 0, items:{}, deleteList:{},
            },
        }},
        computed: {
            ...mapGetters('onlinestore', ['getContactInfo', 'getCategoryList','getStoreTitle','getStoreImage']),
        },
        watch: {
            '$route.params.id': function(newID, oldId) {
                this.getPricelistline()
                addZoom("zoom-img");
            },
        },
        mounted() { 
            
        },
        created() {
            this.getPricelistline()
            setTimeout(function(){ addZoom("zoom-img"); }, 2000);
        },
        methods:{
            addZoom,
            humanNumber,
            prevImage() {
                var newCur = this.curImage;
                var curLength = this.record.imageList.length;
                var maxIndex = (curLength-- <= 0) ? 0 : curLength;
                this.curImage = (--newCur < 0) ? maxIndex : newCur; 
            },
            nextImage() {
                // var newCur = this.curImage;
                // var curLength = this.record.imageList.length;
                // curLength = (curLength-- <= 0) ? 0 : curLength;
                // this.curImage = (newCur++ > curLength) ? 0 : newCur
                var newCur = this.curImage;
                var curLength = this.record.imageList.length;
                var maxIndex = (curLength-- <= 0) ? 0 : curLength;
                this.curImage = (++newCur > maxIndex) ? 0 : newCur;
            },
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

                var id = app.$route.params.id
                app.record = {ID:0, imageList:[{Filepath:""}], Image:"", Title:"", Amount:0, Barcode:"", Category:""}
                HTTP.get("/api/pricelistlines" + "?id=" +id , { withCredentials: true }).then((response) => {
                    app.notifications = [response.data];
                    app.record = (response.data.Body == null || response.data.Body == undefined) ? {imageList:[{Filepath:""}]} : response.data.Body;
                    if ( response.data.Body.ID !== undefined && response.data.Body.ID == id) {  
                        app.isFound = true;
                        app.searchProducts()

                        document.querySelector('meta[property="og:title"]').setAttribute("content", app.record.Title);
                        document.querySelector('meta[property="og:image"]').setAttribute("content", app.record.Image);
                        document.querySelector('meta[property="og:description"]').setAttribute("content", app.record.Description);

                        var shoppingBasket = localStorage.getItem("shoppingBasket")
                        if(shoppingBasket !== null && shoppingBasket !== undefined) {
                            app.shoppingBasket = JSON.parse(shoppingBasket)
                        }
                        app.updateCart()
                    }
                    if (app.record.imageList == null || app.record.imageList == undefined) {
                        app.record.imageList = [{Filepath:""}]
                    }
                }).catch((e) => { console.log(e); });
            },
            searchProducts() {
                const app = this;
                app.productList = []
                const url = "/api/pricelistlines/search";
                // app.searchForm.filter.category = app.record.Category

                HTTP.post(url, app.searchForm, { withCredentials: true }).then((response) => {
                    if (response.data.Code != undefined) {
                        switch(response.data.Code){
                            case 200:
                                var sortedList = [];
                                var productList = (response.data.Body != null) ? response.data.Body : []
                                for (let i = 0; i < productList.length; i++) {
                                    if( productList[i].ID != app.$route.params.id) {
                                        productList[i]["Focus"] = false
                                        productList[i]["Currency"] = "₦"
                                        sortedList.push(productList[i])
                                    }
                                }
                                app.productList = sortedList
                            break;
                        }
                    }
                }).catch((e) => { console.log(e); app.isSearching = false })
            },



            itemAddDel(item) {
                if(item.Quantity==0) {
                    this.addItem(item)
                } else {
                    this.delItem(item)
                }
            },
            delItem (item) {
                this.shoppingBasket.items[item.PricelistlineID].Quantity = 0;
                if (this.shoppingBasket.deleteList == undefined){
                    this.shoppingBasket.deleteList = {}
                }
                //loop through shopping basket items and check for matching pricelistline and an id that is greater than 0
                for (var itemKey in this.shoppingBasket.items) {
                    var basketItem = this.shoppingBasket.items[itemKey]
                    if(basketItem.PricelistlineID == item.PricelistlineID){
                        if(basketItem.ID > 0) {
                            this.shoppingBasket.deleteList[basketItem.ID] = basketItem.PricelistlineID
                        }
                    }
                }
                this.updateCart()
            },
            addItem(item) {
                item.Quantity = 1
                this.shoppingBasket.items[item.PricelistlineID] = item
                this.updateCart()
            },
            addItemQty(item){
                const app = this;
                if(app.shoppingBasket !== null && app.shoppingBasket !== undefined) {
                    if (app.shoppingBasket.items[item.PricelistlineID] !== null && app.shoppingBasket.items[item.PricelistlineID] !== undefined) {
                        app.shoppingBasket.items[item.PricelistlineID].Quantity++
                    }
                }
                app.updateCart()
            },
            delItemQty(item){
                const app = this;
                if(app.shoppingBasket !== null && app.shoppingBasket !== undefined) {
                    if (app.shoppingBasket.items[item.PricelistlineID] !== null && app.shoppingBasket.items[item.PricelistlineID] !== undefined) {
                        (app.shoppingBasket.items[item.PricelistlineID].Quantity <= 0) ? app.shoppingBasket.items[item.PricelistlineID].Quantity = 0 : app.shoppingBasket.items[item.PricelistlineID].Quantity--
                    }
                }
                app.updateCart()
            },
            updateCart() {
                if(this.shoppingBasket !== null && this.shoppingBasket !== undefined) {
                    var cartItemsQty  = 0
                    for (var itemKey in this.shoppingBasket.items) {
                         cartItemsQty += this.shoppingBasket.items[itemKey].Quantity
                         if(this.shoppingBasket.items[itemKey].Quantity==0){
                            this.$delete(this.shoppingBasket.items, itemKey)
                         }
                    }
                    this.updateProductlist()
                    this.cartItemsQty = cartItemsQty
                    localStorage.setItem("shoppingBasket", JSON.stringify(this.shoppingBasket));
                }
            },

            updateProduct(item) {
                
                if(item.PricelistlineID == null || item.PricelistlineID == undefined) {
                    item.PricelistlineID = item.ID
                    item.ID = 0
                }
                var indexKey = item.PricelistlineID
                if(item.Quantity == null || item.Quantity == undefined) {
                    item.Quantity = 0
                }
                if(this.shoppingBasket !== null && this.shoppingBasket !== undefined) {
                    if (this.shoppingBasket.items[indexKey] !== null && this.shoppingBasket.items[indexKey] !== undefined) {
                        item.Quantity = this.shoppingBasket.items[indexKey].Quantity
                    } else {
                        item.Quantity = 0
                    }
                }
                return item
            },
            updateProductlist() {
                for (let i = 0; i < this.productList.length; i++) {
                    var item = this.productList[i]
                    this.productList[i] = this.updateProduct(item)
                }
            }, 
            buyViaWhatsapp(){
                let message = `Hello ${encodeURIComponent(this.getStoreTitle)},%0a%0a I want to buy:%0a `
                message += `*${this.Quantity}* x *${encodeURIComponent(this.record.Item)}'s* for a total of%0a `
                message += `*${this.humanNumber(this.record.Amount*this.Quantity)}* Naira only`
                message += `%0a%0a Please confirm availability and i will make payment.`
                message += `%0a%0a Link: ${encodeURIComponent(window.location.href)}`

                    

                let mobile = this.getContactInfo.Mobile
                if(mobile.length == 11){
                    mobile = "234"+mobile
                //     mobile = "234"+mobile.subString(1,10)
                }
            
                return `https://api.whatsapp.com/send?phone=${mobile}&text=${message}`
                // Please confirm availability and i will make payment.
            }
        }
    }
</script>
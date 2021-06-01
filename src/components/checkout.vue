<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt2-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column pt3">
            
            <div class="f6 fl w-100 tl ph2">
                <span @click="$router.push({name:'cart'})" class="fw5 black "> Shopping Cart > </span>
                <span class="fw5 black pl1 "> Checkout > </span>
                <span class="fw5 gray ph1 "> Shipping > </span>
                <span class=" fw5 gray "> Payment </span>
            </div>

            <div class="w-100 flex flex-wrap ">
                <div class="w-70-ns w-100">
                    <div class="fl w-100 pa2 pt4"> Contact information </div>

                    <div class="fl w-30 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6" placeholder="Phone number" type="text" />
                    </div>

                    <div class="fl w-70 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6" placeholder="Email address" type="text" />
                    </div>

                    
                    <div class="fl w-100 pa2 pv3"> Shipping address </div>

                    <div class="fl w-50 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6" placeholder="First name" type="text" />
                    </div>

                    <div class="fl w-50 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6" placeholder="Last name" type="text" />
                    </div>

                    <div class="fl w-100 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6" placeholder="Address" type="text" />
                    </div>

                    <div class="fl w-third-l w-50-m w-40 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6 " placeholder="City" type="text"  />
                    </div>

                    <div class="fl w-third-l w-25-m w-50 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6 " placeholder="State" type="text"  />
                    </div>

                    <div class="fl w-third-l w-25-m w-50 pa2">
                        <input class="pa2 br2 w-100 ba b--black-05 f6 " placeholder="Country" type="text"  />
                    </div>


                    <div class="fl pt4 w-100 pa2 f7">
                        <span class="pa3 near-white br2 mr2 bg-black pointer" >
                            Continue to payment
                        </span>

                        <span class="pa3 dark-gray br2 ml2 pointer ba b--black-05" @click="$router.push({name:'cart'})">
                            Return to cart
                        </span>

                    </div>

                </div>

                <div class="w-30-ns w-100 self-start pa2 ph3 f4-ns f5">

                    <div class="fl w-100 pv3 tc flex items-center f6"> 
                        <div class="fl w-100 inline-flex br2 items-center">
                            <input class="pa2 ba b--silver bg-black-05 bn br2 w-100 fw2 i" placeholder="Discount code" type="text">
                            <span class="pa2 near-white br2 ml2 bg-gray pointer" >
                                Apply
                            </span>
                        </div>
                    </div>
                    
                    
                    <div class="fl w-100 pv3 tc bt b--black-20 flex items-center"> 
                        <div class="w-30 tl f6"> Total: </div>
                        <div class="w-70 tr"> $$$$ </div>
                    </div>
                    
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
    import navbar from "@/components/reuseables/navbar"
    import { mapState, mapGetters } from 'vuex';
    import { HTTP, humanNumber } from "@/common";

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
            // watch: {
            //     '$route.params.id': function(newID, oldId) {
            //         this.getPricelistline()
            //     }
            // },
        },
        mounted() { 
        //    this.getPricelistline()
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
        }
    }
</script>
<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt4-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column">
            <div class="fl pa2 pt4-l w-100">
                <span class="fw5 black f2">{{getStoreTitle}}</span>
            </div>
            

            <div class="f7 fl pa2 w-100 w-60-l tc tr-ns">
                <span @click="$router.go(-1)" class="black">Go Back </span>
                <small>/</small>
                <span @click="$router.push({name:'basket'})"  class="mid-gray pointer">Shopping Basket</span>
            </div>

            <div v-if="record.ID>0" class="d w-100 pa5 tc">
                <h1 class="f5 tc ma2 fw1 dark-gray"> <i class="f4 fas fa-spinner fa-spin"></i> loading please wait... </h1>
            </div>

            
            <div class="f7 fl pa2 w-100 w-60-l tc tl-ns">
                <table class="f6 w-100" cellspacing="0">
                    <thead>
                    <tr>
                        <th class="fw6 bb b--black-20 tl w-20 pb3 pr3 bg-white">Image</th>
                        <th class="fw6 bb b--black-20 tl w-30 pb3 pr3 bg-white">Name</th>
                        <th class="fw6 bb b--black-20 tl w-10 pb3 pr3 bg-white">Price</th>
                        <th class="fw6 bb b--black-20 tl w-20 pb3 pr3 bg-white">Quantity</th>
                        <th class="fw6 bb b--black-20 tl w-10 pb3 pr3 bg-white">Total</th>
                        <th class="fw6 bb b--black-20 tl w-10 pb3 pr3 bg-white">Action</th>
                    </tr>
                    </thead>
                    <tbody class="lh-copy">
                    <tr>
                        <td class="pv3 pr3 bb b--black-20">
                        <div class="fl dt">
                            <img :src="getStoreImage" class="w4 h3 v-mid"/>
                        </div>
                        </td>
                        <td class="pv3 pr3 bb b--black-20">Product Name</td>
                        <td class="pv3 pr3 bb b--black-20">₦ 200000</td>
                        <td class="pv3 pr3 bb b--black-20">

                            <span class="w-100 fl f6 pa2 pointer noselect">
                                <span class="ba ph3 pv2 b--light-gray" @click="(Quantity>1) ? Quantity-- : Quantity">
                                    -
                                </span>
                                <span class="ba ph3 pv2 b--light-gray" @click="Quantity=1">
                                    {{Quantity}}
                                </span>
                                <span class="ba ph3 pv2 b--light-gray" @click="Quantity++">
                                    +
                                </span>
                            </span>
                        </td>
                        <td class="pv3 pr3 bb b--black-20">₦ 200000</td>
                        <td class="pv3 pr3 bb b--black-20">
                            <i class="fas pl3 red fa-times"></i>
                        </td>
                    </tr>
                    <tr>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20">Sub Total</td>
                        <td class="pv3 pr3 bb b--black-20">
                        <small>₦</small>2000
                        </td>
                    </tr>
                    <tr>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20">Tax</td>
                        <td class="pv3 pr3 bb b--black-20">
                        <small>₦</small>2000
                        </td>
                    </tr>
                    <tr>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20">Total</td>
                        <td class="pv3 pr3 bb b--black-20">
                        <small>₦</small>2000
                        </td>
                    </tr>
                    <tr>
                        <td colspan="99" class="pv3 pr3 bb  b--black-20">
                        <span @click="$router.go(-1)" class="f5 fl tc link dim pa2 mv2 dib white bg-dark-gray" >Go back</span>

                        <router-link to="/checkout" class="f5 fr tc link dim pa2 mv2 dib white bg-dark-gray" >Checkout</router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
            notifications:[], Quantity:1, showImageNav:false, record:{ID:0, imageList:[], Image:"", Title:"", Amount:0, Barcode:""}
        }},
        computed: {
            ...mapGetters('onlinestore', ['getCategoryList','getStoreImage', 'getStoreTitle']),
        },
        watch: {
            watch: {
                '$route.params.id': function(newID, oldId) {
                    this.getPricelistline()
                }
            },
        },
        mounted() { 
           this.getPricelistline()
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
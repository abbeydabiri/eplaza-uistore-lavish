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
                <span  @click="$router.go(-1)" class="gray">Home </span>
                <small>/</small>
                <span @click="$router.push({name:'basket'})"  class="mid-gray pointer">Shopping Basket</span>
                <small>/</small>
                <span @click="$router.push({name:'checkout'})" class="dark-gray">Shipping Details</span>
                <small>/</small>
                <span class="black">Payment</span>
            </div>

     
            <div class="f7 fl pa2 w-100 w-60-l tc tl-ns">
                <table class="f6 w-100" cellspacing="0">
                    <thead>
                    <tr>
                        <th class="fw6 bb b--black-20 tl pa2 bg-black-10">Image</th>
                        <th class="fw6 bb b--black-20 tl pa2 bg-black-10">Name</th>
                        <th class="fw6 bb b--black-20 tl pa2 bg-black-10">Price</th>
                        <th class="fw6 bb b--black-20 tl pa2 bg-black-10">Quantity</th>
                        <th class="fw6 bb b--black-20 tl pa2 bg-black-10">Total</th>
                        <th class="fw6 bb b--black-20 tl pa2 bg-black-10">Action</th>
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
                        <td class="pv3 pr3 bb b--black-20"> 200000</td>
                        <td class="pv3 pr3 bb b--black-20">
                        <a class="ba pa2 bg-white b--light-gray">-</a>
                        <a class="ba pa2 b--light-gray">1</a>
                        <a class="ba pa2 bg-white b--light-gray">+</a>
                        </td>
                        <td class="pv3 pr3 bb b--black-20"> 200000</td>
                        <td class="pv3 pr3 bb b--black-20">
                            <i class="fas pl3 red fa-times"></i>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20"></td>
                        <td class="pv3 pr3 bb b--black-20">Total</td>
                        <td class="pv3 pr3 bb b--black-20">
                        <small></small>2000
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="fl w-100 pt3">
                    <router-link to="/checkout" class="f5-ns f6 w-20-l w-25-m w-30 fl tc link dim pv2 mv2 dib white bg-dark-gray">Basket</router-link>

                    <span class="f5-ns f6 w-20-l w-25-m w-30 fr tc link dim pv2 mv2 dib white bg-dark-gray">Pay Now</span>
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
            notifications:[], Quantity:1, showImageNav:false, record:{ID:0, imageList:[], Image:"", Title:"", Amount:0, Barcode:""}
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
            
            getPricelistline() {
                const app = this;

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
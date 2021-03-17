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
                <span  @click="$router.go(-1)" class="black">Go Back </span>
                <small>/</small>
                <span @click="$router.push({name:'basket'})"  class="mid-gray pointer">Shopping Basket</span>
                <small>/</small>
                <span class="black">Shipping Details</span>
            </div>

     
            <div class="f7 fl pa2 w-100 w-60-l tc tl-ns">
                <div class="fl w-20-l w-third-m w-50 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="First Name" type="text" v-model="record.Firstname">
                </div>

                <div class="fl w-20-l w-third-m w-50 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="Last Name" type="text"  v-model="record.Lastname">
                </div>

                <div class="fl w-20-l w-third-m w-40 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="Mobile" type="text" v-model="record.Mobile">
                </div>

                <div class="fl w-40-l w-50-m w-60 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="Email" type="email"  v-model="record.Email">
                </div>
                
                <div class="fl w-30-l w-50-ns w-60 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="street" type="text" v-model="record.Street">
                </div>

                <div class="fl w-30-l w-50-m w-40 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="City" type="text"  v-model="record.City">
                </div>

                <div class="fl w-20-l w-25-m w-50 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="State" type="text"  v-model="record.State">
                </div>

                <div class="fl w-20-l w-25-m w-50 pa1">
                    <input class="pa2 bn br2 w-100 bg-black-20 " placeholder="Country" type="text"  v-model="record.Country">
                </div>

                <div class="fl w-100 pa1">
                    <textarea class="pa2 bn br2 w-100 bg-black-20 " name="" id="" cols="30" rows="3"></textarea>
                </div>

                <div class="fl w-100 pt3">
                    <router-link to="/basket" class="f4-ns f5 w-20-l w-25-m w-30 fl tc link dim pv2 mv2 dib white bg-dark-gray">Basket</router-link>

                    <router-link to="/payment" class="f4-ns f5 w-20-l w-25-m w-30 fr tc link dim pv2 mv2 dib white bg-dark-gray">Payment</router-link>
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
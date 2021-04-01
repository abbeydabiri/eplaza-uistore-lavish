<template> 
    <div class="flex flex-column flex-row-l vh-100 mw8 center">
    
        <div class="pa2 pl3-l pr1-l pt4-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column ">
            <div class="fl pa2 pt4-l w-100">
                <span class="fw5 black f2">{{getStoreTitle}}</span>
            </div>
            
            <div class="w-100 flex flex-column flex-row-ns items-end">
                <div class="f7 fl pa2 w-100 w-60-ns tc tl-ns">
                    <span class="black">Shop by: </span>
                    <span class="pointer gray" @click="$router.push({name:'category', params:{category:'all'}})">All Categories</span> 
                    <small class="mh1">/</small>
                    <span @click="$router.push({name:'category',params:{category:record.Category}})"  class="mid-gray pointer">{{record.Category}} </span>
                </div>
            </div>
            

            <div v-if="record.ID==0" class=" w-100 pa5 tc">
                <h1 class="f5 tc ma2 fw1 dark-gray"> <i class="f4 fas fa-spinner fa-spin"></i> searching please wait... </h1>
            </div>

            <div v-else class="f7 fl pa2 w-100 ">
                <div class="fl w-40-ns w-100 h-100-l">
                    <div class="flex flex-row items-center w-100 pointer relative" @mouseenter="showImageNav=true" @mouseleave="showImageNav=false"> 
                        <i :class="{'dn':!showImageNav}" class="absolute left-0 pointer fa fa-chevron-left ml2 pa3 bg-black-10 hover-dark-gray white ba b--black-05 br-100" @click="goLeft"  />
                        <div ref="imagescroller" class="w-100 flex" style="">
                            <img class="bn center w-100"  :src="record.Image"/>
                        </div>
                        <i :class="{'dn':!showImageNav}" class="absolute right-0 pointer fa fa-chevron-right mr2 pa3 bg-black-10 hover-dark-gray white ba b--black-05 br-100" @click="goRight" />
                    </div>

                    <div class="flex flex-row items-center w-100 center tc pt1"> 
                        <div v-for="(image, index) in record.imageList" :key="index" class="ph2 h3 w3 fl">
                            <div class="bn w-100 h-100 pointer" src="" @click="record.Image = image.Filepath" > 
                                <img class="bn w-100" :src="image.Filepath"/>    
                            </div>  
                        </div>
                    </div>
                </div>
                <div class="fl fr-ns pt0-ns w-60-ns pa2 w-100">
                    
                
                    <div class="w-100 fl f3-l f4 fw6">
                        {{record.Item}}
                        <div class="cf w-20 mt2 bt bw1 b--black-60"></div>
                    </div>
                    <div class="w-100 fl f7 pv2 gray">
                        Product Code: {{record.Barcode}}
                    </div>
                    
                    <div class="w-100 fl f2-l f3 fw6 bt bb b--black-05 pv2"> 
                        <span class="b pr1"></span> {{humanNumber(record.Amount)}}
                    </div>
                    <div v-if="record.ItemDescription!==''" class="mid-gray w-100 fl f6 pv3">
                        {{record.ItemDescription}}
                    </div>
                    <div v-else class="mid-gray w-100 fl f6 pv3">
                        Description:
                    </div>
                    <div class="w-100 fl f7 pv2 flex items-center bt bb b--black-05 noselect">
                        <span class="f7 pr3">
                            Quantity:
                        </span>
                        <span class="f6 fw6 pointer ">
                            <span class="ba ph3 pv1 br1 br--left b--light-gray bg-white fw2" @click="(Quantity>1) ? Quantity-- : Quantity">
                                -
                            </span>
                            <span class="ba ph3 pv1 b--light-gray" @click="Quantity=1">
                                {{Quantity}}
                            </span>
                            <span class="ba ph3 pv1 br1 br--right b--light-gray bg-white fw2" @click="Quantity++">
                                +
                            </span>
                        </span>
                    </div>

                    <div class="fl w-100 f6 pt2">
                        <span @click="$router.push({name:'checkout'})" class="f5 br1 ph2 ba b--dark-green shadow-1 tc link dim pv2 mv2 dib white bg-dark-green">Buy Now</span>
                        <span @click="$router.push({name:'basket'})" class="fr f5 br1 ph2 ba b--dark-gray shadow-1 tc link dim pv2 mv2 dib white bg-dark-gray">Add to Basket</span>
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
            notifications:[], Quantity:1, showImageNav:false, record:{ID:0, imageList:[], Image:"", Title:"", Amount:0, Barcode:"", Category:""}
        }},
        computed: {
            ...mapGetters('onlinestore', ['getCategoryList','getStoreTitle','getStoreImage']),
        },
        watch: {
            '$route.params.id': function(newID, oldId) {
                this.getPricelistline()
            }
        },
        mounted() { 
           this.getPricelistline()
        },
        created() {
            
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

                var id = app.$route.params.id
                app.record = {ID:0, imageList:[], Image:"", Title:"", Amount:0, Barcode:"", Category:""}
                HTTP.get("/api/pricelistlines" + "?id=" +id , { withCredentials: true }).then((response) => {
                    app.notifications = [response.data];
                    app.record = (response.data.Body == null || response.data.Body == undefined) ? {imageList:[]} : response.data.Body;
                    if ( response.data.Body.ID !== undefined && response.data.Body.ID == id) {  
                        if (app.record.imageList == null || app.record.imageList == undefined) {
                            app.record.imageList = []
                        }
                        app.isFound = true;


                        document.querySelector('meta[property="og:title"]').setAttribute("content", app.record.Title);
                        document.querySelector('meta[property="og:image"]').setAttribute("content", app.record.Image);
                        document.querySelector('meta[property="og:description"]').setAttribute("content", app.record.Description);
                    }
                }).catch((e) => { console.log(e); });
            },
        }
    }
</script>
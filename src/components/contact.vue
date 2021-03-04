<template>
    <div class="w-100 bg-near-white pv2 ph2 overflow-scroll cf">
        <div class=" w-100   pv2 ph2 h-100  ">
            <div class="flex pa2 w-100 h-100"> 

                <div class="ph3 pv3">
                    <navbar />
                </div>

                <div class="fl  w-100">
                    <div class="fl pt4 w-100">
                        <h1 class=" black sans-serif f2-l">Discover beautiful<br>African images.<br></h1>
                    </div>

                    <div class="fl w-80">
                        <div class="items-center ">
                            <span class="pa2 bg-white fl pointer">
                                <i class="fas fa-search"></i>
                            </span>
                            <input class="f7 f6-l sans-serif input-reset bn fl black-80 bg-white pa2 lh-solid w-60 " autocomplete="off" placeholder="Search high free resolution images" type="text" name="search" value="" id="search">
                        </div>
                    </div>

                    <div class="fl pt2 w-100">
                        <h1 class=" black sans-serif f5 b db mb2">Trending: <span class="normal gray sans-serif black"> Flower, Wallpapers, Background, Happy, Love</span></h1>
                    </div>

                    <div class="w-100 pt3 near-white flex flex-wrap-ns flex-nowrap " style="min-height:10rem">
                        <div class="overflow-y-scroll flex flex-row cf w-100">
                            <div class=" pb4 ">
                                <img src="@/assets/img/mikonos.jpg" class="grow pointer shadow-2 white br3 h4"  />
                            </div>

                            <div class="pl3 pb4">
                                <img src="@/assets/img/sunset.jpg" class="grow pointer shadow-2 white br3 h4"  />
                            </div>

                            <div class="pl3 pr1">      
                                <img src="@/assets/img/friends.jpg" class="grow pointer shadow-2 white br3 h4"  />
                            </div>
                        </div>
                    </div>

                    <div class="w-100 near-white flex flex-wrap-ns flex-nowrap " style="min-height:10rem">
                        <div class="overflow-y-scroll flex flex-row cf w-100">
                            <div class=" pb4 ">
                                <img src="@/assets/img/building.jpg" class="grow pointer shadow-2 white br3 h4"  />
                            </div>

                            <div class="pl3 pb4">
                                <img src="@/assets/img/boat.jpg" class="grow pointer shadow-2 white br3 h4"  />
                            </div>

                            <div class="pl3 pr1">      
                                <img src="@/assets/img/travel.jpg" class="grow pointer shadow-2 white br3 h4"  />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="ph5 w-10 dn dib-l h-100"> </div>
        </div>
    </div>
</template>

<script>
    import navbar from "@/components/reuseables/navbar"
    export default {
        name: 'home',
        components: {navbar},
        data(){return{

        }},
    }
</script>
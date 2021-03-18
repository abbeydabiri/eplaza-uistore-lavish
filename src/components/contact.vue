<template>
    <div class="flex flex-column flex-row-l vh-100 mw9 center"> 
        
        <div class="pa2 pl3-l pr1-l pt4-l">
            <navbar />
        </div>

        <div class="fl w-100 h-100 overflow-y-scroll flex flex-column">
            <div class="fl pa2 pt4-l w-100">
                <span class="fw5 black f2"><small>Shop @</small> Jemima's</span>
            </div>
            <div class="w-100 flex flex-wrap  mw7 bg-black-50 mt3 mt5-l shadow-3 center">
                <div class="fl w-100">
                    <div class="fl w-40-l w-100">
                        <div class="fl nl5-l mt5-l db w-100 bg-red washed-yellow shadow-7 pa4">
                            <div class="fl tl pt2 f3 fw6 tracked w-100">
                                Contact Us
                            </div>

                            <div class="fl inline-flex pt5 w-100">
                                <span class="pr3">
                                    <i class="fas fa-map-marker-alt"></i>
                                </span>
                                <span class="w-80 lh-copy measure nt1 tl f7">
                                    42 St James Boulevard James Boulevard James Boulevard 
                                </span>
                            </div>

                            <div class="fl inline-flex pt4 w-100">
                                <span class="pr3">
                                    <i class="far fa-envelope"></i>
                                </span>
                                <span class="w-80 lh-copy measure tl f7">
                                    KateGreenwood@dayrep.com
                                </span>
                            </div>
                            <div class="fl inline-flex pt4 w-100">
                                <span class="pr3">
                                    <i class="fas fa-headset"></i>
                                </span>
                                <span class="w-80 lh-copy measure tl f7">
                                    Hadvieterell
                                </span>
                            </div>
                            <div class="fl inline-flex pt4 w-100">
                                <span class="pr3">
                                    <i class="fas fa-mobile-alt"></i>
                                </span>
                                <span class="w-80 lh-copy measure tl f7">
                                    070 7054 3946
                                </span>
                            </div>
                            <div class="fl inline-flex justify-center pt4 pb3 w-100">
                                <span class="pr3">
                                    <i class="fab fa-instagram"></i>
                                </span>
                                <span class="pr3">
                                    <i class="fab fa-twitter"></i>
                                </span>
                                <span class="pr3">
                                    <i class="fab fa-linkedin-in"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="fl w-60-l w-100">
                        <div class="fl mt5 w-100 pa4 pl3-l tl ">
                            <div class="fl f3 pv2 fw7 w-100">
                                Get in Touch
                            </div>
                            <div class="fl pt1 pb2 w-100 f6">
                                Feel free to drop us a line below
                            </div>
                            <div class="fl w-80-l w-100">
                                <div class="fl pv3 w-100">
                                    <input type="text" placeholder="Name" class="bn br1 pa2 fl w-100 black bg-white-40"/>
                                </div>
                                <div class="fl pv3 w-100">
                                    <input type="text" placeholder="Email" class="bn br1 pa2 fl w-100 black bg-white-40"/>
                                </div>
                                <div class="fl pv3 w-100">
                                    <textarea type="text" placeholder="Type you message here" class="bn br1 pa2 h3 fl w-100 black bg-white-40"></textarea>
                                </div>
                                <div class="fl pv3 w-100">
                                    <div class=" br-pill pa2 fl w4 tc white fw6 tracked shadow-3 bg-red ttu">Send</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
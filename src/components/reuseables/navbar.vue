
<template>
    <div class="w-60-m w-100 w3-l h3 h5-l bg-washed-yellow flex flex-column-l flex-row hover-bg-grey hover-purple fl pointer br3 shadow-5" style="">
        <div class="tc flex ph2 w-30 w-20-m w-100-l">
            <img :src="getStoreImage"  class="mt1 center" style="" />
        </div>
        <div class="w-100 pa2 bg-black fl br3 pb4-l flex flex-column-l flex-row items-center">
            <div class="fl w-100">
                <div class="tc pv3-l ">
                    <router-link class="link white" to="/"> 
                        <i class="f3 grow dim fa fa-store washed-yellow" aria-hidden="true"/> 
                        <small class="db mid-gray">shop</small>
                    </router-link>
                </div>
            </div>
            
            <div class="fl w-100">
                <div class="tc pv3-l ">
                    <router-link class="link white" to="/basket"> 
                        <i class="f3 grow dim fa fa-shopping-basket washed-yellow" aria-hidden="true"/>
                        <small class="db mid-gray">cart</small>
                    </router-link>
                </div>
            </div>

            <div class="fl w-100">
                <div class="tc pv3-l ">
                    <router-link class="link white" to="/checkout"> 
                        <i class="f3 grow dim fa fa-truck washed-yellow" aria-hidden="true"/> 
                        <small class="db mid-gray">ship</small>
                    </router-link>
                </div>
            </div>

            <div class="fl w-100">
                <div class="tc pv3-l ">
                    <router-link class="link white" to="/contact"> 
                        <i class="f3 grow dim fa fa-heart red" aria-hidden="true"/> 
                        <small class="db mid-gray">care</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data(){return{

        }},
        computed: {
            ...mapGetters('onlinestore', ['getStoreTitle','getStoreImage']),
        },
    }
</script>
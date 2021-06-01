
<template>
    <nav class="pa2 w-100 fl">
        <div class="pointer items-center flex f6 f5-ns">
            <i class="f5 f4-ns fa fa-caret-left mr2 dark-gray" @click="goLeft" />
            <div ref="categoryscroller" class="nowrap overflow-x-auto w-100 dark-gray">
                <span class="link dim dib mr4" @click="$router.push({name:'home'})">ALL</span>
                <span class="link dim dib mr4 categoryitem" :class="{'gray':curCategory==category.Category,}" 
                v-for="(category, index) in getCategoryList" :key="index"> 
                    <span v-if="curCategory!==category.Category" @click="$router.push({name:'category', params:{category:category.Category}})">
                        {{category.Category}} 
                    </span> 
                    <span v-else>{{category.Category}}</span>
                </span> 
            </div>
            <i class="f5 f4-ns fa fa-caret-right ml2 dark-gray" @click="goRight" />
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex';
    
    export default {
        props: ['curCategory'],
        computed: {
            ...mapGetters('onlinestore', ['getCategoryList']),
        },
        data(){return{ }},
        methods:{
            goLeft() {
                if (this.$refs.categoryscroller.scrollLeft > 0) {
                    // this.$refs.categoryscroller.scrollLeft -= document.getElementsByClassName("itemimage")[0].clientWidth;
                }
                if (this.$refs.categoryscroller.scrollLeft < 0){
                    this.$refs.categoryscroller.scrollLeft = 0
                }
            },
            goRight() {
                if (this.$refs.categoryscroller.scrollLeft <= this.$refs.categoryscroller.scrollWidth) {
                    this.$refs.categoryscroller.scrollLeft += document.getElementsByClassName("categoryitem")[0].clientWidth;
                    
                } 
                
                if (this.$refs.categoryscroller.scrollLeft > this.$refs.categoryscroller.scrollWidth){
                    this.$refs.categoryscroller.scrollLeft = this.$refs.categoryscroller.scrollWidth
                }
            },
        }
        
    }
</script>
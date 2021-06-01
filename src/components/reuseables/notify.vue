<template>
    <div class="dt center tl mw6" :align="customclass">
        <div v-for="(alert, index) in notifications" :key="index" v-if="alert.Message!==''" class="cf br1 pr2 f6 fw4 white flex mt2 mb1" :class="{'bg-green':alert.Code==200,'bg-red':alert.Code!==200}">
            <span class="pointer fl w-auto pa1 bg-black-70 flex items-center" @click="close(index)"> &times; </span>
            <span class="fl w-100 pa1"> {{ alert.Message }} </span>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        props: ['notifications', 'align'],
        computed: {
            // customclass: function() {
            //     if (this.align == "") {
            //         return "center"
            //     }
            //     return this.align
            // }
        },
        data() {return{ 
            customclass:"center" 
        }},
        watch: {
            notifications: function () { this.checkClass()}
        },
        methods: {
            close(index) {
                this.$delete(this.notifications, index)
            },
            checkClass() {
                if (this.align == "") {
                    this.customclass = "center"
                } else {
                    this.customclass = this.align
                }
            }
        },
    }
</script>

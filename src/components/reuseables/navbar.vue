
<template>
    <div class="w-60 bg-black grow hover-bg-grey hover-purple fl ph2 pv2 pointer br3 shadow-5">
        <div class="w-100  pv2-l fl tc">
            <img src="@/assets/img/lof.png"  class="cf white h3" />
        </div>
        <div class="fl w-100">
            <div class="tc pt5 ">
                <router-link class="link white" to="/"> 
                    <i class="f3 fas fa-home" aria-hidden="true"/> 
                </router-link>
            </div>
        </div>
        <div class="fl w-100">
            <div class="tc pt5 ">
                <router-link class="link white" to="/"> 
                    <i class="f3 fas fa-user" aria-hidden="true"/> 
                </router-link>
            </div>
        </div>
        <div class="fl w-100">
            <div class="tc pt5 ">
                <router-link class="link white" to="/"> 
                    <i class="f3 fas fa-envelope" aria-hidden="true"/> 
                </router-link>
            </div>
        </div>
        <div class="fl w-100">
            <div class="tc pt5 ">
                <router-link class="link white" to="/"> 
                    <i class="f3 fas fa-cog" aria-hidden="true"/> 
                </router-link>
            </div>
        </div>
        <div class="fl w-100">
            <div class="tc pt6 pb4 ">
                <router-link class="link white" to="/"> 
                    <i class="f3 fas fa-sign-out" aria-hidden="true"/> 
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){return{

        }},
    }
</script>
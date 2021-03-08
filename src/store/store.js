import Vue from 'vue'
import Vuex from 'vuex'

import category from "./modules/categorys"
import categorySocket from "./plugins/categorys"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { category },
    plugins: [ categorySocket() ]
})

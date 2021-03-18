import Vue from 'vue'
import Vuex from 'vuex'

import onlinestore from "./modules/onlinestore"
import onlineStorePlugin from "./plugins/onlinestore"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: { onlinestore },
    plugins: [ onlineStorePlugin() ]
})

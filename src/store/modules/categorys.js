
const state = {
    categoryList: [],
}

const getters = {
    getCategoryList: state => state.categoryList,
}

const actions = {
    updateList({commit}, categoryList ) {
        commit('UPDATE_LIST', categoryList)
    },

    callAPI({commit} ) {
        commit('CALL_API')
    },
}

const mutations = {
    CALL_API(state) {
        return true
    },
    UPDATE_LIST(state, categoryList) {
        
        
        for (var categoryID in categoryList) {
            var category = categoryList[categoryID]
            category["child"] = {}
            if (category.ParentID == 0) {
                if (Object.keys(state.categoryList).length == 0) {
                    state.categoryList = { [category.CategoryID]: category }
                } else {
                    state.categoryList[category.CategoryID] = category
                }
            } else {
                //parent id exists look for parent and populate
                if (Object.keys(state.categoryList[category.ParentID]["child"]).length == 0) {
                    state.categoryList[category.ParentID]["child"] = { [category.CategoryID]: category }
                } else {
                    state.categoryList[category.ParentID]["child"][category.CategoryID] = category
                }
            }
        }
        return true
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
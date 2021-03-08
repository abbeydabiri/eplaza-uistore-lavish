import axios from "axios";

export default function createAPICall() {
    return store => {

        var setupAPICall = function () {
             
            axios.get("/api/onlinestore").then((response) => {
                var categoryList = (response.data == null) ? [] : response.data;
                store.dispatch('category/updateList', Object.freeze(categoryList));
            }).catch((e) => {
                console.log(e)
            })
        }
        setupAPICall()
        
        store.subscribe((action, state) => {
            switch (action.type) {
                case "category/CALL_API":
                    setupAPICall();
                    break;
            }
        })

    };
}

import axios from "axios";

export default function createAPICall() {
    return store => {

        var setupAPICall = function () {
             
            axios.get("/api/onlinestore").then((response) => {
                var onlineStore = (response.data == null) ? {} : response.data;
                store.dispatch('onlinestore/updateStore', Object.freeze(onlineStore));
            }).catch((e) => {
                console.log(e)
            })
        }
        setupAPICall()
        
        store.subscribe((action, state) => {
            switch (action.type) {
                case "onlinestore/CALL_API":
                    setupAPICall();
                    break;
            }
        })

    };
}

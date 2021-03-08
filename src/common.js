import axios from "axios";

export const HTTP = axios.create({withCredentials:true})

export function humanNumber(nStr) {
    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : ".0";
    x2 = x2.length == 2 ? x2 + "0" : x2;
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}
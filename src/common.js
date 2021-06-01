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

// CREDITS TO https://www.cssscript.com/image-zoom-pan-hover-detail-view/
export function addZoom(target) {
    // (A) FETCH CONTAINER + IMAGE
    var container = document.getElementById(target)

    if (container == null || container == undefined) {
        return
    }

    var imgsrc = container.currentStyle || window.getComputedStyle(container, false),
        imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, ""),
        img = new Image();

    // (B) LOAD IMAGE + ATTACH ZOOM
    img.src = imgsrc;
    img.onload = function () {
        var imgWidth = img.naturalWidth,
            imgHeight = img.naturalHeight,
            ratio = imgHeight / imgWidth,
            percentage = ratio * 100 + '%';

        // (C) ZOOM ON MOUSE MOVE
        container.onmousemove = function (e) {
            var boxWidth = container.clientWidth,
                rect = e.target.getBoundingClientRect(),
                xPos = e.clientX - rect.left,
                yPos = e.clientY - rect.top,
                xPercent = xPos / (boxWidth / 100) + "%",
                yPercent = yPos / ((boxWidth * ratio) / 100) + "%";

            Object.assign(container.style, {
                backgroundPosition: xPercent + ' ' + yPercent,
                backgroundSize: imgWidth + 'px'
            });
        };

        // (D) RESET ON MOUSE LEAVE
        container.onmouseleave = function (e) {
            Object.assign(container.style, {
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            });
        };
    }
};

export function updateTotals(order) {

    var lineno = 1
    order.Taxamount = 0;
    order.Totalexcltax = 0;
    order.Totalincltax = 0;
    if (order.Vatformula == undefined || order.Vatformula == '') {
        order.Vatformula = "Inclusive"
    }

    // for (var index = 0, len = order.lines.length; index < len; index++) {
    for (var index in order.lines) {
        var curLine = order.lines[index];

        curLine.Lineno = lineno++
        if (curLine.Tax !== null && curLine.Tax !== undefined) {
            curLine.Taxpercent = curLine.Tax
        }
        curLine.Vatformula = order.Vatformula

        var totalAmount = curLine.Amount * curLine.Quantity
        curLine.Taxamount = totalAmount * (curLine.Taxpercent / 100);
        curLine.Taxamount = parseFloat(parseFloat(curLine.Taxamount).toFixed(2))


        switch (curLine.Vatformula) {
            case "Inclusive":
                curLine.Totalincltax = totalAmount
                curLine.Totalexcltax = totalAmount - curLine.Taxamount
                break;

            case "Exclusive":
                curLine.Totalincltax = totalAmount + curLine.Taxamount
                curLine.Totalexcltax = totalAmount
                break;
        }
        order.lines[index] = curLine;
        order.Taxamount = order.Taxamount + curLine.Taxamount
        order.Totalexcltax = order.Totalexcltax + curLine.Totalexcltax
        order.Totalincltax = order.Totalincltax + curLine.Totalincltax
    }

    return order
}

let brand;
let signalType;
let instrument;
let orderDirection;
let stopLoss;
let takeProfit1;
let takeProfit2;
let takeProfit3;
let fullLink;
let shortLink;

window.addEventListener("load", function () {
    brand = document.getElementById('brand');
    signalType = document.getElementById('signalType');
    instrument = document.getElementById('instrument');
    orderDirection = document.getElementById('orderDirection');
    stopLoss = document.getElementById('stopLoss');
    takeProfit1 = document.getElementById('takeProfit1');
    takeProfit2 = document.getElementById('takeProfit2');
    takeProfit3 = document.getElementById('takeProfit3');
    fullLink = document.getElementById('fullLink');
    shortLink = document.getElementById('shortLink');
    document.getElementById('generate').addEventListener('click', createLink);
    document.getElementById('copyFullLink').addEventListener('click', copyFullLink);
    document.getElementById('copyShortLink').addEventListener('click', copyShortLink);
    parseInstruments();
});


let createLink = function () {
    let link = `${brand.value}/?isSmsNotify
    &type=${signalType.value}
    &symbol=${instrument.value}
    &direction=${orderDirection.value}
    &sl=${stopLoss.value}
    &tp1=${takeProfit1.value}
    &tp2=${takeProfit2.value}
    &tp3=${takeProfit3.value}`;
    link = link.replace(/\s{2,}/g, '');
    fullLink.value = link;

    let json = JSON.stringify({
        long_url: link,
        group_guid: "Bk5fgrnGCOu"
    });

    let xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let t = JSON.parse(this.responseText)
            shortLink.value = t.link;
        }
    });
    xhr.open("POST", `https://api-ssl.bitly.com/v4/shorten`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer 9f373bef78201db29272eefeb5df5a1bc3639055');
    xhr.send(json);
}

function copyFullLink() {
    fullLink.select();
    document.execCommand("copy");
}

function copyShortLink() {
    shortLink.select();
    document.execCommand("copy");
}

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

let parseInstruments = function () {
    readTextFile("instruments.json", function (text) {
        let data = JSON.parse(text);
        for (let item in data) {
            let value = data[item];
            let opt = document.createElement('option');
            opt.value = item;
            opt.innerHTML = value;
            instrument.appendChild(opt);
        }
    });
};







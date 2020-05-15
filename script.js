let messageText;
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
let finalMessage;

window.addEventListener("load", function () {
    messageText = document.getElementById('message');
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
    finalMessage = document.getElementById('finalMessage');
    document.getElementById('generate').addEventListener('click', createLink);
    document.getElementById('copyFullLink').addEventListener('click', copyFullLink);
    parseInstruments();







});

let createLink = function () {
    let link = `https://${brand.value}/?isSmsNotify
    &type=${signalType.value}
    &symbol=${instrument.value}
    &direction=${orderDirection.value}
    &sl=${stopLoss.value}
    &tp1=${takeProfit1.value}
    &tp2=${takeProfit2.value}
    &tp3=${takeProfit3.value}
    `;
    link = link.replace(/\s{2,}/g, '');
    fullLink.value = link;
    finalMessage.value = `${messageText.value}<a href="${link}"> click me </a>`

    let data = null;

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            result= this.responseText.match(/>([\s\S]+?)</);
            result = result[0].slice(1)
            result = result.slice(0,-1);
            shortLink.value = result;
        }
    });

    xhr.open("GET", `https://shorturl-sfy-cx.p.rapidapi.com/?url=${link}`);
    xhr.setRequestHeader("x-rapidapi-host", "shorturl-sfy-cx.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "a98b94d30bmsha0791ccba532f4bp15763bjsn1f6a19ca40e5");

    xhr.send(data);
}

function copyFullLink() {
    fullLink.select();
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







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
    finalMessage = document.getElementById('finalMessage');
    document.getElementById('generate').addEventListener('click', createLink);
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







function createMyExtensionDivision(id) {
    //Creating Elements
    var div = document.createElement("div")
    div.id = id;
    return div;
};

function createButton(id, text) {
    //Creating Elements
    var btn = document.createElement("button")
    btn.id = id;
    var t = document.createTextNode(text);
    btn.appendChild(t);
    return btn;
};

function createTextBox(id, text) {
    //Creating Elements
    var textBox = document.createElement("INPUT")
    textBox.id = id;
    textBox.setAttribute("type", "text");
    return textBox;
};


function checkUrl(test_url) {
    var testLoc = document.createElement('a');
    testLoc.href = test_url.toLowerCase();
    url = testLoc.hostname;
    if (url.indexOf('google.com') !== -1) {
        return true;
    }
    return false;
}

window.onload = () => {
    var a = document.URL;
    var b = 'google.com';

    var test = checkUrl(b);
    console.log(b + ':' + test); //prints result
    console.log(b);
    if (test) {
        console.log(b + ':2:' + test);

        AfterElementId = "extabar";
        parentElementId = "share_google";

        // var div = createMyExtensionDivision(parentElementId);

        if (!document.getElementById(AfterElementId)) {
            AfterElementId = "hdr";
        }

        var div = addMyExtensionDivToPage(parentElementId, AfterElementId);

        elementId = "share_google_btn";
        var button = addButtonByElementId(elementId, div.id, "Share");

        console.log(b + ':3:' + elementId);


        // Save it using the Chrome extension storage API.
        // saveToken();

        var token = "";
        // Read it using the storage API
        chrome.storage.sync.get(['berimbasket_token', 'berimbasket_name'], function (items) {
            // message('Settings retrieved', items);
            console.log('Settings retrieved : ' + items['berimbasket_token']);
            token = items['berimbasket_token'];


            if (token) {

                // if (items.)

                var qs = getQuerySearchPhraseGoogleDotCom();

                var q = qs["q"];

                button.setAttribute("href", "q=" + q);

                button.addEventListener('click', () => call_share_api(button, q, token));
            }
        });
    }
}

function getQuerySearchPhraseGoogleDotCom() {
    return (function (a) {
        if (a == "")
            return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";

            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
}

function saveToken() {
    var key = "berimbasket_token_txt";
    var value = "adfasdf";
    var value = document.getElementById(key).value;
    saveInChromeStorageByKey(key, value);
}

function saveInChromeStorageByKey(key, value) {
    chrome.storage.sync.set({
        'berimbasket_token': value
    }, function () {
        console.log('Settings saved');
    });
}

function addMyExtensionDivToPage(elementId, AfterElementId) {
    var myExtensionPlaceholder = document.getElementById(AfterElementId);
    var div = createMyExtensionDivision(elementId);
    myExtensionPlaceholder.appendChild(div);
    return div;
}

function addButtonByElementId(elementId, AfterElementId, buttonText) {
    var slim_bar = document.getElementById(AfterElementId);
    var button = createButton(elementId, buttonText);
    slim_bar.appendChild(button);
    return button;
}

function addTextBoxByElementId(elementId, AfterElementId, buttonText) {
    var parentElement = document.getElementById(AfterElementId);
    var textbox = createTextBox(elementId, buttonText);
    parentElement.appendChild(textbox);
    return textbox;
}

function call_share_api(el, q, token) {
    // document.querySelector("#app").style.backgroundColor = 'black';
    var request = new XMLHttpRequest();
    console.log(el.getAttribute("href"));
    console.log(q);
    // Open a new connection, using the GET request on the URL endpoint
    var url = "https://berimbasket.ir/bball/bots/resend.php?token=" + token + "&" + el.getAttribute("href");
    console.log(url);
    request.open('GET', url, true)

    request.onload = function () {
        // Begin accessing JSON data here
        console.log("returned:");
        console.log(this); // 'this' should be a XMLHttpRequest object
        console.log(this.status);
        console.log(this.responseText);
        if (this.responseText == "token not correct") {
            var button = addButtonByElementId("save_token_btn", "share_google", "save");
            var textbox = addTextBoxByElementId("berimbasket_token_txt", "share_google", "save");
            button.addEventListener('click', () => saveToken());

        }
    }

    // Send request
    request.send()
}
function createMyExtensionDivision(id, className) {
    //Creating Elements
    var div = document.createElement("div");
    div.id = id;
    if (className) {
        div.classList.add(className);
    }
    return div;
}

function createButton(id, text) {
    //Creating Elements
    var btn = document.createElement("button");
    btn.id = id;
    var t = document.createTextNode(text);
    btn.appendChild(t);
    return btn;
}

function createTextBox(id, text) {
    //Creating Elements
    var textBox = document.createElement("INPUT");
    textBox.id = id;
    textBox.setAttribute("type", "text");
    return textBox;
}

function checkUrl(url) {
    var testLoc = document.createElement("a");
    testLoc.href = url.toLowerCase();
    current_url = testLoc.hostname;
    if (current_url.indexOf(url) !== -1) {
        return true;
    }
    return false;
}

function getQuerySearchPhraseGoogleDotCom() {
    return (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split("=", 2);
            if (p.length == 1) b[p[0]] = "";
            else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split("&"));
}

function saveToken() {
    var key = "berimbasket_token_txt";
    var value = "adfasdf";
    var value = document.getElementById(key).value;
    saveInChromeStorageByKey(key, value);
}

function saveInChromeStorageByKey(key, value) {
    chrome.storage.sync.set({
            berimbasket_token: value,
        },
        function () {
            console.log("Settings saved");
        }
    );
}

function addMyExtensionDivToPage(elementId, AfterElementId, className) {
    var myExtensionPlaceholder = document.getElementById(AfterElementId);
    var div = createMyExtensionDivision(elementId, className);
    myExtensionPlaceholder.appendChild(div);
    myExtensionPlaceholder.insertBefore(div, myExtensionPlaceholder.firstChild);
    return div;
}


function addMyExtensionDivToPageByClassName(elementId, AfterElementClassName, className) {
    var myExtensionPlaceholder = document.getElementsByClassName(AfterElementClassName);
    
    if (myExtensionPlaceholder.length > 0) {
        var div = createMyExtensionDivision(elementId, className);
        
        // Append the new div to the first element in the collection
        myExtensionPlaceholder[0].appendChild(div);
        
        // Insert the new div before the first child of the first element in the collection
        myExtensionPlaceholder[0].insertBefore(div, myExtensionPlaceholder[0].firstChild);
        
        return div;
    } else {
        console.log("No elements found with the class name: " + AfterElementClassName);
        return null;
    }
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

function call_virgool_share_api(element, token, elementId) {
    document.getElementById(elementId).setAttribute("disabled", "");

    // document.querySelector("#app").style.backgroundColor = 'black';
    var request = new XMLHttpRequest();
    console.log(element.getAttribute("href"));

    // Open a new connection, using the GET request on the URL endpoint
    var url =
        "https://berimbasket.ir/bball/bots/chrome_extension_resend.php?token=" +
        token +
        "&" +
        element.getAttribute("href");
    console.log(url);
    request.open("GET", url, true);

    request.onload = function () {
        // Begin accessing JSON data here
        console.log("returned:");
        console.log(this); // 'this' should be a XMLHttpRequest object
        console.log(this.status);
        if (this.status == 200) {
            var btn = document.getElementById(elementId);
            btn.innerText = "Done";
        } else {
            document.getElementById(elementId).removeAttribute("disabled");
        }
        console.log(this.responseText);
        if (this.responseText == "token not correct") {
            addSaveTokenDivToPage();
        }
    };

    // Send request
    request.send();
}

// Function to extract data using XPath
function extractData(xpath, doc, resultType) {
    const result = doc.evaluate(xpath, doc, null, resultType, null);
    return resultType === XPathResult.STRING_TYPE ? result.stringValue : result.singleNodeValue;
}

function extractDataSharab(xpath, doc, resultType) {
    const result = doc.evaluate(xpath, doc, null, resultType, null);
    
    if (resultType === XPathResult.STRING_TYPE) {
        return result.stringValue;
    } else if (resultType === XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
        return result; // Return the entire snapshot for further processing
    } else {
        return result.singleNodeValue; // For single node results
    }
}

// Send POST request
async function sendPostRequest(data, button, endpoint) {
    // var button = document.getElementById("share_navaar_btn");

    try {
        var url = "http://localhost:8000"
        url = "https://bots.pardisania.ir"
        var uri = url + '/api/' + endpoint;
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            button.style.backgroundColor = 'green'; // Reset color on success
            button.textContent = response.statusText + ":" + response.type

            // alert('Data sent successfully!');
        } else {
            button.style.backgroundColor = 'red'; // Change button color to red on error
            button.textContent = response.statusText + ":" + response.type
            const errorBody = await response.text(); // Log the response body
            console.error('POST request failed:', response.statusText, errorBody);
        }
    } catch (error) {
        button.style.backgroundColor = 'red'; // Change button color to red on error
        button.textContent = response.statusText + ":" + response.type

        console.error('Error sending POST request:', error);
    }
}

function call_google_share_api(element, token) {
    document.getElementById("share_google_btn").setAttribute("disabled", "");

    // document.querySelector("#app").style.backgroundColor = 'black';
    var request = new XMLHttpRequest();
    console.log(element.getAttribute("href"));
    // Open a new connection, using the GET request on the URL endpoint
    var url =
        "https://berimbasket.ir/bball/bots/chrome_extension_resend.php?token=" +
        token +
        "&" +
        element.getAttribute("href");
    console.log(url);
    request.open("GET", url, true);

    request.onload = function () {
        // Begin accessing JSON data here
        console.log("returned:");
        console.log(this); // 'this' should be a XMLHttpRequest object
        console.log(this.status);
        if (this.status == 200) {
            var btn = document.getElementById("share_google_btn");
            btn.innerText = "Done";
        } else {
            document
                .getElementById("share_google_btn")
                .removeAttribute("disabled");
        }
        console.log(this.responseText);
        if (this.responseText == "token not correct") {
            addSaveTokenDivToPage();
        }
    };

    // Send request
    request.send();
}

function addSaveTokenDivToPage() {
    var button = addButtonByElementId(
        "save_token_btn",
        "share_google_div",
        "save"
    );
    var textbox = addTextBoxByElementId(
        "berimbasket_token_txt",
        "share_google_div",
        "save"
    );
    button.addEventListener("click", () => saveToken());
}

function getSecondPart(str) {
    return str.split("https://vrgl.ir/")[1];
}
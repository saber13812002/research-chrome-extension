function createButton(id, text) {
    //Creating Elements
    var btn = document.createElement("button")
    btn.id = id;
    var t = document.createTextNode(text);
    btn.appendChild(t);
    return btn;
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
        var slim_bar = document.getElementById("extabar");
        var button = createButton("share_google", "Share");
        slim_bar.appendChild(button)



        var qs = (function (a) {
            if (a == "") return {};
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

        var q = qs["q"];

        button.setAttribute("href", "https://pardisania.ir/?q=" + q);

        button.addEventListener('click', () => show_share_textbox(button, q));
    }
}

function show_share_textbox(el, q) {
    // document.querySelector("#app").style.backgroundColor = 'black';
    var request = new XMLHttpRequest()
    console.log(el.getAttribute("href"));
    console.log(q);
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', el.getAttribute("href"), true)

    request.onload = function () {
        // Begin accessing JSON data here
        console.log("returned:");
    }

    // Send request
    request.send()
}
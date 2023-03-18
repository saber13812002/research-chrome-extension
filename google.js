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
    console.log("google");
    if (test) {
        console.log("google");
        var slim_bar = document.getElementById("slim_appbar");
        var button = createButton("share_google", "Share");
        slim_bar.appendChild(button)
        // document.querySelector("#upload-video").prepend(button);
        button.addEventListener('click', () => show_share_textbox());
    }
}

function show_share_textbox() {
    document.querySelector("#app").style.backgroundColor = 'black';
}
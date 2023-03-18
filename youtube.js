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
    if (url.indexOf('youtube.com') !== -1) {
        return true;
    }
    return false;
}

window.onload = () => {

    var a = document.URL;
    var b = 'youtube.com';
    
    var test = checkUrl(b);
    console.log(b + ':' + test); //prints result
    if (test) {
        var button = createButton("darkmodebutton", "Dark Mode");
        document.querySelector("#upload-video").prepend(button);
        button.addEventListener('click', () => enableDarkMode());
    }

}

function enableDarkMode() {
    document.querySelector("#app").style.backgroundColor = 'black';
}
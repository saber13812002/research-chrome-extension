function createButton(id, text) {
    //Creating Elements
    var btn = document.createElement("button")
    btn.id = id;
    var t = document.createTextNode(text);
    btn.appendChild(t);
    return btn;
};

window.onload = () => {
    var button = createButton("darkmodebutton", "Dark Mode");
    document.querySelector("#upload-video").prepend(button);
    button.addEventListener('click', () => enableDarkMode());
}

function enableDarkMode() {
    document.querySelector("#app").style.backgroundColor = 'black';
}
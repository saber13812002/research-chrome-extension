
window.onload = () => {
    var google = 'google.com';
    var youtube = 'youtube.com';
    var aparat = 'aparat.com';
    var stackoverflow = 'stackoverflow.com';

    if (checkUrl(google)) {
        console.log(google);
        AfterElementId = "extabar";
        parentElementId = "share_google";

        if (!document.getElementById(AfterElementId)) {
            AfterElementId = "hdr";
        }

        var div = addMyExtensionDivToPage(parentElementId, AfterElementId);

        elementId = "share_google_btn";
        var button = addButtonByElementId(elementId, div.id, "Share");

        console.log(google + ':3:' + elementId);

        var token = "";
        // Read it using the storage API
        chrome.storage.sync.get(['berimbasket_token', 'berimbasket_name'], function (items) {
            // message('Settings retrieved', items);
            console.log('Settings retrieved : ' + items['berimbasket_token']);
            token = items['berimbasket_token'];

            if (token) {
                var qs = getQuerySearchPhraseGoogleDotCom();
                var q = qs["q"];
                button.setAttribute("href", "q=" + q);
                button.addEventListener('click', () => call_share_api(button, q, token));
            }
        });
    }
    else if(checkUrl(youtube)){
        console.log(youtube);
    }
    else if(checkUrl(aparat)){
        console.log(aparat);
    }
    else if(checkUrl(stackoverflow)){
        console.log(stackoverflow);
    }
}

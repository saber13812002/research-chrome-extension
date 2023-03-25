window.onload = () => {
    var google = "google.com";
    var virgool = "virgool.io";
    var youtube = "youtube.com";
    var aparat = "aparat.com";
    var stackoverflow = "stackoverflow.com";

    if (checkUrl(google)) {
        console.log(google);
        AfterElementId = "extabar";
        parentElementId = "share_google_div";

        if (!document.getElementById(AfterElementId)) {
            AfterElementId = "hdr";
        }

        var extension_div = addMyExtensionDivToPage(
            parentElementId,
            AfterElementId,
            ""
        );

        if (extension_div) {
            elementId = "share_google_btn";
            var button = addButtonByElementId(
                elementId,
                extension_div.id,
                "Share"
            );

            console.log(google + ":3:" + elementId);

            var token = "";
            // Read it using the storage API
            chrome.storage.sync.get(["berimbasket_token"], function (items) {
                // message('Settings retrieved', items);
                console.log(
                    "Settings retrieved : " + items["berimbasket_token"]
                );
                token = items["berimbasket_token"];

                if (token) {
                    var queryString = getQuerySearchPhraseGoogleDotCom();
                    var query = queryString["q"];
                    var button = document.getElementById("share_google_btn");
                    button.setAttribute(
                        "href",
                        "q=" + query + "&origin=" + google
                    );
                    button.addEventListener("click", () =>
                        call_google_share_api(button, token)
                    );
                } else {
                    addSaveTokenDivToPage();
                }
            });
        } else {
            console.log("parent div not found!");
        }
    } else if (checkUrl(youtube)) {
        console.log(youtube);
    } else if (checkUrl(aparat)) {
        console.log(aparat);
    } else if (checkUrl(stackoverflow)) {
        console.log(stackoverflow);
    } else if (checkUrl(virgool)) {
        console.log(virgool);

        elementId = "share_virgool_btn";

        if (document.getElementById(elementId) != null) {
            AfterElementId = "react-app";
            parentElementId = "share_virgool_div";

            var extension_div = addMyExtensionDivToPage(
                parentElementId,
                AfterElementId,
                "_3a4R8tvUs3FQ9jdg7-p6iu"
            );

            var button = addButtonByElementId(
                elementId,
                extension_div.id,
                "Share"
            );

            console.log(google + ":3:" + elementId);

            var token = "";
            // Read it using the storage API
            chrome.storage.sync.get(["berimbasket_token"], function (items) {
                // message('Settings retrieved', items);
                console.log(
                    "Settings retrieved : " + items["berimbasket_token"]
                );
                token = items["berimbasket_token"];

                if (token) {
                    var share_post__share_link_copy_input =
                        document.getElementById(
                            "share-post--share-link-copy-input"
                        );
                    var url = share_post__share_link_copy_input.value;
                    url = getSecondPart(url);
                    var button = document.getElementById(elementId);
                    button.setAttribute(
                        "href",
                        "url=" + url + "&origin=" + virgool
                    );
                    button.addEventListener("click", () =>
                        call_virgool_share_api(button, token, elementId)
                    );
                } else {
                    addSaveTokenDivToPage();
                }
            });
        }

        if (document.getElementsByClassName("share-buttons") != null) {
            elementId = "share-buttons";

            AfterElementId = "app-root-single-ads";
            parentElementId = "share_virgool_div";

            var extension_div = addMyExtensionDivToPage(
                parentElementId,
                AfterElementId,
                "_3a4R8tvUs3FQ9jdg7-p6iu"
            );

            var button = addButtonByElementId(
                elementId,
                extension_div.id,
                "Share"
            );
            var token = "";
            // Read it using the storage API
            chrome.storage.sync.get(["berimbasket_token"], function (items) {
                // message('Settings retrieved', items);
                console.log(
                    "Settings retrieved : " + items["berimbasket_token"]
                );
                token = items["berimbasket_token"];

                if (token) {
                    var url =
                        document.getElementsByClassName("share-buttons")[0]
                            .innerText;
                    url = getSecondPart(url);
                    var button = document.getElementById(elementId);
                    button.setAttribute(
                        "href",
                        "url=" + url + "&origin=" + virgool
                    );
                    button.addEventListener("click", () =>
                        call_virgool_share_api(button, token, elementId)
                    );
                } else {
                    addSaveTokenDivToPage();
                }
            });
        }
    }
};

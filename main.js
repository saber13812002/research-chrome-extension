window.onload = () => {
    var google = "google.com";
    var virgool = "virgool.io";
    var youtube = "youtube.com";
    var aparat = "aparat.com";
    var songsara = "songsara.net";
    var stackoverflow = "stackoverflow.com";
    var navaar = "navaar.ir";

    if (checkUrl(google)) {
        console.log(google);
        AfterElementId = "appbar";
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
    } else if (checkUrl(navaar)) {
        console.log(navaar);

        AfterElementId = "topNav";
        parentElementId = "share_navaar_div";

        var extension_div = addMyExtensionDivToPage(
            parentElementId,
            AfterElementId,
            ""
        );

        console.log(navaar);


        if (extension_div) {
            elementId = "share_navaar_btn";
            var button = addButtonByElementId(
                elementId,
                extension_div.id,
                "Share"
            );

            console.log(navaar + ":3:" + elementId);

            var token = "";
            // Read it using the storage API
            chrome.storage.sync.get(["berimbasket_token"], function (items) {
                // message('Settings retrieved', items);
                console.log(
                    "Settings retrieved : " + items["berimbasket_token"]
                );
                token = items["berimbasket_token"];

                console.log(token)

                if (token) {

                    const url = window.location.href; // Get the current page URL
                    // alert(`Current URL: ${url}`); // Display the URL

                    const match = url.match(/https:\/\/www\.navaar\.ir\/audiobook\/(\d{3,10})\/.*/);

                    if (match) {
                        const audioBookId = match[1];

                        console.log(token)
                        var button = document.getElementById("share_navaar_btn");

                        // Define XPath expressions
                        const descriptionXPath = '/html/body/div[1]/div[2]/div/div/section[2]/div/div/div[2]/div[1]/p/span';
                        const imageXPath = '/html/body/div[1]/div[2]/div/div/section[2]/div/div/div[1]/div[1]/figure/a/img';

                        // Ensure the document is available
                        const doc = document; // Use the global document object

                        // Extract description
                        const description = extractData(descriptionXPath, doc, XPathResult.STRING_TYPE);

                        // Extract image URL and title
                        const imageElement = extractData(imageXPath, doc, XPathResult.FIRST_ORDERED_NODE_TYPE);
                        const imageUrl = imageElement ? imageElement.getAttribute('src') : '';
                        const title = imageElement ? imageElement.getAttribute('alt') : '';

                        // Prepare data for POST request
                        const postData = {
                            origin: 'navaar.ir',
                            media_id: audioBookId,
                            image: imageUrl,
                            link: `https://www.navaar.ir/audiobook/${audioBookId}`,
                            title: title,
                            description: description
                        };


                        button.addEventListener("click", () => {
                            sendPostRequest(postData, button);
                        });
                    }
                }

            })

        } else {
            console.log("parent div navaar not found!");
        }

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
                    var blogOwner =
                        document.getElementsByClassName("module--name")[0]
                        .innerText;
                    var blogTitle =
                        document.querySelectorAll("h1")[0].innerText;
                    var blogText =
                        document
                        .getElementsByClassName(
                            "post-content article-content"
                        )[0]
                        .innerText.substring(0, 300) + "...";
                    url = getSecondPart(url);
                    var button = document.getElementById(elementId);
                    button.setAttribute(
                        "href",
                        "url=" +
                        url +
                        "&origin=" +
                        virgool +
                        "&blog_owner=" +
                        blogOwner +
                        "&blog_title=" +
                        blogTitle +
                        "&blog_text=" +
                        blogText
                    );
                    button.addEventListener("click", () =>
                        call_virgool_share_api(button, token, elementId)
                    );
                } else {
                    addSaveTokenDivToPage();
                }
            });
        }
    } else if (checkUrl(songsara)) {
        console.log(songsara);

        const url = window.location.href; // Get the current page URL
        const match = url.match(/https:\/\/songsara\.net\/(\d{5,8})\//); // Match 6-digit ID

        if (match) {
            const sixDigitId = match[1]; // Extract the 6-digit ID
            console.log("Extracted ID: " + sixDigitId);

            // Find the parent element to insert the button
            const parentElement = document.querySelector('.c-search'); // Adjust selector as needed

            if (parentElement) {
                // Create the button
                const button = document.createElement('button');
                button.textContent = "Send to Server";
                button.className = "send-to-server-button"; // Add a class for styling if needed

                // Append the button after the c-search div
                parentElement.appendChild(button);

                // Define XPath expressions
                const descriptionXPath = '/html/body/div[1]/div[2]/div[2]/div/article/div[1]/div[1]/span[1]/a';
                const titleXPath = '/html/body/div[1]/div[2]/div[2]/div/article/div[1]/div[1]/h2';
                const imageXPath = '/html/body/div[1]/div[2]/div[2]/div/article/div[1]/figure/img';

                // Ensure the document is available
                const doc = document; // Use the global document object

                // Extract description
                const description = extractData(descriptionXPath, doc, XPathResult.STRING_TYPE);
                const title = extractData(titleXPath, doc, XPathResult.STRING_TYPE);

                // Extract image URL and title
                const imageElement = extractData(imageXPath, doc, XPathResult.FIRST_ORDERED_NODE_TYPE);
                const imageUrl = imageElement ? imageElement.getAttribute('src') : '';

                // Define the XPath
                const xpath = '/html/body/div[1]/div[2]/div[2]/div/article/div[3]/div/div/div/ul/li[1]';

                // Evaluate the XPath
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

                // Get the <li> element
                const liElement = result.singleNodeValue;
                var audioUrl = "";
                if (liElement) {
                    // Extract the URL from the data-src attribute
                    audioUrl = liElement.getAttribute('data-src');
                    console.log(audioUrl); // Output: https://dl6.songsara.net/FRE/10/Various Artists - Bossa Lofi (2024) SONGSARA.NET/01 Tranquilo.mp3
                } else {
                    console.log("Element not found!");
                }

                const payload = {
                    origin: songsara,
                    media_id: sixDigitId,
                    image: imageUrl,
                    media_url: audioUrl,
                    link: url,
                    title: title,
                    description: description
                };

                // Add click event listener to the button
                button.addEventListener("click", () => {
                    sendPostRequest(payload, button); // Function to send the request
                });

            } else {
                console.log("Parent element not found!");
            }
        }
    }

};
<?php

header('Access-Control-Allow-Origin: *');

$bot_token = 'bot1967:e7b12e5f-77ed-4c67-8392-200214f9257a';
// parameters from query string
if (isset($_REQUEST['token']))
    if ($_REQUEST['token'] == 'a15sd@fa4s2fdas1dfaA2ss3sd6f') {


        if (isset($_REQUEST['origin']))
            $origin = $_REQUEST['origin'];
        if ($origin == "google.com") {
            // get chat_id

            if (isset($_REQUEST['q']))
                $q = $_REQUEST['q'];
            if ($q) {
                // send message via bot

                $chat_id = 8598940;
                $caption = 'یک جستجوی پیشنهادی که روی اون کلیک کنید';
                $title = 'جستجو: ' . $q;
                $q = preg_replace('/\s+/', '+', $q);
                $link = "https://www.google.com/search?q=" . $q;


                $trends = "https://trends.google.com/trends/explore?date=today%205-y&q=" . $q . "&hl=fa";

                $text = $title . "
        " . $caption . "
        " . $link . "
        
        اثر جستجوی شما در این نمودار مشخص میشه.
        
        " . $trends . "
        
    پس تا جایی که میتونید این پست رو به اشتراک بگذارید
    
    جستجوهاتون رو برای ادمین کانال بفرستید
    @googlekon
        
        ";


                call_eitaa_api($bot_token, $chat_id, $title, $text);

                echo "token ok: q:" . $q;
            } else {
                echo "query empty";
            }
        } else if ($origin == "virgool.io") {

            $chat_id = "8419225";
            if (isset($_REQUEST['url']))
                $url = $_REQUEST['url'];
            if ($url) {
                $text = "یک پست جدید ویرگولی :
                https://vrgl.ir/" . $url;
                $title = $text;
                call_eitaa_api($bot_token, $chat_id, $title, $text);
            }
        }
    } else {
        echo "token not correct";
    }


function call_eitaa_api($bot_token, $chat_id, $title, $text)
{
    // initialise the curl request
    $request = curl_init('https://eitaayar.ir/api/' . $bot_token . '/sendMessage');
    // send a file
    curl_setopt($request, CURLOPT_POST, true);
    curl_setopt($request, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt(
        $request,
        CURLOPT_POSTFIELDS,
        array(
            // 'file' => new \CurlFile(realpath('C:/Users/eitaa/Desktop/eitaa.apk')),
            'chat_id' => $chat_id,
            'title' => $title,
            'pin' => 1,
            'text' => $text,
            'date' => time() + 1, // send next 30 second
        )
    );

    // output the response
    curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
    echo curl_exec($request);

    // close the session
    curl_close($request);
}

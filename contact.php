<?php
header("content-type:application/json");

$response = ["status" => 404];

$topics = [
    "order" => "New order",
    "help"  => "Help requested",
    "question" => "Question asked"
];

$topic = $topics[$_POST["contact_topic"]] . " from munso.no";

$headers = "From: Mundal Software <www-data@munso.no>";

$message = $topic . "\n" . "from: ". $_POST["contact_name"] . " <".$_POST["contact_email"].">" . "\n" . $_POST["contact_message"];

if(mail("thomas@munso.no", $topic, $message, $headers)) {
    $response["status"] = 200;
} else {
    $response["status"] = 500;
    $response["error"] = "Could not send mail";
}

echo json_encode($response);
?>
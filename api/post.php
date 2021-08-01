<?php
require_once("Database.php");
require_once("PokemonTCGApi.php");
require_once("Response.php");

header('Access-Control-Allow-Origin: *');

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

session_start();

//if this is the first time this script is loaded, initialize the session variables
if(!isset($_SESSION['startId'])){
    // $_SESSION['startId'] keeps track of the last id retreived from the previous database query,
    // so if the user requests 100 more cards, (using the same query), we know where to start
    $_SESSION['startId'] = 0;
}
if(!isset($_SESSION['prevDBTask'])){
    // $_SESSION['prevDBTask'] keeps track of the last database retrieval task, 
    // if this is different from the current task, then the $_SESSION['startId'] gets reset to 0
    $_SESSION['prevDBTask'] = "";
}

if($_POST['task'] == "get_cards"){
    $startId = $_SESSION['startId'];
    $prevDBTask = $_SESSION['prevDBTask'];
    if($_POST['filters'] == "none"){
        //the search field was empty

        //Return a max of 100 cards, use php session to keep track of this
    }
    else{
        //the search field had a value
        $searchText = $_POST['search'];
        $searchType = $_POST['searchType'];
    }
}
else if($_POST['task'] == "get_prices"){

}
else if($_POST['task'] == "get_sets"){
    $sets = $pokemonTCGApi->getSets();
    $strippedSets = $pokemonTCGApi->stripSets($sets);
    echo json_encode($strippedSets);
}
else if($_POST['task'] == "add_card"){
    $cardNumber = $_POST['cardNumber'];
    $setId = $_POST['setId'];
    $card = $pokemonTCGApi->getCard($cardNumber, $setId);
    // if getCard returned an error object...
    if(PokemonTCGApi::containsErrorMessage($card)){
        // the card was not retreived
        echo json_encode(new Response(false, $card));
    }
    else{
        // the card was successfully retreived
        echo json_encode(new Response(true, $card));
    }
}

?>
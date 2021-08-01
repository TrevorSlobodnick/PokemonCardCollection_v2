<?php
require_once("Database.php");
require_once("PokemonTCGApi.php");

header('Access-Control-Allow-Origin: *');

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

//$cardToAdd = $pokemonTCGApi->getCard(28, "Shining Legends");

if($_POST['task'] == "get_cards"){
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
    echo json_encode($card);
}

?>
<?php
require_once("Database.php");
require_once("PokemonTCGApi.php");

//header('Access-Control-Allow-Origin: *');

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

//$cardToAdd = $pokemonTCGApi->getCard(28, "Shining Legends");

if($_POST['task'] == "get_cards"){
    if($_POST['filters'] == "none"){
        //the search field was empty

        //Handle which cards to return on the front end
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
    //TODO: add endpoint sets = https://api.pokemontcg.io/v2/sets
    $sets = $pokemonTCGApi->getSets();
    $strippedSets = $pokemonTCGApi->stripSets($sets);
}
else if($_POST['task'] == "add_card"){
    $cardNumber = $_POST['cardNumber'];
    $setName = $_POST['setName'];
}

?>
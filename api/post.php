<?php
require_once("Database.php");
require_once("PokemonCard.php");
require_once("PokemonTCGApi.php");
require_once("Response.php");
require_once("Warnings/NoCardsWarning.php");
require_once("Warnings/AddToDbWarning.php");

header('Access-Control-Allow-Origin: *');

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

session_start();

if($_POST['task'] == "get_cards"){
    //get cards, max 100
    $sql = "SELECT * FROM pokemon_cards;"; //get all cards --temporary
    $cards = $dbc->fetchArray($sql);
    if($cards !== false){
        echo json_encode(new Response(true, $cards));
    }
    else{
        echo json_encode(new Response(false, new NoCardsWarning()));
    }
}
else if($_POST['task'] == "get_prices"){
    //get prices of that card
}
else if($_POST['task'] == "get_sets"){
    $sets = $pokemonTCGApi->getSets(); //get sets from api
    $strippedSets = $pokemonTCGApi->stripSets($sets); //get rid of all the extra BS properties/values
    echo json_encode(new Response(true, $strippedSets)); //output the sets
}
else if($_POST['task'] == "get_card_from_api"){
    $card = $pokemonTCGApi->getCard($_POST["cardId"]);
    echo json_encode(new Response(true, $card));
}
else if($_POST['task'] == "add_card"){
    $info = json_decode($_POST['info']);
    $pokemonCard = PokemonCard::toDatabase($info);
    $status = $pokemonCard->insert();
    if($status){
        echo json_encode(new Response(true, $pokemonCard));
    }
    else{
        echo json_encode(new Response(false, new AddToDbWarning()));
    }
}

?>
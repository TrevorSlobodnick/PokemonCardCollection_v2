<?php
require_once("Database.php");
require_once("PokemonCard.php");
require_once("PokemonTCGApi.php");
require_once("Response.php");

header('Access-Control-Allow-Origin: *');

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

session_start();

// for a new get_cards query...
// run 2 queries when getting cards
//   1. without a limit, then save the amount of results returned to a session variable (this will be the max value)
//   2. with a limit of 100
// if the max value and the second query have the same amount of results...
//   the second query has less than 100 cards, (do not display a load more button)
// if the max value is greater than the second query...
//   the second query has more than 100 cards (display a load button)
//   keep a tally of how many cards have been sent with this query (prevCards), so we know where to start for the next query

// for the same get_cards query...
// use the limit 100 query and set the offset value to the prevCards value
    //Example:
        //The SQL query below says "return only 100 records, start on record 101 (OFFSET 100)":
        //$sql = "SELECT * FROM table LIMIT 100 OFFSET 100";
// get the amount of rows returned and compare it to the max value
// if they are the same...
//   the max amount of cards have been returned for this query, (do not display a load more button)
// if the max value is still greater than the prevCards amount
//   there is still more cards to display (display a load button)
//   add 100 to the prevCards session variable


//if this is the first time this script is loaded, initialize the session variables
if(!isset($_SESSION['prevCards'])){
    // $_SESSION['prevCards'] keeps track of the last id retreived from the previous database query,
    // so if the user requests 100 more cards, (using the same query), we know where to start
    $_SESSION['prevCards'] = 0;
}
if(!isset($_SESSION['prevDBTask'])){
    // $_SESSION['prevDBTask'] keeps track of the last database retrieval task, 
    // if this is different from the current task, then the $_SESSION['prevCards'] gets reset to 0
    $_SESSION['prevDBTask'] = "";
}

if($_POST['task'] == "get_cards"){
    $prevCards = $_SESSION['prevCards'];
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
    // since the api "sets" endpoint is a constant, it wont produce any errors
    // therefor we just have to format the output
    echo json_encode(new Response(true, $strippedSets));
}
else if($_POST['task'] == "add_card"){
    $cardNumber = $_POST['cardNumber'];
    $setId = $_POST['setId'];
    $card = $pokemonTCGApi->getCard($cardNumber, $setId);
    // if getCard returned an error object...
    if(PokemonTCGApi::containsErrorMessage($card)){
        // the card was not retreived, instead $card is an object containing error info
        echo json_encode(new Response(false, $card));
    }
    else{
        // the card was successfully retreived
        // echo json_encode(new Response(true, $card));
        $pokemonCard = new PokemonCard($card, DataSource::API);

        $sql = 'INSERT INTO `' . TABLE_NAME . '` ' . 
                '(card_id, card_number, name, supertype, hp, primary_type, secondary_type, set_id, set_name, set_series, artist, rarity, small_image, large_image, date_added) ' .
                'VALUES ' .
                '(:cardId, :cardNumber, :name, :supertype, :hp, :primary_type, :secondary_type, :set_id, :set_name, :set_series, :artist, :rarity, :small_image, :large_image, NOW())';
        $bindVal = $pokemonCard->getBindVals();
        $status = $dbc->sqlQuery($sql, $bindVal);
        if($status){
            echo json_encode(new Response(true, $pokemonCard));
        }
        else{
            echo json_encode(new Response(false, Warning::AddToDatabaseError));
        }
    }
}

?>
<?php

require_once("config.php");
require_once("PokemonCardSet.php");

/**
 * Class that handles communicating with the api
 * 
 * NOTE: 
 *   if the url contains a query (ends with ?q=) ...
 *       if the query isnt formated correctly an object gets returned with the property "error"
 *          the error prop is an object that has a "message" property and a "code" property
 *       if the query is formatted correctly, an object with properties "data", "page", "pageSize", "count", "totalCount" is returned
 *          the data property is the only one being utilized, and it contains an array of objects matching the query
 *          NOTE: the "data" array can be empty, contain 1 object, or contain many objects
 *   if the url uses ids (sets/<id> or cards/<id>)
 *       the error object is formatted the same
 *       however the "data" property now only contains a single object, the one that matches the id, instead of an array
 */
class PokemonTCGApi{

    //https://stackoverflow.com/a/2107792
    private $options;
    private $context;

    /**
     * Setting the options and context variables for the entire class, 
     * this will be used for sending headers with our requests to the api
     */
    public function __construct(){
        $this->options = [
            "http" => [
                "method" => "GET",
                "ignore_errors" => true,
                "header" => "X-Api-Key: " . POKEMONTCG_API_KEY
            ]
        ];
        $this->context = stream_context_create($this->options);
    }

    /**
    * Checks if an object returned from the pokemontcg api has a "message" property
    * if it does, that means there was an error, and the object contains the error message and code
    * @param Object $obj the api response to check
    * @return Boolean true if there was an error, otherwise return false
    */
    public static function containsErrorMessage($obj){
        if(property_exists($obj, "message")){
            return true;
        }
        return false;
    }

    /**
     * Queries the PokemonTCG Api and gets a pokemon card with the given number and set name and returns data for the card
     * @param Integer $number - the number of the card, the number is located on the bottom left or right, 
     *                            there should be 2 numbers seperated by a slash, its the one before the slash.
     * @param String $setId - the id of the set, the frontend will have access to this info.
     * @return Object the json data for the card, or in the case of an error, an object containing the error message and code
     */
    public function getCard($number, $setId){
        //create the cardId by combining the setId and the card number, seperated by a dash
        $cardId = $setId . "-" . $number;
        //set the query
        $query = "/" . $cardId;
        $url = POKEMONTCG_API_CARD_ENDPOINT . $query;
        $jsonStr = file_get_contents($url, false, $this->context);
        $decodedJson = json_decode($jsonStr);
        if(property_exists($decodedJson, "data")){
            // since we are use cards/<id endpoint>, we are expecting an object from the api that has a data property
            // the data property holds the information we requested, so return that
            return $decodedJson->data;
        }
        else if(property_exists($decodedJson, "error")){
            // there was an error, likely the $number provided was invalid
            // return the error object, which contains the error message and code
            return $decodedJson->error;
        }
        else{
            // unknown error
            return Warning::UnknownError;
        }
    }

    /**
     * Queries the PokemonTCG Api and gets all the card sets, then returns them
     * @return Array an array containing all of the sets
     */
    public function getSets(){
        $url = POKEMONTCG_API_SET_ENDPOINT;
        $jsonStr = file_get_contents($url, false, $this->context);
        $decodedJson = json_decode($jsonStr);
        return $decodedJson->data;
    }

    /**
     * Loops through each set in the given array and gets the id, name, series, and symbol from each card set object, then creates a PokemonCardSet object containing this information
     * @param Array $sets an array of card sets retrieved from the pokemontcg api
     * @return Array an array of PokemonCardSet Objects that only contain the id, name, series, symbol
     */
    public function stripSets($sets){
        $strippedSets = [];
        foreach ($sets as $obj) {
            $id = $obj->id;
            $name = $obj->name;
            $series = $obj->series;
            $symbol = $obj->images->symbol;
            $strippedSets[] = new PokemonCardSet($id, $name, $series, $symbol);
        }
        return $strippedSets;
    }
}

?>
<?php

require_once("config.php");
require_once("PokemonCardSet.php");

/**
 * Class that handles communicating with the api
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
                "header" => "X-Api-Key: " . POKEMONTCG_API_KEY
            ]
        ];
        $this->context = stream_context_create($this->options);
    }

    /**
     * Queries the PokemonTCG Api and gets a pokemon card with the given number and set name and returns data for the card
     * @param Integer $number - the number of the card, the number is located on the bottom left or right, 
     *                            there should be 2 numbers seperated by a slash, its the one before the slash.
     * @param String $setId - the id of the set, the frontend will have access to this info.
     * @return Array the json data for the card, or an empty array if no values
     */
    public function getCard($number, $setId){
        //create the cardId by combining the setId and the card number, seperated by a dash
        $cardId = $setId . "-" . $number;
        //set the query
        $query = "/" . $cardId;
        $url = POKEMONTCG_API_CARD_ENDPOINT . $query;
        $jsonStr = file_get_contents($url, false, $this->context);
        $decodedJson = json_decode($jsonStr);
        return $decodedJson->data;
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
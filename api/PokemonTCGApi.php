<?php

require_once("config.php");
require_once("PokemonCardSet.php");

class PokemonTCGApi{

    //https://stackoverflow.com/a/2107792
    private $options;
    private $context;

    public function __construct(){
        $this->options = [
            "http" => [
                "method" => "GET",
                "header" => "X-Api-Key: " . POKEMONTCG_API_KEY
            ]
        ];
        $this->context = stream_context_create($this->options);
    }

    //TODO: Change set name to set id

    /**
     * Queries the PokemonTCG Api and gets a pokemon card with the given number and set name and returns data for the card
     * @param Integer $number - the number of the card, the number is located on the bottom left or right, 
     *                            there should be 2 numbers seperated by a slash, its the one before the slash.
     * @param String $setId - the id of the set, the frontend will have access to this info.
     * @return Object the json data for the card, or an empty array if no values
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
     * Gets the id, name, series, and symbol from each pokemon card set in the given array
     * @param Array $sets an array of pokemon card sets, gotten from the pokemontcg api
     * @return Array an array of pokemon card sets that only contain the id, name, series, symbol
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
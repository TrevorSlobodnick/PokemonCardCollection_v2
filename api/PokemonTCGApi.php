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
     *                            there should be 2 numbers seperated by a slash, it is the first number before the slash.
     * @param String $setName - the name of the set, the set symbol is located at the bottom left or right, 
     *                            use antoher tool to get image->name.
     * @return Object the json data for the card, or an empty array if no values
     */
    public function getCard($number, $setName){
        //add quotes to start and end of string
        $setName = "\"" . $setName . "\"";
        //replace strings with %20
        $setName = str_replace(" ", "%20", $setName);
        //set the query
        $query = "?q=!number:" . $number . "+set.name:" . $setName;
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

    //TODO: images->symbol NOT ->symbol

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
            $symbol = $obj->symbol;
            $strippedSets[] = new PokemonCardSet($id, $name, $series, $symbol);
        }
        return $strippedSets;
    }
}

?>
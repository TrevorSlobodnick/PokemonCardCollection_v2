<?php

require_once("../config.php");
require_once("PokemonCardSet.php");

/**
 * Class that handles communicating with the Pokemon TCG Api
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
     * Queries the PokemonTCG Api and gets a pokemon card with the given number and set name and returns data for the card
     * @param Integer $cardId - the id of the card to get
     * @return Object the json data for the card, or in the case of an error, an object containing the error message and code
     */
    public function getCard($cardId){
        $url = POKEMONTCG_API_CARD_ENDPOINT . "/" . $cardId;
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
            $listedTotal = $obj->printedTotal;
            $actualTotal = $obj->total;
            $strippedSets[] = new PokemonCardSet($id, $name, $series, $symbol, $listedTotal, $actualTotal);
        }
        return $strippedSets;
    }
}

?>
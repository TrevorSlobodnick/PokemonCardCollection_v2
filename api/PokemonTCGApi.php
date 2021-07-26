<?php

require_once("config.php");

class PokemonTCGApi{

    //https://stackoverflow.com/a/2107792
    private $options = [
        "http" => [
            "method" => "GET",
            "header" => "X-Api-Key: " . POKEMONTCG_API_KEY
        ]
    ];
    private $context = stream_context_create($this->options);

    /**
     * Queries the PokemonTCG Api and looks for a pokemon card with the given number and set name and attempts to return data for the card
     *
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
        $url = $this->endpoint . $query;
        $jsonStr = file_get_contents($url, false, $this->context);
        $decodedJson = json_decode($jsonStr);
        return $decodedJson->data;
    }
}

?>
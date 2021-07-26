<?php

require_once("config.php");

//file_get_contents returns string of data on page
//json_decode this string to get the object
//pass to a new PokemonCard(jsonObj), it will fill all required info
header('X-Api-Key', POKEMONTCG_API_KEY);

$exampleQuery = "?q=set.name:Generations+supertype:Pokemon+!name:\"M%20Venusaur-EX\"";
$exampleRequest = POKEMONTCG_API_ENDPOINT . $exampleQuery;

?>
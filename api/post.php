<?php

require_once("config.php");

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

$pokemonTCGApi->getCard(28, "Shining Legends");


$exampleQuery = "?q=set.name:Generations+supertype:Pokemon+!name:\"M%20Venusaur-EX\"";
$exampleRequest = POKEMONTCG_API_ENDPOINT . $exampleQuery;

?>
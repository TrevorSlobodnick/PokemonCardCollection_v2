<?php

//file_get_contents returns string of data on page
//json_decode this string to get the object
//pass to a new PokemonCard(jsonObj), it will fill all required info
$sampleRequest = "https://api.pokemontcg.io/v2/cards?q=set.name:Generations+supertype:Pokemon+!name:\"M%20Venusaur-EX\""

?>
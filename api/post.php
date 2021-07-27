<?php
require_once("Database.php");
require_once("PokemonTCGApi.php");

//header('Access-Control-Allow-Origin: *');

$dbc = Database::getInstance();
$pokemonTCGApi = new PokemonTCGApi();

$cardToAdd = $pokemonTCGApi->getCard(28, "Shining Legends");

// foreach ($_POST as $key => $value) {
//     echo "Key=" . $key . "&value=" . $value;
// }



?>
<?php 

    header('Access-Control-Allow-Origin: *');

    require_once("../models/PokemonTCGApi.php");
    require_once("../util/Response.php");
    require_once("../util/warnings/InvalidRequestWarning.php");
    
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $pokemonTCGApi = new PokemonTCGApi();
        $sets = $pokemonTCGApi->getSets(); //get sets from api
        $strippedSets = $pokemonTCGApi->stripSets($sets); //get rid of all the extra BS properties/values
        echo json_encode(new Response(true, $strippedSets)); //output the sets
    }
    else{
        echo json_encode(new Response(false, new InvalidRequestWarning()));
    }

?>
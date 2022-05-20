<?php 

    header('Access-Control-Allow-Origin: *');

    require_once("../util/Database.php");
    require_once("../util/Response.php");
    require_once("../util/warnings/NoCardsWarning.php");
    require_once("../util/warnings/InvalidRequestWarning.php");

    $dbc = Database::getInstance();
    
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $sql = "SELECT * FROM pokemon_cards;"; //get all cards --temporary
        $cards = $dbc->fetchArray($sql);
        if($cards !== false){
            echo json_encode(new Response(true, $cards));
        }
        else{
            echo json_encode(new Response(false, new NoCardsWarning()));
        }
    }
    else{
        echo json_encode(new Response(false, new InvalidRequestWarning()));
    }

?>
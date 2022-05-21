<?php 

    header('Access-Control-Allow-Origin: *');

    require_once("../util/Database.php");
    require_once("../util/Response.php");
    require_once("../models/PokemonCard.php");
    require_once("../models/PokemonTCGApi.php");
    require_once("../util/warnings/AddToDatabaseWarning.php");
    require_once("../util/warnings/NoCardsWarning.php");
    require_once("../util/warnings/InvalidRequestWarning.php");

    $dbc = Database::getInstance();

    /**
     * Takes in an object and uses it to create a PokemonCard that is then inserted into the database
     *
     * @param Object $info - an object containing all the required properties for creating a Pokemon Card
     * @return void
     */
    function addCardToDatabase($info){
        // $info = json_decode($_POST['info']);
        $pokemonCard = PokemonCard::fromObject($info);
        $status = $pokemonCard->insert();
        if($status){
            echo json_encode(new Response(true, $pokemonCard));
        }
        else{
            echo json_encode(new Response(false, new AddToDatabaseWarning()));
        }
    }
    
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        if(isset($_GET["id"]) && isset($_GET["location"])){
            if($_GET["location"] === "api"){
                $pokemonTCGApi = new PokemonTCGApi();
                $card = $pokemonTCGApi->getCard($_GET["id"]);
                echo json_encode(new Response(true, $card));
            }
            else{
                echo json_encode(new Response(false, new InvalidRequestWarning()));
            }
        }
        else{
            $sql = "SELECT * FROM pokemon_cards;"; //get all cards --temporary
            $cards = $dbc->fetchArray($sql);
            if($cards !== false){
                echo json_encode(new Response(true, $cards));
            }
            else{
                echo json_encode(new Response(false, new NoCardsWarning()));
            }
        }
    }
    elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
        session_start();
        if(isset($_SESSION["user"])){
            //first we check post array for data
            if(count($_POST) == 1){
                //a single object was posted...
                try{
                    //pass in the last (and only) property in the post array
                    addCardToDatabase(end($_POST));
                }
                catch(Exception $e){
                    echo json_encode(new Response(false, new InvalidRequestWarning()));
                }
            }
            elseif(count($_POST) > 1){
                //all of the properties of the object were posted...
                try{
                    //typecast post array to an object
                    $object = (object) $_POST;
                    //now we can use that object
                    addCardToDatabase($object);
                }
                catch(Exception $e){
                    echo json_encode(new Response(false, new InvalidRequestWarning()));
                }
            }
            //Now we check if the user sent in JSON data, since the post array was empty...
            else{
                $json = file_get_contents('php://input');
                //populate the $_POST array wiht the json input
                $_POST = json_decode($json);
                //check again if there is 1 property or more
                if(count($_POST) == 1){
                    //a single object was posted...
                    try{
                        //pass in the last (and only) property in the post array
                        addCardToDatabase(end($_POST));
                    }
                    catch(Exception $e){
                        echo json_encode(new Response(false, new InvalidRequestWarning()));
                    }
                }
                elseif(count($_POST) > 1){
                    //all of the properties of the object were posted...
                    try{
                        //typecast post array to an object
                        $object = (object) $_POST;
                        //now we can use that object
                        addCardToDatabase($object);
                    }
                    catch(Exception $e){
                        echo json_encode(new Response(false, new InvalidRequestWarning()));
                    }
                }
                else{
                    echo json_encode(new Response(false, new InvalidRequestWarning()));
                }
            }
        }
        else{
            echo json_encode(new Response(false, new InvalidRequestWarning()));
        }
    }
    else{
        echo json_encode(new Response(false, new InvalidRequestWarning()));
    }

?>
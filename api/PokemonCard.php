<?php 

require_once("config.php");
require_once("Database.php");

/**
 * A class that represents the pokemon card data that is stored in the database
 */
class PokemonCard{
    public $id;
    public $card_id;
    public $card_number;
    public $name;
    public $supertype;
    public $hp;
    public $types; //array stored as json string
    public $set_name;
    public $set_series;
    public $artist;
    public $rarity; //array stored as json string
    public $small_image;
    public $large_image;
    public $date_added;

    public function __construct($obj){
        //set the date string
        $dateTimeStr = strtotime($obj["date_added"]);
        //set class variables
        $this->card_id = $obj["card_id"];
        $this->card_number = $obj["card_number"];
        $this->name = $obj["name"];
        $this->supertype = $obj["supertype"];
        $this->hp = $obj["hp"];
        $this->types = $obj["types"];
        $this->set_name = $obj["set_name"];
        $this->set_series = $obj["set_series"];
        $this->artist = $obj["artist"];
        $this->rarity = $obj["rarity"];
        $this->small_image = $obj["small_image"];
        $this->large_image = $obj["large_image"];
        //date_added is read only
        $this->date_added = date("Y-m-d H:i:s", $dateTimeStr); //MySQL datetime format is Y-m-d H:i:s
    }

    /**
     * Gets the values for the placeholders in the PDO sql insert query
     * @return Array Associative array of the values needed to insert a card into the database
     */
    public function getBindVals(){
        $bindVals = [];
        foreach(get_object_vars($this) as $key => $val){
            if($key != "date_added"){
                $bindVals[$key] = $val;
            }
        }
        return $bindVals;
    }

    public function create(){

    }

    public function update(){
        
    }

    public function delete(){
        
    }
}

?>
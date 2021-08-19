<?php 

require_once("config.php");

class PokemonCard{
    //NOTE: these properties are all the exact same ones in the database, the api is slightly different
    public $id;
    public $card_id;
    public $card_number;
    public $name;
    public $supertype;
    public $hp;
    public $primary_type;
    public $secondary_type;
    public $set_id;
    public $set_name;
    public $set_series;
    public $artist;
    public $rarity;
    public $small_image;
    public $large_image;
    public $date_added;

    public function __construct($dataObj, $dataSource){
        // If the dataObj is from the API...
        if($dataSource == DataSource::API){
            $this->card_id = $dataObj->id;
            $this->card_number = $dataObj->number;
            $this->name = $dataObj->name;
            $this->supertype = $dataObj->supertype;
            $this->hp = $dataObj->hp;
            $this->primary_type = $dataObj->types[0]; //pokemon must have at least one type
            // second type is optional, check for it
            if(count($dataObj->types) == 2){
                //if it has a second type, set it
                $this->secondary_type = $dataObj->types[1];
            }
            else{
                //otherwise set second type to empty string
                $this->secondary_type = "";
            }
            $this->set_id = $dataObj->set->id;
            $this->set_name = $dataObj->set->name;
            $this->set_series = $dataObj->set->series;
            $this->artist = $dataObj->artist;
            $this->rarity = $dataObj->rarity;
            $this->small_image = $dataObj->images->small;
            $this->large_image = $dataObj->images->large;
        }
        // If the dataObj is from the Database...
        else if($dataSource == DataSource::DATABASE){
            $this->card_id = $dataObj["card_id"];
            $this->card_number = $dataObj["card_number"];
            $this->name = $dataObj["name"];
            $this->supertype = $dataObj["supertype"];
            $this->hp = $dataObj["hp"];
            $this->primary_type = $dataObj["primary_type"];
            $this->secondary_type = $dataObj["secondary_type"];
            $this->set_id = $dataObj["set_id"];
            $this->set_name = $dataObj["set_name"];
            $this->set_series = $dataObj["set_series"];
            $this->artist = $dataObj["artist"];
            $this->rarity = $dataObj["rarity"];
            $this->small_image = $dataObj["small_image"];
            $this->large_image = $dataObj["large_image"];
            $dateTimeStr = strtotime($dataObj["date_added"]);
            $this->date_added = date("Y-m-d H:i:s", $dateTimeStr); //MySQL datetime format is Y-m-d H:i:s
        }
    }

    public function getBindVals(){
        return [
            "cardId" => $this->card_id,
            "cardNumber" => $this->card_number,
            "name" => $this->name,
            "supertype" => $this->supertype,
            "hp" => $this->hp,
            "primary_type" => $this->primary_type,
            "secondary_type" => $this->secondary_type,
            "set_id" => $this->set_id,
            "set_name" => $this->set_name,
            "set_series" => $this->set_series,
            "artist" => $this->artist,
            "rarity" => $this->rarity,
            "small_image" => $this->small_image,
            "large_image" => $this->large_image
        ];
    }
}

?>
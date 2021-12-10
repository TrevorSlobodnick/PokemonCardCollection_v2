<?php 

require_once("config.php");
require_once("Database.php");

/**
 * A class that represents a Pokemon Card. Before passing in an object to make a new PokemonCard,
 * run the object through the most appriopriate format (static) function.
 */
class PokemonCard{
    public $id;
    public $table_name;
    public $details_id;
    public $card_id;
    public $card_number;
    public $name;
    public $supertype;
    public $hp;
    public $types; //array stored as json
    public $set_name;
    public $set_series;
    public $artist;
    public $rarity; //array stored as json string
    public $small_image;
    public $large_image;
    public $date_added;

    public function __construct($card){
        $properties = get_class_vars(get_class($this));

        foreach($properties as $prop){
            if($card->$prop != null){
                if($prop == "date_added"){
                    //set the date string
                    $dateTimeStr = strtotime($card["date_added"]);
                    $this->$prop = date("Y-m-d H:i:s", $dateTimeStr); //MySQL datetime format is Y-m-d H:i:s
                }
                else{
                    $this->$prop = $card->prop;
                }
            }
        }

        if($card->lang != null && $card->isPromo != null){
            $this->table_name = $this->determineTableName($card->lang, $card->isPromo);
        }
    }

    private function determineTableName($lang, $isPromo){
        if($lang == "en" && $isPromo == false){
            return TableNames::DETAILS_EN;
        }
        return TableNames::DETAILS_EN; //this will be implemented differently in the future when different languages are supported
    }

    private function determineRarity($rarity){
        $updatedRarities = [];

        //Check for Secret Rare

        //Check for Ultra Rare
        foreach(ULTRA_RARE_CHECKLIST as $type){
            if(strstr($rarity, $type) != false){
                $updatedRarities[] = trim($type);
                $updatedRarities[] = "Ultra Rare";
                return $updatedRarities;
            }
        }

        //Check for other rarities, we also need to check if specialAppearance has a value, if so, add it on as well
        if(strstr($rarity, " Holo ") != false){
            str_replace(" Holo ", ",", $rarity);
            $updatedRarities = explode(",", $rarity);
        }
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
<?php 

require_once("config.php");
require_once("Database.php");

/**
 * A class that represents a Pokemon Card. Use the appropriate static methods to create the card
 */
class PokemonCard{

    //class variables
    public $artist, $hp, $card_id, $name, $card_number, $supertype, $types, $small_image, $large_image, $grade, $grade_company, $rarity, $tags, $set_id, $set_name, $set_series;

    private function __construct(){}
    
    public static function toDatabase($data){
        //create an empty PokemonCard
        $dbObj = new self();
        //add the basic information collected from the api and user
        $dbObj->artist = $data->artist;
        $dbObj->hp = $data->hp;
        $dbObj->card_id = $data->card_id;
        $dbObj->name = $data->name;
        $dbObj->card_number = $data->card_number;
        $dbObj->supertype = $data->supertype;
        $dbObj->types = $data->types;
        //add image links
        $dbObj->small_image = $data->small_image;
        $dbObj->large_image = $data->large_image;
        //add the grades
        $dbObj->grade = $data->grade;
        $dbObj->grade_company = $data->grade_company;
        //handle getting the tags and the actual rarity...
        $dbObj->rarity = self::getActualRarity($data->rarity);
        $dbObj->tags = self::getTags($data->special_appearance, $data->subtypes, $data->name, $data->rarity);
        //add set information
        $dbObj->set_id = $data->set_id;
        $dbObj->set_name = $data->set_name;
        $dbObj->set_series = $data->set_series;
        //add the other card information
        $dbObj->is_promo = $data->is_promo;
        $dbObj->language_code = $data->language_code;
        //finally, return the PokemonCard
        return $dbObj;
    }

    /**
     * Gets the bindVals for an sql query
     *
     * @param Array $arr - an array that contains the names of the PokemonCard class variables that are used in the query
     * @return Array the bindVals for the sql query
     */
    public function getBindVals($keys){
        $bindVals = [];
        //loop through the keys array and add any class variables that match the $key variable to the $bindVals array
        foreach ($keys as $key) {
            if($key === "types" || $key === "tags"){
                $bindVals[$key] = json_encode($this->$key);
            }
            else{
                $bindVals[$key] = $this->$key;
            }
        }
        return $bindVals;
    }

    /**
     * getTags is used to get the tags for a card given some information.
     *
     * @param string $appearance - the card variant, if any ("", "Holo", "Reverse Holo")
     * @param array $subtypes - the card subtypes (from the api)
     * @param string $name - the name on the card
     * @param string $rarity - the card rarity (from the api)
     * @return array - an array containing the tags for that card
     */
    private static function getTags($appearance, $subtypes, $name, $rarity){
        $tags = [];
        if($appearance != ""){
            //appearance is either holo or reverse holo
            $tags[] = $appearance;
        }
        if(count($subtypes) > 0){
            for ($i=0; $i < count($subtypes); $i++) { 
                //this will get all subtypes and add them to tags
                if($subtypes[$i] == "EX"){
                    if(str_ends_with($name, "ex")){
                        $tags[] = "ex";
                    }
                    else if(str_ends_with($name, "EX")){
                        $tags[] = "EX";
                    }
                }
                else{
                    $tags[] = $subtypes[$i];
                }
            }
        }
        //The above checks cover most cases, but there are still a few 'tags' that would be skipped, 
        //so we have to manually add those...
        $lowerRarity = strtolower($rarity);
        if($lowerRarity == "rare ace"){
            $tags[] = "ACE";
        }
        else if($lowerRarity == "rare break"){
            $tags[] = "BREAK";
        }
        else if($lowerRarity == "rare holo lv.x"){
            $tags[] = "LV.X";
        }
        else if($lowerRarity == "rare holo star"){
            $tags[] = "Star";
        }
        else if($lowerRarity == "rare prime"){
            $tags[] = "Prime";
        }
        else if($lowerRarity == "rare rainbow"){
            $tags[] = "Rainbow";
        }
        else if($lowerRarity == "rare shining"){
            $tags[] = "Shining";
        }
        else if($lowerRarity == "rare shiny"){
            $tags[] = "Shiny";
        }
        else if($lowerRarity == "rare shiny gx"){
            $tags[] = "Shiny";
            $tags[] = "GX";
        }
        return $tags;
    }

    /**
     * getActualRarity is used to determine which class of rarity the card
     * actually falls in, since the api does a terrible job
     *
     * @param string $rarity - the rarity of the card (from the api)
     * @return string - the actual rarity of the card
     */
    private static function getActualRarity($rarity){
        $lowerRarity = strtolower($rarity);
        //I checked each rarity on the pokemontcg api guru site and came up with this list - Dec 26, 2021
        if($lowerRarity == "rare secret" || $lowerRarity == "rare rainbow"){
            return "Secret Rare";
        }
        else if(   $lowerRarity == "rare break" 
                || $lowerRarity == "rare holo gx" 
                || $lowerRarity == "rare holo v" 
                || $lowerRarity == "rare holo vmax" 
                || $lowerRarity == "rare shiny gx" 
                || $lowerRarity == "rare ultra"
        ){
            return "Ultra Rare";
        }
        else if(   $lowerRarity == "legend"
                || $lowerRarity == "rare ace"
                || $lowerRarity == "rare holo"
                || $lowerRarity == "rare holo ex"
                || $lowerRarity == "rare holo lv.x"
                || $lowerRarity == "rare holo star"
                || $lowerRarity == "rare prime"
                || $lowerRarity == "rare prism star"
        ){
            return "Rare";
        }
        else{
            return $rarity;
        }
    }

    /**
     * Insert the current pokemon card into the database
     */
    public function insert(){
        $dbc = Database::getInstance();
        $keys = ["card_id", "card_number", "name", "supertype", "types", "artist", "hp", "rarity", "tags", "small_image", "large_image", "grade", "grade_company", "set_id", "set_name", "set_series", "is_promo", "language_code"];
        $sql = 'INSERT INTO pokemon_cards ' . 
                '(card_id, card_number, name, supertype, types, artist, hp, rarity, tags, small_image, large_image, grade, grade_company, set_id, set_name, set_series, is_promo, language_code) ' .
                'VALUES ' .
                '(:card_id, :card_number, :name, :supertype, :types, :artist, :hp, :rarity, :tags, :small_image, :large_image, :grade, :grade_company, :set_id, :set_name, :set_series, :is_promo, :language_code)';
        $bindVals = $this->getBindVals($keys);
        $status = $dbc->sqlQuery($sql, $bindVals);
        return $status;
    }
}

?>
<?php 

class PokemonCard{
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

    public function __construct($apiObj)
    {
        //id is added automatically when the card is added to the database, the id property is in this class so we can load the database rows directly into this class
        $this->card_id = $apiObj->id;
        $this->card_number = $apiObj->number;
        $this->name = $apiObj->name;
        $this->supertype = $apiObj->supertype;
        $this->hp = $apiObj->hp;
        $this->primary_type = $apiObj->types[0]; //pokemon must have at least one type
        // second type is optional, check for it
        if(count($apiObj->types) == 2){
            //if it has a second type, set it
            $this->secondary_type = $apiObj->types[1];
        }
        else{
            //otherwise set to empty string
            $this->secondary_type = "";
        }
        $this->set_id = $apiObj->set->id;
        $this->set_name = $apiObj->set->name;
        $this->set_series = $apiObj->set->series;
        $this->artist = $apiObj->artist;
        $this->rarity = $apiObj->rarity;
        $this->small_image = $apiObj->images->small;
        $this->large_image = $apiObj->images->large;
        $this->date_added = date("Y-m-d H:i:s");
    }
}

?>
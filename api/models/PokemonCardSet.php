<?php 
    /**
     * Contains basic information for a pokemon card set
     */
    class PokemonCardSet{
        public $id;
        public $name;
        public $series;
        public $symbol;
        public $totalCardsListed;
        public $totalCards;
    
        public function __construct($id, $name, $series, $symbol, $totalCardsListed, $totalCards){
            $this->id = $id;
            $this->name = $name;
            $this->series = $series;
            $this->symbol = $symbol;
            $this->totalCardsListed = $totalCardsListed;
            $this->totalCards = $totalCards;
        }
    }
?>
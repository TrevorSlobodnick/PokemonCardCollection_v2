<?php 
    /**
     * Contains basic set information for a pokemon card set, including:
     * id, name, series, symbol
     */
    class PokemonCardSet{
        public $id;
        public $name;
        public $series;
        public $symbol;
    
        public function __construct($id, $name, $series, $symbol){
            $this->id = $id;
            $this->name = $name;
            $this->series = $series;
            $this->symbol = $symbol;
        }
    }
?>
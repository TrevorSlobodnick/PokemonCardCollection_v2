<?php

    require_once("config.php");

    /**
     * Class that contains the database connection as well as other helper functions to make communication easier
     */
    class Database{
        private static $instance;
        private $conn;

        /**
        * Create new connection to Database
        */
        private function __construct(){
            $this->conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME , DB_USER , DB_PASSWORD);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        /**
        * Remove current connection to Database
        */
        public function __destruct(){
            $this->connection = null;
        }

        /**
         * Get the current instance of the this class, if one has not yet been created, create one and return it
         * @return Database the current database instance
         */
        public static function getInstance(){
            if (!self::$instance){
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Get the PDO (database connection) object
         * @return PDO the connection to the database
         */
        public function getConnection(){
            return $this->conn;
        }

        /**
         * Execute an SQL Query
         * @param String $sql the sql query to run
         * @param Array $bindVal an associative array containg the values for all placeholders in the query [placeholder => value]
         * @param Boolean $returnStatement true if the PDOStatement should be returned, false if the status of the query should be returned (true = success, false = failure)
         * @return Boolean|PDOStatement if $returnStatement is true, this function will return the PDOStatement, otherwise it will return false if the query failed and true if it succeeded
         */
        public function sqlQuery($sql, $bindVal = null, $returnStatement = false){
            $statement = $this->conn->prepare($sql);
            if (is_array($bindVal)){
                $result = $statement->execute($bindVal);
            }
            else{
                $result = $statement->execute();
            }
            if ($returnStatement){
                return $statement;
            }
            return $result;
        }


        /**
         * Execute an SQL Query and return an associative array
         * @param String $sql the sql query to run
         * @param Array $bindVal an associative array containg the values for all placeholders in the query [placeholder => value]
         * @return Array|Boolean false if fails, otherwise returns an array containing the results from the query
         */
        public function fetchArray($sql, $bindVal = null){
            $result = $this->sqlQuery($sql, $bindVal, true);
            if ($result->rowCount() == 0) {
                return false;
            }
            else{
                return $result->fetchAll(PDO::FETCH_ASSOC);
            }
        }

        /**
         * Execute an SQL Query and return the first value that matches
         * @param String $sql - The sql query to run
         * @param Array $bindVal - an associative array containg the values for all placeholders in the query [placeholder => value]
         * @return Array|Boolean false if fails, otherwise returns an array of the results of the the query
         */
        public function fetch($sql, $bindVal = null){
            $result = $this->sqlQuery($sql, $bindVal, true);
            if ($result->rowCount() == 0) {
                return false;
            }
            else{
                return $result->fetch(PDO::FETCH_ASSOC);
            }
        }

        /** 
         * Returns the last inserted id
         * @return String the last inserted ID
        */
        public function getLastInsertedId(){
            return $this->getConnection()->lastInsertId();
        }
    }

?>
import axios from "axios"

export class Backend{
    static async getCards(filters = "none", search = "", searchType = ""){
        const cards = await this.post({
            "task" : "get_cards",
            "filters" : filters,
            "search" : search,
            "searchType" : searchType
        })
        return cards
    }

    static async getPrices(){

    }

    static async getCardFromApi(cardId){
        const card = await this.post({
            "task": "get_card_from_api",
            "cardId": cardId
        })
        return card
    }

    static async addCard(card){
        const cardAdded = await this.post({
            "task" : "add_card",
            "card": card
        })
        return cardAdded
    }

    static async getSets(){
        //getSets will never return an error because the endpoint is a constant
        const sets = await this.post({
            "task" : "get_sets"
        })
        return sets
    }

    /**
     * Send a post request to the backend
     * @param {Object} info The object that contains the data to send to the backend, 
     *                      the object must contain a "task" property with an acceptable value
     */
     static async post(info){
        const result = await axios({
            method: 'post',
            url: 'https://www.tslobodnick.ca/PokemonCardCollection/v2/api/post.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams(info)
        })
        return result.data
    }
}
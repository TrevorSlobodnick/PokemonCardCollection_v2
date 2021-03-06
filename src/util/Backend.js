import axios from "axios"
import { ENDPOINTS } from "./Constants"
import { CardLocations } from "./CardLocations"

export class Backend{

    /**
     * Custom axios instance
     */
    static ax = axios.create({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    /**
     * Get all cards from database
     * @returns {Object} Response object
     */
    static async getCards(){
        const result = await this.ax.get(ENDPOINTS.cards)
        return result.data
    }

    /**
     * Get a card from one of the potention CardLocations
     * @param {string} id if the location is api, this will be the card id, otherwise it will be the database id
     * @param {CardLocations} location A CardLocation
     * @returns {Object} Response object
     */
    static async getCard(id, location = CardLocations.database){
        let result;
        //typecheck to make sure the location provided is a property in the CardLocation class
        if(Object.keys(CardLocations).includes(location)){
            result = await this.ax.get(ENDPOINTS.cards, {
                params: {
                    location: location,
                    id: id
                }
            });
        }
        else{
            let message = "\"location\" must be one of the following:";
            for (const loc in this.LOCATIONS) {
                message += "\n\"" + loc + "\"";
            }
            throw new TypeError(message);
        }
        return result.data
    }

    /**
     * Add a card to the database
     * @param {Object} info the card to add
     * @returns {Object} Response object
     */
    static async addCard(info){
        const card = new URLSearchParams(info);
        const result = await this.ax.post(ENDPOINTS.cards, card);
        return result.data;
    }

    /**
     * Update a card in the database
     * @param {Object} info the new card details
     * @returns {Object} Response object
     */
    static async updateCard(info){
        const result = await this.ax.put(ENDPOINTS.cards, new URLSearchParams(info))
        return result.data
    }

    /**
     * Delete a card from the database
     * @param {string} id id of the card to delete
     * @returns {Object} Response object
     */
    static async deleteCard(id){
        const result = await this.ax.delete(ENDPOINTS.cards, new URLSearchParams({id: id}))
        return result.data
    }

    /**
     * Get all card sets
     * @returns {Object} Response object
     */
    static async getSets(){
        const result = await this.ax.get(ENDPOINTS.sets)
        return result.data
    }

    /**
     * Check if the user is authenticated
     * @returns {Object} Response object
     */
    static async checkAuth(){
        const result = await this.ax.get(ENDPOINTS.login)
        return result.data;
    }

    /**
     * Use the given credentials to try to login
     * @param {string} email the email to use for login
     * @param {string} password the password to use for login
     * @returns {Object} Response object
     */
    static async login(email, password){
        const info = {
            email: email,
            password: password
        }
        const loginInfo = new URLSearchParams(info);
        const result = await this.ax.post(ENDPOINTS.login, loginInfo);
        return result.data;
    }

    /**
     * Use the given credentials to try to register a new user
     * @param {string} email the email to register
     * @param {string} password the password to register
     * @returns {Object} Response object
     */
    static async register(email, password){
        const info = {
            email: email,
            password: password
        }
        const registerInfo = new URLSearchParams(info);
        const result = await this.ax.post(ENDPOINTS.register, registerInfo);
        return result.data;
    }

    /**
     * Logout the currently signed in user
     * @returns {Object} Response object
     */
    static async logout(){
        const result = await this.ax.get(ENDPOINTS.logout);
        return result.data;
    }
}
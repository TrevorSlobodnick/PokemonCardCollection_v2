import qs from "query-string";
import { useLocation } from "react-router";
import { useEffect, useState } from 'react';
import { VALID_SORT_VALUES, VALID_SEARCHTYPE_VALUES } from "../util/Constants.js"
import { useHistory } from "react-router-dom";
import axios from "axios";

const HomePage = ( props ) => {

    const searchQuery = qs.parse(useLocation().search)
    const history = useHistory()
    let updateUrl = false

    /**
     * Gets a value for a given key from the url search query,
     * or returns the default for value for the key if a value is invalid or not provided
     * @param {String} key the value to get from the url search query
     * @returns {string} the value given with the key, or a default value if no value was given, or the value was invalid
     */
    const getValFromQuery = (key) => {
        if(key === "sort"){
            //must check for null first
            if(searchQuery.sort == null){
                updateUrl = true // update the url to include all required key/value pairs
                return "rarity" //default
            }
            else if(VALID_SORT_VALUES.includes(searchQuery.sort)){
                return searchQuery.sort
            }
            else{
                return "rarity" //default
            }
        }
        else if(key === "search"){
            //must check for null first
            if(searchQuery.search == null){
                updateUrl = true // update the url to include all required key/value pairs
                return "" //default
            }
            else{
                return searchQuery.search
            }
        }
        else if(key === "searchType"){
            //must check for null first
            if(searchQuery.searchType == null){
                updateUrl = true // update the url to include all required key/value pairs
                return "name" //default
            }
            else if(VALID_SEARCHTYPE_VALUES.includes(searchQuery.searchType)){
                return searchQuery.searchType
            }
            else{
                return "name" //default
            }
        }
    }

    const initSortVal = getValFromQuery("sort")
    const initSearchVal = getValFromQuery("search")
    const initSearchTypeVal = getValFromQuery("searchType")

    //This causes a warning if not wrapped in useEffect, this is because we would be reloading the page (history.replace) even though the component hasnt rendered yet
    useEffect(() => {
        // if the url needs to be updated...
        // meaning, one or more key/value pairs were missing from the url search query, in order to create a sharable link, all key/value pairs are required to be in the url
        if(updateUrl){ 
            console.log("replacing...");
            //change url using react, many people noted this will sometimes reload the page, which isnt a big issue
            history.replace("/?sort=" + initSortVal + "&search=" + initSearchVal + "&searchType=" + initSearchTypeVal)
            //change url using browser history api, since it does not necessarily communicate with react, I will be using the react method since this is a react project
            //window.history.replaceState(null, "Bob", "/?sort=" + initSortVal + "&search=" + initSearchVal + "&searchType=" + initSearchTypeVal)
        }
    })

    // set the initial state using init variables above, which will set the value if the url contains one and it is valid,
    // otherwise, it will use the default value
    //  NOTE: I used init variables over the inline function because if I used the function inline it would get called like an async function,
    //       since I need to update the url if values are missing, I need to know this info at the start, which is why the 
    //       functions are not used inline and are instead stored in the init variables
    const [sort, setSort] = useState(initSortVal)
    const [search, setSearch] = useState(initSearchVal)
    const [searchType, setSearchType] = useState(initSearchTypeVal)

    /**
     * - Set the sort state to the current value of the sort drop down box,
     * - update the home path,
     * - then sort the collection
     * @param {Event} e 
     */
    const onSortValueChanged = (e) => {
        console.log(e.target.value)
        setSort(e.target.value)
        updateHomePath(e.target.value, search, searchType)
        sortCollection()
    }

    /**
     * set the search state to the current value of the search input field
     * @param {Event} e 
     */
    const onSearchValueChanged = (e) => {
        setSearch(e.target.value)
    }

    /**
     * set the searchType state to the current value of the searchType drop down box
     * @param {Event} e 
     */
    const onSearchTypeValueChanged = (e) => {
        setSearchType(e.target.value)
        updateHomePath(sort, search, e.target.value)
    }

    /**
     * Called when the user clicks any key down in the search field,
     * however it only handles when the user presses the enter key
     * - prevents the page from reloading/refreshing itself
     * - - searchs the collection for anything that matches the given criteria and displays it
     * @param {KeyboardEvent} e 
     */
    const onKeyDown = (e) => {
        // only handle event if enter key was pressed
        if(e.key === 'Enter'){
            e.preventDefault() //prevents page reload
            console.log("Enter key pressed");
            updateHomePath(sort, search, searchType)
            searchCollection()
        }
    }

    /**
     * Called when the search icon is clicked
     * - prevents the page from reloading/refreshing itself
     * - searchs the collection for anything that matches the given criteria and displays it
     * @param {MouseEvent} e the event object
     */
    const onSubmit = (e) => {
        e.preventDefault() //stops page reload
        console.log("Search Icon Clicked");
        updateHomePath(sort, search, searchType)
        let info = { 
            "KEY" : "VALUE!",
            "search" : "Wat",
            "searchType" : "set"
         }
        axios({
            method: 'post',
            url: 'https://www.tslobodnick.ca/Test/post.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams(info)
        }).then(result => {
            console.log(result)
        })
        searchCollection()
    }

    /**
     * Filters the cards to match the sort criteria
     */
    const sortCollection = () => {
        console.log("Sort Complete!")
    }

    /**
     * Filters the cards to only show the ones that pass the search criteria
     */
    const searchCollection = () => {
        console.log("Search Complete");
    }

    //HELPER FUNCTIONS
    /**
     * 
     * @param {String} sortVal The current value of sort, from the form
     * @param {String} searchVal The current value of search, from the form
     * @param {String} searchTypeVal The current value of searchType, from the form
     */
    const updateHomePath = (sortVal, searchVal, searchTypeVal) => {
        console.log("Old: " + props.homePath)
        const newPath = "/?sort=" + sortVal + "&search=" + searchVal + "&searchType=" + searchTypeVal
        props.setHomePath(newPath)
        history.replace(newPath)
        console.log("New: " + newPath)
    }

    return (
        <form>
            <select onChange={onSortValueChanged} name="sort" defaultValue={sort}>
                <option value="rarity">Rarity</option>
                <option value="alpha">A-Z</option>
                <option value="price">Price</option>
                <option value="set">Set</option>
                <option value="newold">New &#8594; Old</option>
                <option value="oldnew">Old &#8594; New</option>
            </select>
            <input type="text" name="search" onChange={onSearchValueChanged} onKeyDown={onKeyDown} defaultValue={search} />
            <select onChange={onSearchTypeValueChanged} name="searchType" defaultValue={searchType}>
                <option value="name">Name</option>
                <option value="set">Set</option>
            </select>
            <input type="image" name="submit" onClick={onSubmit} src="" alt="Go!" border="0" />
        </form>
    )
}

export default HomePage

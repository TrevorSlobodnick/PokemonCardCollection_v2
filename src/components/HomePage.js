import qs from "query-string"
import { useLocation } from "react-router"
import React, { useEffect, useState } from 'react'
import { VALID_SORT_VALUES, VALID_SEARCHTYPE_VALUES, SORT_OPTIONS, SEARCH_TYPE_OPTIONS } from "../util/Constants.js"
import { useHistory } from "react-router-dom"
import Select from "react-select"
import SearchImg from "../images/search.svg"
import { Backend } from "../util/Backend.js"

const HomePage = ( props ) => {

    //TODO: implement URL filtering/sorting

    const [searchQuery, setSearchQuery] = useState(qs.parse(useLocation().search))
    const history = useHistory()
    const [updateUrl, setUpdateUrl] = useState(false)
    const [fetchCards, setFetchCards] = useState(true)
    const [cards, setCards] = useState([])

    const [sort, setSort] = useState("rarity")
    const [search, setSearch] = useState("")
    const [searchType, setSearchType] = useState("name")

    useEffect(() => {
        //history.replace("/?sort=search=searchType=")
        if(fetchCards === true){
            Backend.getCards().then(response => {
                console.log(response);
                if(response.completed){
                    setCards(response.data)
                }
                else if(response.data.code != null){
                    //we got a warning...
                    //in this case, its because there are no cards in the set
                    setCards([]);
                }
                else{
                    //unknown error occurred
                    console.log(response.data);
                }
            });
            setFetchCards(false)
        }
    }, [])

    /**
     * updates the homePath variable/state and also updates the url to show the current search query
     * @param {String} sortVal The current value of sort, from the form
     * @param {String} searchVal The current value of search, from the form
     * @param {String} searchTypeVal The current value of searchType, from the form
     */
    const updateHomePath = (sortVal, searchVal, searchTypeVal) => {
        console.log("Old: " + props.homePath)
        const newPath = "/?sort=" + sortVal + "&search=" + searchVal + "&searchType=" + searchTypeVal
        props.setHomePath(newPath)
        //update url
        history.replace(newPath)
        console.log("New: " + newPath)
    }

    /**
     * Filters the cards to match the sort criteria
     */
    const sortCollection = () => {
        console.log("Sort Complete!")
    }

    /**
     * Filters the cards to only show the ones that pass the search criteria
     * @param {Object} postObj the info object to pass to the post function
     */
    const searchCollection = (postObj) => {
        console.log("Search Complete");
    }

    /**
     * - Set the sort state to the current value of the sort drop down box,
     * - update the home path,
     * - then sort the collection
     */
    const onSortValueChanged = (valueType, actionType) => {
        if(actionType.action === "select-option"){
            setSort(valueType.value)
            updateHomePath(valueType.value, search, searchType)
            sortCollection()
        }
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
     */
    const onSearchTypeValueChanged = (valueType, actionType) => {
        if(actionType.action === "select-option"){
            setSearchType(valueType.value)
            updateHomePath(sort, search, valueType.value)
        }
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
        let info
        if(search === ""){
            info = { 
                "task" : "get_cards",
                "filters" : "none"
            }
        }
        else{
            info = { 
                "task" : "get_cards",
                "filters" : "both",
                "search" : search,
                "searchType" : searchType
             }
        }
        searchCollection(info)
    }

    const getSelectData = (key) => {
        if (key === "sort"){
            return SORT_OPTIONS
        }
        else if (key === "searchType"){
            return SEARCH_TYPE_OPTIONS
        }
    }

    const displayCards = () => {
        if(cards.length === 0){
            return <div className="mt-5 text-center text-muted">No Cards Found</div>
        }
        else{
            let cardsToDisplay = cards.map(card => 
            <div key={card.id} className="pokemon-card m-3">
                <img src={card.small_image} alt={card.name} />
            </div>
            );
            return cardsToDisplay;
        }
    }

    return (
        <div className="px-3" style={{maxWidth: "1920px", margin: "auto"}}>
        <form className="home-form">
            <fieldset>
                <legend>Sort</legend>
                <Select
                    className="sort-select react-select"
                    classNamePrefix="sort-select"
                    isSearchable={false}
                    isClearable={false}
                    defaultValue={getSelectData("sort")[0]}
                    name="sort"
                    onChange={onSortValueChanged}
                    options={getSelectData("sort")}
                />
            </fieldset>
            <fieldset>
                <legend>Filters</legend>
                <div className="search-div">
                    <Select
                        className="search-type-select react-select"
                        classNamePrefix="search-type-select"
                        isSearchable={false}
                        isClearable={false}
                        defaultValue={getSelectData("searchType")[0]}
                        name="searchType"
                        onChange={onSearchTypeValueChanged}
                        options={getSelectData("searchType")}
                    />
                    <img className="search-icon" src={SearchImg} alt="" />
                    <input type="text" name="search" className="search" onChange={onSearchValueChanged} onKeyDown={onKeyDown} defaultValue={search} />
                </div>
            </fieldset>
            <input type="submit" name="submit" value="Apply Filters" className="apply-filters" onClick={onSubmit} />
        </form>
        <h3 className="text-center mt-4 mb-3">My Collection</h3>
        <div id="cards" className="mb-5">
            {displayCards()}
        </div>
        </div>

    )
}

export default HomePage

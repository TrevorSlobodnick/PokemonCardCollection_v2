//import qs from "query-string"
//import { useLocation } from "react-router"
import React, { useEffect, useState } from 'react'
//import { VALID_SORT_VALUES, VALID_SEARCHTYPE_VALUES, SORT_OPTIONS, SEARCH_TYPE_OPTIONS } from "../util/Constants.js"
//import { useHistory } from "react-router-dom"
import { Backend } from "../util/Backend.js"
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HomePage = ( props ) => {

    //TODO: implement URL filtering/sorting

    //const [searchQuery, setSearchQuery] = useState(qs.parse(useLocation().search))
    //const history = useHistory()
    const [fetchCards, setFetchCards] = useState(true)
    const [cards, setCards] = useState([])

    useEffect(() => {
        if(fetchCards === true){
            Backend.getCards().then(response => {
                console.log(response);
                if(response.completed){
                    if(response.data.length > 0){
                        let parsedCards = response.data.map(card => {
                            card.types = JSON.parse(card.types)
                            card.tags = JSON.parse(card.tags)
                            return card
                        })
                        setCards(parsedCards)
                    }
                    else{
                        setCards([])
                    }
                }
                else if(response.data.message != null){
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

    const displayCards = () => {
        if(cards.length === 0){
            return <div className="mt-5 text-center text-muted">No Cards Found</div>
        }
        else{
            let cardsToDisplay = cards.map(card => {
            let specialText = ""
            let specialClass = ""
            if(card.tags.includes("Holo")){
                specialText = "HOLO"
                specialClass = "holo "
            }
            else if(card.tags.includes("Reverse Holo")){
                specialText = "REVERSE HOLO"
                specialClass = "reverse-holo "
            }
            return <div key={card.id} data-id={card.id} className="pokemon-card m-3">
                <div className='position-relative'>
                <LazyLoadImage
                    src={card.small_image}
                    alt={card.name}
                    width={245}
                    height={342}
                    // width and height are required for lazy loading to work, so I set them to the size of the small card image (in pixels)
                />
                <p style={{bottom:"8px", fontSize:"1.4rem"}} className={specialClass + 'fs-5 position-absolute start-50 translate-middle-x m-0'}><span className='badge p-2'>{specialText}</span></p>
                </div>
            </div>
            });
            return cardsToDisplay;
        }
    }

    return (
        <div className="px-3" style={{maxWidth: "1920px", margin: "auto"}}>
        <form className="home-form">
        </form>
        <h3 className="text-center mt-4 mb-3">My Collection</h3>
        <div id="cards" className="mb-5">
            {displayCards()}
        </div>
        </div>

    )
}

export default HomePage

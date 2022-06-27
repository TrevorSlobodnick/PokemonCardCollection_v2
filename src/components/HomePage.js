import React, { useEffect, useState } from 'react'
import { SORT_OPTIONS } from "../util/Constants.js"
import { Backend } from "../util/Backend.js"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { rarityToInt } from '../util/Utils.js';

const HomePage = ( props ) => {

    //TODO: implement URL filtering/sorting

    const [fetchCards, setFetchCards] = useState(true)
    const [cards, setCards] = useState([])
    const [sortOption, setSortOption] = useState(1)

    useEffect(() => {
        if(fetchCards === true){
            Backend.getCards().then(response => {
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
                else{
                    //we got a warning...
                    //in this case, its because there are no cards in the set
                    setCards([]);
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
                specialClass = "holo"
            }
            else if(card.tags.includes("Reverse Holo")){
                specialText = "REVERSE HOLO"
                specialClass = "reverse-holo"
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
                <p style={{bottom:"8px", fontSize:"1.4rem"}} className={specialClass + ' fs-5 position-absolute start-50 translate-middle-x m-0'}><span className='badge p-2'>{specialText}</span></p>
                </div>
            </div>
            });
            return cardsToDisplay;
        }
    }

    /**
     * Determines what happens when the sort value changes
     * @param Event e the change event
     */
    const onSortChange = (e) => {
        const val = e.currentTarget.value;
        let sortedCards = cards;
        if(val === "1"){
            // 1 = Oldest
            sortedCards = cards.sort((a, b) => a.id - b.id);
        }
        else if(val === "2"){
            // 2 = Newest
            sortedCards = cards.sort((a, b) => a.id - b.id).reverse();
        }
        else if(val === "3"){
            // 3 = Rarity
            try{
                sortedCards = cards.sort((a, b) => rarityToInt(a.rarity) - rarityToInt(b.rarity));
            }
            catch(e){
                console.log(e)
            }
        }
        else if(val === "4"){
            // 4 = Rarity (High)
            try{
                sortedCards = cards.sort((a, b) => rarityToInt(b.rarity) - rarityToInt(a.rarity));
            }
            catch(e){
                console.log(e)
            }
        }
        else{
            // unhandled value
            throw new Error("Unhandled Sort Value");
        }
        setCards(sortedCards);
        setSortOption(e.currentTarget.value);
    }

    /**
     * Generate the options for the sort <select> element based off the SORT_OPTIONS constant
     * @return array An array of options for the sort <select> element
     */
    const displaySortOptions = () => {
        return SORT_OPTIONS.map(opt =>  {
            return <option key={opt.value} value={opt.value}>{opt.label}</option>
        }); 
    }

    return (
        <div className="px-3" style={{maxWidth: "1920px", margin: "auto"}}>
            <h3 className="text-center my-5">My Collection</h3>
            <form className="sort-filter-form m-5 p-3">
                <div className='d-flex align-items-center'>
                    <p className='m-0'>{cards.length} results</p>
                </div>
                <div className='d-flex align-items-center'>
                    <label>Sort:</label>
                    <select className="form-select ms-2" onChange={onSortChange} value={sortOption}>
                        {displaySortOptions()}
                    </select>
                </div>
            </form>
            <div id="cards" className="mb-5">
                {displayCards()}
            </div>
        </div>
    )
}

export default HomePage

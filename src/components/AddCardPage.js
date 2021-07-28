import React from 'react'
import PokemonSetDropDown from './PokemonSetDropDown'

const AddCardPage = () => {
    return (
        <div>
            <form>
                <label htmlFor="setName">Set</label>
                <PokemonSetDropDown />
                <label htmlFor="cardNumber">Number</label>
                <input type="number" name="cardNumber" id="cardNumber" placeholder="58" />
            </form>
        </div>
    )
}

export default AddCardPage

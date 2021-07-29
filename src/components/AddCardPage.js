import React from 'react'
import PokemonSetDropDown from './PokemonSetDropDown'
import { useState } from "react"
import { Backend } from '../util/Backend'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)

    const onSelectChange = (valueType, actionType) => {
        if(actionType.action === "select-option"){
            setSetId(valueType.value)
        }
    }

    const onNumberInputChange = (e) => {
        setNumber(e.target.value)
    }

    const onKeyDown = (e) => {
        if(e.key === "Enter"){
            e.preventDefault() //prevents refresh
            setNumber(e.target.value)
            submitForm(setId, e.target.value)
        }
    }

    const onSubmitClicked = (e) => {
        e.preventDefault()
        submitForm(setId, number)
    }

    const submitForm = (id, num) => {
        console.log("Form Submitted")
        Backend.addCard(id, num).then(response => {
            console.log("Card Added");
            console.log(response)
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="setName">Set</label>
                <PokemonSetDropDown onSelectChange={onSelectChange} />
                <label htmlFor="cardNumber">Number</label>
                <input type="number" name="cardNumber" id="cardNumber" onKeyDown={onKeyDown} onChange={onNumberInputChange} placeholder="58" />
                <input type="submit" name="submit" id="submit" onClick={onSubmitClicked} value="Add Card" />
            </form>
        </div>
    )
}

export default AddCardPage

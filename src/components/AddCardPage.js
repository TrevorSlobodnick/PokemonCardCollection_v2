import React from 'react'
import PokemonSetDropDown from './PokemonSetDropDown'
import { useState } from "react"
import { Backend } from '../util/Backend'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)
    const [lastAdded, setLastAdded] = useState({})

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
        Backend.addCard(num, id).then(response => {
            console.log(response)
            if(response == null){
                setLastAdded({})
            }
            else{
                setLastAdded(response)
            }
        })
    }

    return (
        <div className="add-page-content">
            <form>
                <label htmlFor="setName">Set</label>
                <PokemonSetDropDown onSelectChange={onSelectChange} />
                <label htmlFor="cardNumber">Number</label>
                <input type="number" name="cardNumber" id="cardNumber" onKeyDown={onKeyDown} onChange={onNumberInputChange} placeholder="58" />
                <input type="submit" name="submit" id="submit" onClick={onSubmitClicked} value="Add Card" />
            </form>
            <div className="img-wrapper">
                {Object.keys(lastAdded).length === 0 ? <div className="card-placeholder" width="128px"></div> : <img width="128px" src={lastAdded.images.small} alt={lastAdded.name} />}
            </div>
        </div>
    )
}

export default AddCardPage

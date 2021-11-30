import React from 'react'
import PokemonSetDropDown from './PokemonSetDropDown'
import { useState } from "react"
import { Backend } from '../util/Backend'
import { StatusMessage } from '../util/StatusMessage'
import Tags from "./Tags"
import { VARIANTS } from '../util/Constants'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)
    const [lastAdded, setLastAdded] = useState({})
    const [variants, setVariants] = useState([]) //this will be an array of objects to start, it will need to be parsed and converted to json before sending to database, we only care about the value property

    const onSelectChange = (valueType, actionType) => {
        if(actionType.action === "select-option"){
            //valueType.value will be equal to the name of the set, this is required for the default search functionality to work
            //the id is passed to the html element when being created, so it can be accessed via data-id
            setSetId(valueType.label.props['data-id'])
        }
    }

    const onNumberInputChange = (e) => {
        setNumber(e.target.value)
    }

    const submitForm = (id, num) => {
        console.log("Form Submitted")
        Backend.addCard(num, id).then(response => {
            console.log(response)
            if(response.completed === false){
                StatusMessage.showErrorMessage("Card could not be added:\n\n" + response.data.message)
                setLastAdded({})
            }
            else{
                StatusMessage.showSuccessMessage("Card added Successfully")
                setLastAdded(response.data)
            }
        })
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

    const onVariantChange = (optionsSelected, actionType) => {
        setVariants(optionsSelected)
    }

    return (
        <div className="add-page-content">
            <form>
                <label htmlFor="setName">Set*</label>
                <PokemonSetDropDown onSelectChange={onSelectChange} />
                <label htmlFor="cardNumber">Number*</label>
                <input type="number" name="cardNumber" id="cardNumber" onKeyDown={onKeyDown} onChange={onNumberInputChange} placeholder="58" />
                <label htmlFor="cardVariant">Tags</label>
                <Tags onChange={onVariantChange} options={VARIANTS} isMulti value={variants} />
                <input type="submit" name="submit" id="submit" onClick={onSubmitClicked} value="Add Card" />
            </form>
            <div className="img-wrapper">
                {Object.keys(lastAdded).length === 0 ? <div className="card-placeholder" width="128px"></div> : <img width="128px" src={lastAdded['small_image']} alt={lastAdded.name} />}
            </div>
        </div>
    )
}

export default AddCardPage

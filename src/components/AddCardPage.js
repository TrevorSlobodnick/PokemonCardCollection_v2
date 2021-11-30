import React from 'react'
import PokemonSetDropDown from './PokemonSetDropDown'
import { useState } from "react"
import Select from 'react-select'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)

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
        // Backend.addCard(num, id).then(response => {
        //     console.log(response)
        //     if(response.completed === false){
        //         StatusMessage.showErrorMessage("Card could not be added:\n\n" + response.data.message)
        //     }
        //     else{
        //         StatusMessage.showSuccessMessage("Card added Successfully")
        //     }
        // })
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

    return (
        <div className="add-page-content">
            <form>
                <label htmlFor="setName">Set*</label>
                <PokemonSetDropDown onSelectChange={onSelectChange} />
                <label htmlFor="cardNumber">Number*</label>
                <input type="number" name="cardNumber" id="cardNumber" onKeyDown={onKeyDown} onChange={onNumberInputChange} placeholder="58" />
                <label>Grade</label>
                <input type="number" name="grade" id="grade" placeholder="9" max={10} />
                <label>Grade Company</label>
                <input type="text" name="gradeCompany" id="gradeCompany" placeholder="psa" />
                <label>Rarity</label>
                <Select />
                <label>Extras</label>
                <div>
                    <input type="checkbox" name="extras"  />
                </div>
                <input type="submit" name="submit" id="submit" onClick={onSubmitClicked} value="Add Card" />
            </form>
        </div>
    )
}

export default AddCardPage

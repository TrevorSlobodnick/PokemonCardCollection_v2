import React from 'react'
import PokemonSetDropDown from './formcontrols/PokemonSetDropDown'
import { useState } from "react"
import Select from 'react-select'
import { APPEARANCES } from '../util/Constants'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)
    const [step, setStep] = useState(1)

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

    const displayForm = () => {
        if (step === 1){
            return <form>
                <div>
                    <label htmlFor="setName">Set</label>
                    <PokemonSetDropDown onSelectChange={onSelectChange} />
                </div>
                <div>
                    <label htmlFor="cardNumber">Number</label>
                    <input type="number" name="cardNumber" id="cardNumber" className="form-control" onKeyDown={onKeyDown} onChange={onNumberInputChange} /> 
                </div>
                <button className="btn btn-success" onClick={() => setStep(2)}>Next</button>
            </form>
        }
        else{
            return <form>
                <div>
                    <label htmlFor="appearance">Appearance</label>
                    <Select id="appearance" className="form-control" classNamePrefix="appearance" options={APPEARANCES} />
                </div>
                <div>
                    <button className="btn">Add Rating</button>
                </div>
                <button className="btn btn-warning" onClick={() => setStep(1)}>Back</button>
                <input type="submit" name="submit" id="submit" onClick={onSubmitClicked} value="Add Card" />
            </form>
        }
    }

    return (
        <div className="container">
            <h1>Add Pokemon Card</h1>
            {displayForm()}
        </div>
    )
}

export default AddCardPage

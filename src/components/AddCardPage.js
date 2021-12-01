import React from 'react'
import PokemonSetDropDown from './formcontrols/PokemonSetDropDown'
import { useState } from "react"
import Select from 'react-select'
import { APPEARANCES } from '../util/Constants'
import GradeControlGroup from './formcontrols/GradeControlGroup'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)
    const [step, setStep] = useState(1)
    const [selected, setSelected] = useState({})
    const [displayGrade, setDisplayGrade] = useState(false)
    const [grade, setGrade] = useState(0)
    const [gradeCompany, setGradeCompany] = useState("")

    const onSelectChange = (valueType, actionType) => {
        if(actionType.action === "select-option"){
            //valueType.value will be equal to the name of the set, this is required for the default search functionality to work
            //the id is passed to the html element when being created, so it can be accessed via data-id
            setSetId(valueType.label.props['data-id'])
            setSelected(valueType)
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

    const onStepUp = () => {
        setStep(step + 1)
    }

    const onStepDown = () => {
        setStep(step - 1)
    }

    const toggleGrade = () => {
        if(displayGrade){
            setDisplayGrade(false)
        }
        else{
            setDisplayGrade(true)
        }
    }

    const displayForm = () => {
        if (step === 1){
            return <form>
                <div>
                    <label htmlFor="setName">Set</label>
                    <PokemonSetDropDown selected={selected} onSelectChange={onSelectChange} />
                </div>
                <div>
                    <label htmlFor="cardNumber">Number</label>
                    <input type="number" name="cardNumber" id="cardNumber" className="form-control" onKeyDown={onKeyDown} onChange={onNumberInputChange} /> 
                </div>
                <div className="mt-3 text-end">
                    <button type="button" className="btn btn-success set-btn" onClick={onStepUp}>Next</button>
                </div>
            </form>
        }
        else{
            return <form>
                <div>
                    <label htmlFor="appearance">Appearance</label>
                    <Select id="appearance" className="form-control" classNamePrefix="appearance" options={APPEARANCES} />
                </div>
                {displayGrade ? 
                    <GradeControlGroup grade={grade} setGrade={setGrade} gradeCompany={gradeCompany} setGradeCompany={setGradeCompany} onClick={toggleGrade} />
                    :
                    <div className="mt-3">
                        <button type="button" className="btn btn-outline-dark" onClick={toggleGrade}>Add Grade</button>
                    </div>
                }
                <div className="mt-3 d-flex justify-content-between">
                    <button type="button" className="btn btn-warning" onClick={onStepDown}>Back</button>
                    <input type="submit" name="submit" id="submit" className="btn btn-success" onClick={onSubmitClicked} value="Add Card" />
                </div>
            </form>
        }
    }

    return (
        <div className="container">
            <h1>Add A Card - {step}/2</h1>
            {displayForm()}
        </div>
    )
}

export default AddCardPage

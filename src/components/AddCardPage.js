import React from 'react'
import PokemonSetDropDown from './formcontrols/PokemonSetDropDown'
import { useState } from "react"
import Select from 'react-select'
import { APPEARANCES } from '../util/Constants'
import GradeControlGroup from './formcontrols/GradeControlGroup'
import { isEmptyObj } from '../util/Utils'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)
    const [step, setStep] = useState(1)
    const [set, setSet] = useState({}) //this is an option from a select { label: "", value: "" }
    const [displayGrade, setDisplayGrade] = useState(false)
    const [grade, setGrade] = useState(0)
    const [gradeCompany, setGradeCompany] = useState({}) //this is an option from a select { label: "", value: "" }
    const [appearance, setAppearance] = useState({}) //this is an option from a select { label: "", value: "" }

    const onSetSelectChange = (optSelected, actionType) => {
        setSetId(optSelected.label.props['data-id'])
        setSet(optSelected)
        //TODO: since the appearance options will change based on the card that was inputted, reset the appearance value
    }

    const onNumberInputChange = (e) => {
        if(e.target.value.toString().length < 4){
            setNumber(e.target.value)
        }
        else{
            e.target.value = number
        }
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

    const onEnterKeyPressed = (e) => {
        if (e.key === 'Enter'){
            onStepUp()
        }
    }

    const toggleGrade = () => {
        if(displayGrade){
            setDisplayGrade(false) //dont display grade input
            setGrade(0) //set grade to initial value
            setGradeCompany("") //set grade company to initial value
        }
        else{
            setDisplayGrade(true) //display grade input
            setGrade(10) //set grade to a valid value
            setGradeCompany("PSA") //set grade company to a valid value
        }
    }

    const displayForm = () => {
        if (step === 1){
            return <form>
                <div className="mt-3">
                    <label htmlFor="setName">Set</label>
                    <PokemonSetDropDown set={set} onSelectChange={onSetSelectChange} />
                </div>
                <div className="mt-3">
                    <label htmlFor="cardNumber">Number</label>
                    <input type="number" name="cardNumber" id="cardNumber" className="form-control" value={number === 0 ? "" : number} onKeyDown={onEnterKeyPressed} onChange={onNumberInputChange} /> 
                </div>
                <div className="mt-4 text-end">
                    <button type="button" className="btn btn-success set-btn" onClick={onStepUp}>Next</button>
                </div>
            </form>
        }
        else{
            return <form>
                <div className="mt-3">
                    <label htmlFor="appearance">Appearance</label>
                    <Select id="appearance" className="form-control" classNamePrefix="appearance" placeholder="Appearance" defaultValue={isEmptyObj(appearance) ? "" : appearance} onChange={(optSelected, a) => setAppearance(optSelected)} options={APPEARANCES} />
                </div>
                {displayGrade ? 
                    <GradeControlGroup grade={grade} setGrade={setGrade} gradeCompany={gradeCompany} setGradeCompany={setGradeCompany} onClick={toggleGrade} />
                    :
                    <div className="mt-3">
                        <button type="button" className="btn btn-outline-dark" onClick={toggleGrade}>Add Grade</button>
                    </div>
                }
                <div className="mt-4 d-flex justify-content-between">
                    <button type="button" className="btn btn-warning" onClick={onStepDown}>Back</button>
                    <input type="submit" name="submit" id="submit" className="btn btn-success" onClick={onSubmitClicked} value="Add Card" />
                </div>
            </form>
        }
    }

    return (
        <div className="container add-page">
            <div className="mt-5 d-flex justify-content-between align-items-end">
                <h1>Add A Card</h1>
                <h2>{step}/2</h2>
            </div>
            {displayForm()}
        </div>
    )
}

export default AddCardPage

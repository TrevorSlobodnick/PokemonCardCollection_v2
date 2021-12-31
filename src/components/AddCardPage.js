import React from 'react'
import PokemonSetDropDown from './formcontrols/PokemonSetDropDown'
import { useState } from "react"
import Select from 'react-select'
import GradeControlGroup from './formcontrols/GradeControlGroup'
import { getCardId, isEmptyObj } from '../util/Utils'
import { Backend } from '../util/Backend'
import { GRADING_COMPANIES } from '../util/Constants'
import { StatusMessage } from '../util/StatusMessage'

const AddCardPage = () => {

    const [setId, setSetId] = useState("")
    const [number, setNumber] = useState(0)
    const [step, setStep] = useState(1)
    const [set, setSet] = useState({}) //this is an option from a select { label: "", value: "" }
    const [displayGrade, setDisplayGrade] = useState(false)
    const [grade, setGrade] = useState(0)
    const [gradeCompany, setGradeCompany] = useState({}) //this is an option from a select { label: "", value: "" }
    const [appearance, setAppearance] = useState({}) //this is an option from a select { label: "", value: "" }
    const [card, setCard] = useState({})
    const [appearanceOptions, setAppearanceOptions] = useState([]); //this is an array of options for a select [{ label: "", value: "" }]
    //errors
    const [numberErrorMsg, setNumberErrorMsg] = useState("");

    const onSetSelectChange = (optSelected, actionType) => {
        setSetId(optSelected.label.props['data-id'])
        setSet(optSelected)
        //TODO: since the appearance options will change based on the card that was inputted, reset the appearance value
    }

    const onNumberInputChange = (e) => {
        //val is 0 if input field is empty, otherwise its the value of the input field
        let val = parseInt(e.target.value, 10);
        if(e.target.value === ""){
            e.target.style.removeProperty("border-color")
            setNumberErrorMsg("");
        }
        else if(val > set.label.props["data-actual-total"] || val < 1){
            e.target.style.borderColor = "red"
        }
        else{
            e.target.style.removeProperty("border-color")
            setNumberErrorMsg("");
        }
        setNumber(e.target.value)
    }

    const getAppearanceOptions = (rarity) => {
        if(rarity === "Common" || rarity === "Uncommon" || rarity === "Rare"){
            return [
                { label: "None", value: ""},
                { label: "Reverse Holo", value: "Reverse Holo"}
            ]
        }
        else if(rarity === "Rare Holo"){
            return [
                { label: "None", value: ""},
                { label: "Reverse Holo", value: "Reverse Holo"},
                { label: "Holo", value: "Holo"}
            ]
        }
        else{
            return [{ label: "N/A", value: ""}];
        }
    }

    const submitForm = () => {
        let info = {};
        //basic info
        info.card_id = card.id;
        info.name = card.name;
        info.card_number = card.number;
        info.artist = card.artist;
        info.hp = card.hp;
        info.rarity = card.rarity;
        info.supertype = card.supertype;
        info.subtypes = card.subtypes;
        info.types = card.types;
        //other info
        info.special_appearance = appearance.value;
        info.language_code = "en"; //this is the default value and will change when we support multi language cards
        info.is_promo = 0; //(false) this is the default value and will change when we support promo cards
        //set info
        info.set_id = card.set.id;
        info.set_name = card.set.name;
        info.set_series = card.set.series;
        //grade info
        info.grade = grade;
        info.grade_company = (gradeCompany.value === undefined) ? "" : gradeCompany.value;
        console.log("Info Sent:");
        console.log(info);
        Backend.addCard(info).then(response => {
            console.log("Response:");
            console.log(response)
            if(response.completed === false){
                StatusMessage.showErrorMessage("Card could not be added:\n\n" + response.data.message)
            }
            else{
                StatusMessage.showSuccessMessage("Card added Successfully")
                //TODO: clear form, set to step 1
            }
        });
    }

    const onSubmitClicked = (e) => {
        e.preventDefault()
        submitForm()
    }

    const onStepUp = () => {
        if(number <= set.label.props["data-actual-total"] && number > 0){
            setStep(2)
            const cardId = getCardId(setId, number)
            if(card === null || isEmptyObj(card) || card.id !== cardId){
                Backend.getCardFromApi(cardId).then(response => {
                    console.log("Api response:");
                    console.log(response.data)
                    setCard(response.data)
                    if(response.data !== null){
                        const appOpts = getAppearanceOptions(response.data.rarity)
                        setAppearanceOptions(appOpts)
                        setAppearance(appOpts[0])
                    }
                })
            }
        }
        else{
            setNumberErrorMsg("The number must be between 1 and " + set.label.props["data-actual-total"])
        }
    }

    const onStepDown = () => {
        setStep(1)
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
            setGradeCompany({}) //set grade company to initial value
        }
        else{
            setDisplayGrade(true) //display grade input
            setGrade(10) //set grade to a valid value
            setGradeCompany(GRADING_COMPANIES[0]) //set grade company to a valid value
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
                    <div className="input-group">
                        <input type="number" name="cardNumber" id="cardNumber" className="form-control" disabled={isEmptyObj(set) ? true : false} value={number === 0 ? "" : number} onKeyDown={onEnterKeyPressed} onChange={onNumberInputChange} placeholder="" aria-label="" aria-describedby="add-total"/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="addon-total">{isEmptyObj(set) ? "/???" : "/" + set.label.props["data-listed-total"]}</span>
                        </div>
                    </div>
                    <div className="validation-text">{numberErrorMsg}</div> 
                </div>
                <div className="mt-4 text-end">
                    <button type="button" className="btn btn-success set-btn" onClick={onStepUp}>Next</button>
                </div>
            </form>
        }
        else{
            if(card === null){
                return <div className='mt-5 text-center'>
                    <p className='text-danger' style={{"fontSize": "1.7rem"}}>Card Not Found!</p>
                    <button type="button" className="btn btn-warning" onClick={onStepDown}>Back</button>
                </div>
            }
            else if(isEmptyObj(card)){
                return <div className='mt-5 text-center' style={{"fontSize": "1.7rem"}}>
                    <p>Getting Card...</p>
                </div>
            }
            else{
                return <div>
                    <form>
                    <div className="mt-3">
                        <label htmlFor="appearance">Special Appearance</label>
                        <Select id="appearance" className="form-control" classNamePrefix="appearance" placeholder="Appearance" value={appearance} onChange={(optSelected, a) => setAppearance(optSelected)} options={appearanceOptions} />
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
                    <div className='text-center mt-4'>
                        <h4 className='mb-3'>Preview</h4>
                        <img className='mb-3' src={card.images.small} alt='Pokemon card to be added' />
                    </div>
                </div>
            }
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

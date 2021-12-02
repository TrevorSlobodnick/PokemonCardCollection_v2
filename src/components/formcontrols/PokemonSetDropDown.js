import React, { useEffect, useState } from "react"
import Select from "react-select"
import { Backend } from '../../util/Backend.js'
import { isEmptyObj } from '../../util/Utils'


const PokemonSetDropDown = ( props ) => {
    const [sets, setSets] = useState([])

    const getSelectData = () => {
        let selectData = {}
        sets.forEach(set => {
            let series = set.series
            if(selectData[series] == null){
                //the selectData Object doesnt have the series as a key yet
                selectData[series] = []
            }
            if(set.name === "Base"){
                selectData[series].push({
                    "value" : set.name,
                    "label" : <div className="option" data-id={set.id}><img id="base-img" className="option-img" src={set.symbol} alt={set.name} /><p className="option-text">{set.name}</p></div>
                })
            }
            else{
                selectData[series].push({
                    "value" : set.name,
                    "label" : <div className="option" data-id={set.id}><img className="option-img" src={set.symbol} alt={set.name} /><p className="option-text">{set.name}</p></div>
                })
            }
        });
        return selectData
    }

    const getFormattedSelectData = () => {
        let selectData = getSelectData()
        //the keys (series) will act as groups
        let selectDataKeys = Object.keys(selectData)
        let tmp = selectDataKeys.map(key => {
            let groupedOptions = {
                "label" : key,
                "options" : selectData[key]
            }
            return groupedOptions
        })
        return tmp
    }

    useEffect(() => {
        if(localStorage.getItem("update_sets") === "false"){
            //if update_sets has a value, then sets will too
            const localSets = JSON.parse(localStorage.getItem("sets"))
            setSets(localSets)
        }
        else{
            Backend.getSets().then(response => { //no need to check if response.completed === true
                //set the set state
                setSets(response.data)
                //add items to local storage
                localStorage.setItem("sets", JSON.stringify(response.data))
                localStorage.setItem("update_sets", "false")
            })
        }
        return () => {
            //why we do this
            //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp#comment121180788_65007703
            setSets([])
        }
    }, []) //the square brackets is the dependencies param, meaning if a dependency changes, the useEffect is to be called again, however if the value never changes (like an empty array), the function only runs once when the component is initially rendered

    const displaySelect = () => {
        if(isEmptyObj(props.set)){
            //no default value
            return <Select
                className="select form-control"
                classNamePrefix="pokemon-set"
                isSearchable={false}
                isClearable={false}
                name="set"
                id="setName"
                placeholder="Set"
                onChange={props.onSelectChange}
                options={getFormattedSelectData()}
            />
        }
        else{
            //default value
            return <Select
            className="select form-control"
            classNamePrefix="pokemon-set"
            isSearchable={false}
            isClearable={false}
            name="set"
            id="setName"
            placeholder="Set"
            onChange={props.onSelectChange}
            defaultValue={props.set}
            options={getFormattedSelectData()}
        />
        }
    }
    
    return (
        displaySelect()
    )
}

export default PokemonSetDropDown

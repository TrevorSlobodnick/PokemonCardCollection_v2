import { useEffect, useState } from "react"
import { Backend } from '../util/Backend.js'


const PokemonSetDropDown = () => {

    const [sets, setSets] = useState([]) 

    const getSelectData = () => {
        let selectData = {}
        sets.forEach(set => {
            let series = set.series
            if(selectData[series] == null){
                //the selectData Object doesnt have the series as a key yet
                selectData[series] = []
            }
            selectData[series].push(set)
        });
        return selectData
    }

    const displaySelectOptions = () => {
        //selectData = an object where the keys are the optgroups (series) and the values are an array of the options
        let selectData = getSelectData()
        //selectDataKeys = array of set series, used to group the sets
        let selectDataKeys = Object.keys(selectData);
        return selectDataKeys.map(group => {
            return <optgroup key={group} label={group}>
                {getOptionsForGroup(selectData[group])}
            </optgroup>
        });
    }

    const getOptionsForGroup = (optionsArr) => {
        return optionsArr.map(option => {
            return <option key={option.id} data-id={option.id} value={option.name}>
                <img src={option.symbol} alt={option.name} />
                <p>{option.name}</p>
            </option>
        })
    }

    useEffect(() => {
        Backend.getSets().then(response => {
            setSets(response)
        })
    }, []) //the square brackets is the dependencies param, meaning if a dependency changes, the useEffect is to be called again, however if the value never changes (like an empty array), the function only runs once when the component is initially rendered

    return (
        <select>
            {displaySelectOptions()}
        </select>
    )
}

export default PokemonSetDropDown

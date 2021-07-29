import { useEffect, useState } from "react"
import Select from "react-select"
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
            selectData[series].push({
                "value" : set.id,
                "label" : <div data-id={set.id}><img src={set.symbol} alt={set.name} /><p>{set.name} from {set.series}</p></div>
            })
            //console.log(set.symbol); TODO: Fix backend so images appear
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
        console.log(tmp);
        return tmp
    }

    useEffect(() => {
        Backend.getSets().then(response => {
            setSets(response)
        })
    }, []) //the square brackets is the dependencies param, meaning if a dependency changes, the useEffect is to be called again, however if the value never changes (like an empty array), the function only runs once when the component is initially rendered

    return (
        <Select
            className="select"
            isSearchable={true}
            isClearable={true}
            name="set"
            options={getFormattedSelectData()}
        />
    )
}

export default PokemonSetDropDown

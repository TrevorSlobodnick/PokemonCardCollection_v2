import { useEffect, useState } from "react"
import Select from "react-select"
import { Backend } from '../util/Backend.js'


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
            selectData[series].push({
                "value" : set.id,
                "label" : <div className="option" data-id={set.id}><img className="option-img" src={set.symbol} alt={set.name} /><p className="option-text">{set.name}</p></div>
            })
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
            onChange={props.onSelectChange}
            options={getFormattedSelectData()}
        />
    )
}

export default PokemonSetDropDown
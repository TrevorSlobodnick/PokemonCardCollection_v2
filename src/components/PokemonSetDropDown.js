import { useEffect, useState } from "react"
import { Backend } from '../util/Backend.js'


const PokemonSetDropDown = () => {

    console.log(Backend) //silences warning, temporary
    const [sets, setSets] = useState([]) 

    useEffect(() => {
        Backend.getSets().then(res => console.log(res))
    })

    return (
        <select>
            <optgroup label="Sword & Shield Series">

            </optgroup>
            <optgroup label="Sun & Moon Series">

            </optgroup>
            <optgroup label="XY Series">

            </optgroup>
            <optgroup label="Black & White Series">

            </optgroup>
            <optgroup label="HeartGold & SoulSilver Series">

            </optgroup>
            <optgroup label="Platinum Series">

            </optgroup>
            <optgroup label="Diamond & Pearl Series">

            </optgroup>
            <optgroup label="EX Series">

            </optgroup>
            <optgroup label="e-Card Series">

            </optgroup>
            <optgroup label="Neo Series">

            </optgroup>
            <optgroup label="Gym Series">

            </optgroup>
            <optgroup label="Original Series">

            </optgroup>
            <optgroup label="Mcdonald's Pokemon Cards">

            </optgroup>
        </select>
    )
}

export default PokemonSetDropDown

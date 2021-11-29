import React from 'react'
import X from '../images/x.svg'
import Select from "react-select"

const Tags = ( props ) => {
    const {value, isMulti, onChange} = props

    const handleRemoveValue = (e) => {
        const elemClickedVal = e.currentTarget.dataset.value;
        const removedValue = value.find((val) => val.value === elemClickedVal);
        onChange(
            value.filter((val) => val.value !== elemClickedVal),
            { name: "variant", action: "remove-value", option: removedValue }
        );
    }

    return (
        <div>
            <ul id="tags">
                {isMulti ? value.map((selectedObj, i) => {
                    return <li key={i}>
                        <div data-value={selectedObj.value} className="tag" onClick={handleRemoveValue}>
                            <div className="text">{selectedObj.value}</div>
                            <img className="close-tab" src={X} alt="close" />
                        </div>
                    </li>
                }) : null}
            </ul>
            <Select 
                {...props}
                className="variant-select react-select"
                classNamePrefix="variant-select"
                isSearchable={false}
                isClearable={false}
                backspaceRemovesValue={false}
                name="variant"
                placeholder={""}
                isMulti={true}
                controlShouldRenderValue={!isMulti}
                hideSelectedOptions={true}
            />
        </div>
    )
}

export default Tags

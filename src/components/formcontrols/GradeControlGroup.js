import React from 'react'
import Select from 'react-select'
import { GRADING_COMPANIES } from '../../util/Constants'

const GradeControlGroup = ( props ) => {
    return (
        <div>
            <div className="mt-3 d-flex">
                <div>
                    <label htmlFor="grade" className="form-label">Grade</label>
                    <input type="range" name="grade" id="grade" className="form-range" min={1} max={10} />
                </div>
                <div className="flex-grow-1">
                    <label htmlFor="gradeCompany">Grade Company</label>
                    <Select id="gradeCompany" className="form-control" classNamePrefix="grade-company" options={GRADING_COMPANIES} />
                </div>
            </div>
            <div>
                <button type="button" className="btn btn-outline-dark" onClick={props.onClick}>Remove Grade</button>
            </div>
        </div>
    )
}

export default GradeControlGroup

import React from 'react'
import { GRADING_COMPANIES } from '../../util/Constants'

const GradeField = () => {
    return (
        <div>
            <div>
                <label htmlFor="grade" className="form-label">Grade</label>
                <input type="range" name="grade" id="grade" className="form-range" min={1} max={10} />
            </div>
            <div>
                <label htmlFor="gradeCompany">Grade Company</label>
                <Select id="gradeCompany" className="form-control" classNamePrefix="grade-company" options={GRADING_COMPANIES} />
            </div>
        </div>
    )
}

export default GradeField

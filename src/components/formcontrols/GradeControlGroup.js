import React from 'react'
import Select from 'react-select'
import { GRADING_COMPANIES } from '../../util/Constants'
import { isEmptyObj } from '../../util/Utils'

const GradeControlGroup = ( {onClick, grade, setGrade, gradeCompany, setGradeCompany} ) => {
    return (
        <div className="mt-3">
            <div className="d-flex">
                <div className="position-relative me-3">
                    <label htmlFor="grade" className="form-label">Grade</label>
                    <div className="display-grade">{grade}</div>
                    <input type="range" name="grade" id="grade" className="form-range" defaultValue={grade} onChange={(e) => setGrade(e.target.value)} min={1} max={10} />
                </div>
                <div className="mx-3 flex-grow-1">
                    <label htmlFor="gradeCompany">Grade Company</label>
                    <Select id="gradeCompany" className="form-control" classNamePrefix="grade-company" defaultValue={isEmptyObj(gradeCompany) ? "" : gradeCompany} onChange={(optSelected, action) => setGradeCompany(optSelected)} options={GRADING_COMPANIES} />
                </div>
                <button type="button" className="ms-3 align-self-center btn btn-outline-dark" onClick={onClick}><i className="bi bi-trash"></i></button>
            </div>
        </div>
    )
}

export default GradeControlGroup

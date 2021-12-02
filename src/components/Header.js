import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = () => {

    const location = useLocation();

    return (
        <header>
            <nav className="navbar navbar-expand-lg  navbar-light">
                <div className="container-fluid">
                    <div className="navbar-brand" href="#">
                        <img src={logo} alt="" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={location.pathname === "/" ? "nav-link active" : "nav-link"} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={location.pathname === "/Add" ? "nav-link active" : "nav-link"} to="/Add">Add</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

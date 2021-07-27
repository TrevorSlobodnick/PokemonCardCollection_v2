import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = () => {
    return (
        <header>
            <div className="left-header">
                <div className="img-wrapper">
                    <img src={logo} alt="" />
                </div>
                <h1>Pokemon Card Collection</h1>
            </div>
            <nav className="right-header">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Add">Add</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header

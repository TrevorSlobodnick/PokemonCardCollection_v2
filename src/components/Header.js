import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = () => {

    const openMobileNav = () => {
        document.getElementById("mobile-nav-wrapper").style.width = "100%"
        document.getElementById("mobile-nav").style.width = "50%"
        let linkColl = document.getElementsByClassName("mobile-nav-link")
        // wait 0.1s to change the display type
        setTimeout(function(){
            Array.from(linkColl).forEach(link => link.style.display = "flex")
        }, 100)
    }

    const closeMobileNav = () => {
        document.getElementById("mobile-nav-wrapper").style.width = "0px"
        document.getElementById("mobile-nav").style.width = "0px"
        //for every link in the nav...
        let linkColl = document.getElementsByClassName("mobile-nav-link")
        // wait 0.1s to change the display type
        setTimeout(function(){
            Array.from(linkColl).forEach(link => link.style.display = "none")
        }, 100)
    }

    const onMobileNavWrapperClick = (e) => {
        //if this function is called the mobile nav is already open
        if(e.target === e.currentTarget){
            // the element clicked is the mobile nav wrapper div,
            // the only time this would happen is when the user clicks the "whitespace"
            closeMobileNav()
        }
    }

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
                                <Link className="nav-link active" aria-live="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Add">Add</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

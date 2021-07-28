import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { ReactComponent as HamburgerIcon } from '../images/hamburger.svg'

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
            <div className="left-header">
                <div className="img-wrapper">
                    <img src={logo} alt="" />
                </div>
                <h1>Pokemon Card Collection</h1>
            </div>
            {/* DESKTOP LAYOUT */}
            <nav className="right-header desktop-header">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Add">Add</Link></li>
                </ul>
            </nav>
            {/* DESKTOP LAYOUT */}

            {/* MOBILE LAYOUT */}
            <div className="right-header mobile-header">
                <HamburgerIcon onClick={openMobileNav} />
            </div>
                {/* Display when hamburger clicked */}
            <div id="mobile-nav-wrapper" className="mobile-nav-wrapper width-anim" onClick={onMobileNavWrapperClick}>
                <nav id="mobile-nav" className="mobile-nav width-anim">
                    <ul>
                        <li className="close-mobile-nav" onClick={closeMobileNav}>X</li>
                        <li><Link className="mobile-nav-link" to="/">Home</Link></li>
                        <li><Link className="mobile-nav-link" to="/Add">Add</Link></li>
                    </ul>
                </nav>
            </div>
                {/* Display when hamburger clicked */}
            {/* MOBILE LAYOUT */}
        </header>
    )
}

export default Header

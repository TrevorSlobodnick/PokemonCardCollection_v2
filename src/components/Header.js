import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../images/logo.png'
import { Backend } from '../util/Backend';

const Header = () => {

    const location = useLocation();
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        Backend.checkAuth().then(response => {
            console.log(response);
            if(response.completed === false){
                //authentication failed
                setAuth(false);
                return;
            }
            else{
                setAuth(true);
                return;
            }
        });
    }, [])

    const displayAdminNavLinks = () => {
        if(auth){
            return <li className="nav-item">
            <Link className={location.pathname === "/add" ? "nav-link active" : "nav-link"} onClick={() => document.querySelector(".navbar-toggler").click()} to="/add">Add</Link>
            </li>
        }
        else{
            return null;
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
                                <Link className={location.pathname === "/" ? "nav-link active" : "nav-link"} onClick={() => document.querySelector(".navbar-toggler").click()} to="/">Home</Link>
                            </li>
                            {displayAdminNavLinks()}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

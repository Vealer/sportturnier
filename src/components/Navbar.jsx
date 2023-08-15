import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className={`nav-item ${location.pathname === '/form-data' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/form-data">Turniere</Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/new-competition' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/new-competition">Neues Turnier</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;

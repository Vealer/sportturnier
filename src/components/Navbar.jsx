import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ isLogged, getLoginStatus }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchUser();
    }, [getLoginStatus]);

    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        const data = await fetch('/user');
        const user = await data.json();
        setUser(user);
    };

    const handleLogOut = (e) => {
        navigate('/login');
        getLoginStatus(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className={`nav-item ${location.pathname === '/tournamentsDB' ? 'active' : ''}`}>
                        <Link className="nav-link" to={user ? "/tournamentsDB" : "/tournaments"}>Turniere</Link>
                    </li>
                    <li className={`nav-item ${location.pathname === '/new-competitionDB' ? 'active' : ''}`}>
                        <Link className="nav-link" to={user ? "/new-competitionDB" : "/new-competition"}>Neues Turnier</Link>
                    </li>
                </ul>
                {isLogged && <div className="dropdown">
                    <div className="d-flex align-items-center">
                        <img src="../img/user.jpg" alt="User" className="navImg mr-2" data-toggle="dropdown" style={{ cursor: 'pointer' }} />
                        <p className="mb-0">{user ? user.username : 'Gast'}</p>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item" type="button" onClick={handleLogOut}>Ausloggen</button>
                    </div>
                </div>
                }
            </div>
        </nav>
    )
}

export default Navbar;

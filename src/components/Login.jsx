import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formDataSet, setFormDataSet] = useState([]);
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
  
    const handleGuestLoginChange = () => {
        const userData = {
            userName: 'gast',
            userPassword: 'gast-321'

        };
        setFormDataSet([...formDataSet, userData]);
        navigate('/new-competition');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            userName,
            userPassword
        };
        setFormDataSet([...formDataSet, userData]);
        navigate('/new-competition');

    };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center ">
        <div >
          <form className="col-md-6 container glass-white" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Benutzername</label>
              <input type="text" className="form-control" id="username" value={userName}  placeholder="Benutzername" onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Passwort</label>
              <input type="password" className="form-control" id="password" value={userPassword}  placeholder="Passwort" onChange={(e) => setUserPassword(e.target.value)} required />
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="guestLogin" onChange={handleGuestLoginChange} />
              <label className="form-check-label" htmlFor="guestLogin">Als Gast anmelden</label>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Anmelden</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

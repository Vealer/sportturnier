import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Home({ getLoginStatus, isLogged }) {
  const navigate = useNavigate();
  const [formDataSet, setFormDataSet] = useState([]);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [addUserError, setAddUserError] = useState('');

  const handleGuestLoginChange = () => {
    const userData = {
      userName: 'gast',
      userPassword: 'gast-321'

    };
    setFormDataSet([...formDataSet, userData]);
    navigate('/new-competition');
    getLoginStatus(true);
  };

  const handleAddUserSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: newUserName, password: newUserPassword })
      });
      if (response.ok) {
        navigate('/new-competitionDB');
        getLoginStatus(true);
      } else {
        setAddUserError('Username already exists');
      }
    } catch (err) {
      console.log(err);
      setAddUserError('Internal server error');
    }
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userPassword })
      });
      if (response.ok) {
        navigate('/new-competitionDB');
        getLoginStatus(true);
      } else {
        setSignInError('Invalid username or password');
      }
    } catch (err) {
      console.log(err);
      setSignInError('Internal server error');
    }
  };


  return (
    <div className='container h-100 '>
      <div className="row justify-content-center ">
        <h1 className='d-flex justify-content-center mt-5 glass-dark p-5 text-white col-md-10'>Willkommen zur Turnierplan App!</h1>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div >
            {!isLogged && <form className="col-md-10 container glass-white" onSubmit={handleSignInSubmit}>
              <div className="form-group">
                <label htmlFor="userName">Benutzername</label>
                <input type="text" className="form-control" name="userName" value={userName} placeholder="Benutzername" onChange={(e) => setUserName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Passwort</label>
                <input type="password" className="form-control" name="password" value={userPassword} placeholder="Passwort" onChange={(e) => setUserPassword(e.target.value)} required />
              </div>
              {signInError && <div className="alert alert-danger">{signInError}</div>}
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="guestLogin" onChange={handleGuestLoginChange} />
                <label className="form-check-label" htmlFor="guestLogin">Als Gast anmelden</label>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Anmelden</button>
              <button type="submit" className="btn btn-success mt-3 ml-3" onClick={handleAddUserSubmit}>Registrieren</button>
            </form>
            }
            {addUserError && <div className="alert alert-danger">{addUserError}
              <form className="col-md-10 container glass-white" onSubmit={handleAddUserSubmit}>
                <div className="form-group">
                  <label htmlFor="userName">Benutzername</label>
                  <input type="text" className="form-control" name="userName" value={newUserName} placeholder="Benutzername" onChange={(e) => setNewUserName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Passwort</label>
                  <input type="password" className="form-control" name="password" value={newUserPassword} placeholder="Passwort" onChange={(e) => setNewUserPassword(e.target.value)} required />
                </div>
                {addUserError && <div className="alert alert-danger">{addUserError}</div>}
                <button type="submit" className="btn btn-success mt-3">Registrieren</button>
              </form>
            </div>
            }
            <div className=' mt-5 mb-5 container glass-dark p-4  col-md-10 text-white'>
              <h3>Unsere App ist die perfekte Wahl, wenn Sie Ihre Turniere organisieren und verwalten möchten.</h3>
              <h3>Wenn Sie sich registrieren, können Sie Ihre Turniere speichern und zwischen verschiedenen Turnieren wechseln, die gleichzeitig ausgetragen werden.</h3>
              <h3>Unsere App unterstützt verschiedene Sportarten und kann Teilnehmer-Teams nach dem Zufallsprinzip matchen. Außerdem zeigt sie Ihnen die Tabelle an, damit Sie immer auf dem Laufenden sind.</h3>
              <h3>Sie können auch Teams benennen und einen Countdown nutzen, um sicherzustellen, dass Sie immer im Zeitplan bleiben.</h3>
              <h3>Registrieren Sie sich jetzt und erleichtern Sie sich die Organisation Ihrer Turniere!</h3>
              <h3>Wenn Sie die App nur gelegentlich nutzen möchten, haben Sie auch die Möglichkeit, sich als Gast anzumelden und die App ohne Registrierung zu nutzen. Beachten Sie jedoch, dass Sie in diesem Fall keine Turniere speichern oder zwischen verschiedenen Turnieren wechseln können.</h3>
              <h2>Wir wünschen allen Besuchern unserer App viel Spaß und tolle sportliche Erlebnisse!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

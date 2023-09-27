import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Competition from './components/Competition';
import CompetitionDB from './components/CompetitionDB';
import Tournaments from './components/Tournaments';
import TournamentsDB from './components/TournamentsDB';
import SingleTournament from './components/SingleTournament';
import SingleTournamentDB from './components/SingleTournamentDB';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import HomeDB from './components/HomeDB';


function App() {
  const [formDataSet, setFormDataSet] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeLogin = (isLogged) => {
    setIsLoggedIn(isLogged);
  };


  const handleFormSubmit = (formData) => {
    setFormDataSet([...formDataSet, formData]);
  };

  function deleteTournament(tournamentIndex) {
    const updatedFormDataSet = [...formDataSet];
    updatedFormDataSet.splice(tournamentIndex, 1);
    setFormDataSet(updatedFormDataSet);
  }


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar isLogged={isLoggedIn} getLoginStatus={changeLogin} />
        </header>
        <Routes>
          <Route path="/" exact element={<HomeDB isLogged={isLoggedIn} getLoginStatus={changeLogin} />} />
          <Route path="/new-competition" element={<Competition onFormSubmit={handleFormSubmit} />} />
          <Route path="/new-competitionDB" element={<CompetitionDB />} />
          <Route path="/tournaments" exact element={<Tournaments formData={formDataSet} onDeleteTournament={deleteTournament} />} />
          <Route path="/tournamentsDB" exact element={<TournamentsDB />} />
          <Route path="/tournament/:id" exact element={<SingleTournament formData={formDataSet} />} />
          <Route path="/singleTournamentDB/:id" exact element={<SingleTournamentDB />} />
          <Route path="/datenschutz" element={<PrivacyPolicy />} />

        </Routes>

      </div>
      <Footer />
    </Router>
  );
}

export default App;
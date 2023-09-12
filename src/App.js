import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Competition from './components/Competition';
import CompetitionDB from './components/CompetitionDB';
import Tournaments from './components/Tournaments';
import SingleTournament from './components/SingleTournament';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';



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
          <Navbar isLogged={isLoggedIn} getLoginStatus={changeLogin}/>
        </header>
        <Routes>
          <Route path="/" exact element={<Home isLogged={isLoggedIn}  getLoginStatus={changeLogin}/>} />
          <Route path="/new-competition" element={<Competition onFormSubmit={handleFormSubmit} />} />
          <Route path="/new-competitionDB" element={<CompetitionDB  />} />
          <Route path="/tournaments" element={<Tournaments formData={formDataSet} onDeleteTournament={deleteTournament}/>} />
          <Route path="/tournament/:id" exact element={<SingleTournament formData={formDataSet} />} />
          <Route path="/datenschutz" element={<PrivacyPolicy />} />

        </Routes>

      </div>
      <Footer />
    </Router>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_API_ENDPOINT); // Verwende den API-Endpunkt aus der .env-Datei
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {data.map((item) => (
//         <p key={item.id}>{item.name}</p>
//       ))}
//     </div>
//   );
// };

// export default MyComponent;

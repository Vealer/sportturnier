

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Competition from './components/Competition';
import FormDataRenderer from './components/FormDataRenderer';
import SingleTournament from './components/SingleTournament';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import mongoose from 'mongoose';

// import dotenv from 'dotenv'; // Importiere die dotenv-Library
// dotenv.config(); // Lade Umgebungsvariablen aus der .env-Datei


// const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

function Home() {
  return (
    <div className='container h-100 '>
      <h1 className='d-flex justify-content-center mt-5'>Willkommen zur Turnierplan App!</h1>
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <Link to="/new-competition" >
          <button className="btn btn-primary  ">Neues Turnier erstellen</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  const [formDataSet, setFormDataSet] = useState([]);


  const handleFormSubmit = (formData) => {
    setFormDataSet([...formDataSet, formData]);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/new-competition" element={<Competition onFormSubmit={handleFormSubmit} />} />
          <Route path="/form-data" element={<FormDataRenderer formData={formDataSet} />} />
          <Route path="/tournament/:id" exact element={<SingleTournament formData={formDataSet} />} />
          <Route path="/datenschutz" element={<PrivacyPolicy />} />

        </Routes>

      </div>
      <Footer />
    </Router>
  );
}

// export default App;


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

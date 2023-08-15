import React, { useState } from 'react';
import Competition from './components/Competition';
import FormDataRenderer from './components/FormDataRenderer';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Willkommen zur Sportturnier Planer App!</h1>
      <Link to="/new-competition">
        <button className="btn btn-primary mb-3">Neues Turnier erstellen</button>
      </Link>
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
          <h1>Sportturnier Planer</h1>
        </header>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/new-competition" element={<Competition onFormSubmit={handleFormSubmit} /> }/>
          <Route path="/form-data" element={<FormDataRenderer formData={formDataSet} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
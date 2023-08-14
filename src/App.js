import React, { useState } from 'react';
import Tbutton from './components/button';
import Competition from './components/Competition';
import FormDataRenderer from './components/FormDataRenderer';

function App() {
  const [submittedFormData, setSubmittedFormData] = useState(null);

  const handleFormSubmit = (formData) => {
    setSubmittedFormData(formData);
};

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello World! You have successfully completed your installation with your browser!
        </p>
        <Tbutton innerText="Neues Turnier erstellen" />
        {!submittedFormData &&  <Competition onFormSubmit={handleFormSubmit}/>}
        {submittedFormData && <FormDataRenderer formData={submittedFormData} />}
      </header>
    </div>
  );
}

export default App;

import './App.css';
import Tbutton from './components/button';
import Competition from './components/createCompetition';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello World! You have successfully completed your installation with your browser!
        </p>
        <Tbutton innerText="Neues Turnier erstellen" />
        <Competition />
      </header>
    </div>
  );
}

export default App;

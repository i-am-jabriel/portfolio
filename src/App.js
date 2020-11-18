import './App.css';
import Logo from './components/Logo/Logo';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
    <Navbar />
      <header className="App-header">
        <Logo/>
        <p>
          Abe's React Website
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

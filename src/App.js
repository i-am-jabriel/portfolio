import './App.css';
import LoadingVideo from './components/LoadingVideo/LoadingVideo';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Works from './components/Works/Works';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
      <div className="App">   
        <Navbar />
        <LoadingVideo/>
        <Home/>
        <Works/>
        {/* <Router>
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route></Route>
                <Route></Route>
                <Route></Route>
                <Route></Route>
            </Switch>
        </Router> */}
    </div>
  );
}

export default App;

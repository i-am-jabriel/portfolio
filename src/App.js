import './App.css';
import LoadingVideo from './components/LoadingVideo/LoadingVideo';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Works from './components/Works/Works';
import Music from './components/Music/Music';
import Connect from './components/Connect/Connect';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Component } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            fixed:true,
            loading:true,
        };
    }
    componentDidMount(){
        this.prev = window.scrollY;
        window.addEventListener('scroll',this.onScroll.bind(this));
    }
    onSiteFinishedLoading(){
        this.setState({
            ...this.state,
            loading:false,
        });
    }
    render(){
        return (
            <div className={this.state.loading?'app loading':'app app-fadein'}>   
                <Navbar fixed={this.state.fixed}/>
                <LoadingVideo onVideoEnd={this.onSiteFinishedLoading.bind(this)}/>
                <Home/>
                <Works/>
                <Music/>
                <Connect/>
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
    onScroll(e){
        if (this.prev > window.scrollY && !this.state.fixed && !this.timeout) {
            this.setState({fixed:true});
            this.timeout=window.setTimeout(()=>this.timeout=null,500);
        } else if (this.prev < window.scrollY && this.state.fixed && !this.timeout) {
            this.setState({fixed:false});
            this.timeout=window.setTimeout(()=>this.timeout=null,500);
        }
        this.prev = window.scrollY;
    }
}

export default App;

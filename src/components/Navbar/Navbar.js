import './Navbar.css';
import orange from './orange.png';
import official from './official.png';
import jabe from './jabe.png';
import { Link } from 'react-scroll';
import { Component } from 'react';
class Navbar extends Component{
    render(){ return (
        <div className={this.props.fixed?'navbar fixed fadein':'navbar'} >
            <a id='logo' href='/'>
                <img className='orange' src={orange}/>
                <div className='official'><img src={official} alt='Official'/></div>
                <div className='jabe'><img src={jabe} alt='Jabe'/></div>
            </a>
            <div className='nav-right'>
                <Link className='link' to='Home' spy={true} smooth={true}>Home</Link>
                <Link className='link' to='Works' spy={true} smooth={true}>Works</Link>
                <Link className='link' to='Music' spy={true} smooth={true}>Music</Link>
                <Link className='link' to='Connect' spy={true} smooth={true}>Connect</Link>
                <a className='link' href='http://officialjabe.info/resume.pdf' target="_blank">Resume</a>
            </div>
        </div>
    )}
}
export default Navbar;
import './Navbar.css';
import { Link } from 'react-scroll';
import { Component } from 'react';
class Navbar extends Component{
    getClassName(){
        if(this.props.loading)return 'navbar fixed';
        return this.props.fixed?'navbar fixed fadein':'navbar';
    }
    render(){ return (
        <div className={this.getClassName()} >
            <a id='logo' href='/'>
                <img className='orange' src='img/orange.png'/>
                <div className='official'><img src='img/official.png' alt='Official'/></div>
                <div className='jabe'><img src='img/jabe.png' alt='Jabe'/></div>
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
import './Navbar.css';
import orange from './orange.png';
import official from './official.png';
import jabe from './jabe.png';
import { Link } from 'react-scroll';
export default function Navbar(){ return (
    <div className='navbar'>
        <a id='logo' href='/'>
            <img className='orange' src={orange}/>
            <div className='official'><img src={official} alt='Official'/></div>
            <div className='jabe'><img src={jabe} alt='Jabe'/></div>
        </a>
        <div className='nav-right'>
            <Link className='link' to='Home' spy={true} smooth={true} duration={500}>Home</Link>
            <Link className='link' to='Works' spy={true} smooth={true} duration={500}>Works</Link>
            <Link className='link' to='Music' spy={true} smooth={true} duration={500}>Music</Link>
            <Link className='link' to='Connect' spy={true} smooth={true} duration={500}>Connect</Link>
            <a className='link' href='http://officialjabe.info/resume.pdf'>Resume</a>
        </div>
    </div>
)}
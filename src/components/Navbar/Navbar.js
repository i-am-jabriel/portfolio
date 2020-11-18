import Logo from '../Logo/Logo';
import './Navbar.css';
export default function Navbar(){ return (
    <div className='navbar'>
        <Logo />
        <div className='nav-right'>
            <a className='link'>Home</a>
            <a className='link'>Work</a>
            <a className='link'>Music</a>
            <a className='link'>Connect</a>
        </div>
    </div>
)}
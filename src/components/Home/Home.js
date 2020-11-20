import { Component } from 'react';
import abe from './abe.png';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCoffee, faDesktop, faPaintBrush, faPallet, faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { faHtml5 } from '@fortawesome/free-brands-svg-icons';
// import home from './home.png'
// import orange from './components/Navbar/orange.png';
class Home extends Component{
    particles = [];
    componentWillMount(){
        window.setInterval(this.tick,100);
        window.setTimeout(this.fireOrange,1500);
        // this.canvas = document.getElementById('lead-canvas');
        this.active=false;
    }
    
    tick(){
        if(!this.active)return;
        this.particles.forEach(particle=>{
            particle.x += particle.dx;
            particle.y += particle.dy;

        });
    }
    fireOrange(){
        if(!this.active)return;
    }
    render(){
        return (
            <div className='container' name='Home'>
                <div className='home-hero col section'>
                    <h1 className='lead'>Software Developer, Musician & Creative</h1>
                    <p>✨Building awesome things because they are <span className='orange'>awesome</span>!</p>
                    <canvas id='lead-canvas'></canvas>
                    {/* <img src={home} /> */}
                </div>
                <div className='alt alt-bg col section'>
                    <h2>Thanks for visiting my site.</h2>
                    <div className='row'>
                        <img src={abe} id='me' alt='Photo Of Me'/>
                        <p>My names J Abraham Johnson. Although most the time I go by Abe or Jabe. I’m the classical millennial creative. I’ve never needed a reason to create, the love of knowledge and the quest for information is enough. Also money. I have many passions, hobbies and skills I can utilize to develop versatile solutions for all types of businesses.</p>
                    </div>
                </div>
                <div className='col'>
                    <div className='row skills'>
                        <div className='col'>
                            <div className='title col'>    
                                <span className='relative'><FontAwesomeIcon icon={faCode} className='code'/></span>
                                <FontAwesomeIcon icon={faDesktop} />
                                Backend
                            </div>
                            <p>I really love getting into the nuts in bolts of how things work. One of my lifes greatest joys is creating the functionionality behind a well working application</p>
                        </div>
                        <div className='col'>
                            <div className='title col'>
                                <FontAwesomeIcon icon={faPencilRuler} />
                                FrontEnd
                            </div>
                            <p>I strive for a standard of excellence I strive to put into every product I work on. Let me bring  </p>
                        </div>
                        <div className='col'>
                            <div className='title col'>
                                <FontAwesomeIcon icon={faPaintBrush} />
                                Creative
                            </div>
                            <p>Has someone told you your idea is too stupid or just plain impossible? If I had a life's mission it would be to transform those ideas into reality.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
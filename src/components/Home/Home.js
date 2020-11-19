import { Component } from 'react';
import abe from './abe.png';
import './home.css';
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
                </div>
                <div className='alt col section'>
                    <h2>Thanks for visiting my site.</h2>
                    <div className='row'>
                        <img src={abe} id='me'/>
                        <p>My names J Abraham Johnson. Although most the time I go by Abe or Jabe. I’m the classical millennial creative. I’ve never needed a reason to create, the love of knowledge and the quest for information is enough. Also money. I have many passions, hobbies and skills I can utilize to develop versatile solutions for all types of businesses.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
import { Component } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faDesktop, faPaintBrush, faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import MyImage from './MyImage';
import { OrangeParticle } from '../Constants';
// import home from './home.png'
// import orange from './components/Navbar/orange.png';
class Home extends Component{
    constructor(props){
        super(props);
        this.state ={active:false};
        this.tick = this.tick.bind(this);
        this.fireOrange = this.fireOrange.bind(this);
        window.setInterval(this.tick, 10);
        window.setInterval(this.fireOrange,2000);
        window.orangeImg = new Image();
        window.orangeImg.className = 'orange-spin';
        window.orangeImg.src = 'img/orange.png';
    }
    componentDidMount(){
        this.loadCanvas({target:document.getElementById('lead-canvas')});
    }
    loadCanvas(e){
        if(window.canvas)return;
        console.log('canvas loaded');
        window.canvas = e.target;
        window.canvas.addEventListener('mousemove',e=>window.mouse={x:e.clientX,y:e.clientY});
        window.canvas.addEventListener('mouseenter', this.setState({active:true}));
        window.canvas.addEventListener('mouseout', this.setState({active:false}));
        let style = getComputedStyle(window.canvas);
        window.canvas.height = parseInt(style.height) + 40;
        window.canvas.width = parseInt(window.outerWidth);
        window.context = window.canvas.getContext('2d');
        window.context.webkitImageSmoothingEnabled = window.context.imageSmoothingEnabled = false;
        this.setState({active:true});
    }
    tick(){
        if(!this.state.active)return;
        window.context.clearRect(0, 0, window.canvas.width, window.canvas.height);
        OrangeParticle.tick();
    }
    fireOrange(){
        if(!this.state.active)return;
        let x=Math.random() * window.canvas.width;
        let y=Math.random() * window.canvas.height;
        for(let i=0;i<25;i++)new OrangeParticle(x,y);
    }
    onPhotoClick(e){
        console.log(e,e.target.src,);
        // e.target.src = e.target.src == abe ? abe2 : abe;
    }
    render(){
        return (
            <div className='container' name='Home'>
                <div className='home-hero col section'>
                    <h1 className='lead'>Software Developer, Musician & Creative</h1>
                    <p>✨Building awesome things because they are <span className='orange'>awesome</span>!</p>
                    <canvas id='lead-canvas' onClick={()=>console.log(OrangeParticle.particles)}/>
                    {/* <img src={home} /> */}
                </div>
                <div className='alt alt-bg col section'>
                    <h2>Thanks for visiting my site.</h2>
                    <div className='row'>
                        <MyImage />
                        <p>My names J Abraham Johnson. Although most the time I go by Abe or <span className='orange'>Jabe</span>. I’m the classical millennial creative. I’ve never needed a reason to create, the love of knowledge and the quest for information is enough. Also money. I have many passions, hobbies and skills I can utilize to develop versatile solutions for all types of businesses.</p>
                    </div>
                </div>
                <div className='col'>
                    <div className='row skills'>
                        <div className='col'>
                            <div className='title col'>    
                                <span className='relative'><FontAwesomeIcon icon={faCode} className='code'/></span>
                                <FontAwesomeIcon icon={faDesktop} />
                                Back End
                            </div>
                            <p>I really love getting into the nuts in bolts of how things work. One of my lifes greatest joys is creating the functionionality behind a well working application</p>
                            <p className='blue'>Technology I Love Working With:</p>
                            {['Node.js','Python', 'Ruby', 'C#', 'PSQL', 'AWS'].map(x=><p key={x}>{x}</p>)}
                            <p className='blue'>I also have worked in these langauges:</p>
                            <p>MySQL, C++, MondoDB, PHP, Java</p>
                        </div>
                        <div className='col'>
                            <div className='title col'>
                                <FontAwesomeIcon icon={faPencilRuler} />
                                Front End
                            </div>
                            <p>I strive for a standard of excellence to deliver into into every product I work on. Let me bring serve your customers a beautiful experience.</p>
                            <p className='blue'>Technology I Love Working With:</p>
                            {['JavaScript / HTML5','React.js','Bootstrap','WordPress','Photoshop', 'FontAwesome'].map(x=><p key={x}>{x}</p>)}
                            <p className='blue'>I also have have expereience with:</p>
                            <p>After Effects, Three.js, OpenShot, Youtube API</p>
                        </div>
                        <div className='col'>
                            <div className='title col'>
                                <FontAwesomeIcon icon={faPaintBrush} />
                                Creative
                            </div>
                            <p>Has someone told you your idea is too stupid or just plain impossible? If I had a life's mission it would be to transform those ideas into reality.</p>
                            <p className='blue'>Technology I Love Working With:</p>
                            {['Unity 3D / 2D', 'FL Studio', 'Blender', 'Google Sketch', 'Virtual Reality [HTC Vive]', 'Adobe Animate'].map(x=><p key={x}>{x}</p>)}
                            <p className='blue'>I also would love a reason to work with:</p>
                            <p>Unreal Engine, Augmented Reality, An Intersection Between Code and Music</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
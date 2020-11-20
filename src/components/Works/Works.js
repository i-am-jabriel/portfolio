import ProjectCard from './ProjectCard';
import './Works.css';
class PortfolioObject{
    constructor(title,url,img,desc,tech){
        this.title = title;
        this.url = url;
        this.img = img;
        this.desc = desc;
        this.tech = tech;
    }
}
export default function Works(){
    var objs = [
        new PortfolioObject('Big Picture Game','https://i-am-jabriel.github.io/big-picture-game/', null, 'A Javascript game made for browsers with canvas',['HTML5','JavaScript','CSS3','rbush']),
    
        new PortfolioObject('Not Netflix','https://i-am-jabriel.github.io/notflix/', null, 'A simulation of the netflix.com functionality. You can look up watch shows add them to your list and find out where to watch them!', ['HTML5', 'JavaScript', 'CSS3', 'Youtube Video API']),
    ]
    return (
        <div className='container' name='Works'>
            <div className='section col'>
                <h1>Portfolio</h1>
                <div className='row wrap'>
                    {objs.map(obj => <ProjectCard key={obj.title} title={obj.title} img={obj.img} desc={obj.desc} tech={obj.tech} url={obj.url}/>)}
                </div>
            </div>
        </div>
    )
}
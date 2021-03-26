import { Component } from 'react';
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
class Works extends Component{
    constructor(props){
        super(props);
        this.state = {
            filter:null
        }
        this.objs = [
            new PortfolioObject('Mind Over Melee Radio','https://store.steampowered.com/app/1335020/Mind_Over_Melee_Radio/', 'img/momr1.png', 'A game made in unity that creates proccedurally generated levels and soundtracks',['Unity 3D','C#','Node.js','MySQL', 'JavaScript','PHP','Steamworks']),
            new PortfolioObject('Unlock The Box','https://unlockthebox.io','img/unlockthebox.png','Collaborated with classmates to create a web app version of board game "Unlock The Box"',['Node.js','React','AWS','Postgres']),
            new PortfolioObject('Not Netflix','https://i-am-jabriel.github.io/notflix/', 'img/notflix.png', 'A simulation of the netflix.com functionality. You can look up watch shows add them to your list and find out where to watch them!', ['HTML5', 'JavaScript', 'CSS3', 'Youtube Video API']),
            new PortfolioObject('Big Picture Game','https://i-am-jabriel.github.io/big-picture-game/', 'img/bigpicture.png', 'A Javascript game made for browsers with canvas',['HTML5','JavaScript','CSS3','RBush']),
            new PortfolioObject('Our Future Generation','http://ourfuturegeneration.org',null,'A wordpress website I built with custom wordpress plugins made for a non-profit group Our Future Generation',['Wordpress','PHP']),
            new PortfolioObject('Kitten Meteor Simulator 3000','https://github.com/i-am-jabriel/kitten-meteor-simulator-3000',null, 'A game I made for Fullstack academys 4 days hackathon challengenge. It was one of the 4 prize winners out of 280 entrants. It is a reverse fighter game where you try to lose to your opponent.',['Unity 3D','Node.js','C#'])
        ];
        this.allTags = ['None',...new Set(this.objs.reduce((a,c)=>a.concat(c.tech),[]))];

        this.updateFilter = this.updateFilter.bind(this);
    }
    updateFilter(e){
        this.setState({filter:e.target.value=='None'?null:e.target.value});
    }
    render(){
        return (
            <div className='container' name='Works'>
                <div className='section col'>
                    <h1>Portfolio</h1>
                    <div>Filter By Tech
                        <select onInput={this.updateFilter}>
                            {this.allTags.map(a=><option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                    <div className='row wrap'>
                        {this.objs.map(obj => <ProjectCard key={obj.title} title={obj.title} img={obj.img} desc={obj.desc} tech={obj.tech} url={obj.url} filter={this.state.filter}/>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default Works
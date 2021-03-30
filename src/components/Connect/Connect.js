import { faGithub, faLinkedin, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import './Connect.css';
class Social{
    constructor(icon,url,name){
        Object.assign(this,{icon,url,name});
    }
} 
const socials = [[faYoutube,'http://youtube.com/c/OfficialJabe','YouTube'], [faTwitter,'https://twitter.com/MindOverMelee','Twitter'], [faTwitch,'http://twitch.tv/officialjabe','Twitch'], [faLinkedin,'https://www.linkedin.com/in/abraham-johnson/','LinkedIn'], [faGithub,'https://github.com/i-am-jabriel','GitHub']].map(a=>new Social(...a))
export default function Connect(){
    return(
        <div className='container' name='Connect'>
            <div className='section col'>
                <h1>Contact Me:</h1>
                <p>You can <a href='mailto:officialjabe@gmail.com' className='blue email' data-tip='officialjabe@gmail.com'>Send me an email!</a></p>
                <p>Additionally you can check me out on the following socials:</p>
                <div className='socials'>{socials.map((s,i)=><a key={i} href={s.url} className='link' target='_blank' rel='noreferrer' data-tip={s.name}><FontAwesomeIcon icon={s.icon}/></a>)}</div>
            </div>
            <footer>
                Powered by Hyperfocus
            </footer>
        </div>
    )
}
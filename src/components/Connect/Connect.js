import { faGithub, faLinkedin, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Connect.css';
class Social{
    constructor(icon,url){
        Object.assign(this,{icon,url});
    }
} 
const socials = [[faYoutube,'http://youtube.com/c/OfficialJabe'], [faTwitter,'https://twitter.com/MindOverMelee'], [faTwitch,'http://twitch.tv/officialjabe'], [faLinkedin,'https://www.linkedin.com/in/abraham-johnson/'], [faGithub,'https://github.com/i-am-jabriel']].map(a=>new Social(...a))
export default function Connect(){
    return(
        <div className='container' name='Connect'>
            <div className='section col'>
                <h1>Contact Me:</h1>
                <p>You can <a href='mailto:officialjabe@gmail.com' className='blue email'>Send me an email!</a></p>
                <p>Additionally you can check me out on the following socials:</p>
                <div className='socials'>{socials.map((s,i)=><a key={i} href={s.url} className='link' target='_blank' rel='noreferrer'><FontAwesomeIcon className='orange' icon={s.icon}/></a>)}</div>
            </div>
            <footer>
                Powered by Hyperfocus
            </footer>
        </div>
    )
}
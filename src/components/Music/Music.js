import { faApple, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YouTube from 'react-youtube';
import './Music.css';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
export default function Music(){
    const albums = [];

    return(
        <div className='container' name='Music'>
            <div className='section col'>
                <h1>Music</h1>
                <p>I have my music on all Digital Service Platforms (<FontAwesomeIcon icon={faApple} /> Apple Music,<FontAwesomeIcon icon={faSpotify} /> Spotify, Etc) under the name <span className='orange'>Mind Over Melee</span></p>
                <h3>Listen To My Latest Albums Here</h3>
                <YouTube />
            </div>
        </div>
    )
}
import { faApple, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { NavLink } from 'react-router-dom';
import './Music.css';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
class Album{
    constructor(title,url,date,color){
        Object.assign(this,{title,url,date,color});
    }
}
export default function Music(){
    const albums = [
        new Album('Interactive Media Vol 4','OLAK5uy_n_o2JTUf6HmmKX0CKXl8rrdSh5Vs0Y-Xs', new Date('6-13-2020'),'4e281f'),
        new Album('Heart.Piece','OLAK5uy_k5D9EQ1lmG_SHNFanfIAZznRv5viWdeIo', new Date('5-13-2020'),'fff'),
        new Album('Interactive Media Vol 3','OLAK5uy_kShipkcvKwBkG1ZQ6rGfJ95hEXdPg5iRE', new Date('2-13-2020'),'0e9587'),
        new Album('Kameha\'i','OLAK5uy_mZvKv7U6Gw9lGIULBywGVIu4idaUhsQV4', new Date('1-13-2020'),'606060'),
        new Album('MamaMia (Original Game Soundtrack)','OLAK5uy_nGqJ_W3PqWIWpi3q4ZOkslRxIghqSixLI', new Date('9-13-2019'),'ffeac5')
    ];
    let [currentAlbum, setCurrentAlbum] = useState(0);
    let [currentSong, setCurrentSong]  = useState(0);
    const [time, setTime] = useState([])
    const [songs, setSongs] = useState([]);
    const [player, setPlayer] = useState({});
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(0);
    const mod = (a,b) => ((a%b)+b)%b;
    const zero = n => n < 9?`0${n}`:n;
    const getDate = d => [zero(d.getMonth()+1), zero(d.getDate()), d.getFullYear()].join('/');
    const ref = ref => setPlayer(ref);
    const changeAlbum = i =>{
        currentAlbum=mod(currentAlbum+i,albums.length);
        setCurrentSong(0);
        setCurrentAlbum(currentAlbum);
        loadAlbumData();
        setProgress(0);
        setPaused(false);
    }
    const nextSong = i =>{
        setCurrentSong(currentSong+1);
        setProgress(0);
    }
    const loadAlbumData=() =>{
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDRYYxfh4AJqg5Jx6Y72_RU5WgOCD4gL40&playlistId=${albums[currentAlbum].url}&maxResults=20&part=snippet`)
            .then(res=>res.json())
            .then(res=>{console.log(res);
                setSongs(res.items.map(x=>x.snippet.title))});
    }
    const jumpToSong = i =>{
        setCurrentSong(i);
        setProgress(0);
        player.getInternalPlayer().playVideoAt(i);
        setPaused(false);
    }
    const secondsToTime = i =>{
        let d = new Date(i*1000);
        return `${zero(d.getMinutes())}:${zero(d.getSeconds())}`
    }
    const onProgress = e =>{
        if(paused)return;
        setProgress(player.getCurrentTime()*100/player.getDuration());
        setTime([secondsToTime(player.getCurrentTime()),secondsToTime(player.getDuration())])
    }
    const clickPausePlay = e =>{
        var s = !paused;
        if(!s) player.getInternalPlayer().playVideo();
        else player.getInternalPlayer().pauseVideo();
        setPaused(s);
    }
    const onChange = e =>{
        setProgress(e.target.value);
        setTime([secondsToTime(player.getDuration()*e.target.value*.01),secondsToTime(player.getDuration())])
    }
    const onSeek = e =>{
        player.getInternalPlayer().seekTo(e.target.value*.01*player.getDuration());
    }
    
    const pause = e =>{
        setPaused(true);
    }
    const play = e =>{
        setPaused(false);
    }
    return(
        <div className='container' name='Music'>
            <div className='section col background' style={{background:`#${albums[currentAlbum].color}`}}>
                <h1>Music</h1>
                <p>I have my music on all Digital Service Platforms (<FontAwesomeIcon icon={faApple} /> Apple Music, <FontAwesomeIcon icon={faSpotify} />Spotify, etc.) under the name <span className='orange'>Mind Over Melee</span></p>
                <div className='music-buttons row'>
                    <FontAwesomeIcon icon={faBackward} onClick={()=>{changeAlbum(-1)}} className='clickable' />
                    <h3 className='blue'>{albums[currentAlbum].title}</h3>
                    <FontAwesomeIcon icon={faForward} onClick={()=>{changeAlbum(1)}} className='clickable' />
                </div>
                <div className='col album-container'>
                    <p>{getDate(albums[currentAlbum].date)}</p>
                    <div className='row'>
                        <div className='col album clickable'>
                            <h3 className='song-title'>{songs[currentSong]}</h3>
                            <div id='album-video' onClick={clickPausePlay}>
                                <ReactPlayer ref={ref} url={`https://youtube.com/playlist?list=${albums[currentAlbum].url}`} onReady={loadAlbumData} onEnded={nextSong} height='100%' width='100%' onPlay={play} onProgress={onProgress} config={{youtube:{playerVars:{disablekb:0,controls:0,modestbranding:1}}}}/>
                            </div>
                            <div className='music-input col'>
                                <div className='music-buttons row'>
                                    <FontAwesomeIcon icon={faBackward} onClick={()=>{jumpToSong(currentSong-1)}} className='clickable' />
                                    <FontAwesomeIcon icon={paused?faPause:faPlay} onClick={()=>clickPausePlay()} className='clickable' />
                                    <FontAwesomeIcon icon={faForward} onClick={()=>{jumpToSong(currentSong+1)}} className='clickable' />
                                </div>
                                <input type='range' value={progress} onChange={onChange} onMouseUp={onSeek} min='0' max='100' className='clickable'/>
                                <p>{time.join(' - ')}</p>
                            </div>

                        </div>
                        <div className='col song-list'>
                            { songs.map((s,i)=>(<p key={s} className={currentSong==i?'blue':''} onClick={()=>jumpToSong(i)}>{i+1} - {s}</p>))}
                        </div> 
                    </div>
                    
                </div>
         
            </div>
        </div>
    )
}
import { faApple, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faBackward, faForward, faPause, faPlay, faVolumeDown, faVolumeMute, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import {Range} from 'react-range';
import { zero, mod, albums, getDate } from '../Constants';
import './Music.css';
import Journey from './Journey';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
export default function Music(){
    
    //const getDateForTimeline = d => [d.getFullYear(), zero(d.getMonth()+1), zero(d.getDate())].join('-');
    //const albumDates = albums.map(a=>getDateForTimeline(a.date));
    let [currentAlbum, setCurrentAlbum] = useState(0);
    let [currentSong, setCurrentSong]  = useState(0);
    let [timeline, setTimeline] = useState(0);
    const [albumArt, setAlbumArt] = useState('');
    const [time, setTime] = useState([])
    const [songs, setSongs] = useState([]);
    const [player, setPlayer] = useState({});
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [muted, setMuted] = useState(false);
    const ref = ref => setPlayer(ref);
    const setAlbum = i =>{
        currentAlbum = i;
        changeAlbum(0);
    }
    const changeAlbum = i =>{
        setCurrentSong(0);
        setCurrentAlbum(mod(currentAlbum + i, albums.length));
        loadAlbumData();
        setProgress(0);
        setPaused(false);
    }
    const nextSong = i =>{
        setCurrentSong(currentSong+1);
        setProgress(0);
    }
    const loadAlbumData= e =>{
        // player.innerHTML+=`<style></style>`;
    }
    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDRYYxfh4AJqg5Jx6Y72_RU5WgOCD4gL40&playlistId=${albums[currentAlbum].url}&maxResults=20&part=snippet`)
            .then(res=>res.json())
            .then(res=>{
                // console.log(res);
                setSongs(res.items.map(x=>x.snippet.title));
                setAlbumArt(res.items[0].snippet.thumbnails.maxres.url);
                if(!player.getInternalPlayer)return;
                player?.getInternalPlayer()?.loadPlaylist(albums[currentAlbum].url);
            });
        // console.log(albums[currentAlbum]);
    }, [currentAlbum]);
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
        setProgress(e[0]);
        setTime([secondsToTime(player.getDuration()*e[0]*.01),secondsToTime(player.getDuration())]);
        // if(window.seeking)return;
        /*window.seeking=()=>{
            window.removeEventListener('mouseup',window.seeking);
            player.getInternalPlayer().seekTo(progress*.01*player.getDuration());
        }
        window.addEventListener('mouseup',window.seeking);*/
        if(window.seekTimeout) window.clearTimeout(window.seekTimeout);
        window.seekTimeout = window.setTimeout(()=>{
            window.seekTimeout = null;
            player.getInternalPlayer().seekTo(e[0]*.01*player.getDuration());
        },250);
        //player.getInternalPlayer().seekTo(e[0]*.01*player.getDuration());
        //if(player)
    }
    const onSeek = e =>{
        player.getInternalPlayer().seekTo(progress*.01*player.getDuration());
    }
    const onChangeVol = e =>{
        if(muted){
            player.getInternalPlayer().unMute();
            setMuted(false);
        }
        player.getInternalPlayer().setVolume(e[0]);
        setVolume(e[0]);
    }
    const toggleMute = e =>{
        var m = !muted;
        if(m) player.getInternalPlayer().mute();
        else player.getInternalPlayer().unMute();
        setMuted(m);
    }
    const pause = e =>{
        setPaused(true);
    }
    const play = e =>{
        setPaused(false);
    }
    const volIcons = [faVolumeMute, faVolumeOff, faVolumeDown, faVolumeUp];
    let volIcon = volIcons[0];
    if(!muted) volIcon = volIcons[Math.ceil(volume*(volIcons.length-1)/100)];
    var slider = {
        backgroundColor:`#${albums[currentAlbum].color}`
    }
    return(
        <div className='container' name='Music'>
            <div className='section col background' style={{background:`#${albums[currentAlbum].color}`}}>
                <h1>Music</h1>
                <p>I have my music on all Digital Service Platforms (
                    <a href='https://music.apple.com/gb/artist/mind-over-melee/id1492940130' target='_blank' rel='noreferrer' className='music-link'>
                        <FontAwesomeIcon icon={faApple} /> Apple Music
                    </a>,
                    <a href='https://open.spotify.com/artist/1mRplzvl14eLu5vbvJrlZh' target='_blank' rel='noreferrer' className='music-link'>
                        <FontAwesomeIcon icon={faSpotify} />Spotify
                    </a>, etc.) under the name <span className='orange'>Mind Over Melee</span></p>
                <div className='row album-view-container music-buttons'>
                    <FontAwesomeIcon icon={faBackward} onClick={()=>{changeAlbum(-1)}} data-tip='Last Album' className='clickable music-link' />
                    <h3 className='blue'>{albums[currentAlbum].title}</h3>
                    <FontAwesomeIcon icon={faForward} onClick={()=>{changeAlbum(1)}} data-tip='Next Album' className='clickable music-link' />
                </div>
                <div className='col album-container'>
                    {/* {<p>{getDate(albums[currentAlbum].date)}</p>} */}
                    <Journey index={currentAlbum} onClickIndex={i=>setAlbum(i)}/>
                    <div className='row wrap'>
                        <div className='col album clickable'>
                            <h3 className='song-title'>{songs[currentSong]}</h3>
                            <div id='album-video' onClick={clickPausePlay}>
                                <ReactPlayer ref={ref} url={`https://youtube.com/playlist?list=${albums[currentAlbum].url}`} onReady={loadAlbumData} onEnded={nextSong} onPlay={play} onProgress={onProgress} config={{youtube:{playerVars:{disablekb:0, controls:0, modestbranding:1, iv_load_policy:3, rel:0}}}} style={{opacity:0}} progressInterval={500}/>
                                {albumArt ? <img src={albumArt} alt={`${albums[currentAlbum].title} Artwork`} /> : null}
                                <div className='overlay'/>
                            </div>
                            <div className='music-input col'>
                                <div className='music-buttons row'>
                                    <FontAwesomeIcon icon={faBackward} onClick={()=>{jumpToSong(currentSong-1)}} className='clickable' />
                                    <FontAwesomeIcon icon={paused?faPlay:faPause} onClick={()=>clickPausePlay()} className='clickable' />
                                    <FontAwesomeIcon icon={faForward} onClick={()=>{jumpToSong(currentSong+1)}} className='clickable' />
                                </div>
                                <div className='volume-control row'> 
                                    <FontAwesomeIcon icon={volIcon} onClick={toggleMute} />
                                    <span className='volume-slider'><Range type='range' values={[volume]} onChange={onChangeVol} min={0} max={100} step={0.1} className='clickable' 
                                        renderTrack={({ props, children }) => <>
                                            <div {...props} style={{...props.style, height: '10px',width: `100%`,backgroundColor:'#eee', position:'relative',top:'5px'}}>
                                            <div {...props} style={{...props.style, top:0, left:0, position:'absolute', height: '10px',width: `${volume}%`,backgroundColor: `#${albums[currentAlbum].color}`, opacity:.9}}/>
                                                {children}
                                            </div>
                                            </> 
                                        } renderThumb={({ props }) => (
                                        <div {...props} style={{...props.style,height: '15px',width: '15px',backgroundColor: `#${albums[currentAlbum].color}`,borderRadius:'100%',outline:'none'}}/>
                                        )}
                                    /></span>
                                </div>
                                {//<input type='range' value={progress} onChange={onChange} onMouseUp={onSeek} min={0} max={100} className='clickable seekbar' style={slider}/>
                                null}
                                <span className='scrub-slider'><Range type='range' values={[progress]} onChange={onChange} min={0} max={100} step={0.1} className='clickable' 
                                    renderTrack={({ props, children }) => <>
                                        <div {...props} style={{...props.style, height: '10px',width: `100%`,backgroundColor:'#eee', position:'relative',top:'5px'}}>
                                        <div {...props} style={{...props.style, top:0, left:0, position:'absolute', height: '10px',width: `${progress}%`,backgroundColor: `#${albums[currentAlbum].color}`, opacity:.9}}/>
                                            {children}
                                        </div>
                                        </> 
                                    } renderThumb={({ props }) => (
                                    <div {...props} style={{...props.style,height: '15px',width: '15px',backgroundColor: `#${albums[currentAlbum].color}`,borderRadius:'100%',outline:'none'}}/>
                                    )} /></span>
                                <p>{time.join(' - ')}ㅤ</p>
                            </div>

                        </div>
                        <div className='col song-list'>
                            { songs.map((s,i)=>(<p key={s} className={currentSong==i?'blue':''} onClick={()=>jumpToSong(i)}><span>{i+1} <b>ㅤ</b> {s}</span> </p>))}
                        </div> 
                    </div>
                    
                </div>
         
            </div>
        </div>
    )
}
import './LoadingVideo.css';
import { Component } from 'react';

class LoadingVideo extends Component{
    constructor(props){
        super(props);
        this.state={
            playing:false,
            finished:false,
        }
        if(props.skip)this.onVideoEnd();
    }
    onVideoLoaded(e){
        if(this.state.finished)return;
        e.target.play();
        e.target.playbackRate = 2;
        this.setState({playing:true});
    }
    onVideoEnd(e){
        console.log(this.props.skip,'video done');
        this.setState({
            playing:false,
            finished:true,
        });
        this.props.onVideoEnd();
    }
    render(){
       return(
            <div id='logo-intro-wrapper' className={this.state.finished?'hide':''}>
                <video muted id='logo-intro' onLoadedData={this.onVideoLoaded.bind(this)}  onEnded={this.onVideoEnd.bind(this)} className={(this.state.playing || this.state.finished) ?'playing':''}>
                    <source src='video/logo.min.webm' type="video/webm"/>
                </video>
            </div>
        );
    }
}
export default LoadingVideo;
import logo from './logo.min.webm';
import './LoadingVideo.css';
import { Component } from 'react';

class LoadingVideo extends Component{
    componentDidMount(){
        //Still need to sync with video
    }
    render(){
       return(
            <div id='logo-intro-wrapper'>
                <video muted autoPlay id='logo-intro' onLoadedData={()=>console.log(this,'aiai')}>
                    <source src={logo} type="video/webm"/>
                </video>
            </div>
        );
    }
}
export default LoadingVideo;
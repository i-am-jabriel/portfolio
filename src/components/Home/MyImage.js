import {Component} from 'react';
import {motion} from 'framer-motion';

class MyImage extends Component{
    constructor(props){
        super(props);
        this.state={hover:false}
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    onMouseEnter(){
        this.setState({hover:true});
    }
    onMouseLeave(){
        this.setState({hover:false});
    }
    render(){
        const style = {
            hidden:{width:0},
            visible:{width:180},
        }
        return (
            <div className='my-image-wrapper row'>
                <img src='img/abe.png' alt='Photo Of Me'/>
                <div className='drawing-wrapper' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    <img src='img/abeoutline.svg' class='outline'/>
                    {this.state.hover ? (<motion.div initial='hidden' animate='visible' variants={style} className='drawing'  transition={ {type:'spring'} }><img alt='' src='img/abe2.png' /></motion.div>):null}
                </div>
            </div>
        )
    }
}

export default MyImage;
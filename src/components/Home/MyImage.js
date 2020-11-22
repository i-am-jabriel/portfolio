import {Component} from 'react';
import {motion} from 'framer-motion';

class MyImage extends Component{
    constructor(props){
        super(props);
        this.state={hover:false,drawing:true}
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    onMouseEnter(){
        this.setState({hover:true});
    }
    onMouseLeave(){
        this.setState({hover:false});
    }
    onClick(){
        const drawing = ! this.state.drawing;
        this.setState({drawing});
    }
    render(){
        const style = {
            hidden:{width:0},
            visible:{width:180},
        }
        return (
            <div className='my-image-wrapper row'>
                
                <div className='drawing-wrapper' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
                    { this.state.drawing ?
                        [<img src='img/abeoutline.svg' className='outline' alt='Drawing of me'/>,
                            this.state.hover ? 
                                (<motion.div initial='hidden' animate='visible' variants={style} className='drawing'  transition={ {type:'spring'} }> <img alt='' src='img/abe2.png' /></motion.div>):null,
                        ]:
                        (<img src='img/abe.png' alt='Picture of me'/>)
                    }
                </div>
            </div>
        )
    }
}

export default MyImage;
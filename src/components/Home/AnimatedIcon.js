import { faCode, faDesktop, faPaintBrush, faPencilRuler } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
 
 
export default function AnimatedIcon(props){
    const [hover, setHover] = useState(false);
    const [animation] = useSpring(()=>{
        switch(props.type){
            case 'creative':
                return hover ? {transform:'rotate(45deg)'} : {transform:'rotate(0deg)'}
        }
    });
    const states = {
        creative:{
            icons:()=><animated.span style={animation}><FontAwesomeIcon icon={faPaintBrush} id='creative-icon' onMouseEnter={states.creative.onEnter} onMouseLeave={states.creative.onExit}/></animated.span>,
            from:{transform:'rotate(0deg)'},
            to:{transform:'rotate(45deg)'},
            onExit:()=>setHover(false),
            onEnter:()=>setHover(true),
            //['props', 'setProps', 'stop']: useSpring(()=>({}))
            //['props','hi']:[1,2]
        },
        
        frontEnd:{
            icons:()=><FontAwesomeIcon icon={faPencilRuler} id='front-end-icon'/>,
            from:{},
        },
        backEnd:{
            icons:()=><>
                <span className='relative'><FontAwesomeIcon icon={faCode} className='code' id='back-end-icon'/></span>
                <FontAwesomeIcon icon={faDesktop} id='back-end-bg-icon'/>
            </>,
            from:{},
        }
    }
    // if(props.type=='creative')console.log(hover);
    return states[props.type].icons();
}
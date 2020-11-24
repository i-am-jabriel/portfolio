import { zero, mod, albums, getDate, timeline, Album } from '../Constants';
export default function Journey(props){
    console.log(timeline.length);
    return (
        <div className='music-journey'>
            <h2 className='music-journey-title'>Heres a timeline of my life through the lense of my music:</h2>
            <div className='row timeline-container'>
                { timeline.map( (d,i) => (
                    <div className={`timeline-data ${props.index == i?'active':''}`} data-tip={d.getTooltip()} onClick={()=>props.onClickIndex(i)}>{d.getIcon()}</div>
                )) }
            </div>
        </div>
    )
}
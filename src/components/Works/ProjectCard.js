export default function ProjectCard(props){
    var img = props.image || 'https://breakthrough.org/wp-content/uploads/2018/10/default-placeholder-image.png'
    return (
        <a className='card col' style={{backgroundImage:`url(${img})`}} href={props.url} target='_blank'>
            <div className='background'/>
            <h2 className='card-title'>{props.title}</h2>
            <p>{props.desc}</p>
            <div className='tech row wrap'>
                {props.tech.map(t=><div key={`card-tech-${t}`}>{t}</div>)}
            </div>
        </a>
    )
}
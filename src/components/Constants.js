import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Album{
    constructor(title,url,date,color,desc=''){
        Object.assign(this,{title,url,date,color,desc});
    }
    getTooltip(){
        return `${this.title}<br>Album Released:${getDate(this.date)}`;
    }
    getIcon(active = false){
        return (<FontAwesomeIcon icon={faCompactDisc} pulse={active}/>)
    }
}
export class TimelineDate{
    constructor(data){
        Object.assign(this,{data});
    }
}
export class OrangeParticle{
    constructor(x,y,size){
        Object.assign(this,{theta:0},{x:x||100,y:y||100,size:size||Math.random()*30+10,gy:0});
        this.dx=Math.random()*6-3;
        this.dy=Math.random()*7-10;
        this.ddx = Math.random()*.05 - .025;
        this.speed = Math.random()*4 + 2;
        //this.dSpeed = Math.random()*.03 * (Math.random()>=.5?-1:1) + 1;

        this.ddy = 1;
        OrangeParticle.particles.push(this);
        window.setTimeout(()=>{
            if(this)this.destroy();
        },10000);
    }
    static particles = [];
    static modes = ['tickGravityExplosion', 'tickChaseMouse'];
    static currentMode  = 0;
    static dSpeed = 1.01;
    static maxSpeed = 120;
    static turnSpeed = 0.2;
    //static mode = ;
    static gravityRate = .15;
    static get mode() {return OrangeParticle.modes[OrangeParticle.currentMode] }
    static nextMode(){
        OrangeParticle.currentMode = mod(OrangeParticle.currentMode+1,OrangeParticle.modes.length);
        if(OrangeParticle.currentMode == 1)OrangeParticle.dSpeed = 1.01;
    }
    static tick(){
        if(OrangeParticle.currentMode == 1)OrangeParticle.dSpeed+=.01;
        OrangeParticle.particles.forEach(p=>{
            p[OrangeParticle.mode]();
            if(!p.inView)p.destroy();
            else {
                window.context.drawImage(window.orangeImg,p.x+p.size*.5,p.y+p.size*.5,p.size,p.size);
                window.context.arc(p.x,p.y,p.size,0,Math.PI*2);
            }
        });
    }
    tickGravityExplosion(){
        this.x += (this.dx += this.ddx);
        this.y += this.dy + (this.gy += OrangeParticle.gravityRate);
    }
    tickChaseMouse(){
        const speed = Math.min(this.speed * OrangeParticle.dSpeed, OrangeParticle.maxSpeed);
        let theta = this.theta || Math.random() * Math.PI * 2;
        if(window.mouse) theta = Math.atan2(this.x-window.mouse.x,this.y-window.mouse.y) + Math.PI;
        this.theta = lerpRadian(this.theta,theta,OrangeParticle.turnSpeed);

        this.x += Math.sin(this.theta) * speed;
        this.y += Math.cos(this.theta) * speed;
    }
    destroy(){
        var i = OrangeParticle.particles.indexOf(this);
        if(i!=-1) OrangeParticle.particles.splice(i,1);
    }
    get inView(){ return this.x > -200 && this.x < window.canvas.width + 200 && this.y > - 200 && this. y < window.canvas.height + 200; }
}
export const albums = [
    new Album('Interactive Media Vol 5','PLSxQ7vW8zqni5fMrearPRq79Sx8CcVMHU', new Date('12-13-2020'),'4e441c'),
    new Album('Interactive Media Vol 4','OLAK5uy_n_o2JTUf6HmmKX0CKXl8rrdSh5Vs0Y-Xs', new Date('6-13-2020'),'4e281f'),
    new Album('Heart.Piece','OLAK5uy_k5D9EQ1lmG_SHNFanfIAZznRv5viWdeIo', new Date('5-13-2020'),'452c58'),
    new Album('Interactive Media Vol 3','OLAK5uy_kShipkcvKwBkG1ZQ6rGfJ95hEXdPg5iRE', new Date('2-13-2020'),'08403b'),
    new Album('Kameha\'i','OLAK5uy_mZvKv7U6Gw9lGIULBywGVIu4idaUhsQV4', new Date('1-13-2020'),'606060'),
    new Album('MamaMia (Original Game Soundtrack)','OLAK5uy_nGqJ_W3PqWIWpi3q4ZOkslRxIghqSixLI', new Date('9-13-2019'),'cfbaa5')
];
export const timeline = ([]).concat(albums).sort((a,b)=>b.date-a.date);
export const mod = (a,b) => ((a%b)+b)%b;
export const zero = n => n <= 9?`0${n}`:n;
export const getDate = d => [zero(d.getMonth()+1), zero(d.getDate()), d.getFullYear()].join('/');
export const lerp = (v0, v1, t) => v0*(1-t)+v1*t;
export function lerpAngle(a,b,t){
    let shortest_angle = mod((b-a) + 180,360) - 180;
    return a + mod(shortest_angle * t, 360);
}
export function lerpRadian(a,b,t){
    let shortest_angle = mod((b-a) + Math.PI,Math.PI * 2) - Math.PI;
    return a + mod(shortest_angle * t, 360);
}
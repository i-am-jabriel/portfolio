import { faCompactDisc, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { matchPath } from "react-router";

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
        this.dTheta = Math.random() * Math.PI * .5;
        this.ddTheta = (Math.random() - .5) * Math.PI * .002;
        this.rotation=0;

        this.ddy = 1;
        OrangeParticle.particles.push(this);
        this.lifeSpan =  10000;
    }
    get cx(){return this.x + this.size * .5}
    get cy(){return this.y + this.size * .5}
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
    static lastDeltaTime = 0;
    static lastTheta = 0;
    static tick(){
        let deltaTime = this.lastDeltaTime ? Date.now() - this.lastDeltaTime : 0;
        this.lastDeltaTime = Date.now();
        window.context.save();
        // let cx =  window.canvas.width * .5, cy = window.canvas.height * .5;
        //window.context.translate(window.canvas.width * .5, window.canvas.height * .5);
        if(OrangeParticle.currentMode == 1)OrangeParticle.dSpeed+=.01;
        OrangeParticle.particles.forEach(p=>{
            // OrangeParticle.lastTheta = (-OrangeParticle.lastTheta + p.rotation) % (Math.PI * 2);
            p.rotation += (p.dTheta += p.ddTheta) * deltaTime * .005;
            p[OrangeParticle.mode]();
            if(!p.inView) p.destroy();
            else {
                if ((p.lifeSpan -= deltaTime) < 0) p.destroy();
                else {
                    window.context.translate(p.x, p.y);
                    window.context.rotate(p.rotation);
                    window.context.drawImage(window.orangeImg, 0,  0, p.size, p.size * 1.8);
                    window.context.rotate(-p.rotation);
                    window.context.translate(-p.x, -p.y);
                }
            }
        });
        window.context.restore();
    }
    tickGravityExplosion(){
        this.x += (this.dx += this.ddx);
        this.y += this.dy + (this.gy += OrangeParticle.gravityRate);
    }
    tickChaseMouse(){
        let speed = Math.min(this.speed * OrangeParticle.dSpeed, OrangeParticle.maxSpeed);
        let theta = this.theta || Math.random() * Math.PI * 2;
        if(window.mouse) theta = Math.atan2(this.x-window.mouse.x,this.y-window.mouse.y) + Math.PI;
        this.theta = lerpRadian(this.theta,theta,OrangeParticle.turnSpeed);

        speed += (this.dx += (this.ddx *= .1 * (Math.random() - 2)));
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
    new Album('Perfect Timeless Music', 'OLAK5uy_msAMrM0YEi0WnWy3n0_--GGsA8Pmu3TKg', new Date(2021, 2, 13), '2c3c4d'),
    new Album('Interactive Media Vol 5','PLSxQ7vW8zqni5fMrearPRq79Sx8CcVMHU', new Date(2020, 11 ,13),'4e441c'),
    new Album('Interactive Media Vol 4','OLAK5uy_n_o2JTUf6HmmKX0CKXl8rrdSh5Vs0Y-Xs', new Date(2020, 5, 13),'4e281f'),
    new Album('Heart.Piece','OLAK5uy_k5D9EQ1lmG_SHNFanfIAZznRv5viWdeIo', new Date(2020, 4, 13),'452c58'),
    new Album('Interactive Media Vol 3','OLAK5uy_kShipkcvKwBkG1ZQ6rGfJ95hEXdPg5iRE', new Date(2020, 1, 13),'08403b'),
    new Album('Kameha\'i','OLAK5uy_mZvKv7U6Gw9lGIULBywGVIu4idaUhsQV4', new Date(2020, 0, 13),'606060'),
    new Album('MamaMia (Original Game Soundtrack)','OLAK5uy_nGqJ_W3PqWIWpi3q4ZOkslRxIghqSixLI', new Date(2019, 8, 13),'cfbaa5')
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
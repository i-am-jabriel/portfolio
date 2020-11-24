import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Album{
    constructor(title,url,date,color,desc=''){
        Object.assign(this,{title,url,date,color,desc});
    }
    getTooltip(){
        return `${this.title}<br>Album Released:${getDate(this.date)}`;
    }
    getIcon(){
        return (<FontAwesomeIcon icon={faCompactDisc} />)
    }
}
export class TimelineDate{
    constructor(data){
        Object.assign(this,{data});
    }
}
export const albums = [
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

// /**
//  * Exporting some constants used in the files
//  * return {object}
//  */
// module.exports = {
//   // Left and right are used to control the direciton in which we want to translate our
//   // timeline
//   LEFT: 'left',
//   RIGHT: 'right',

//   // The keycodes of all the arrow keys (used for keyboard navigation)
//   LEFT_KEY: 37,
//   RIGHT_KEY: 39,
//   UP_KEY: 38,
//   DOWN_KEY: 40,

//   // Milliseconds in a given day (required to set the minimum seperation on events)
//   DAY: 86400000,
//   // Total length of the timeline in pixels
//   MIN_TIMELINE_WIDTH: 750,
//   // Minimum padding between two event labels
//   MIN_EVENT_PADDING: 20,
//   // Maximum padding between two event labels
//   MAX_EVENT_PADDING: 120,
//   // width of the area for text in the timeline
//   DATE_WIDTH: 85,
//   // Padding at end of timeline
//   TIMELINE_PADDING: 100,

//   // which events to trigger based on the left or the right arrow key on the keyboard is pressed
//   KEYMAP: {
//     37: 'left',
//     39: 'right'
//   }
// };

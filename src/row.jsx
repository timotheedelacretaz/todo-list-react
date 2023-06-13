import { format, formatDistanceToNow } from "date-fns";
import {Del, Done, Highlight} from "./function";




export function Listrow(x,i,todo,setTodo,colors,possibilities){
    return <div className="eachrow" id={x.id} key={x.id} style={{order:(i+(x.highlight==colors["white"]||x.highlight==colors["red"]?+0:-100)),backgroundColor:x.highlight}}>
    <button className="hbtn" onClick={()=>Highlight(x.id,[...todo],setTodo,colors,possibilities)}>Highlight</button>
    faire: {x.name} avant le: {format((new Date(x.date)),"cccc d MMMM y")} Temps restant :{new Date(x.date)>(new Date())?formatDistanceToNow(new Date(x.date)):"ecoulé"}
    <div className="btn"><button onClick={()=>Done(x.id,0,[...todo],setTodo)}>Done</button>
    <button onClick={()=>Done(x.id,1,[...todo],setTodo)}>Not Done</button>
    <button onClick={()=>Del(x.id,[...todo],setTodo)}>Delete</button>
    </div></div>
}
export function Histrow1(x,i,todo,setTodo,colors){
    return<div className="eachrow" key={x.id} style={{order:i,backgroundColor:colors["red2"]}}>   
        A faire: {x.name} {x.completed}
        <button onClick={()=>Del(x.id,todo,setTodo)}>Delete</button></div>
}
export function Histrow2(x,i,todo,setTodo,colors){
    return<div className="eachrow" key={x.id} style={{order:i,backgroundColor:colors["green"]}}>
    A faire: {x.name} fini le {format((new Date(x.completed)),"cccc d MMMM y 'à' H 'heure' m'm'")}
    <button onClick={()=>Del(x.id,[...todo],setTodo)}>Delete</button></div>
}
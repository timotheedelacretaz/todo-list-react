import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { nanoid } from "nanoid";
import {Histrow1,Histrow2,Listrow} from "./row";

function sortasc(a,b) {
    return new Date(a.date) - new Date(b.date)
}
function sortdes(a,b) {
    return new Date(b.date) - new Date(a.date)
}

export default function List(){
    useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 60000);
    return () => clearInterval(interval);});

    const handleKeypress = e => {
        if (e.keyCode === 13) {
          addTask();
        }
    };
    
    const [Input, setInput] = useState("");
    const [Input2, setInput2] = useState("");
    const [Input3, setInput3] = useState("");
    const [Sorting, setSorting] = useLocalStorage("tri",0);
    const [todo, setTodo] = useLocalStorage("todo",[])
    const [colors, setColors] = useLocalStorage("colors",(""))

    const regex = /(?:[2][0][2][3-9]|[2][0][3-9][0-9]|[2][1-9][0-9][0-9])[\W](?:[0][0-9]|[1][0-2])[\W](?:[0-2][0-9]|[3][0-1])/
    const input = <input type="text" onBlur={handleChange} onKeyDown={handleKeypress} placeholder="a faire"></input>
    const input2 = <input type="datetime-local" onBlur={handleChange2} onKeyDown={handleKeypress}></input>
    const btn=<button onClick={addTask}>add</button>
    const btn2=<button onClick={trier}>sort</button>
    const input3 = <input type="text" onChange={handleChange3} placeholder="search"></input>
    const possibilities = {
    [colors["white"]]: colors["blue"],
    [colors["red"]]: colors["purple"],
    [colors["blue"]]: colors["white"],
    [colors["purple"]]: colors["red"],
    }

    function handleChange (e) {
        setInput(e.target.value);
    };
    function handleChange2 (e) {
        setInput2(e.target.value);
    };
    function handleChange3 (e) {
        setInput3(e.target.value);
    };

    function addTask() {
        let h = 1
        todo.some((element) => {
            if (Input==element.name&&Input2==element.date) {
                h=0
            }
        });
        if (regex.test(Input2)&&h==1&&Input!="") {
            const newTask = {id: `todo-${nanoid()}`,name:Input,date:Input2,completed:"false",
            highlight:(new Date(Input2)>(new Date())? colors["white"]:colors["red"])};
            setTodo([...todo, newTask]);}
        else{alert("invalid entry")}
    }
    function refresh() {
        let v = todo.map((x)=>{if (new Date(x.date)<(new Date())) {
        if (x.highlight==colors["blue"]){x.highlight=colors["purple"]}
        else{x.highlight=colors["red"]}}
        return x})
        setTodo(v)
    }
    function trier(){
        if (Sorting==0) {setSorting(1)}
        else if (Sorting==1) {setSorting(2)}
        else{setSorting(0)}
    }
    
    let to = [...todo]
    if (Sorting==1){to = [...to].sort(sortasc);}
    else if (Sorting==2){to = [...to].sort(sortdes);}

    const items = to
    .filter(a=>a.completed=="false")
    .filter(a=>(a.name).includes(Input3))
    .map((x,i)=>{
    return Listrow(x,i,[...todo],setTodo,colors,possibilities)})

    
    return  <>
        <h1>List</h1>
        <div className="bar">{input}{input2}{btn}{btn2}{input3}</div>
        <div className="row">{items}</div>
    </>
}
import { useLocalStorage } from "usehooks-ts"
import { Histrow1, Histrow2 } from "./row"
import { useState } from "react";

export default function Historique() {
    const [todo, setTodo] = useLocalStorage("todo",[])
    const [Input4, setInput4] = useState("");
    const input4 = <input type="text" onChange={handleChange4} placeholder="search"></input>
    function handleChange4 (e) {
        setInput4(e.target.value);
    };
    const items2 = todo
    
    .filter(x=>x.completed!="false")
    .filter(a=>(a.name).includes(Input4))
    .map((x,i)=>
    {if (x.completed=="pas fini") {
        return Histrow1(x,i,[...todo],setTodo)
    }
    else{
        return Histrow2(x,i,[...todo],setTodo)}
    })

    return<>
        <div className="bar2"><h1>Historique</h1>{input4}</div>
        <div className="row">{items2}</div>
    </>
}import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";


export default function Colors() {

    const [todo, setTodo] = useLocalStorage("todo",[])
    const [colors, setColors] = useLocalStorage("colors",(""))
    const [Input5, setInput5] = useState("");
    const [Input6, setInput6] = useState("");
    const [Input7, setInput7] = useState("");
    const [Input8, setInput8] = useState("");
    const btn4=<button onClick={changecolors}>change theme</button>
    const btn5=<button onClick={resetcolors}>reset colors theme</button>
    const btn6=<button onClick={randomcolors}>random colors theme</button>
    const input5 = <input type="color" onChange={handleChange5}></input>
    const input6 = <input type="color" onChange={handleChange6}></input>
    const input7 = <input type="color" onChange={handleChange7}></input>
    const input8 = <input type="color" onChange={handleChange8}></input>
    function handleChange5 (e) {
        setInput5(e.target.value);
    };
    function handleChange6 (e) {
        setInput6(e.target.value);
    };
    function handleChange7 (e) {
        setInput7(e.target.value);
    };
    function handleChange8 (e) {
        setInput8(e.target.value);
    };
    function switchcol(a ="white",b= "rgb(180, 70, 70)",c="rgb(70, 70, 180)",d="rgb(180, 70, 180)") {
        setColors({
            white: a,
            red: b,
            blue: c,
            purple: d,
        })
    } 
    if (localStorage.getItem("colors")==null) {
        switchcol()
    }
    function changecolors() {
        switchcol(Input5,Input6,Input7,Input8)
        let y = todo.map((x)=>{
            if (x.highlight==colors["white"]){
                x.highlight = Input5
            }
            else if (x.highlight==colors["red"]){
                x.highlight = Input6
            }
            else if (x.highlight==colors["blue"]){
                x.highlight = Input7
            }
            else if (x.highlight==colors["purple"]){
                x.highlight = Input8
            }
            return x
        })
        setTodo(y)
    }
    function resetcolors(){
        switchcol()
        let y = todo.map((x)=>{
            if (x.highlight==colors["white"]){
                x.highlight = "white"
            }
            else if (x.highlight==colors["red"]){
                x.highlight = "rgb(180, 70, 70)"
            }
            else if (x.highlight==colors["blue"]){
                x.highlight = "rgb(70, 70, 180)"
            }
            else if (x.highlight==colors["purple"]){
                x.highlight = "rgb(180, 70, 180)"
            }
            return x
        })
        setTodo(y)
    }
    function randomRgbColor() {
        let r = Math.floor(Math.random() * 256); 
        let g = Math.floor(Math.random() * 256); 
        let b = Math.floor(Math.random() * 256); 
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    function randomcolors(){
        let a = randomRgbColor()
        let b = randomRgbColor()
        let c = randomRgbColor()
        let d = randomRgbColor()
        switchcol(a,b,c,d)
        let y = todo.map((x)=>{
            if (x.highlight==colors["white"]){
                x.highlight = a
            }
            else if (x.highlight==colors["red"]){
                x.highlight = b
            }
            else if (x.highlight==colors["blue"]){
                x.highlight = c
            }
            else if (x.highlight==colors["purple"]){
                x.highlight = d
            }
            return x
        })
        setTodo(y)
    }


    return <div className="theme"><h1>Theme</h1>
    <div>{input5}couleur date non depassée pas highlight</div>
    <div>{input6}couleur date depassée pas highlight</div>
    <div>{input7}couleur date non depassée highlight</div>
    <div>{input8}couleur date depassée highlight</div>
    <div>{btn4}{btn5}{btn6}</div></div>
    
}import { format, formatDistanceToNow } from "date-fns";
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
export function Histrow1(x,i,todo,setTodo){
    return<div className="eachrow" key={x.id} style={{order:i,backgroundColor:"rgb(180, 70, 70)"}}>   
        A faire: {x.name} {x.completed}
        <button onClick={()=>Del(x.id,todo,setTodo)}>Delete</button></div>
}
export function Histrow2(x,i,todo,setTodo){
    return<div className="eachrow" key={x.id} style={{order:i,backgroundColor:"rgb(70, 140, 0)"}}>
    A faire: {x.name} fini le {format((new Date(x.completed)),"cccc d MMMM y 'à' H 'heure' m'm'")}
    <button onClick={()=>Del(x.id,[...todo],setTodo)}>Delete</button></div>
}export function Highlight(x,todo,setTodo,colors,possibilities){
    let  y = todo.map((y) => {
        if (x==y.id){y.highlight = possibilities[y.highlight] ?? colors["white"]}
        return y})
    setTodo(y);
}
export function Done(x,z,todo,setTodo){
    let y = todo.filter(g=>g.id==x)[0]
        if (z==0){y.completed = String(new Date());}
        else{y.completed = "pas fini";}
        const newTask = {id: y.id,name:y.name,date:y.date,completed:y.completed,highlight:y.highlight};
        setTodo([...(todo.filter(g=>g.id!=x)), newTask]);
}
export  function Del(x,todo,setTodo){
    setTodo([...(todo.filter(g=>g.id!=x))])
}
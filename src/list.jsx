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

    if (localStorage.getItem("tri")==null) {
        localStorage.setItem("tri",0)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 10000);
    return () => clearInterval(interval);});

    const handleKeypress = e => {
        if (e.keyCode === 13) {
          addTask();
        }
    };

    const [Sorting, setSorting] = useLocalStorage("tri",0);
    const [todo, setTodo] = useLocalStorage("todo",[])
    const [colors, setColors] = useLocalStorage("colors",(""))
    const [Input, setInput] = useState("");
    const [Input2, setInput2] = useState("");
    const [Input3, setInput3] = useState("");

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
        todo.filter(a=>a.completed=="false")
        .some((element) => {
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
        else if (x.highlight==colors["white"]){x.highlight=colors["red"]}}
        else{x.highlight=x.highlight}
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

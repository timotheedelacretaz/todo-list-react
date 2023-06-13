import { useLocalStorage } from "usehooks-ts"
import { Histrow1, Histrow2 } from "./row"
import { useState } from "react";

export default function Historique() {
    const [colors, setColors] = useLocalStorage("colors",("")) 
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
        return Histrow1(x,i,[...todo],setTodo,colors)
    }
    else{
        return Histrow2(x,i,[...todo],setTodo,colors)}
    })

    return<>
        <div className="bar2"><h1>Historique</h1>{input4}</div>
        <div className="row">{items2}</div>
    </>
}
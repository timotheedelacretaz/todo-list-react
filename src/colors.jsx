import { useState } from "react";
import rgbHex from "rgb-hex";
import { useLocalStorage } from "usehooks-ts";


export default function Theme() {
    if (localStorage.getItem("colors")==null) {
        localStorage.setItem("colors",JSON.stringify({
            white: "#FFFFFF",
            red: "#B44646",
            blue: "#4646B4",
            purple: "#B446B4",
            red2: "#B44646",
            green: "#468C00",
        }))
    }
    const [todo, setTodo] = useLocalStorage("todo",[])
    const [colors, setColors] = useLocalStorage("colors",(""))
    const [Input5, setInput5] = useState("");
    const [Input6, setInput6] = useState("");
    const [Input7, setInput7] = useState("");
    const [Input8, setInput8] = useState("");
    const [Input9, setInput9] = useState("");
    const [Input10, setInput10] = useState("");
    
    const btn4=<button onClick={changecolors}>change theme</button>
    const btn5=<button onClick={resetcolors}>reset colors theme</button>
    const btn6=<button onClick={randomcolors}>random colors theme</button>
    const input5 = <input type="color" value={Input5==colors["white"]?colors["white"]:Input5} onChange={handleChange5}></input>
    const input6 = <input type="color" value={Input6==colors["red"]?colors["red"]:Input6} onChange={handleChange6}></input>
    const input7 = <input type="color" value={Input7==colors["blue"]?colors["blue"]:Input7} onChange={handleChange7}></input>
    const input8 = <input type="color" value={Input8==colors["purple"]?colors["purple"]:Input8} onChange={handleChange8}></input>
    const input9 = <input type="color" value={Input9==colors["red2"]?colors["red2"]:Input9} onChange={handleChange9}></input>
    const input10 = <input type="color"value={Input10==colors["green"]?colors["green"]:Input10} onChange={handleChange10}></input>
    

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
    function handleChange9 (e) {
        setInput9(e.target.value);
    };
    function handleChange10 (e) {
        setInput10(e.target.value);
    };
    if (Input5=="") {
        setInput5(colors["white"])
    }
    if (Input6=="") {
        setInput6(colors["red"])
    }
    if (Input7=="") {
        setInput7(colors["blue"])
    }
    if (Input8=="") {
        setInput8(colors["purple"])
    }
    if (Input9=="") {
        setInput9(colors["red2"])
    }
    if (Input10=="") {
        setInput10(colors["green"])
    }
    function switchcol(a ="#FFFFFF",b= "#B44646",c="#4646B4",d="#B446B4",e= "#B44646",f="#468C00") {
        setColors({
            white: a,
            red: b,
            blue: c,
            purple: d,
            red2: e,
            green: f,
        })
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
        else if (x.highlight==colors["red2"]){
            x.highlight = e
        }
        else if (x.highlight==colors["green"]){
            x.highlight = f
        }
        return x
        })
        setTodo(y)
    } 
    function changecolors() {
        let arr = [Input5,Input6,Input7,Input8]
        let g =arr.filter((item, index) => arr.indexOf(item) !== index)
        if (g.length==0){ 
            switchcol(Input5,Input6,Input7,Input8,Input9,Input10)
        
        }
        else{alert("invalid entry")}
    } 


    function resetcolors(){
        switchcol()
        setInput5("#FFFFFF")
        setInput6("#B44646")
        setInput7("#4646B4")
        setInput8("#B446B4")
        setInput9("#B44646")
        setInput10("#468C00")
    }

    function randomRgbColor() {
        let r = Math.floor(Math.random() * 256); 
        let g = Math.floor(Math.random() * 256); 
        let b = Math.floor(Math.random() * 256); 
        let o ='rgb(' + r + ',' + g + ',' + b + ')';
        return "#"+rgbHex(o)
    };

    function randomcolors(){
        let a = randomRgbColor()
        let b = randomRgbColor()
        let c = randomRgbColor()
        let d = randomRgbColor()
        let e = randomRgbColor()
        let f = randomRgbColor()
        setInput5(a)
        setInput6(b)
        setInput7(c)
        setInput8(d)
        setInput9(e)
        setInput10(f)
        switchcol(a,b,c,d,e,f)  
    }


    return <div className="theme"><h1>Theme</h1>
    <div>les 4 premières couleur doivent être différentes</div><br></br>
    <div>{input5}couleur date non depassée pas highlight</div>
    <div>{input6}couleur date depassée pas highlight</div>
    <div>{input7}couleur date non depassée highlight</div>
    <div>{input8}couleur date depassée highlight</div>
    <div>{input9}couleur historique pas fini</div>
    <div>{input10}couleur historique fini</div><br></br>
    <div>{btn4}{btn5}{btn6}</div></div>
    
}
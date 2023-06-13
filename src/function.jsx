export function Highlight(x,todo,setTodo,colors,possibilities){
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
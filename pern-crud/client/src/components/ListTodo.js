import React ,{ useEffect, useState} from 'react';
import { EditTodo } from './EditTodo';
import axios from 'axios';

export const ListTodo = () => {
    const [todos, setTodos] = useState([])
    // const getTodo = async () =>{
    //     try {
    //         const response = await fetch("http://localhost:5000/todos")
    //         const jsonData = await response.json();
    //         setTodos(jsonData)
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }
    // useEffect(()=>{
    //     getTodo()
    // },[])
    console.log(todos)

    const getTodo = async () =>{
      try {
        const response = await axios.get("http://localhost:5000/todos");
        setTodos(response.data)
        // console.log(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }

    useEffect(()=>{
     getTodo();
    },[])

       // delete data
       const deleteTodo = async (id) =>{
        try {
            const deletetodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            })
            setTodos(todos.filter(todo=> todo.todo_id !== id))
            
        } catch (error) {
            console.error(error.message)
        }  
      }
  return (
    <div className='container mt-3'>
        <table className="table text-left">
  <thead>
    <tr>
      <th>Description</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
 
 {
   todos &&  todos.map((todo, i) =>{
       return(
        <tr key={todo.todo_id}>
        <td>{todo.description}</td>
        <td><EditTodo todo={todo}/></td>
        <td><button className='btn btn-danger' onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
       )
     })
 }
  </tbody>
</table>
    </div>
  )
}

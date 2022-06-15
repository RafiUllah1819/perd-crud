import React , {useState} from 'react';
import axios from 'axios';

export const InputTodo = () => {
    const [description, setDescription] = useState("")

    // add data
    // const onSubmitForm = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const body = {description}
    //         const response = await fetch("http://localhost:5000/todos",{
    //             method: "POST",
    //             headers : {"Content-Type":"application/json"},
    //             body: JSON.stringify(body)
    //         })
    //         window.location ="/"
    //         // console.log(response)
    //     } catch (error) {
    //        console.error(error.message) 
    //     }
    // }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const obj = {description}
           const response = await axios.post("http://localhost:5000/todos", obj);
           console.log("response" , response)
           window.location ="/"
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <div className='container'>
        <h3>Todo List</h3>
        <form className='d-flex' onSubmit={onSubmitForm}>
        <input type="text" className="form-control" value={description}
        onChange={e => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>Add</button>
        </form>
    </div>
  )
}

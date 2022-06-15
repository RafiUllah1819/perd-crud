const express = require('express');
const app = express();
const cors = require("cors");
const pool = require('./db');

// middleware   
app.use(cors());
app.use(express.json());

// routes 
app.post("/todos", async(req,res) =>{
    try {
       const {description} = req.body;
       const newTodo = await pool.query(
           "INSERT INTO todo (description) VALUES($1) RETURNING *",
           [description]
       );
       res.json(newTodo)
    } catch (error) {
        console.error(error.message)
    }
})

// GET ALL TODOS
app.get("/todos", async(req,res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// GET A TODO
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1" , [id])
        res.json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// UPDATE A TODO
app.put("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated")
    } catch (error) {
        console.error(message.error)
    }
})

//DELETE A TODO
app.delete("/todos/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("todo was deleted!")
    } catch (error) {
        console.error(message.error)
    }
})
 
app.listen(5000, () => {
    console.log("server started on port 5000");
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const {
    getTodos, createTodos, updateTodo, deleteTodo,
} = require('./Controllers/todoController.js');

const app = express();
const connectionURL = process.env.MONGO_URI
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect(connectionURL)
.then(()=>{
    app.listen(port, () => console.log(`Running on port:${port}`));
})
.catch((err) => {
    console.error(err);
})

//API Connection
//Get todo list
app.get('/todos', getTodos)
//Create a Todo
app.post('/todos', createTodos)
//Update a todo
app.put('/todos/:id', updateTodo)
//delete a todo
app.delete('/todos/:id', deleteTodo)
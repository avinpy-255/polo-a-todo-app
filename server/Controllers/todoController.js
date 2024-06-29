const mongoose = require('mongoose')
const Todos = require('../dbTodos')

//getting Todos
const getTodos = async (req, res) => {
    try{
     const allTodos = await Todos.find({}).sort({ createdAt: -1 })
     res.status(200).send(allTodos)
    } catch(error) {
       res.status(400).send(error.message)
    }
}

const createTodos = async (req, res) => {
    console.log('Request body:', req.body); 
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).send('Title is required');
    }

    try {
        const newTodo = await Todos.create({ title, description });
        res.status(201).send(newTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid todo ID" });
    }

    const update = {};
    if (title) {
      update.title = title; 
    }
    if (description){
        update.description = description; 
    }

    const updatedTodo = await Todos.findByIdAndUpdate(
      id,
      update, 
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



const deleteTodo = async (req, res) => {
    const {id} = req.params;
    try{
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`There is todo with the id of ${id}`)
    }
    const deleteTodo = await Todos.findByIdAndDelete(id);
    res.status(200).send(deleteTodo)
    } catch(error) {
    res.status(500).send(error.message)
    }
}



module.exports = {
    getTodos, createTodos, updateTodo, deleteTodo,
}
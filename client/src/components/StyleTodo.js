import React, { useState } from "react";
import axios from "axios";

const StyleTodo = ({todos, fetchData}) => {
  const [editingTodos, setEditingTodos] = useState({}); 
  const [editedTitles, setEditedTitles] = useState({});
  const [editedDescription, setEditedDescription] = useState({});

  const handleEditToggle = (todoId) => {
    setEditingTodos((prev) => ({ ...prev, [todoId]: !prev[todoId] })); 
    setEditedTitles((prev) => ({ ...prev, [todoId]: todos.find(t => t._id === todoId).title })); 
    setEditedDescription((prev) => ({ ...prev, [todoId]: todos.find(t => t._id === todoId).description }));
  };

  const updateTodo = async (id) => {
    try {
      await axios.put(`http://localhost:8000/todos/${id}`, {
        title: editedTitles[id],
        description: editedDescription[id],
      });
      fetchData();
      setEditingTodos((prev) => ({ ...prev, [id]: false })); 
    } catch (error) {
      console.error("Error updating todo:", error);
      
    }
  };
  return (
    <div className="bg-lime-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {todos?.map((todo) => (
      <div
        key={todo._id}
        className={`bg-lime-100 rounded-lg shadow-md p-4 
         `}
      >
        {editingTodos[todo._id] ? (
          <>
            <input
              type="text"
              value={editedTitles[todo._id]}
              onChange={(e) =>
                setEditedTitles((prev) => ({ ...prev, [todo._id]: e.target.value }))
              }
            />
            <button onClick={() => updateTodo(todo._id)}>Save</button>
          </>
        ) : (
          <>
            <h2
              className="text-lg text-center font-mono font-bold mb-2"
              onClick={() => handleEditToggle(todo._id)}
            >
              {todo.title}
            </h2>
          </>
        )}
      </div>
    ))}
  </div>
  )
}

export default StyleTodo
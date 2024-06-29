import React, { useState } from "react";
import axios from "axios";

const ViewTodo = ({todos, fetchData}) => {
  const [editingTodos, setEditingTodos] = useState({});
  const [editedTitles, setEditedTitles] = useState({});
  const [editedDescription, setEditedDescription] = useState({});

  const handleEditToggle = (todoId) => {
    setEditingTodos((prev) => ({ ...prev, [todoId]: !prev[todoId] }));
    setEditedTitles((prev) => ({
      ...prev,
      [todoId]: todos.find((t) => t._id === todoId).title,
    }));
    setEditedDescription((prev) => ({
      ...prev,
      [todoId]: todos.find((t) => t._id === todoId).description,
    }));
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
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`); 
      fetchData(); // Refetch todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Handle errors here (display to the user, etc.)
    }
  };
  return (
    <div className="bg-green-800 h-dvh mt-3 px-6 py-6 ">
      <div>
        {todos?.map((todo) => (
          <div
            key={todo._id}
            className={`bg-green-800 rounded-lg shadow-md p-4 
       `}
          >
            {editingTodos[todo._id] ? (
              <>
                <input
                  type="text"
                  className="bg-green-600 rounded-lg text-2xl font-mono text-green-200"
                  value={editedTitles[todo._id]}
                  onChange={(e) =>
                    setEditedTitles((prev) => ({
                      ...prev,
                      [todo._id]: e.target.value,
                    }))
                  }
                />
                <button onClick={() => updateTodo(todo._id)}>✏️</button>
              </>
            ) : (
              <>
                <h2
                  className="text-3xl  font-mono font-bold mb-2 text-green-200"
                  onClick={() => handleEditToggle(todo._id)}
                >
                  {todo.title}
                </h2>
              </>
            )}
            <button // Delete button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTodo;

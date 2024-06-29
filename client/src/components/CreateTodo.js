import React, { useState, useEffect } from "react";
import axios from "../axios";
import ViewTodo from "./ViewTodo";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  const addTodo = async (e) => {
    e.preventDefault();
    if (title.length === 0) return;

    try {
      await axios.post("/todos", {
        title: title,
      });
      fetchData();
      setTitle("");
      console.log("addedTodo");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  return (
    <div className="bg-green-700 shadow-md px-3 py-3">
      <input
        className="text-xl text-lime-200 font-bold bg-green-700 rounded-lg"
        placeholder="Enter todo title here"
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      {/* <input
        className="text-sm text-lime-200 font-bold bg-green-700 rounded-lg"
        placeholder="Enter Description"
        type="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}
      <div className="flex justify-between items-center mt-1.5">
        <button
          className="btn btn-primary font-mono bg-green-300 rounded-lg px-1 font-bold italic py-1"
          type="submit"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ViewTodo todos={todos} fetchData={fetchData} />
    </div>
    
  );
};

export default CreateTodo;

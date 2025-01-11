import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const AssignedTodo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { _id } = useParams();

    useEffect(() => {
        const getAllTodoOfstudent= async()=>{
            try {
                console.log(_id)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND}/todo/student/all-todo`,{
                    withCredentials:true,
                    params:{studentId:_id}
                })
                console.log("todos",response.data)
                if(response.data){
                    setTodos(response.data.data)
                    setLoading(false)
                }
            } catch (error) {
                setError("Failed to fetch todo")
            }
        }
        getAllTodoOfstudent()
    }, [_id]);

    const markAsComplete = async (todo) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND}/todo/verfiy-by-student`;
            const response = await axios.patch(url, null, {
                withCredentials: true,
                params: {
                    todoId: todo._id,
                    studentId: todo.studentId
                }
            });

            if (response.data.success) {
                const updatedTodos = todos.map((task) =>
                    task._id === todo._id
                        ? { ...task, verifyRequest: true, virtualCurrency: task.points } // Assuming points is the currency amount
                        : task
                );
                setTodos(updatedTodos);
            }
        } catch (error) {
            console.error("Error marking as complete:", error);
            setError("Failed to mark task as complete");
        }
    };

    return (
        <>
            <Navbar />
            <div className="todo-container">
                <h1>Student To-Do List</h1>
                <hr />
                <br />
                <br />

                {error && <p className="error-message">{error}</p>}

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <ul className="todo-list">
                        {todos.map((todo) => (
                            <li
                                key={todo._id} // Corrected to _id for uniqueness
                                className={`todo-item ${todo.completed ? "completed" : ""}`} // Fixed className string concatenation
                            >
                                <div>
                                    <p className="todo-title">Title: {todo.title}</p>
                                    <p className="todo-description">Description: {todo.description}</p>
                                    <p className="todo-points">Virtual Currency: {todo.points}</p>

                                    <p className="currency-assigned">
                                        {todo.completed
                                            ? "completed"
                                            : todo.verifyRequest ? "Pending Verification" : "Verify The Todo"}
                                    </p>
                                </div>
                                {!todo.verifyRequest && (
                                    <button
                                        className="mark-btn"
                                        onClick={() => markAsComplete(todo)}
                                    >
                                        Mark as Verify
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default AssignedTodo;
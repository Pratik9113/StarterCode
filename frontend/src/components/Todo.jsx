import React, { useEffect, useState } from "react";
import axios from "axios"
const Todo = ({ user, handleCloseModal }) => {
    const [todo, setTodo] = useState({
        title: "",
        description: "",
        points: "",
        date: "",
        completed: false,
    });

    const [todos, setTodos] = useState([]);
    const [currState, setCurrState] = useState("ADD TODO");

    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setTodo({
            ...todo,
            [id]: value,
        });
    };

    const handlePointsChange = (e) => {
        setTodo({
            ...todo,
            points: e.target.value,
        });
    };


    const onAddHandler = async (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_BACKEND}/todo/add`
        try {
            const response = await axios.post(url, todo, {
                withCredentials: true,
                params: {
                    studentId: user._id
                }
            })

            if (response.data.success) {
                setTodos([...todos, response.data.data]);
            }
        } catch (error) {
            alert(error);
        }
    }


    useEffect(() => {
        const getTodo = async () => {
            const url = `${import.meta.env.VITE_BACKEND}/todo/get`
            try {
                const response = await axios.get(url, {
                    withCredentials: true,
                    params:{
                        studentId:user._id
                    }
                })
                if (response.data.success) {
                    setTodos(response.data.data);
                }
            } catch (error) {
                alert(error);
            }
        }
        getTodo();
    }, [])


    const onUpdateHandler = async () => {
        const updateTodo = { ...todo, date: formatDate(todo.date) };
        try {
            const url = `${import.meta.env.VITE_BACKEND}/todo/update`
            const response = await axios.put(url, updateTodo, {
                withCredentials: true,
                params: {
                    id: updateTodo._id
                }
            })
            if (response.data.success) {
                alert("Success Update");
            }
        } catch (error) {
            alert(error);
        }
    }


    const onDeleteHandler = async (index) => {
        const todoId = todos[index]._id;
        try {
            const url = `${import.meta.env.VITE_BACKEND}/todo/delete`
            const response = await axios.delete(url, {
                withCredentials: true,
                params: {
                    id: todoId
                }
            })
            if (response.data.success) {
                alert("delete Success");
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleTodo = (e) => {
        if (currState === 'ADD TODO') {
            onAddHandler(e);
        } else {
            onUpdateHandler(e);
        }
    }


    const onEditTodo = async (index) => {
        const selectedTodo = todos[index];
        setTodo({
            title: selectedTodo.title,
            description: selectedTodo.description,
            points: selectedTodo.points,
            date: formatDate(selectedTodo.date),
            completed: selectedTodo.completed,
            _id: selectedTodo._id
        });
        setCurrState("UPDATE TODO");
    }


    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-child-container" >
                    <button className="close-btn" onClick={handleCloseModal}>
                        X
                    </button>
                    <h3>Assign Todo to <br /> '{user.name}'</h3>

                    <div className="todo-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={todo.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter Todo task"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={todo.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Set Virtual Currencies:</label> <br />
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="points"
                                            value="1"
                                            checked={todo.points === "1"}
                                            onChange={handlePointsChange}
                                        />
                                        1 VC's
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="points"
                                            value="2"
                                            checked={todo.points === "2"}
                                            onChange={handlePointsChange}
                                        />
                                        2 VC's
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="points"
                                            value="3"
                                            checked={todo.points === "3"}
                                            onChange={handlePointsChange}
                                        />
                                        3 VC's
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="points"
                                            value="4"
                                            checked={todo.points === "4"}
                                            onChange={handlePointsChange}
                                        />
                                        4 VC's
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={todo.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn" onClick={handleTodo}>
                                {currState}
                            </button>
                        </form>
                    </div>
                </div>



                <div className="todo-assigned">
                    <center><h3>Assigned Todos:</h3> </center><br />
                    <div className="todo-cards">
                        {todos.map((task, index) => (
                            <div className="todo-card" key={index}>
                                <h5>{task.title}</h5>
                                <p className="todo-desc">{task.description}</p>
                                <span>Virtual Currencies Assigned: {task.points}</span>
                                <span>Date: {task.date}</span>
                                <div className="todo-actions">
                                    <button
                                        onClick={() => onEditTodo(index)}
                                        className="check-btn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => onDeleteHandler(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
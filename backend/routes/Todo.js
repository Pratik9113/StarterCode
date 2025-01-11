import express from "express"
import jwtAuth from "../middleware/auth.js"
import { addTodo, deleteTodo, getTodo, updateTodo } from "../controllers/TodoController.js"

const  TodoRouter = express.Router()

TodoRouter.post("/add", jwtAuth, addTodo);
TodoRouter.get("/get", jwtAuth, getTodo);

TodoRouter.put("/update", jwtAuth, updateTodo);

TodoRouter.delete("/delete", jwtAuth, deleteTodo);

export default TodoRouter

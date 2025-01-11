import express from "express"
import jwtAuth from "../middleware/auth.js"
import { addTodo, deleteTodo, getTodo, updateTodo ,verifyTodoforStudent,fetchVerifyTodoForNgo,updateTodoandCurrency,getAllTodoOfStudent} from "../controllers/TodoController.js"

const  TodoRouter = express.Router()

TodoRouter.post("/add", jwtAuth, addTodo);
TodoRouter.get("/get", jwtAuth, getTodo);

TodoRouter.put("/update", jwtAuth, updateTodo);
TodoRouter.get("/student/all-todo",jwtAuth,getAllTodoOfStudent)
TodoRouter.delete("/delete", jwtAuth, deleteTodo);

TodoRouter.patch('/verfiy-by-student',jwtAuth,verifyTodoforStudent);
TodoRouter.get('/get-all-todo',jwtAuth,fetchVerifyTodoForNgo);
TodoRouter.patch('/update-todo-currency',jwtAuth,updateTodoandCurrency)

export default TodoRouter

import express from "express"
import { NgoSignIn, NgoSignUp } from "../controllers/loginController.js"
import { StudentSignIn, StudentSignUp } from "../controllers/loginController.js"

const  LoginRouter = express.Router()

LoginRouter.post("/ngo-login", NgoSignIn)
LoginRouter.post("/ngo-signup", NgoSignUp)
LoginRouter.post("/student-login", StudentSignIn);
LoginRouter.post("/student-signup", StudentSignUp);

export default LoginRouter

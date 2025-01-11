import express from "express"
import { logoutController, NgoSignIn, NgoSignUp } from "../controllers/loginController.js"
import { StudentSignIn, StudentSignUp } from "../controllers/loginController.js"
import jwtAuth from "../middleware/auth.js"

const  LoginRouter = express.Router()

LoginRouter.post("/ngo-login", NgoSignIn)
LoginRouter.post("/ngo-signup", NgoSignUp)
LoginRouter.post("/student-login", StudentSignIn);
LoginRouter.post("/student-signup", StudentSignUp);
LoginRouter.get('/logout',jwtAuth,logoutController)

export default LoginRouter

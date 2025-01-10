import express from "express"
import jwtAuth from "../middleware/auth.js"
import ProfileController from "../controllers/ProfileController.js"

const  ProfileRouter = express.Router()

ProfileRouter.get('/profile', jwtAuth, ProfileController);

export default ProfileRouter

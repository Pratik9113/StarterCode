import express from "express"
import jwtAuth from "../middleware/auth.js"
import {ProfileController, getStudentProfile } from "../controllers/ProfileController.js"

const  ProfileRouter = express.Router()

ProfileRouter.get('/profile', jwtAuth, ProfileController);
ProfileRouter.get('/get-student-for-ngo', jwtAuth, getStudentProfile)

export default ProfileRouter

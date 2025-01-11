import express from "express"
import jwtAuth from "../middleware/auth.js"
import {ProfileController, getStudentProfileForNgo } from "../controllers/ProfileController.js"

const  ProfileRouter = express.Router()

ProfileRouter.get('/profile', jwtAuth, ProfileController);
ProfileRouter.get('/get-student-for-ngo', jwtAuth, getStudentProfileForNgo)

export default ProfileRouter

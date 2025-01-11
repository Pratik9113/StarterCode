import NgoModel from "../models/Ngo.js";
import StudentModel from "../models/Student.js";

const ProfileController = async(req, res) => {
    const userId = req.userId;
    try {
        const studentProfile = await StudentModel.findOne({_id:userId});
        return res.status(200).json({success:true, data:studentProfile})
    } catch (error) {
        console.log(error);
    
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


const getStudentProfileForNgo  = async(req, res) => {
    const userId = req.userId;
    console.log("userId", userId);
    try {
        const getStudentProfile = await NgoModel.findById({_id: userId}).populate("student");
        console.log("getStudent : " ,getStudentProfile);
        return res.status(200).json({success:true, data:getStudentProfile})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


export  {ProfileController, getStudentProfileForNgo};
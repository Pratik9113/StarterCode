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


export default ProfileController;
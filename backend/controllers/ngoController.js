import NgoModel from "../models/Ngo.js";

const getAllNgo = async(req ,res)=>{
    const ngo = await NgoModel.find()
    console.log("All ngos are",ngo)
    res.status(200).json({message:"All Ngos are fetched successfully",ngo})
}

export {getAllNgo}
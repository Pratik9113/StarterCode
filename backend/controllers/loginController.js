import jwt from "jsonwebtoken";
import NgoModel from "../models/Ngo.js";
import StudentModel from "../models/Student.js";

const NgoSignUp = async (req, res) => {
  const { name, address, email, password, contact } = req.body;
  if (!name || !address || !email || !password || !contact)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const ngo = await NgoModel.findOne({ email });
    if (ngo)
      return res.status(409).json({
        success: false,
        message: "Ngo is already registered with the same email",
      });

    const newNgo = new NgoModel({
      name,
      address,
      email,
      password,
      contact,
    });

    await newNgo.save();
    const token = jwt.sign({ userId: newNgo._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.cookie("tokenNgo", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400000
      
    });

    return res
      .status(201)
      .json({ success: true, message: "Ngo successfully signed up" ,ngo});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during sign up" });
  }
};

const NgoSignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const ngo = await NgoModel.findOne({ email });
    if (!ngo) {
      return res
        .status(404)
        .json({ success: false, message: "Ngo not found. Please sign up" });
    }

    if (ngo.password === password) {
      const token = jwt.sign({ userId: ngo._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.cookie("tokenNgo", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400000
      });

      return res
        .status(200)
        .json({ success: true, message: "Ngo successfully signed in",ngo });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during sign in" });
  }
};

const StudentSignUp = async (req, res) => {
  const { name, address, email, password, age, income } = req.body;
  const { ngoId } = req.query;

  if (!name || !address || !email || !password || !age || !income)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const student = await StudentModel.findOne({ email });
    if (student)
      return res.status(409).json({
        success: false,
        message: "Student is already registered with the same email",
      });

    const newStudent = new StudentModel({
      name,
      email,
      age,
      address,
      income,
      password,
      ngo: ngoId,
    });

    await newStudent.save();

    const ngo = await NgoModel.findById(ngoId);
    if (ngo) {
      ngo.requests.push(newStudent._id);
      ngo.student.push(newStudent._id);
      await ngo.save();
    }

    const token = jwt.sign({ userId: newStudent._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.cookie("tokenUser", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400000
    });

    return res
      .status(201)
      .json({ success: true, message: "Student successfully signed up" ,student});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during sign up" });
  }
};

const StudentSignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });

  try {
    const student = await StudentModel.findOne({ email });
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found. Please sign up" });

    if (student.password === password) {
      const token = jwt.sign({ userId: student._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res.cookie("tokenUser", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400000
      });

      return res
        .status(200)
        .json({ success: true, message: "Student successfully signed in" ,student});
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during sign in" });
  }
};


const logoutController = async(req,res)=>{
  const tokenNgo = req.cookies.tokenNgo;
  console.log(tokenNgo)
  try {
    if(tokenNgo){
      res.clearCookie('tokenNgo')
      res.status(200).json({msg:'Ngo signout successfully'})
    }else{
      res.clearCookie('tokenUser')
      res.status(200).json({msg:'Student signout successfully'})
    }
  } catch (error) {
    console.log("Failed to delete the cookies")
    res.status(500).json({msg:"Something went wrong"})
  }
  
}



export { NgoSignUp, NgoSignIn, StudentSignUp, StudentSignIn ,logoutController};
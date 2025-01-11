import StudentModel from "../models/Student.js";
import todoModel from "../models/Todo.js";
import NgoModel from "../models/Ngo.js"

const addTodo = async (req, res) => {
    const { studentId } = req.query;
    const { title, date, description, points } = req.body;
    try {
        const addTodo = new todoModel({
            title,
            description,
            date,
            points,
            studentId: studentId
        })
        await addTodo.save()

        res.status(200).json({ success: true, data: addTodo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


const getTodo = async (req, res) => {
    const { studentId } = req.query;
    try {
        const data = await todoModel.find({ studentId: studentId }).populate("studentId");
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


const updateTodo = async (req, res) => {
    const { title, date, description, points } = req.body;
    const { id } = req.query;
    try {
        const data = await todoModel.findByIdAndUpdate({ _id: id }, {
            title,
            description,
            date,
            points
        }, {
            new: true
        });

        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}



const getAllTodoOfStudent = async(req,res)=>{
    const {studentId}=req.query
    try {
        const data = await todoModel.find({studentId:studentId}).populate('studentId'); //populate is used to get the details of the student, .populate('studentId',"name email income") This will populate _id, name, email and income only. If full info about mentioned student then use .populate("studentId")
        console.log(data)
        res.status(200).json({
            message:"All todos",
            data
        })
    } catch (error) {
        console.log("Error while fetching all todos",error)
        res.status(500).json({message:"Error occured while fetching all todos"})
    }
}


const deleteTodo = async (req, res) => {
    const { id } = req.query;
    try {
        const data = await todoModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


const verifyTodoforStudent = async (req, res) => {
    const { studentId, todoId } = req.query;
    console.log(todoId)

    try {
        const todo = await todoModel.findByIdAndUpdate(todoId, {
            verifyRequest: true
        }, { new: true })

        const student = await StudentModel.findById( studentId )

        const ngo = await NgoModel.findById(student.ngo)

        ngo.todoRequests.push(todo._id)

        await ngo.save()
        return res.status(200).json({ success: true, msg: "updated successfully" })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ msg: "Internal server error" })
    }

}

// Ngo dashboard mein ye data dikhega
const fetchVerifyTodoForNgo = async (req, res) => {

    const ngoId = req.userId;
    try {

        const ngo = await NgoModel.findById(ngoId).populate({
            path: 'todoRequests',
            populate: {
                path: 'studentId'
            }
        })

        // Debugging
        console.log("Ngos", ngo)
        res.status(200).json({ success: true, ngo })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({ msg: "Internal server error" })
    }
}


const updateTodoandCurrency = async (req, res) => {

    const { studentId, todoId } = req.query;
    console.log(todoId)

    try {

        const todo = await todoModel.findByIdAndUpdate(todoId, {
            completed: true
        }, { new: true })

        console.log(todo)

        const student = await StudentModel.findByIdAndUpdate(studentId, {
            $inc: {
                virtualCurrency: todo.points || 0
            }
        })

        const ngo = await NgoModel.findOne({ "todoRequests": todoId })

        ngo.todoRequests = ngo.todoRequests.filter((request) => !request.equals(todoId));
        await ngo.save();

        res.status(200).json({ success: true, msg: "update the todo and currency", data: ngo })

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ msg: "Internal server error" })
    }

}


export { addTodo, getTodo, updateTodo, deleteTodo, verifyTodoforStudent, fetchVerifyTodoForNgo, updateTodoandCurrency,getAllTodoOfStudent }
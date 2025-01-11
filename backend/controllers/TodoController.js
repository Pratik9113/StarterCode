import todoModel from "../models/Todo.js";

const addTodo = async(req, res) => {
    const {studentId} = req.query;
    const {title, date, description, points} = req.body;
    try {
        const addTodo = new todoModel({
            title,
            description,
            date,
            points,
            studentId : studentId
        })
        await addTodo.save()

        res.status(200).json({success:true,data:addTodo});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


const getTodo = async (req,res) => {
    const {studentId} = req.query;
    try {
        const data = await todoModel.find({studentId: studentId}).populate("studentId");
        res.status(200).json({success:true, data:data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


const updateTodo = async(req,res) => {
    const {title, date, description, points} = req.body;
    const {id} = req.query;
    try {
        const data = await todoModel.findByIdAndUpdate({_id:id}, {
            title,
            description,
            date,
            points
        },{
            new:true
        });

        res.status(200).json({success:true, data:data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


const deleteTodo = async(req,res) => {
    const {id} = req.query;
    try {
        const data = await todoModel.findByIdAndDelete(id);
        res.status(200).json({success:true, data:data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}
export {addTodo, getTodo, updateTodo, deleteTodo}
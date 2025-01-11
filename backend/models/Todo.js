import mongoose from 'mongoose';

// Define the schema for Todos
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true,
        min: 0 // Ensure points are non-negative
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Reference the 'Student' model by name
    },
    verifyRequest: {
        type: Boolean,
        default: false
    }
});

// Export the Todo model
const todoModel = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
export default todoModel;
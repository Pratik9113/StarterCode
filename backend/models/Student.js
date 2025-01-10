import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  income: { type: Number, required: true },
  password: { type: String, required: true },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
    required: true,
  },
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },
  virtualCurrency: { type: Number, default: 0 },
  // `This is the list of videos that are buyed by a student.
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const StudentModel =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default StudentModel;
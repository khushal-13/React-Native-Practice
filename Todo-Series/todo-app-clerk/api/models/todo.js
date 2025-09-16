import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    dueDate: {
        type: String,
        required: true
    }, 
    createdDate: {
        type: Date,
        default: Date.now
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // links to User
    required: true,
  },
});

const Todo =  mongoose.model("Todo", todoSchema);
export default Todo;
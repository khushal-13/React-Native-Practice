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
    category: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }, 
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Todo =  mongoose.model("Todo", todoSchema);
export default Todo;
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import cors from "cors";
import User from "./models/user.js";
import Todo from "./models/todo.js";
import moment from "moment";

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://khushal:khushal@todo-cluster.kcu2iyw.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });

app.listen(PORT, () => {
  console.log("Server listening at port 3000");
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(202).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error while registering User", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if email already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });

    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not found" });
    }

    user?.todos.push(newTodo._id);
    await user.save();

    res.status(200).json({ message: "Todo added succussfully", newTodo });
  } catch (error) {
    console.log("Error adding Todo", error);
    res.status(500).json({ message: "Fail to add todo" });
  }
});

app.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo marked as completed",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.get("/todos/completed/:date", async(req, res) => {
  try {
    const date = req.params.date;
    const completedTodos = await Todo.find({
      status: "completed",
      createdDate: {
        $gte: new Date(`${date}T00:00:00.000Z`),
        $lt: new Date(`${date}T23:59:59.999Z`)
      }
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({error: `Error fetching todos of date ${date}`});
  }
})

app.get("/todos/count", async(req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed"
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending"
    }).exec();

    res.status(200).json({totalCompletedTodos, totalPendingTodos});
  } catch (error) {
    res.status(500).json({error: "Didn't count"});
  }
})
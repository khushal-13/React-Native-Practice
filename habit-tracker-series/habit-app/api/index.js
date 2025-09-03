import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Habit from "./models/habit.js";

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://khushal:khushal@cluster-rn.mnkkehi.mongodb.net/")
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });

app.listen(port, () => {
  console.log("Server listening at port", port);
});

// // create habit
app.post("/habits", async (req, res) => {
    try {
        const { title, color, repeatMode, reminder } = req.body;

        const newHabit = new Habit({
            title,
            color,
            repeatMode,
            reminder
        });

        const savedHabit = await newHabit.save();
        res.status(200).json({habit: savedHabit})
    } catch (error) {
        console.log("Error while creating habit", error);
        res.status(500).json({ error: "Network error"})
    }
});

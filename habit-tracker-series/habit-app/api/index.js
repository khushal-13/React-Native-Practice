import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Habit from "./models/habit.js";
import api from "../app/api.js";

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
      reminder,
    });

    const savedHabit = await newHabit.save();
    res.status(200).json({ habit: savedHabit });
  } catch (error) {
    console.log("Error while creating habit", error);
    res.status(500).json({ error: "Network error" });
  }
});

// fetch habits
app.get("/habitsList", async (req, res) => {
  try {
    const allHabits = await Habit.find({}); // give all
    res.status(200).json({ habits: allHabits });
  } catch (error) {
    console.log("Error fetching habits");
    res.status(500).json({ error: error.message });
  }
});

//mark complete
app.put("/habits/:habitId/completed", async (req, res) => {
  const habitId = req.params.habitId;
  const updatedCompletion = req.body.completed;

  try {
    const updateHabit = await Habit.findByIdAndUpdate(
      habitId,
      { completed: updatedCompletion },
      { new: true }
    );

    if (!updateHabit) {
      res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit marked complete", updatedHabit: updateHabit });
  } catch (error) {
    console.log("Error marking complete");
    res.status(500).json({ error: error.message });
  }
});


app.delete("/habits/:habitId", async (req, res) => {
  try {
    const { habitId } = req.params;
    await Habit.findByIdAndDelete(habitId);
    res.status(200).json({message: "Habit deleted succussfully"});
  } catch (error) {
    console.log("Unable to delete Habit");
    res.status(500).json({error: error});
  }
})
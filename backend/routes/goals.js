import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const filePath = path.resolve("backend/data/goals.json");

// Helper function to read/write
const readGoals = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeGoals = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Get all goals
router.get("/", (req, res) => {
  const goals = readGoals();
  res.json(goals);
});

// Get single goal
router.get("/:id", (req, res) => {
  const goals = readGoals();
  const goal = goals.find((g) => g.id === parseInt(req.params.id));
  if (!goal) return res.status(404).json({ message: "Goal not found" });
  res.json(goal);
});

// Add a goal
router.post("/", (req, res) => {
  const goals = readGoals();
  const newGoal = { id: Date.now(), ...req.body };
  goals.push(newGoal);
  writeGoals(goals);
  res.status(201).json(newGoal);
});

// Profile summary
router.get("/summary/user", (req, res) => {
  const goals = readGoals();
  const summary = {
    goalsCreated: goals.length,
    goalsCompleted: goals.filter((g) => g.completed).length,
    totalTarget: goals.reduce((sum, g) => sum + g.amount, 0),
  };
  res.json(summary);
});

export default router;

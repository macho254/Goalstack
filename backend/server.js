import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid"; // generate unique IDs
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./data/goals.json"; // ensure this folder exists

// helper: read goals from file
function readGoals() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// helper: write goals to file
function writeGoals(goals) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(goals, null, 2));
}

// ✅ Get all goals
app.get("/api/goals", (req, res) => {
  const goals = readGoals();
  res.json(goals);
});

// ✅ Get single goal by ID
app.get("/api/goals/:id", (req, res) => {
  const goals = readGoals();
  const goal = goals.find((g) => g.id === req.params.id);
  goal ? res.json(goal) : res.status(404).json({ error: "Goal not found" });
});

// ✅ Add a new goal
app.post("/api/goals", (req, res) => {
  const { title, description, amount, months } = req.body;

  if (!title || !amount || !months) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const goals = readGoals();

  const newGoal = {
    id: uuidv4(),
    title,
    description: description || "",
    amount: Number(amount),
    months,
    saved: 0, // start at 0
  };

  goals.push(newGoal);
  writeGoals(goals);
  res.status(201).json(newGoal);
});

// ✅ Update saved amount (incremental + cap at goal.amount)
app.put("/api/goals/:id/saved", (req, res) => {
  const { saved } = req.body;
  const goals = readGoals();
  const goal = goals.find((g) => g.id === req.params.id);

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  }

  if (typeof saved !== "number" || saved < 0) {
    return res.status(400).json({ error: "Invalid saved amount" });
  }

  // Add incrementally
  goal.saved += saved;

  // Cap at goal.amount
  if (goal.saved > goal.amount) {
    goal.saved = goal.amount;
  }

  writeGoals(goals);
  res.json(goal);
});

// ✅ Edit goal (with saved recalc)
app.put("/api/goals/:id", (req, res) => {
  const { title, description, amount, months } = req.body;
  const goals = readGoals();
  const goal = goals.find((g) => g.id === req.params.id);

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  }

  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid goal amount" });
  }

  // Update fields
  goal.title = title || goal.title;
  goal.description = description || goal.description;
  goal.amount = Number(amount);
  goal.months = months || goal.months;

  // ✅ Re-cap saved if it's above the new target
  if (goal.saved > goal.amount) {
    goal.saved = goal.amount;
  }

  writeGoals(goals);
  res.json(goal);
});

// ✅ Delete a goal
app.delete("/api/goals/:id", (req, res) => {
  let goals = readGoals();
  const index = goals.findIndex((g) => g.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Goal not found" });
  }

  goals.splice(index, 1);
  writeGoals(goals);
  res.json({ message: "Goal deleted successfully" });
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

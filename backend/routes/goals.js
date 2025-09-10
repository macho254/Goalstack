import express from "express";
import fs from "fs";
import crypto from "crypto";

const router = express.Router();
const FILE_PATH = "./data/goals.json";

// helpers
function readGoals() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeGoals(goals) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(goals, null, 2));
}

// ✅ GET all goals for a user
router.get("/users/:userId/goals", (req, res) => {
  const goals = readGoals();
  const userGoals = goals.filter((g) => g.userId === req.params.userId);
  res.json(userGoals);
});

// ✅ GET a single goal for a user
router.get("/users/:userId/goals/:goalId", (req, res) => {
  const { userId, goalId } = req.params;
  const goals = readGoals();

  const goal = goals.find((g) => g.id === goalId && g.userId === userId);

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  }

  res.json(goal);
});


// ✅ POST add a new goal for a user
router.post("/users/:userId/goals", (req, res) => {
  const { title, description, amount, months } = req.body;
  if (!title || !amount || !months) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const goals = readGoals();
  const newGoal = {
    id: crypto.randomUUID(),
    userId: req.params.userId,
    title,
    description: description || "",
    amount,
    months,
    saved: 0,
  };

  goals.push(newGoal);
  writeGoals(goals);

  res.status(201).json(newGoal);
});

// ✅ PUT update goal details
router.put("/users/:userId/goals/:goalId", (req, res) => {
  const goals = readGoals();
  const idx = goals.findIndex(
    (g) => g.id === req.params.goalId && g.userId === req.params.userId
  );
  if (idx === -1) return res.status(404).json({ error: "Goal not found" });

  goals[idx] = { ...goals[idx], ...req.body };
  writeGoals(goals);

  res.json(goals[idx]);
});

// ✅ PUT update saved amount
router.put("/users/:userId/goals/:goalId/saved", (req, res) => {
  const { saved } = req.body;
  const goals = readGoals();
  const idx = goals.findIndex(
    (g) => g.id === req.params.goalId && g.userId === req.params.userId
  );
  if (idx === -1) return res.status(404).json({ error: "Goal not found" });

  goals[idx].saved = saved;
  writeGoals(goals);

  res.json(goals[idx]);
});

// ✅ DELETE a goal
router.delete("/users/:userId/goals/:goalId", (req, res) => {
  let goals = readGoals();
  const exists = goals.some(
    (g) => g.id === req.params.goalId && g.userId === req.params.userId
  );
  if (!exists) return res.status(404).json({ error: "Goal not found" });

  goals = goals.filter(
    (g) => !(g.id === req.params.goalId && g.userId === req.params.userId)
  );
  writeGoals(goals);

  res.json({ success: true });
});

export default router;

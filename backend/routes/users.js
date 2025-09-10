// routes/users.js
import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const FILE_PATH = "./data/users.json"; // path to users file

// helper: read users
function readUsers() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// helper: write users
function writeUsers(users) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
}

// GET all users
router.get("/", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// POST create user
router.post("/", (req, res) => {
  const { name, avatar } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const users = readUsers();
  const newUser = {
    id: uuidv4(),
    name,
    avatar: avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=" + name, // default avatar
  };

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// GET user by ID
router.get("/users/:userId", (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// GET user profile
router.get("/users/:userId", (req, res) => {
  const users = readUsers(); // 🔍 helper for users.json
  const user = users.find((u) => u.id === req.params.userId);

  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// ✅ Update user profile
router.put("/users/:userId", (req, res) => {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === req.params.userId);

  if (idx === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users[idx] = { ...users[idx], ...req.body }; // merge updates
  writeUsers(users);

  res.json(users[idx]);
});

export default router;

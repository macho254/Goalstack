import express from "express";
import cors from "cors";
import userRouter from "./routes/users.js";
import goalsRouter from "./routes/goals.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", goalsRouter);

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

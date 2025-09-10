import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

export function readUsers() {
  try {
    const data = fs.readFileSync(usersFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users.json:", err);
    return [];
  }
}

export function writeUsers(users) {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users.json:", err);
  }
}

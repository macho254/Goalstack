import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddGoal from "./pages/AddGoal";
import GoalDetails from "./pages/GoalDetails";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";


export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddGoal />} />
          <Route path="/goal/:id" element={<GoalDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}
 



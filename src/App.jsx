import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddGoal from "./pages/AddGoal";
import GoalDetails from "./pages/GoalDetails";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";


export default function App() {
  return (
  <UserProvider>
    <Router>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddGoal />} />
          <Route path="/goals/:id" element={<GoalDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
     <Toaster position = "top-right"/>  
    </Router>
  </UserProvider>
    
  );
}
 



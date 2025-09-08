import React, { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/goals"); // Make sure this matches your server
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
      {goals.length > 0 ? (
        <div className="grid gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No goals yet. Add one to get started!</p>
      )}
    </div>
  );
};

export default Dashboard;


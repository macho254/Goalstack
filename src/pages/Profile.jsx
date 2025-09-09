import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";


function Profile() {
  const [goals, setGoals] = useState([]);
  const currentUser = useUser();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${currentUser.id}/goals`);
        const data = await res.json();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  // ✅ Calculate summary stats
  const totalGoals = goals.length;
  const totalTarget = goals.reduce((sum, g) => sum + (parseFloat(g.amount) || 0), 0);
  const totalSaved = goals.reduce((sum, g) => sum + (parseFloat(g.saved) || 0), 0);
  const completedGoals = goals.filter((g) => g.saved >= g.amount).length;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Your Profile</h1>

      {/* Summary Card */}
      <div className="bg-white shadow rounded-2xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Savings Summary</h2>
        <p><strong>Total Goals:</strong> {totalGoals}</p>
        <p><strong>Total Target:</strong> ${totalTarget}</p>
        <p><strong>Total Saved:</strong> ${totalSaved}</p>
        <p><strong>Completed Goals:</strong> {completedGoals}</p>

        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-700"
            style={{
              width: `${totalTarget ? Math.min((totalSaved / totalTarget) * 100, 100) : 0}%`,
            }}
          />
        </div>
        <p className="text-sm mt-1 text-gray-600">
          {totalTarget > 0
            ? `${Math.round((totalSaved / totalTarget) * 100)}% of all goals saved`
            : "No goals yet"}
        </p>
      </div>

      {/* List of Goals */}
      <h2 className="text-lg font-semibold mb-2">Your Goals</h2>
      <div className="space-y-3">
        {goals.length === 0 ? (
          <p className="text-gray-600">You haven’t created any goals yet.</p>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white shadow p-4 rounded-2xl border hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-blue-600">{goal.title}</h3>
              <p className="text-sm text-gray-500 mb-1">
                Saved ${goal.saved} / ${goal.amount}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    goal.saved >= goal.amount ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min((goal.saved / goal.amount) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;

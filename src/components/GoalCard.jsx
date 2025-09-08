import { Link } from "react-router-dom";

const GoalCard = ({ goal }) => {
  const progress =
    goal.amount > 0 ? Math.min((goal.saved / goal.amount) * 100, 100) : 0;

  return (
    <Link to={`/goals/${goal.id}`}>
      <div className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition">
        {/* Title only */}
        <h2 className="text-lg font-semibold">{goal.title}</h2>

        {/* Saved vs Target */}
        <p className="mt-2 font-bold">
          ${goal.saved} saved of ${goal.amount}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className={`h-2.5 rounded-full transition-all duration-700 ${
             goal.saved >= goal.amount
              ? "bg-green-500 animate-pulse" // ✅ Flash animation when complete
             : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
          {goal.saved >= goal.amount && (
            <p className="text-green-600 font-semibold mt-2">🎉 Goal Achieved!</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GoalCard;

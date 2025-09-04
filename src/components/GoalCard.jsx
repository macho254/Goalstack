export default function GoalCard({ goal }) {
  const progress = (goal.saved / goal.amount) * 100;

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{goal.title}</h2>
      <p className="text-sm text-gray-600">${goal.saved} saved of ${goal.amount}</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
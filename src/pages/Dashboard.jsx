import { Link } from "react-router-dom";
import GoalCard from "../components/GoalCard";

export default function Dashboard() {
  const mockGoals = [
    { id: "1", title: "Buy a Laptop", amount: 2000, months: 6, saved: 500 },
    { id: "2", title: "Vacation Fund", amount: 1500, months: 5, saved: 300 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Goals</h1>
      <div className="grid gap-4">
        {mockGoals.map((goal) => (
          <Link key={goal.id} to={`/goal/${goal.id}`}>
            <GoalCard goal={goal} />
          </Link>
        ))}
      </div>
    </div>
  );
}

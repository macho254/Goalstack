import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4 text-white">
      <div className="max-w-4xl mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">GoalStack</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/add" className="hover:underline">Add Goal</Link>
        </div>
      </div>
    </nav>
  );
}
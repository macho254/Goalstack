import { useState } from "react";

export default function AddGoal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const goal = { title, description, amount: Number(amount), months: Number(months) };
    console.log(goal); // Later we'll POST this to backend
    setTitle(""); setDescription(""); setAmount(""); setMonths("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add a New Goal</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Save Goal
        </button>
      </form>
    </div>
  );
}

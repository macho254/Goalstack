import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGoal = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    months: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://goalstack-1.onrender.com/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/"); // redirect to dashboard
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New Goal</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 p-4 rounded-lg shadow-md"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Target Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="months"
          placeholder="Months"
          value={form.months}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Save Goal
        </button>
      </form>
    </div>
  );
};

export default AddGoal;

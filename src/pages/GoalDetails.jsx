import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // optional helper hook



export default function GoalDetails() {

  const { width, height } = useWindowSize();
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [savedAmount, setSavedAmount] = useState("");
  const [newSaved, setNewSaved] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    months: "",
  });

  // fetch goal details
  useEffect(() => {
    fetch(`https://goalstack-1.onrender.com/api/goals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGoal(data);
        setFormData({
          title: data.title,
          description: data.description,
          amount: data.amount,
          months: data.months,
        });
      });
  }, [id]);

  // delete
  const handleDelete = async () => {
    await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  // update saved amount

const handleUpdateSaved = async () => {
  const increment = Number(savedAmount);

  // ✅ Proper validation
  if (!savedAmount || isNaN(increment) || increment <= 0) {
    toast.error("Please enter a valid amount.");
    return;
  }

  const remaining = goal.amount - goal.saved;

  // 🔍 If increment is larger than remaining
  if (increment > remaining) {
    toast(
      (t) => (
        <span>
          You are trying to save <b>{increment}</b>, but only <b>{remaining}</b>{" "}
          is remaining to reach the goal. <br />
          Do you want to cap it at {goal.amount}?
          <br />
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              // Proceed with capped update
              await fetch(`https://goalstack-1.onrender.com/api/goals/${id}/saved`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ saved: increment }),
              });

              const res = await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`);
              const updated = await res.json();
              setGoal(updated);

              // ✅ Reset input only on success
              setSavedAmount("");

              toast.success("Saved amount capped at goal target!");
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-2 py-1 rounded ml-2"
          >
            No
          </button>
        </span>
      ),
      { duration: 8000 }
    );
    return;
  }

  // ✅ Normal update
  await fetch(`https://goalstack-1.onrender.com/api/goals/${id}/saved`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ saved: increment }),
  });

  const res = await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`);
  const updated = await res.json();
  setGoal(updated);

  // ✅ Reset input only on success
  setSavedAmount("");

  
  if (updated.saved >= updated.amount) {
  toast.success("🎉 Congratulations! You’ve completed your goal!");
} else{
  toast.success("Saved amount updated!");
}

};


  // edit goal
 const handleEdit = async () => {
  const newAmount = Number(formData.amount);

  if (newAmount < goal.saved) {
    toast(
      (t) => (
        <span>
          You already saved <b>{goal.saved}</b>, which is more than the new target of{" "}
          <b>{newAmount}</b>. <br />
          Do you want to proceed? <br />
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: formData.title,
                  description: formData.description,
                  amount: newAmount,
                  months: Number(formData.months),
                }),
              });

              const res = await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`);
              const updated = await res.json();
              setGoal(updated);
              setEditMode(false);

              toast.success("Goal updated successfully!");
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-2 py-1 rounded ml-2"
          >
            No
          </button>
        </span>
      ),
      { duration: 8000 }
    );
    return;
  }

  await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: formData.title,
      description: formData.description,
      amount: Number(formData.amount),   // convert to number
      months: Number(formData.months),   // convert to number
    }),
  });

  const res = await fetch(`https://goalstack-1.onrender.com/api/goals/${id}`);
  const updated = await res.json();
  setGoal(updated);
  setEditMode(false);
};


  if (!goal) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {!editMode ? (
        <>
          <h1 className="text-2xl font-bold">{goal.title}</h1>
          <p>{goal.description}</p>
          <p>Target: ${goal.amount}</p>
          <p>Saved: ${goal.saved}</p>
          <p>Months: {goal.months}</p>

          {/** Confetti Animation */}
          {goal.saved >= goal.amount && (
          <Confetti width={width} height={height} />
           )}

         {/* ✅ Feedback Section*/}
          <div className="mt-2 text-sm text-gray-600">
              {goal.saved >= goal.amount
                ? "🎉 Goal achieved!"
                : `Remaining: $${goal.amount - goal.saved}`}
         </div>

        

          {/* Update Saved */}
          <div className="mt-4">
            <input
             type="number"
             min="1"
             step="any"
             placeholder="Enter amount to save"
             value={savedAmount}
              onChange={(e) => setSavedAmount(e.target.value)}
               className="border px-2 py-1 rounded mr-2"
             />

            <button
              onClick={handleUpdateSaved}
              className="bg-green-500 text-white px-3 py-1 rounded mt-2"
            >
              Update Saved
            </button>
          </div>
            {/* Buttons */}
          <div className="mt-4 space-x-2">
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">Edit Goal</h2>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 rounded w-full my-2"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border p-2 rounded w-full my-2"
          />
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="border p-2 rounded w-full my-2"
          />
          <input
            type="number"
            value={formData.months}
            onChange={(e) => setFormData({ ...formData, months: e.target.value })}
            className="border p-2 rounded w-full my-2"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Save Changes
          </button>
        </>
      )}
    </div>
  );
}

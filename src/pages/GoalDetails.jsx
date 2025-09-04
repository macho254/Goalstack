import { useParams } from "react-router-dom";

export default function GoalDetails() {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Goal Details</h1>
      <p>Showing details for Goal ID: {id}</p>
    </div>
  );
}
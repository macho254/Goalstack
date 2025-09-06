export default function Profile() {
  // Mock data for now (replace later with backend/auth data)
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    goalsCreated: 5,
    goalsCompleted: 2,
    totalTarget: 1200,
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {/* User Info */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <h2 className="mt-3 text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{user.goalsCreated}</p>
          <p className="text-gray-600 text-sm">Goals Created</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{user.goalsCompleted}</p>
          <p className="text-gray-600 text-sm">Goals Completed</p>
        </div>
        <div className="col-span-2 p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">${user.totalTarget}</p>
          <p className="text-gray-600 text-sm">Total Target Amount</p>
        </div>
      </div>
    </div>
  );
}

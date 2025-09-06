// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-indigo-600 p-4 text-white">
//       <div className="max-w-4xl mx-auto flex justify-between">
//         <Link to="/" className="text-xl font-bold">GoalStack</Link>
//         <div className="space-x-4">
//           <Link to="/" className="hover:underline">Dashboard</Link>
//           <Link to="/add" className="hover:underline">Add Goal</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-lg font-bold">GoalStack</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/add" className="hover:text-gray-200">
              Add Goal
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">
              Profile
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-2 bg-blue-700 p-4 rounded-lg">
          <li>
            <Link
              to="/"
              className="block hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="block hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Add Goal
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


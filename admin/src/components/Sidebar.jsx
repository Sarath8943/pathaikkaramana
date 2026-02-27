import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-amber-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-yellow-200">Dashboard</Link>
        </li>
        <li>
          <Link to="/users" className="hover:text-yellow-200">Users</Link>
        </li>
        <li>
          <Link to="/orders" className="hover:text-yellow-200">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-amber-800">
        Admin Dashboard
      </h1>

      <button className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700 transition">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, User, LogOut } from "lucide-react";

const DistrictAdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="./logo.png" alt="logo" className="h-10 mr-2" />
            <span className="text-2xl font-bold text-emerald-600">Sahayta</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" icon={<Home />} text="Home" />
            <NavLink
              to="/districtadmin/profile"
              icon={<User />}
              text="Profile"
            />
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              icon={<LogOut />}
              text="Logout"
            />
          </div>
          <button
            className="md:hidden text-emerald-600 hover:text-orange-500 transition"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink to="/" icon={<Home />} text="Home" onClick={toggleMenu} />
            <NavLink
              to="/districtadmin/profile"
              icon={<User />}
              text="Profile"
              onClick={toggleMenu}
            />
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                toggleMenu();
              }}
              icon={<LogOut />}
              text="Logout"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    className="flex items-center text-emerald-600 hover:text-orange-500 transition"
    onClick={onClick}
  >
    {React.cloneElement(icon, { className: "w-5 h-5 mr-1" })}
    <span>{text}</span>
  </Link>
);

export default DistrictAdminNavbar;

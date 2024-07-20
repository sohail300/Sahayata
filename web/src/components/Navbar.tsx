import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, User, LogOut } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import DistrictAdminNavbar from "./DistrictAdminNavbar";

const Navbar = () => {
  return (
    <>
      <AdminNavbar />
    </>
  );
};

export default Navbar;

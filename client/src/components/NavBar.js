import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ userId }) {
  return (
    <nav className="navbar">
        <NavLink to="/" exact className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/routines" className="nav-link" activeClassName="active">
          Routines
        </NavLink>
        <NavLink to={`/user/${userId}`} className="nav-link" activeClassName="active">
          Profile
        </NavLink>
        <NavLink to="/login" className="nav-link" activeClassName="active">
          Log Out
        </NavLink>
    </nav>
  );
}

export default NavBar;

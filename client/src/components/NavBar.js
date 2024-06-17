import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ userId }) {
  return (
    <nav className="navbar">
        <NavLink to="/" exact className="nav-link" activeClassName="active">
          TIMER
        </NavLink>
        <NavLink to="/routines" className="nav-link" activeClassName="active">
          ROUTINES
        </NavLink>
        <NavLink to="/manage-tasks" className="nav-link" activeClassName="active">
          TASKS
        </NavLink>
        <NavLink to={`/user/${userId}`} className="nav-link" activeClassName="active">
          PROFILE
        </NavLink>
        <NavLink to="/login" className="nav-link" activeClassName="active">
          LOG OUT
        </NavLink>
    </nav>
  );
}

export default NavBar;

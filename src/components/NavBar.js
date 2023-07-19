import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "./SignOut";
import "./NavBar.css";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.isLogin;
  const username = user.username;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/overview">Overview</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <span className="username">Welcome, {username}!</span>
            </li>
            <li>
              <SignOut />
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

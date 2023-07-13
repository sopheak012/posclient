import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Navigate to the home page or any other desired route
    navigate("/");
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;

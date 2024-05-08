import React from "react";
import "../../common/common.css";
import "../../common/spacing.css";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Users() {
  return (
    <div>
      <Login />
      <SignUp />
    </div>
  );
}

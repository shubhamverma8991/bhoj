import React from "react";
import "./Login.css";
import "../../common/common.css";
import "../../common/spacing.css";
import { useState, useEffect } from "react";
import PrimaryBtn from "../../common/Element/PrimaryBtn";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState({});
  const [loginData, setLoginData] = useState({
    loginName: "",
    loginPassword: "",
  });
  useEffect(() => {
    // Check if the user is already authenticated
    const isAuthenticated = localStorage.getItem("token");

    // If the user is already authenticated, redirect to the home page
    if (isAuthenticated) {
      return navigate("/home");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(loginData);
      localStorage.setItem("token", "Person Logged In");
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errorLogin = {};

    if (!loginData.loginName) {
      errorLogin.loginName = "Please Enter Correct Email Address";
      valid = false;
    } else if (
      !/^(?:[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com))$/.test(loginData.loginName) &&
      !/^(?:(?:\+?91[\s-]?)?|[0]?)([6-9]\d{9})$/.test(loginData.loginName)
    ) {
      errorLogin.loginName = "Please Enter Valid Email Address";
      valid = false;
    }

    if (!loginData.loginPassword) {
      errorLogin.loginPassword = "Password is required";
      valid = false;
    }

    setErrorLogin(errorLogin);
    return valid;
  };

  const gotoSignup = (e) => {
    e.preventDefault();
    console.log("Clicked Signup");
    navigate("/signup");
  };

  return (
    <div className="flex h-100 justify_center align_center p-1 m-2 ">
      <div className="border-1 p-8">
        <form>
          <h1 className="section_head center mb-6">Login Page</h1>
          <div>
            <label>Email</label>
            <input type="text" name="loginName" placeholder="Email" value={loginData.loginName} onChange={handleChange} />
            {errorLogin.loginName && <div className="error">{errorLogin.loginName}</div>}
          </div>

          <div>
            <label>Password</label>
            <input type="password" name="loginPassword" placeholder="Password" value={loginData.loginPassword} onChange={handleChange} />
            {errorLogin.loginPassword && <div className="error">{errorLogin.loginPassword}</div>}
          </div>

          <div className="center mt-6 flex justify_space_btw flex_wrap">
            {/* <button type="submit">Submit</button> */}
            <PrimaryBtn primary="#f13c20" secondary="white" text="Login" fontcolor="white" onClick={handleSubmit} />
            <PrimaryBtn primary="#c5cbe3" secondary="white" text="SignUp" fontcolor="white" onClick={gotoSignup} />
          </div>
        </form>
      </div>
    </div>
  );
}

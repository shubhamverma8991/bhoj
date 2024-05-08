import React, { useState } from "react";
import "./SignUp.css";
import "../../common/common.css";
import "../../common/spacing.css";
import PrimaryBtn from "../../common/Element/PrimaryBtn";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [rePassword, setRePassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    branch: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRePassword = (e) => {
    const { value } = e.target;
    setRePassword(value);
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required";
      valid = false;
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
      valid = false;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^(?:[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com))$/.test(formData.email)) {
      errors.email = "Email is Invalid";
      valid = false;
    }

    if (!formData.mobileNumber) {
      errors.mobileNumber = "Phone number is required";
      valid = false;
    } else if (!/^(?:(?:\+?91[\s-]?)?|[0]?)([6-9]\d{9})$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.gender) {
      errors.gender = "Please Select Gender";
      valid = false;
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Please Select Date";
      valid = false;
    }

    if (!formData.branch) {
      errors.branch = "Branch is required";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (formData.password !== rePassword) {
      errors.rePassword = "Please Enter same passord as above";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const goBack = () => {
    console.log("go Back Click");
    navigate("/");
  };

  return (
    <div className=" flex justify_center p-1 ">
      <div className="border-1">
        <form className="m-2">
          <h1 className="center section_head">SignUp Details</h1>
          <div className="m-2">
            <label>First Name</label>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <div className="error">{errors.firstName}</div>}
          </div>

          <div className="m-2">
            <label>Last Name</label>
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>

          <div className="m-2">
            <label>Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="m-2">
            <label>Mobile No.</label>
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              // value={formData.mobileNumber.startsWith('+91') ? formData.mobileNumber:`+91 ${formData.mobileNumber}`}
              value={formData.mobileNumber.startsWith("+91") ? formData.mobileNumber : "+91" + formData.mobileNumber}
              onChange={handleChange}
            />
            {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
          </div>

          <div className="m-2">
            <span className="span">Gender</span>
            <br />
            <input
              className="ml-3"
              type="radio"
              name="gender"
              value="male"
              id="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label className="ml-4">Male</label>
            <input type="radio" name="gender" value="female" id="female" checked={formData.gender === "female"} onChange={handleChange} />
            <label className="ml-4">Female</label>
            {errors.gender && <div className="error">{errors.gender}</div>}
          </div>

          <div className="m-2">
            <label>Date Of Birth</label>
            <input type="date" name="dateOfBirth" id="dob" value={formData.dateOfBirth} onChange={handleChange} />
            {errors.dateOfBirth && <div className="error">{errors.dateOfBirth}</div>}
          </div>

          <div className="m-2">
            <label>Branch</label>
            <select name="branch" value={formData.branch} onChange={handleChange}>
              <option value="">Select Branch</option>
              <option value="Raipur">Raipur</option>
              <option value="Bhilai">Bhilai</option>
              <option value="Rajnandgaon">Rajnandgaon</option>
              <option value="Bilaspur">Bilaspur</option>
              <option value="Raigarh">Raigarh</option>
            </select>
            {errors.branch && <div className="error">{errors.branch}</div>}
          </div>

          <div className="m-2">
            <label>Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <div className="m-2">
            <label>Re-Password</label>
            <input type="password" name="rePassword" id="rePassword" value={rePassword} onChange={handleRePassword} />
            {errors.rePassword && <div className="error">{errors.rePassword}</div>}
          </div>

          <div className="m-2 flex justify_space_btw align_center">
            <a onClick={goBack}>Back</a>
            <PrimaryBtn text="Submit" primary="green" seconday="white" fontcolor="white" onClick={handleSubmit} />

            {/* <button type="submit">Submit</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

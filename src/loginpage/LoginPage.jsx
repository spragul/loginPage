import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./login.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { IoIosPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { MdVisibilityOff } from "react-icons/md";
import { MdVisibility } from "react-icons/md";

const userSchema = yup.object({
  email: yup.string().email().required("Enter your email"),
  password: yup.string().required("Enter your password").min(8,"Password is minmum 8 charecters")
});
export default function LoginPage() {
  const [showpassword, setShowpassword] = useState("password");
  const navigate = useNavigate();

  //login backend
  const loginuser = async ({ userdata }) => {
    try {
      console.log(userdata);
      const response = await axios.post("http://localhost:8000/user/adduser", userdata);
      console.log(response);
      if (response.data.rd == true) {
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  //formik controll
  const { values, errors, touched, handleBlur, handleChange, handleSubmit,resetForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: (userdata) => {
        console.log(userdata);
        loginuser({ userdata });
      },
    });
  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <ul className="text-part">
          <li className="log-content">
            <h3>WELCOME </h3>
            <p>Login webpage</p>
          </li>
          <li className="log-content">
            <label htmlFor="email">
              <span>
                <IoIosPerson size={25} />
              </span>
             Enter email here
            </label>
            <input
              id="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              className="login-input"
            />
            {touched.email && errors.email ? (
              <p className="error-p">{errors.email}</p>
            ) : (
              ""
            )}
          </li>
          <li className="log-content">
            <label htmlFor="password">
              <span>
                <FaLock size={25} />
              </span>
             Enter password here
            </label>
            <div className="buttonIn">
              <input
                id="password"
                name="password"
                type={showpassword}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="password"
                className="login-input "
              />
              {showpassword === "text" ? (
                <button
                  type="button"
                  onClick={() => setShowpassword("password")}
                  className="input-button"
                >
                  <MdVisibilityOff size={30} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowpassword("text")}
                  className="input-button"
                >
                  <MdVisibility size={30} />
                </button>
              )}
              {touched.password && errors.password ? (
                <p className="error-p">{errors.password}</p>
              ) : (
                ""
              )}
            </div>
          </li>
          <li className="log-content">
            <Link to={""}>Forgot password</Link>
          </li>
          <li className="log-content-button">
            <button className="log-dum-btn" type="submit">
              submit
            </button>
            <button type="button" className="clear-btn" onClick={resetForm}>Clear</button>
          </li>
          <li className="log-content">
            <p className="mb-0">
              Don't have an account?{" "}
              <Link to="" style={{ color: "black" }}>
                Sign Up
              </Link>
            </p>
          </li>
        </ul>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import "./Signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  //setting up the signup form variables and state
  const initialValues = { username: "", email: "", password: "" };  
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});

  //Navigate property of 'react-router-dom' to Route the button
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  //targetting and storing the specific element input field onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  // form submit function
  const submitHandler = (e) => { 
    e.preventDefault();    // to prevent default action and submit the form data to the default url
    const errors = validate(formValues);
    if (Object.keys(errors).length) {
      setformErrors(errors);
      return;
    } else {
      localStorage.setItem("credentials", JSON.stringify(formValues)); //set item localstorage 
      handleClick();
    }
  };


  //function to validate the credentials

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "* Username is required!";
    }
    if (!values.email) {
      errors.email = "* Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "* Not a valid Email!";
    }
    if (!values.password) {
      errors.password = "* Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "* Password must be greater than 4 characters!";
    }
    return errors;
  };


  //JSX part
  return (
    <div className="body">
      <section className="vh-100">
        <div className="container py-1 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className=" pb-md-0 mb-md-5" style={{ textAlign: "center" }}>
                    Signup
                  </h3>
                  <form onSubmit={submitHandler}>
                    <div className="row">
                      <h5>Username</h5>
                      <div className="mb-4 d-flex align-items-center">
                        <div className="form-outline w-100">
                          <input
                            type="text"
                            name="username"
                            className="form-control form-control-md"
                            id="em"
                            placeholder="Enter your username"
                            value={formValues.username}
                            onChange={handleChange}
                          />
                          {formErrors.username && (
                            <p className="alert">{formErrors.username}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <h5>Email</h5>
                      <div className="mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="Email"
                            name="email"
                            id="pass"
                            className="form-control form-control-md"
                            placeholder="Enter the password"
                            value={formValues.email}
                            onChange={handleChange}
                          />
                        </div>
                        {formErrors.email && (
                          <p className="alert">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <h5>Password</h5>
                      <div className="mb-2 pb-1">
                        <div className="form-outline">
                          <input
                            type="password"
                            name="password"
                            id="pass"
                            className="form-control form-control-md"
                            placeholder="Enter the password"
                            value={formValues.password}
                            onChange={handleChange}
                          />
                        </div>
                        {formErrors.password && (
                          <p className="alert">{formErrors.password}</p>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn1 btn-lg">
                        SIGNUP
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;

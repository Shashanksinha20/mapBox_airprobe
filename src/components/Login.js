import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Signin = ({ setIsLogged }) => {
  //setting up login form variables and state
  const initialValues = { email: "", password: "" };
  const [formVal, setformVal] = useState(initialValues);
  const [incorrectCredentials, setincorrectCredentials] = useState("");

  //targetting and storing the specific element input field onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformVal({ ...formVal, [name]: value });
  };

  // form submit function
  const submitHandler = (e) => {
    e.preventDefault();

    //retrieving parsing data from localstorage and checking
    const jsonString = localStorage.getItem("credentials");
    const localCredentials = JSON.parse(jsonString);
    if (
      localCredentials.email === formVal.email &&
      localCredentials.password === formVal.password
    ) {
      console.log("Credentials are Correct");
      setIsLogged(true);
    } else {
      console.log("Credentials are Wrong");
      setincorrectCredentials("Incorrect Username/Password");
    }
  };

  //JSX Part
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
                    Login
                  </h3>
                  {incorrectCredentials && (
                    <div className="d-flex justify-content-center incorrect-box">
                      {incorrectCredentials}
                    </div>
                  )}
                  <form onSubmit={submitHandler}>
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
                            value={formVal.email}
                            onChange={handleChange}
                          />
                        </div>
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
                            value={formVal.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn1 btn-lg">
                        LOGIN
                      </button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <a href="/Signup">Sign Up</a>
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

export default Signin;

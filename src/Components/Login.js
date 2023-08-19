import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user")){
        navigate("/profile");
    }
    document.title = "Login";
  },[navigate])

  let [usernameState, setUsernameState] = useState("");
  let [passwordState, setPasswordState] = useState("");
  let [error, setError] = useState("");

  function changeHandle() {
    if (usernameState && passwordState) {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameState,
          password: passwordState,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.token) {
            localStorage.setItem("user", JSON.stringify(response));
            setError("");
            navigate("/profile");
          } else {
            setError(response.message);
          }
        });
      setUsernameState("");
      setPasswordState("");
    } else {
      setError("Enter All Fields.");
    }
  }

  return (
    <div className="container">
      <div className="login-div">
        <div>
          <div className="welcome">Welcome back! 👋</div>
          <div className="signin-text">Sign in to your account</div>
        </div>
        <div className="input-div">
          <label htmlFor="email">Username</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setUsernameState(e.target.value)}
            value={usernameState}
          ></input>
        </div>
        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPasswordState(e.target.value)}
            value={passwordState}
          ></input>
        </div>
        <div className="btn-div">
          <button onClick={changeHandle}>Continue</button>
          <a className="link" href="#login-div">
            Forgot your password?
          </a>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="acc">
        Don't have an account? <a href="#login-div">Sign up</a>
      </div>
    </div>
  );
};

export default Login;

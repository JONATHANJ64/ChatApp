import React, { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();
  const [signupMessage, setSignupMessage] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await triggerLogin({ username, password });
      if (response.data?.response) {
        setUser(username);
        setSecret(password);
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
      setLoginError("An error occurred during login");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await triggerSignUp({ username, password });
      setSignupMessage(response.data.message);
    } catch (error) {
      console.error("Signup error", error);
    }
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  const handleDemo = async () => {
    const demoUsername = "Demouser";
    const demoPassword = "1234";

    try {
      const loginResponse = await triggerLogin({ username: demoUsername, password: demoPassword });
      if (loginResponse.data?.response) {
        setUser(demoUsername);
        setSecret(demoPassword);
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
      setLoginError("An error occurred during login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">Chat APP</h2>
        <p className="register-change" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {signupMessage && <p className="signup-message">{signupMessage}</p>}
        {loginError && <p className="login-error">{loginError}</p>}
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
          <button className="demo-button" type="button" onClick={handleDemo}>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

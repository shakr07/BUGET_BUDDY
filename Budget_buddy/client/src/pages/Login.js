import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "./login.css";  
import loginImage from "./s.png";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={loginImage} alt="Login Visual" />
      </div>
      <div className="login-form">
        {loading && <Spinner /  >}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Get started Budget buddy!</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>

          <button className="login-button" type="submit" >
            Sign In
          </button>

          <div className="register-link">
            <Link to="/register">New on our platform? Create an account</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

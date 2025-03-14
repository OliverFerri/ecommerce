import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { login } from "../redux/calls/userApiCalls";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, user);
  };

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <div className="text-5xl font-extralight py-5">Login</div>
      <div>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Enter username"
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>
      <div className="w-[300px] py-3">
        <Button text="Login" onClick={handleClick} />
      </div>
      <NavLink to={"/register"}>
        <div className="cursor-pointer hover:text-teal-400">Create Account</div>
      </NavLink>
    </div>
  );
};

export default Login;

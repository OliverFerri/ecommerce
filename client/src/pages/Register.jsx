import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../redux/calls/userApiCalls";

const Register = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert("Your passwords do not match.");
      return;
    }

    const { confirmPassword, ...userData } = newUser;

    registerNewUser(userData, dispatch);
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <div className="text-5xl font-extralight py-5">Create Account</div>
      <div>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Enter username"
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
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
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm username"
          onChange={handleChange}
        />
      </div>
      <div className="w-[300px] py-3">
        <Button text="Sign Up" onClick={handleClick} />
      </div>
      <NavLink to={"/login"}>
        <div className="cursor-pointer hover:text-teal-400">
          Already have an account?
        </div>
      </NavLink>
    </div>
  );
};

export default Register;

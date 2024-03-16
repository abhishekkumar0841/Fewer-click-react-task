import React, { useState } from "react";
import { FaLock } from "react-icons/fa6";
import LoginImage from "../assets/login-img.png";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyPassword, verifyUsername } from "../helper/regexMatcher";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!verifyUsername(userName)) {
      toast.error("Please enter a valid username!!!");
      return;
    }

    if (!verifyPassword(password)) {
      toast.error("Password should be strong!!!");
      return;
    }

    const token = "this_is_dummy_token";

    dispatch(setUser(userName));
    dispatch(setToken(token));
    navigate("/admindashboard");
    toast.success(`Welcome Back ${userName}`)
  };

  return (
    <div className=" bg-[#f5f4ff] w-full min-h-screen flex items-center justify-center shadow-2xl">
      <div className="lg:flex max-h-[70%]">
        {/* form */}
        <div className="bg-white px-8 py-12 flex flex-col gap-10">
          <h1 className=" text-center sm:text-left text-3xl font-semibold">Welcome to Fewerclicks!</h1>
          <form onSubmit={handleSubmit}>
            <div className=" shadow-2xl px-4 py-4 rounded-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className=" block text-gray-400 font-bold"
                  htmlFor="email"
                >
                  @ Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className=" w-full px-2 py-1 border rounded-lg"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className=" w-full h-[2px] bg-gray-400"></div>
              <div className="flex flex-col gap-2">
                <label
                  className="block text-gray-400 font-bold"
                  htmlFor="password"
                >
                  <FaLock className=" inline" /> Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className=" w-full px-2 py-1 border rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <div>
                <input type="checkbox" />
                <span>Remember Me</span>
              </div>
              <div>
                <p>Forget Password?</p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#196c6c] text-white w-full py-2 px-6 rounded-2xl mt-16"
            >
              LOG IN
            </button>
          </form>
        </div>
        {/* image */}
        <img src={LoginImage} alt="" className="" />
      </div>
    </div>
  );
};

export default LoginPage;

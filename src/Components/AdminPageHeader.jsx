import React, { useState } from "react";
import {  FaBell } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToken, setUser } from "../redux/slices/userSlice";

const AdminPageHeader = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.logInUser);
  const [logoutBtn, setLogoutBtn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("See You Later " + userName);
    localStorage.clear();
    dispatch(setUser(""));
    dispatch(setToken(""));
    navigate("/");
  };

  return (
    <header className=" sm:flex sm:items-center sm:justify-between grid place-items-center">
      <h1 className=" text-2xl font-semibold">Photo Management</h1>
      <div className="flex  gap-8 items-center">
        <FaBell />
        <div className="flex items-center gap-3">
          <span className=" font-semibold text-xl">{userName}</span>
          <div
            onClick={() => setLogoutBtn(!logoutBtn)}
            className=" relative  "
          >
            {logoutBtn ? (
              <IoIosArrowDown className=" cursor-pointer" />
            ) : (
              <IoIosArrowUp className=" cursor-pointer" />
            )}
            {logoutBtn && (
              <div className=" absolute right-2 top-6">
                <button
                  onClick={handleLogout}
                  className=" bg-red-500 text-white font-semibold px-4 py-1 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminPageHeader;

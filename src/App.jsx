import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";
import AuthCheck from "./Components/AuthCheck";
import { useSelector } from "react-redux";

const App = () => {
  const isUser = useSelector(state=> state.user.logInUser)
  const isToken = useSelector(state=> state.user.token)

  const navigate = useNavigate();

  useEffect(()=>{
    if(isUser && isToken){
      navigate('/admindashboard')
    }
  },[])

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<AuthCheck />}>
        <Route path="/admindashboard" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default App;

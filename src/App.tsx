import { useState } from "react";
import "./App.css";
import CustomInput from './components/shared/CustomInput'
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import React from 'react'
import SignUp from "./pages/sign-up/SignUp";

const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
    </>
  )
}


export default App;

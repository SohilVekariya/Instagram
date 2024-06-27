import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign-up/SignUp";
import { AllRoutes } from "./constants/Routes";
import Reset from "./pages/Reset/Reset";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <>
    <Routes>
        <Route path={AllRoutes.Login} element={<Login />}></Route>
        <Route path={AllRoutes.SignUp} element={<SignUp />}></Route>
        <Route path={AllRoutes.Reset} element={<Reset />}></Route>
        <Route path={AllRoutes.Home} element={<Home />}></Route>
    </Routes>
    </>
  )
}


export default App;

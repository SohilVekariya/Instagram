import React, { useState } from "react";
import "../login/login.css";
import CustomInput from "../../components/shared/CustomInput";
import instaLogo from "../../assets/images/logoinsta.png";
import fbLogo from "../../assets/images/fb.png";
import playStore from "../../assets/images/play.png";
import appStore from "../../assets/images/app.png";
import CustomButton from "../../components/shared/CustomButton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className="flex justify-center mt-12">
      <div className="container-fluid">
        <div className="login_content sm:border-2  mx-auto mt-5 px-">
          <img
            src={instaLogo}
            alt=""
            width={250}
            className="mx-auto mt-10 mb-5"
          />
          <div className="text-neutral-400 font-bold font-size text-xl text-center mb-4 ">
            Sign up To See photos and Videos from your Friends.
          </div>
          <div className="flex justify-center mt-2 mb-5">
            <CustomButton
              type="button"
              title="Login in with Facebook"
              className="custom_signin_btn"
              route=""
            />
          </div>
          <div className="login__ordiv mb-5">
            <div className="login__dividor"></div>
            <div className="login__or">OR</div>
            <div className="login__dividor"></div>
          </div>
          <div className="text-center">
            <CustomInput
              label="Mobile Number or email"
              placeholder=""
              name="email"
              onChange={(e:any) => {setEmail(e.target.value)}}
              type="text"
              value={email}
              disabled={false}
              className=""
            />
          </div>
          <div className="text-center mt-2">
            <CustomInput
              label="FullName"
              placeholder=""
              name="FullName"
              onChange={(e:any) => {setFullName(e.target.value)}}
              type="text"
              value={fullName}
              disabled={false}
              className=""
            />
          </div>
          <div className="text-center mt-2">
            <CustomInput
              label="Username"
              placeholder=""
              name="Username"
              onChange={(e:any) => {setUserName(e.target.value)}}
              type="text"
              value={userName}
              disabled={false}
              className=""
            />
          </div>
          <div className="text-center mt-2">
            <CustomInput
              label="Password"
              placeholder=""
              name="Password"
              onChange={(e:any) => {setPassword(e.target.value)}}
              type="password"
              value={password}
              disabled={false}
              className=""
            />
          </div>
          <div className="py-4 text-gray-400">
            People who use our service may have uploaded your contact information to Instagram <span className="text-slate-900">Learn More</span>
          </div>
          <div className="py-4 text-gray-400">
            By signing up,you agree to our <span className="text-slate-900">Terms , Privacy Policy</span> and <span className="text-slate-900">Cookies Policy</span>
          </div>
          <div className="flex justify-center mt-2 mb-12">
            <CustomButton
              type="submit"
              title="Sign Up"
              className="custom_signin_btn"
              route=""
            />
          </div>
        </div>
        <div className="singup_link_content sm:border-2 mx-auto text-center mt-3 py-7">
          <div>
            Have an account?{" "}
            <CustomButton
              type="button"
              title="Log in"
              className="text-sky-500 font-semibold"
              route="/"
            />
          </div>
        </div>
        <div className="text-center mt-2 mb-10">
          <div className="py-3">Get the app</div>
          <div className="flex justify-center gap-2">
            <img src={playStore} width="150px" />
            <img src={appStore} width="150px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

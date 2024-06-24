import "./login.css";
import { useState } from "react";
import CustomInput from "../../components/shared/CustomInput";
import instaLoginPic from "../../assets/images/insta.svg";
import instaLogo from "../../assets/images/logoinsta.png";
import fbLogo from "../../assets/images/fb.png";
import playStore from "../../assets/images/play.png";
import appStore from "../../assets/images/app.png";
import CustomButton from "../../components/shared/CustomButton";
import LoginFooter from "../../components/shared/LoginFooter";

const Login = () => {
  const [input, setInput] = useState("");

  const handleInputeChange = (event: any) => {
    setInput(event.target.value);
  };
  return (
    <div className="flex justify-center mt-12">
      <div className="md:block hidden">
        <img src={instaLoginPic} alt="" width="500px" />
      </div>
      <div className="container-fluid">
        <div className="login_content sm:border-2  mx-auto mt-5 px-12">
          <img src={instaLogo} alt="" width={250} className="mx-auto my-7" />
          <div className="text-center">
            <CustomInput
              label="Phone number,username, or email"
              placeholder=""
              name="email"
              onChange=""
              type="text"
              value={input}
              disabled={false}
              className=""
            />
          </div>
          <div className="text-center mt-2">
            <CustomInput
              label="Password"
              placeholder=""
              name="Password"
              onChange={handleInputeChange}
              type="password"
              value={input}
              disabled={false}
              className=""
            />
          </div>
          <div className="flex justify-center mt-2">
            <CustomButton
              type="submit"
              title="Log in"
              className="custom_signin_btn"
              clickHandler={handleInputeChange}
              route=""
            />
          </div>

          <div className="login__ordiv">
            <div className="login__dividor"></div>
            <div className="login__or">OR</div>
            <div className="login__dividor"></div>
          </div>

          <div className="login__fb flex align-middle gap-2 justify-center">
            <div className="flex flex-col justify-center">
              <img src={fbLogo} width="15px" />
            </div>
            <div className="align-middle">Log in with Facebook</div>
          </div>
          <div className="login_forgt text-center my-7"> Forgot password?</div>
        </div>
        <div className="singup_link_content sm:border-2 mx-auto text-center mt-3 py-7">
          <div>
            Don't have an account?{" "}
            <CustomButton
              type="button"
              title="Sign Up"
              className="text-sky-500 font-semibold"
              clickHandler=""
              route="/signup"
            />
            {/* <span className="text-sky-500 font-semibold">Sign up</span> */}
          </div>
        </div>
        <div className="text-center mt-2 mb">
          <div className="py-3">Get the app</div>
          <div className="flex justify-center gap-2">
            <img src={playStore} width="150px" />
            <img src={appStore} width="150px" />
          </div>
        </div>
      </div>
      <div className="mb-5">

      </div>
      <div className="md:hidden fixed bottom-0 text-center w-full ">
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;

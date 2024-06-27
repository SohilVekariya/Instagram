import "./login.css";
import CustomInput from "../../components/shared/CustomInput";
import instaLoginPic from "../../assets/images/insta.svg";
import instaLogo from "../../assets/images/logoinsta.png";
import fbLogo from "../../assets/images/fb.png";
import playStore from "../../assets/images/play.png";
import appStore from "../../assets/images/app.png";
import CustomButton from "../../components/shared/CustomButton";
import LoginFooter from "../../components/shared/LoginFooter";
import { useForm } from "react-hook-form";
import { AllRoutes } from "../../constants/Routes";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";


export type FormInputs = {
  value: string;
  password: string;
};

const Login = () => {
  const disPatch = useDispatch<any>();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid,isSubmitting },
  } = useForm<FormInputs>({ mode: "onChange" });

  const [passwordLength, setPasswordLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(event.target.value.length);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data:object) => {
    try{
      const res = await disPatch(login(data));
      if (res.success) {
        navigate(AllRoutes.Home);
      }
    }
    catch (error) {
      console.error(console.log(error));
    }
      
  };
  return (
    <div className="flex justify-center sm:mt-12">
      <div className="lg:block hidden">
        <img src={instaLoginPic} alt="" width="500px" draggable="false" />
      </div>
      <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_content sm:border-2  mx-auto mt-5 sm:px-12">
          <img src={instaLogo} alt="" width={250} className="mx-auto my-7" draggable="false" />
          <div className="text-center">
            <CustomInput
              label="Phone number,username, or email"
              placeholder="Phone number,username, or email"
              // name="email"
              type="text"
              control={control}
              className=""
              {...register("value", {
                required: true,
                pattern:
                  /^(?:[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}|[6-9]\d{9}|[a-z][a-z0-9_]{4,19})$/,
              })}
            />
            {errors.value  && (
            <p className="text-left text-rose-500" role="alert">Invalid Mobile Number,userName or email</p>
          )}
          </div>

          <div className="text-center mt-2 relative">
            <CustomInput
              label="Password"
              placeholder=""
              type={showPassword ? "text" : "password"}
              control={control}
              onKeyUp={handlePasswordChange}
              className=""
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*\W).{7,15}$/,
              })}
            />
            {errors.password  && (
            <p className="text-left text-rose-500" role="alert">Invalid Password</p>
          )}
            {passwordLength > 0 && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn absolute right-3 top-4"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>

          <div className="flex justify-center mt-2">
            
            <CustomButton
              type="submit"
              title={isSubmitting ? <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />: "Sign In"}
              className="custom_signin_btn"
              disable={!isValid}
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
          <CustomButton
            type="button"
            title="Forgot password?"
            className="login_forgt text-center my-7"
            route={AllRoutes.Reset}
          />
        </div>
        <div className="singup_link_content sm:border-2 mx-auto text-center mt-3 py-7">
          <div>
            Don't have an account?{" "}
            <CustomButton
              type="button"
              title="Sign Up"
              className="text-sky-500 font-semibold"
              route={AllRoutes.SignUp}
            />
          </div>
        </div>
        <div className="text-center mt-2">
          <div className="py-3">Get the app</div>
          <div className="flex justify-center gap-2">
            <img src={playStore} width="150px" draggable="false"/>
            <img src={appStore} width="150px" draggable="false"/>
          </div>
        </div>
      </form>
      <div className="mb-12"></div>
      <div className="absolute bottom-0">
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;

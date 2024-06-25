import "../login/login.css";
import CustomInput from "../../components/shared/CustomInput";
import instaLogo from "../../assets/images/logoinsta.png";
import playStore from "../../assets/images/play.png";
import appStore from "../../assets/images/app.png";
import CustomButton from "../../components/shared/CustomButton";
import { useForm } from "react-hook-form";
import { AllRoutes } from "../../constants/Routes";
import LoginFooter from "../../components/shared/LoginFooter";
import { useState } from "react";

type FormInputs = {
  name: string
  userName:string
  email: string
  password: string
}

const SignUp = () => {
  const {register,control, handleSubmit, formState: {errors,isValid}} = useForm<FormInputs>({mode:'onChange'});

  const [passwordLength, setPasswordLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(event.target.value.length);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data); // Handle form submission
};

  return (
    <>
    <div className="flex justify-center sm:mt-12">
      <form className="container-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_content sm:border-2  mx-auto sm:px-12">
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
              control={control}
              type="text"
              className=""
              {...register("email", { required: true, pattern: /^(?:[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}|[6-9]\d{9})$/})}
            />
          </div>
          <div className="text-center mt-2">
            <CustomInput
              label="FullName"
              placeholder=""
              control={control}
              type="text"
              className=""
              {...register("name", { required: false, pattern:/^(?!.*\s.*\s)[a-z ]{3,20}$/ })}
            />
          </div>
          <div className="text-center mt-2">
            <CustomInput
              label="Username"
              placeholder=""
              control={control}
              type="text"
              className=""
              {...register("userName", { required: true, pattern:/^[a-z][a-z0-9_]{4,19}/})}

            />
          </div>
          {/* <div className="text-left ps-12">
            {errors.userName && <span className="text-red-500">username length is between 3 to 20 characters and does not contain space</span>}
          </div> */}
          <div className="text-center mt-2">
            <CustomInput
              label="Password"
              placeholder=""
              control={control}
              onKeyUp={handlePasswordChange}
              type="password"
              className=""
              {...register("password", { required: true, pattern:/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*\W).{7,15}$/ })}

            />
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
          <div className="py-4 text-gray-400">
            People who use our service may have uploaded your contact information to Instagram <a href="https://www.facebook.com/help/instagram/261704639352628" className="text-slate-900">Learn More</a>
          </div>
          <div className="py-4 text-gray-400">
            By signing up,you agree to our <a href="https://help.instagram.com/581066165581870/?locale=en_US" className="text-slate-900">Terms , </a><a href="https://help.instagram.com/581066165581870/?locale=en_US" className="text-slate-900">Privacy Policy</a> and <a href="https://privacycenter.instagram.com/policies/cookies/" className="text-slate-900">Cookies Policy</a>
          </div>
          <div className="flex justify-center mt-2 mb-12">
            <CustomButton
              type="submit"
              title="Sign Up"
              className="custom_signin_btn"
              route=""
              disable={!isValid }
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
              route={AllRoutes.Login}
            />
          </div>
        </div>
        <div className="text-center mt-2 pb-5">
          <div className="py-3">Get the app</div>
          <div className="flex justify-center gap-2">
            <img src={playStore} width="150px" />
            <img src={appStore} width="150px" />
          </div>
        </div>
      </form>
    </div>
    <div className="mb-12 "></div>
      <div>
        <LoginFooter />
      </div>
    </>
    
  );
};

export default SignUp;

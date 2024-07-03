import React from "react";
import "../login/login.css";
import CustomInput from "../../components/shared/CustomInput";
import instaLogo from "../../assets/images/logoinsta.png";
import CustomButton from "../../components/shared/CustomButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  unique,
  uniqueEmail,
  uniqueMobile,
  useSelectorUserState,
} from "../../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type SignUpStep1Props = {
  nextStep: any;
  formData: FormInputs;
};

type FormInputs = {
  name: string;
  userName: string;
  email: string;
  phoneNo: string;
  password: string;
};

const SignUpStep1 = ({ nextStep, formData }: SignUpStep1Props) => {
  const disPatch = useDispatch<AppDispatch>();
  const { isError, ErrorMessage } = useSelectorUserState();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onChange" });

  const [passwordLength, setPasswordLength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(event.target.value.length);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: FormInputs) => {
    nextStep(data);
  };

  const isUniqueUserName = (e: any) => {
    const res = disPatch(unique(e.target.value));
  };

  const isUniqueEmail = (e: any) => {
    const res = disPatch(uniqueEmail(e.target.value));
  };

  const isUniqueMobile = (e: any) => {
    const res = disPatch(uniqueMobile(e.target.value));
  };

  return (
    <form
      className="login_content sm:border-2  mx-auto sm:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        src={instaLogo}
        alt=""
        width={250}
        className="mx-auto mt-10 mb-5"
        draggable="false"
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
          label="email"
          placeholder="Ex: johndoe@gmail.com"
          control={control}
          type="text"
          className=""
          onInputBlur={isUniqueEmail}
          value={formData.email}
          {...register("email", {
            required: true,
            // pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            pattern: /^[a-z\d\-\.]+@([a-z\d-]+\.)+[a-z\d-]{2,4}$/,
          })}
        />
        {errors.email && (
          <p className="text-left text-rose-500" role="alert">
            {errors.email.type === "pattern"
              ? "Invalid Email"
              : ""}
          </p>
        )}
      </div>
      <div className="text-center mt-2">
        <CustomInput
          label="Phone No"
          placeholder=""
          control={control}
          onInputBlur={isUniqueMobile}
          type="text"
          className=""
          // onInputBlur={isUniqueEmail}
          value={formData.phoneNo}
          {...register("phoneNo", {
            required: false,
            pattern: /^[6-9]\d{9}$/,
          })}
        />
        {errors.phoneNo && <p className="text-rose-500 text-left">Invalid Phone Number</p>}
      </div>
      <div className="text-center mt-2">
        <CustomInput
          label="FullName"
          placeholder="Ex: John Doe"
          control={control}
          type="text"
          className=""
          value={formData.name}
          {...register("name", {
            required: true,
            pattern: /^(?!.*\s.*\s)[a-zA-Z ]{3,20}$/,
          })}
        />
        {errors.name && (
          <p className="text-left text-rose-500" role="alert">
            {errors.name.type === "pattern" ? "Invalid name" : ""}
          </p>
        )}
      </div>
      <div className="text-center mt-2">
        <CustomInput
          label="Username"
          placeholder="Ex: john123"
          control={control}
          type="text"
          className=""
          onInputBlur={isUniqueUserName}
          value={formData.userName}
          {...register("userName", {
            required: true,
            pattern: /^[a-z][a-z0-9_]{4,19}$/,
          })}
        />
        {errors.userName && (
          <p className="text-left text-rose-500" role="alert">
            {errors.userName.type === "pattern" ? "Invalid UserName" : ""}
          </p>
        )}
      </div>
      {/* <div className="text-left ps-12">
            {errors.userName && <span className="text-red-500">username length is between 3 to 20 characters and does not contain space</span>}
          </div> */}
      <div className="text-center mt-2 relative">
        <CustomInput
          label="Password"
          placeholder="Ex: John@123"
          control={control}
          onKeyUp={handlePasswordChange}
          type={showPassword ? "text" : "password"}
          className=""
          {...register("password", {
            required: true,
            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*\W).{7,15}$/,
          })}
        />
        {errors.password && (
          <p className="text-left text-rose-500" role="alert">
            Invalid Password
          </p>
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

      {isError && (
        <div className="text-center text-rose-500 mt-4">{ErrorMessage}</div>
      )}

      <div className="py-4 text-gray-400 text-center">
        People who use our service may have uploaded your contact information to
        Instagram{" "}
        <a
          href="https://www.facebook.com/help/instagram/261704639352628"
          className="text-slate-900"
        >
          Learn More
        </a>
      </div>
      <div className="py-4 text-gray-400 text-center">
        By signing up,you agree to our{" "}
        <a
          href="https://help.instagram.com/581066165581870/?locale=en_US"
          className="text-slate-900"
        >
          Terms ,{" "}
        </a>
        <a
          href="https://help.instagram.com/581066165581870/?locale=en_US"
          className="text-slate-900"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="https://privacycenter.instagram.com/policies/cookies/"
          className="text-slate-900"
        >
          Cookies Policy
        </a>
      </div>
      <div className="flex justify-center mt-2 mb-12">
        <CustomButton
          type="submit"
          title="Sign Up"
          className="custom_signin_btn"
          route=""
          disable={!isValid}
        />
      </div>
    </form>
  );
};

export default SignUpStep1;

import "../login/login.css";
import CustomButton from "../../components/shared/CustomButton";
import { useForm,SubmitHandler, FieldValues } from "react-hook-form";
import birthdayLogo from "../../assets/images/birthdayLogo.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { login, signup, useSelectorUserState } from "../../redux/slices/AuthSlice";

type SignUpStep2Props = {
  prevStep: () => void;
  formData: object;
};

interface FormData {
  month: string;
  date: string;
  year: string;
}


const SignUpStep2 = ({ prevStep, formData }: SignUpStep2Props) => {
  const disPatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const { isError,ErrorMessage,success  } = useSelectorUserState();

  const onSubmit:  SubmitHandler<FieldValues> = async (data) => {
    const { year, month, date } = data as FormData;
    const formattedData = {
      dateOfBirth: `${year}-${month}-${date}`
    };
    console.log({...formData,...formattedData})
    const Data = {...formData,...formattedData};
    const registerData = {
      name:Data.name,
      userName: Data.userName,
      dateOfBirth: Data.dateOfBirth,
      emailOrMobile:Data.email,
      password:Data.password
    }
    console.log(registerData);
    const res = await disPatch(signup(registerData));
    console.log(res)

    if(res.payload.isSuccess){
      const logindata = {
        value :registerData.emailOrMobile,
        password:registerData.password
      }
      const res2 = disPatch(login(logindata));
    }
  
  };
  
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    const daysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    return Array.from(Array(daysInMonth[month - 1]), (_, i) => i + 1);
  };

  const days = getDaysInMonth(month, year);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(event.target.value));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(parseInt(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <form
      className="login_content sm:border-2  mx-auto sm:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-center pt-7 pb-4 ">
        <img src={birthdayLogo} alt="" width={250} className="mx-auto" draggable="false" />
      </div>
      <div className="text-black font-semibold text-lg mb-3">
        Add Your Birthday
      </div>
      <div className="text-center mb-4 ">
        <p>This won't be a part of your public profile.</p>
        <p className="text-sky-500 font-semibold">
          Why do I need to provide my birthday?
        </p>
      </div>
      <div className="flex justify-center gap-2 mt-2 mb-5">
        <div className="rounded border-2">
          <select 
          className="p-2 outline-0"
            style={{ minWidth: 90 }}
            value={month}
            {...register("month")}
            onChange={handleMonthChange}
          >
            <option className="" value="01">
              January
            </option>
            <option className="" value="02">
              February
            </option>
            <option className="" value="03">
              March
            </option>
            <option className="" value="04">
              April
            </option>
            <option className="" value="05">
              May
            </option>
            <option className="" value="06">
              June
            </option>
            <option className="" value="07">
              July
            </option>
            <option className="" value="08">
              August
            </option>
            <option className="" value="09">
              September
            </option>
            <option className="" value="10">
              October
            </option>
            <option className="" value="11">
              November
            </option>
            <option className="" value="12">
              December
            </option>
          </select>
        </div>
        <div className="rounded border-2">
          <select
          className="p-2 outline-0 overflow-y-scroll no-scrollbar"
            style={{ minWidth: 60 }}
            value={date}
            {...register("date")}
            onChange={handleDateChange}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded border-2">
          <select
          className="p-2 outline-0 overflow-y-scroll no-scrollbar"
            style={{ minWidth: 60 }}
            value={year}
            {...register("year")}
            onChange={handleYearChange}
          >
            {Array.from(
              Array(101),
              (_, i) => new Date().getFullYear() - 100 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="text-center">
          <input
            type="month"
            defaultValue=""
            {...register("birthDate", { required: true })}
            aria-invalid={errors.birthDate ? "true" : "false"}
          />
          {errors.birthDate?.type === "required" && (
            <p className="text-rose-500" role="alert">
              Date is required
            </p>
          )}
        </div> */}
      </div>

      {isError && (<div className="alert text-rose-500 mb-4">{ErrorMessage}</div>)}
      <div className="pb-4 text-gray-600">
        You need to enter the date you were born
      </div>
      <div className="pb-4 text-gray-600">
        Use your own birthday,even if this account is for a business,a pet, or
        something
      </div>
      <CustomButton
        type="submit"
        title="Next"
        className="custom_signin_btn mb-4"
        route=""
        disable={!isValid}
      />
      <CustomButton
        type="button"
        title="Go back"
        className="text-sky-500 font-semibold mb-7"
        route=""
        clickHandler={prevStep}
      />
    </form>
  );
};

export default SignUpStep2;

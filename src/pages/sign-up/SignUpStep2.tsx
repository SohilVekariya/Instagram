import "../login/login.css";
import CustomButton from "../../components/shared/CustomButton";
import { IoLockClosed } from "react-icons/io5";
import { useForm } from "react-hook-form";
import birthdayLogo from "../../assets/images/birthdayLogo.png";
import { useState } from "react";

type SignUpStep2Props = {
  prevStep: any;
  formData: Object;
};

const SignUpStep2 = ({ prevStep, formData }: SignUpStep2Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const onSubmit = (data: any) => {
    const { year, month, date } = data;
    const formattedData = {
      dateOfBirth: `${year}-${month}-${date}`
    };
    console.log({...formData,...formattedData})
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

  const handleMonthChange = (event: any) => {
    setMonth(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setYear(event.target.value);
  };

  return (
    <form
      className="login_content sm:border-2  mx-auto sm:px-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-center pt-7 pb-4 ">
        <img src={birthdayLogo} alt="" width={250} className="mx-auto" />
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
            <option className="" value="1">
              January
            </option>
            <option className="" value="2">
              February
            </option>
            <option className="" value="3">
              March
            </option>
            <option className="" value="4">
              April
            </option>
            <option className="" value="5">
              May
            </option>
            <option className="" value="6">
              June
            </option>
            <option className="" value="7">
              July
            </option>
            <option className="" value="8">
              August
            </option>
            <option className="" value="9">
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

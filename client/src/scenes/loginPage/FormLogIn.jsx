import React from "react";
import LoaderBtn from "../../components/Loader/LoaderBtn";
import { useState } from "react";

const FormLogIn = ({ login, borderRed, matchEmail, matchPassword }) => {
  const [isLoading, setLoading] = useState(false);
  const style = {
    input_red:
      "w-full  p-4 bg-blue-100 rounded-md my-1 outline-2 outline-rose-500",
    input_cyan:
      "w-full  p-4 bg-blue-100 rounded-md my-1 outline-2 outline-orange-400",
  };

  return (
    <form>
      <label
        className="relative bg-white px-2 rounded top-3 left-3"
        htmlFor="email"
      >
        Email
      </label>
      <input
        onChange={matchEmail}
        className={borderRed.email ? style.input_red : style.input_cyan}
        id="email"
        placeholder="Your Email Address"
        type="email"
      />
      <p
        id="EmailErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      <label
        className="relative bg-white px-2 rounded top-3 left-3"
        htmlFor="password"
      >
        Password
      </label>
      <input
        onChange={matchPassword}
        className={borderRed.password ? style.input_red : style.input_cyan}
        id="password"
        placeholder="Your Password"
        type="password"
      />
      <p
        id="PasswordErrorMsg"
        className="min-h-[1.3rem] text-xs pt-1 text-red-500"
      ></p>

      <div
        onClick={() => setLoading(true)}
        className="z-10 relative flex w-auto h-auto justify-center items-center"
      >
        <button
          onClick={login}
          type="submit"
          className="z-99 w-full h-14 my-8 bg-orange-500 rounded-md text-white  outline-2 text-xs font-medium  hover:bg-orange-400"
        >
          {!isLoading && <span>LOGIN</span>}
        </button>
        {isLoading && (
          <div
            className={`absolute flex justify-center items-center w-auto h-auto z-99`}
          >
            <LoaderBtn />
          </div>
        )}
      </div>
    </form>
  );
};

export default FormLogIn;

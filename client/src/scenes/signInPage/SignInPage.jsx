import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm/useForm";
import FormSignIn from "./FormSignIn";
import axios from "axios";
import logo from "../../assets/icon-10.png"
import { useSelector } from "react-redux";


const SignIn = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { thm } = useSelector((state) => state.themeReducer);

  // import useForm to match the values
  const {
    borderRedFunc,
    resetValues,
    val,
    borderRed,
    matchFN,
    matchLN,
    matchEmail,
    matchLocation,
    matchOccupation,
    matchPassword,
  } = useForm();
  const newUser = {
    firstName: `${val.firstName}`,
    lastName: `${val.lastName}`,
    location: `${val.location}`,
    occupation: `${val.occupation}`,
    email: `${val.email}`,
    password: `${val.password}`,
    friends: [],
    picture: image,
  };

  const register = async (e) => {
    e.preventDefault();
    if (
      val.firstName &&
      val.lastName &&
      val.location &&
      val.occupation &&
      val.email &&
      val.password &&
      image
    ) {
      const savedUserResponse = await axios.post(
        `${process.env.REACT_APP_URL}/auth/register`,
        newUser,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("savedUserResponse", savedUserResponse);

      if (savedUserResponse) {
        resetValues();
        navigate("/");
      }
    } else {
      borderRedFunc();
    }
  };

  return (
    <div className="p-5">
      <div className="w-fit flex items-center  mx-auto mt-5">
        <img src={logo} alt="logo"  className="w-16 h-16 mr-2"/>
        <div>
          <h1 className={`text-[2rem] font-semibold  ${thm.text.primary.main}  p-0`}>
            boogysh
          </h1>
          <span className={`relative bottom-[0.6rem] text-sm `}>
            Social Media
          </span>
        </div>
      </div>
      <div className="max-w-[500px] mx-auto bg-white rounded-[1.5rem] p-7 mt-4 mb-5">
        <h2 className={`text-[1.3rem] font-medium mb-3 ${thm.text.primary.main}`}>
          Welcome to boogysh social media!
        </h2>

        <FormSignIn
          matchFN={matchFN}
          matchLN={matchLN}
          matchLocation={matchLocation}
          matchOccupation={matchOccupation}
          matchEmail={matchEmail}
          matchPassword={matchPassword}
          borderRed={borderRed}
          register={register}
          image={image}
          setImage={setImage}
        />

        <Link
          to="/"
          className="underline text-orange-500 hover:text-orange-400 "
        >
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

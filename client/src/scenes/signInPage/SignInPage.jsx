import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm/useForm";
import FormSignIn from "./FormSignIn";
import axios from "axios";
// import defaultImage from "../../assets/user.png"

const SignIn = () => {
  const [image, setImage] = useState(null);
  // console.log(image);

  const navigate = useNavigate();

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
    // matchImage,
  } = useForm();
  // console.log("val.image : " , val.image);
  const newUser = {
    firstName: `${val.firstName}`,
    lastName: `${val.lastName}`,
    location: `${val.location}`,
    occupation: `${val.occupation}`,
    email: `${val.email}`,
    password: `${val.password}`,
    friends: [],
    // picture: val.image,
    picture: image,
  };
  // console.log("newUser", newUser);

  const register = async (e) => {
    e.preventDefault();
    // val.image && setImage(val.image)
    if (
      val.firstName &&
      val.lastName &&
      val.location &&
      val.occupation &&
      val.email &&
      val.password &&
      // val.image
      image
    ) {
      const savedUserResponse = await axios.post(
        `http://localhost:3001/auth/register`,
        // `https://social-media-boogysh-git-main-boogysh.vercel.app/auth/register`,
        newUser,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("savedUserResponse", savedUserResponse);

      // const savedUserResponse = await fetch(
      //   "http://localhost:3001/auth/register",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(newUser),
      //   }
      // );

      // const savedUser = await savedUserResponse.json();
      // if (savedUser) {

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
      <div className="w-fit  mx-auto mt-5">
        <h1 className={`text-[2rem] font-semibold  text-orange-500  p-0`}>
          boogysh
        </h1>
        <span className={`relative bottom-[0.6rem] text-sm `}>
          Social Media
        </span>
      </div>
      <div className="max-w-[500px] mx-auto bg-white rounded-[1.5rem] p-7 mt-4 mb-5">
        <h2 className="text-[1rem] text-orange-600 font-medium mb-3">
          Welcome to Socipedia, the Social Media for Sociopaths!
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
          // valImage={val.image}
          image={image}
          setImage={setImage}
        />

        <Link to="/" className="underline text-orange-500 hover:text-orange-400 ">
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

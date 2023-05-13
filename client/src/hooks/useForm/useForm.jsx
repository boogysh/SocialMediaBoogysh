import { useState } from "react";
import { E_MAIL, PASS, FN, LN, LOCATION, OCCUPATION } from "./adviceMatch";

const useForm = () => {
  const [val, setVal] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    email: "",
    password: "",
    image: null,
  });

  const [borderRed, setBorderRed] = useState({
    firstName: false,
    lastName: false,
    location: false,
    occupation: false,
    email: false,
    password: false,
    image: false,
  });

  //-----MATCH EMAIL
  const matchEmail = (e) => {
    const value = e.target.value;
    const EMAIL_ErrMsg = document.getElementById("EmailErrorMsg");
    const matched = value.match(
      /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g
    );
    if (value.length === 0) EMAIL_ErrMsg.innerHTML = "";
    else if (value.length < 5) {
      EMAIL_ErrMsg.innerHTML = E_MAIL.adviceLength;
      setVal({ ...val, email: "" });
    } else if (matched) {
      EMAIL_ErrMsg.innerHTML = "";
      setVal({ ...val, email: value });
      setBorderRed({ ...borderRed, email: false });
    } else if (!matched) {
      EMAIL_ErrMsg.innerHTML = E_MAIL.adviceContent;
      setVal({ ...val, email: "" });
    }
  };
  //-----MATCH PASSWORD
  const matchPassword = (e) => {
    const value = e.target.value;
    const PASS_ErrMsg = document.getElementById("PasswordErrorMsg");
    const matched = value.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    );
    //  /^
    // (?=.*\d)       should contain at least one digit
    // (?=.*[a-z])    should contain at least one lower case
    //(?=.*[A-Z])     should contain at least one upper case
    //[a-zA-Z0-9]{8,} should contain at least 8 from the mentioned characters
    // $/
    if (value.length === 0) PASS_ErrMsg.innerHTML = "";
    else if (value.length < 8) {
      PASS_ErrMsg.innerHTML = PASS.adviceLength;
      setVal({ ...val, password: "" });
      setBorderRed({ ...borderRed, password: true });
    } else if (matched) {
      PASS_ErrMsg.innerHTML = "";
      setVal({ ...val, password: value });
      setBorderRed({ ...borderRed, password: false });
    } else if (!matched) {
      PASS_ErrMsg.innerHTML = PASS.adviceContent;
      setVal({ ...val, password: "" });
      setBorderRed({ ...borderRed, password: true });
    }
  };
  //-----MATCH FIRST NAME
  const matchFN = (e) => {
    const value = e.target.value;
    const FN_ErrMsg = document.getElementById("FNErrorMsg");
    const matched = value.match(/^[a-z A-Z]{3,25}$/);
    if (value.length === 0) {
      FN_ErrMsg.innerHTML = "";
      setVal({ ...val, firstName: "" });
      setBorderRed({ ...borderRed, firstName: false });
    } else if (value.length < 3 || value.length > 25) {
      FN_ErrMsg.innerHTML = FN.adviceLength;
      setVal({ ...val, firstName: "" });
      //   setBorderRed({ ...borderRed, firstName: true });
    } else if (matched) {
      FN_ErrMsg.innerHTML = "";
      setVal({ ...val, firstName: value });
      setBorderRed({ ...borderRed, firstName: false });
    } else if (!matched) {
      FN_ErrMsg.innerHTML = FN.adviceContent;
      setVal({ ...val, firstName: "" });
      setBorderRed({ ...borderRed, firstName: true });
    }
  };
  //-----MATCH LAST NAME---------
  const matchLN = (e) => {
    const value = e.target.value;
    const LN_ErrMsg = document.getElementById("LNErrorMsg");
    const matched = value.match(/^[a-z A-Z]{3,25}$/);
    if (value.length === 0) {
      LN_ErrMsg.innerHTML = "";
      setVal({ ...val, lastName: "" });
      setBorderRed({ ...borderRed, lastName: false });
    } else if (value.length < 3 || value.length > 25) {
      LN_ErrMsg.innerHTML = LN.adviceLength;
      setVal({ ...val, lastName: "" });
      //   setBorderRed({ ...borderRed, lastName: true });
    } else if (matched) {
      LN_ErrMsg.innerHTML = "";
      setVal({ ...val, lastName: value });
      setBorderRed({ ...borderRed, lastName: false });
    } else if (!matched) {
      LN_ErrMsg.innerHTML = LN.adviceContent;
      setVal({ ...val, lastName: "" });
      setBorderRed({ ...borderRed, lastName: true });
    }
  };

  //-----MATCH LOCATION--------------------
  const matchLocation = (e) => {
    const value = e.target.value;
    const LOCATION_ErrMsg = document.getElementById("LocationErrorMsg");
    const matched = value.match(/^[a-z A-Z]{3,25}$/);
    if (value.length === 0) {
      LOCATION_ErrMsg.innerHTML = "";
      setVal({ ...val, location: "" });
      setBorderRed({ ...borderRed, location: false });
    } else if (value.length < 3 || value.length > 25) {
      LOCATION_ErrMsg.innerHTML = LOCATION.adviceLength;
      setVal({ ...val, location: "" });
      //   setBorderRed({ ...borderRed, location: true });
    } else if (matched) {
      LOCATION_ErrMsg.innerHTML = "";
      setVal({ ...val, location: value });
      setBorderRed({ ...borderRed, location: false });
    } else if (!matched) {
      LOCATION_ErrMsg.innerHTML = LOCATION.adviceContent;
      setVal({ ...val, location: "" });
      setBorderRed({ ...borderRed, location: true });
    }
  };

  //-----MATCH OCCUPATION--------------------
  const matchOccupation = (e) => {
    const value = e.target.value;
    const OCCUPATION_ErrMsg = document.getElementById("OccupationErrorMsg");
    const matched = value.match(/^[a-z A-Z]{3,25}$/);
    if (value.length === 0) {
      OCCUPATION_ErrMsg.innerHTML = "";
      setVal({ ...val, occupation: "" });
      setBorderRed({ ...borderRed, occupation: false });
    } else if (value.length < 3 || value.length > 25) {
      OCCUPATION_ErrMsg.innerHTML = OCCUPATION.adviceLength;
      setVal({ ...val, occupation: "" });
      //   setBorderRed({ ...borderRed, location: true });
    } else if (matched) {
      OCCUPATION_ErrMsg.innerHTML = "";
      setVal({ ...val, occupation: value });
      setBorderRed({ ...borderRed, occupation: false });
    } else if (!matched) {
      OCCUPATION_ErrMsg.innerHTML = OCCUPATION.adviceContent;
      setVal({ ...val, occupation: "" });
      setBorderRed({ ...borderRed, occupation: true });
    }
  };

  //-----MATCH IMAGE--------------------
  // const matchImage = (e) => {
  //   const value = e.target.files[0];
  //   // if (!value) {
  //   //   setVal({ ...val, image: null });
  //   //   setBorderRed({ ...borderRed, image: true });
  //   // } else

  //   if (value) {
  //     setVal({ ...val, image: value });
  //     // setBorderRed({ ...borderRed, image: false });
  //   }
  // };

  //-----RESET ALL INPUT VALUES
  const resetValues = () => {
    // Array.from(document.querySelectorAll('input'));.
    const commentInput = document.querySelectorAll("input");
    commentInput.forEach((input) => (input.value = ""));
    const commentTextarea = document.querySelectorAll("textarea");
    commentTextarea.forEach((input) => (input.value = ""));
    return (commentInput.value = "") && (commentTextarea.value = "");
  };
  //------SET BORDER RED
  const borderRedFunc = () => {
    if (!val.firstName) setBorderRed({ ...borderRed, firstName: true });
    if (!val.lastName) setBorderRed({ ...borderRed, lastName: true });
    if (!val.location) setBorderRed({ ...borderRed, location: true });
    if (!val.occupation) setBorderRed({ ...borderRed, occupation: true });
    if (!val.email) setBorderRed({ ...borderRed, email: true });
    if (!val.password) setBorderRed({ ...borderRed, password: true });
    if (!val.image) setBorderRed({ ...borderRed, image: true });
    else return;
  };
  return {
    matchFN,
    matchLN,
    matchEmail,
    matchLocation,
    matchOccupation,
    matchPassword,
    // matchImage,
    borderRedFunc,
    resetValues,
    val,
    borderRed,
  };
};

export default useForm;

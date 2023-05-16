import React from "react";
import "./loader.css";
import { useSelector } from "react-redux";

const Loader = () => {
  const { thm } = useSelector((state) => state.themeReducer);

  return (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;

import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const { thm } = useSelector((state) => state.themeReducer);

  return (
    <div
      className={`flex justify-center w-auto h-auto ${thm.bg.alt} rounded-[10px] py-20 mb-5`}
    >
      <div className={`w-8 h-8 rounded-full animate-spin border-[4px] border-solid ${thm.border.primary.main} border-b-transparent`}></div>
    </div>
  );
};

export default Loader;

import React from "react";
import { useSelector } from "react-redux";
import publicity from "../../assets/pub.jpg";

const AdvertWidget = () => {
  const { thm } = useSelector((state) => state.themeReducer);

  return (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mt-5`}>
      <div className="w-full h-auto flex">
        <h3 className={`font-medium text-base ${thm.text.neutral.dark}`}>
          Sponsored
        </h3>
        <p className={`text-sm ${thm.text.neutral.medium} ml-auto`}>
          Victor Buga
        </p>
      </div>
      <img
        className="rounded-[10px] mt-3"
        src={publicity}
        alt="mika cosmetics"
      />
      <div className="flex justify-between mt-4">
        <a href="https://victorbuga.com" target="blank"
          className={`text-[0.82rem] sm:text-sm font-medium ${thm.text.neutral.dark}`}
        >
          victorbuga.com
        </a>
      </div>
      <p
        className={`text-[0.82rem] sm:text-sm ${thm.text.neutral.medium}  mt-3`}
      >
        Discover the full list of my projects on my website.
      </p>
    </div>
  );
};

export default AdvertWidget;

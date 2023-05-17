import React from "react";
import { useSelector } from "react-redux";

const Comment = ({ url, name, description, createdAt }) => {
  const { thm } = useSelector((state) => state.themeReducer);


  return (
    <div className="flex w-full mb-5 last:mb-0" key={`${url}`}>
      <img
        src={url}
        alt="user"
        className="w-[36px] h-[36px] object-cover rounded-[50%] mr-2"
      />
      <div
        className={`${thm.bg.neutral.light} w-full  rounded-[10px] px-5 py-2`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center ">
          <h3
            className={`text-md font-medium ${thm.text.neutral.main} hover:text-blue-400`}
          >
            {name}
          </h3>
          <p
            className={`text-sm font-sans sm:ml-2 ${thm.text.neutral.medium} `}
          >
            {createdAt}
          </p>
        </div>

        <p
          style={{ whiteSpace: "break-spaces" }}
          className={`text-sm ${thm.text.neutral.main} mt-3`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Comment;

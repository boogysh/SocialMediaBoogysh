import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Visitor from "./Visitor";
import { GUESTS } from "../redux/actions";

const Visitors = ({ userId, setShowVisitors }) => {
  const [visitors, setVisitors] = useState("");
  console.log("visitor::::", visitors);
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserVisitors = async () => {
      const response = await fetch(
        // `http://localhost:3001/users/${userId}/visitors`,
        `${process.env.REACT_APP_URL}/users/${userId}/visitors`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      setVisitors(result);
      dispatch(GUESTS(result));
    };
    getUserVisitors();
  }, [token, userId, dispatch]);
  // eslint-disable-line react-hooks/exhaustive-deps

  const resetUserVisitors = async () => {
    const response = await fetch(
      // `http://localhost:3001/users/${userId}/views/reset`,
      `${process.env.REACT_APP_URL}/users/${userId}/views/reset`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resetedList = await response.json();
    console.log("newList_Visitors:", resetedList);
    setVisitors(resetedList);
    dispatch(GUESTS([]));
  };

  return (
    <div
      className={`bg-gray-700/50 fixed z-10  bottom-0 left-0 top-0 right-0 w-[100%] h-[100%]  bg-cover flex justify-center items-center `}
    >
      <div
        className={`${thm.bg.alt} w-[95%] xxs:w-[80%] xs:w-[60%] md:w-[38%] lg:w-[28%] xl:w-[23%]  h-auto max-h-[600px]  rounded-[20px]`}
      >
        {/* HEADER */}
        <div
          className={`${thm.bg.alt} rounded-t-[20px] w-full h-auto flex items-center py-1 px-3 `}
        >
          <h2
            className={`${thm.text.neutral.main} w-full text:normal sm:text-lg font-medium py-3 text-center`}
          >
            Who's viewed your profile
          </h2>
          <button
            onClick={() => setShowVisitors(false)}
            className={`w-8 h-8 ml-auto flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
          >
            <MdClose className={` ${thm.text.neutral.main} w-5 h-5`} />
          </button>
        </div>
        {/* CONTENT */}
        <div
          className={`p-5 w-full h-auto max-h-[400px] overflow-y-scroll border-y-[1px] ${thm.bg.neutral.light_border}`}
        >
          {visitors.length > 0 ? (
            visitors.map((visitor) => (
              <Visitor
                key={uuidv4()}
                name={`${visitor.firstName} ${visitor.lastName}`}
                // subtitle={visitor.occupation}
                url={visitor.url}
                visitedAt={visitor.visitedAt}
                friendId={visitor._id}
                userId={userId}
              />
            ))
          ) : (
            <p
              className={`${thm.text.neutral.main} text-sm sm:text-base font-sans`}
            >
              The list is empty
            </p>
          )}
        </div>
        <button
          onClick={resetUserVisitors}
          className={` flex p-2 ${thm.bg.neutral.light_hover}  ${thm.text.neutral.main}  rounded-full ml-auto my-2 mr-2`}
        >
          Clean the list
        </button>
      </div>
    </div>
  );
};

export default Visitors;

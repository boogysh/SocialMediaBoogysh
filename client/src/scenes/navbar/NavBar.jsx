import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../redux/actions";
import { FaSearch } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import Visitors from "../../components/Visitors";

// const NavBar = ({ userId, showSearchWidget, setShowSearchWidget }) => {
const NavBar = ({ showSearchWidget, setShowSearchWidget }) => {
  const [show, setShow] = useState(false);

  const [showVisitors, setShowVisitors] = useState(false);
  const [dark, setDark] = useState(false);
  const userId = useSelector((state) => state.userReducer.user?._id);
  const { guests } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);

  const profilePage = window.location.href.includes("profile");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setThemeLight = () => {
    dispatch({ type: "LIGHT" });
    setDark(false);
  };
  const setThemeDark = () => {
    dispatch({ type: "DARK" });
    setDark(true);
  };

  const logOut = () => {
    dispatch(LOGOUT({ user: null, token: null }));
    navigate("/");
  };

  return (
    <div
      className={`flex justify-between items-center w-full h-auto ${thm.bg.alt}  py-2 px-[5%]`}
    >
      <div>
        <h1
          onClick={() => navigate("/home")}
          className={`text-[2rem] font-semibold ${thm.text.primary.main} ${thm.text.primary.light_hover} cursor-pointer p-0`}
        >
          boogysh
        </h1>
        <span
          className={`relative bottom-[0.6rem] text-sm ${thm.text.neutral.main}`}
        >
          Social Media
        </span>
      </div>
      <AiOutlineMenu
        onClick={() => setShow(!show)}
        className={
          show
            ? `hidden ${thm.text.neutral.dark} w-6 h-6 my-auto`
            : `w-6 ${thm.text.neutral.dark} h-6 my-auto md:hidden`
        }
      />
      <div
        className={
          show
            ? `absolute top-0 right-0 flex flex-col items-center pt-14 ${thm.bg.default} w-[280px] h-[100vh] `
            : `relative hidden justify-evently md:flex md:items-center  `
        }
      >
        <AiOutlineClose
          onClick={() => setShow(!show)}
          className={
            show
              ? `flex ${thm.text.neutral.dark}  w-6 h-6 absolute right-3 top-3`
              : `flex ${thm.text.neutral.dark} md:hidden  w-6 h-6 absolute right-3 top-3`
          }
        />
        {/* GUESTS */}
        {!profilePage && (
          <div className="flex items-center">
            <button
              onClick={() => setShowVisitors(true)}
              className={`flex justify-center items-center rounded-full w-10 h-10 ${thm.bg.neutral.light_hover} m-[2px]`}
            >
              <IoFootsteps className={`w-[22px] h-[22px] ${thm.text.primary.main}`} />
            </button>
            <span
              className={` w-auto px-[6px] py-1 h-5 text-xs flex justify-center items-center rounded-full  ${thm.text.neutral.main} border ${thm.border.primary.main} relative right-3 bottom-3`}
            >
              {guests.length}
            </span>

            {showVisitors && (
              // <Visitors setShowVisitors={setShowVisitors} userId={userId} />
              <Visitors setShowVisitors={setShowVisitors} userId={userId} />
            )}
          </div>
        )}

        {/* SEARCH BUTTON */}
        {!profilePage && (
          <button
            onClick={() => setShowSearchWidget(!showSearchWidget)}
            className={`flex justify-center items-center rounded-full w-10 h-10 ${thm.bg.neutral.light_hover} mr-1`}
          >
            <FaSearch className={`w-5 h-5 ${thm.text.primary.main}`} />
          </button>
        )}

        {/* DARK MODE BUTTON */}
        <button
          className={`flex justify-center items-center rounded-full w-10 h-10 ${thm.bg.neutral.light_hover} m-1`}
        >
          {dark ? (
            <BsFillMoonFill
              onClick={setThemeLight}
              className={`w-6 h-6 ${thm.text.primary.main}`}
            />
          ) : (
            <BsFillSunFill
              onClick={setThemeDark}
              className={`w-6 h-6 ${thm.text.primary.main}`}
            />
          )}
        </button>

        <button
          className={`flex justify-center items-center rounded-full w-10 h-10 ${thm.bg.neutral.light_hover} m-1`}
          onClick={logOut}
        >
          <TbLogout className={`w-6 h-6 ${thm.text.primary.main}`} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

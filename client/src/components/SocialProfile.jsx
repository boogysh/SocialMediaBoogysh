import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdClose, MdOutlineDownloadDone } from "react-icons/md";
import { useSelector } from "react-redux";

const SocialProfile = ({
  SM_Name,
  SM_Url, //SocialMedia
  SMValue,
  setSMValue,
  showSMInput,
  setShowSMInput,
  handleSMAccount,
  activeSMStatus,
}) => {
  const { thm } = useSelector((state) => state.themeReducer);

  const trunc_25 = (str) => {
    return str?.length > 25 ? str.slice(0, 22) + "..." : str;
  };
  const trunc_35 = (str) => {
    return str?.length > 35 ? str.slice(0, 32) + "..." : str;
  };
  const trunc_40 = (str) => {
    return str?.length > 40 ? str.slice(0, 37) + "..." : str;
  };
  const trunc_45 = (str) => {
    return str?.length > 45 ? str.slice(0, 42) + "..." : str;
  };

  return (
    <div className="flex items-center relative mb-3">
      <a href={SM_Url} target="blank">
        {SM_Name === "Twitter" && (
          <FaTwitter
            className={`${thm.text.neutral.medium} ${thm.text.primary.main_hover} ${activeSMStatus}  w-6 h-6`}
          />
        )}
        {SM_Name === "Linkedin" && (
          <FaLinkedin
            className={`${thm.text.neutral.medium} ${thm.text.primary.main_hover} ${activeSMStatus}  w-6 h-6`}
          />
        )}
      </a>
      <div className="ms-4  max-w-[80%]">
        {/* SOCIAL MEDIA NAME */}
        <p className={`${thm.text.neutral.main} text-sm font-medium`}>
          {SM_Name}
        </p>
        {showSMInput ? (
          <input
            type="text"
            value={SMValue}
            className={`ps-1 font-sans  text-sm w-full ${thm.bg.alt} border rounded-[5px] ${thm.text.neutral.medium} ${thm.border.neutral.medium}`}
            onChange={(e) => setSMValue(e.target.value)}
          />
        ) : SM_Url?.length > 0 ? (
          //
          //SOCIAL MEDIA LINK TRUNCATE ON RESPONSIVE MEDIA
          <>
            <span
              className={`text-xs ${thm.text.neutral.medium} flex xxs:hidden md:flex lg:hidden`}
            >
              {trunc_25(SM_Url)}
            </span>
            <span
              className={`text-xs ${thm.text.neutral.medium} hidden xxs:flex xs:hidden lg:flex xl:hidden`}
            >
              {trunc_35(SM_Url)}
            </span>
            <span
              className={`text-xs ${thm.text.neutral.medium} hidden xs:flex md:hidden xl:flex 2xl:hidden`}
            >
              {trunc_40(SM_Url)}
            </span>
            <span
              className={`text-xs ${thm.text.neutral.medium} hidden  2xl:flex `}
            >
              {trunc_45(SM_Url)}
            </span>
          </>
        ) : (
          <p className="text-gray-400 text-sm">Set your account...</p>
        )}
      </div>
      {/* ----------------------------DIV ICON EDIT SM--------------------- */}
      <div className="flex ml-auto" id="SMEditDiv">
        {showSMInput ? (
          <div>
            <button
              onClick={handleSMAccount}
              className={`p-1 rounded-full mr-1 ${thm.bg.neutral.light_hover}`}
            >
              {/* SAVE CHANGES OF SM ACOUNT */}
              {SMValue?.length > 8 && (
                <MdOutlineDownloadDone
                  onClick={() => setShowSMInput(!showSMInput)}
                  className={`w-6 h-6 ml-auto ${thm.text.neutral.medium}`}
                />
              )}
            </button>
            {/* CLOSE EDIT SM ACCOUNT*/}
            <button
              onClick={() => setShowSMInput(!showSMInput)}
              className={`${thm.bg.neutral.light_hover} p-2 rounded-full ml-auto`}
            >
              <MdClose
                onClick={() => setSMValue("")}
                className={`w-5 h-5 ml-auto ${thm.text.neutral.medium}`}
              />
            </button>
          </div>
        ) : (
          // EDIT SM ACCOUNT
          <button
            onClick={() => setShowSMInput(!showSMInput)}
            className={`${thm.bg.neutral.light_hover} p-2 rounded-full ml-auto`}
          >
            <FiEdit2
              className={`${thm.text.neutral.medium} w-[18px] h-[18px]`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialProfile;

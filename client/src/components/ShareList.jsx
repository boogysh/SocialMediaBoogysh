import React from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

import { LinkedinShareButton, TwitterShareButton } from "react-share";

const ShareList = ({description, url}) => {
  

  const { thm } = useSelector((state) => state.themeReducer);

  return (
    <div className="flex auto h-auto">
      {/*------ LINKEDIN ------------- */}
      <LinkedinShareButton
        url={url}
        description={description}
      >
        <div
          className={`w-7 h-7 mr-2 flex  justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
        >
          <FaLinkedin className={`w-5 h-5 ${thm.text.neutral.main}`} />
        </div>
      </LinkedinShareButton>

      {/* TWITTER */}
      <TwitterShareButton
        url={url}
        via={description}
      >
        <div
          className={`w-7 h-7 mr-2 flex  justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
        >
          <FaTwitter className={`w-5 h-5 ${thm.text.neutral.main}`} />
        </div>
      </TwitterShareButton>
    </div>
  );
};
export default ShareList;
